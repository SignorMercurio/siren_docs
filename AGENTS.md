# Agent Instructions

This repository contains the official SIREN documentation site.

## Scope

- Treat `content/docs/(siren)/` as the canonical SIREN end-user documentation.
- Keep release notes and feature docs evidence-based. Verify behavior against `/Users/merc/Projects/siren` when documenting implementation-driven changes.
- Write user-facing documentation, not internal implementation notes, unless the page is explicitly about architecture or development.

## Project Map

- `content/docs/(siren)/`: official SIREN end-user MDX documentation.
- `content/img/`: screenshots and other documentation images.
- `app/`, `components/`, `lib/`: Next.js/Fumadocs site shell and shared UI code.
- `source.config.ts`: Fumadocs content source configuration.

## Editing

- Prefer small, focused documentation changes that match the existing MDX style.
- Preserve existing Chinese terminology and page structure where possible.
- Use existing Fumadocs components already imported in nearby pages before introducing new patterns.
- Add screenshots under `content/img/` only when they materially improve the page.

## Validation

Run this after MDX or TypeScript-facing documentation edits:

```bash
npm run types:check
```

For broader site changes, also run:

```bash
npm run build
```

## Git

- Use conventional commits for documentation changes, for example `docs(siren): add v2.3.0 changelog`.
- Keep generated or unrelated local artifacts out of commits unless they are required by the documentation change.
