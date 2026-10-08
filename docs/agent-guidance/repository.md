# Repository Scope and Boundaries

## Project map

- `content/docs/(siren)/` is the task-oriented SIREN user guide, organized
  around the WebUI.
- `content/docs/reference/` is the reference root: configuration keys, server
  REPL and client CLI, MCP, Raven, plugins, snapshot format, and limits.
- Moved or deleted pages need a permanent redirect in `next.config.mjs`.
- `app/`, `components/`, and `lib/` contain the Next.js/Fumadocs site shell and
  shared UI code.
- `source.config.ts` configures the Fumadocs content source.

## Evidence and repository boundaries

- Before documenting implementation-driven behavior, inspect the relevant MDX,
  current implementation in `/Users/merc/Projects/siren`, or live behavior.
- Treat `/Users/merc/Projects/siren_docs` and `/Users/merc/Projects/siren` as
  separate repositories with separate diffs, validation, and commits.
