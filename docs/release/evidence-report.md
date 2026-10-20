# Release preparation evidence report

Investigation date: 2026-10-19 (America/Vancouver; HTTP observation 2026-10-20 01:49 UTC). Base: `cda1143cf14808544d7e7f96d5670b55c5557526`. Scope: [owner instruction on PR #1](https://github.com/deepakgupta5/autonomy-bridge-web/pull/1#issuecomment-6281406421). Design approval is not publication approval.

| Item | Verified fact / source | Change prepared | Unresolved fact / decision | Release gate |
|---|---|---|---|---|
| Selected proof | V2 identifies 18 selected paragraph occurrences across four pages; the supplied ZIP/workspace contains copy, not underlying contracts, calculations or permission records | Public location-only `proof-register.json`; exact private claims, figures, source lines, evidence requests and limits in ignored `.preview-private/release-evidence/proof-confirmation.md` | Deepak must confirm accuracy and permission separately for P01–P18; local report specifies the exact claims. Repeated occurrences are not corroboration | Keep public markers until permission and accuracy are resolved; no unrelated cases reopened |
| Hosting | Public response has `server: Netlify` and `cache-status: Netlify Edge`; repository `netlify.toml` publishes `dist` | Provider evidence separated from account settings; draft notice amendments in `legal-proposed-changes.md` | Account/contract entity, access countries, actual logs, retention, backups and access list unavailable | Verify actual processing and operational commitments |
| Forms / anti-spam | Live Contact and source specify Netlify form `contact`, POST `/contact-success`, hidden form-name and honeypot. Live markup still retains detection attributes; this alone does not prove processing. Repository has `build.processing.skip_processing=true` | Disabled adapter plus disabled server receipt verifier; hidden reference field in static form blueprint; mocked tests | Dashboard detection, form ID/schema, whether skip_processing affects this site's detection, actual spam handling and limits | Verify deployed blueprint/detection before authorized real test |
| Notifications / email | Public email address exists; Deepak confirmed `Deepak@autonomybridge.com` in this chat | Confirmed mailbox markers resolved on three preview legal pages | Email provider, forwarding, notification recipients/webhooks, other people with access, delivery and deletion practices unknown | Inspect settings and authorize one controlled delivery test; no notification settings changed |
| Tracking | Live DOM includes Google loader `G-ZX7LHWYBWP`; downloaded first-party script calls `gtag` configuration for that ID. No consent controls found in inspected Home controls. Preview omits loader/config | Deepak selected **launch with optional analytics off**; retain current suppression for release candidate | Runtime cookies, collection requests, GA settings/retention/advertising links, dashboard-injected scripts unverified | Verify no optional requests/storage on release artifact and intended host; do not alter current production as a side effect |
| Privacy / cookies | Live Privacy claims anonymised cookie-free privacy-first analytics and a 12-month submission limit; live Cookie page describes a possible Netlify session token. No evidence substantiates those assurances | Explicit correction proposals; V2 placeholders preserved except confirmed mailbox | Privacy contact designation, correspondence address, provider/recipient details, retention/deletion and rights handling | Approve factual notice and operational commitments after evidence |
| Terms | V2 limits terms to website use, preserves BC law and US qualifier, qualifies rights/liability; technical implementation cannot establish enforceability | Terms review disposition and exact scope-preserving proposal; no new client contract | Actual operator/address and suitability of liability/browsewrap/IP terms | Deepak factual sign-off and appropriate legal review; final approval remains Deepak's |
| Dates / routes | Existing audit retains 147 research routes; eight historical broken targets/referrers remain in `docs/preview/historical-broken-links.json` | No fabricated redirects or dates; rerun build/audit | No evidence of correct replacement targets found in supplied register | Resolve or explicitly accept eight known defects; date changes only at publication |

## Tracking observation limits and decision

The browser's read-only DOM view did **not expose `document.cookie` or a network/storage inspector**. Therefore no runtime cookie inventory, expiry measurement, collection delivery or clean-session consent test is claimed. A separate public HTTP GET returned no `Set-Cookie` header; that does not exclude JavaScript cookies. The first-party script configuration is stronger evidence than a loader alone, but does not establish that Google received an event. The inspected pages expose no Plausible script. Absence from this sample is not proof of site-wide absence.

Current production remains untouched. For the approved analytics-off launch direction: keep Google loader/config absent; check built scripts and any Netlify snippet injection; inspect a clean browser on intended host for requests and storage before final release. Do not substitute “consent denied” advanced mode for “off”: Google's documentation distinguishes basic blocking from advanced mode's possible cookieless pings. No new analytics provider is proposed. Ordinary hosting/security processing still needs disclosure. OPC meaningful-consent guidance supports explaining purposes, recipients and material consequences; this report is not a legal determination of all applicable jurisdictions.

## Form implementation and validation boundary

`src/utils/netlify-contact-transport.mjs` is a **prepared, unconnected** adapter. It defaults disabled; `src/utils/contact-form.ts` still uses only the loopback mock. The adapter sends URL-encoded data to the existing action once, then asks the server to confirm a fresh opaque reference in the configured Netlify form's stored submissions. It never treats a 200 HTML response, redirect, timeout or missing receipt as acceptance. Missing/late lookup results remain unknown; it does not re-POST automatically.

`netlify/functions/contact-receipt.mjs` hard-disables its deployed entrypoint. Activation requires a reviewed code change, production context and server-only configuration. No token was requested, created, read or installed. Its Netlify API lookup returns only an acceptance boolean and matching reference, never submission data. Receipt establishes storage in the configured receiving system, **not notification delivery, human review or an anti-spam classification guarantee**. API permission scope, rate limiting/cost controls, form detection and real API behaviour need verification before activation. The first-page/100-record bound can return unknown under high volume; it cannot fabricate success.

See `contact-release-test-plan.md` for exact wiring, account facts and authorized acceptance/mailbox checks. `contact-preparation-tests.json` records offline injected-response tests only. Live POSTs, emails, notifications, logins, deployments, DNS and provider changes: **none**.

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
- Nine grouped offline adapter/verifier checks passed (`contact-preparation-tests.json`); no real network transport in those tests.
- All 18 private paragraphs checked against tracked/public report text: no full private paragraph exposed. Source narratives and exact proof confirmation report remain ignored locally.
- Existing Contact UI transport is unchanged and loopback-only. The full browser fixture suite was not rerun for the added inert hidden field and legal mailbox confirmation. No real receiving-service acceptance, notification delivery or runtime cookie-storage test is claimed.
