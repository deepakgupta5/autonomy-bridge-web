# Step 7: Post-launch indexing and analytics plan

**Status:** planned. No search property was verified, no sitemap submitted, and no analytics tag installed.  
**Repository branch:** `codex/step-6a-seo-geo`  
**Plan basis:** Step 6A production-artifact candidate and the current privacy notice, which says optional analytics is disabled and provider/account details will be checked after launch.

## Sequence

### 7.1 Launch and live-site checks

After the owner authorizes publication and the site is live:

1. Confirm the canonical host and HTTPS behavior on `autonomybridge.com`; check redirects, response headers and representative page rendering.
2. Complete the planned Netlify checks using the connected site: form storage, notification delivery and reply mailbox, logs, access, processing locations, retention and deletion behavior.
3. Compare the observed form and provider configuration with the privacy notice. Update it if the facts change. The current notice states a 12-month period for unsuccessful enquiries after the last substantive contact, subject to legal requirements, across Netlify Forms, email and other copies under the operator's control.
4. Confirm the production robots directives and sitemap before telling search engines about the site. The tested candidate recorded 159 `index,follow` pages, three legacy bridge routes as `noindex,follow`, Contact success as `noindex,nofollow`, and 156 XML sitemap entries. Recheck the live response, not just the build artifact.

### 7.2 Search indexing and reporting

**Google Search Console**

- Verify the production domain property.
- Inspect the homepage, the three audience pages, Research hub, Methodology, Privacy and a representative set of Research routes.
- Confirm each intended canonical URL resolves, is indexable and appears in the live sitemap. Confirm bridge and success routes stay out of the index.
- Submit the production XML sitemap once and monitor fetch status, discovered URLs, page indexing and crawl issues.

**Bing Webmaster Tools**

- Verify ownership of the same production domain.
- Submit the production XML sitemap.
- Review crawl/indexing and search performance reports. Use URL inspection for important routes if they remain undiscovered.
- Check whether the AI Performance report is available for the verified property and record its page/query/citation data if present.

Sitemap submission is a discovery hint. It does not guarantee crawling, indexing, ranking or AI citations.

### 7.3 Google Analytics 4

The current site has no optional analytics tag. Before enabling GA4:

- Create or select one GA4 property and a web data stream for the production domain.
- Decide and implement the consent behavior appropriate to the site's audience and applicable requirements before the Google tag runs. Google documents consent mode as requiring a mechanism to obtain user consent.
- Update the Privacy and Cookie notices to reflect the actual tag, data collected, purpose and relevant provider details before enabling it.
- Track only useful, non-sensitive events: page views, audience CTA selection, contact form start and confirmed submission. Never send names, email addresses, company names, message text or other form contents as event parameters.
- Fire the confirmed-submission event only after the form's verified receipt state, not from a URL parameter or a page view alone.
- Test with GA4 DebugView/Realtime, confirm internal/test traffic handling, then monitor for duplicate events and unintended personal data.

### 7.4 Microsoft tools

“Bing analytics” can mean two different things:

- **Bing Webmaster Tools** reports search visibility and crawling. Include it in Step 7.2.
- **Microsoft Clarity** is Microsoft's on-site behavior analytics product. It is optional and is not required for Bing indexing.

Recommendation: launch with Google Search Console, Bing Webmaster Tools and GA4. Decide separately whether Clarity adds enough value to justify session recordings and heatmaps. If enabled, update the notices and consent design first, set strict masking, and verify that the Contact form and success state expose no enquiry content in recordings. Microsoft documents masking and consent controls for Clarity.

## Reporting cadence

- **First week:** check sitemap fetches, crawl errors, important URL indexing and whether analytics events arrive once.
- **First month:** review Search Console and Bing Webmaster search impressions/clicks and indexing changes; review GA4 landing pages, audience CTA events and confirmed Contact conversions.
- **Monthly thereafter:** record trend changes and issues. Treat indexing and AI citations as observed outcomes, not guaranteed deliverables.

## Boundaries

This plan does not submit a sitemap, create or verify search properties, add analytics code, configure consent, or perform an account login. Those are post-launch execution tasks after the relevant account access and action are authorized. It does not authorize deployment or publication.

## Official references

- [Google Search Console: submit a sitemap](https://support.google.com/webmasters/answer/7451001)
- [Google Search Console: getting started and site verification](https://support.google.com/webmasters/answer/10267942)
- [Google Search Central: sitemap submission is a hint, not a guarantee](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Bing Webmaster Tools: sitemaps](https://www.bing.com/webmasters/help/sitemaps-3b5cf6ed)
- [Bing Webmaster Tools: add and verify a site](https://www.bing.com/webmasters/help/add-and-verify-site-12184f8b)
- [Google Analytics: set up a web data stream](https://support.google.com/analytics/answer/9304153)
- [Google Analytics: consent mode](https://support.google.com/analytics/answer/14009635)
- [Microsoft Clarity: consent management](https://learn.microsoft.com/en-us/clarity/setup-and-installation/consent-management)
- [Microsoft Clarity: masking content](https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-masking)
- [Bing Webmaster Tools: Microsoft Clarity](https://www.bing.com/webmasters/help/microsoft-clarity-55a30306)
