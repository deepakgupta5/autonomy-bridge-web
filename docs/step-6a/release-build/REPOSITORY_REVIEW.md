# Repository review of production-build evidence

## Technical outcome
The production-build evidence is accepted for its tested technical scope. This is the implementing project's repository review, not the independent third-party review requested by the owner, and it does not authorize release.

Reviewed source: 93f56e9edf8fa1ecd3ec910af3e93378d1ddf703.
Evidence commit: 65f8623138c9c1cb725bf29e6cb7be14ae04dc8d.

The reviewer inspected the date-policy/rendering changes and the supplied report/provenance. An independent rebuild in Node 24.19.0, with the documented production site/context variables, passed. The executor's Node 20.20.1 qualification remains separately attributed. Crucially, all **241 rebuilt files matched the submitted SHA-256 manifest byte for byte**, with zero missing, extra or mismatched files. The manifest's own SHA-256 also matches artifact.json. This reproduces the recorded artifact; it does not verify the hosting environment.

Additional independent checks passed:
- SEO/GEO built-output audit in production mode.
- Explicit date/parity checker: 86 materially revised Research routes, separate Terms/Cookie/Methodology date fields and 87 corrected source-file hashes.
- Owner-date source diff: all 87 Research source files changed only on permitted date-record lines; active Methodology copy changed only its recorded publication date.
- Independent 0285946 baseline route verifier: 163 HTML pages, 147 Research routes, 158 HTML sitemap destinations, 156 XML entries; no new broken destinations or canonical changes.

The repository's DATE_PROVENANCE.md records additional owner approvals for site, notice, Methodology and source-record dates. This review attributes those approvals to that record and the owner's submitted completion statement. It does not independently establish historical publication dates.

All 12 submitted screenshot dimensions were checked. The reviewer visually inspected Methodology at 320 px and Terms at 1423 px; their visible dates and layout are readable. This is screenshot inspection, not a new interactive browser pass.

The report describes 65f8623 as evidence-only. Its diff also adds scripts/hash-release-artifact.py, a reporting helper. No website/build-input source changed between 93f56e9 and 65f8623.

## Open copy finding
Terms of Use, section 1, still describes the former offer model:
“... fractional sales leadership for startups and small and medium-sized businesses. It also provides AI consulting and implementation for businesses and nonprofits ...”

This is inconsistent with the approved current audience architecture and with the treatment of AI as support for agreed commercial/fundraising work. The supplied desktop screenshot and src/data/preview-copy.json both confirm it. This issue was outside the earlier six-page/Research closing-block copy scope but should be assessed in the independent review before final release acceptance.

Suggested narrow correction to the first two service-description sentences:
“Autonomy Bridge provides commercialization and revenue leadership for B2B startups, defined fundraising operations work for nonprofits, and fractional sales leadership for established businesses. It also publishes research.”

Retain the following website-only scope, separate client-agreement and no-engagement-creation sentences. This suggestion is a factual positioning correction, not a legal opinion or a request to rewrite the Terms. Queue it for the independent review and owner disposition, then have Codex implement any accepted change and rebuild/recheck the resulting artifact.

## Independent review and release status
At this evidence commit, docs/independent-review/REPORT.md is absent. The independent review is **not complete**. Its brief is docs/independent-review/BRIEF.md. The independent reviewer must use the current candidate/source, distinguish prior reports from first-hand inspection and include the Terms finding in its assessment.

Do not substitute this repository review or the executor's own QA for that requested independent assessment. No merge or deployment is authorized. Real form delivery, retention and Netlify runtime/account checks remain outstanding; this review does not execute or waive them. No real enquiry, login, indexing request or sitemap submission occurred.
