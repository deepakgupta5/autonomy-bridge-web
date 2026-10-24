# Step 6A: SEO and AI discovery implementation handoff

## Authority and execution
The owner authorized Step 6A after acceptance of Step 6 local QA. Start from `ce2171e7335b0667df45f675d5fde0323fad1c87`, on dedicated branch `codex/step-6a-seo-geo`. Read this file and `docs/step-6/QA_STATUS.md`, `DATE_GATE_RESULT.md`, `FINAL_CANDIDATE.md`, and `docs/consolidated-release/revision-2/review.md`. The latter records the settled crawler permissions. No tracked AGENTS.md was found at the audited commit; check again in the executor checkout and its ancestors.

Confirm branch, HEAD and existing changes before editing. Preserve unrelated work. Use the approved Step 5 copy and subsequent accepted About corrections already in this branch. The newly attached Architecture v3/Core Model v4 files are older than the resolved Architecture v4/Core Model v5 and must not overwrite the approved branch.

This is an implementation task for local Codex, followed by repository review. Push the scoped result and evidence. Do not merge, deploy, publish, submit sitemaps, request indexing, log in to an account or send real enquiries/notifications. Keep source policy local, both release dates unset, optional analytics off and preview noindex. Netlify account/live checks remain deferred under the owner's instruction. No new permission request is needed for the reversible local implementation below.

## Independent audit of the starting candidate
A fresh detached checkout built successfully with Node 24.19.0 in the reviewer runtime. This is an independent static audit, not Node 20 or Netlify runtime qualification. Local Codex must run the repository's Node 20 build/checks for its changed source.

- 163 generated pages; independent baseline verifier passed against the separate 157-page build from `0285946a6a500f9207a9c466c7de11a4cffb22a8`.
- All 147 Research routes preserved; 158 HTML sitemap destinations and 156 XML entries; no new broken destinations/referrers. Eight registered historical exceptions remain.
- Every HTML page has a title, nonempty description and canonical. All 163 have local `noindex,nofollow`.
- Core titles/descriptions already reflect the approved three-audience copy. Do not rewrite them simply to meet character-count or keyword-density targets.
- Only duplicate title/description pair is /advisory and /ai-consulting, both intentional noindex bridges. No need to rewrite accepted bridge wording for this.
- Raw /contact-success HTML has two H1s for mutually exclusive states, previously reviewed offline. Do not treat this as a new visible duplicate-heading defect.
- Pending-date check passed: 86 revised Research routes, Methodology, Terms and Cookie pending, zero XML lastmod, original Methodology publication date retained. Active Privacy has no revision-date field.
- No OG image is emitted. This is a social-preview enhancement opportunity, not an indexing blocker.
- Organization/WebSite/Breadcrumb schemas are present, but active About has no AboutPage/Person schema, Contact has no ContactPage schema, and approved audience pages have no explicit service/page identity.
- OG type defaults to article for all non-home pages, including audience, About, Contact and Research directory pages.
- public/llms.txt still describes the superseded Commercial Leadership + AI Consulting model and promotes /commercial-leadership and /ai-consulting as service destinations.
- public/robots.txt allows search crawlers and GPTBot, ClaudeBot and Google-Extended. The owner already selected Allow for the latter three, as recorded in revision-2/review.md. Preserve that choice. The older proposed-block file is inactive historical material.
- Named robots groups each Allow / but do not inherit the wildcard reserved-path disallows. Comments also imply training inclusion or citation outcomes that the directives do not guarantee.

Supporting artifacts: `INITIAL_STATIC_AUDIT.json` and `INITIAL_BASELINE_VERIFICATION.json` in this directory. Their source is the starting candidate, not your eventual implementation.

## Implement these scoped changes

### 1. Correct the maintained discovery directory
Replace the stale positioning in public/llms.txt with a concise directory grounded in approved visible copy. Use Autonomy Bridge consistently. Describe Deepak Gupta as personally leading agreed commercial or fundraising work with the team. Current audience destinations must be /startups, /nonprofits and /sales-leadership, with /about and /contact. Do not promote legacy bridges as active offers.

