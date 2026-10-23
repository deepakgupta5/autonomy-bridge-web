# Step 6 QA status

Candidate source: `codex/step-5-approved-copy` at `e59b54e`, plus the Step 6 HTML sitemap and verifier corrections on `codex/step-6-qa`. This is a local review branch. No merge, deployment, sitemap submission or real enquiry has occurred.

## Verified locally

- Node 20 static build: 163 pages.
- Compared with an independently built 157-page baseline from `0285946`: no baseline route lost and no existing canonical changed under the approved apex normalization.
- All 147 Research inventory routes are present and reachable from Research. Research titles, content and source templates were left unchanged by this Step 6 correction.
- HTML sitemap now lists the three new audience pages: 161 destinations. XML sitemap has 159 entries, including all 147 Research routes. The three legal pages and contact confirmation remain outside the XML sitemap under the existing exclusion policy.
- All local pages emit `noindex,nofollow`. Canonical, metadata, Research breadcrumbs, fragment targets and static internal links pass the baseline verifier. Its eight registered historical broken destinations persist, with no new destinations or referrers.
- Offline form fixtures pass for validation, honeypot, receipt confirmation, ambiguous responses, disabled transport and network errors. They make no real submission.
- A separate local production-mode build, with the approved target ID and context supplied only to the build process, also produced 163 pages. The release-candidate verifier passed with no route, canonical, sitemap or indexing errors. This was a simulation in a disposable worktree, not a deployable release artifact: its publication and Research revision dates are still the prefilled October 19 and October 20 values.
- Final branch visual regression completed locally from `f87806c` at 1423, 400 and 320 CSS px for Home, Startups, Nonprofits, Sales Leadership, Contact, About and Privacy Policy. No layout defect or page-level horizontal overflow was found. The mobile menu, three audience CTAs and editable Contact preselection passed. Loopback-only Contact fixtures covered validation, pending, rejected, ambiguous and confirmed-success UI without a real enquiry. The HTML sitemap and Research family samples passed visual review at 1423 and 320 px. See [`visual-review/REPORT.md`](visual-review/REPORT.md) and its fresh screenshots. The build remained `noindex,nofollow` on all 163 HTML pages.

## Open before Step 6 can be called complete

- Repeat the passing production-mode check against the actual final release artifact after setting its approved publication and Research revision dates. The current local review build is deliberately noindex.
- Live Netlify form acceptance, notification delivery, storage, mailbox and retention checks. The owner deferred Netlify account verification until after go-live; offline fixtures do not establish delivery. Do not send a real enquiry without explicit authorization.
- Decide the fate of old service paths `/commercial-leadership`, `/ai-consulting` and `/advisory`. They currently remain indexable in a production-mode build and retain superseded positioning. Preserve Research routes while making this decision.
- The eight historical broken destinations remain accepted exceptions, not repaired links.

The existing Research pages `/case-studies`, `/use-cases`, `/market-overview/platform-categories`, `/market-overview/deployment-economics`, `/market-overview/vendor-landscape` and `/market-overview/operator-domains` each emit a hero H1 and an embedded content H1. This was present before Step 5 and needs a scoped semantic correction or explicit acceptance during final visual and accessibility QA.

SEO and AI discovery/GEO review belongs to Step 6A after Step 6. The stale `public/llms.txt` was observed but not changed in this branch.
