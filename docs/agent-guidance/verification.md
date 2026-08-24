# Verification

Run the narrowest checks that cover the changed surface:

- After MDX or TypeScript-facing documentation changes: `npm run types:check`.
- After broader site changes: `npm run build` in addition to the typecheck.
- Before finalizing documentation changes: `git diff --check`.
- If a change also touches `/Users/merc/Projects/siren`, validate that repository
  separately and report its result separately.

After editing agent instructions or Skill documentation, also run:

```bash
bash /Users/merc/.agents/skills/health/scripts/check-doc-refs.sh .
bash /Users/merc/.agents/skills/health/scripts/check-maintainability.sh . summary
```
