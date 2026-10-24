# Step 6A local production artifact review

## Identity and scope

- Branch: `codex/step-6a-seo-geo`.
- **Exact source commit built:** `93f56e9edf8fa1ecd3ec910af3e93378d1ddf703`.
- Node: `v20.20.1`; build target: `SITE_ID=3df07dc5-6950-4241-98eb-cf95df3d271d CONTEXT=production npm run build`.
- Build output: 163 HTML pages; 241 files; 18,295,495 bytes. Full output is in [`build.log`](build.log).
- Artifact manifest: [`manifest.sha256`](manifest.sha256); manifest SHA-256: `66cad2ebedc5949b18e43f2ffd6fb0a8f4438551bbe310a65f44589159138967`. [`artifact.json`](artifact.json) records source commit and key output hashes. The `dist/` directory is local and ignored; it has not been deployed.

The owner separately approved `2026-03-01` for site publication, Research revision, Terms, Cookie, and Methodology revision. The owner also corrected Methodology's original publication date and the date records in all 86 materially revised Research routes to March 1. These owner-supplied historical corrections are recorded in [`DATE_PROVENANCE.md`](../DATE_PROVENANCE.md) and the 87-file hash ledger [`DATE_SOURCE_CORRECTIONS.json`](../DATE_SOURCE_CORRECTIONS.json). This review checks the requested source changes and output parity; it does not independently establish historical publication dates.

## Checks against this artifact

| Check | Result |
| --- | --- |
| `npm run build` with the production target above | Passed; 163 pages. |
| `python3 scripts/verify-preview.py /private/tmp/autonomy-step6-0285946-baseline/dist --canonical-apex --research-review --release-candidate` | Passed; 163 pages, 147 Research routes, 158 HTML sitemap destinations, 156 XML entries. No unexpected broken links or changed existing canonicals. |
| `python3 scripts/audit-step6a.py` | Passed; metadata, schema, discovery, crawler groups, and production indexing. [`STEP6A_AUDIT.json`](../STEP6A_AUDIT.json) is the machine-readable result. |
| `python3 scripts/test-step6a-audit.py` | Passed all 9 negative controls. |
| `AB_AUDIT_DIST=dist python3 scripts/check-actual-release-dates.py` | Passed separate approved date fields; 86 Research visible/schema/XML date parity; 87 corrected source hashes; Privacy has no invented revision date. |
| `python3 scripts/verify-owner-date-diff.py` | Passed; 87 source files changed only on permitted date-record lines, plus the Methodology visible publication date. |
| `node scripts/test-date-gate.mjs` | Passed 7 invalid-date cases and the distinct-date fixture. |
| `node scripts/test-release-gates.mjs` | Passed production target/context and offline Contact fixture cases. |
| `node scripts/test-release-contact.mjs` | Passed offline form fields, optional company, honeypot, and unknown-response cases; no real submission. |

## Rendered visual check

The built artifact was served locally. Methodology, Terms of Use, Cookie Policy, and a representative corrected Research case study were checked at 1423, 400, and 320 CSS pixels. All 12 route/width combinations returned HTTP 200 and had document width equal to viewport width. The visible dates were `2026-03-01`; Methodology's original publication line reads March 1, 2026. Screenshots are in [`screenshots/`](screenshots/). Visual inspection of representative desktop and 320-pixel captures found no date-related or horizontal-overflow defect.

## Release boundary and remaining checks

This is local production-mode evidence on a review branch. The owner has not authorized merge or publication. Netlify account/runtime configuration, form delivery and retention, live host headers, indexing, rankings, and AI citations remain unverified by this build. The route verifier retains its previously recorded historical broken destinations; there were no new broken link referrers. The repository reviewer should inspect this exact source commit and artifact evidence before the owner decides on release.
