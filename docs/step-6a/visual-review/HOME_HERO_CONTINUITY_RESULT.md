# Home hero continuity review

**Tested source commit:** `6649b57680582b07d12a3244e34d09d88628137f`

The Home hero now uses two columns at desktop widths: the approved H1 on the left, with the approved introduction and existing CTA on the right. At the existing 800 px breakpoint it returns to a single column, keeping H1, introduction and CTA in reading order. The change is scoped to `.approved-home .approved-hero` in `src/styles/approved-pages.css`; no copy, font family, colors, other pages or Step 7 documents changed.

## Visual checks

Screenshots were captured from an isolated local-mode build on loopback. The build displayed the yellow local review notice and marked all 163 pages `noindex,nofollow`.

| Viewport | Hero layout | Measurements and review |
| --- | --- | --- |
| 1423 × 1000 | Two columns | Columns measured 570 px / 518 px. H1 and lead start at the same vertical position; CTA is visible. No horizontal overflow. |
| 1024 × 900 | Two columns | Columns measured 476 px / 433 px. H1 and lead heights are 252 px / 248 px; CTA is visible. No horizontal overflow. |
| 400 × 850 | Stacked | H1, lead and CTA appear in reading order. CTA is visible above the next section. Document width is 400 px. |
| 320 × 850 | Stacked | H1, lead and CTA appear in reading order. CTA ends at 714 px and remains visible. Document width is 320 px. |

The 1423 px desktop hero composition was compared with the current live homepage. The live page still shows the older headline and copy; it was used only as a layout reference. The candidate keeps the approved Home wording.

## Screenshots

- [Local candidate, 1423 px](home-hero/home-hero-1423.png)
- [Local candidate, 1024 px](home-hero/home-hero-1024.png)
- [Local candidate, 400 px](home-hero/home-hero-400.png)
- [Local candidate, 320 px](home-hero/home-hero-320.png)
- [Live layout reference, 1423 px](home-hero/home-hero-live-reference-1423.png)

## Verification

- The isolated local preview fixture passed for 86 pending Research routes; all 163 pages remained `noindex`.
- The guarded Node 20 production verifier passed all 11 checks, including build, route verification, Step 6A audit and negative controls, date checks, release gates, offline Contact checks and artifact hashing.
- The production artifact contains no local review notice; the local preview artifact contains it.

Machine-readable build evidence is in `docs/independent-review/verification/production.json` and `preview-fixture.json`. No form was submitted. No site deployment, merge, Netlify setting change, sitemap submission or indexing request occurred.
