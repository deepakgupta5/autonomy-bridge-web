# PR #7 research and privacy corrections

Review baseline: `02b5395`. This report supersedes the factual-disclosure, crawler-decision and date-preservation statements in the previous consolidated report. Only `codex/consolidated-release` / draft PR #7 is being updated. No merge, deployment or real enquiry is authorized or performed.

## Before / after

| Location / issue | Before | Revised treatment |
|---|---|---|
| ROI framework FAQ | Annual capital cost divided by per-unit savings presented as a utilization threshold | Project-specific installed investment and net cash flows over a stated horizon. Solve a break-even loading only if the model supports one. No universal rate. |
| Related warehouse ROI use case, framework hub, linked insights and glossary | General minimum utilization/volume rules; unsupported percentage cutoffs and outcomes in body, summaries and schema | Withdraw or replace specific assertions with project-specific cash-flow conditions. Metadata and generated FAQ answers updated with the visible source. Exact original passages and replacements are indexed in `claim-index.md`. |
| Vendor Economics Framework | `ROI = capital / annual savings`; `ROI = savings / implementation time`; utilization = capacity / volume | Separate payback in years from dimensionless horizon ROI; recurring costs summed over the same horizon; utilization = completed volume / sustainable capacity for the same period. |
| Warehouse Automation Decision Framework | `(labor saving − capital) / Time` labelled ROI | `(sum of incremental net cash flows − initial installed investment) / initial installed investment`, with units, horizon and positive-denominator condition. |
| Retail / pilot-scale economic tests | Amortized capital and depreciation used as a universal viability test; demand average/peak called utilization | Project cash flows with no double-counted depreciation; demand ratio distinguished from system utilization. See `equation-corrections.json`. |
| Unsupported research evidence | Firm numerical/causal claims and company metrics without publishable support; generic disclaimer left them intact | Claim-level withdrawals, metadata corrections and eight shorter analytical rewrites. Unsupported empirical narratives are not rebranded as proven facts or hypothetical client results. The revised eight titles and sections are in `rewritten-analyses.json`. |
| Hub provenance and attribution | Collection-wide primary-research/deployment-data claim; “proprietary analysis” implied evidentiary support | Explicit analytical interpretation / source-account basis. Internal links are navigation, not substantiation. Case identities remain source accounts, not relabelled hypothetical cases. Remaining source narratives are not independently verified client evidence. |
| Research dates | Unsubstantiated March/April public publication and modification dates | Original values retained in source and displayed as source-history records on detail pages. Unsubstantiated public date fields omitted. Actual release date is pending, not invented. Explicit register of **86** material routes drives visible Last updated, schema dateModified and XML lastmod once publication is approved. Shared byline/citation-label-only changes and internal snapshot removal are excluded from that register. |
| Legal revision dates | Old date rendered as current revision | Pending-publication wording now; actual approved release date will appear consistently on all three notices. Methodology’s date handling is unchanged. |
| Terms §11 | “email the contact form” | “use the contact form”, linked to `/contact`. |
| Retired diagram PNG | Missing resource | Explicit 301 to corrected SVG; old redirects, including slash variants, preserved. Local direct HTTP check: 301 → SVG 200. |
| Receipt privacy | Hourly cleanup described as an accomplished action; US East scope ambiguous | 15-minute confirmation validity; cleanup **scheduled** hourly and on expired lookup; production execution unverified and no 15-minute deletion guarantee. Code’s `us-east-2` Ohio configuration is not account-wide residency. Underlying Forms submissions/logs/notifications have separate handling. |
| Crawler policy | Owner decision pending | Owner selected **Allow /** for GPTBot, ClaudeBot and Google-Extended. Public robots file unchanged. No outstanding crawler decision. The older alternative block file is historical, inactive review material. |

The mathematical examples are explanatory arithmetic, not observed deployments. The existing ROI worked example remains: C0 $300,000, net annual cash savings $100,000, simple payback 3 years and five-year undiscounted ROI 66.7%. No new hurdle rate or robotics benchmark was introduced. Definition/method references: [Federal Reserve output/capacity](https://www.federalreserve.gov/releases/g17/CapNotes.htm), NIST AMS 200-11 Appendix A1.3 (linked in the ROI framework). Neither supports a robotics-specific operating threshold. [Google date guidance](https://developers.google.com/search/docs/appearance/publication-dates) distinguishes actual publication/update dates from other dates.

## Evidence and scope

- Fresh local production-mode build: **160 pages**. `build.txt`.
- Routes/sitemaps: **147 research routes**, **156 XML entries**, **158 HTML destinations**; none lost or unreachable; no fragment/breadcrumb failures. Exactly the **eight recorded historical broken destinations**, with no new destinations or referrers. `routes.json`.
- Static research: **55 detail pages**, **19 figures**; existing fragment targets and reference destinations retained; schema identity preserved; current FAQ schema agrees with visible answers. `static.json`.
- Approved proof: **18/18 exact**, including six-hour context and qualifications, in active copy and emitted HTML. `proof.json`.
- Canonical: all 160 pages use apex signals; neutral llms source unchanged. `canonical.json`.
- Public-output scan: **240 files**, zero owner mailbox or `mailto:` matches. No Google analytics loader in HTML/JS. All three crawler Allow groups present. `review-checks.json`.
- Form: production form remains enabled, privacy requests do not require a company, truthful confirmed-failure/unknown/confirmed-acceptance handling retained. Offline adapter and intercepted-browser tests only; no real submission, Netlify acceptance event or mailbox delivery is claimed. `contact-offline.txt`, `browser.json`.
- Preview safeguards: isolated local build has **160 noindex,nofollow pages**, stale private overlay cannot restore markup; wrong-site/context/private/remote-local builds rejected. `preview-safeguards.json`.
- Date fixture: **86** material routes agree across visible dates, schema and XML; unrelated pages not fresh-stamped, legal notices agree. Synthetic date `2000-01-02` exists only in an isolated fixture; real source remains `null` and remote production builds reject the pending date. `date-fixture.json` and `material-date-basis.json`.
- Seven deliberate bad-artifact controls rejected: contrary ROI answer, unsupported metadata percentage, public email, changed crawler rule, absent form, new broken link and unsubstantiated public research date. `negative-controls.json`.
- Responsive and keyboard: **53 route/viewport combinations** (33 core/form/legal/framework views at 1440/768/390px; 20 further research views at 1440/390px), no horizontal page overflow, one H1, visible keyboard focus, skip links and mobile menu checks passed. Chromium only, not an exhaustive assistive-technology certification. `browser.json`, `research-browser.json`. Visually inspected [research desktop](research-desktop.png), [research mobile](research-mobile.png) and [privacy mobile](privacy-mobile.png). A cached local hub redirect caused an initial failed run; the server now prioritizes extensionless HTML and the fresh-context final run passed.
- Local retired-figure HTTP check: `diagram-http.json`. This verifies the committed redirect through the local server, not deployed Netlify behavior.

Attribution inventories are not independent verification of underlying records. The exact claim ledgers record withdrawals/replacements rather than passing unsupported benchmarks on the strength of a disclaimer. Intermediate edit-stage ledgers are retained for traceability; the final source/diff and later metadata/equation treatments take precedence. No private source package or underlying proof narratives are added.

## Local review and release boundary

The audited artifact is `/private/tmp/ab-review2-final`, served only on `http://127.0.0.1:4330/`. Rebuild from the repository with Node 20 on PATH:

```sh
SITE_ID=3df07dc5-6950-4241-98eb-cf95df3d271d CONTEXT=production npm run build -- --outDir /private/tmp/ab-review2-final
python3 scripts/serve-release-preview.py /private/tmp/ab-review2-final 4330
```

Stop the existing listener before starting another on the same port. Do not run a rebuild while visually reviewing that directory. The production-mode local artifact has production indexing signals; it is bound to loopback and must not be uploaded as a public preview. The separately tested local mode forces noindex on all pages.

Before any merge: review the factual removals/rewrites, approve publication, then set the actual release date in `researchRevisionDate` and rerun date/build checks. Provider/retention facts not established by repository evidence remain explicitly unspecified; scheduled cleanup has not been observed in production. Search Console/Bing remain separate. No real enquiry test without separate authorization after deployment. No claim that this candidate is live.
