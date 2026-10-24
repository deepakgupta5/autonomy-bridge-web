# Step 6 QA status

The integrated local candidate is `codex/step-6-final-candidate`, with combined source commit `9a8fada5fefc820ed51f9e8a2af0069a83c26b49`. See [FINAL_CANDIDATE.md](FINAL_CANDIDATE.md) for its checks and release-date inventory. No merge, deployment, sitemap submission or real enquiry has occurred.

## Verified locally

- Node 20 build: 163 pages. Independent-baseline verifier against `0285946a6a500f9207a9c466c7de11a4cffb22a8` passed with `--canonical-apex --research-review`: 147 Research routes, 158 HTML sitemap destinations, 156 XML entries, no lost baseline routes or changed existing canonicals, and no new broken links. The eight registered historical broken destinations remain accepted exceptions.
- All six affected Research pages have one H1. The two hub opening H2s are hidden by scoped CSS before hydration. The [accepted heading report at `d966cbf`](https://github.com/deepakgupta5/autonomy-bridge-web/blob/d966cbf77b0d6c1bc524ca7697600af8419141bb/docs/step-6/research-heading-qa/REPORT.md) tested heading source `b66124a`, not this combined commit.
- The three legacy paths are neutral audience bridges, absent from both sitemaps and `noindex,nofollow` in this local build. The [accepted bridge report at `41ddedd`](https://github.com/deepakgupta5/autonomy-bridge-web/blob/41ddedd37f5aff51bacba4b2e13f925fd93e73bc/docs/step-6/legacy-bridge-qa/REPORT.md) tested source `91357ca`, not this combined commit.
- A focused integration browser pass from the combined source checked `/case-studies`, `/use-cases` and `/commercial-leadership` at 1423 and 320 CSS px. Both hubs showed one H1, hid only the redundant first body H2, and had no horizontal overflow. The bridge remained readable with the intended audience and Contact links. Screenshots are linked in [FINAL_CANDIDATE.md](FINAL_CANDIDATE.md).
- Earlier [seven-page visual and offline Contact fixture review](visual-review/REPORT.md) passed at 1423, 400 and 320 CSS px without a real enquiry. Those results belong to their recorded earlier source, not this combined commit.

## Open before publication

- Set the actual approved publication and Research revision dates in `config/deployment-policy.mjs` on the publication day, rebuild the final release artifact, and rerun the release checks. The October 19 and October 20 values are prefilled, not an approved future release date. The current candidate is local and `noindex,nofollow`.
- Live Netlify form acceptance, notification delivery, storage, mailbox and retention checks remain deferred under the owner's prior instruction. Offline fixtures do not establish delivery. A real enquiry requires separate authorization.
- The eight historical broken destinations remain accepted exceptions.

SEO and AI discovery/GEO review belongs to Step 6A after Step 6. The stale `public/llms.txt` remains unchanged.
