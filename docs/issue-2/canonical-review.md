# Issue 2: canonical host and neutral directory

Baseline: main `59b9f7b8b307d3cb558255353cf44008ab8373d4`. This is a review candidate, not a production deployment.

## URL producer inventory

- Astro `site` controls XML entries/index. Its URL parsing fallback now uses the same apex origin.
- `src/utils/schema.ts` controls canonical metadata, Open Graph and site-owned JSON-LD identities. All use apex.
- CopyPage's Methodology-only canonical override was removed; it uses the shared builder.
- `public/robots.txt` sitemap line and `public/llms.txt` directory links now use apex.
- Markdown frontmatter, historical metadata snapshots and source appendices contain legacy www references. They are not active canonical producers; no blanket source replacement was made. External source links were not changed.
- Redirect registry, route paths, article dates, robots permissions, form transport and analytics configuration are unchanged.

Netlify primary domain was read as https://autonomybridge.com on site `autonomybridgenetlify` (`3df07dc5-6950-4241-98eb-cf95df3d271d`). Live www redirects to apex. See canonical-host.json for every XML destination and the live-versus-candidate signals. Current live HTML still emits old www canonicals; candidate HTML emits apex. No candidate is deployed.

## Verification

Fresh build: `/private/tmp/ab-issue2-canonical`. All 160 HTML canonical/OG paths and site-owned JSON-LD references checked; 156 XML destinations plus sitemap index and robots use apex. Built llms.txt byte-matches the reviewed source and contains no removed metrics/formula. All 147 research routes remain reachable; 158 HTML sitemap destinations, original redirects, dates and 18 approved proof paragraphs pass. Only the existing eight broken destinations remain allowed, with no new referrers.

The original ZIP is no longer at its Downloads path. Proof verification uses the previously extracted controlling v2 website_copy.json, validates version 2 and records its SHA256 in canonical-proof.json; source narratives are not committed. Python's local CA store initially failed live requests; checks were rerun with system curl, retaining TLS verification.

Reproduce (Node 20):

```sh
SITE_ID=3df07dc5-6950-4241-98eb-cf95df3d271d CONTEXT=production npm run build -- --outDir /private/tmp/ab-issue2-canonical-fresh
AB_AUDIT_DIST=/private/tmp/ab-issue2-canonical-fresh AB_AUDIT_REPORT=/private/tmp/routes.json python3 scripts/verify-preview.py /private/tmp/ab-baseline/dist --release-candidate --canonical-apex
AB_AUDIT_DIST=/private/tmp/ab-issue2-canonical-fresh AB_AUDIT_REPORT=/private/tmp/proof.json python3 scripts/verify-release-content.py /private/tmp/autonomybridge-v2-source/website_copy.json --form-enabled
python3 scripts/audit-canonical-host.py /private/tmp/ab-issue2-canonical-fresh /private/tmp/host.json --live
```

No claims are made about recrawling, selected search-engine canonical, indexation or mailbox delivery. Research static rendering and owner decisions are a separate change.
