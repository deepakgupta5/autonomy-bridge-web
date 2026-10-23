# Step 6 QA status

Candidate source: `codex/step-5-approved-copy` at `e59b54e`, plus the Step 6 HTML sitemap and verifier corrections on `codex/step-6-qa`. This is a local review branch. No merge, deployment, sitemap submission or real enquiry has occurred.

## Verified locally

- Node 20 static build: 163 pages.
- Compared with an independently built 157-page baseline from `0285946`: no baseline route lost and no existing canonical changed under the approved apex normalization.
- All 147 Research inventory routes are present and reachable from Research. Research titles, content and source templates were left unchanged by this Step 6 correction.
- HTML sitemap now lists the three new audience pages: 161 destinations. XML sitemap has 159 entries, including all 147 Research routes. The three legal pages and contact confirmation remain outside the XML sitemap under the existing exclusion policy.
- All local pages emit `noindex,nofollow`. Canonical, metadata, Research breadcrumbs, fragment targets and static internal links pass the baseline verifier. Its eight registered historical broken destinations persist, with no new destinations or referrers.
- Offline form fixtures pass for validation, honeypot, receipt confirmation, ambiguous responses, disabled transport and network errors. They make no real submission.

## Open before Step 6 can be called complete

- Final branch visual regression at desktop and mobile widths. The Step 5 screenshots are from an earlier commit. The current runtime has no browser executable; Astro dev failed with `uv_interface_addresses`, and the separate browser surface could not reach the local static server. These are tool limits, not visual passes.
- Production-mode indexing and canonical checks against the actual final release artifact. The checked build is deliberately local and noindex. Set actual publication and research revision dates for the approved release.
- Live Netlify form acceptance, notification delivery, storage, mailbox and retention checks. The owner deferred Netlify account verification until after go-live; offline fixtures do not establish delivery. Do not send a real enquiry without explicit authorization.
- Decide the fate of old service paths `/commercial-leadership`, `/ai-consulting` and `/advisory`. They currently remain indexable in a production-mode build and retain superseded positioning. Preserve Research routes while making this decision.
- The eight historical broken destinations remain accepted exceptions, not repaired links.

The existing Research pages `/case-studies`, `/use-cases`, `/market-overview/platform-categories`, `/market-overview/deployment-economics`, `/market-overview/vendor-landscape` and `/market-overview/operator-domains` each emit a hero H1 and an embedded content H1. This was present before Step 5 and needs a scoped semantic correction or explicit acceptance during final visual and accessibility QA.

SEO and AI discovery/GEO review belongs to Step 6A after Step 6. The stale `public/llms.txt` was observed but not changed in this branch.
