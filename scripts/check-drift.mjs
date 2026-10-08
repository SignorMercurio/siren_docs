#!/usr/bin/env node
// Lists documentation pages whose source code changed after the SIREN version
// the page was last verified against.
//
// Each page declares in its frontmatter:
//
//   verifiedAgainst: v2.33.11
//   sources:
//     - internal/server/webui/frontend/src/pages/AIRPage.tsx
//     - dossier:src/source.js
//
// Sources are git pathspecs relative to the SIREN checkout. A `<repo>:` prefix
// selects a sibling checkout instead (dossier). Pages that describe no
// code, such as the changelog, declare `sources: []`.
//
// Sibling sources are compared against `<repo>VerifiedAgainst` (for example
// `dossierVerifiedAgainst: 6a69582` or a release tag) when the page sets it, and
// otherwise against the sibling commit that was current when the SIREN
// version was released.
//
// Usage: node scripts/check-drift.mjs [--strict]
//   SIREN_DIR and DOSSIER_DIR override the sibling checkout paths.
//   --strict exits 1 when any page is stale, unmapped, or names a source that
//   matches no tracked file.

import { execFileSync } from 'node:child_process';
import { readdirSync, readFileSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const docsDir = join(root, 'content/docs');
const repos = {
  siren: process.env.SIREN_DIR ?? resolve(root, '../siren'),
  dossier: process.env.DOSSIER_DIR ?? resolve(root, '../dossier'),
};
const strict = process.argv.includes('--strict');
// Pages verified this many minor versions behind the current release are
// reported even when none of their sources changed.
const maxMinorLag = 3;

function git(repo, args) {
  return execFileSync('git', ['-C', repos[repo], ...args], { encoding: 'utf8' }).trim();
}

function mdxFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return mdxFiles(path);
    return entry.name.endsWith('.mdx') ? [path] : [];
  });
}

// Reads the two drift keys from a page's frontmatter. Only the plain forms
// shown in the header comment are supported.
function driftKeys(file) {
  const match = readFileSync(file, 'utf8').match(/^---\n([\s\S]*?)\n---/);
  const lines = match ? match[1].split('\n') : [];
  let verifiedAgainst;
  let sources;
  const siblingVersions = {};
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const sibling = line.match(/^(\w+)VerifiedAgainst:\s*(\S+)/);
    if (line.startsWith('verifiedAgainst:')) {
      verifiedAgainst = line.slice('verifiedAgainst:'.length).trim();
    } else if (sibling && sibling[1] in repos) {
      siblingVersions[sibling[1]] = sibling[2];
    } else if (line.trim() === 'sources: []') {
      sources = [];
    } else if (line.trim() === 'sources:') {
      sources = [];
      while (lines[i + 1]?.match(/^\s+- /)) sources.push(lines[++i].replace(/^\s+- /, '').trim());
    }
  }
  return { verifiedAgainst, sources, siblingVersions };
}

// Resolves a version to its release commit: a tag or commit when one exists,
// otherwise the "chore: bump version to vX.Y.Z" commit.
const versionCommits = new Map();
function versionCommit(repo, version) {
  const key = `${repo}@${version}`;
  if (!versionCommits.has(key)) {
    let commit = '';
    try {
      commit = git(repo, ['rev-parse', '--verify', '--quiet', `${version}^{commit}`]);
    } catch {
      commit = git(repo, ['log', '-1', '--format=%H', '--fixed-strings', `--grep=chore: bump version to ${version}`]);
    }
    versionCommits.set(key, commit);
  }
  return versionCommits.get(key);
}

function baseline(repo, version, siblingVersions) {
  if (repo !== 'siren' && siblingVersions[repo]) return versionCommit(repo, siblingVersions[repo]);
  const commit = versionCommit('siren', version);
  if (!commit || repo === 'siren') return commit;
  const date = git('siren', ['show', '-s', '--format=%cI', commit]);
  return git(repo, ['rev-list', '-1', `--before=${date}`, 'HEAD']);
}

function minor(version) {
  const match = version?.match(/^v(\d+)\.(\d+)\./);
  return match ? Number(match[1]) * 1000 + Number(match[2]) : undefined;
}

const latest = git('siren', ['log', '-1', '--format=%s', '--grep=^chore: bump version to v']).replace(
  'chore: bump version to ',
  '',
);

const unmapped = [];
const missing = [];
const stale = [];
const lagging = [];
for (const file of mdxFiles(docsDir).sort()) {
  const page = relative(root, file);
  const { verifiedAgainst, sources, siblingVersions } = driftKeys(file);
  if (sources === undefined || (sources.length > 0 && !verifiedAgainst)) {
    unmapped.push(page);
    continue;
  }
  if (sources.length === 0) continue;
  if (!versionCommit('siren', verifiedAgainst)) {
    unmapped.push(`${page} (unknown version ${verifiedAgainst})`);
    continue;
  }

  const byRepo = Map.groupBy(sources, (source) => {
    const prefix = source.match(/^(\w+):/)?.[1];
    return prefix && prefix in repos ? prefix : 'siren';
  });
  const changes = [];
  for (const [repo, specs] of byRepo) {
    const paths = specs.map((spec) => spec.replace(new RegExp(`^${repo}:`), ''));
    for (const path of paths) {
      // A pathspec that matches nothing would hide every future change.
      if (!git(repo, ['ls-files', '--', path])) missing.push(`${page}: ${repo === 'siren' ? '' : `${repo}:`}${path}`);
    }
    const from = baseline(repo, verifiedAgainst, siblingVersions);
    if (!from) {
      unmapped.push(`${page} (unknown ${repo} version ${siblingVersions[repo]})`);
      continue;
    }
    const log = git(repo, ['log', '--format=%h %s', `${from}..HEAD`, '--', ...paths]);
    if (log) changes.push(...log.split('\n').map((line) => (repo === 'siren' ? line : `${repo} ${line}`)));
  }
  if (changes.length > 0) stale.push({ page, verifiedAgainst, changes });
  else if (minor(latest) - minor(verifiedAgainst) >= maxMinorLag) lagging.push(`${page} (${verifiedAgainst})`);
}

console.log(`SIREN latest release: ${latest}`);
for (const { page, verifiedAgainst, changes } of stale) {
  console.log(`\nSTALE ${page} (verified against ${verifiedAgainst})`);
  for (const change of changes) console.log(`  ${change}`);
}
if (lagging.length > 0) console.log(`\nLAGGING (${maxMinorLag}+ minor versions behind):\n  ${lagging.join('\n  ')}`);
if (missing.length > 0) console.log(`\nMISSING SOURCES (no tracked file matches):\n  ${missing.join('\n  ')}`);
if (unmapped.length > 0) console.log(`\nUNMAPPED (missing verifiedAgainst or sources):\n  ${unmapped.join('\n  ')}`);
if (stale.length + lagging.length + missing.length + unmapped.length === 0) console.log('All pages are current.');

process.exitCode = strict && stale.length + missing.length + unmapped.length > 0 ? 1 : 0;
