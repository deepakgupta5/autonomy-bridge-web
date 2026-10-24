# Repository review: correction candidate follow-up

**Reviewed source:** [`f261e7906af7266fb6bd7b3852164b62e084d310`](https://github.com/deepakgupta5/autonomy-bridge-web/tree/f261e7906af7266fb6bd7b3852164b62e084d310)  
**Review status:** Terms correction and mode-separated verification look correct. One reproducibility guard remains incomplete; rerun the production command after correcting it.

## Required follow-up: cover all source inputs in the exact-commit guard

In `scripts/verify-production-release.py`, `build_inputs` currently covers `src`, `config`, `public`, `scripts`, `astro.config.mjs`, package manifests and `netlify.toml`. The repository also contains these inputs that are omitted:

- `tailwind.config.mjs` and `tsconfig.json`, which can change compilation/output;
- `.nvmrc`, which records the runtime version;
- `netlify/`, including the Contact receipt and form-handling functions that accompany the release.

As written, a dirty or untracked change to an omitted input can pass the guard while the report attributes the result to `HEAD`. Extend the tracked/untracked checks to cover these paths (at minimum `.nvmrc`, `tailwind.config.mjs`, `tsconfig.json`, and the complete `netlify/` tree). Keep the check fail-closed.

Then rerun the authoritative Node 20 production command and its checks, regenerate the production log, JSON, manifest and artifact hash, and update `CORRECTION_RESULT.md` to the new exact tested source. Retain the separate disposable local-preview fixture and its strict pending-date/noindex checks. Verify that clean inputs pass and that a temporary modified/untracked file in each newly covered path is rejected; do not leave test mutations in the branch.

## Accepted in the reviewed source

- The Terms §1 replacement matches the assigned approved offer description; the remainder of the paragraph resumes at “These terms govern website use only.”
- The Terms audit requires the approved text and rejects the stale two-offer text; the negative control includes stale Terms.
- Production verification is separate from the strict local pending-date/noindex fixture, preserves the target/context guard, and records the correct 163/147/158/156 counts and production indexing matrix.
- The reported Node 20 checks and Terms viewport evidence are present.

This follow-up is limited to provenance/reproducibility. Do not alter public copy, routes, Research content, dates, or visual design. No merge, deployment, Netlify account change, form submission, sitemap submission or indexing request is authorized.
