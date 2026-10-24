# Step 6A local implementation result

**Status:** completed for repository review; no release action taken.  
**Branch:** `codex/step-6a-seo-geo`  
**Handoff source:** `30da9056137ef03e05f61e78e41ba212e0cbcfc7`  
**Exact tested implementation source:** `38d759c22984860ac2701f77c20a77fd1fa410c0`  
**Report commit:** the subsequent commit containing this file; it changes documentation only.  
**Runtime:** Node `v20.20.1`, Python 3; source policy remains local, release dates unset, optional analytics off.

## Changes made

- Replaced `public/llms.txt` with the approved Autonomy Bridge positioning, the three current audience destinations, About and Contact, and the retained published Research directory. Every listed path resolves in the local build. Legacy bridge URLs are no longer presented as active offers.
- Added Deepak Gupta's Person identity and its AboutPage relationship, ContactPage identity, and WebPage/Service relationships for `/startups`, `/nonprofits` and `/sales-leadership`. The service descriptions occur verbatim in visible page text. The existing Organization, WebSite, company LinkedIn, Research author and article identities remain.
- Set `og:type=website` on the six core pages, Research directory and three legacy bridges; Research detail articles and Methodology retain `article`. JSON-LD output now escapes `<` inside script data.
- Grouped search/discovery and user-triggered crawlers and repeated the reserved-path rules in each owner-approved training group. The wildcard group has the same public/reserved treatment. GPTBot, Google-Extended and ClaudeBot remain allowed on public routes. The apex sitemap index is unchanged.
- Added the [query and answer map](QUERY_AND_ANSWER_MAP.md), [built-output audit](../../scripts/audit-step6a.py), [negative controls](../../scripts/test-step6a-audit.py), and [body parity checker](../../scripts/check-step6a-body-parity.py). The production-mode release fixture now checks the robots indexing matrix on all 163 generated pages.

## Verification at the tested source

| Check | Result |
| --- | --- |
| `npm run build` with Node 20 | Pass; 163 generated HTML pages. |
| `python3 scripts/verify-preview.py /private/tmp/autonomy-step6-0285946-baseline/dist --canonical-apex --research-review` | Pass; 163 pages, 147 Research routes, 158 HTML sitemap destinations, 156 XML entries. No lost baseline routes, changed existing canonicals or new broken destinations. Eight registered historical broken destinations remain. See [`docs/preview/verification.json`](../preview/verification.json). |
| `python3 scripts/audit-step6a.py` | Pass; all 163 titles, descriptions, canonicals, language tags, OG fields and local `noindex,nofollow` rules; schema identities/references; static answer extraction; `llms.txt` paths; and named/unknown crawler group behavior. See [`STEP6A_AUDIT.json`](STEP6A_AUDIT.json). |
| `python3 scripts/test-step6a-audit.py` | Pass; rejected eight injected regressions: stale legacy offer, wrong personal LinkedIn, contradictory service claim, missing canonical, conflicting canonical, lost local noindex, blocked audience, and blocked Research. |
| `python3 scripts/check-step6a-body-parity.py /private/tmp/ab-step6a-ce2171e/dist` | Pass; normalized `<main>` text is identical for all 163 pages against an independent Node 20 build of `ce2171e`. No visible markup/layout change was made, so no fresh browser screenshots are claimed. Earlier Step 6 screenshots retain their recorded source attribution. |
| `node scripts/test-date-gate.mjs`; `node scripts/test-release-gates.mjs`; `python3 scripts/check-pending-dates.py` | Pass; 86 revised routes retain publication-pending wording, with no XML `lastmod` from unset release dates. |
| `python3 scripts/test-release-build.py` | Pass using a disposable synthetic-date production fixture. The 163-page indexing matrix passed: public core routes indexable in that fixture, bridges `noindex,follow`, and Contact success `noindex,nofollow`. No deployable release artifact was produced. |
| `git diff --exit-code ce2171e -- docs/step-5/approved-copy src/content src/data/preview-copy.json` | Pass; approved copy and Research content unchanged. Git tree/blob IDs also match: approved copy `c7a7d900`, Research `7b525f7f`, preview copy `ad071714`. |

The static audit confirms visible prior-role attribution, illustrative buyer questions, the fictional nonprofit example, the Contact response statement, and the About page's **USD $75 million in annual GMV by year four** wording. It verifies that these remain in the built HTML; it does not independently verify the underlying claims.

## Local viewing and performance observations

From this checkout, use Node 20, run `npm ci` if dependencies are absent, then `npm run build` and `npm run preview`. Review the generated files in `dist/`, including `dist/robots.txt`, `dist/llms.txt`, `dist/about.html`, `dist/contact.html` and the audience pages. Rerun `python3 scripts/audit-step6a.py` after any subsequent source change.

The local output contains six CSS assets totalling 52,429 bytes, three JavaScript assets totalling 4,684 bytes and 17 WOFF2 assets totalling 344,348 bytes. The home HTML requests one render-blocking stylesheet (`/_astro/about.Dl7pouXo.css`, 20,997 bytes) and no module script. These are static asset observations, not a Lighthouse run or Core Web Vitals result. No analytics tag or runtime dependency was added.

## Review notes and remaining boundaries

- The final visible guidance block on `/research` still labels `/commercial-leadership` and `/ai-consulting` as work paths. Those URLs resolve to neutral legacy bridges. The mismatch is recorded in the query map for a separate approved-copy decision; Step 6A did not rewrite accepted public text.
- The `/advisory` and `/ai-consulting` bridges retain their intentional duplicate title/description pair. Raw Contact success HTML still contains two H1 elements for mutually exclusive states. The eight historical broken destinations remain accepted exceptions.
- No suitable existing branded social-card asset was found in `public/`; `og:image` remains an optional enhancement. No new imagery was created.
- This local result does not establish live indexing, ranking, AI citations, form delivery, or field Core Web Vitals. Publication dates, the final release artifact, Netlify runtime and retention checks, live crawler/header checks and search-console actions remain outside this task. No merge, deployment, sitemap submission, indexing request, account login or real enquiry occurred.
