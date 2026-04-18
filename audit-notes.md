# Autonomy Bridge Website ,  Full Audit Notes (All Sessions)

**Project:** `/Users/deepakgupta/Documents/New project/autonomy-bridge-web`
**Framework:** Astro 4.x, static site, content collections (markdown)
**Deployed:** Netlify → https://www.autonomybridge.com
**GitHub:** deepakgupta5/autonomy-bridge-web

---

## Brand Rules

- Tokens: `src/styles/tokens.css`
- Fonts: Inter (sans) + IBM Plex Mono (mono) via `--font-sans` / `--font-mono`
- Amber accent: `--color-border-accent: #d97706`, `--color-bg-accent: #fef3c7`, `--color-text-accent: #92400e`
- Dark CTA: `--color-cta-bg: #0f172a`, `--color-cta-border: #d97706`, `--color-cta-text: #f8fafc`
- Page bg: `--color-bg-page: #f8fafc`, surface: `--color-bg-surface: #f1f5f9`
- H1 + sans tagline on every detail page
- Amber top-border cards on hub grids
- Dark CTA banner "Book 15-min scoping call" → `/contact` on every detail page

---

## Sessions 1-3: Core Pages

Pages rebuilt from scratch with full brand pattern:
- Homepage (`src/pages/index.astro`)
- Advisory (`src/pages/advisory.astro`)
- About (`src/pages/about.astro`)
- Bespoke Research (`src/pages/bespoke-research.astro`)
- Methodology (`src/pages/methodology.astro`)
- Glossary hub + term template (`src/pages/glossary/index.astro`, `src/components/GlossaryTermTemplate.astro`)
- Market Overview hub + 5 subpages (`src/pages/market-overview/index.astro`, `src/components/MarketOverviewChildTemplate.astro`)
- Contact (`src/pages/contact.astro`)
- ContentCard brand tokens (`src/components/ContentCard.astro`)
- Sitemap redirect added to `public/_redirects`

---

## Session 4: Frameworks Hub + Detail Pages

### HubPageTemplate.astro
- Hub tagline uses `--font-sans` (not mono)
- Dark CTA banner → `/contact`
- Hub body h2 separators
- "Also in this section" pill nav
- FAQ structuring

### DetailPageTemplate.astro ,  Full rewrite
- Hero: eyebrow → H1 → sans tagline
- Single `<section class="detail-body prose-surface"><slot /></section>`
- Dark CTA banner
- Related content pill layout
- Client-side transforms:
  1. Strip `{#anchor}` from heading text
  2. Replace `[NO VISIBLE IMAGE ,  metadata only: fig_N]` with `<figure class="inline-diagram">`
  3. Hide `## Appendix` sections + siblings
  4. Wrap `(Autonomy Bridge proprietary analysis...)` in `<cite class="ab-citation">`

### astro.config.mjs
- `markdown: { syntaxHighlight: false }` ,  disables Shiki dark theme

---

## Session 5: Insights + DetailPageTemplate Transforms

### `src/pages/insights/index.astro` ,  Full rewrite
- Hero: H1 + sans tagline
- 6 article cards with amber top border
- Dark CTA banner
- Related research pill nav

### DetailPageTemplate.astro ,  New transforms
- **T5**: Hide first H1 in body (duplicate of hero H1)
- **T6**: Hide `:::directive` blocks (ai-contract, hard-truth, logic-block)
- **T7**: Structure FAQ Q&A pairs into `.faq-qa-pair > .faq-q + .faq-a`

---

## Session 6: Directive Block Fixes + Link Audit

### DetailPageTemplate.astro
- **T6 upgraded**: proper block-tracking via `Array.from(body.children)` for multi-element directives
- **T8 added**: hide hub back-link paragraphs (`[All Insights →]`, `**Framework hub:**` etc.)

### Link Audit
- All 34 documented broken links resolved
- No `[INTERNAL LINK: /path]` placeholders remain

---

## Session 7: Case Studies + Use Cases

### DetailPageTemplate.astro
- **T8 extended**: also hides `Related case studies:`, `Related frameworks:`, `Related insights:`, `Related use cases?:`, `Glossary terms?:` paragraphs
- **T9 added**: hides `<pre>` blocks containing JSON-LD schema blobs

### HubPageTemplate.astro
- Hub cleanup script: hides duplicate H1/H2 and "Index" sections

---

## Session 8: Font Consistency + Hub Section Order

### Root causes of font inconsistency fixed:
1. `.detail-tagline` / `.hub-tagline` changed from mono → sans
2. 4 policy pages rewritten from broken Tailwind to design system (`cookie-policy`, `terms-of-use`, `privacy-policy`, `contact-success`)
3. `global.css` duplicate type definitions updated to use token variables

### HubPageTemplate.astro
- Section order: hub-intro → hub-grid → hub-cta → hub-body → hub-surfacing
- Hub cleanup script step 3: hides nav paragraph
- Hub cleanup script step 4: FAQ Q&A structuring
- `hub-body { background: transparent }` ,  prevents white box

---

## Session 9 (Chat 2): Technical SEO + AI Discoverability

### `public/robots.txt` ,  Created
- Allows Googlebot, Bingbot
- Allows AI discovery bots: OAI-SearchBot, ChatGPT-User, Claude-SearchBot, PerplexityBot
- Allows AI training bots: GPTBot, Google-Extended, ClaudeBot
- Blocks: /wp-admin/, /admin/, /temp/, /drafts/, /search?, /checkout/
- References sitemap-index.xml

### `public/llms.txt` ,  Created
- Machine-readable site brief for LLM crawlers
- Covers: methodology, key frameworks, entity definitions, reference URLs

### `public/_redirects` (Session 3)
- `/sitemap.xml → /sitemap-index.xml 301!`
- Astro generates `sitemap-index.xml`, not `sitemap.xml`

### DMARC Report (reviewed)
- Google daily aggregate report ,  clean bill of health
- 1 email sent, DKIM pass, SPF pass, disposition: none
- No spoofing detected

---

## Known Markdown Artifacts (all handled client-side in DetailPageTemplate)

| Artifact | Transform |
|----------|-----------|
| `{#anchor-id}` in headings | T1: strip text |
| `[NO VISIBLE IMAGE ,  metadata only: fig_N]` | T2: replace with `<figure>` |
| `## Appendix: ...` sections | T3: hide + siblings |
| `(Autonomy Bridge proprietary analysis, 2026)` | T4: wrap in `<cite>` |
| Duplicate `# Title` H1 at body top | T5: hide |
| `:::directive ... :::` blocks | T6: block-track + hide |
| FAQ `**Q?** answer` paragraphs | T7: restructure |
| Hub back-link paragraphs | T8: hide |
| JSON-LD `<pre>` blocks | T9: hide |

---

## Key File Paths

- `src/components/DetailPageTemplate.astro` ,  framework/insight/use-case/case-study detail layout
- `src/components/HubPageTemplate.astro` ,  hub page layout
- `src/components/Breadcrumbs.astro`
- `src/components/ContentCard.astro`
- `src/styles/tokens.css`
- `src/styles/prose.css`
- `src/styles/global.css`
- `public/_redirects`
- `public/robots.txt`
- `public/llms.txt`
- `astro.config.mjs`
