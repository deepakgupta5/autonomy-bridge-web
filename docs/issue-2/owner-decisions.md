# Owner decisions and measurement access — 20 October 2026

These items are not silently resolved by either draft PR. No equations, article claims, research dates, author identities, crawler permissions or analytics settings were changed.

## Equations and utilization claims

| Exact location | Existing statement | Decision needed |
| --- | --- | --- |
| `src/content/frameworks/robotics-roi-model.md:286–293`, Component 3, paragraph labelled Average utilization; `/frameworks/robotics-roi-model` | `U = Tsystem / Davg`; U described as utilization of installed robotic capacity | Confirm whether Tsystem means available capacity or actual achieved throughput and specify consistent units/time window. Capacity divided by demand increases as demand falls, whereas surrounding prose says utilization falls. Owner must validate direction and definition; no formula substitution made. |
| Same file, lines 392–413, Component 6: Payback Model | `ROI = Ccapex / (Total Savings − Ccapex)`, followed by `Total Savings = ∑ Savingst`, `Savingst = Clabor × Lsub × U` | Confirm whether this is intended as ROI, payback duration or a different capital-recovery ratio. Currency divided by cumulative net currency is dimensionless, not a time-valued payback period; define horizon, annualization, operating/integration costs and treatment of zero/negative denominator. No corrected equation invented. |
| `src/content/glossary/autonomous-mobile-robot.md:51`, economic-utilization paragraph; `/glossary/autonomous-mobile-robot` | approximately 70–80% utilization | Owner must validate this AMR-specific claim, definition, assumptions and evidence. It differs from the former llms.txt general >82% statement, which is removed as unsupported rather than harmonized by guessing. |
| `src/content/frameworks/automation-failure-framework.md:267` | `U = Installed Capacity / Actual Task Volume` | Same inverse-ratio concern; review alongside the ROI model rather than fixing one page in isolation. |

The existing ROI diagram (`public/diagrams/frameworks/robotics-roi-model/robotics-roi-model-diagram-01.png`) also describes utilization as active robot hours divided by total capacity, payback as capital divided by annual labor savings, and a congestion branch at U >85%. These differ from the prose equations/thresholds and must be reviewed together; the approved existing asset is rendered unchanged, not fact-checked or rewritten.

The former llms.txt 18-month, 60%, >82%, 120-day and ATP claims are removed, not newly substantiated. Do not reuse the unresolved equations/thresholds in snippets or AI summaries pending owner review.

## Source attribution: representative inventory

See `attribution-inventory.json` for exact schema, existing proprietary attributions, limitations and public outbound URLs on four representative pages. All four have an author in structured data, no visible standalone author/date row or `<time>` element, and zero third-party outbound source links in the article body. Framework/insight schema dates are 2026-03-15; use-case/case-study dates are 2026-03-30. Dates were preserved.

- `/frameworks/robotics-roi-model`: explicit proprietary-analysis attribution; assumptions and limitations are retained. Equation validation remains required.
- `/insights/why-robotics-pilots-fail-to-scale`: Deepak Gupta in Article schema; visible proprietary analysis and internal framework links, no independent external source evidence established.
- `/use-cases/retail-dc-automation-evaluation`: internal framework references and operational assumptions retained. Do not relabel as a client engagement.
- `/case-studies/retail-dc-peak-demand-automation-assessment`: existing case identity, narrative, assumptions and limitations retained. Do not relabel as hypothetical or infer permission for underlying client evidence.

Proposal, not implemented: display the existing author/publication date consistently, and add a readable Sources/Assumptions section only after the owner identifies exact public documents or explicitly authorizes excerpts. Existing published internal framework links can remain as analytical context; they are not independent substantiation. No unverified third-party source is proposed as proof. The already-public proprietary-analysis labels remain visible; no private narratives or hidden citation appendices were exposed. Linked public citations are preserved; unlinked `[C1]`-style markers that previously referenced hidden internal appendices receive the same build-time presentation cleanup as before.

## Search Console and Bing access

Read-only browser inspection used the existing Chrome session; no login or account configuration was performed.

- Google Search Console opened authenticated on its welcome page. The property selector showed **No matching property** and **Add property**, with no AutonomyBridge property available in this account. This does not establish whether a property exists under another account. Apex verification, submitted sitemap, indexing, Google-selected canonical, query clusters and generative-feature reports are **unverified**.
- Bing Webmaster Tools opened its public About page with **Sign In**, so no authenticated property/report access was available. Apex property and sitemap status are **unverified**.
- No verification files/meta tags were found in active site source. This does not rule out DNS verification or another account.

Exact next actions for the owner: identify the account holding `autonomybridge.com` and grant access, or explicitly authorize new verification. After the canonical PR is approved and deployed, inspect/submit `https://autonomybridge.com/sitemap-index.xml` in each verified property. Use URL Inspection for Home, both services, one research detail, glossary and Methodology; record user-declared versus selected canonical and last crawl date. After recrawl, compare Commercial Leadership and AI Consulting query/page groups separately from research, and inspect the available generative-AI report. Do not interpret launch-era/stale results as failure. No analytics is needed or enabled by this work.

## Crawler policy — separate owner choice

Current `robots.txt` explicitly allows GPTBot, ClaudeBot and Google-Extended. Both PRs retain these rules exactly; only the sitemap host changes. Owner decision: retain each permission or disallow individual training/extended-use tokens while independently deciding search/discovery access. No default inferred from interest in search visibility. Google documents that Google-Extended does not affect inclusion/ranking in Google Search; see [Google common crawlers](https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers).

The neutral llms.txt is a link directory, not a claimed ranking intervention. [Google's AI optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) states Google Search does not use llms.txt for visibility/ranking. [Canonical guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls) supports consistent canonical signals; this change does not guarantee canonical selection or indexing.
