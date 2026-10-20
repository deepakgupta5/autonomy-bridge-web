# V2 preview implementation

Preview only. Do not merge or deploy this branch. Production DNS, analytics configuration, consent configuration, processors and notification settings have not been changed.

## Review locally

Use Node 20 (the existing package engine), then:

```sh
npm ci
npm run dev -- --host 127.0.0.1
```

Open http://127.0.0.1:4321. The public branch uses explicit permission-pending markers for 18 selected proof paragraphs. No source ZIP or private overlay is committed. The original ZIP is required only for the owner's full-copy preview:

```sh
python3 scripts/import-private-proof.py /absolute/path/to/AutonomyBridge_Website_Copy_and_Data_v2.zip
AB_PRIVATE_PREVIEW=1 npm run dev -- --host 127.0.0.1
```

`.preview-private/` and `dist/` are ignored. Do not upload them. Bind to loopback; noindex is not an access restriction. The full copy replaces only the marked paragraphs; it does not change the approved text. Both public-marker and private-overlay builds were verified.

## Implementation

The checkout exactly matched package baseline `0285946a6a500f9207a9c466c7de11a4cffb22a8`. There were no prior working changes or newer commits to reconcile. The parent workspace was an empty Git repository; this checkout is in its `repo` subdirectory.

All 14 replacement routes use V2 copy, including legal placeholders and the neutral `/bespoke-research` gateway. Core section labels and Link/Button prefixes are rendered as structure/controls rather than public annotations. Existing design tokens, Inter/IBM Plex fonts and Astro static architecture remain. Shared navigation uses the two independent services and Research; the existing wrapping mobile navigation remains visible without a menu script.

Research keeps all 147 inventoried URLs. Research breadcrumbs and active states cover every family. Market Overview lists four market-context pages and five intralogistics pages. Research enquiry modules replace obsolete commissioned-research CTAs. The case-study hub now uses the approved evidence distinction rather than describing every study as a client engagement. Individual case-study bodies, evidence qualifications and original dates remain unchanged. The narrow framework identity patch leaves the related insight unchanged.

Every generated preview page emits `noindex,nofollow`, in both marker and private-overlay builds. This complements loopback access and does not replace access control.

The existing 11 redirect entries, including slash variants, are byte-identical. The existing www canonical convention and Methodology's non-www canonical are preserved. Host normalization remains a separate decision. Methodology retains `2026-03-15` as datePublished; dateModified is omitted pending actual release, and the visible revision-date field remains identifiable. Legal dates remain placeholders.

HTML sitemap: 158 destinations. XML sitemap: 156 entries, adding the three new routes to the previous 153 and retaining the existing legal exclusion policy. `/contact-success` is excluded from both and uses noindex,nofollow. The sitemap directory itself and the confirmation utility account for the difference between 158 destinations and 160 built pages.

The old `src/content/pages` and `src/content/legal` markdown remains as historical collection input; replacement routes render `src/data/preview-copy.json`, not that old copy. Changes to future content tooling must not accidentally reactivate the obsolete offers.

## Deployment boundary

Repository visibility is PUBLIC. GitHub read-only inspection returned no repository workflows, hooks or baseline deployment statuses. That does not establish Netlify dashboard settings. Before pushing, this branch adds `build.ignore = "exit 0"` to skip automatic Netlify builds, plus a build guard that rejects NETLIFY or CI environments. No hosted preview is requested. Netlify documents the ignore-command behavior at https://docs.netlify.com/build/configure-builds/ignore-builds/; build-hook exceptions are also covered by the remote build guard. The local preview suppresses the existing Google tag; production configuration is untouched. Removing these preview controls needs release approval and verified access control or publication permission.

## Contact boundary

Existing Netlify form name, POST action, hidden form-name field and honeypot are retained. New required fields: name, email, company, message; website optional. Role and enquiryType are removed. The preview script intercepts submissions and uses a loopback-only mock path. It does not contact Netlify, send email or alter notifications. Without a mocked response it reports failure, not success.

