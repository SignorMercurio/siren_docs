# Release Notes

- Base feature and release claims on the current SIREN implementation or
  verified live behavior.
- Do not add an `Unreleased` section. Use an explicit released-version heading:
  `## vX.Y.0 <DateTag>YYYY-MM-DD</DateTag>`.
- Only minor releases (`vX.Y.0`) get a section; patch versions never appear.
  Changes released after `vX.Y.0` and before `vX.(Y+1).0` belong to the
  `vX.(Y+1).0` section, written when that version ships. Recover pending patch
  changes from SIREN commits since the last minor release.
- List what users notice; leave out internal details.
- Update only the active release section unless the task explicitly includes
  older entries.
- Preserve historical release notes and changelog entries unless the task
  explicitly requests a historical rewrite.

## Keeping pages current

Each page's frontmatter records `verifiedAgainst` (the SIREN release it was
checked against) and `sources` (the code its claims depend on).
`npm run drift:check` lists pages whose sources changed after that release.
When documenting a new release, run it, update each listed page against the new
code, then set its `verifiedAgainst` to the new version. When a page starts
describing new code, add those paths to its `sources`. The check needs sibling
checkouts at `../siren` and `../dossier`, or the `SIREN_DIR` and `DOSSIER_DIR`
environment variables.
