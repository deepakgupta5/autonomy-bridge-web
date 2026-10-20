# Full V2 candidate activation — not applied

Current source mode is `candidate`: release presentation on loopback, email-only Contact, approved full proof, optional analytics off. See `full-v2-candidate.md` for copy changes, evidence and remaining access blocker. Public candidate builds omit the preview banner and use existing robots metadata; Contact Success stays noindex. No private overlay is read.

After verifying the actual Netlify site UUID, origin and publication day, generate a review-only diff:

```sh
python3 scripts/prepare-release-patch.py --origin https://autonomybridge.com --site-id VERIFIED_SITE_UUID --publication-date YYYY-MM-DD --email-only > /tmp/autonomybridge-release.patch
git apply --check /tmp/autonomybridge-release.patch
```

The command refuses placeholder site IDs and dates. Select the verified existing origin; do not normalize canonical URLs/redirects. The generator writes only a patch to stdout. It does not edit, merge or deploy.

The diff sets production mode, exact target and actual date; removes the Netlify automatic-build ignore; enables build processing. The exact-target production build guard remains to prevent deployment to a different site or with a private overlay. Current local candidate builds remain blocked in CI/Netlify until this activation is reviewed/applied. The template cannot be completed truthfully while the site UUID is unknown.

Email-only is the mandatory/default candidate scope. The patch does not enable the form or any analytics. Production renders actual Last updated dates and Methodology dateModified, retaining original datePublished. The notices are written for email-only enquiries; future form activation requires reviewed notice changes and verified form/receipt/recipient settings. Real test authorization remains separate.

At publication, build into a fresh output directory, run route/content checks against that directory and inspect the final artifact. Do not deploy the contaminated workspace `dist` directory described in the candidate report. Record released SHA and previous known-good deployment. Verify the deployed host for unexpected injected scripts/storage without sending an enquiry. Existing broken links/favicon are explicitly recorded for review.
