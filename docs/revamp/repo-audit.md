# Repo Audit (Post Hard-Clean Baseline)

Date: 2026-03-16  
Branch: `codex/revamp-restart`  
Audit scope: current local repo state after approved hard clean

## 1) High-Level State
- Repo is intentionally reset to a minimal Astro/tooling baseline.
- Previous site implementation folders (`src/`, `public/`, prior docs/artifacts) were removed.
- Control-pack docs are being rebuilt under `docs/revamp/`.

## 2) Current Files Present (Top-Level Essentials)
- `astro.config.mjs`
- `netlify.toml`
- `package.json`
- `package-lock.json`
- `tsconfig.json`
- `docs/revamp/*` (control-pack files created so far)
- `node_modules/` (dependency install present locally)

## 3) Configuration Snapshot

### Astro config
From `astro.config.mjs`:
- `site` is set to `https://www.autonomybridge.com`
- `trailingSlash` is set to `never`
- `@astrojs/sitemap` integration enabled

### Netlify config
From `netlify.toml`:
- Build command: `npm run build`
- Publish directory: `dist`
- Node version: `20`

### Package config
From `package.json`:
- Astro v4 with sitemap integration
- Scripts: `dev`, `start`, `build`, `preview`, `astro`

## 4) Build Baseline
Validation run:
- Command: `npm run build`
- Result: success with warnings
  - warning: missing `src/pages`
  - warning: no pages found for sitemap
  - output built `0` pages

Interpretation:
- Tooling pipeline is healthy.
- Website implementation is intentionally absent and must be rebuilt block-by-block.

## 5) Routing and Content Baseline
- No runtime route files exist (no `src/pages` tree yet).
- No content collections exist (no `src/content` tree yet).
- No reusable components currently present.
- No schema utilities/related-content utilities currently present.
- No image/diagram assets currently present in `public`.

## 6) Drift Risk Assessment (Current)
- Risk 1: Reintroducing legacy slugs/content during re-ingestion.
  - Mitigation: locked canonical path validation + centralized legacy redirect map.
- Risk 2: Partial rebuild causing temporary route gaps.
  - Mitigation: block-gated implementation and full post-block audits.
- Risk 3: Glossary drift from old split files.
  - Mitigation: regenerate glossary only from `Content/Glossary.md`.
- Risk 4: Canonical/sitemap mismatch.
  - Mitigation: locked no-trailing-slash canonical policy enforced in schema + metadata layer.

## 7) Known Constraints and Directives Confirmed
- Execute one file at a time.
- Audit one file at a time.
- Perform full line-by-line re-audit after each block.
- No public `/research`.
- Use latest `Content.zip` as content source-of-truth.
- Keep remote edits frozen during local rebuild.

## 8) Readiness for Block 02+ Implementation
Status: ready.

Reason:
- Baseline reset is complete.
- Core tooling is intact.
- Control-pack foundation exists and can drive deterministic rebuild.
