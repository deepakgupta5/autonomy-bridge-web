# Autonomy Bridge Revamp Master PRD (Restart Baseline)

Last updated: 2026-03-16  
Status: Locked execution baseline for restart branch `codex/revamp-restart`

## 1) Governing Source Order (Highest to Lowest)
1. This master specification file
2. `Codex Implementation.pdf`
3. `Website Structure Revamp.pdf`
4. `Rules for Codex.pdf`
5. `Content.zip` production content pack
6. Existing Astro repo state

## 2) Execution Law (Locked)
- Execute one block at a time.
- Do not redesign architecture.
- Do not change locked URLs or slugs.
- Do not create a public `/research` section.
- Do not invent business, market, or editorial claims not supported by source files.
- Ingest only production site content and production diagram assets.
- Exclude junk/system/internal artifacts:
  - `__MACOSX/`
  - `.DS_Store`
  - `~$gal footer.docx`
  - `Audit link.md`
  - duplicate nested `Diagrams.zip` if raw production PNGs are normalized.
- Prefer centralized reusable utilities over page-specific logic.
- Prefer diff-based, reviewable edits.
- Stop after each block and return only the required output contract.

## 3) Canonical URL Policy (Locked)
- Root canonical: `/`
- All other canonicals: no trailing slash
- Internal links: no trailing slash (non-root)
- Sitemap: emit canonical no-trailing-slash URLs only
- Redirect behavior: `/path/ -> /path` (never redirect `/` to empty)

## 4) Critical Conflict Resolutions (Locked)
1. No public `/research` route, nav item, footer item, collection, schema target, or related-content surface.
2. Canonical slugs must come from production content and locked route table (no shorthand placeholders).
3. Footer social is LinkedIn only.
4. Glossary must be a true collection:
   - hub at `/glossary`
   - 59 term pages at `/glossary/{term-slug}`
5. Market Overview must be hub + 5 child routes using source-supported content only.
6. This phase is real implementation + real content ingestion, not placeholders.

## 5) Locked Information Architecture

### 5.1 Primary Navigation Order
1. Home
2. Insights
3. Market Overview
4. Frameworks
5. Use Cases
6. Case Studies
7. Methodology
8. Glossary
9. Advisory
10. Bespoke Research
11. About

### 5.2 Footer Structure
- Follow Us: LinkedIn
- Knowledge: Insights, Frameworks, Use Cases, Case Studies, Glossary
- Services: Advisory, Bespoke Research
- Company: About, Contact
- Legal: Privacy Policy, Terms of Use, Cookie Policy
- Utility: Sitemap

### 5.3 Locked Public Routes
Top-level:
- `/`
- `/insights`
- `/market-overview`
- `/frameworks`
- `/use-cases`
- `/case-studies`
- `/methodology`
- `/glossary`
- `/advisory`
- `/bespoke-research`
- `/about`
- `/contact`
- `/privacy-policy`
- `/terms-of-use`
- `/cookie-policy`
- `/sitemap`

Frameworks:
- `/frameworks/robotics-roi-model`
- `/frameworks/automation-failure-framework`
- `/frameworks/warehouse-automation-decision-framework`
- `/frameworks/pilot-to-scale-failure-framework`
- `/frameworks/vendor-economics-framework`
- `/frameworks/vendor-evaluation-framework`
- `/frameworks/workflow-architecture-framework`

Insights:
- `/insights/how-warehouse-robotics-economics-actually-works`
- `/insights/why-mid-market-operators-struggle-to-evaluate-warehouse-robotics`
- `/insights/how-warehouse-workflows-determine-automation-success`
- `/insights/how-warehouse-operators-evaluate-robotics-vendors`
- `/insights/why-warehouse-automation-projects-fail`
- `/insights/why-robotics-pilots-fail-to-scale`

Use Cases:
- `/use-cases/warehouse-automation-roi-evaluation`
- `/use-cases/robotics-deployment-3pl-warehouses`
- `/use-cases/amr-deployment-evaluation`
- `/use-cases/goods-to-person-system-evaluation`

Case Studies:
- `/case-studies/automation-deployment-risk-assessment`
- `/case-studies/robotics-market-entry-decision-analysis`
- `/case-studies/ai-robotics-market-sizing-engagement`
- `/case-studies/vendor-deployment-viability-assessment`
- `/case-studies/robotics-pricing-strategy-research`

Market Overview children:
- `/market-overview/industry-landscape`
- `/market-overview/technology-stack`
- `/market-overview/market-drivers`
- `/market-overview/market-segments`
- `/market-overview/key-players`

Glossary:
- `/glossary`
- `/glossary/{term-slug}` for all 59 terms

## 6) Locked Collections
- `frameworks`
- `insights`
- `useCases`
- `caseStudies`
- `marketOverview`
- `glossary`
- `pages`
- `legal`

No public `research` collection.

## 7) Locked Frontmatter Normalization Fields
- `title`
- `slug`
- `description`
- `summary`
- `contentType`
- `status`
- `canonicalPath`
- `seoTitle`
- `seoDescription`
- `keywords`
- `frameworks`
- `topics`
- `industries`
- `technologies`
- `relatedGlossary`
- `relatedUseCases`
- `relatedCaseStudies`
- `relatedInsights`
- `draft`
- `documentId`
- `authors`
- `datePublished`
- `dateModified`

Migration-only metadata may be preserved (for example source filename, AIPM version) but not exposed on live pages.

## 8) Production Inventory (Locked)
- Markdown production files: 37
  - 7 frameworks
  - 6 insights
  - 4 use cases
  - 5 case studies
  - 15 core/hub/service/legal/company
- Glossary source: 1 file (`Glossary.md`) containing 59 terms across 4 sections
- Framework diagrams: 34 production PNGs

## 9) Diagram Normalization Rules
- Normalize all 34 framework diagrams under:
  - `/public/diagrams/frameworks/{framework-slug}/{framework-slug}-diagram-XX.png`
- Create and maintain:
  - `src/data/diagramAssetMap.ts`
  - `docs/revamp/diagram-asset-map.md`
- Rendering pattern:
  - bounded preview
  - aspect-ratio reserved
  - lazy load non-critical
  - click/tap expand via reusable figure/zoom component
  - no full-size raw inline dump

## 10) Block Sequence (Locked)
1. Block 01 repo audit
2. Block 02 control-pack generation
3. Block 03 information architecture and route shells
4. Block 04 collections and schema validation
5. Block 05 typography system
6. Block 06 global layout/header/footer/breadcrumbs/local subnav
7. Block 07 hub templates
8. Block 08 detail templates
9. Block 09 image normalization and figure system
10. Block 10 taxonomy-driven related content
11. Block 11 schema layer
12. Block 12 metadata, canonicals, sitemap
13. Block 13 production content ingestion
14. Block 14 QA and acceptance sweep

## 11) Required Output Contract Per Block
- Block ID
- Status
- Files created
- Files modified
- Files removed
- Validation run
- Deviations from spec, if any
- Next block

No long narrative in block-completion reports.

## 12) Residual Verification Requirement
- Redirect behavior in `public/_redirects` must be smoke-tested on deployed host.
- Local static build cannot execute host-level 301 behavior and is not sufficient for this verification.
