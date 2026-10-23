# Step 6 local visual review

**Tested source:** `codex/step-6-qa` at `f87806c14e482227365e231e646555a5f7a8379b` (clean checkout before evidence files).

**Date:** 2026-10-23. **Browser:** Google Chrome, local loopback only. **Runtime:** Node 20.20.1.
**Build:** `npm ci --no-audit --no-fund`, `npm run build`, `npm run dev -- --host 127.0.0.1`. The build generated 163 HTML pages; all 163 include `noindex,nofollow`. A local `astro preview` of that build was used for screenshots so Astro's developer toolbar did not cover page content. No production or public preview was deployed.

## Seven-page visual matrix

Each route was inspected at **1423, 400 and 320 CSS px**. The [screenshots](screenshots/) contain a fresh full-page capture for every cell (`<route>-<width>.jpg`, with `/` named `home`). At each width, the page-level scroll width equaled the viewport width. The images were checked for typography, wrapping, clipping, section order, CTA visibility, navigation and footer layout. The mobile menu opened at 320 px and remained inside the viewport ([capture](screenshots/mobile-menu-320.jpg)).

| Route | Result |
| --- | --- |
| Home `/` | Pass. Hero, three audience cards, decision examples, CTAs and footer wrap cleanly. |
| Startups `/startups` | Pass. Longer approved copy, example sections and repeated CTA remain readable. |
| Nonprofits `/nonprofits` | Pass. Longer approved copy, example sections and repeated CTA remain readable. |
| Sales Leadership `/sales-leadership` | Pass. Leadership examples and CTA remain readable in desktop columns and mobile stack. |
| Contact `/contact` | Pass. Two-column desktop layout becomes a readable single column; form controls, privacy link and footer remain visible. |
| About `/about` | Pass. Long biography and three-audience sections wrap without clipping. |
| Privacy Policy `/privacy-policy` | Pass. Notice headings, retention text and request link remain readable. |

No new layout defect was found, so no shared CSS or content change was made. The 320 px navigation links have off-canvas geometry while the menu is closed, by design; `documentElement.scrollWidth` remains 320 px and the links render inside the viewport when opened. No page-level horizontal scrolling was observed.

## Audience CTAs and Contact fixtures

The primary CTA on each audience page was clicked at 320 px. Contact opened with the matching optional value (`startups`, `nonprofits`, `sales-leadership`); each select remained editable and could be reset to “Not sure yet”. These were real browser interactions, not URL-only checks.

The Contact UI was tested through a temporary server bound only to `127.0.0.1:8767`, serving the local `dist` and intercepting `POST /__preview/contact`. Synthetic values (`Fixture Person`, `fixture@example.test`, and fixture marker messages) never reached Netlify or any external receiver. Screenshots show the states below.

| State | Fixture and observed result | Evidence |
| --- | --- | --- |
| Required validation | Empty submit highlights name, email and message, reports errors, and focuses name. An invalid email also reports its specific error and focuses email. | [Validation](screenshots/contact-validation-320.jpg) |
| Pending | A 1.5-second loopback response delay shows “Sending enquiry…” and disables the button. | [Pending](screenshots/contact-pending-320.jpg) |
| Rejected/error | HTTP 422 reports “wasn’t submitted”, retains entries and re-enables the button. | [Rejected](screenshots/contact-rejected-320.jpg) |
| Unknown outcome | HTTP 200 with HTML instead of a receipt reports uncertain delivery and holds the button disabled. | [Unknown](screenshots/contact-unknown-320.jpg) |
| Confirmed success | HTTP 200 JSON `{ "accepted": true }` navigates to `/contact-success`, which identifies this as a local interface test. Opening that URL directly shows “Submission not confirmed”. | [Confirmed](screenshots/contact-success-320.jpg) |

These fixtures establish only the local interface behavior. They do not establish service acceptance, notification delivery, mailbox receipt, storage or retention.

## Sitemap and Research samples

The [HTML sitemap](screenshots/sitemap-320.jpg) visibly contains the new Startups, Nonprofits and Sales Leadership links, and each target is correct. The Research hub and one content page from each family were inspected at 1423 and 320 px. Desktop captures are full-page; the 320 px Research captures show the first viewport. None introduced page-level horizontal scrolling or a visible layout regression.

| Family | Representative route |
| --- | --- |
| Research hub | `/research` |
| Insights | `/insights/how-robotics-vendors-misjudge-their-addressable-market` |
| Market Overview | `/market-overview/platform-categories` |
| Frameworks | `/frameworks/robotics-roi-model` |
| Use Cases | `/use-cases/warehouse-automation-roi-evaluation` |
| Case Studies | `/case-studies/automation-deployment-risk-assessment` |
| Glossary | `/glossary/sensor-fusion` |

The sampled Market Overview page still has two visible H1 elements. It is one of the six Research routes already listed in `QA_STATUS.md`; this is a pre-existing semantic issue, not a new layout regression. All 147 Research routes and their content were left untouched.

## Remaining checks and boundaries

- Repeat the production-mode verifier on the actual release artifact after publication and Research revision dates are set. This local build intentionally remains `noindex,nofollow`.
- Resolve or explicitly accept the six pre-existing duplicate-H1 Research routes. Retain the eight historical broken destinations as recorded exceptions unless a separate repair is authorized.
- Decide the fate of the three old service paths listed in `QA_STATUS.md`.
- Per the owner's deferral, production form acceptance, notification delivery, storage, mailbox and retention checks remain after go-live. No real enquiry was submitted.
- SEO and AI discovery/GEO work remains Step 6A.

`npm ci` on Node 20 emitted engine warnings for four Netlify packages that declare Node 22.12 or later; the Node 20 static build completed successfully. This review did not exercise those packages in a Netlify runtime.
