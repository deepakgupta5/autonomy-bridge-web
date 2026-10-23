# Legacy bridge local visual QA

**Tested source:** `codex/step-6-legacy-bridges` at `91357caade824265c3edd9ce20ede20ff1a4bc7d` (clean checkout before evidence files). **Date:** 2026-10-23. **Browser:** Google Chrome on a loopback-only static preview. **Runtime:** Node 20.20.1. No deployment or real enquiry.

## Visual result

Each bridge was reviewed at **1423 and 320 CSS px**. The [six fresh full-page screenshots](screenshots/) show intact headings, neutral audience guidance, readable cards, navigation and footer. At both widths, `documentElement.scrollWidth` equaled the viewport width. The [mobile menu](screenshots/mobile-menu-320.jpg) also opened within the 320 px viewport.

| Bridge | 1423 px | 320 px | Main-page links |
| --- | --- | --- | --- |
| `/commercial-leadership` | [Screenshot](screenshots/commercial-leadership-1423.jpg) | [Screenshot](screenshots/commercial-leadership-320.jpg) | Startups, Sales Leadership, Contact |
| `/ai-consulting` | [Screenshot](screenshots/ai-consulting-1423.jpg) | [Screenshot](screenshots/ai-consulting-320.jpg) | Startups, Nonprofits, Sales Leadership, Contact |
| `/advisory` | [Screenshot](screenshots/advisory-1423.jpg) | [Screenshot](screenshots/advisory-320.jpg) | Startups, Nonprofits, Sales Leadership, Contact |

Every listed audience and Contact link was activated from its bridge in Chrome at 320 px: **11 of 11** reached the intended route. No form was submitted. The shared header navigation and footer were visible on all three pages. No layout defect was found, so no CSS or page code was changed.

## Build and route checks

- `npm ci --no-audit --no-fund` and `npm run build` completed with Node 20; 163 HTML pages were built.
- The independent-baseline route verifier passed against a separate 157-page build of `0285946a6a500f9207a9c466c7de11a4cffb22a8`, using `--canonical-apex --research-review`. It reported 147 Research routes, 158 HTML sitemap destinations, 156 XML entries, no new broken links, and `legacy_bridge_errors: []`.
- The local browser saw a self canonical on each bridge and `noindex,nofollow`, as required by the local preview policy. The verifier confirmed all three bridges are excluded from both sitemaps. The production-mode `noindex,follow` behavior was recorded in `LEGACY_BRIDGES.md` from earlier simulated checks and was not re-tested in this visual pass.

No Research content or redirects were changed. This branch remains separate from the Research heading fix. Integration, deployment and Step 6A remain outside this review.