Browser tests intercept every mock POST. Explicit `{accepted:true}` is an interface fixture only. Ordinary HTTP 200 HTML, server/network errors and timeouts do not establish acceptance. Unknown outcome preserves the fields and prevents an immediate retry; a confirmed rejection permits retry. Direct access to `/contact-success` does not display a false success. Actual service acceptance and mailbox delivery remain unverified and must be tested with explicit authorization before release. A production transport adapter is intentionally not enabled on this preview branch.

## Verification

- Node 20 production build: 160 pages.
- `python3 scripts/verify-preview.py /path/to/baseline/dist`: requires the independent 157-page baseline build and fails on missing/incomplete baseline input. It compares built routes to the supplied 147-route register, walks research reachability, checks links/fragments, sitemaps, metadata, breadcrumbs, redirects, existing canonicals and research dates.
- `docs/preview/verification.json`: exact results and all eight ambiguous broken destinations with referring pages. No additional missing page destinations or fragment failures were found. All 140 children also appear directly in their family hub listings.
- Browser checks at 1440, 768 and 390 pixels across 12 representative routes: no horizontal overflow, one visible H1, correct active navigation. Home desktop/mobile and Contact mobile screenshots were inspected locally.
- `scripts/browser-check.js` and `scripts/run-browser-check.mjs`: controlled Playwright form and keyboard checks; results recorded separately. Start the dev server and dedicated `abpreview` Playwright session before running.
- Baseline was built separately from the source commit. No baseline routes were lost, no existing canonical changed, no research publication/modification date changed outside Methodology, and no research title changed outside the requested framework and Methodology replacements.

The verifier fails on all reported unexpected differences, including missing metadata, lost routes, changed canonicals/research dates, preview robots directives, sitemap deviations and broken destinations. `historical-broken-links.json` is the fixed exception register for the eight historical targets and their existing referrers; new referrers also fail. Repairs may remove an existing exception without requiring a broken link to remain.

Run `python3 scripts/test-preview-verifier.py /path/to/baseline/dist` for nine negative controls. It temporarily alters local build artifacts, confirms each defect is rejected, restores every artifact and reruns the clean audit. Results: `verifier-negative-controls.json`.

The eight historical broken destinations have no matching registered page or supported unambiguous replacement. They remain explicit defects, with no invented pages or blanket hub redirects. External citation availability and live redirect HTTP behaviour were not reverified; source redirects were verified byte-for-byte.

## Publication conditions

1. Verify accuracy/context and publication permission for selected proof excerpts and figures only.
2. Confirm privacy contact, monitored mailbox and correspondence details.
3. Verify hosting, form, email, anti-spam and any other actual data flows, countries, recipients and retention.
4. Verify runtime tracking, cookies, controls and retention; local suppression is not production consent verification.
5. Approve legal wording and operational commitments.
6. Implement/enable and verify receiving-service acceptance and notification delivery under explicit test authorization.
7. Set actual Methodology revision and legal publication dates at approved release.
8. Resolve or explicitly accept the eight historical broken-link targets. No additional library classification or all-case proof review has been initiated.

Browser console notes: the baseline has no favicon.ico, producing a 404; controlled failure fixtures deliberately produce failed-request console entries. No application script exception was observed.

No production release is implied by passing preview checks.

## Typography review correction

The shared sans-serif token now matches the bundled `Inter Variable` family. Replacement pages and retained custom research heroes use the shared heading scale: H1 32–44px, H2 22–28px, H3 20px, with 16px body copy. Peer service/proof sections use matching heading levels. Repeated sections share left alignment and spacing rather than alternating indented panels. Approved wording is unchanged; the 18 private paragraphs remain in the ignored local overlay only.

The production build and baseline verifier passed after these changes. Local browser inspection confirmed the font and heading sizes on Home, AI Consulting, Commercial Leadership, Market Overview and a glossary term at 1280px, plus Home at 390px; no horizontal overflow was observed in those checks. Home screenshots were inspected at both widths. The earlier full browser/form suite and verifier negative controls were not rerun for this typography-only correction.
