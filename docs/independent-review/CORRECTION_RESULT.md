# Independent-review corrections: local result

- **Status:** scoped corrections complete for repository review; publication remains unapproved.
- **Branch:** `codex/step-6a-seo-geo`.
- **Exact tested implementation source:** `f261e7906af7266fb6bd7b3852164b62e084d310`.
- **Review input:** [`DISPOSITION_AND_CODEX_TASK.md`](DISPOSITION_AND_CODEX_TASK.md), based on the owner-supplied Manus report of `65f8623`.
- **Runtime:** Node `v20.20.1`, Python 3.12; production artifact served only on loopback for visual QA.

## Corrections

1. The `/terms-of-use` HTML entry in `src/data/preview-copy.json` replaces only the first two service-description sentences with the exact approved text. The paragraph resumes unchanged at “These terms govern website use only.” All other Terms text and Research content remain unchanged. `scripts/audit-step6a.py` requires the replacement in rendered output and rejects the stale description; `scripts/test-step6a-audit.py` restores the old wording in an isolated output fixture and confirms rejection. `scripts/verify-owner-date-diff.py` now permits only this exact Terms replacement alongside the previously approved date changes.
2. `scripts/verify-production-release.py` is the authoritative production verification entry point. It requires an explicit independent baseline path, confirms that its checkout is `0285946a6a500f9207a9c466c7de11a4cffb22a8` with 157 HTML pages, and rejects a missing or self baseline. It requires Node 20 and the explicitly supplied production target/context. It invokes the existing build guard unchanged, builds, runs the route verifier, Step 6A audit and negative controls, actual-date and source-diff checks, date and Contact fixture gates, then refreshes the artifact manifest. It checks the expected counts and indexing matrix before reporting success.
3. `scripts/check-pending-dates.py` remains strict for local mode. On this production checkout it exits with a mode explanation and points to the production checker. `scripts/verify-local-preview-fixture.py` exports the tested commit into a disposable directory, changes only that fixture to local mode with unset release dates, builds it, and runs the pending-date and all-page noindex checks. It never changes the production checkout.

## Reproduce the production check

Use Node 20 in a clean checkout with dependencies installed. Supply the path to an **independent** 157-page baseline build from `0285946a6a500f9207a9c466c7de11a4cffb22a8`; the baseline checkout must be at that commit. The exact non-secret invocation used here was:

```sh
SITE_ID=3df07dc5-6950-4241-98eb-cf95df3d271d CONTEXT=production \
  python3 scripts/verify-production-release.py \
  --baseline-dist /private/tmp/autonomy-step6-0285946-baseline/dist
```

This source is a **production-artifact candidate**, not a local noindex preview. Serve the generated `dist/` only on `127.0.0.1` for review. Missing target variables and `CONTEXT=deploy-preview` were both explicitly rejected by `scripts/preview-build-guard.mjs`; the target guard was not relaxed. The checker does not inject these variables. The strict pending-date script correctly exits 1 on this source; it is not part of the production command.

## Results at `f261e79`

| Evidence | Result |
| --- | --- |
| [`verification/production.json`](verification/production.json), [`production-checks.log`](verification/production-checks.log) | All ten production steps passed: build, independent baseline verifier, Step 6A audit, ten negative controls including stale Terms, actual dates, owner source diff, date gate, release gate, offline Contact fixtures, and artifact hash. |
| Route and canonical audit | 163 HTML pages, 147 Research routes, 158 HTML sitemap destinations, 156 XML entries; no lost baseline routes, unexpected broken destinations, new broken referrers or changed existing canonicals. Eight registered historical broken destinations remain exceptions. |
| Complete production indexing matrix | `index,follow` on 159 pages (including core, audience and Research); `noindex,follow` on the three legacy bridges; `noindex,nofollow` on Contact success. The Step 6A audit checked every generated page. Local noindex count is **0** for this artifact. |
| Dates | The separate site, Research, Terms, Cookie and Methodology fields match their owner-approved `2026-03-01` values. All 86 revised Research routes have visible/schema/XML revision-date parity. The active Privacy notice has no invented revision date. |
| [`verification/preview-fixture.json`](verification/preview-fixture.json) | Isolated local-mode build passed: 163 `noindex,nofollow` pages, 86 pending Research revisions, pending Methodology/Terms/Cookie notices and zero sitemap `<lastmod>`. This fixture is not the production artifact. |
| Guard and input rejection | Missing `SITE_ID`/`CONTEXT`, `CONTEXT=deploy-preview`, and the production checkout passed to `check-pending-dates.py` all exited 1 with the expected messages. The production entry point rejected an omitted baseline, its own `dist/` as baseline, and the wrong context. |
| Terms visual QA | Local Chromium returned HTTP 200 at 1423, 400 and 320 CSS px. At all widths document width equaled viewport width; the approved paragraph, unchanged following website-only scope, and `Last updated: 2026-03-01` were visible. Fresh [opening screenshots](terms-qa/) and focused mobile paragraph captures were visually inspected. |

The refreshed production artifact has **241 files, 18,295,389 bytes**. Its [content manifest](../step-6a/release-build/manifest.sha256) SHA-256 is **`6a72b050b7237390227332130aec5ffda8d95a2b947209916c1934b2dace0426`**; [`artifact.json`](../step-6a/release-build/artifact.json) pins the tested source. This supersedes the prior `93f56e9` artifact hash, which belongs to the earlier Terms wording. The local `dist/` is ignored and has not been deployed.
The two manifests differ only for `terms-of-use.html`; the other 240 output files are byte-identical to the prior artifact.

## Boundaries

The owner-supplied Manus report is preserved with its stated provenance and limits. Social imagery and favicon remain optional; the 147-route Research structure is unchanged. No merge, deployment, login, real enquiry, notification, sitemap submission or indexing request occurred. Netlify runtime/account settings, real form delivery and retention, deployed headers, indexing, rankings, AI citations and field performance remain unverified by these local checks. The repository reviewer can assess this exact source and evidence before any separate owner publication decision.
