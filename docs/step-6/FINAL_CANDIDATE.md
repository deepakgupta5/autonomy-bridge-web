# Step 6 final local candidate

**Branch:** `codex/step-6-final-candidate`

**Combined source commit tested:** `9a8fada5fefc820ed51f9e8a2af0069a83c26b49`

**Base:** `41ddedd37f5aff51bacba4b2e13f925fd93e73bc` on `codex/step-6-legacy-bridges`
**Additional code:** the scoped `src/components/HubPageTemplate.astro` change cherry-picked from `b66124af39996db7e1a19638136c292bb0acb49b`. No other code was carried from the Research QA branch.

This candidate is for review only. It remains in local mode. It was not merged, deployed, submitted to a sitemap service or used to send a real enquiry.

## Accepted evidence and integration checks

The [Research heading report at exact commit `d966cbf`](https://github.com/deepakgupta5/autonomy-bridge-web/blob/d966cbf77b0d6c1bc524ca7697600af8419141bb/docs/step-6/research-heading-qa/REPORT.md) tested code commit `b66124a`; the [legacy bridge report at exact commit `41ddedd`](https://github.com/deepakgupta5/autonomy-bridge-web/blob/41ddedd37f5aff51bacba4b2e13f925fd93e73bc/docs/step-6/legacy-bridge-qa/REPORT.md) tested source `91357ca`. Their detailed visual results were accepted for those scopes. Neither report claims to test this combined source commit.

The combined source was built with Node **20.20.1** using `npm run build`. Astro built **163 pages**. `python3 scripts/verify-preview.py /private/tmp/autonomy-step6-0285946-baseline/dist --canonical-apex --research-review` passed against an independently built **157-page** baseline from `0285946a6a500f9207a9c466c7de11a4cffb22a8`: **147 Research routes**, **158 HTML sitemap destinations**, **156 XML entries**, no lost baseline routes or changed existing canonicals, no new broken destinations or referrers, and `legacy_bridge_errors: []`. The eight registered historical broken destinations remain accepted exceptions. The verifier output is also saved in `docs/preview/verification.json`.

Static output inspection found exactly one H1 on `/case-studies`, `/use-cases`, `/market-overview/platform-categories`, `/market-overview/deployment-economics`, `/market-overview/vendor-landscape` and `/market-overview/operator-domains`. The two hubs have the scoped `hub-body--duplicate-title` class in generated HTML and its first-H2 hiding rule in generated CSS. The rule is CSS, so it applies before the existing cleanup script hydrates. `/commercial-leadership`, `/ai-consulting` and `/advisory` are neutral bridges, excluded from both sitemaps and marked `noindex,nofollow` in this local build.

Chrome on a loopback-only static build checked the two hub titles and `/commercial-leadership` at **1423 and 320 CSS px**. Each had one visible H1 and no page-level horizontal overflow. On both hubs, the redundant first body H2 had computed `display: none`; later section headings remained visible. The bridge showed its Startups, Sales Leadership and Contact paths at both widths. No new layout defect was found. Fresh integration screenshots:

| Page | Desktop | Mobile |
| --- | --- | --- |
| `/case-studies` | [1423 px](final-candidate-screenshots/case-studies-1423.jpg) | [320 px](final-candidate-screenshots/case-studies-320.jpg) |
| `/use-cases` | [1423 px](final-candidate-screenshots/use-cases-1423.jpg) | [320 px](final-candidate-screenshots/use-cases-320.jpg) |
| `/commercial-leadership` | [1423 px](final-candidate-screenshots/commercial-leadership-1423.jpg) | [320 px](final-candidate-screenshots/commercial-leadership-320.jpg) |

## Publication-day date action remains open

The two values in `config/deployment-policy.mjs` are **prefilled**, not an approved future launch date. On the actual approved publication day, set `publicationDate` to that calendar date. Set `researchRevisionDate` to the actual approved publication date of this Research revision. Do not infer either value from the current `2026-10-19` and `2026-10-20` placeholders. Then make the separately approved release-mode change, build the actual release artifact and rerun the release-date and route checks.

The complete generated public-date paths controlled by those two policy fields are:

| Policy field | Generated output |
| --- | --- |
| `publicationDate` | `/methodology` visible `Last updated` revision notice in production and its Article JSON-LD `dateModified`. The verified original `datePublished: 2026-03-15` is retained. |
| `researchRevisionDate` | Visible `Last updated` notice on every route in `config/material-research-revisions.json`; JSON-LD Article `dateModified` on materially revised Research pages (FAQPage is excluded); XML sitemap `<lastmod>` for those revised routes; visible `Last updated` on `/privacy-policy`, `/terms-of-use` and `/cookie-policy`. |

`src/data/preview-copy.json` also contains draft “Revision prepared: October 19, 2026. Publication pending.” text for Methodology and the three legal pages. `src/components/CopyPage.astro` replaces those notices from the policy fields in production; confirm the final rendered output contains the approved dates and no draft notice. Historical source-date records in Research cards/content and the verified original Methodology publication date are separate records and should not be mass-replaced with a launch date.

The footer copyright year comes from `new Date().getFullYear()` at build time in `src/components/Footer.astro`; confirm it is the approved build year's value. It is not controlled by either policy date field.

The current local output still displays the prefilled Research revision date. No production-mode artifact was created in this consolidation. Netlify account and live form delivery, notification, storage, mailbox and retention checks remain deferred under the owner's prior instruction. Step 6A remains unstarted.
