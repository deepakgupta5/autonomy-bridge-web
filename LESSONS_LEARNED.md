# Autonomy Bridge Website, Lessons Learned

**Project:** autonomybridge.com (Astro 4.x, Netlify)
**GitHub:** deepakgupta5/autonomy-bridge-web (git submodule of deepakgupta5/Claude-Code)
**Universal architecture rules:** see `~/.claude/LEARNINGS/website_architecture.md` for brand tokens, stack specifics, SEO/AI discoverability rules, and common-error table. This file holds only project-specific narrative and phase planning.

---

## What This Project Does
Static marketing site for Autonomy Bridge (warehouse automation advisory). Built on Astro with content collections, deployed to Netlify. Serves as the primary credibility and inbound channel for the outbound campaign.

---

## Session Narrative

### Sessions 1 to 3: Core Pages Rebuilt
Rebuilt from scratch: Homepage, Advisory, About, Bespoke Research, Methodology. Core lesson: never edit Astro layout files without running `npm run dev` first, layout changes cascade to every page.

### April 2026: Glossary SEO Pass (Incidents #042 + #043)
GSC flagged `/glossary/labor-turnover-rate` as "Crawled, currently not indexed" plus multiple sibling pages. Three root causes:

1. **Template double-rendered the definition.** `GlossaryTermTemplate.astro` rendered frontmatter `definition` inside `<p class="gt-definition">` and every markdown body opened with the same sentence. 76 of 77 pages shipped with a visible duplicate paragraph, triggering Google's thin-content heuristic.
   Fix: remove the redundant `{definition && <p>...</p>}` render from the template. Single-line deletion, propagates to every sibling page. Frontmatter `definition` retained because it still feeds `DefinedTerm` JSON-LD and SEO meta description.

2. **Related-terms rendered as raw slugs.** Markdown had `[removable-labor-share](/glossary/removable-labor-share)` as anchor syntax, so the visible label was the slug. Weak anchor text starves sibling pages of link equity and signals weak outbound context to Google.
   Fix: one-shot Python sweep (`scripts/fix_glossary_content.py`) built a slug-to-title map from all 77 files and rewrote `[slug](/glossary/slug)` to `[Title](/glossary/slug)`. 186 anchors rewritten in one pass.

3. **Em-dashes and en-dashes pervasive in content** (Rule 38 violation). Sweep replaces em-dash with ` - ` (space hyphen space) and en-dash with `-` (tight hyphen). 388 + 53 replacements across 77 files.

**Gotcha (Incident #043):** first sweep used a whitespace-collapsing regex (`re.sub(r" {2,}-", " -", text)`) intended to clean consecutive-em-dash artifacts. That regex matched legitimate YAML list indentation (`  - item`) in frontmatter and collapsed it to ` - item`, breaking `hub.md` YAML parse and killing the Astro build. Revert + rewrite sweep as pure `str.replace()` on single chars only. Any whitespace-aware regex on Markdown content files MUST scope itself to the body only, after frontmatter is split off. This lesson is also captured in `~/.claude/LEARNINGS/website_architecture.md`.

**Outcome:** local build 157 pages / 6.8 s, no errors. Visible-body checks: definition appears once, related-terms render as "Removable Labor Share" etc., no em/en-dashes in rendered HTML, `DefinedTerm` schema still emitted. Deployed via Netlify auto-deploy. GSC "Validate fix" pending user-side click.

---

## Phase 2 / Next Sessions

### Priorities
1. Blog/Insights content collection, needed for AI citation and SEO
2. Case study pages (full detail, not just references)
3. Structured data (`Organization`, `Service`, `FAQPage` schema) on all key pages
4. Email capture form on contact page (currently just a Calendly link)

### Don't Do
- Don't add a CMS until there are 20+ content pages to manage
- Don't switch from Astro to Next.js, static is the right call for this site
- Don't add client-side JS features without measuring the performance hit first

---

*Last updated: April 15, 2026*
