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

*Last updated: March 2026*
