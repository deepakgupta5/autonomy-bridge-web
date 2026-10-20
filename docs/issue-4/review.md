# Issue 4: wording and on-page SEO review

Baseline: PR #5 head `1558770d4f6c194c86300d9416c6b283138a71af`, containing PR #3 head `f79715f34630773afdc89160eae8c273ab480d97`. Both were confirmed OPEN, draft and unmerged before coding. Review order: [PR #3](https://github.com/deepakgupta5/autonomy-bridge-web/pull/3), [PR #5](https://github.com/deepakgupta5/autonomy-bridge-web/pull/5), then this PR. Related: [issue #2](https://github.com/deepakgupta5/autonomy-bridge-web/issues/2), [issue #4](https://github.com/deepakgupta5/autonomy-bridge-web/issues/4).

Production was checked directly and remains at `59b9f7b`. **Baseline correction:** live Contact and PR #5 contain a form, and live Contact has no email link. The brief describes this as email-only, but the observed output differs. This candidate implements the user’s explicit email-only direction: one mailto action, no form or submission claim. `formEnabled` is false in the candidate; no live provider settings or notification configuration were changed.

## Before and after

Exact rendered snapshots (all headings, paragraphs, links, canonical/OG/robots and full JSON-LD) are in `core-pages.json`. `copy-diff.txt` shows every active-copy change, including removal of stale, unrendered Contact form messages. Published privacy/legal wording is unchanged.

### /

| Field | Before | After |
| --- | --- | --- |
| Audience / fit | Choose where to grow, turn opportunities into customers and strengthen your sales operation. Fractional leadership or a defined commercial project. / Use your data to find opportunities to improve revenue or costs, build a useful application, or improve an existing AI workflow. | For startups and SMBs needing accountable sales or commercial leadership. Choose fractional sales leadership or a defined project to strengthen the team, win customers or develop a market. / For businesses and nonprofits with teams, existing workflows and a practical implementation or adoption problem. Start with an organizational question, a defined requirement or an AI attempt that needs work. |
| First-screen H1 | Commercial leadership. Hands-on AI implementation. | Commercial leadership. Hands-on AI implementation. |
| Title | Commercial Leadership & AI Consulting \| AutonomyBridge | Commercial Leadership & Hands-on AI \| AutonomyBridge |
| Meta description | Deepak Gupta helps startups and growing businesses with fractional commercial leadership, practical AI consulting and hands-on implementation. | Deepak Gupta provides commercial leadership for startups and SMBs, and hands-on AI consulting and implementation for businesses and nonprofits. |
| OG description | Deepak Gupta helps startups and growing businesses with fractional commercial leadership, practical AI consulting and hands-on implementation. | Deepak Gupta provides commercial leadership for startups and SMBs, and hands-on AI consulting and implementation for businesses and nonprofits. |
| Relevant schema text | Organization + WebSite + BreadcrumbList; no audience or service description | Identical to baseline; no added claims, description, Service or FAQ schema |
| CTA | Discuss your business challenge → /contact | Discuss your challenge → /contact |

### /commercial-leadership

| Field | Before | After |
| --- | --- | --- |
| Audience / fit | Fractional leadership and defined projects for startup founders and small and medium-sized business leaders. | Fractional sales leadership, broader commercial leadership and defined projects for startups and small and medium-sized businesses (SMBs). |
| First-screen H1 | Commercial leadership for sales, growth and market decisions | Commercial leadership for sales, growth and market decisions |
| Title | Fractional Commercial Leadership \| AutonomyBridge | Fractional Sales & Commercial Leadership \| AutonomyBridge |
| Meta description | Fractional leadership and defined projects covering sales teams, positioning, pricing, partnerships and growth decisions, led by Deepak Gupta. | Deepak Gupta leads sales teams, forecasting and key opportunities for startups and SMBs, with fractional leadership and defined commercial projects. |
| OG description | Fractional leadership and defined projects covering sales teams, positioning, pricing, partnerships and growth decisions, led by Deepak Gupta. | Deepak Gupta leads sales teams, forecasting and key opportunities for startups and SMBs, with fractional leadership and defined commercial projects. |
| Relevant schema text | Organization + WebSite + BreadcrumbList; no audience or service description | Identical to baseline; no added claims, description, Service or FAQ schema |
| CTA | Discuss your business challenge → /contact | Discuss your challenge → /contact |

