# Netlify contact activation and acceptance plan

Status: preparation only; no real enquiry authorized or sent. Browser form remains loopback-only; new adapter is unconnected and server entrypoint hard-disabled. Keep build/deploy/noindex safeguards intact.

## Before any activation

1. With separately authorized dashboard access, verify the exact site and form `contact`, form detection status, required fields, static hidden `form-name`, honeypot and `submission-reference`, and notification recipients/webhooks. Investigate `build.processing.skip_processing=true` and live detection attributes rather than assume Netlify has parsed this form. Do not change recipients/providers.
2. Verify the submissions API response/permissions for this form without exporting existing enquiries. Token must be server-only, least privilege available; document scope, owner, rotation and retention. Do not place it in `PUBLIC_*`, HTML, browser bundle, repository or logs. Confirm the reference field survives detection and submissions API.
3. Review the prepared receipt endpoint's access/rate limits and hosting cost. The unguessable per-submission reference prevents broad record disclosure, but is not a rate limiter. A first-page lookup may miss a delayed/high-volume submission; unknown is the intended safe result. No hidden automatic retry.
4. Only after explicit test/activation approval, wire `submitNetlifyContact` into the existing UI using the existing form values and AbortSignal. Map rejected to the approved failure message, unknown to the approved unknown message and disabled retry, accepted to a separate one-time confirmed-service state. Keep inputs until confirmed acceptance; never call reset on error. Do not reuse the preview acceptance marker as actual-service evidence. Preserve direct success URL/reload protection. Remove the interface-fixture disclaimer only for confirmed real acceptance, not for a bare URL visit.
5. Activation needs a reviewed source change to the endpoint's `RELEASE_APPROVED`, `CONTEXT=production`, `AB_CONTACT_RECEIPTS_ENABLED=true`, `AB_NETLIFY_CONTACT_FORM_ID`, and `AB_NETLIFY_FORMS_TOKEN`. No values configured in this task. Do not use the production host to test until explicitly authorized. Access-controlled test deployment needs separate deployment authorization; local mock tests alone cannot validate Netlify processing.

## Authorized service test (not yet executed)

Agree exact destination/notification recipient, harmless test content, test mailbox and time window. Send one marked enquiry with a fresh opaque reference through the approved test path. Record reference, UTC submission time, provider submission ID and matching field values locally. Confirm the receiving form stored the exact submission and the receipt endpoint reports that reference; inspect spam status independently. A 200/redirect/success page is insufficient.

Then inspect the authorized notification mailbox: received message, recipient, time, message ID and reply-to. Distinguish provider storage, notification delivery and ability to reply. A receipt response proves neither email delivery nor human review. No real notification settings should be changed to make a test pass without approval.

Repeat only with authorization if an outcome is unknown; first check the receiver for the original reference to avoid duplicates. Verify confirmed rejection, provider outage/timeout and delayed receipt using controlled fixtures, not intentional disruption of production. Confirm input preservation and success-page direct-access/reload behaviour in the final wired client.

Document retention/deletion of test records according to the approved process. Do not delete records as an assumed cleanup permission. Production publication remains a separate final decision.
