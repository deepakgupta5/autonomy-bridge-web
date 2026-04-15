# Autonomy Bridge Website — Lessons Learned

**Project:** autonomybridge.com (Astro 4.x, Netlify)
**GitHub:** deepakgupta5/autonomy-bridge-web
**Sessions:** 4+ (ongoing)

---

## What This Project Does
Static marketing site for Autonomy Bridge (warehouse automation advisory). Built on Astro with content collections, deployed to Netlify. Serves as the primary credibility/inbound channel for the outbound campaign.

---

## Architecture Decisions

### Framework: Astro (Static)
- **Why it was right:** Zero JS by default = fast load times, critical for cold outbound targets clicking a link for the first time. No CMS overhead.
- **Watch out for:** Content collections require strict frontmatter schema. Astro throws build errors (not warnings) on schema mismatches — a missing field in one `.md` file breaks the entire build.

### Deployment: Netlify
- Build command: `npm run build` → output `dist/`
- Environment: Node 18+
- Auto-deploy on push to `main`
- **Watch out for:** `node_modules/` must be in `.gitignore`. Several early sessions had accidental commits of node_modules.

---

## Brand System (Lock These — Don't Change Without Reason)

| Token | Value | Usage |
|---|---|---|
| `--font-sans` | Inter | All body copy, UI |
| `--font-mono` | IBM Plex Mono | Data, code, stats |
| `--color-border-accent` | `#d97706` | Amber top-border on cards |
| `--color-bg-accent` | `#fef3c7` | Amber background tint |
| `--color-cta-bg` | `#0f172a` | Dark CTA banner |
| `--color-bg-page` | `#f8fafc` | Page background |

**Rules:**
- H1 + sans tagline on every detail page (no exceptions)
- Amber top-border cards on all hub grids
- Dark CTA banner "Book 15-min scoping call" → `/contact` on every detail page

---

## Content Structure Rules

### Page Pattern (established Sessions 1–3)
1. Hero: H1 + one-line tagline + dark CTA
2. Problem statement (2–3 sentences max)
3. How it works (3-step or 4-step process)
4. Social proof / case study reference
5. Dark CTA banner (repeat)

### Navigation
- Do not add top-nav items without updating mobile nav in the same PR
- Breadcrumbs required on all sub-pages

---

## Lessons by Session

### Sessions 1–3: Core Pages Rebuilt
- Rebuilt from scratch: Homepage, Advisory, About, Bespoke Research, Methodology
- **Lesson:** Never edit Astro layout files without running `npm run dev` first — layout changes cascade to every page

### SEO & AI Citation (ongoing)
- See `SEO & AI Citation/` folder for AI visibility frameworks
- **Lesson:** Static sites with good schema.org markup outperform dynamic sites in AI citation. Prioritise `Organization`, `Service`, and `FAQPage` schema before any other SEO work.

### April 2026: Glossary SEO pass (Incidents #042, #043)
GSC flagged `/glossary/labor-turnover-rate` as "Crawled, currently not indexed" and surfaced multiple glossary pages with the same issue. Root causes:

1. **Template double-rendered the definition.** `GlossaryTermTemplate.astro` rendered frontmatter `definition` inside `<p class="gt-definition">`, and every glossary markdown body opened with the same sentence. 76 of 77 pages shipped with a visible duplicate paragraph. Google's thin-content heuristic triggered.
   Fix: remove the redundant `{definition && <p>...</p>}` render from the template. One-line change, propagates to every sibling page. Frontmatter field retained because it still feeds `DefinedTerm` JSON-LD + SEO meta description.

2. **Related-terms rendered as raw slugs.** Markdown bodies had `[removable-labor-share](/glossary/removable-labor-share)` as the anchor syntax, so the visible label was the slug. Weak anchor text starves the sibling page of link equity and signals to Google that the source page has weak outbound context.
   Fix: one-shot Python sweep (`scripts/fix_glossary_content.py`) that builds a slug-to-title map from all 77 files and rewrites `[slug](/glossary/slug)` to `[Title](/glossary/slug)`. 186 anchors rewrote in one pass.

3. **Em-dashes and en-dashes pervasive in content** (Rule 38 violation). Sweep replaces em-dash with ` - ` (space hyphen space) and en-dash with `-` (tight hyphen). 388 + 53 replacements across 77 files.

**Gotcha:** first sweep implementation used whitespace-collapsing regex (`re.sub(r" {2,}-", " -", text)`) intended to clean up consecutive-em-dash artifacts. That regex matched legitimate YAML list indentation (`  - item`) in frontmatter and collapsed it to ` - item`, breaking `hub.md` YAML parse and killing the Astro build. Revert + rewrite sweep as pure `str.replace()` on single chars only. Any whitespace-aware regex on Markdown content files MUST scope itself to the body only, after frontmatter is split off.

**Outcome:** local build verified 157 pages, 6.8 s, no errors. Visible-body checks pass: definition appears once, related-terms render as "Removable Labor Share" etc., no em/en-dashes in rendered HTML, `DefinedTerm` schema still emitted. Deployed via Netlify auto-deploy. GSC "Validate fix" pending user-side click.

---

## Common Errors and Fixes

| Error | Cause | Fix |
|---|---|---|
| Build fails with "frontmatter validation error" | Missing required field in a content collection `.md` file | Check `src/content/config.ts` schema, add missing field to the offending file |
| Netlify deploy succeeds but page returns 404 | Page file named differently from the route | Astro file-based routing — `pages/foo.astro` → `/foo`, not `/foo/` |
| Styles not applying after token change | Old value cached in browser | Hard refresh (Cmd+Shift+R) or clear Netlify CDN cache |
| Content collection query returns empty | Wrong collection name in `getCollection()` | Must match exactly the folder name under `src/content/` |

---

## Phase 2 / Next Sessions

### Priorities
1. Blog/Insights content collection — needed for AI citation and SEO
2. Case study pages (full detail, not just references)
3. Structured data (`Organization`, `Service`, `FAQPage` schema) on all key pages
4. Email capture form on contact page (currently just a Calendly link)

### Don't Do
- Don't add a CMS until there are 20+ content pages to manage
- Don't switch from Astro to Next.js — static is the right call for this site
- Don't add client-side JS features without measuring the performance hit first

---

*Last updated: April 15, 2026*
