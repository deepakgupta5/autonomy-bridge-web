# Research heading local visual QA

**Tested code commit:** `b66124af39996db7e1a19638136c292bb0acb49b` on `codex/step-6-research-headings`.

**Date:** 2026-10-23. **Browser:** Google Chrome on loopback. **Viewport widths:** 1423 and 320 CSS px. **Runtime:** Node 20.20.1. No deployment or real form submission.

## Result

All six routes have exactly one rendered H1, unchanged opening words and body text, unchanged opening-title anchor IDs, readable heading hierarchy, working representative internal links, and no page-level horizontal overflow at either width. The [screenshots](screenshots/) include a top viewport and a body-heading viewport for every route at both widths (24 images), plus pre-hydration top viewports for the two hubs at both widths (4 images).

| Route | Opening title anchor | Visual result |
| --- | --- | --- |
| `/case-studies` | `case-studies` | [1423 top](screenshots/case-studies-1423.jpg) · [320 top](screenshots/case-studies-320.jpg) · [later H2 at 320](screenshots/case-studies-body-320.jpg). One H1; redundant body H2 hidden and later “How Case Studies Connect to Frameworks” visible. |
| `/use-cases` | `use-cases` | [1423 top](screenshots/use-cases-1423.jpg) · [320 top](screenshots/use-cases-320.jpg) · [later H2 at 320](screenshots/use-cases-body-320.jpg). One H1; redundant body H2 hidden and later “How Use Cases Connect to Frameworks” visible. |
| `/market-overview/platform-categories` | `platform-categories` | [1423 top](screenshots/market-overview--platform-categories-1423.jpg) · [320 body H2](screenshots/market-overview--platform-categories-body-320.jpg). One H1, intact body H2. |
| `/market-overview/deployment-economics` | `deployment-economics` | [1423 top](screenshots/market-overview--deployment-economics-1423.jpg) · [320 body H2](screenshots/market-overview--deployment-economics-body-320.jpg). One H1, intact body H2. |
| `/market-overview/vendor-landscape` | `vendor-landscape` | [1423 top](screenshots/market-overview--vendor-landscape-1423.jpg) · [320 body H2](screenshots/market-overview--vendor-landscape-body-320.jpg). One H1, intact body H2. |
| `/market-overview/operator-domains` | `operator-application-domains` | [1423 top](screenshots/market-overview--operator-domains-1423.jpg) · [320 body H2](screenshots/market-overview--operator-domains-body-320.jpg). One H1, intact body H2. |

The four Market Overview opening body headings were compared in Chrome with the accepted prior Step 6 build at both widths. Their text, anchor ID, computed font size, weight and line height match exactly: **44 px / 700 / 52.8 px** at 1423 px and **32 px / 700 / 38.4 px** at 320 px. Normalized `.hub-body` or `.mc-body` text from the six built pages also matches the accepted prior build exactly. Its former embedded H1 anchor IDs match the new body H2 IDs listed above.

## Pre-hydration finding and fix

The two hub pages initially relied on a client script to hide their redundant opening body H2. A local static-first-paint fixture served the same built HTML and CSS while omitting only its module script. Before the fix, those H2s were visible in that fixture; a deep link to `#case-studies` exposed the duplicate title at the top of a 320 px viewport. The scoped CSS change in `HubPageTemplate.astro` now hides the first body H2 on only `/case-studies` and `/use-cases` before hydration. The existing script still runs normally afterward. In the static fixture and hydrated page, that first H2 is hidden at both widths; later H2 sections remain visible and their anchors navigate to the right content. The first body section begins 2,066–6,478 px below the initial viewport, depending on route and width. [Case Studies pre-hydration at 320](screenshots/case-studies-prehydration-320.jpg) and [Use Cases pre-hydration at 320](screenshots/use-cases-prehydration-320.jpg) show the initial top view.

The fixture checks static rendering, not network timing. The CSS rule removes the script-timing dependency for the duplicate title. The hubs' separate “Index” cleanup remains the existing client behavior and was not changed by this heading fix.

## Build, routes and links

- `npm ci --no-audit --no-fund` and `npm run build` completed with Node 20; 163 HTML pages were built.
- An independent Node 20 build of baseline commit `0285946a6a500f9207a9c466c7de11a4cffb22a8` produced 157 pages. `scripts/verify-preview.py` passed against that baseline with `--canonical-apex --research-review` after the CSS fix: 147 Research routes, 161 expected HTML sitemap links, 159 XML entries, and no new route, canonical, fragment, metadata, robots or link failures.
- One representative internal link on each of the six pages was activated in Chrome and reached its expected route. The independent verifier checked the built internal-link graph more broadly.
- The local build retains `noindex,nofollow` and was served only on `127.0.0.1`.

No Research wording, routes, metadata, publication dates or legacy bridge pages were changed. No remaining visual issue was found in the six tested heading routes. The separate legacy bridge review and Step 6A remain outside this branch.
