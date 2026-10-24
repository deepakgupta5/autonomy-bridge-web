# Privacy notice correction and verification

**Tested source:** `04b81db970ace885ffa701f5918e47de721faef4`

**Branch:** `codex/step-6a-seo-geo`

**Runtime:** Node `v20.20.1`

## Copy change

The rendered `/privacy-policy` page and its local preview copy now state that unsuccessful enquiries are retained for 12 months after the last substantive contact, subject to applicable legal requirements. The policy covers records in Netlify Forms, email and other copies under the operator's control.

The notice leaves the email notification/reply provider, forwarding arrangements, provider access locations, processing countries for submissions and logs, and provider backup deletion schedules unspecified. It makes no storage-country or fixed provider-backup deletion claim. It says those account-level details will be checked after launch, and users can ask before providing further information or submit an ordinary enquiry without asking first. It also distinguishes the random receipt reference from the underlying enquiry.

## Automated verification

The guarded production verification passed all 11 checks: source-guard negative controls, production build, route verifier, Step 6A output audit, audit negative controls, release date checks, owner date diff, date gate, release gates, offline Contact checks and artifact hashing.

The output audit covered 163 HTML pages. The local isolated preview fixture passed with all 86 pending Research routes and all 163 pages set to `noindex`. Production artifact evidence records 241 files and manifest SHA-256 `7689f0981ff0475013b2854a3e1b00168cd2930c7d3c921c9689a6186e55c94f`.

## Viewport review

The built local `/privacy-policy` route was reviewed at 1423 × 1000, 400 × 850 and 320 × 850 CSS pixels. The document and body widths matched the viewport at all three widths; no horizontal overflow was detected. Retention, provider and post-launch wording remained visible in the rendered text. The mobile captures show readable wrapping and spacing across the policy and processing sections.

- 1423 px: [page top](privacy-policy-1423-top.png), [provider details](privacy-policy-1423-providers.png)
- 400 px: [retention](privacy-policy-400-retention.png), [provider details](privacy-policy-400-providers.png)
- 320 px: [retention](privacy-policy-320-retention.png), [provider details](privacy-policy-320-providers.png)

Machine-readable results are in [production.json](production.json), [preview-fixture.json](preview-fixture.json), and [production-checks.log](production-checks.log).

No Netlify account or settings checks, live form submissions, deployment, merge, sitemap submission or indexing request occurred.
