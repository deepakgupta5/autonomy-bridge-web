# Final candidate acceptance and date gate task

## Candidate review

The combined local candidate at `3a3e5d4b2e5cb93b5f727d2cee837089f6d88f4d`, tested source `9a8fada5fefc820ed51f9e8a2af0069a83c26b49`, is accepted for its documented integration scope. The HubPageTemplate source blob exactly matches the accepted Research heading branch. Its saved independent-baseline verifier reports `passed: true`, no failures, 163 built pages, 147 Research routes, 158 HTML sitemap destinations and 156 XML entries. Earlier detailed visual results retain their exact source attribution.

## Local Codex next task: remove prefilled release dates

Continue on `codex/step-6-final-candidate` after fetching and preserving any newer work. Read `FINAL_CANDIDATE.md` for all date outputs.

1. In local review policy, clear `publicationDate` to an empty string and `researchRevisionDate` to null. The current October 19 and October 20 values must not be treated as an approved release date. Keep local mode and its noindex behavior.
2. Require both fields to contain explicit valid calendar dates before every production-mode build, including a local production simulation. Extend the existing release guard rather than adding a parallel release mechanism. Validate impossible dates, not only the YYYY-MM-DD shape. Do not derive launch dates automatically from today's date or environment variables.
3. Verify that local review output shows the existing publication-pending wording instead of an invented Last updated date, omits the unset revision date from JSON-LD and XML lastmod, and preserves historical source-date records and Methodology's verified original publication date. Adapt existing release-preparation/date-check scripts only where required for cleared fields.
4. Run the build and independent-baseline verifier. Exercise the date gate with missing, malformed and impossible dates and a valid synthetic date in a disposable fixture. Do not put a synthetic test date in the committed policy or call the fixture an actual release artifact.
5. Update `QA_STATUS.md` and add `docs/step-6/DATE_GATE_RESULT.md` with the tested source, date outputs inspected and gate results. The code handling can close after these checks; setting actual dates and validating the approved final production artifact remain publication-day actions.

Push the result for review. Do not merge to production, deploy, submit sitemaps, send a real enquiry or start Step 6A. Live Netlify checks remain deferred under the owner's instruction.
