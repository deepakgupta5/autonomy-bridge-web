# Website Build + Launch Checklist (No-Rework Standard)

## 1) Scope Lock (Before Any Coding)
- [ ] One master spec exists and is marked as the highest-priority source.
- [ ] Route map is frozen (all public URLs + slugs + canonical policy).
- [ ] Canonical URL policy is frozen (trailing slash behavior, redirects, sitemap rules).
- [ ] Nav and footer information architecture is frozen (order + labels + links).
- [ ] Explicit exclusions are frozen (what must not be created or exposed).
- [ ] Block sequence is frozen (what is in each block and what is not).

## 2) Content Control (Before Implementation)
- [ ] Production content pack is finalized and checksum-recorded.
- [ ] Content freeze window is declared (no parallel edits during migration).
- [ ] Duplicate artifacts are identified and moved to archive/non-runtime folders.
- [ ] Non-production files are excluded (`__MACOSX`, `.DS_Store`, temp docs, nested zips, audit-only files).
- [ ] Every content file has a canonical source of truth and owner.

## 3) Repository Hygiene (Before Block Work)
- [ ] Work starts on a dedicated branch (`codex/...`) only.
- [ ] Legacy/duplicate runtime routes are removed or quarantined before build.
- [ ] One route file per public URL (no `* 2.astro`, `* 3.md`, etc. in runtime paths).
- [ ] Build passes cleanly before beginning major page/template changes.

## 4) Schema + Collections Guardrails
- [ ] Collections are locked and match the spec exactly.
- [ ] Required frontmatter fields are validated with fail-loud schema checks.
- [ ] Nested source fields are normalized at render/ingestion time, not hand-copied ad hoc.
- [ ] Legacy slug map exists and resolves only to canonical slug targets.
- [ ] Canonical path uniqueness is enforced (no duplicate canonical entries).

## 5) Rendering Discipline
- [ ] Source text is preserved verbatim when required.
- [ ] Rendering transforms are done at runtime (no source mutation for styling).
- [ ] Reusable renderer/components are used for recurring analytical patterns.
- [ ] Page-level overrides are minimized; shared typographic system is used.
- [ ] No page ships as a raw markdown dump if structured rendering is required.

## 6) SEO + Citation Integrity
- [ ] Canonical tags match locked canonical paths (no trailing slash drift).
- [ ] Sitemap emits canonical URLs only.
- [ ] Robots/meta values are sourced from locked metadata policy.
- [ ] IDs/anchors/citations remain unchanged during render transforms.
- [ ] Structured data is centralized and deterministic.

## 7) Redirect and URL Safety
- [ ] Legacy URLs are redirect-only (301), never canonical pages.
- [ ] `/path/ -> /path` behavior is tested on host (not only local build).
- [ ] Internal links are no-trailing-slash (except root).
- [ ] No duplicate crawl paths for the same content.

## 8) QA Gate per Block (Definition of Done)
- [ ] File-by-file audit completed for all files touched in the block.
- [ ] Full build green.
- [ ] Locked routes resolve.
- [ ] Nav/footer/breadcrumb/local-subnav match locked architecture.
- [ ] Canonical + sitemap + redirects match policy.
- [ ] No appendix junk or raw internal audit content leaked to page body.
- [ ] Block report logged (created/modified/removed/validation/deviations/next block).

## 9) Pre-Deploy Freeze Gate
- [ ] Remote edits are frozen before production deploy.
- [ ] Final diff reviewed against locked spec.
- [ ] Host-specific behavior smoke-tested in preview/prod environment.
- [ ] Rollback point (previous deploy ID/commit) captured.

## 10) Deploy + Post-Deploy Verification
- [ ] Production deploy completed and deploy ID saved.
- [ ] Critical URLs manually checked on production.
- [ ] Canonical tags, sitemap, and redirects spot-verified live.
- [ ] Any residual non-code verification tasks are recorded (owner + due date).

## 11) Change Request Protocol (To Prevent Drift)
- [ ] New requests are appended to one active master spec (not scattered prompts).
- [ ] Conflicts are resolved before implementation starts.
- [ ] Any new requirement states: block target, impacted files, acceptance criteria.
- [ ] Work pauses if instruction conflicts are detected until resolved.
