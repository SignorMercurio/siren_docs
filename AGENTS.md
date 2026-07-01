# Agent Instructions

This repository contains the official SIREN documentation site.

`AGENTS.md` is the canonical agent guidance; keep `CLAUDE.md` as a symlink to
this file.

## Operating Style

- Reply to the user in Chinese by default. Keep code, identifiers, commit
  messages, and logs in English unless the surrounding file clearly uses another
  convention.
- Start from evidence: inspect the relevant MDX, diffs, implementation in
  `/Users/merc/Projects/siren`, or live behavior before changing docs or making
  behavior claims.
- Prefer small, focused, behavior-preserving edits. Do not broaden documentation,
  UI, or repository scope without an explicit request.
- Treat `[$simplify]` as a cleanup/review pass over the current edited surface,
  not a broad rewrite. Treat `[$git-commit]` as a real commit workflow only when
  explicitly requested.

## Scope

- Treat `content/docs/(siren)/` as the canonical SIREN end-user documentation.
- Keep release notes and feature docs evidence-based. Verify behavior against
  `/Users/merc/Projects/siren` when documenting implementation-driven changes.
- Write user-facing documentation, not internal implementation notes, unless the
  page is explicitly about architecture or development.
- Describe visible behavior first. Keep low-level AIR/WebUI/MCP wiring out of
  the main narrative unless the page is dedicated to that setup or maintainer
  topic.
- Preserve historical release notes and changelog entries unless the user asks
  to rewrite older history.

## Project Map

- `content/docs/(siren)/`: official SIREN end-user MDX documentation.
- `content/img/`: screenshots and other documentation images.
- `app/`, `components/`, `lib/`: Next.js/Fumadocs site shell and shared UI code.
- `source.config.ts`: Fumadocs content source configuration.

## Editing

- Prefer small, focused documentation changes that match the existing MDX style.
- Preserve existing Chinese terminology and page structure where possible.
- Use existing Fumadocs components already imported in nearby pages before
  introducing new patterns.
- Add screenshots under `content/img/` only when they materially improve the page.
- Keep prose concise and behavior-first. When the user asks to optimize wording,
  preserve meaning while reducing technical detail.
- For changelog entries, do not add an `Unreleased` section. Use explicit
  released-version headings such as
  `## vX.Y.Z <DateTag>YYYY-MM-DD</DateTag>`.
- Update only the active release section unless the user explicitly asks to
  revise older entries.
- Preserve the current docs-site visual style unless a redesign or visual change
  is explicitly requested.

## Boundaries

- Keep `/Users/merc/Projects/siren_docs` and `/Users/merc/Projects/siren` as
  separate repositories with separate diffs, validation, and commits.
- Do not mix home-level config, generated artifacts, runtime state, or unrelated
  repository changes into documentation commits.

## Verification

Run this after MDX or TypeScript-facing documentation edits:

```bash
npm run types:check
```

For broader site changes, also run:

```bash
npm run build
```

Before finalizing documentation edits, also run:

```bash
git diff --check
```

If a change spans the sibling `siren` repository, validate that repository
separately and keep the results scoped to that repo.

## Git

- Use conventional commits for documentation changes, for example
  `docs(siren): add v2.3.0 changelog`.
- Keep generated or unrelated local artifacts out of commits unless they are
  required by the documentation change.
