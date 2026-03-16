# Taxonomy and Relationship Schema (Locked)

Last updated: 2026-03-16  
Status: Locked taxonomy contract for restart

## 1) Purpose
Define deterministic taxonomy and cross-content relationship rules used by:
- related-content engine
- hubs and detail templates
- schema generation
- glossary and framework linking

No heuristic/random ranking is allowed.

## 2) Core Taxonomy Axes
- `frameworks`
- `topics`
- `industries`
- `technologies`
- `relatedGlossary`
- `relatedUseCases`
- `relatedCaseStudies`
- `relatedInsights`

All arrays should be normalized to lower-kebab-case slugs where appropriate.

## 3) Content-Type Taxonomy Expectations
- `frameworks`: must include framework identity; may include mapped related insights/use cases/case studies.
- `insights`: should link to one or more relevant frameworks and taxonomy terms when supported by source.
- `useCases`: should link to relevant frameworks and related insights/case studies.
- `caseStudies`: should link to relevant frameworks and related insights/use cases.
- `marketOverview`: may include topic/industry/technology tagging where source supports.
- `glossary`: must include glossary category + related frameworks where derivable.
- `pages`/`legal`: typically minimal taxonomy arrays unless source provides explicit links.

## 4) Locked Deterministic Related-Content Priority
When multiple candidates qualify, rank in this order:
1. explicit related arrays in entry frontmatter
2. shared framework
3. shared topic
4. shared technology
5. shared industry

Stable deterministic ordering is required after scoring ties.

## 5) Framework Relationship Baseline (Locked)

### Robotics ROI Model (`robotics-roi-model`)
Related insights:
- `how-warehouse-robotics-economics-actually-works`
- `how-warehouse-workflows-determine-automation-success`
- `why-mid-market-operators-struggle-to-evaluate-warehouse-robotics`
- `why-robotics-pilots-fail-to-scale`
- `why-warehouse-automation-projects-fail`
- `how-warehouse-operators-evaluate-robotics-vendors`

Related use cases:
- `warehouse-automation-roi-evaluation`
- `robotics-deployment-3pl-warehouses`
- `amr-deployment-evaluation`

Related case studies:
- `automation-deployment-risk-assessment`
- `vendor-deployment-viability-assessment` (secondary)
- `robotics-pricing-strategy-research` (secondary)

### Automation Failure Framework (`automation-failure-framework`)
Related insights:
- `why-warehouse-automation-projects-fail`
- `how-warehouse-robotics-economics-actually-works`
- `how-warehouse-workflows-determine-automation-success`

Related use cases:
- `warehouse-automation-roi-evaluation`
- `robotics-deployment-3pl-warehouses`

Related case studies:
- `automation-deployment-risk-assessment`
- `vendor-deployment-viability-assessment` (secondary)

### Warehouse Automation Decision Framework (`warehouse-automation-decision-framework`)
Related insights:
- `why-mid-market-operators-struggle-to-evaluate-warehouse-robotics`
- `how-warehouse-operators-evaluate-robotics-vendors`

Related use cases:
- `goods-to-person-system-evaluation`

Related case studies:
- `robotics-market-entry-decision-analysis`
- `ai-robotics-market-sizing-engagement`

### Pilot-to-Scale Failure Framework (`pilot-to-scale-failure-framework`)
Related insights:
- `why-robotics-pilots-fail-to-scale`

Related case studies:
- `vendor-deployment-viability-assessment`

### Vendor Economics Framework (`vendor-economics-framework`)
Related insights:
- `how-warehouse-operators-evaluate-robotics-vendors` (secondary)

Related case studies:
- `robotics-pricing-strategy-research`
- `robotics-market-entry-decision-analysis` (secondary)

### Vendor Evaluation Framework (`vendor-evaluation-framework`)
Related insights:
- `how-warehouse-operators-evaluate-robotics-vendors`
- `why-mid-market-operators-struggle-to-evaluate-warehouse-robotics`

Related case studies:
- `vendor-deployment-viability-assessment`
- `robotics-market-entry-decision-analysis` (secondary)

### Workflow Architecture Framework (`workflow-architecture-framework`)
Related insights:
- `how-warehouse-workflows-determine-automation-success`
- `how-warehouse-robotics-economics-actually-works`

Related use cases:
- `amr-deployment-evaluation`
- `goods-to-person-system-evaluation`

## 6) Glossary Taxonomy Rules (Locked)
- Glossary source of truth: `Content/Glossary.md`.
- Generate 59 term entries.
- Each glossary term must include:
  - `term` (or title equivalent)
  - `slug`
  - `definition`
  - `glossaryCategory`
  - `relatedFrameworks` (where derivable)
  - `relatedPages` (if discoverable from source links)
  - canonical path (`/glossary/{slug}`)
- Preserve source term IDs (`T01` ... `T59`) as stable internal references.

## 7) Market Overview Taxonomy Rules
- Source: `Content/market-overview.md`.
- Output: hub + five child pages.
- Child pages must use only source-supported content.
- Thin sections may use structured shell content from source text only.

## 8) Validation and Drift Controls
- Relationship links must target locked slugs only.
- Broken related links fail validation.
- Legacy slugs cannot appear in related arrays after normalization.
- Relationship computation must be centralized (single utility), not template-local.