Suitable summaries, drawn from the approved pages:
- Startups: commercialization and revenue leadership for B2B startups, choosing priorities, shaping offers and leading agreed opportunities through the buying process.
- Nonprofits: defined fundraising operations and stewardship work alongside the organization's fundraising expertise. The organization retains donor relationships and solicitation decisions.
- Established businesses: Fractional Sales Leadership for sales priorities, coaching, forecast accountability and important opportunities within an agreed mandate.

Retain the existing Research directory destinations, including /bespoke-research, and the distinction between published Research and paid work. Validate every listed path against the generated build. Do not include private proof, email addresses, invented location coverage or promises of results. This is consistency maintenance, not a Google ranking tactic.

### 2. Add factual entity and page relationships
Use src/utils/schema.ts or a small adjacent shared helper. Add a stable Person identity for Deepak Gupta at https://autonomybridge.com/about#deepak-gupta, with name, About URL, sameAs https://www.linkedin.com/in/deepakgupta5/ and a worksFor relationship to the existing Organization @id. Link the AboutPage mainEntity to that person. Add ContactPage for the active Contact route.

Add restrained WebPage/Service relationships for the three audience pages, using their visible service descriptions and the existing Organization as provider. Do not add ratings, testimonials, client claims, offers/prices, professional credentials, service geographies, company size, dates or fundraising achievements not established by approved visible content. These schemas clarify identity; they are not required special AI markup or a promise of rich results. Preserve Organization and WebSite @ids and company LinkedIn identity. Do not replace the company's sameAs with the person's LinkedIn URL. Preserve existing Research author/schema identities and FAQ/DefinedTerm/Article content.

Use valid schema.org types/properties and escaped JSON output. Check unique @ids, resolved references and visible-text agreement, not JSON parseability alone. Avoid duplicate conflicting page/entity nodes.

### 3. Correct core page social type
Explicitly use og:type website on the six core pages, the /research directory and the three legacy bridges. Keep article semantics for Research articles and Methodology. Prefer scoped route props over changing all historical Research output through the shared default.

An OG image is optional. If a suitable existing public branded asset is available and licensed for reuse, assess its suitability and report it. Do not add a broken image URL, create a new logo, introduce a new visual system or block completion waiting for artwork. Record omitted social imagery as an optional enhancement if no suitable asset exists.

### 4. Make crawler rules accurately express the existing policy
Preserve current Allow permissions for search and training user agents. Correct comments to distinguish search/discovery, user-triggered visits and training/other uses. Remove claims that Allow puts frameworks into model knowledge or guarantees citations.

Ensure each named Allow group receives the existing reserved-path exclusions (/wp-admin/, /admin/, /temp/, /drafts/, /search? and /checkout/), because wildcard rules are not inherited by specific groups. Use a maintainable grouping or explicit repeated rules; retain compatibility with repository guard scripts, or update those checks semantically if required. Keep the apex sitemap-index URL. Do not block current audience or Research routes, assets needed to render them, or bridge URLs whose noindex must remain readable. Preserve robots meta indexing rules and source-controlled date/build gates. Robots directives are not security or access control.

### 5. Record search intent and answer extraction
Create docs/step-6a/QUERY_AND_ANSWER_MAP.md mapping representative buyer questions to the approved canonical pages and visible supporting sections:
- B2B startup commercialization / customer pilots not converting: /startups.
- Selecting customer/market priorities or shaping an initial paid project: /startups.
- Nonprofit donor stewardship and sustained supporter relationships: /nonprofits.
- Coordination across development, finance and programs: /nonprofits.
- Fractional sales leadership, founder delegation, coaching and forecasting: /sales-leadership.
- Who leads delivery, background and prior-role attribution: /about.
- First conversation, direct engagement, response timing and enquiries: /contact.
- Robotics commercialization and deployment analysis: /research and the appropriate retained family/detail routes.

