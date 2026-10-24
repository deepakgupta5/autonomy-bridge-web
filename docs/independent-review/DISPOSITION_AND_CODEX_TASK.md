# Independent review disposition and local Codex task

## Review status
The owner supplied Manus AI's independent review of 65f8623138c9c1cb725bf29e6cb7be14ae04dc8d. It is archived verbatim, with provenance, in REPORT.md. Its verdict is **acceptable after specified corrections**, with no substantial content/layout rework requested. This satisfies receipt of the requested external assessment. Its coverage limits remain: fresh static captures and selected visual inspection, source/prior evidence for Contact behavior, no new form fixture submission or live-service verification. The attachment did not include its external screenshot/log files; do not present them as repository evidence.

Manus reviewed before our ab1ba01 repository finding. The Terms issue remains open even though it is absent from the external report. No release approval is implied.

## Disposition
- **M-01 accepted as a verification/documentation issue.** The production guard requiring exact SITE_ID and CONTEXT is intentional and must remain. A local-only pending-state checker failing against production is not itself a rendering defect. The actual correction is to document and execute separate mode-appropriate paths, with no contradictory green claims.
- **m-01 deferred:** social-card image and favicon are optional enhancements. No imagery or dependency work is requested.
- **p-01 accepted as maintenance guidance:** retain the Research hierarchy and content; no structural rewrite.
- **Terms section 1 correction required:** retain the factual positioning mismatch recorded in docs/step-6a/release-build/REPOSITORY_REVIEW.md. Implement the narrow replacement below alongside M-01. No other legal wording change is requested.

## Local Codex: execute on codex/step-6a-seo-geo
Confirm branch, exact HEAD, AGENTS instructions if present, and existing local changes. Preserve unrelated work. Read REPORT.md and the existing release-build report. Keep all 147 Research routes and the accepted visual system.

### 1. Make the verification handoff reproducible
Add one authoritative documented production verification entry point, using the existing language/tooling and no new dependency. It must:
- Require an explicit path to the independent 157-page baseline built from 0285946a6a500f9207a9c466c7de11a4cffb22a8, and reject a missing/self baseline.
- State that the checkout is a **production-artifact candidate served only on loopback**, rather than claiming it is a noindex preview.
- Preserve fail-closed target/context validation. Document the exact non-secret invocation, including SITE_ID=3df07dc5-6950-4241-98eb-cf95df3d271d and CONTEXT=production. Missing/wrong context must remain a failure. Do not silently inject target variables to bypass the guard.
- Build and run the mode-appropriate release route verifier (--canonical-apex --research-review --release-candidate), Step 6A audit, negative controls, actual-release-date checker, owner-date-diff checker and relevant existing offline Contact/date gates.
- Record actual counts 163/147/158/156, canonical and date parity, and the complete production indexing matrix. Expect core/audience/Research pages indexable, bridges noindex,follow and Contact success noindex,nofollow. Never report all 163 as local noindex in production.
- Record exact tested source commit, runtime, command, results, output artifact file count and content manifest hash. Rebuild after the Terms correction; the previous manifest belongs to the previous artifact.

Keep check-pending-dates.py as a strict preview-state validator or replace it with an equally strict named preview check. Make its mode requirement clear in documentation and error output. A production invocation should explain the mismatch and point to the production checker. Do not make it return a fake PASS or skip assertions to create an all-green sequence.

Prove the separate local-preview state in a disposable isolated fixture: mode local, publication/notice/revision fields unset as required by that fixture, pending output and noindex on all 163 pages. Preserve approvedResearchRevisionDate as the owner-record constant. Run the strict pending-date checker there. Do not mutate the production checkout into local mode merely to run a check and label the result production evidence. The report must distinguish fixture output from the production artifact.

Correct current viewing/verification documentation that instructs ordinary npm run build without the production variables or describes the current production candidate as noindex. Keep historical source-attributed reports intact, adding a supersession pointer where needed rather than rewriting prior results.

### 2. Correct Terms positioning only
In the /terms-of-use entry of src/data/preview-copy.json, replace the first two service-description sentences with:
“Autonomy Bridge provides commercialization and revenue leadership for B2B startups, defined fundraising operations work for nonprofits, and fractional sales leadership for established businesses. It also publishes research.”

Keep the rest of that paragraph unchanged, beginning “These terms govern website use only.” Preserve separate agreements, enquiry limitations, all other Terms sections, URLs and anchors. This is a factual offer-description correction. Do not rewrite legal obligations, approved public-copy sources or Research analytical text.

Extend the output audit to catch the stale two-offer description in active Terms and ensure the approved replacement is rendered. Demonstrate a negative control restoring the stale description. Keep any copy/source parity tests scoped to this exact permitted correction.

### 3. Evidence and return
- Run the authoritative production command with Node 20. Keep declared runtime qualifications clear.
- Check the affected Terms opening at 1423, 400 and 320 CSS px and save fresh screenshots. Check unchanged text outside the specified replacement, no overflow, dates and existing design.
- Save docs/independent-review/CORRECTION_RESULT.md with exact implementation commit, commands/results, isolated preview fixture results, source differences and link to the refreshed artifact manifest. Update current QA/release status to point to this result.
- Push the correction and documentation for repository review. No extra page rewrite, redesign or optional asset work.

## Release boundary
Do not merge, deploy, log in, change Netlify settings, send enquiries/notifications, submit sitemaps or request indexing. The owner's prior instructions about deferred Netlify/live checks remain; the external report's wording does not independently change their authorization or timing. Real delivery/retention, deployed headers and field/search outcomes are not established by local checks. After the scoped corrections, the repository reviewer will verify the resulting commit/evidence before any separate owner publication decision.
