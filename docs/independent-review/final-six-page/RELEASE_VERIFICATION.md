# Final six-page release verification

Tested source commit: `27a8dd2664c1b9e5704000330bbf97d28f463c50`

Tested source tree: `c39ced94ef6d61f6cc016eb641feea106f1b585c`

## Passed

- All 11 production-verifier checks passed under Node v20.20.2 against independent baseline commit `0285946a6a500f9207a9c466c7de11a4cffb22a8`.
- 163 built HTML pages; 147 Research routes; 158 HTML sitemap destinations; 156 XML sitemap entries.
- 159 index/follow pages, three legacy bridge noindex/follow pages, and one Contact-success noindex/nofollow page.
- Independent frozen-proposal audit passed: 258 public copy blocks across five pages, all Contact visible text, 23 article links/CTAs, and 13 named Contact state-message entries.
- Exact titles, descriptions, OG/Twitter metadata, schema, canonicals, heading hierarchy, fields and optionality passed.
- 36 isolated checks of the actual bundled Contact form and transport passed using DOM fixtures and intercepted fetch. No real enquiry was submitted.
- Exactly six rendered HTML pages changed from the separately built accepted `c21d976688ab54a692346f02ee9b7b792f3f3b13`: Home, Startups, Nonprofits, Sales Leadership, About and Contact. The other 157 HTML pages are byte-identical, including Research, legal pages and Contact success.
- Source-attribution guard now covers the actual approved-copy Markdown inputs, including tracked and untracked negative controls.
- Artifact: 241 files, 18,293,409 bytes; manifest SHA-256 `5b6da3a38d45ceb6b9c25d2c737c30fe28b077392623005229b020cc05be16f6`.

## Explicit limitations

Pre-launch browser rendering was unavailable in the review runtime and is not claimed as passed. No responsive screenshots, pixel inspection or interactive browser tests were completed. Accepted layout CSS is unchanged; that does not substitute for visual testing.

No real form submission, Netlify receipt, mailbox-delivery check or production deployment was performed during verification. Postlaunch visual inspection and live artifact checks remain distinct from these prelaunch checks.

## Evidence-only follow-up

This evidence package records the tested source above. Its follow-up commit must change documentation evidence only, not build inputs or deployed bytes. Generated machine evidence is in the sibling verification/release report paths and this directory; source reports deliberately retain the exact tested source SHA rather than pretending an evidence-only commit was rebuilt.
