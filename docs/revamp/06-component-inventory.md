# Component Inventory and Ownership

Last updated: 2026-03-16  
Status: Restart component contract with Block 06 global shell implementation

## 1) Purpose
Define the intended reusable component inventory before implementation so we avoid page-specific drift and duplicated logic.

## 2) Global Shell Components (Implemented in Block 06)
- `MainLayout`
  - Ownership: global metadata, canonical tags, shared head tags, global wrappers.
- `Header`
  - Ownership: locked primary navigation order only.
- `Footer`
  - Ownership: locked footer grouping and links (LinkedIn only for social).
- `Breadcrumbs`
  - Ownership: deterministic breadcrumb rendering for hubs and detail pages.
- `LocalSubnav`
  - Ownership: section-local navigation for hubs and market overview children.

## 3) Content Presentation Components (Planned)
- `ProseSurface`
  - Ownership: standardized long-form typography and spacing surface.
- `ContentIntro`
  - Ownership: title, summary/description intro block.
- `TaxonomyChips`
  - Ownership: display of frameworks/topics/technologies/industries chips.
- `RelatedContent`
  - Ownership: deterministic related-content rendering fed by central utility.
- `FaqBlock`
  - Ownership: structured FAQ rendering (without raw JSON block duplication).

## 4) Media Components (Planned)
- `Figure`
  - Ownership: bounded figure display, caption, spacing, optional framing.
- `ZoomImage` (or equivalent modal/lightbox wrapper)
  - Ownership: preview-to-expand behavior with aspect-ratio reservation and lazy loading for non-critical media.

## 5) Hub Template Components (Planned)
- `HubPageTemplate`
  - Ownership: intro, optional local nav, card grid, empty state.
- `ContentCard`
  - Ownership: reusable card for insights/frameworks/use cases/case studies.
- `GlossaryTermCard` (if glossary hub requires variant)
  - Ownership: term title + concise definition preview.

## 6) Detail Template Components (Planned)
- `FrameworkTemplate`
- `InsightTemplate`
- `UseCaseTemplate`
- `CaseStudyTemplate`
- `GlossaryTermTemplate`
- `MarketOverviewChildTemplate`
- `StaticPageTemplate` (methodology/advisory/bespoke research/about/contact)
- `LegalTemplate`

Each template must consume centralized utilities for metadata, schema, breadcrumbs, and related content.

## 7) Utility Modules (Planned)
- `src/utils/relatedContent.ts`
  - Deterministic cross-link ranking.
- `src/utils/schema.ts`
  - Centralized schema generation only.
- `src/utils/canonical.ts` (or equivalent)
  - Canonical no-trailing-slash normalization.
- `src/data/diagramAssetMap.ts`
  - Diagram source-to-normalized mapping.

## 8) Anti-Drift Rules
- No page-level one-off typography systems.
- No duplicated related-content logic inside templates.
- No inline schema JSON copied from markdown bodies.
- No raw oversized diagram rendering in article flow.
- No child routes in global header.

## 9) Block Alignment
- Block 06 builds global shell components.
- Block 07 builds hub templates.
- Block 08 builds detail templates.
- Block 09 builds media/figure system.
- Block 10/11 wire utilities into templates/components.
