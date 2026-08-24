# Repository Scope and Boundaries

## Project map

- `content/docs/(siren)/` is the canonical SIREN end-user documentation.
- `content/img/` contains documentation screenshots and images.
- `app/`, `components/`, and `lib/` contain the Next.js/Fumadocs site shell and
  shared UI code.
- `source.config.ts` configures the Fumadocs content source.

## Evidence and repository boundaries

- Before documenting implementation-driven behavior, inspect the relevant MDX,
  current implementation in `/Users/merc/Projects/siren`, or live behavior.
- Treat `/Users/merc/Projects/siren_docs` and `/Users/merc/Projects/siren` as
  separate repositories with separate diffs, validation, and commits.
