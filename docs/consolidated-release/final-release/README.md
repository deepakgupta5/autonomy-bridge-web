# Final release evidence — 2026-10-20 (America/Vancouver)

Owner clarified that March 1, 2026 is the website original launch date, not the effective date of these revisions. This release uses October 20, 2026 for the 86 materially revised routes and legal notices. Existing unrelated publication/modification dates are unchanged; the original site launch date is not substituted for article publication dates.

## Bounded mathematical corrections

Only the three requested mathematical claims and their direct repetitions/inline diagram labels were changed. Five vendor-economics image diagrams were visually inspected; the ROI SVG and worked arithmetic were checked. No new threshold or citation was invented.

| Before | After |
|---|---|
| If system utilisation increases → subscription cost per operational unit decreases. | For a fixed subscription fee over a defined period, higher completed volume reduces the fixed subscription cost per unit. A constant usage-based charge per unit does not decrease merely because volume rises. |
| Recurring subscription fees accumulate to exceed capital ownership cost in long-term deployments without fee renegotiation. | Recurring subscription fees may exceed capital ownership cost, depending on purchase prices, subscription and service fees, usage charges, and the comparison horizon. |
| Capital purchase imposes high upfront exposure but lower lifetime cost under stable multi-year contracts. RaaS reduces initial risk but accumulates to exceed ownership cost if client contracts remain stable for 4+ years. | Capital purchase imposes upfront investment. Compare its installed and ongoing costs with the RaaS initial and recurring costs over the same horizon. Without prices, fees and operating assumptions, neither a lower lifetime cost nor a crossover year can be calculated. |
| Capital purchase creates higher upfront exposure but lower lifetime cost if the system remains deployed long-term. | Capital purchase creates upfront exposure; whether its lifetime cost is lower depends on the two cost paths over a common horizon. |
| Lower if system remains deployed · service fees continue | Compare installed and recurring costs over the same horizon |
| Can exceed ownership cost in long-term deployments | May exceed ownership cost, depending on fees and horizon |
| Determines how efficiently automation capacity is used. If utilisation declines, effective cost per operational unit rises regardless of pricing model. | For a fixed cost component over a defined period, lower completed volume raises that component’s cost per unit. A constant usage-based per-unit charge is unchanged by volume alone. |

## Verification

Fresh production-target build: `/private/tmp/ab-final-approved` (not a stale workspace dist).

- 160 generated pages; 147 retained research routes reachable; 156 XML entries and 158 HTML sitemap destinations.
- 18 approved proof paragraphs exact; 55 research detail pages and 19 figures checked.
- Canonicals, metadata, research review and links passed; only the eight recorded historical broken destinations remain, with no new referrers.
- Seven deliberate artifact defects were rejected by negative controls.
- Actual revision date matches visible HTML, structured data and XML for all 86 material routes, including legal notices; unrelated routes not freshly stamped.
- 36 browser views (12 routes at desktop, tablet and mobile widths): no horizontal overflow, correct H1/canonical, keyboard focus and skip links checked.
- Contact tests intercepted all production-origin requests locally: required fields, privacy-request company exemption, confirmed success, failure, unknown outcome, preserved entries and loopback rejection passed. No real enquiry was sent.
- Public-output email/mailto scan, analytics-off and all three crawler Allow rules passed.
- Isolated local preview: all 160 pages noindex; stale private overlay rejected; production safeguards passed.

Machine-readable reports in this directory contain detailed results. Screenshots remain local under output/playwright/final-*.png.

## Existing enquiry investigation

The owner existing submission was accepted by Netlify; the event function ran and the existing receipt returned accepted:true. No form-submission email notification hook existed, so there was no configured notification dispatch path. One enabled notification to the owner previously supplied mailbox was created and verified by reading it back. No enquiry or email was replayed. Mailbox delivery has not been tested or established. Private submission contents, references, recipient and raw configuration are excluded from this repository.

The CLI API does not support the attempted spam filter parameter; that response was not used to classify the submission as spam. Findings were reported before release in PR comment 6297447373.

## Release authority and remaining limits

Owner release instruction: PR comment 6297178669; delivery correction instruction: 6297256364. One merge of PR #7 and its existing Netlify main deployment are authorized. PRs #3, #5 and #6 are not merged separately. No real submission test is authorized. Search Console/Bing setup remains separate. Eight historical broken destinations remain documented. Live deployed-commit verification follows the merge; these local reports alone do not establish production deployment or mailbox delivery.
