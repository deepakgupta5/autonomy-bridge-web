# Step 6 branch review and consolidation handoff

## Review result

Research heading QA at `d966cbf77b0d6c1bc524ca7697600af8419141bb` and legacy bridge QA at `41ddedd37f5aff51bacba4b2e13f925fd93e73bc` are accepted for their tested scopes. Reports and representative screenshots were reviewed. The heading CSS fix at `b66124af39996db7e1a19638136c292bb0acb49b` correctly hides only the two known redundant opening H2 titles before hydration. No further layout change is requested.

- Heading evidence: https://github.com/deepakgupta5/autonomy-bridge-web/blob/d966cbf77b0d6c1bc524ca7697600af8419141bb/docs/step-6/research-heading-qa/REPORT.md
- Bridge evidence: https://github.com/deepakgupta5/autonomy-bridge-web/blob/41ddedd37f5aff51bacba4b2e13f925fd93e73bc/docs/step-6/legacy-bridge-qa/REPORT.md

## Local Codex next task

Create `codex/step-6-final-candidate` from `41ddedd37f5aff51bacba4b2e13f925fd93e73bc`. That source already includes the six Markdown heading corrections and the Market Overview typography rule. Carry over only the additional `HubPageTemplate.astro` change from `b66124af39996db7e1a19638136c292bb0acb49b`, for example by cherry-picking that scoped code commit. Preserve existing work if the remote has advanced.

Run the Node 20 build and independent-baseline route verifier with `--canonical-apex --research-review`. Expect 163 built pages, 147 Research routes, 158 HTML sitemap destinations and 156 XML entries. Confirm the combined source has one H1 on the six affected Research pages, the pre-hydration CSS on the two hubs, the three neutral bridge pages, bridge sitemap exclusion and local noindex. The detailed visual checks already passed; restrict a browser integration check to the two hub titles and one bridge at desktop/mobile widths.

Record the exact combined source commit and results in `docs/step-6/FINAL_CANDIDATE.md`. Update `docs/step-6/QA_STATUS.md` to close the heading and legacy-route items and replace its old sitemap counts with 158/156. Link the accepted reports at their exact commits rather than claiming they tested a later source commit.

The October 19 and October 20 dates in deployment policy are prefilled values, not an approved future release date. Identify all public date outputs and document the exact fields that must be set on the approved publication day. Keep that release action open rather than assigning an invented launch date.

Push the candidate for review. Do not merge into the production branch, deploy, submit sitemaps, send a real enquiry, or start Step 6A. Netlify account and live delivery checks remain deferred under the owner's prior instruction.
