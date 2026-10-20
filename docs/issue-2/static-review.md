# Issue 2: static research rendering

Stacked review branch `codex/issue-2-static-research`, based on canonical draft PR #3 (`f79715f`). Review the second PR against `codex/issue-2-canonical-directory` to isolate rendering changes. Neither PR is authorized for automatic merge or deployment.

## Implementation

`DetailPageTemplate.astro` now renders its slot through a server-only parse5 transform. The duplicate body H1 is removed and its existing ID moves to the hero. Initial HTML contains semantic figures using the existing diagram map, alt text, captions and dimensions. FAQ structure, proprietary-citation styling, internal metadata cleanup and unlinked editorial citation-marker handling are generated at build time. Linked sources remain intact. The 230-line client transformation is removed.

The Markdown directive filter now consumes complete blocks, including list breakouts and closing markers parsed inside list items. Existing internal appendices remain excluded; no private source material is exposed. Missing figure mappings and unexpected additional H1s fail the build.

Deliberate differences from the previous browser presentation:

- Nineteen existing mapped figures now appear in HTML. The old figure regex missed underscore-suffixed/zero-padded filenames and silently hid these placeholders. No new imagery or captions were invented.
- Existing public reference/related-link paragraphs are retained rather than hidden. Only an exact duplicated single hub-return link is removed; its destination remains above the article body.
- Internal directive list fragments previously leaked by the Markdown filter are removed. Body wording outside these explicitly nonvisual blocks is unchanged.

## Evidence

Fresh final build: `/private/tmp/ab-issue2-static-final`; loopback review: `http://127.0.0.1:4325/frameworks/robotics-roi-model` (server must be running). To restart using Astro from this checkout, run `npm run preview -- --host 127.0.0.1 --port 4325 --outDir /private/tmp/ab-issue2-static-final` with Node 20.

- `static-routes.json`: 160 pages, all 147 research routes reachable through hubs, 158 HTML sitemap destinations, 156 XML entries; redirects, dates and titles preserved; no new broken targets/referrers or fragment failures. Existing eight broken destinations remain recorded.
- `static-proof.json`: all 18 approved proof paragraphs exactly match controlling extracted v2 JSON in source and built pages. Analytics remains off; form state preserved; no enquiry submitted.
- `static-host.json`: all generated canonical/OG/site-owned schema URLs and sitemap signals pass. First PR's `canonical-host.json` records all 156 live XML destinations returning direct 200; production remains old content.
- `static-html.json`: all 55 affected detail pages have one H1, no placeholders/directive metadata, preserved IDs/reference destinations, 19 valid mapped images with matching alt/captions, and identical full JSON-LD to the canonical-PR baseline.
- `browser.json`: normalized body-text parity across all 55 pages. Normalization excludes only duplicate H1s, figures/captions, restored reference paragraphs and leaked directive lists. Twelve responsive checks across four families at 1440, 768 and 390 pixels test one visible H1, overflow and visible keyboard focus. Screenshots are local in `../output/playwright/issue2-*.png`.

Reproduce static checks:

```sh
SITE_ID=3df07dc5-6950-4241-98eb-cf95df3d271d CONTEXT=production npm run build -- --outDir /private/tmp/ab-issue2-static-new
node scripts/audit-research-static.mjs /private/tmp/ab-issue2-static-new /private/tmp/ab-issue2-canonical /private/tmp/static.json
```

Run the route/proof/host commands in canonical-review.md with the new output directory. Browser parity runner expects original main at loopback 4324, final candidate at 4325 and Playwright CLI session `abissue2`; use `node scripts/run-issue2-browser.mjs`.

Additional checks: the new renderer passes a focused TypeScript no-emit check. Both pre-fix artifacts correctly fail the new host/H1 assertions (`negative-controls.json`). The final keyboard check opens the mobile menu with Enter and tabs to a visibly focused service link; the mapped figure loads at mobile width (`keyboard-figure.json`). A first final browser comparison was invalidated by a concurrent spot-check navigating the shared tab; the full 55-page comparison was rerun successfully in a dedicated tab.

Netlify reports a failed Deploy Preview for PR #3. The existing production-context guard rejects deploy-preview contexts by design; local review is the available preview. No safeguard was relaxed to make that check green.

## Limits and owner decisions

See `owner-decisions.md`: ROI equation/threshold accuracy, public source attribution and training-bot preferences remain owner decisions. Search Console has no property available in the current signed-in account; Bing requires sign-in. No indexation/performance claims. No new login, DNS, analytics, crawler-policy, form transport or provider change.

Dependency installation reports pre-existing Node 20 engine incompatibility warnings in the Netlify dependency tree and 21 npm audit vulnerabilities. This PR promotes the already-installed parse5 7.3.0 to a direct dependency without changing its resolved version or the Netlify dependency tree; dependency remediation is outside this scoped rendering change.
