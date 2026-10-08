# Release Notes

- Base feature and release claims on the current SIREN implementation or
  verified live behavior.
- Do not add an `Unreleased` section. Use an explicit released-version heading:
  `## vX.Y.Z <DateTag>YYYY-MM-DD</DateTag>`.
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
checkouts at `../siren`, `../dossier`, and `../raven`, or the `SIREN_DIR`,
`DOSSIER_DIR`, and `RAVEN_DIR` environment variables.