### /ai-consulting

| Field | Before | After |
| --- | --- | --- |
| Audience / fit | AI consulting and hands-on implementation for startup founders and small and medium-sized business leaders. | AI consulting and hands-on implementation for businesses and nonprofits with teams, existing workflows and a practical implementation or adoption problem. |
| First-screen H1 | Use AI to make better decisions and improve everyday work | Use AI to make better decisions and improve everyday work |
| Title | AI Consulting & Implementation \| AutonomyBridge | AI Consulting & Implementation for Teams \| AutonomyBridge |
| Meta description | Use AI to improve business decisions and everyday work. Deepak Gupta provides analysis, workflow builds, integrations and implementation support. | Hands-on AI consulting for businesses and nonprofits: assess a question, build a workflow or improve stalled implementation and team adoption. |
| OG description | Use AI to improve business decisions and everyday work. Deepak Gupta provides analysis, workflow builds, integrations and implementation support. | Hands-on AI consulting for businesses and nonprofits: assess a question, build a workflow or improve stalled implementation and team adoption. |
| Relevant schema text | Organization + WebSite + BreadcrumbList; no audience or service description | Identical to baseline; no added claims, description, Service or FAQ schema |
| CTA | Discuss your business challenge → /contact | Discuss your challenge → /contact |

### /about

| Field | Before | After |
| --- | --- | --- |
| Audience / fit | I work with startup founders and small and medium-sized business leaders on growth, commercial execution and practical uses of AI. | I provide fractional sales and commercial leadership for startups and SMBs that need accountable leadership, stronger sales teams or progress on a defined commercial project. / My AI consulting and implementation work serves businesses and nonprofits with teams, existing workflows and a practical implementation or adoption problem. |
| First-screen H1 | Deepak Gupta | Deepak Gupta |
| Title | About Deepak Gupta \| AutonomyBridge | Deepak Gupta: Commercial Leadership & AI \| AutonomyBridge |
| Meta description | Meet Deepak Gupta and explore the commercial operating experience, hands-on AI work and robotics background behind AutonomyBridge. | Meet Deepak Gupta: commercial leadership for startups and SMBs, alongside hands-on AI implementation for businesses and nonprofits. |
| OG description | Meet Deepak Gupta and explore the commercial operating experience, hands-on AI work and robotics background behind AutonomyBridge. | Meet Deepak Gupta: commercial leadership for startups and SMBs, alongside hands-on AI implementation for businesses and nonprofits. |
| Relevant schema text | Organization + WebSite + BreadcrumbList; no audience or service description | Identical to baseline; no added claims, description, Service or FAQ schema |
| CTA | Discuss your business challenge → /contact | Discuss your challenge → /contact |

### /contact

| Field | Before | After |
| --- | --- | --- |
| Audience / fit | Get in touch about commercial leadership, AI consulting and implementation or a question arising from the research. | Get in touch about commercial leadership for your business, AI consulting and implementation for your business or nonprofit, or a question arising from the research. |
| First-screen H1 | Discuss your business challenge | Discuss what you want to improve |
| Title | Contact Deepak Gupta \| AutonomyBridge | Contact Deepak Gupta: Leadership & AI \| AutonomyBridge |
| Meta description | Discuss commercial leadership, AI consulting and implementation, or a research question with Deepak Gupta. Start with your situation or project. | Email Deepak Gupta about commercial leadership, AI implementation or a research question. Describe your organization, your work and what needs to improve. |
| OG description | Discuss commercial leadership, AI consulting and implementation, or a research question with Deepak Gupta. Start with your situation or project. | Email Deepak Gupta about commercial leadership, AI implementation or a research question. Describe your organization, your work and what needs to improve. |
| Relevant schema text | Organization + WebSite + BreadcrumbList; no audience or service description | Identical to baseline; no added claims, description, Service or FAQ schema |
| CTA | Form: Send enquiry (no mailto link) | deepak@autonomybridge.com → mailto:deepak@autonomybridge.com |

## First-screen problems and service scope

