# Owner direction: privacy disclosure with post-launch account checks

**Branch:** `codex/step-6a-seo-geo`  
**Base reviewed:** `29284d642da64887a69a01db5e22eafa409bd021`

The owner has directed that Netlify account and notification checks happen **after the site goes live** and will not be completed before launch. Do not make those checks a pre-publication gate or claim they have happened.

## What the current notice says

The current `/privacy-policy` source already says the email provider, forwarding arrangements, provider access locations and account-specific retention or backup schedules are unspecified; it makes no country-residency or fixed-backup-deletion claim and invites users to ask before providing further information. It does not contain the older “require verification before publication” sentence. Preserve this transparent disclosure.

The current notice does not state the owner-approved 12-month retention policy for unsuccessful enquiries. Add it, measured from the last substantive contact, subject to legal requirements. It must cover the enquiry record in Netlify Forms, email and other copies under the operator’s control. Keep the distinction that deleting the random receipt reference does not delete the enquiry.

## Exact copy direction

Keep the existing verified Netlify hosting and Netlify Forms statements and the existing description of the separate random receipt record. In “Providers and retention,” make only the following scoped addition/clarification:

1. State that unsuccessful enquiries are retained for 12 months after the last substantive contact, subject to applicable legal requirements; this policy applies across the form store, email and other copies under the operator’s control.
2. State that the email notification/reply provider, forwarding arrangements, provider access locations, processing countries for submissions/logs and provider backup deletion schedules have not been verified at account level and are not specified here. Do not claim a fixed provider-backup deletion period or storage country.
3. State that these account-level details will be checked after launch and the notice updated if the verified arrangements change or add material disclosure.

Retain the direction to ask about provider details before submitting further information. Do not imply that asking replaces the user’s right to submit an ordinary enquiry.

## Implementation and evidence

- Update the active privacy page in `src/data/preview-copy.json` and the authoritative approved-copy transcription/change record so they agree. Preserve unrelated privacy wording and Research content.
- Extend the built-output audit or a focused privacy-copy check to assert the 12-month rule, post-launch timing, and absence of a false pre-publication verification claim.
- Run the guarded Node 20 production verification and isolated local fixture after the copy change; refresh artifact hashes/evidence and test the privacy page at 1423, 400 and 320 CSS px for overflow/readability.
- Return the tested source commit and report in the repository for review.

No Netlify login/settings check, real enquiry, notification, deployment, merge, sitemap submission or indexing request is authorized by this task. This is a privacy-copy and verification task only.
