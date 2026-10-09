# Content Authoring

- Write for SIREN end users unless the page explicitly covers architecture or
  development.
- Lead with visible behavior. Keep AIR, WebUI, and MCP implementation wiring in
  dedicated setup or maintainer pages.
- Keep pages concise. Omit UI details readers can see on screen, internal
  mechanics, rare edge cases, and page previews or summaries. State each fact
  once in its canonical page (limits, config keys, MCP, snapshot format,
  security, FAQ) and link to it elsewhere.
- Preserve established Chinese terminology and the surrounding MDX structure.
- Reuse Fumadocs components already imported by nearby pages before introducing
  a new pattern.
- Store documentation images under `content/img/` and reference them with a
  relative Markdown image path, for example `![alt](../../img/clients-table.png)`.
- Capture WebUI screenshots from a local test server with example data:
  RFC 5737 public IPs, private-range addresses, placeholder instance IDs and
  UIDs. Never show real hosts, accounts, or paths from the capturing machine.
- Draw architecture and relationship diagrams as images, not ASCII art: provide
  light and dark WebP variants and render them with `<ThemeImage>`. Plain code
  blocks remain fine for directory trees and file formats.
- Preserve the current documentation-site visual style unless the task requests
  a redesign or visual change.
