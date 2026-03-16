# Site Map and Slugs (Locked)

Last updated: 2026-03-16  
Authority: Restart master spec + production content pack

## 1) Canonical URL Policy
- Root canonical: `/`
- All non-root canonicals: no trailing slash
- Internal links: no trailing slash for non-root routes
- Sitemap output: canonical no-trailing-slash URLs only
- Redirect rule: `/path/ -> /path`

## 2) Primary Navigation (Locked Order)
1. Home (`/`)
2. Insights (`/insights`)
3. Market Overview (`/market-overview`)
4. Frameworks (`/frameworks`)
5. Use Cases (`/use-cases`)
6. Case Studies (`/case-studies`)
7. Methodology (`/methodology`)
8. Glossary (`/glossary`)
9. Advisory (`/advisory`)
10. Bespoke Research (`/bespoke-research`)
11. About (`/about`)

Child pages must not appear in global header.

## 3) Footer Topology (Locked)
- Follow Us: LinkedIn
- Knowledge: Insights, Frameworks, Use Cases, Case Studies, Glossary
- Services: Advisory, Bespoke Research
- Company: About, Contact
- Legal: Privacy Policy, Terms of Use, Cookie Policy
- Utility: Sitemap

No Twitter in visible footer.

## 4) Locked Public Routes

### 4.1 Top-Level
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

### 4.2 Framework Routes
- `/frameworks/robotics-roi-model`
- `/frameworks/automation-failure-framework`
- `/frameworks/warehouse-automation-decision-framework`
- `/frameworks/pilot-to-scale-failure-framework`
- `/frameworks/vendor-economics-framework`
- `/frameworks/vendor-evaluation-framework`
- `/frameworks/workflow-architecture-framework`

### 4.3 Insight Routes
- `/insights/how-warehouse-robotics-economics-actually-works`
- `/insights/why-mid-market-operators-struggle-to-evaluate-warehouse-robotics`
- `/insights/how-warehouse-workflows-determine-automation-success`
- `/insights/how-warehouse-operators-evaluate-robotics-vendors`
- `/insights/why-warehouse-automation-projects-fail`
- `/insights/why-robotics-pilots-fail-to-scale`

### 4.4 Use Case Routes
- `/use-cases/warehouse-automation-roi-evaluation`
- `/use-cases/robotics-deployment-3pl-warehouses`
- `/use-cases/amr-deployment-evaluation`
- `/use-cases/goods-to-person-system-evaluation`

### 4.5 Case Study Routes
- `/case-studies/automation-deployment-risk-assessment`
- `/case-studies/robotics-market-entry-decision-analysis`
- `/case-studies/ai-robotics-market-sizing-engagement`
- `/case-studies/vendor-deployment-viability-assessment`
- `/case-studies/robotics-pricing-strategy-research`

### 4.6 Market Overview Child Routes
- `/market-overview/industry-landscape`
- `/market-overview/technology-stack`
- `/market-overview/market-drivers`
- `/market-overview/market-segments`
- `/market-overview/key-players`

### 4.7 Glossary Routes
- `/glossary`
- `/glossary/{term-slug}` for all 59 production glossary terms

## 5) Explicit Exclusions
- No public `/research`
- No `/thank-you`
- No date-based permalink structures
- No alternate canonical variants of locked routes

## 6) Legacy Redirect-Only Paths (Known)
The following paths must never be canonical pages and must resolve via redirect rules only:
- `/insights/how-warehouse-robotics-economics-works` -> `/insights/how-warehouse-robotics-economics-actually-works`
- `/use-cases/evaluating-warehouse-automation-roi` -> `/use-cases/warehouse-automation-roi-evaluation`

Additional legacy paths discovered during ingestion must be added as redirect-only mappings.

## 7) Validation Requirements
- Every locked route resolves in build output.
- No legacy paths appear in canonical tags.
- No legacy paths appear in sitemap.
- Non-root canonicals never end in `/`.
- Root canonical remains `/`.
