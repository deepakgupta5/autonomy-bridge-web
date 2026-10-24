# Owner Research date and final-build verification

> Historical date handoff. Subsequent owner approvals and the current guarded production candidate are recorded in [`DATE_PROVENANCE.md`](DATE_PROVENANCE.md) and [`CORRECTION_RESULT.md`](../independent-review/CORRECTION_RESULT.md). Its earlier unset-date/local-mode instructions no longer describe this checkout.

The owner specified **1 March 2026**, ISO **2026-03-01**, for the Research revision date. This supersedes the earlier instruction to automatically use the site launch day for Research. Record its provenance as owner-specified, not independently verified from historical publication records.

Do not infer the site publication date from this date or from the current clock. Source remains local and unpublished until release preparation/approval. No merge or deployment is authorized by this instruction.

## Date scope correction for local Codex
The accepted source currently reuses researchRevisionDate for Terms and Cookie notices in CopyPage.astro. The owner's date applies to Research only. Decouple those legal notices from researchRevisionDate before final release preparation: use the actual approved policy update/publication date when production is prepared, and publication-pending wording in local mode. The active Privacy page has no revision-date field; do not invent one.

Preserve historical source records and Methodology's original datePublished 2026-03-15. Do not blanket-replace publication dates. Research revision notices, corresponding dateModified and sitemap lastmod must consistently use the specified Research revision date in the final production-mode artifact. If a page has demonstrably newer substantive Research changes or a conflicting verified chronology, identify the specific page for review rather than silently rewriting the historical evidence.

Update date fixtures/checks to distinguish Research revision dates from legal/site publication dates. Keep the production date gate and local noindex safeguards intact. Run relevant Node 20 build, date fixtures, pending-date check, SEO/GEO audit and independent route verifier after any code change. Push the scoped correction and report for repository review. Do not set an invented site launch date or enable production just to run these checks.

## Who verifies the final production build
- **Local Codex executes:** prepare the approved production configuration and explicit dates, run Node 20 production-mode build and checks, and record exact source commit, commands, results and artifact identity. Check the expected 163 pages, 147 Research routes, 158 HTML sitemap destinations, 156 XML entries; canonical/robots/sitemap/date parity; schema and discovery output; offline Contact checks; and affected visual output. Disposable synthetic fixtures do not count as the final release artifact.
- **Repository reviewer checks:** independently review source differences and evidence against that exact release commit/artifact. Report unresolved issues and limits. An earlier local QA pass is not a final production-artifact pass.
- **Owner authorizes release:** final build verification does not itself authorize merge or deployment.

Netlify account/runtime/form-delivery/retention and live host checks remain deferred under the owner's instruction. No live delivery, deployed headers, indexing, rankings or AI citations are established by a local production-mode build. No account login, real enquiry, sitemap submission or deployment is authorized here.
