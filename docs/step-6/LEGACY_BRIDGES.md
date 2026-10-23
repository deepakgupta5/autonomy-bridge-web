# Legacy service-path bridges

The owner approved retaining `/commercial-leadership`, `/ai-consulting` and `/advisory` as neutral `noindex` bridge pages, with links to the current audience pages, and removing them from both sitemaps.

The three URLs remain routable for historical Research links. The Commercial Leadership bridge points to Startups and Sales Leadership; the other two point to Startups, Nonprofits and Sales Leadership. Every bridge also points to Contact. The pages use the existing layout, type scale and color tokens. They carry self canonicals and `noindex,follow` in production mode; the local preview policy still emits `noindex,nofollow` on all pages. No redirect or Research content was changed.

Node 20 builds and independent-baseline verifier passed in local and simulated production modes: 163 pages, 147 Research routes, 158 HTML sitemap destinations and 156 XML entries. The verifier explicitly checks bridge canonicals, audience/Contact links, robots directives and sitemap exclusion. These are local checks, not a deployment.

Local Codex should inspect all three bridge pages at 1423 and 320 CSS px, follow every audience and Contact link, and confirm navigation, footer and no horizontal overflow. Record the result before this branch is integrated. Do not submit a real enquiry, merge, deploy or start Step 6A.