Check static HTML without JavaScript for direct answers, headings, attribution notes, illustrative-question labels and ordinary crawlable links. Preserve approved wording. Identify any real answer gap rather than inventing SEO paragraphs or FAQ sections. This is a deterministic content/retrieval review, not evidence of live rankings or AI citations.

## Verification and evidence
1. Use a clean scoped checkout and Node 20. Run npm run build and the independent verifier:
   python3 scripts/verify-preview.py /path/to/independent-0285946-baseline/dist --canonical-apex --research-review
   Preserve the expected 163/147/158/156 counts and the accepted historical exceptions. Do not weaken inventories to obtain a pass.
2. Run date gates and pending-output checks, including node scripts/test-date-gate.mjs, node scripts/test-release-gates.mjs and python3 scripts/check-pending-dates.py. Keep source dates unset. Production-mode checks may use disposable synthetic fixtures only, never committed release dates or deployable release artifacts.
3. Add/run a focused reusable Step 6A audit of built metadata, JSON-LD relationships, robots group behavior and llms target integrity. It must catch stale legacy offer links in llms, a wrong personal LinkedIn URL, contradictory service claims, missing/conflicting canonical, unintended noindex loss, or blocked audience/Research routes. Verify robots using semantic group matching, including named and unknown agents, rather than string-presence checks alone.
4. Audit all generated titles/descriptions/canonicals, expected indexing matrix, sitemap parity, structured-data JSON and relationships, HTML language and ordinary internal links. Scope any existing nonblocking exceptions explicitly. Do not change canonicals or Research metadata/body content without a documented reason and reviewer visibility.
5. Hash/diff approved public-copy sources and Research content against ce2171e. They should be unchanged. Verify prior-role disclaimers, fictional-example and illustrative-buyer labels, USD wording and annual GMV by year four remain intact.
6. If a change affects visible markup/layout, use local Chrome desktop 1423 and mobile 400/320 widths for the affected pages, and save fresh screenshots. Otherwise document that changes are head metadata/robots/discovery only and verify body-text parity; do not falsely describe an old screenshot as a fresh pass.
7. Record local performance observations if the existing tools permit, including asset sizes/render-blocking resources and any lab test configuration. Do not label a build pass as Core Web Vitals success. Live field metrics, Google/Bing indexing and actual AI citation outcomes are not established locally. Do not introduce analytics tags, new runtime dependencies or a blanket Node upgrade for this audit.
8. Push docs/step-6a/RESULT.md with exact tested source commit, branch/head, changed files, commands and results, failures/exceptions, output paths, and local viewing instructions. Keep original Step 6 evidence attributed to its tested source. Update QA_STATUS.md to link this result and distinguish completed local Step 6A from publication-day/live actions.

## Release actions outside this local task
- Actual approved publication/Research dates and final production-artifact checks on publication day.
- Deferred Netlify form/runtime/delivery/provider/account checks. The existing Node 20 versus some Netlify package engine declarations is a runtime qualification dependency, not resolved by static builds.
- Search Console/Bing access, URL inspection, live redirect/header/robots/CDN validation and observed indexing after an approved deployment. No login or submission is authorized here.
- Real rankings, impressions, AI citations and field Core Web Vitals require observation after launch. Do not claim guaranteed inclusion.
- Optional social card artwork if none suitable exists.

## Primary guidance consulted
Reviewed 2026-10-23, Vancouver date:
- https://developers.google.com/search/docs/appearance/ai-features : normal SEO fundamentals, index/snippet eligibility, textual content, internal links and schema/visible-text agreement; no special AI schema required.
- https://developers.google.com/search/docs/fundamentals/ai-optimization-guide : no need to rewrite approved copy for AI or add llms.txt for Google Search; maintaining an existing directory is separate from ranking.
- https://developers.google.com/crawling/docs/robots-txt/robots-txt-spec : specific user-agent groups do not inherit wildcard rules.
- https://developers.openai.com/api/docs/bots : OAI-SearchBot search access and GPTBot training access are independently controlled.

This handoff supersedes the older instruction to defer Step 6A. It does not authorize release.
