# Consolidated production release — owner review required

This draft implements the corrected [issue #4](https://github.com/deepakgupta5/autonomy-bridge-web/issues/4), including [issue #2](https://github.com/deepakgupta5/autonomy-bridge-web/issues/2). It supersedes the email-only instructions and audit assumptions in PR #6. **Do not merge or deploy yet.** No real enquiry has been sent. Search Console/Bing access is separate and nonblocking.

## Provenance and one-deployment boundary

Branch: `codex/consolidated-release`, created from `origin/main` at `59b9f7b8b307d3cb558255353cf44008ab8373d4`.

| Review reference | Original commit | Consolidated commit | Treatment |
|---|---|---|---|
| [PR #3](https://github.com/deepakgupta5/autonomy-bridge-web/pull/3) | f79715f34630773afdc89160eae8c273ab480d97 | a4a8af4 | Apex canonical/sitemap signals; neutral llms directory |
| [PR #5](https://github.com/deepakgupta5/autonomy-bridge-web/pull/5) | 0723bff; 1558770d4f6c194c86300d9416c6b283138a71af | c66aadc; 788e6ce | Static research rendering, figures, original review URL inventory |
| [PR #6](https://github.com/deepakgupta5/autonomy-bridge-web/pull/6) | 9ecfd55b329473a6210dec3064b820c719181e37 | 01fae6c | Five-page audiences and SEO retained; email-only Contact explicitly superseded |

Immediately after integration, `git diff 9ecfd55 HEAD` was empty. The subsequent release correction commit contains all changes relative to that intended stacked tree. Earlier reports under `docs/issue-2`, `docs/issue-4` and `docs/release` remain historical evidence, not the current release checklist.

Read-only Netlify settings: site `autonomybridgenetlify`, ID `3df07dc5-6950-4241-98eb-cf95df3d271d`, primary URL `https://autonomybridge.com`, repository production branch `main`, allowed branches `[main]`, form processing not ignored. Published commit remains `59b9f7b`. The build guard rejects deploy-preview context, wrong site and private-preview flag. Do not bypass it to publish this draft. Keep #3/#5/#6 unmerged; after all decisions and explicit release approval, merge this one consolidated PR once and let the normal main-branch Netlify build run once. Do not also run a manual deploy. Actual deploy count/status must be checked afterward, not promised in advance.

## Contact and legal changes for approval

| Before (#6 / retained production source) | Proposed release |
|---|---|
| Form disabled, public mailto action | `formEnabled: true`; existing Netlify form identity, URL encoding, honeypot, random correlation reference and verified-event receipt lookup restored |
| Metadata invites email | Metadata invites contact; businesses/nonprofits and three starting points retained |
| Company always required | Required for ordinary enquiries; “This is a privacy request” checkbox makes it optional in both UI and transport validation |
| Failure and unknown messages expose direct mailbox | Confirmed preflight rejection preserves entries and permits retry; unknown outcome preserves entries, shows opaque reference when available and disables resubmission; no mailbox fallback |
| No-JS message points to email | Submit remains disabled; clearly asks to enable JavaScript/reload and says no enquiry was sent. This is intentionally not a no-JS submission implementation |
| Legal text includes direct email routes | Privacy/Terms/Cookie link to the form’s privacy-request control; disclose form fields, privacy flag, spam field, receipt reference, Netlify Forms and separate confirmation storage |
| Hidden `.well-known/security.txt` has another mailto and www canonical | HTTPS Contact URL and apex canonical; all public `mailto:` links removed, not merely Deepak’s address |

Success requires a matching accepted receipt from the server; HTTP 200 from the POST is insufficient. The code stores only `acceptedAt` under a random UUID in the receipt store, with strong consistency and explicit `us-east-2`. Receipts expire after 15 minutes and are deleted on expired lookup or by hourly cleanup. These are code settings, not evidence that a scheduled function ran in production. They do not specify or delete Netlify Forms enquiry retention. Browser session storage carries a one-time confirmed-submission marker, removed by Contact Success. Optional analytics remains off.

Evidence: [Netlify verified-submission events and signature checks](https://docs.netlify.com/build/functions/trigger-on-events/), [Forms storage](https://docs.netlify.com/manage/forms/submissions/), [notification configuration](https://docs.netlify.com/manage/forms/notifications/), [Blobs consistency and regions](https://docs.netlify.com/build/data-and-storage/netlify-blobs/). Documentation describes the platform; it does not verify this account’s mailbox provider, recipients, forwarding, access, retention, backups or delivery. The proposed notice explicitly avoids asserting those unknown facts. Owner must approve the operational notice or supply those facts before final publication approval. No new provider or notification setting was introduced.

## Research factual proposals — approve before merge

All changes below are proposed in the actual source/build, not merely recommendations in this document. Historical schema dates and article identities remain unchanged. New visible dates say **Originally published** and **Source record updated**, not “verified today.”

| Location | Before | Proposed after / units and evidence | Owner decision |
|---|---|---|---|
| ROI model, labor baseline | Worker count × wage × unspecified “labor hours required” | Wage is currency/worker-hour; hours are scheduled hours per worker in the same year. Avoid multiplying total team hours by worker count again | Approve units/interpretation |
| ROI model, robot productivity/system throughput | Tasks / cycle time; throughput capacity ambiguous | Tasks/robot-cycle divided by hours/robot-cycle = tasks/robot-hour; fleet and station capacity both tasks/hour; their minimum is system capacity | Approve sustainable-capacity interpretation |
| ROI model, fleet sizing | `Nrobots = Dpeak / Probot` | `ceil(Dpeak / Probot)`, explicitly a lower bound before availability, charging, station and congestion constraints. 120 tasks/hour ÷ 25 tasks/robot-hour → 5 whole robots | Approve lower-bound model, not a sizing guarantee |
| ROI model, utilization | `U = Tsystem / Davg` | `U = Qactual / Qcapacity` over the same period/task mix/schedule; demand loading `Davg/Tsystem` separately; inverse `Tsystem/Davg` named capacity-to-demand ratio. 600/1,000 tasks in one hour = 60%; inverse = 1.67 | Approve corrected definition; [Federal Reserve definition](https://www.federalreserve.gov/releases/g17/CapNotes.htm) supports direction, not an AMR benchmark |
| Automation Failure framework | `U = Installed Capacity / Actual Task Volume` | Actual task volume / sustainable capacity in the same period; same 600/1,000 example, zero denominator undefined | Approve consistent direction and period |
| ROI model, cost/threshold component | Initial capex added to unspecified remaining labor cost; `ROI=f(...)` and economic threshold without defined criterion | Same-horizon cash-cost comparison; dependency statements labelled as such, not numerical formulas. No universal economic/congestion percentage; model project cash flows | Approve removal of implied general threshold |
| ROI model, integration finding | Costs “frequently comparable to hardware costs” | Estimate explicitly for the deployment; no general hardware-cost ratio established | Approve removal of unsupported frequency/ratio assertion |
| ROI model, payback/ROI | `ROI = Ccapex / (Total Savings − Ccapex)` | Constant-flow simple payback `C0/S` in years, S>0; horizon return `(ΣS_t−C0)/C0`, C0>0, dimensionless, not annualized/IRR. Variable-flow recovery uses cumulative cash flows. No finite simple payback for nonpositive constant S | Approve separation; [NIST AMS 200-11 §A1.3, pp.25–27](https://nvlpubs.nist.gov/nistpubs/ams/NIST.AMS.200-11.pdf) supports payback method/limits, not proprietary findings |
| ROI model, savings | `Savingst = Clabor × Lsub × U` | Annual avoidable labor cash cost + other incremental cash benefits − incremental operating cash costs. Redeployment ≠ cash saving; no double-counting utilization or initial costs | Approve explicit net-cash-flow assumptions |
| ROI worked example (new, labelled hypothetical) | None | C0=$300k; avoidable labor=$120k/year; incremental costs=$20k/year; S=$100k/year; payback=3 years; five-year undiscounted return=66.7%. No tax/terminal value/time-value effects assumed | Approve illustrative arithmetic, not client evidence or hurdle rate |
| AMR glossary and duplicate glossary hub text | Universal approximately 70–80% requirement; time utilization mixed with output utilization | Productive/scheduled robot-hours, same period; 6/10=60% example. Explicitly distinguish output utilization and remove the universal threshold claim | Approve removal, or provide specific evidence and assumptions for an empirical claim |
| ROI diagram | Active hours / unspecified total capacity; capital / annual labor savings; >85% congestion branch | New static SVG: capacity, distinct utilization measures, net cash flow, payback and horizon return. No numeric economic/congestion cutoff. Same hypothetical example as prose | Approve replacement figure; previous PNG archived in this review folder and removed from public output (old asset URL is retired; article URL unchanged) |
| All 55 detail pages | Author/date only in schema; proprietary labels could be mistaken for independent evidence | Visible byline/source dates exactly match existing schema. Evidence-scope note qualifies unsupported numerical estimates/thresholds as unverified analytical inputs, not benchmarks | Approve this qualification for retained claims or specify claims to remove/substantiate |
| Automation Failure HTML figures | Indented source HTML displayed as code and overflowed viewport | Corrected static HTML block formatting and responsive grid; formula code wraps within reading width. Wording unchanged except utilization correction above | Presentation correction; no factual implication |

General sensitivity statements were correspondingly narrowed: higher labor cost helps only when avoidable; higher utilization does not automatically create cash savings. No empirical 70–80%, 82% or 85% replacement threshold was invented. The former llms claims remain removed.

[Attribution exceptions](attribution.md) lists all 55 routes, counts and concrete release treatment; [full inventory](attribution.json) records exact visible numerical/proprietary passages, authors/dates and public URLs. Only two detail pages have third-party body links after adding these narrowly relevant definition/method references. Those references do **not** establish the site’s proprietary findings. All other routes have an explicit exception and visible qualification. This is not a claim that all research is independently verified or all cases are hypothetical. No case was relabelled as client work, and no private underlying narrative was added. The 18 approved service proof paragraphs remain exact, including the six-hour result’s qualifications.

## Crawler choice — must be selected before merge

Current public rules are deliberately unchanged. Choose Allow or Disallow **independently for each token**:

| Token | Current exact group | Prepared alternative | Consequence |
|---|---|---|---|
| GPTBot | `User-agent: GPTBot` / `Allow: /` | `User-agent: GPTBot` / `Disallow: /` | Disallow opts this crawler out of training collection; OAI-SearchBot remains separately allowed. Allow does not guarantee inclusion/citation/training |
| ClaudeBot | `User-agent: ClaudeBot` / `Allow: /` | `User-agent: ClaudeBot` / `Disallow: /` | Disallow opts future ClaudeBot collection out; Claude-SearchBot remains separately allowed |
| Google-Extended | `User-agent: Google-Extended` / `Allow: /` | `User-agent: Google-Extended` / `Disallow: /` | Controls Gemini training and specified grounding uses; Google says it does not affect Google Search inclusion or ranking. Blocking can therefore restrict those grounding uses as well as training |

Sources: [OpenAI crawlers](https://developers.openai.com/api/docs/bots), [Anthropic crawlers](https://privacy.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler), [Google-Extended](https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers#google-extended). Robots directives are not access control and do not reverse prior ingestion. User-triggered fetches have different behavior; do not equate training controls with all AI discovery. The Terms restriction on training/scraping also needs to be considered when choosing these permissions; a robots Allow is not a negotiated content licence.

Prepared, inactive alternative: [robots-proposed-block-training.txt](robots-proposed-block-training.txt). To produce any mixed selection, `node scripts/prepare-crawler-policy.mjs <GPTBot allow|disallow> <ClaudeBot allow|disallow> <Google-Extended allow|disallow> <review-output-path>`. It cannot write `public/robots.txt`. After the owner’s choice, apply the reviewed groups to public robots, replace the misleading legacy “core knowledge” comment with a neutral policy comment, rebuild and rerun the relevant checks in this same PR before approval. No crawler decision has been inferred.

## Verification and local review

Fresh production output: `/private/tmp/ab-consolidated-final`. Node 20.20.1; build requires exact site and production context. Local review: `http://127.0.0.1:4328/` (loopback only; the server is running during this session). This is a production-mode rendering: local submissions reject before transmission due to the origin guard. Browser outcome tests use fully intercepted requests, not a real Netlify receiver.

Rebuild from the repository:

```sh
SITE_ID=3df07dc5-6950-4241-98eb-cf95df3d271d CONTEXT=production npm run build -- --outDir /private/tmp/ab-release-review
AB_AUDIT_DIST=/private/tmp/ab-release-review AB_AUDIT_REPORT=/private/tmp/routes.json python3 scripts/verify-preview.py /private/tmp/ab-baseline/dist --release-candidate --canonical-apex
AB_AUDIT_DIST=/private/tmp/ab-release-review AB_AUDIT_REPORT=/private/tmp/proof.json python3 scripts/verify-release-content.py /private/tmp/autonomybridge-v2-source/website_copy.json --form-enabled
python3 scripts/audit-canonical-host.py /private/tmp/ab-release-review /private/tmp/canonicals.json
node scripts/audit-research-static.mjs /private/tmp/ab-release-review /private/tmp/ab-issue2-canonical /private/tmp/static.json
node scripts/audit-consolidated.mjs /private/tmp/ab-release-review /private/tmp/attribution.json
node scripts/test-release-contact.mjs
python3 scripts/check-release-safeguards.py
```

The controlling JSON and baseline builds are local dependencies, not bundled private source. A reviewer elsewhere must supply those artifacts to independently repeat the relevant comparison. Browser runner: `node scripts/run-consolidated-browser.mjs`, using existing Playwright CLI session `abrelease` and the local server at port4328. It intercepts every request in the production-origin form test contexts; all GETs resolve to local files and all POST/receipt responses are fixtures.

Current results are in the adjacent JSON reports. Passed coverage: 160 generated pages; 147 research routes reachable through hubs; 156 XML entries; 158 HTML destinations; 18 exact proofs; 55 detail pages/19 static figures; original redirects and historical research dates preserved; only the eight historical broken destinations and existing referrers allowed. Public-output scanner includes hidden files, HTML, JS and all other emitted bytes; no direct address or `mailto:` string. This is not OCR of every historical raster asset.

## Final release checklist

- [ ] Owner approves factual proposals and retained-claim qualification, or supplies specific corrections/evidence.
- [ ] Owner selects GPTBot, ClaudeBot and Google-Extended independently; selection applied and rechecked in this PR.
- [ ] Owner approves form/legal wording and actual provider/access/retention facts; no mailbox delivery guarantee inferred. Historical legal publication date remains unchanged in this draft; set the actual revision date only when release is approved/performed.
- [ ] Review combined artifact and latest audit reports; acknowledge eight historical broken destinations listed with referrers in routes.json.
- [ ] Explicit approval to merge this consolidated PR once and allow one normal Netlify main deployment. #3/#5/#6 remain unmerged reference PRs.
- [ ] After deployment, verify deployed commit, live canonical/routes/form UI, email-string scan and analytics-off state. Do not claim these candidate checks prove the new version is live.
- [ ] Only with separate authorization, submit one real enquiry and verify Netlify receipt and mailbox delivery. If verification fails, preserve unknown-outcome behavior and investigate; do not claim delivery or add a public mailbox fallback.

Search Console/Bing property access, sitemap submission and performance measurement remain separate later work. No new login, tracking, production settings change or external outreach was performed.

## Recorded results

| Check | Result |
|---|---|
| Fresh production build | PASS — 160 pages, Node 20.20.1, exact target/context; see build.txt |
| Routes, hub reachability, fragments, breadcrumbs, redirects | PASS — 147 research routes, none lost/unreachable; zero fragment/breadcrumb errors; unchanged redirect registry |
| Sitemaps | PASS — 156 XML entries and 158 HTML destinations; no missing/extra expected entries |
| Broken-link allowlist | PASS — exactly eight historical destinations; no new referrers or destinations (routes.json lists each) |
| Approved proof | PASS — all 18 exact in active source and emitted HTML |
| Canonical/metadata | PASS — all 160 canonical/OG/schema hosts apex; five core titles/descriptions/OG/H1/schema consistent; neutral llms matches source |
| Static research | PASS — 55 detail pages, 19 figures; original fragments/references/schema dates preserved |
| Attribution | PASS for metadata/presentation consistency on all 55; proprietary factual validation remains owner review, not a claimed test pass |
| Public email/links | PASS — 240 emitted files including hidden security.txt; zero mailbox or mailto strings |
| Form | PASS offline — required fields, invalid email, honeypot, privacy request without company, confirmed rejection, matching receipt, unknown receipt, expiry, no duplicate POST; entries retained; JS-off honest disabled state |
| Responsive/keyboard | PASS — 33 route/viewport combinations, widths1440/768/390; no page overflow; one H1 on inspected pages; skip link, visible focus, mobile menu; all tests rerun after markup fix |
| Analytics/preview safeguards | PASS — Google loader absent, local build160 noindex/nofollow, stale overlay not restored, remote-local/wrong-site/deploy-preview/private-flag guards reject |
| Read-only live URLs | PASS reachability — 159 checked apex destinations returned200; www root redirects to apex. Live canonical still www because this release is NOT deployed |
| Git boundaries | #3/#5/#6 remain draft/unmerged; main still59b9f7b; no deployment or enquiry sent |

Browser runs initially encountered a closed browser session; the final successful run uses a dedicated `abrelease` session and shorter batches. These are Chromium checks, not exhaustive cross-browser, screen-reader or assistive-technology certification. Screenshot samples: [Contact desktop](contact-desktop.png), [Contact mobile](contact-mobile.png), [revised ROI figure](roi-diagram-after.png), [previous figure](roi-diagram-before.png). Core opening sections and all inspected pages were also captured locally under output/playwright. The repaired Automation Failure HTML diagrams now render as content instead of escaped source code.

To serve a rebuilt artifact locally: `python3 scripts/serve-release-preview.py /private/tmp/ab-release-review 4328` (stop any existing listener on that port first). This binds only127.0.0.1. Do not publish the directory as a remote preview. For the nonproduction noindex build, the exact isolated build path is recorded in preview-safeguards.json.
