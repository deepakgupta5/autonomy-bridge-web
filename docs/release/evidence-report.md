# Release preparation evidence report

Investigation date: 2026-10-19 (America/Vancouver; HTTP observation 2026-10-20 01:49 UTC). Base: `cda1143cf14808544d7e7f96d5670b55c5557526`. Scope: [owner instruction on PR #1](https://github.com/deepakgupta5/autonomy-bridge-web/pull/1#issuecomment-6281406421). Design approval is not publication approval.

| Item | Verified fact / source | Change prepared | Unresolved fact / decision | Release gate |
|---|---|---|---|---|
| Selected proof | V2 identifies 18 selected paragraph occurrences across four pages; the supplied ZIP/workspace contains copy, not underlying contracts, calculations or permission records | Public location-only `proof-register.json`; exact private claims, figures, source lines, evidence requests and limits in ignored `.preview-private/release-evidence/proof-confirmation.md` | Deepak must confirm accuracy and permission separately for P01–P18; local report specifies the exact claims. Repeated occurrences are not corroboration | Keep public markers until permission and accuracy are resolved; no unrelated cases reopened |
| Hosting | Public response has `server: Netlify` and `cache-status: Netlify Edge`; repository `netlify.toml` publishes `dist` | Provider evidence separated from account settings; draft notice amendments in `legal-proposed-changes.md` | Account/contract entity, access countries, actual logs, retention, backups and access list unavailable | Verify actual processing and operational commitments |
| Forms / anti-spam | Live Contact and source specify Netlify form `contact`, POST `/contact-success`, hidden form-name and honeypot. Live markup still retains detection attributes; this alone does not prove processing. Repository has `build.processing.skip_processing=true` | Production adapter wired behind locked local source policy plus gated server receipt verifier; hidden reference field in static form blueprint; mocked tests | Dashboard detection, form ID/schema, whether skip_processing affects this site's detection, actual spam handling and limits | Verify deployed blueprint/detection before authorized real test |
| Notifications / email | Public email address exists; Deepak confirmed `Deepak@autonomybridge.com` in this chat | Confirmed mailbox markers resolved on three preview legal pages | Email provider, forwarding, notification recipients/webhooks, other people with access, delivery and deletion practices unknown | Inspect settings before release; separately authorize one post-deployment delivery test; no notification settings changed |
| Tracking | Live DOM includes Google loader `G-ZX7LHWYBWP`; downloaded first-party script calls `gtag` configuration for that ID. No consent controls found in inspected Home controls. Preview omits loader/config | Deepak selected **launch with optional analytics off**; remove dormant Google loader/config from the release candidate | Runtime cookies, collection requests, GA settings/retention/advertising links, dashboard-injected scripts unverified | Verify no optional requests/storage on release artifact and intended host; do not alter current production as a side effect |
| Privacy / cookies | Live Privacy claims anonymised cookie-free privacy-first analytics and a 12-month submission limit; live Cookie page describes a possible Netlify session token. No evidence substantiates those assurances | Explicit correction proposals; V2 placeholders preserved except confirmed mailbox | Privacy contact designation, correspondence address, provider/recipient details, retention/deletion and rights handling | Approve factual notice and operational commitments after evidence |
| Terms | V2 limits terms to website use, preserves BC law and US qualifier, qualifies rights/liability; technical implementation cannot establish enforceability | Terms review disposition and exact scope-preserving proposal; no new client contract | Actual operator/address and suitability of liability/browsewrap/IP terms | Deepak factual sign-off and appropriate legal review; final approval remains Deepak's |
| Dates / routes | Existing audit retains 147 research routes; eight historical broken targets/referrers remain in `docs/preview/historical-broken-links.json` | No fabricated redirects or dates; rerun build/audit | No evidence of correct replacement targets found in supplied register | Resolve or explicitly accept eight known defects; date changes only at publication |

## Tracking observation limits and decision

The browser's read-only DOM view did **not expose `document.cookie` or a network/storage inspector**. Therefore no runtime cookie inventory, expiry measurement, collection delivery or clean-session consent test is claimed. A separate public HTTP GET returned no `Set-Cookie` header; that does not exclude JavaScript cookies. The first-party script configuration is stronger evidence than a loader alone, but does not establish that Google received an event. The inspected pages expose no Plausible script. Absence from this sample is not proof of site-wide absence.

Current production remains untouched. For the approved analytics-off launch direction: keep Google loader/config absent; check built scripts and any Netlify snippet injection; inspect a clean browser on intended host for requests and storage before final release. Do not substitute “consent denied” advanced mode for “off”: Google's documentation distinguishes basic blocking from advanced mode's possible cookieless pings. No new analytics provider is proposed. Ordinary hosting/security processing still needs disclosure. OPC meaningful-consent guidance supports explaining purposes, recipients and material consequences; this report is not a legal determination of all applicable jurisdictions.

## Form implementation and validation boundary

The production adapter is now wired in `src/utils/contact-form.ts`, behind `config/deployment-policy.mjs` which remains **local**. Environment variables cannot activate it. The adapter sends once, then requires a stored matching reference from the server before showing success. A 200 HTML response, redirect, timeout or missing receipt remains unknown; inputs are retained and automatic duplicate submission is blocked. Local mocks and actual receipt use distinct one-time success markers.

The server additionally requires a verified exact production origin/site UUID, production context and server-only receipt configuration. No token was requested, created, read or installed. Lookup returns only an acceptance boolean and reference, never submission data. It proves storage, not notification delivery or spam classification. API permissions, rate/cost controls, actual form detection and account settings remain unverified. The 100-record/15-minute bound can return unknown safely.

The [corrected owner instruction](https://github.com/deepakgupta5/autonomy-bridge-web/pull/1#issuecomment-6281611214) supersedes the earlier prepublication test requirement: prepare/check code before release, then separately authorize one test immediately after deployment. **The pending live delivery test alone does not block content publication.** Proof, privacy/legal/provider facts and explicit publication approval remain independent gates. No isolated acceptance deployment is required.

See `release-change-review.md` for the diff generator and `contact-release-test-plan.md` for account checks, post-deployment receipt/mailbox verification and immediate email-only fallback. Optional analytics remains off in every mode. Live POSTs, emails, notifications, logins, deployments, DNS and provider changes: **none**.

## Facts Deepak still needs to supply

The confirmed mailbox and analytics-off choice are recorded; they do not answer the following:

1. Designated privacy contact name/role and business correspondence address suitable for publication; confirm website operator's legal identity.
2. Mail provider, forwarding/notification recipients and people with access; actual enquiry/correspondence deletion schedule, logs/security/backup retention and locations. If unknown, identify where settings/records can be inspected; do not invent a period.
3. Accuracy and publication permission per P01–P18 in the **local private** report, with evidence location or correction. Do not post private claims/supporting material on GitHub.

Netlify/GA account configuration is not present in the checkout and no dashboard login was attempted. A new login requires Deepak's authorization under the original instructions. Read-only dashboard access or non-secret configuration evidence would resolve technical unknowns; Deepak need not make implementation decisions that can be established there. Real test authorization is separate from publication approval.

## Sources

- [Netlify form setup](https://docs.netlify.com/manage/forms/setup/), [spam filters](https://docs.netlify.com/manage/forms/spam-filters/), [notification settings](https://docs.netlify.com/manage/forms/notifications/), [submission handling](https://docs.netlify.com/manage/forms/submissions/).
- [Netlify published API schema](https://github.com/netlify/open-api/blob/master/swagger.yml): `GET /forms/{form_id}/submissions`, stored submission `id`, `data`, `created_at`.
- [Google consent-mode behaviour](https://developers.google.com/tag-platform/security/concepts/consent-mode); [OPC meaningful-consent guidance](https://www.priv.gc.ca/en/privacy-topics/collecting-personal-information/consent/gl_omc_201805/).
- Public observations: [Home](https://autonomybridge.com/), [Contact](https://autonomybridge.com/contact), [Privacy](https://autonomybridge.com/privacy-policy), [Cookies](https://autonomybridge.com/cookie-policy), [Terms](https://autonomybridge.com/terms-of-use). Raw HTTP snapshots stay in ignored `.preview-private/release-evidence/`; unique request IDs and any cookie values are not committed.

## Verification for this preparation commit

- Node 20 build and independent-baseline route audit passed: 160 pages, 147 retained research routes, 158 HTML/156 XML destinations; only the eight recorded historical targets/referrers remain.
- Disposable production-form and email-only candidate builds passed: 160 pages each, correct banner/robots/form behavior, Google loader absent; exact target and private-overlay rejection tested (`release-build-tests.json`). Source checkout remains local.
- Nine grouped offline adapter/verifier checks passed (`contact-preparation-tests.json`); no real network transport in those tests.
- All 18 private paragraphs checked against tracked/public report text: no full private paragraph exposed. Source narratives and exact proof confirmation report remain ignored locally.
- Current preview remains loopback-only. Additional offline wired-UI and source/runtime/build gate checks are in `release-gate-tests.json`. The full visual/browser suite was not rerun for this release wiring. No real receiving-service acceptance, notification delivery or runtime cookie-storage test is claimed.
