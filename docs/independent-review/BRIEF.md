# Independent pre-release review brief

## Assignment
The owner requests an independent review before final production-build verification and release. Claude is the owner's preferred independent QC reviewer; Codex remains the implementation executor. Review critically and report findings. Do not implement fixes, merge, deploy, log in, change account settings, submit sitemaps or send real form enquiries/notifications.

Repository: https://github.com/deepakgupta5/autonomy-bridge-web
Candidate branch: codex/step-6a-seo-geo
Pin the checkout and record its exact SHA. Current reviewed implementation source is 1df59d31c9a719baf702c6edd7a557bba4fa1a87; report/screenshots are at 7888803e9b1969d7b624dd6693386673faaf7fe8. Later documentation includes the accepted review and owner date instruction at e2321544cfb3d403729c5511e22a39ca42205afc. If the branch subsequently contains code changes, identify them and review the actual pinned source. Do not review the live website as if it were this unpublished candidate.

First read the website as a buyer, without reading prior PASS verdicts. Then review technical evidence and source. State your reviewer identity/model, independence from implementation, access method, exact source, browser/runtime and limitations. If you can only inspect screenshots/source, say so; do not claim a fresh interactive browser review.

## What to inspect
Review Home, Startups, Nonprofits, Sales Leadership, About, Contact and Privacy in full. Inspect Research directory, representative pages from all six Research families (Insights, Market Overview, Frameworks, Use Cases, Case Studies, Glossary), Methodology, and the three legacy bridges.

1. Cold buyer review from a B2B startup founder, nonprofit executive/fundraising lead and established-business owner. Can each identify fit, the responsibility Deepak will take, retained decision authority and a sensible next step? Flag vague wording, contradictions, overstated evidence and friction with concrete examples.
2. Copy and credibility: consistent three-audience positioning; personal delivery model; approved prior-operating-role attribution; buyer questions labelled illustrative; nonprofit review example labelled fictional; all financial figures USD; Power2SME figure is annual GMV by year four, not revenue or cumulative GMV. Do not treat prior-role achievements or volunteering as paid Autonomy Bridge engagement results. Claims have been confirmed by the owner; independently flag misrepresentation or missing qualification, not an invented requirement for new customer permissions.
3. Layout and UI: typography, spacing, text measure, hierarchy, visual consistency, CTA prominence, readability, link wrapping and mobile navigation. Use desktop 1423 and mobile 400/320 CSS px. Inspect actual rendering if available. Separate defects from aesthetic preferences and explain buyer impact.
4. Contact journey: direct engagement remains available, free first conversation, 48-hour response commitment, optional editable audience preselection, no public email address or compulsory diagnostic. Test required-field, pending, failure, unknown/receipt and confirmed-success states only with existing loopback fixtures/intercepted transport. No real submissions.
5. SEO and AI discovery: factual entity/page/service schemas, title/description relevance, canonical consistency, crawler rules, structured-data/visible-copy agreement, discovery directory accuracy and extractable static answers. Avoid keyword stuffing, fabricated FAQ/testimonial material or promises of rankings/citations. Check the updated Research closing audience links.
6. Research preservation: all 147 recorded Research routes, content and internal analytical links remain. Review retained hierarchy and readability, not just counts. Three legacy routes /commercial-leadership, /ai-consulting and /advisory intentionally remain neutral noindex bridges, excluded from both sitemaps. Do not propose deleting/redirecting them without identifying a specific new reason.

## Viewing and evidence
In an isolated checkout, inspect AGENTS.md if present and preserve unrelated work. Use the repository's Node 20 runtime; npm ci if needed, npm run build, then a loopback-only preview. Source policy must remain local and noindex. Do not bypass remote build guards to obtain a hosted preview.

Useful existing evidence, to read after the cold review:
- docs/step-6/QA_STATUS.md and FINAL_CANDIDATE.md
- docs/step-6/visual-review/REPORT.md and screenshots
- docs/step-6/research-heading-qa/REPORT.md
- docs/step-6/legacy-bridge-qa/REPORT.md
- docs/step-6a/RESULT.md, QUERY_AND_ANSWER_MAP.md and FINAL_REVIEW.md
- docs/step-6a/research-final-qa/ (fresh Research screenshots)
- docs/step-6a/RELEASE_DATE_AND_VERIFICATION.md
- docs/preview/research-inventory.json and historical-broken-links.json

Expected local counts: 163 HTML pages, 147 Research routes, 158 HTML sitemap destinations and 156 XML entries. All local HTML intentionally noindex,nofollow. Eight historical broken destinations are registered exceptions. Verify existing checks where useful; do not equate a script PASS with a buyer-quality verdict or deployed behavior.

## Settled boundaries and known pending work
The approved architecture is Home, Startups, Nonprofits, Sales Leadership, About, Contact, with Research preserved. Superseded two-offer positioning and older attached Architecture v3/Core Model v4 must not drive recommendations over the approved branch.

The owner specified Research revision date 2026-03-01. Its implementation/date-scope instruction is documented separately. Legal notices must not inherit that Research date. Site launch date remains unset; final production configuration/build is a subsequent task. Preserve original source-date records and Methodology's original publication date, and identify any concrete date inconsistency.

Netlify account/runtime/provider/mailbox/form-delivery/retention checks are deferred by the owner. Report these as unverified dependencies, not completed tests. Do not claim this review verifies live delivery, real indexing, AI citations or field Core Web Vitals. Owner-approved training crawler Allow permissions remain; search and training access have distinct purposes. Optional analytics is off. Missing social-card imagery and existing favicon behavior may be noted with proportionate severity.

## Deliverable
Return a concise verdict: acceptable for final release preparation, acceptable after specified corrections, or substantial rework needed. Do not call the site published or fully production-verified.

For each finding give severity (blocker, material, minor, preference), route/component, exact observed wording/behavior, buyer or technical consequence, suggested correction and evidence. Separate confirmed defects from questions and preferences. Include a coverage table of pages/viewports/journeys actually inspected and the most consequential remaining dependencies. Avoid filler findings simply to fill a quota.

If authorized repository write access is available, save the review as docs/independent-review/REPORT.md on this review branch and push a documentation-only commit. Otherwise return the report for the owner to pass back. Do not change website source. The supervisor and owner will evaluate findings before Codex implements accepted corrections.
