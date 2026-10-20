# Contact form restoration — 2026-10-19

Owner requested restoration after email-only launch. Netlify form detection is now enabled using the existing authenticated connection. The page renders Name, Email, Company (required), Website (optional), Message (required), honeypot and opaque receipt reference. Removed “Prefer email?” and “What happens next” blocks stay absent.

Receipt confirmation now uses Netlify's signed `submission-created` event and site-scoped Netlify Blobs, avoiding an account API token in the backend. Only a random reference and acceptance timestamp are stored as confirmation data, in US East; receipt validity is 15 minutes and hourly cleanup removes expired markers. No enquiry content is copied into this store. Netlify Forms holds the submission itself. The browser sends once, polls confirmation up to ten times and preserves unknown states without duplicate submission. Success still does not prove email delivery.

Build, route audit and offline event/receipt tests passed. The four proof-bearing page records are unchanged. The original Downloads ZIP was no longer at its prior path on this turn, so the ZIP comparison was not claimed as rerun; earlier exact comparisons remain recorded. Privacy/Cookie/Terms now reflect the form and confirmation processing. Optional analytics remains off.

No real enquiry sent. Notification recipients have not been changed. Live form detection and endpoint availability must be verified after deployment; real acceptance/delivery still requires a separately authorized test.

Provider documentation: https://docs.netlify.com/build/functions/trigger-on-events/ and https://docs.netlify.com/build/data-and-storage/netlify-blobs/ . Netlify validates event signatures before invoking reserved event functions; Blobs supplies site-scoped credentials in Functions.
