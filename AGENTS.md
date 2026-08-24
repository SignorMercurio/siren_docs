# Agent Instructions

This repository contains the official SIREN documentation site.

`AGENTS.md` is canonical; keep `CLAUDE.md` as a relative symlink to it.

After MDX or TypeScript-facing documentation changes, run the non-standard
typecheck command `npm run types:check`.

Load only the guidance relevant to the current task:

- [Repository scope and boundaries](docs/agent-guidance/repository.md)
- [Content authoring](docs/agent-guidance/content-authoring.md)
- [Release notes](docs/agent-guidance/release-notes.md)
- [Verification](docs/agent-guidance/verification.md)
- [Git workflow](docs/agent-guidance/git-workflow.md)
