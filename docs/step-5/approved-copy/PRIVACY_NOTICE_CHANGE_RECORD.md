# Privacy notice change record

## Owner direction

The owner approved a 12-month retention policy for unsuccessful enquiries, measured from the last substantive contact and subject to applicable legal requirements. It covers records held in Netlify Forms, email and other copies under the operator's control.

The owner directed that account-level checks for the email notification and reply provider, forwarding, access locations, processing countries and provider backup deletion schedules happen after launch. The notice must leave those details unspecified until checked and must not claim a storage country or fixed provider-backup deletion period.

## Updated sources

- `src/pages/privacy-policy.astro` is the rendered `/privacy-policy` route. Its notice now contains the approved retention and post-launch disclosure.
- `src/data/preview-copy.json` carries matching copy for the local preview fixture.
- `docs/step-5/approved-copy/10-AutonomyBridge-Privacy-Notice-Copy.md` records the approved policy and disclosure.
- `scripts/audit-step6a.py` checks the built page for the 12-month rule, scope, unspecified provider details, post-launch timing, and continued access to ordinary enquiries.
- `scripts/test-step6a-audit.py` verifies that the audit rejects a changed retention period and a pre-publication verification claim.

The verified Netlify hosting, Netlify Forms processing, random receipt-reference behavior and existing technical processing disclosure remain as recorded in the page source. Deleting a receipt reference is explicitly distinguished from deleting the underlying enquiry.

No account-level provider checks, Netlify settings checks, live enquiry, deployment, merge or publication are covered by this change.
