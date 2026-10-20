# Full V2 release candidate — October 19, 2026

This is the current handoff, superseding preview-era proof withholding and the earlier requirement for prepublication email delivery testing. Prepared for review on PR #1; not merged or deployed.

## Copy and owner decision

[Owner decision recorded on PR #1](https://github.com/deepakgupta5/autonomy-bridge-web/pull/1#issuecomment-6281916360) approves the selected V2 excerpts and figures as accurate, in context and permitted for website and repository publication. All **18** are included exactly: Home 6, Commercial Leadership 3, AI Consulting 4, About 5. No proof sections omitted. This is owner attestation, not an independent audit of client records. Contracts, raw evidence, broader source narratives and unselected cases remain excluded.

`candidate-content-checks.json` compares paragraph text and occurrence counts in both source and rendered output with the controlling ZIP. The full copy now renders directly from versioned markup. Candidate/production modes never read the private overlay, preventing stale layouts from being restored.

## Release scope and notice changes

- Approved service/research wording and presentation retained. All 147 research routes, existing canonicals, publication dates and redirects preserved.
- Email-only Contact: confirmed mailto remains visible; no form is rendered. Detection, credentials and recipient settings are unavailable without account access. The activation generator now defaults exclusively to email-only; future form enablement requires notice/configuration review and a separately authorized live test.
- Optional analytics off. Google loader/config removed; no optional external requests, cookies or storage observed during the local clean-browser check. Deployed-host snippet injection and provider configuration are not established by this result.
- Privacy and Cookie drafts replaced by concise email-only notices. They state Netlify hosting, basic request delivery, email correspondence and the confirmed mailbox. They explicitly do not assert unverified email providers, forwarding, locations, retention/deletion periods or backup practices. The privacy mailbox provides a route to request those facts before sending information. These are substantive notice edits for reviewer approval, not a claim of legal sign-off or verified operational controls. Terms retains V2 wording except the email-only enquiry reference and revision label.
- No bracketed policy/date placeholders or proof markers in the artifact. Candidate pages state “Revision prepared: October 19, 2026. Publication pending.” At actual publication the required release-date argument replaces this with Last updated and sets Methodology dateModified. Methodology datePublished remains 2026-03-15. Preparation is not mislabelled as publication.
- Candidate renders ordinary pages index,follow without the preview banner. Contact Success stays noindex,nofollow and direct access shows unconfirmed. Candidate builds are loopback-only: the Netlify ignore/build lock remains until verified target/date activation. This is a deliberate deployment boundary, not unfinished presentation.

## Checks

- Clean Node 20 build: 160 pages. Baseline audit: 147 research routes reachable through hubs; 158 HTML / 156 XML destinations; redirects/canonicals retained; no new broken links or fragments. Eight historical ambiguous destinations and their referrers remain, plus the existing favicon.ico 404.
- Exact V2 proof text/count check: 18/18 in source and build; placeholder and Google-tag scans passed. Private source paths and common credential-pattern scan passed (not a universal secret detector).
- Offline adapter/receipt, wired-UI and target gates passed. Disposable email-only production build passed, including actual-date rendering and original Methodology date preservation. No receiving-service or mailbox test occurred.
- Browser: ten routes at 1440/768/390px, no overflow, one H1, expected robots, no preview banners or markers. Keyboard skip link and target passed; email-only Contact and unconfirmed direct success page checked. Home desktop/mobile screenshots visually inspected and kept in ignored `output/playwright/`.
- Local `dist` acquired stale ` 2` duplicate files after an initially clean build. Content verification caught them. The final review artifact was rebuilt in `/private/tmp/ab-full-v2-release-candidate`, audited there and served directly from there. Do not deploy the workspace `dist` directory. The exact temporary artifact manifest is `candidate-artifact-manifest.json`; rebuild and re-audit after activation because dates/policy will change.

## Review locally

Running now: http://127.0.0.1:4322/ (this laptop only).

From the repository with Node 20:

```sh
npm run build -- --outDir /private/tmp/ab-full-v2-release-candidate
AB_AUDIT_DIST=/private/tmp/ab-full-v2-release-candidate python3 scripts/verify-preview.py /private/tmp/ab-baseline/dist --release-candidate
AB_AUDIT_DIST=/private/tmp/ab-full-v2-release-candidate python3 scripts/verify-release-content.py /Users/deepakgupta/Downloads/AutonomyBridge_Website_Copy_and_Data_v2.zip
npm run preview -- --host 127.0.0.1 --port 4322 --outDir /private/tmp/ab-full-v2-release-candidate
```

The baseline must be the independent 157-page build from 0285946. Browser script: `scripts/release-browser-check.js` via the existing Playwright CLI. Never submit a real enquiry as part of these checks.

## Concrete deployment blocker

No verified Netlify site UUID or authenticated account configuration is available in this checkout; no `.netlify` link exists. The exact target and any dashboard-injected scripts need account verification. A new login needs Deepak's explicit authorization. No target is guessed and no provider setting is changed. Final reviewer acceptance of this candidate, including the narrowed notices and known defects, is still requested. Use `release-change-review.md` after obtaining that target evidence. Publication and a real test are distinct; the latter still needs separate authorization.

Sources for provider context: [Netlify privacy statement](https://www.netlify.com/privacy/) distinguishes its controller disclosures from customer processing; it does not prove this account's retention or settings. [Netlify Forms setup](https://docs.netlify.com/manage/forms/setup/) requires form detection configuration; markup alone is not evidence of receiving-service acceptance. No such acceptance is claimed for this email-only release.
