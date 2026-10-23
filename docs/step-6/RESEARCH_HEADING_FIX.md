# Research duplicate-H1 correction

Base: `codex/step-6-qa` at `5691a6c`. The six affected Markdown opening titles now use H2 under the existing template H1. Their wording, generated anchor IDs, body text and Research URLs remain unchanged. The four Market Overview children style that opening H2 at its former size and weight. The two hub templates already hide a duplicate opening H2 after hydration, as they do on other hubs.

Local Node 20 build: 163 pages. The independent-baseline route verifier passes; all 147 Research routes remain. Each affected route now has one H1 in built HTML. Normalized rendered text matches the prior build on all six routes. The only remaining multi-H1 utility page is `/contact-success`, where mutually exclusive states contain separate headings.

Before integrating into the final Step 6 branch, compare these six pages at desktop and mobile widths in the local browser, including the brief pre-hydration state on `/case-studies` and `/use-cases`. Do not alter Research wording, routes, metadata, or publication dates. No deployment or real form submission is involved.
