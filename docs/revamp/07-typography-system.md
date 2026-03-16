# Typography System (Locked)

Last updated: 2026-03-16  
Status: Locked typography contract with Block 05 implementation mapping

## 1) Source of Truth Files
Implementation must provide:
- `src/styles/tokens.css` (canonical typography token source)
- `src/styles/tailwindThemeTokens.mjs` (Tailwind theme tokens mapped to same values)
- `tailwind.config.mjs` (imports token map and extends theme)
- `src/styles/prose.css` (single reusable long-form content surface)
- `src/styles/global.css` (semantic role classes and global defaults)

No page-level alternate typography systems.

## 2) Font Model (Locked)
Use only:
- `--font-sans` for UI + headings + body + list + metadata
- `--font-mono` for table/data/technical labels where needed

Recommended stack:
- `--font-sans`: `"Geist", "Inter", ui-sans-serif, system-ui, sans-serif`
- `--font-mono`: `"IBM Plex Mono", "SFMono-Regular", ui-monospace, monospace`

No additional font families.

## 3) Units and Scale (Locked)
- Typography must use `rem` only (no `px` sizes for typography).
- Define locked text tokens:
  - `--text-xs`
  - `--text-sm`
  - `--text-base`
  - `--text-lg`
  - `--text-xl`
  - `--text-2xl`
  - `--text-3xl`
  - `--text-4xl`
  - `--text-5xl` (homepage hero only)

## 4) Semantic Role Mapping (Locked)
Map typography by semantic role, not ad hoc class naming:
- `display`
- `h1`
- `h2`
- `h3`
- `h4`
- `h5`
- `h6`
- `body-lg`
- `body`
- `body-sm`
- `caption`
- `eyebrow`
- `meta`
- `list`
- `table`
- `quote`

## 5) Responsive Behavior
- Use `clamp()` for:
  - `display`
  - `h1`
  - `h2`
  - `h3`
- Same token system across mobile and desktop.
- Do not create separate mobile heading scales.

## 6) Readability Rules
- Allowed font weights only: `400`, `600`, `700`.
- Line-height behavior:
  - headings: tighter
  - body: looser
  - captions/meta: tighter than body

## 7) Reusable Prose Surface (Locked)
One shared long-form wrapper must be used across:
- frameworks
- insights
- use cases
- case studies
- methodology
- market overview hub + children
- glossary term pages
- advisory/bespoke research long-form sections
- about page

The shared prose surface must standardize:
- readable measure width
- heading margins
- paragraph rhythm
- intro paragraph style
- list spacing and indentation
- ordered list markers
- blockquote style
- inline code/data label style
- table typography + overflow handling
- figure spacing
- caption style
- FAQ styling
- citation/note styling
- anchor link style
- glossary chip/tag style

## 8) Anti-Drift Cleanup Rules
Remove/forbid:
- inline `font-size`
- inline `font-family`
- inline `line-height`
- typography `!important` usage
- duplicate prose styles
- page-specific heading overrides unless centralized

## 9) Validation Gates
- Token files exist and are wired to templates.
- No typography `px` values in components/templates/markdown renderers.
- Global typography derives from locked semantic roles.
- Long-form pages use shared prose surface component/class only.
