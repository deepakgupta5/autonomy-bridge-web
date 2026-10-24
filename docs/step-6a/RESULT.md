# Step 6A local implementation result

> Historical result for the earlier local-mode implementation. The current branch is a guarded production-artifact candidate. Use the authoritative production command and separate local fixture documented in [`CORRECTION_RESULT.md`](../independent-review/CORRECTION_RESULT.md); the older local build/viewing commands below do not apply to the current checkout.

**Status:** completed for repository review; no release action taken.  
**Branch:** `codex/step-6a-seo-geo`  
**Handoff source:** `30da9056137ef03e05f61e78e41ba212e0cbcfc7`  
**Initial implementation source:** `38d759c22984860ac2701f77c20a77fd1fa410c0`
**Exact tested final-correction source:** `1df59d31c9a719baf702c6edd7a557bba4fa1a87`
**Final report commit:** the subsequent commit containing this update; it changes documentation only.
**Runtime:** Node `v20.20.1`, Python 3; source policy remains local, release dates unset, optional analytics off.

## Changes made

- Replaced `public/llms.txt` with the approved Autonomy Bridge positioning, the three current audience destinations, About and Contact, and the retained published Research directory. Every listed path resolves in the local build. Legacy bridge URLs are no longer presented as active offers.
- Added Deepak Gupta's Person identity and its AboutPage relationship, ContactPage identity, and WebPage/Service relationships for `/startups`, `/nonprofits` and `/sales-leadership`. The service descriptions occur verbatim in visible page text. The existing Organization, WebSite, company LinkedIn, Research author and article identities remain.
- Set `og:type=website` on the six core pages, Research directory and three legacy bridges; Research detail articles and Methodology retain `article`. JSON-LD output now escapes `<` inside script data.
- Grouped search/discovery and user-triggered crawlers and repeated the reserved-path rules in each owner-approved training group. The wildcard group has the same public/reserved treatment. GPTBot, Google-Extended and ClaudeBot remain allowed on public routes. The apex sitemap index is unchanged.
- Added the [query and answer map](QUERY_AND_ANSWER_MAP.md), [built-output audit](../../scripts/audit-step6a.py), [negative controls](../../scripts/test-step6a-audit.py), and [body parity checker](../../scripts/check-step6a-body-parity.py). The production-mode release fixture now checks the robots indexing matrix on all 163 generated pages.

## Initial implementation verification at `38d759c`

| Check | Result |
| --- | --- |
| `npm run build` with Node 20 | Pass; 163 generated HTML pages. |
| `python3 scripts/verify-preview.py /private/tmp/autonomy-step6-0285946-baseline/dist --canonical-apex --research-review` | Pass; 163 pages, 147 Research routes, 158 HTML sitemap destinations, 156 XML entries. No lost baseline routes, changed existing canonicals or new broken destinations. Eight registered historical broken destinations remain. See [`docs/preview/verification.json`](../preview/verification.json). |
| `python3 scripts/audit-step6a.py` | Pass; all 163 titles, descriptions, canonicals, language tags, OG fields and local `noindex,nofollow` rules; schema identities/references; static answer extraction; `llms.txt` paths; and named/unknown crawler group behavior. See [`STEP6A_AUDIT.json`](STEP6A_AUDIT.json). |
| `python3 scripts/test-step6a-audit.py` | Pass; rejected eight injected regressions: stale legacy offer, wrong personal LinkedIn, contradictory service claim, missing canonical, conflicting canonical, lost local noindex, blocked audience, and blocked Research. |
| `python3 scripts/check-step6a-body-parity.py /private/tmp/ab-step6a-ce2171e/dist` | Pass at this initial source; normalized `<main>` text was identical for all 163 pages against an independent Node 20 build of `ce2171e`. The final correction below has fresh screenshots under its own source attribution. Earlier Step 6 screenshots retain their recorded source attribution. |
| `node scripts/test-date-gate.mjs`; `node scripts/test-release-gates.mjs`; `python3 scripts/check-pending-dates.py` | Pass; 86 revised routes retain publication-pending wording, with no XML `lastmod` from unset release dates. |
| `python3 scripts/test-release-build.py` | Pass using a disposable synthetic-date production fixture. The 163-page indexing matrix passed: public core routes indexable in that fixture, bridges `noindex,follow`, and Contact success `noindex,nofollow`. No deployable release artifact was produced. |
| `git diff --exit-code ce2171e -- docs/step-5/approved-copy src/content src/data/preview-copy.json` | Pass; approved copy and Research content unchanged. Git tree/blob IDs also match: approved copy `c7a7d900`, Research `7b525f7f`, preview copy `ad071714`. |

