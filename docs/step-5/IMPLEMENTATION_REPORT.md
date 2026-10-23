# Step 5 implementation report

Branch: `codex/step-5-approved-copy`. Base: `main` at `26712952c4076a45de6731e321405dede13c2279`. The reviewed implementation commit is `dac9f81cb9f29eacc101e3828a22319548ff19ec`. The visual review below started from exact commit `0c9eaaba165f4ad4427dbdf356b9c25f23b086e5`; the containing follow-up commit is the branch head shown by GitHub. This branch is unmerged and has no deployed preview.

## Implemented

- Home, Startups, Nonprofits, Sales Leadership and About render the approved source transcriptions in `docs/step-5/approved-copy/`, preserving every paragraph and heading order. A shared Astro renderer maps the approved action labels to routes and presents the homepage audience and situation groups as cards. The About LinkedIn control contains the LinkedIn logo and points to `https://www.linkedin.com/in/deepakgupta5/`.
- Navigation follows Startups, Nonprofits, Sales Leadership, About, Research, Contact. The homepage card remains “Established Businesses”. Existing visual tokens, font, header, footer and responsive breakpoints are reused.
- Contact uses the approved copy, name/email/organization/message fields and an optional editable audience selector. Audience CTAs preselect via `?audience=startups`, `nonprofits`, or `sales-leadership`; a direct visit defaults to “Not sure yet”. The form retains Netlify's existing form name, honeypot, receipt reference and guarded transport. Validation, sending/pending, confirmed failure, unknown-receipt and confirmed-success states remain. The success text matches the approved copy. No public email address appears on Contact.
- The enquiry privacy notice contains the approved public wording and a technical section based on the repository's identifiable Netlify form/receipt path. It links from Contact. The local preview explicitly marks provider and deletion details that require account verification before publication.
- `deploymentPolicy.mode` is `local` on this branch. Every built page emits `noindex,nofollow`; the existing guard rejects remote Netlify/CI builds in local mode. No production notification or site setting was changed.

Changed code: `astro.config.mjs`, `config/deployment-policy.mjs`, `src/components/{ApprovedPage,Footer,Header}.astro`, `src/data/ia.ts`, `src/pages/{index,startups,nonprofits,sales-leadership,about,contact,contact-success,privacy-policy}.astro`, `src/styles/approved-pages.css`, `src/utils/contact-form.ts`. This report is the only added process file. Research content, templates, diagrams and redirects were not edited.

## Research and legacy paths

Before changing paths, the checked-in `docs/preview/research-inventory.json` listed 147 Research URLs. The local build contains all 147, with no missing inventoried paths and no new detail path. `/research` is an existing hub outside that inventory. The 163-page build adds three audience routes to the prior 160-page baseline. Existing `/commercial-leadership`, `/ai-consulting`, `/advisory` and their internal referrers remain. Their older copy can conflict with the new audience architecture; decide redirect/bridge treatment in Step 6 after the route and canonical inventory. Do not delete them without checking Research referrers.

## Provider and privacy evidence

- `config/deployment-policy.mjs` identifies the approved Netlify site and production origin; `netlify.toml` builds static `dist`. `contact.astro` declares `data-netlify="true"`, posts to `/contact-success`, and uses a honeypot. `src/utils/netlify-contact-transport.mjs` verifies a signed-submission receipt rather than treating POST success as acceptance.
- `netlify/functions/submission-created.mjs` records an opaque receipt after Netlify's verified form event. `netlify/lib/contact-receipts.mjs` configures Netlify Blobs `us-east-2` for random references and timestamps, with a 15-minute lookup lifetime; `expire-contact-receipts.mjs` schedules hourly cleanup. This does **not** delete Netlify Forms submissions.
- No CRM or application mail sender is configured in repository code. The Netlify dashboard's form notifications, actual reply mailbox/provider, Forms and log processing countries, account access, retention settings and backup expiry cannot be established from this repository. The production availability of receipt functions also remains unverified. Optional analytics loader is absent from `MainLayout.astro`, but account-level hosting/security telemetry and any dashboard integrations require verification.
- The 12-month unsuccessful-enquiry policy starts after the last substantive contact. The repo has no cross-provider last-contact register or deletion workflow for Forms records, replies, forwarded email, CRM copies and backups. That operational procedure and lawful exceptions must be established before release. The notice is therefore a **local review draft**, not a release-ready processing disclosure.

## Local validation

- Clean working branch at handoff, no `AGENTS.md` in repository tree. Node 20.20.2 through `npm exec --package=node@20`; `npm ci --ignore-scripts` and Node 20 `npm run build` passed: 163 pages. `git diff --check` passed.
- Approved text parity: all source paragraphs and section headings from Home, Startups, Nonprofits, Sales Leadership and About occur in their corresponding built article, with zero missing blocks. This excludes the source document's nonpublic title and navigation instruction. Contact and privacy copy were compared against the approved source during implementation.
- Static checks: all 163 HTML pages emit `noindex,nofollow`; the seven changed public routes each contain one H1. The three audience CTA URLs and optional selector values occur in built HTML; Contact links to privacy and contains no `mailto:`.
- Existing offline `scripts/test-contact-preparation.mjs`, `scripts/test-contact-events.mjs`, and `scripts/test-release-contact.mjs` pass. They use fixtures only. No form POST to Netlify or email was made.
- The original implementation session could not complete a visual pass. The follow-up pass below supplies browser evidence for the seven changed public routes and local Contact states.

