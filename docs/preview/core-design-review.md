# Core-page design rollout

The approved Home direction now covers Commercial Leadership, AI Consulting, About, Research and Contact. Services share an opening/action/context structure but separate capabilities, outcomes, engagement choices and proof according to their content. About uses an editorial biography layout. Research uses a collection directory with Methodology kept alongside existing hubs. Contact retains its form implementation and separates guidance from the form. Navy, amber, existing font families, restrained surfaces and consistent spacing carry through each page.

The compact header now applies site-wide, with active navigation in both desktop and mobile menus, including retained research route families. Research article typography/content templates were not changed. Core-page breadcrumbs align to content and use the existing muted text colour for readable contrast.

## Checks completed

- Node 20 build passed: 160 pages. Independent-baseline route audit passed: all 147 research pages retained, 158 HTML sitemap destinations, 156 XML destinations. Existing eight historical broken targets remain; no new unexpected failures.
- All 14 replacement-page text blocks and link order compared to the previous commit: unchanged. Contact copy and form logic unchanged.
- Private overlay regenerated from current markup and verified exactly against that markup plus V2 source replacements. All 18 private paragraphs served locally and absent from the public build.
- Five core pages checked at 1440, 768 and 390px: one H1, correct applicable active navigation, no horizontal overflow. Desktop and mobile screenshots saved locally. Service, About, Research and Contact compositions visually inspected; tablet service wrapping checked.
- Mobile keyboard menu opening, Tab focus and active Research state checked. Retained Market Overview and Automation Readiness pages checked at 390px: no overflow and Research active.
- Contact mobile validation: entered name preserved, required-field errors displayed, focus moved to Email, fields remain 16px. Invalid submission stopped before transport. No emails or notifications sent. Existing simulated acceptance/failure/unknown-outcome suite not rerun for presentation-only changes; real service acceptance/delivery remains unverified.
- Existing navy/secondary/muted text colours retained on white/page/surface backgrounds. Core breadcrumb text uses muted colour rather than the earlier low-contrast subtle colour. Focus uses the existing 3px amber outline. No claim of a complete accessibility audit.

## Review and safeguards

Running full-copy local preview: http://127.0.0.1:4321/ . Use the shared navigation, then the enquiry action for Contact. Full-copy screenshots are in ignored `.preview-private/core-design/`; do not upload them to the public PR. Restart instructions remain in `home-design-review.md`.

PR #1 remains draft and unmerged. No public preview or production transport is enabled. Noindex/nofollow, deployment/build restrictions, disabled analytics and production notification boundaries remain intact. Proof permissions, legal/provider/tracking facts, actual revision dates and verified receiving-service acceptance/delivery remain publication conditions.
