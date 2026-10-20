# Form release and post-deployment verification

**Current full-V2 candidate is email-only.** No form activation or live form test is needed for that content release. The owner-approved proof is restored. This procedure applies when a later reviewed update enables the form with matching privacy/cookie notices. See `full-v2-candidate.md`.

Preparation only. Nothing is activated or sent. This plan follows the [owner's corrected sequence](https://github.com/deepakgupta5/autonomy-bridge-web/pull/1#issuecomment-6281611214), superseding the earlier prepublication delivery-test requirement. **Unperformed live delivery testing alone does not hold the content release.** Proof, privacy/provider/retention facts, legal wording and explicit publication approval remain separate gates. No isolated test deployment is required.

## Before release

- Review the wired production adapter, server receipt lookup, failure/unknown states and offline evidence. Current source policy stays `local`: environment variables cannot activate production. Preview remains loopback-only, noindex and deploy-blocked; private proof stays local.
- With authorized account access, verify production site UUID and exact canonical request origin (do not normalize existing canonical tags or redirects), detected `contact` form and field schema, form-processing enablement, honeypot, `submission-reference` and notification recipients/webhooks. Check required settings as far as access permits. Current dashboard access/settings are unverified; no login attempted. Never silently alter recipients or providers.
- Review server-only `AB_NETLIFY_CONTACT_FORM_ID`, `AB_NETLIFY_FORMS_TOKEN`, `AB_CONTACT_RECEIPTS_ENABLED=true`, and Netlify's `SITE_ID`/`CONTEXT=production`. Keep credentials out of browser variables, repository and logs. Confirm token scope, owner and rotation, API permissions, rate/cost controls and reference-field availability. API lookup is bounded to 100 recent records and 15 minutes; delayed/missing results remain unknown.
- Generate and review the activation diff as described in `release-change-review.md`. It enables form processing, exact-target build/runtime gates and real transport; removes preview notice/noindex from ordinary pages; preserves Contact Success noindex and keeps optional analytics off. Review final proof/legal copy and actual publication dates separately. Do not apply or deploy before explicit publication approval.
- If form configuration cannot be verified or supplied at release, agree the prepared email-only option before publishing. This avoids exposing a form known to be unready without unnecessarily blocking the approved content.

## At explicitly approved publication

Apply the reviewed release changes and verified server settings to the intended site only. Keep the existing email alternative visible. Inspect the deployed Contact markup, form detection and receipt endpoint configuration. Record the released SHA and previous known-good deploy ID for rollback. Check optional analytics remains absent, including dashboard-injected scripts. These steps are instructions for later; no deploy or setting changes occurred here.

## One separately authorized test immediately after deployment

Obtain authorization for the exact test sender, recipient, harmless marked text and time window. Publication approval alone is not authorization to send. Submit **one** clearly marked test enquiry through the live form. Record its generated opaque reference and UTC time locally; inspect the request payload locally if needed, never post personal data on GitHub.

1. Confirm Netlify stored that reference with the expected fields; record submission ID and spam disposition. The UI shows success only after the receipt endpoint confirms storage. HTTP 200, redirect or a success URL alone does not qualify.
2. Confirm the designated mailbox actually received the matching notification; record received time, message ID, recipient and reply-to locally. Storage and email delivery are distinct results. A notification is not evidence of a human reply.
3. If the outcome is unknown, inspect the original reference at Netlify before considering another send. Do not retry automatically. Any additional real enquiry requires authorization. Test-record deletion also requires the agreed retention/cleanup process.

## Immediate fallback if either check fails

- **No confirmed receipt / missing storage:** preserve entered information and show the approved unknown message; disable duplicate retry. For rejection before sending, show the approved failure message. Inspect the single reference; do not resend to diagnose.
- **Receipt confirmed but notification absent:** record acceptance as passed and delivery as failed/unverified. Check the authorized mailbox/spam and Netlify notification settings; do not claim end-to-end success or change recipients silently.
- **Either unresolved after the check:** under release-time authorization for this fallback, set source `formEnabled: false`, rebuild and deploy the email-only Contact page. It removes the form, clearly reports unavailability and keeps `deepak@autonomybridge.com` visible. Disable the server receipt gate as appropriate. Previously loaded pages can still POST to Netlify; the receipt gate alone is not a submission kill switch. For those pages, stop form processing only with authorization and preserve stored enquiries for follow-up.
- Keep approved content live where possible. If the release itself is broken, restore the recorded known-good deployment under the approved rollback plan. Neither code rollback nor disabling notifications undoes already sent mail or deletes stored enquiries. No new tracking may be restored by rollback; verify the selected artifact first.

Report receipt and mailbox outcomes separately, plus fallback activation and outstanding action. A later fix needs review and authorization before another live test. This is a post-release operational check, not a retrospective claim that offline tests proved delivery.
