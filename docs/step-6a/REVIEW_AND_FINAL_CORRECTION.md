# Step 6A review and final Research navigation correction

## Review outcome
Reviewed branch `codex/step-6a-seo-geo` at report commit `0bfd268`, tested implementation `38d759c22984860ac2701f77c20a77fd1fa410c0`. The report commit changes only QA_STATUS.md and RESULT.md. The implementation is accepted for its recorded local scope, with the single Research navigation correction below still required before closing Step 6A.

The reviewer independently built this source with Node 24.19.0 and reran the Step 6A audit, all eight negative controls, body parity against the independently built ce2171e candidate, pending-date check and independent 0285946 baseline verifier. All passed: 163 pages, 147 Research routes, 158 HTML sitemap destinations, 156 XML entries, no new broken links, and identical normalized main text on all 163 pages. This independent static check supplements, and does not replace, the executor's reported Node 20 qualification.

Source inspection confirms factual Person/AboutPage, ContactPage and audience Service/WebPage relationships, correct scoped OG types, JSON-LD escaping, updated llms directory and preserved owner-approved crawler Allow permissions. Approved-copy sources, Research content and preview-copy.json were unchanged at this implementation.

## Local Codex: make this one scoped correction
Stay on this branch. Confirm HEAD and preserve unrelated local changes. The final service-navigation block in the /research entry of src/data/preview-copy.json still promotes Commercial Leadership and AI Consulting & Implementation as current work paths. Replace only its service invitation paragraph, service links and Contact CTA label. Leave its H3, research evidence paragraph, all collection/detail links, IDs, analytical copy, template and visual classes unchanged.

Exact replacement HTML for the three affected paragraphs:

```html
<p>For help with a commercial priority, fundraising operations or sales leadership, explore the page that fits your situation.</p>
<p class="service-links"><a href="/startups">Startups</a> <a href="/nonprofits">Nonprofits</a> <a href="/sales-leadership">Sales Leadership</a></p>
<p><a class="copy-button" href="/contact">Discuss your challenge</a></p>
```

This is a narrow correction to the service handoff on the Research directory, consistent with the approved navigation and CTA. Do not rewrite Research analysis or alter any Research route, canonical, anchor or collection/detail destination. Keep all three legacy bridge pages and their existing noindex/sitemap treatment.

## Verify the corrected source
1. Build with Node 20 and rerun the independent baseline verifier, Step 6A audit and negative controls, date gates and pending-date check. Counts must remain 163/147/158/156 and all local HTML must remain noindex,nofollow.
2. Extend the Step 6A audit to assert that this specific /research service-links block contains the three current audience links and its adjacent Contact CTA has the approved label. Add a negative control that restores the old active-offer block and demonstrate rejection. Preserve valid legacy links elsewhere.
3. Adapt the body parity checker to allow only this exact documented replacement on /research when compared with ce2171e. Require equality on all other 162 pages, and equality of all remaining Research page text and links outside that block. Do not replace parity with a general /research exemption.
4. Confirm the source diff of preview-copy.json changes only these three paragraphs in the /research entry. Approved Step 5 sources and src/content must remain unchanged.
5. Review /research locally at 1423, 400 and 320 CSS px. Confirm three readable links, the CTA label, correct destinations and no overflow. Reuse existing styling; adjust scoped layout only if an actual defect is found. Save fresh screenshots with source attribution.
6. Update QUERY_AND_ANSWER_MAP.md to mark the mismatch resolved, RESULT.md and QA_STATUS.md with the exact tested commit and fresh evidence. Push for final repository review.

Do not merge, deploy, set release dates, submit sitemaps, request indexing, log in or send real enquiries. Netlify/live checks remain deferred. No further copy decision is needed for this specified correction.
