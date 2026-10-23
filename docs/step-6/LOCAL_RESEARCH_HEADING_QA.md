# Local Codex task: Research heading visual check

Work on `codex/step-6-research-headings`. Read `docs/step-6/RESEARCH_HEADING_FIX.md` and confirm the branch head and clean working tree first. This branch changes only the duplicate heading semantics on six Research routes; do not combine it with the separate legacy-bridge work.

Use Node 20, `npm ci`, `npm run build`, and a local loopback browser. Inspect these routes at **1423 and 320 CSS px**:

- `/case-studies`
- `/use-cases`
- `/market-overview/platform-categories`
- `/market-overview/deployment-economics`
- `/market-overview/vendor-landscape`
- `/market-overview/operator-domains`

For each route, confirm one rendered H1, intact opening title and text, the same anchor ID, readable hierarchy, no clipping or horizontal overflow, and working internal links. For the two hubs, inspect the page both before and after hydration: their existing script should hide the redundant first H2 without a flash or missing later headings. For the four Market Overview pages, confirm that the first body H2 retains the former visual size and weight. Compare with the earlier `docs/step-6/visual-review/screenshots/` captures where available, especially `market-overview--platform-categories-1423.jpg` and `-320.jpg`.

If a visual regression appears, make a focused fix on this branch and rerun the affected routes and widths. Record the tested commit, findings, changes, and any remaining issue in `docs/step-6/research-heading-qa/REPORT.md`; add fresh screenshots for the six routes at both widths. Rerun the build and the independent-baseline route verifier. Push the result to this branch for review.

Do not merge, deploy, submit a sitemap, send a real form notification, change Research wording, or start Step 6A.
