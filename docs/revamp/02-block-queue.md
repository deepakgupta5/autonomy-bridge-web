# Block Queue (Restart)

Last updated: 2026-03-16  
Execution mode: one block at a time, one file at a time, file-by-file audits.

## Queue

### Block 00 — Authority Lock + Control Pack Bootstrap
Scope:
- Establish governing authority and locked execution rules.
- Create restart control-pack skeleton under `docs/revamp/`.

Acceptance:
- `00-master-prd.md` created and aligned to locked spec.
- `01-execution-contract.md` created and aligned to strict cadence.
- This `02-block-queue.md` created.

### Block 01 — Repo Audit
Scope:
- Audit current repo state after hard clean.
- Document baseline structure, missing runtime files, and drift risks.
- No architecture implementation yet.

Acceptance:
- `repo-audit.md` created.
- Findings include routes/layout/content/schema/sitemap/image handling status.
- Risks and blockers explicitly listed.

### Block 02 — Control Pack Generation
Scope:
- Generate all remaining control files under `docs/revamp/`.
- Lock route table, collections, schema policy, taxonomy, typography, image policy, checklist.

Required files:
- `03-site-map-and-slugs.md`
- `04-content-collections.md`
- `05-taxonomy-schema.md`
- `06-component-inventory.md`
- `07-typography-system.md`
- `08-image-system.md`
- `09-acceptance-checklist.md`
- `diagram-asset-map.md` (initial scaffold)

Acceptance:
- All required control files exist.
- All files align with locked master rules and no-trailing-slash canonical policy.

### Block 03 — Route Shells + IA
Scope:
- Rebuild locked top-level and child route shells.
- Exclude `/research`.

Acceptance:
- Every locked route resolves.
- Primary nav surfaces only locked top-level entries.
- Footer locked structure is implemented in Block 06.

### Block 04 — Collections + Validation
Scope:
- Implement locked collections and strict normalized schema validation.
- Enforce canonical-path lock and legacy slug exclusion from canonical publication.

Acceptance:
- Validation fails loudly on required structural fields.
- Locked canonical policy enforced in schema and routing behavior.

### Block 05 — Typography System
Scope:
- Build token source + Tailwind mapping + reusable prose surface.

Acceptance:
- Rem-only typography tokens.
- Semantic role mapping and clamp() on display/h1/h2/h3.

### Block 06 — Layout + Global Navigation
Scope:
- Build main layout, locked header/footer, breadcrumbs, local subnav.

Acceptance:
- Nav order exactly locked.
- Footer groups exactly locked with LinkedIn only.

### Block 07 — Hub Templates
Scope:
- Implement reusable hub templates for insights/frameworks/use-cases/case-studies/glossary/market-overview.

Acceptance:
- Intro, cards, metadata, taxonomy chips, empty states, local nav supported.

### Block 08 — Detail Templates
Scope:
- Implement detail templates for all locked content types and static/legal pages.

Acceptance:
- Content body rendering normalized and heading rules enforced.

### Block 09 — Diagram Normalization + Figure System
Scope:
- Ingest and normalize 34 diagrams to locked path/naming.
- Implement reusable preview-to-expand image pattern.

Acceptance:
- `src/data/diagramAssetMap.ts` present.
- `docs/revamp/diagram-asset-map.md` updated with mapping rows.

### Block 10 — Related Content Engine
Scope:
- Implement centralized taxonomy-driven related-content utility.

Acceptance:
- Deterministic priority ordering:
  1. explicit related arrays
  2. shared framework
  3. shared topic
  4. shared technology
  5. shared industry

### Block 11 — Schema Layer
Scope:
- Implement centralized schema utility for Organization/WebSite/BreadcrumbList/Article/FAQ/DefinedTerm/etc.

Acceptance:
- No raw JSON schema blocks copied from markdown body.

### Block 12 — Metadata + Canonicals + Sitemap
Scope:
- Implement metadata defaults, canonical tags, sitemap generation, redirect policy.

Acceptance:
- Non-root canonicals no trailing slash.
- Sitemap contains only locked canonical URLs.
- Legacy slugs redirect-only.

### Block 13 — Production Content Ingestion
Scope:
- Ingest all 37 markdown files from production content source.
- Split `Glossary.md` into glossary hub + 59 term pages.
- Split/scaffold `market-overview.md` into hub + 5 child pages.

Acceptance:
- Source-supported content only, no fabricated claims.
- No appendix metadata snapshots or raw JSON-LD rendered in live body.

### Block 14 — QA + Acceptance Sweep
Scope:
- Full build + route/nav/footer/schema/related-content/glossary/diagram validation.

Acceptance:
- Build passes.
- Locked route table satisfied.
- Redirect/canonical/sitemap policy satisfied.
- Remaining work (if any) is editorial only.

## Block Exit Contract (Mandatory)
- Block ID
- Status
- Files created
- Files modified
- Files removed
- Validation run
- Deviations from spec, if any
- Next block