- Home: commercial card names accountable leadership for startups/SMBs; AI card names teams/workflows in businesses/nonprofits and all three starting points. Existing H1 is unchanged.
- Commercial: fractional sales leadership appears beside the broader remit. Founder dependence, weak forecasts, pilots-to-contracts and direct opportunity ownership remain visible; pricing, partnerships, defined projects and business development/market entry remain. No established-B2B eligibility condition or fundraising/grant claim added.
- AI: stalled pilots, disconnected tools, checking effort and unclear ownership now appear in the introduction. Organizational questions and first-time requirements remain equally valid starting points. Service delivery/response time are possible areas to assess, not promised results or nonprofit proof. Testing, existing tools, simpler alternatives, human review, handover and agreed support remain.
- About: commercial and AI audiences have separate paragraphs; biography and proof remain unchanged.
- Contact: organization/work wording, a single email link, no form, no selector and no response-time or submission promise.

## Every new nonprofit occurrence

There are **8 source-copy occurrences**: Home description and service-card paragraph; AI description and audience paragraph; About description and AI-audience paragraph; Contact invitation; llms.txt description. Three meta descriptions are each emitted as ordinary, OG and Twitter descriptions, making **14 rendered/public-file occurrences**. No occurrence is in Commercial Leadership, proof, research, legal text or schema.

| Public location | Text |
| --- | --- |
| / meta description | Deepak Gupta provides commercial leadership for startups and SMBs, and hands-on AI consulting and implementation for businesses and nonprofits. |
| / og description | Deepak Gupta provides commercial leadership for startups and SMBs, and hands-on AI consulting and implementation for businesses and nonprofits. |
| / twitter description | Deepak Gupta provides commercial leadership for startups and SMBs, and hands-on AI consulting and implementation for businesses and nonprofits. |
| / paragraph 5 | For businesses and nonprofits with teams, existing workflows and a practical implementation or adoption problem. Start with an organizational question, a defined requirement or an AI attempt that needs work. |
| /ai-consulting meta description | Hands-on AI consulting for businesses and nonprofits: assess a question, build a workflow or improve stalled implementation and team adoption. |
| /ai-consulting og description | Hands-on AI consulting for businesses and nonprofits: assess a question, build a workflow or improve stalled implementation and team adoption. |
| /ai-consulting twitter description | Hands-on AI consulting for businesses and nonprofits: assess a question, build a workflow or improve stalled implementation and team adoption. |
| /ai-consulting paragraph 1 | AI consulting and hands-on implementation for businesses and nonprofits with teams, existing workflows and a practical implementation or adoption problem. |
| /about meta description | Meet Deepak Gupta: commercial leadership for startups and SMBs, alongside hands-on AI implementation for businesses and nonprofits. |
| /about og description | Meet Deepak Gupta: commercial leadership for startups and SMBs, alongside hands-on AI implementation for businesses and nonprofits. |
| /about twitter description | Meet Deepak Gupta: commercial leadership for startups and SMBs, alongside hands-on AI implementation for businesses and nonprofits. |
| /about paragraph 3 | My AI consulting and implementation work serves businesses and nonprofits with teams, existing workflows and a practical implementation or adoption problem. |
| /contact paragraph 1 | Get in touch about commercial leadership for your business, AI consulting and implementation for your business or nonprofit, or a question arising from the research. |
| public/llms.txt  | Commercial leadership for startups and SMBs. AI consulting & implementation for businesses and nonprofits. |

## Shared scope and safeguards

The desktop/mobile header and core-page CTA now say “Discuss your challenge.” Footer service labels and “Commercial leadership. Practical AI.” remain accurate and unchanged. Organization/WebSite schema has no audience description to rewrite. Research enquiry modules already use neutral research-context wording; research text is unchanged. The short legacy Advisory bridge still uses generic business wording; it introduces no new eligibility rule and is outside the five-page wording change.

The active public JSON already contains the approved proof. CopyPage no longer permits a legacy whole-page private overlay to overwrite current wording/layouts. In a disposable local-mode build, `AB_PRIVATE_PREVIEW=1` with a deliberately stale overlay did not restore old content; all 160 pages retained noindex/nofollow. Production-context, wrong-site and private-overlay rejection checks also passed.

## Verification

