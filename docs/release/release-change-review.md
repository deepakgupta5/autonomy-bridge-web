# Prepared release changes — not activated

Current source remains local; PR stays draft/unmerged. Production, DNS, provider settings, analytics and notifications are untouched.

The inactive production branch is now wired in `src/utils/contact-form.ts`. The source-controlled `config/deployment-policy.mjs` selects it only after a reviewed activation change. The runtime additionally checks the exact origin, site UUID, production context and server gate. Local preview mocks and actual service acceptance use separate one-time session markers. Contact Success always remains noindex and direct access remains unconfirmed.

## Concrete activation diff

After account evidence establishes the real target, generate a diff without changing this checkout:

```sh
python3 scripts/prepare-release-patch.py --origin https://autonomybridge.com --site-id VERIFIED_SITE_UUID > /tmp/autonomybridge-release.patch
git apply --check /tmp/autonomybridge-release.patch
```

The origin shown is a candidate, not a verified redirect decision: select the actual approved origin from the script's two allowed existing business hosts. Never guess the site UUID. The command refuses placeholders. Review the resulting patch before applying it at an explicitly authorized publication.

The generated diff changes only:

- Source mode to production, exact site/origin, and `formEnabled: true`.
- Netlify automatic-build ignore removal and `skip_processing: false` for the release form-processing path; dashboard detection still needs verification.

Prepared conditional code then removes the preview banner, uses existing page robots metadata, enables the real form adapter and removes the fixture disclaimer. It does not modify redirects, canonical host values, routes or approved wording. The Google loader/config code has been removed entirely: release activation cannot restore it. Contact Success's explicit noindex overrides ordinary page indexing.

Use `--email-only` when generating the patch to prepare the same content release with the form disabled and the email alternative visible. After activation, emergency email-only fallback is a one-line change from `formEnabled: true` to `false`, followed by an approved rebuild/deploy. This does not remove Netlify's previously registered form or disable cached pages; see the test plan.

Proof permissions/accuracy, privacy/legal/provider/retention facts, actual revision dates and final content approval still require their own reviewed changes. They are intentionally not invented in this technical patch. No private overlay may be used for a production build. Server tokens/settings are never included in a patch.

See `contact-release-test-plan.md` for the single separately authorized post-release enquiry and fallback. Real delivery is not a prerequisite to the content release; no real test is authorized yet.