The static audit confirms visible prior-role attribution, illustrative buyer questions, the fictional nonprofit example, the Contact response statement, and the About page's **USD $75 million in annual GMV by year four** wording. It verifies that these remain in the built HTML; it does not independently verify the underlying claims.

## Final Research navigation correction at `1df59d3`

The review at `2bf55f3` accepted the initial implementation and supplied an exact replacement for the three closing service-handoff paragraphs on `/research`. The new block links to Startups, Nonprofits and Sales Leadership and uses “Discuss your challenge” for Contact. The Research evidence paragraph, H3, collection links, IDs, template and styles remain unchanged. `src/data/preview-copy.json` changed only the `/research` HTML string and only those three paragraphs within it; approved Step 5 sources and `src/content` remain byte-identical to `2bf55f3`.

| Final-source check | Result |
| --- | --- |
| Node 20 `npm run build` and independent baseline verifier | Pass; 163 pages, 147 Research routes, 158 HTML sitemap destinations, 156 XML entries; no new broken links or canonical changes. Eight historical broken destinations remain. |
| Step 6A built-output audit and negative controls | Pass; all 163 pages retain local `noindex,nofollow`; the audit asserts the exact `/research` service block and Contact label. All nine injected regressions were rejected, including restoration of the old active-offer block. |
| Adapted body parity against independent `ce2171e` build | Pass; normalized main text is equal on the other 162 pages. On `/research`, the full `<main>` markup becomes byte-identical to baseline after reversing only the specified three-paragraph replacement, covering all other text and links. |
| Date gates and pending output | `node scripts/test-date-gate.mjs`, `node scripts/test-release-gates.mjs` and `python3 scripts/check-pending-dates.py` passed; 86 pending Research routes and zero XML `lastmod` entries remain. |
| Local Playwright review of `/research` | Pass at 1423, 400 and 320 CSS px. The three links and Contact CTA have the specified labels/destinations, are readable, and the document width equals viewport width at each size. No styling change was needed. The only console error was a missing local `favicon.ico`, unrelated to this block. |

Fresh screenshots from `1df59d3` are saved as [full page at 1423](research-final-qa/research-1423.png), [400](research-final-qa/research-400.png) and [320](research-final-qa/research-320.png) CSS px, with corresponding [closing block at 1423](research-final-qa/research-guidance-1423.png), [400](research-final-qa/research-guidance-400.png) and [320](research-final-qa/research-guidance-320.png). The [query and answer map](QUERY_AND_ANSWER_MAP.md) marks the former mismatch resolved. The three legacy bridge pages retain their noindex and sitemap treatment.

## Local viewing and performance observations

For the source tested in this historical section, use Node 20 and the then-local build instructions. The current production candidate requires the explicit target/context and baseline command in [`CORRECTION_RESULT.md`](../independent-review/CORRECTION_RESULT.md). Serve any rebuilt artifact only on loopback for review.

The local output contains six CSS assets totalling 52,429 bytes, three JavaScript assets totalling 4,684 bytes and 17 WOFF2 assets totalling 344,348 bytes. The home HTML requests one render-blocking stylesheet (`/_astro/about.Dl7pouXo.css`, 20,997 bytes) and no module script. These are static asset observations, not a Lighthouse run or Core Web Vitals result. No analytics tag or runtime dependency was added.

## Review notes and remaining boundaries

- The former `/research` active-offer link mismatch is resolved by the final correction above.
- The `/advisory` and `/ai-consulting` bridges retain their intentional duplicate title/description pair. Raw Contact success HTML still contains two H1 elements for mutually exclusive states. The eight historical broken destinations remain accepted exceptions.
- No suitable existing branded social-card asset was found in `public/`; `og:image` remains an optional enhancement. No new imagery was created.
- This local result does not establish live indexing, ranking, AI citations, form delivery, or field Core Web Vitals. Publication dates, the final release artifact, Netlify runtime and retention checks, live crawler/header checks and search-console actions remain outside this task. No merge, deployment, sitemap submission, indexing request, account login or real enquiry occurred.