| Check | Result |
| --- | --- |
| Fresh production build | 160 pages; `/private/tmp/ab-issue4-final` |
| Route/hub/fragment/redirect audit | 147 retained research routes; all reachable; no new broken targets/referrers; eight historical destinations unchanged |
| Sitemaps | 156 XML entries; 158 HTML destinations |
| Approved proof | 18/18 exact in active source and built HTML, including six-hour context and qualifications |
| Research static HTML | 55/55 detail pages; one H1; 19 mapped figures; schema, dates, IDs and references preserved |
| Assets/content | All 34 diagram files byte-identical to PR #5; research main content, Methodology and legal main text unchanged |
| Canonical/OG/schema | All 160 pages pass apex/path assertions; all five core schemas identical to baseline |
| Five-page raw HTML | One H1 each; exact metadata; OG descriptions match; all production pages index/follow except Contact Success |
| Browser | 5 pages × desktop 1440px/mobile 390px; no horizontal overflow; keyboard skip/menu focus; 5 additional JS-disabled page checks |
| Contact | Zero form elements; one mailto link; no submission or reply promise; no enquiry sent |
| Local/private preview | 160 noindex/nofollow pages; stale-overlay sentinel absent; email-only Contact |
| Analytics, robots, redirects | Analytics scan passed; robots.txt and redirect registry byte-identical to PR #5 |

The proof check uses the extracted controlling v2 `website_copy.json`, with its hash recorded in `proof.json`. Original ZIP is no longer at its prior Downloads location. Diagram parity is checked against PR #5’s approved existing assets; no diagram was newly sourced. Screenshots: workspace `output/playwright/issue4-*.png` and `issue4-opening-*.png`. These are local checks, not live indexing or delivery evidence.

## Reproduce and review locally

Node 20; from the repository root:

```sh
SITE_ID=3df07dc5-6950-4241-98eb-cf95df3d271d CONTEXT=production npm run build -- --outDir /private/tmp/ab-issue4-fresh
AB_AUDIT_DIST=/private/tmp/ab-issue4-fresh AB_AUDIT_REPORT=/private/tmp/routes.json python3 scripts/verify-preview.py /private/tmp/ab-baseline/dist --release-candidate --canonical-apex
AB_AUDIT_DIST=/private/tmp/ab-issue4-fresh AB_AUDIT_REPORT=/private/tmp/proof.json python3 scripts/verify-release-content.py /private/tmp/autonomybridge-v2-source/website_copy.json
python3 scripts/audit-canonical-host.py /private/tmp/ab-issue4-fresh /private/tmp/host.json
node scripts/audit-research-static.mjs /private/tmp/ab-issue4-fresh /private/tmp/ab-issue2-static-final /private/tmp/static.json
node scripts/audit-issue4.mjs /private/tmp/ab-issue4-fresh /private/tmp/ab-issue2-static-final /private/tmp/core.json
npm run preview -- --host 127.0.0.1 --port 4326 --outDir /private/tmp/ab-issue4-fresh
```

A server is currently running at `http://127.0.0.1:4326/` using the audited final build. Stop it before restarting on that port. Browser runner: `node scripts/run-issue4-browser.mjs` with the existing Playwright CLI session `abissue2`. No public deployment was created.

## Remaining owner decisions

Unchanged from `docs/issue-2/owner-decisions.md`: validate ROI equations, utilization thresholds and diagram/prose discrepancies; establish publishable source attribution and any visible byline/date treatment; decide GPTBot, ClaudeBot and Google-Extended permissions. None was guessed or edited.

Search Console had no property available in the existing signed-in account; Bing required sign-in. Access remains unverified; no new login was attempted. Once authorized access and deployment exist, inspect the apex property, submit/check `https://autonomybridge.com/sitemap-index.xml`, inspect declared versus selected canonicals for representative pages, then review service-versus-research query groups and available generative-search reports after recrawl. No rankings or AI citations are claimed.

Privacy wording is intentionally unchanged; the existing policy still describes configured form infrastructure although this candidate presents email-only Contact. Any legal/provider wording alignment requires a separately reviewed factual decision. Underlying private narratives remain excluded. Existing dependency warnings and eight historical broken links remain outside this wording scope.

Reviewer checklist: compare the two audience paths; confirm no nonprofit-specific proof is implied; review exact proof/context; verify the email-only direction despite the live-baseline discrepancy; review #3 then #5 before this PR. Do not merge or deploy automatically.
