# Owner date correction provenance

The owner first specified `2026-03-01` as the Research revision date in `RELEASE_DATE_AND_VERIFICATION.md`. In this task, the owner separately confirmed `2026-03-01` for the site publication date, Terms and Cookie notices, and Methodology. These are separate date fields even though their approved values are equal.

The owner also corrected Methodology's original publication date from `2026-03-15` to `2026-03-01`. When the executor found that all 86 materially revised Research routes had later source metadata, the owner explicitly directed correction of all 86 routes' created, published and updated source dates and any visible source-date records to `2026-03-01`. This instruction supersedes the earlier handoff's preservation of those particular source-date values. It does not authorize changing dates in unrelated Research sources, analytical text or citations.

[`DATE_SOURCE_CORRECTIONS.json`](DATE_SOURCE_CORRECTIONS.json) records the 87 affected source files, each changed field and before/after SHA-256. The owner supplied the corrections; this repository review does not independently establish a historical publication record for those dates. `scripts/verify-owner-date-diff.py` checks that only date metadata and explicit provenance lines changed in those Research sources and that the active Methodology page changed only its visible publication date.

The local-mode build remains publication-pending and noindex. A separate production-mode source commit and build evidence are required before owner release authorization. No merge or deployment is implied by the date correction.
