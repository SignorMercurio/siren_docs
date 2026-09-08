# Verification

Run the narrowest checks that cover the changed surface:

- After MDX or TypeScript-facing documentation changes: `npm run types:check`.
- After broader site changes: `npm run build` in addition to the typecheck.
- Before finalizing documentation changes: `git diff --check`.
- If a change also touches the verified SIREN code checkout, validate that repository
  separately and report its result separately.

After editing agent instructions or Skill documentation, also run:

```bash
bash "${HOME}/.agents/skills/health/scripts/check-doc-refs.sh" .
```

For instruction-only edits, application typechecks and builds are unnecessary.
Check references in every changed file directly when the checker does not cover
its directory. Run the maintainability audit only when the changed surface or
an explicit audit request calls for it.