## Private viewing

From this branch with Node 20: `npm ci`, then `npm run dev -- --host 127.0.0.1`; open `http://127.0.0.1:4321/`. The local host is private to that machine. The form requires a controlled loopback mock at `/__preview/contact` for a success fixture; do not submit it as a real enquiry. An ordinary local POST without that fixture must not be treated as success. A local build may be made with `npm run build` and inspected in `dist/`. No hosted preview was created. `noindex` does not provide access control.

## Dependencies and Step 6 boundary

Before publication, verify permission for the named Ottonomy and Novus operating claims and USD revenue figures, plus the unnamed B2B platform figure. Confirm Netlify Forms processing location, notifications and mailbox provider, access controls, 12-month deletion across stores and backup behavior. Resolve the old service routes and referrers. The local desktop/mobile pass below does not replace Step 6's release-environment visual and accessibility audit.

Step 6 must independently audit all routes/redirects, canonical host, indexing and sitemap, live form acceptance and notification delivery under separate authorization, accessibility and visual regression, and Research internal-link preservation against the final branch head recorded in issue #11. Do not merge, deploy, submit a sitemap or send a real form notification on the authority of this report.

## Review revision

Following review of `dac9f81`, the footer's superseded “Commercial leadership. Practical AI.” tagline was removed while the footer component and visual treatment remain. The reviewed implementation SHA is now explicit above. Account-level privacy and 12-month deletion verification remain incomplete. Legacy service-path bridge/redirect treatment remains a Step 6 decision. No production mode, deployment or notification setting changed in this revision.

## Desktop and mobile visual review — 23 October 2026

This pass checked the built local preview from `0c9eaaba165f4ad4427dbdf356b9c25f23b086e5` in Chrome at 1423 × 612 CSS px desktop, 400 × 525 mobile, and 320 × 525 narrow mobile. Node 20.20.1 `npm run build` passed with 163 pages before and after the visual correction. The preview ran only on `127.0.0.1`; all seven routes had `document.documentElement.scrollWidth === innerWidth` at each checked width. I inspected each page's opening view, long-section samples, end/footer, headings and links. Cards stack at mobile width; illustrative buyer-question labels, About's prior-role attribution, Contact fields, and the privacy notice remain readable. No content overlap or clipped controls were found at these widths.

| Route | Desktop opening view | Mobile opening view |
| --- | --- | --- |
| Home | [screenshot](visual-review/home-desktop-top.jpg) | [screenshot](visual-review/home-mobile-top.jpg) |
| Startups | [screenshot](visual-review/startups-desktop-top.jpg) | [screenshot](visual-review/startups-mobile-top.jpg) |
| Nonprofits | [screenshot](visual-review/nonprofits-desktop-top.jpg) | [screenshot](visual-review/nonprofits-mobile-top.jpg) |
| Sales Leadership | [screenshot](visual-review/sales-leadership-desktop-top.jpg) | [screenshot](visual-review/sales-leadership-mobile-top.jpg) |
| About | [screenshot](visual-review/about-desktop-top.jpg) | [screenshot](visual-review/about-mobile-top.jpg) |
| Contact | [screenshot](visual-review/contact-desktop-top.jpg) | [screenshot](visual-review/contact-mobile-top.jpg) |
| Enquiry Privacy Notice | [screenshot](visual-review/privacy-policy-desktop-top.jpg) | [screenshot](visual-review/privacy-policy-mobile-top.jpg) |

[Narrow mobile long-section samples](visual-review/mobile-mids-320.jpg) show audience cards, scenario sections, attribution text, the Contact form, and privacy text. The 320 px header initially wrapped “Menu” across two lines. A CSS-only adjustment to `Header.astro` reduces the narrow header gap/brand size and keeps the menu label on one line; the [after screenshot](visual-review/home-mobile-320-after.jpg) and a repeat overflow check confirm it fits. The mobile menu was opened in Chrome and its six navigation links and global CTA were visible.

Contact was checked at desktop and 320 px mobile. A direct visit showed “Not sure yet”; query links preselected Startups and Nonprofits. Empty submission displayed field errors and focused the first invalid field ([desktop](visual-review/contact-desktop-validation.jpg), [mobile](visual-review/contact-validation-mobile-320.jpg)). A local-only 404 returned the [confirmed-failure state](visual-review/contact-failed-mobile-320.jpg) with entries retained. A separate loopback mock delayed a response to expose [pending](visual-review/contact-pending-mobile-320.jpg), returned ambiguous HTML to expose [unknown receipt](visual-review/contact-unknown-mobile-320.jpg) with duplicate submission disabled, and returned `{ "accepted": true }` to reach the [confirmed-success page](visual-review/contact-success-mobile-320.jpg). These used synthetic `example.invalid` data sent only to `127.0.0.1`; no Netlify Form, mailbox, notification, or external provider received a test enquiry. The mock shows interface states only; it does not prove production receipt or delivery.

The privacy notice remains a local noindex draft. Netlify account-level email provider, processing locations, access/backup settings and the 12-month deletion procedure across Forms, email and copies remain unverified. Company/financial-claim permission and the legacy service-path disposition also remain open. This visual pass is Step 5 review evidence, not release approval or Step 6 QA.
