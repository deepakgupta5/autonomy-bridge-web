# Step 6 date gate result

**Tested source commit:** `388a518891f37eb8bf1143eb0312c4be712bc5cf` on `codex/step-6-final-candidate`. This follows the accepted candidate at `3a3e5d4b2e5cb93b5f727d2cee837089f6d88f4d` and the [date gate handoff](DATE_GATE_HANDOFF.md). All checks used Node 20.20.1 on 2026-10-23. No production artifact was created.

## Source and gate

`config/deployment-policy.mjs` remains in `local` mode with `publicationDate: ''` and `researchRevisionDate: null`. `scripts/preview-build-guard.mjs` now requires both explicit calendar dates for **every** production-mode build, including a local production simulation. The shared `validCalendarDate` check rejects malformed and impossible dates, including non-leap February 29 and February 30. The production runtime target check uses the same date validation. Dates are never derived from the clock or environment. `scripts/prepare-release-patch.py` requires both date arguments and refuses invalid dates or a policy whose date fields were already populated.

`node scripts/test-date-gate.mjs` passed in a disposable fixture. Seven missing, malformed or impossible date pairs were rejected; a valid synthetic pair, `2000-02-29` / `2000-01-03`, passed both local and Netlify production guard invocations. A wrong target ID still failed. `node scripts/test-release-gates.mjs` also passed. `python3 scripts/test-release-build.py` built **163 pages** in a disposable production-mode email-only fixture using synthetic `2000-01-02` / `2000-01-03` dates; it was not a release artifact, deployment or live form check.

## Local rendered output

`npm run build` passed in local mode with **163 pages**. `python3 scripts/check-pending-dates.py` passed against the generated output:

- All **86** routes in `config/material-research-revisions.json` show “Revision prepared for release; publication pending.” Their JSON-LD has no release `datePublished` or `dateModified`.
- `/methodology`, `/terms-of-use` and `/cookie-policy` show the pending notice. Methodology retains verified original Article `datePublished: 2026-03-15` and omits `dateModified` until production dates are set.
- The active `/privacy-policy` is implemented in `src/pages/privacy-policy.astro` and has no revision-date field. The older Privacy entry in `src/data/preview-copy.json` is not rendered. The earlier [candidate date inventory](FINAL_CANDIDATE.md) has been corrected accordingly.
- The XML sitemap has **zero** `<lastmod>` elements. Generated HTML contains neither old October 19/20 policy value nor the dated draft revision notice. A Research detail page retains its historical source-date record and historical source revision. Research content files were not changed.

`python3 scripts/check-research-release-dates.py` independently passed a disposable synthetic Research-date fixture for all 86 routes, JSON-LD and XML parity; it also confirmed unrelated routes were not stamped. Its date was fixture-only and did not alter the checkout policy.

The independent-baseline verifier passed with `--canonical-apex --research-review` against the separate 157-page build of `0285946a6a500f9207a9c466c7de11a4cffb22a8`: **147 Research routes**, **158 HTML sitemap destinations**, **156 XML entries**, no failures or new broken links. Its current output is `docs/preview/verification.json`. Local output remains `noindex,nofollow`.

## Publication-day action

The date-handling code and pending-output checks are complete. On the actual approved publication day, set both dates explicitly in `config/deployment-policy.mjs`, build the final approved production artifact and rerun its date and route checks. The candidate remains in local mode. Live Netlify form acceptance, delivery, storage, mailbox and retention checks remain deferred under the owner's prior instruction. No merge, deployment, sitemap submission, real enquiry or Step 6A work occurred.
