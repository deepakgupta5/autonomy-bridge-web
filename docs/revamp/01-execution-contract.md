# Execution Contract (Restart)

Last updated: 2026-03-16  
Applies to branch: `codex/revamp-restart`

## 1) Working Mode
- Local-first implementation only.
- Remote edits are treated as frozen during revamp execution.
- One file at a time.
- One file audit at a time.
- One block at a time.
- Full line-by-line re-audit after each block before moving forward.
- After each block, stop and report using the locked output contract.

## 2) Non-Negotiable Rules
- Do not redesign architecture.
- Do not change locked URLs or slugs.
- Do not create public `/research`.
- Do not invent business, market, or editorial claims.
- Use only production content and production diagram assets from `Content.zip`.
- Exclude junk/internal artifacts from live site.
- Prefer centralized reusable utilities over page-specific logic.
- Prefer diff-based reviewable edits.

## 3) Canonical and Link Rules
- Root canonical: `/`
- Non-root canonical URLs: no trailing slash
- Internal links: no trailing slash (except root)
- Sitemap: canonical no-trailing-slash URLs only
- Redirect policy: `/path/ -> /path`

## 4) Locked Route Authority
- Locked public route set is defined in `00-master-prd.md`.
- Any path outside the locked set is invalid unless explicitly defined as redirect-only legacy path.
- Legacy slugs must never be canonical pages.

## 5) Content and Schema Rules
- All production entries must normalize to the locked frontmatter model.
- Validation must fail loudly on missing required structural fields.
- Glossary must be generated from `Content/Glossary.md` source into:
  - `/glossary` hub
  - 59 term pages at `/glossary/{term-slug}`
- Market Overview must be hub + five child routes using only source-supported content.

## 6) Drift-Control Procedure
For each changed file:
1. Read full file before editing.
2. Make scoped edit only for current objective.
3. Re-read entire edited file line-by-line.
4. Run validation command(s) tied to the file’s impact.
5. Stop and report results before touching next file.

## 7) Block Completion Output Contract
- Block ID
- Status
- Files created
- Files modified
- Files removed
- Validation run
- Deviations from spec, if any
- Next block

No long narrative in block completion reports.

## 8) Residual Verification Rule
- `_redirects` 301 behavior must be smoke-tested on deployed host.
- Local static build is not sufficient to prove host-level redirect behavior.
