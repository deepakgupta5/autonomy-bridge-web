# Content Collections and Validation Contract

Last updated: 2026-03-16  
Status: Locked for restart execution

## 1) Required Public Collections (Locked)
- `frameworks`
- `insights`
- `useCases`
- `caseStudies`
- `marketOverview`
- `glossary`
- `pages`
- `legal`

Do not create a public `research` collection.

## 2) Collection Intent
- `frameworks`: 7 framework detail entries + framework hub support data
- `insights`: 6 insight detail entries + insights hub support data
- `useCases`: 4 use case detail entries + use-cases hub support data
- `caseStudies`: 5 case study detail entries + case-studies hub support data
- `marketOverview`: 1 hub + 5 child entries
- `glossary`: 1 hub + 59 term entries
- `pages`: static/service/company pages (home, methodology, advisory, bespoke research, about, contact where modeled as content)
- `legal`: privacy policy, terms of use, cookie policy

## 3) Locked Normalized Frontmatter Fields
Every production entry must normalize to these top-level fields:
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

Optional migration-only metadata may be preserved:
- `migration.sourceFilename`
- `migration.aipmVersion`

Migration-only metadata must not be exposed in live page body.

## 4) Validation Rules (Fail Loudly)
- Missing required structural fields must fail validation.
- `canonicalPath` must start with `/`.
- Non-root `canonicalPath` must not have trailing slash.
- `canonicalPath` must resolve to locked route set (or glossary term path pattern).
- Legacy path variants must fail as canonical entries.
- `contentType` must match allowed enum values.

## 5) Canonical and Legacy Slug Handling
- Locked slugs are canonical publication paths.
- Legacy slugs are redirect-only.
- Never publish both legacy and canonical paths as primary pages.
- Maintain a centralized `legacySlug -> canonicalSlug` mapping utility.

Known required legacy mappings:
- `/insights/how-warehouse-robotics-economics-works` -> `/insights/how-warehouse-robotics-economics-actually-works`
- `/use-cases/evaluating-warehouse-automation-roi` -> `/use-cases/warehouse-automation-roi-evaluation`

Additional mappings discovered during ingestion must be appended centrally.

## 6) Production Source Requirements
- Source-of-truth ingestion: `Content.zip`.
- Ingest all 37 production markdown files.
- Use `Content/Glossary.md` as glossary source (hub + 59 terms).
- Use `Content/market-overview.md` as source for market overview hub + 5 child pages.

## 7) Prohibited Publication Inputs
Do not publish these artifacts into live content collections:
- `Audit link.md`
- `__MACOSX/*`
- `.DS_Store`
- duplicate nested archives
- raw appendix metadata snapshots
- raw JSON-LD schema blocks from source markdown body
- internal audit fragments

## 8) Block 04 Acceptance Criteria
- All locked collections declared.
- Strict normalized schema implemented and active.
- Validation errors are explicit and blocking.
- Canonical policy enforced in schema.
- Legacy slug paths excluded from canonical publication.
