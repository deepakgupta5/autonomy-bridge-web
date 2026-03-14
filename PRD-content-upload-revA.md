# Autonomy Bridge Content Upload PRD (Rev A)
*Date: 2026-03-13*
*Applies to repo: `/Users/deepakgupta/Documents/New project/autonomy-bridge-web`*

## Status of prior PRD

The file `PRD - autonomy-bridge-content implementation.md` is **not fully valid** against the current repo and new payloads.

Why it is outdated:

1. It assumes an older baseline (many files marked "DO NOT TOUCH") that no longer matches current local state.
2. The new payload is ZIP-based (`site-content.zip`, `public-diagrams.zip`) and includes content not represented in the old batch text flow.
3. Payload markdown includes `__MACOSX`, `._*`, and brace-literal junk paths that must be excluded.
4. Payload markdown includes inline component tags (`<DecisionBoundary ... />`, `<InternalLinks ... />`) that are not safe to import directly into current `.md` collection files.
5. Payload article files contain hard-wrapped paragraph lines that can create broken reading flow.

This revision supersedes the old PRD for content upload execution.

---

## Source of truth for this upload

Use these artifacts as canonical content input:

- `/Users/deepakgupta/Documents/Autonomy Bridge/Website/site-content.zip`
- `/Users/deepakgupta/Documents/Autonomy Bridge/Website/public-diagrams.zip`

Ignore non-content ZIP entries:

- `__MACOSX/**`
- `._*` files
- directory names containing literal braces like `{articles,...}`

---

## Guardrails

1. Do not modify `src/content/config.ts`.
2. Do not remove existing fixes currently in working tree:
   - `public/diagrams/robotics-payback-economics-framework.png` deletion
   - `src/components/Header.astro` nav updates
   - `src/styles/global.css` additions (`article-cta`, `frameworks-nav-links`)
   - `src/content/articles/why-robotics-pilots-fail-to-scale.md` heading fixes
3. Keep canonical host behavior unchanged (`www.autonomybridge.com`).
4. No commit unless explicitly requested.

---

## Execution Plan

### Step 1: Diagram sync

Target directory:

- `public/diagrams/`

Actions:

1. Copy all PNG files from `public-diagrams.zip/public-diagrams/` into `public/diagrams/`.
2. Keep only intended named assets.
3. Ensure stale orphan file is absent:
   - `public/diagrams/robotics-payback-economics-framework.png`

Acceptance:

- Diagram count and names match expected set.

### Step 2: Collection content import (with sanitation)

Targets:

- `src/content/articles/*.md`
- `src/content/frameworks/*.md`
- `src/content/use-cases/*.md`
- `src/content/case-studies/*.md`
- `src/content/glossary/*.md`

Import from matching folders inside `site-content.zip/site-content/`.

Sanitation rules (required before/while copying):

1. Strip all inline component tags from markdown bodies:
   - `<DecisionBoundary ... />`
   - `<InternalLinks ... />` blocks
2. Preserve frontmatter keys required by schema.
3. Normalize paragraph wrapping:
   - Join hard-wrapped prose lines into normal paragraphs.
   - Preserve headings, lists, tables, code blocks, and blockquotes.
   - Remove extra blank-line noise created by extraction.
4. Keep ASCII punctuation where practical; avoid smart-quote drift unless already present intentionally.

Acceptance:

- No collection file contains `<DecisionBoundary` or `<InternalLinks`.
- Prose renders as normal paragraphs without one-line-per-row fragmentation.

### Step 3: Page-content mapping from `site-content/pages`

Payload includes:

- `home.md`
- `about.md`
- `advisory.md`
- `methodology.md`
- `market-overview.md`

Mapping rules:

1. `home.md` -> update narrative copy in `src/pages/index.astro`.
2. `about.md` -> update copy in `src/pages/about.astro`.
3. `advisory.md` -> update copy in `src/pages/advisory/index.astro`.
4. `methodology.md` -> update copy in `src/pages/methodology.astro`.
5. `market-overview.md` -> update the market-overview section in `src/pages/insights/index.astro`.

Important:

- Do not overwrite `.astro` route files with raw markdown.
- Keep existing schema/breadcrumb/canonical plumbing in route files.

### Step 4: Navigation and SEO checks

Validate:

1. Header includes `Frameworks` and `Glossary`.
2. `public/robots.txt` includes canonical sitemap line.
3. `public/_redirects` preserves canonical host redirects to `www`.
4. `public/sitemap.xml` (or generated sitemap output) includes all current route families.

### Step 5: Validation

Run:

```bash
npm run build
rg -n "<DecisionBoundary|<InternalLinks" src/content
```

Expected:

1. Build succeeds with zero errors.
2. Grep returns no matches.
3. Pages and collection routes render with clean paragraph flow.
4. No regression in existing header/css fixes.

---

## Deliverable format after execution

1. List of files updated by group:
   - diagrams
   - collections
   - page routes
2. Build result summary.
3. Any remaining known gaps requiring manual content authoring.
