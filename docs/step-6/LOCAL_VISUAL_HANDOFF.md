# Step 6 local visual QA handoff

The cloud runtime completed the route, canonical, sitemap and offline form checks, but could not perform final-layout browser QA. The Astro dev server failed in that runtime with `uv_interface_addresses`, and its separate browser could not reach the static server. This is a tooling failure, not a visual result.

## Work from the shared repository

1. Fetch and check out `codex/step-6-qa`. Confirm the current commit and a clean worktree. This branch contains the Step 5 copy at `e59b54e` plus the audience-page HTML sitemap and verifier correction. Do not use screenshots from an earlier Step 5 commit as evidence for this branch.
2. Use Node 20. Run `npm ci`, `npm run build`, then `npm run dev -- --host 127.0.0.1`. Keep the local build's `noindex,nofollow` policy. Do not deploy or publish a preview.
3. Inspect Home, Startups, Nonprofits, Sales Leadership, Contact, About and Privacy Policy in a real browser at 1423, 400 and 320 CSS px. Check typography, wrapping, clipping, horizontal overflow, navigation, section hierarchy, CTAs, footer and any layout issue caused by the latest copy. Compare with the 22 earlier screenshots in `docs/step-5/visual-review/` only as a reference, not as a substitute for fresh screenshots.
4. Follow each audience CTA to Contact. Confirm the optional audience is preselected and remains editable. Check required-field validation, pending, error, unknown-outcome and confirmed-success UI with intercepted or loopback-only fixtures. Never submit a real enquiry or trigger a notification.
5. Inspect the HTML sitemap's new audience links and one representative page from each Research family. Preserve all 147 Research routes and content. Note the six pre-existing duplicate-H1 Research routes listed in `docs/step-6/QA_STATUS.md`; distinguish a pre-existing semantic issue from a new visual regression.
6. Fix any actual layout defect in the shared visual system with a focused change. Rebuild and repeat the affected widths. Commit a report and fresh screenshots under `docs/step-6/visual-review/`, with tested commit, widths, route-by-route results, fixture conditions, changes and remaining issues. Update `docs/step-6/QA_STATUS.md` to reflect only checks actually completed. Push the branch for review.

Do not merge, deploy, submit sitemaps or send real form notifications. Keep SEO and AI GEO work for Step 6A. Production-form acceptance, mailbox delivery and account-level Netlify checks remain outside this visual task under the owner's instruction to defer them until after go-live.
