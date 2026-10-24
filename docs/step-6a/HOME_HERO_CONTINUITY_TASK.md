# Home hero visual-continuity task

**Branch:** `codex/step-6a-seo-geo`  
**Base source:** `58c1a3a7c0fc86e3ee3abedff6d2c8544cae62bf`

The owner wants the new homepage to retain the older site's desktop hero composition. The live homepage uses a split hero: headline on the left, introductory copy and primary CTA on the right. The current approved-copy homepage stacks the headline, intro and CTA in one column.

## Change

Adjust only the homepage hero layout in `src/styles/approved-pages.css` (or the narrowest existing page stylesheet):

- At desktop widths, use two columns consistent with the older homepage: approved H1 on the left; approved introductory paragraph and CTA on the right, vertically aligned as appropriate.
- Keep the current approved wording, sequence, links, CTA behavior and H1. Do not edit approved-copy source files or reorder page sections.
- At mobile widths, stack the H1, paragraph and CTA in reading order. Use the existing responsive breakpoint unless visual review shows a specific reason to change it.
- Reuse the existing Inter typography, colors, spacing scale, border treatment, button, header and footer. Do not change font files, global tokens, other pages, Research routes or content.
- Keep the yellow preview notice confined to local-preview mode. Do not let it enter the production artifact.

## Review and evidence

Run the local noindex build and inspect the homepage at 1423, 1024, 400 and 320 CSS px. Compare the desktop hero against the current live homepage at https://autonomybridge.com/. Check headline/lead balance, spacing, CTA visibility, mobile reading order and horizontal overflow. Save fresh screenshots and a short result report with the exact source commit. Run the relevant route and visual checks; preserve the production build guard and existing Step 7 documentation.

Push the scoped change and evidence to this branch for repository review. Do not merge, deploy, change Netlify settings, submit a sitemap, enable analytics or send any form submission.
