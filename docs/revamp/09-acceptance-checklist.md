# Acceptance Checklist (Locked)

Last updated: 2026-03-16  
Status: Final verification contract for restart execution

## 1) Global Pass/Fail Conditions
- `npm run build` passes.
- Locked public routes resolve.
- No public `/research` route exists.
- Canonical policy is enforced (`/` root, no trailing slash for non-root).
- Sitemap includes only canonical locked URLs.
- Legacy slugs are redirect-only, never canonical pages.

## 2) Navigation and Footer
- Header primary nav order matches locked sequence exactly.
- Header contains only top-level items (no child routes).
- Footer groups match locked structure exactly.
- Footer social exposes LinkedIn only.

## 3) Collections and Schema
- Only locked public collections are implemented.
- Normalized frontmatter fields are present for all production entries.
- Validation fails loudly on missing structural fields.
- Legacy canonical paths fail validation for primary entries.
- Schema generation is centralized (no raw markdown JSON schema dumps).

## 4) Content Ingestion
- All 37 production markdown files ingested.
- Glossary generated from `Content/Glossary.md`:
  - glossary hub at `/glossary`
  - 59 term pages at `/glossary/{term-slug}`
- Market overview generated from `Content/market-overview.md`:
  - hub + 5 child pages
- Unsupported/fabricated claims are absent.

## 5) Content Hygiene
- Raw appendix metadata snapshots are not rendered in live body.
- Raw JSON-LD blocks from source markdown are not rendered in live body.
- Internal audit content is not shipped.
- Duplicate/junk/system artifacts are excluded from live site.

## 6) Typography
- Typography token source exists and is wired.
- Tailwind token mapping aligns to token source.
- Single reusable prose surface used across long-form templates.
- No typography px units in templates/components/markdown render path.
- No inline font-size/family/line-height overrides in page content templates.

## 7) Images and Diagrams
- 34 framework diagrams normalized into locked directory scheme.
- Diagram asset map exists and is complete.
- Figure rendering is bounded + aspect-ratio reserved + expandable.
- Non-critical images lazy-load.
- No raw oversized diagram dumps in article flow.

## 8) Related Content Engine
- Centralized utility is used (not template-local duplication).
- Deterministic ranking priority is enforced.
- Related links resolve to locked canonical slugs only.

## 9) Metadata, Canonicals, Sitemap
- Canonical tags emit no-trailing-slash non-root URLs.
- Sitemap emits canonical URLs only.
- Key pages are reachable within three clicks from home.
- No date-based URLs and no crawl dead ends.

## 10) Redirect and Deployment Verification
- `public/_redirects` contains known legacy -> canonical redirects.
- Additional discovered legacy redirects added during ingestion.
- Host-level 301 behavior smoke-tested after deployment.
  - Note: local static build cannot validate host redirect execution.

## 11) Block 14 Exit Rule
Block 14 is complete only when:
- implementation tasks are done,
- validation checks pass,
- any remaining items are editorial-only refinements.
