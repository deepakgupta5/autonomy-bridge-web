# SEO & AI Citation Optimization — Session Log

**Project:** autonomybridge.com
**Session Date:** 2026-03-22
**Operator:** Deepak Gupta
**Tool:** Claude (Sonnet 4.6), Claude Code

---

## Scope & Brief

Optimize all `.md` content files under `Documents/Autonomy Bridge/Website/Content/` for:

1. **AI Citation Readiness (GEO Standards)** — claim-source pairing, entity clarity, answer-dense structure, structured data signals, no vague language
2. **SEO Technical Standards** — H1/H2 keyword placement, heading hierarchy, sentence length ≤25 words, internal linking placeholders, meta descriptions
3. **Content Quality Signals (E-E-A-T)** — author expertise signals, first-hand experience, source attribution format: `(Source: Name, Year)`

**Approach:** Surgical enhancement only — no full rewrites. Preserve all factual content, core message, author voice, and intent.

**Exempt files:** `privacy-policy.md`, `terms-of-use.md`, `cookie-policy.md`
**Already optimised:** `homepage.md`

---

## Execution Order

| # | File | Status |
|---|------|--------|
| 1 | `market-overview.md` | ✅ Complete |
| 2 | `frameworks-hub.md` | ✅ Complete (user-enhanced in session) |
| 3 | `Framework_1_Robotics_ROI_Model.md` | Pending |
| 4 | `Framework_2_Automation_Failure_Framework.md` | Pending |
| 5 | `Framework_3_Warehouse_Automation_Decision_Framework.md` | Pending |
| 6 | `Framework_4_Pilot_to_Scale_Failure_Framework.md` | Pending |
| 7 | `Framework_5_Vendor_Economics_Framework.md` | Pending |
| 8 | `Framework_6_Vendor_Evaluation_Framework.md` | Pending |
| 9 | `Framework_7_Workflow_Architecture_Framework.md` | Pending |
| 10 | `insights_why-warehouse-automation-projects-fail.md` | Pending |
| 11 | `why-robotics-pilots-fail-to-scale.md` | Pending |
| 12 | `why-mid-market-operators-struggle-warehouse-robotics.md` | Pending |
| 13 | `insights_how-warehouse-robotics-economics-actually-works.md` | Pending |
| 14 | `insights_how-warehouse-workflows-determine-automation-success.md` | Pending |
| 15 | `insights_how-warehouse-operators-evaluate-robotics-vendors.md` | Pending |
| 16 | `insights-hub.md` | Pending |
| 17 | `use-cases-hub.md` | Pending |
| 18–21 | 4 use-case child pages | Pending |
| 22 | `case-studies-hub.md` | Pending |
| 23–27 | 5 case study child pages (`cs1`–`cs5`) | Pending |
| 28 | `Glossary.md` | Pending |
| 29 | `methodology.md` | Pending |
| 30 | `advisory.md` | Pending |
| 31 | `bespoke-research.md` | Pending |
| 32 | `about.md` | Pending |
| 33 | `contact.md` | Pending |

---

## Changes Made This Session

### File 1: `market-overview.md`

**Round 1 changes:**
- Fixed duplicate H1 — `# Subsection Pages` corrected to `## Subsection Pages` (critical SEO structural fix)
- Broke up 3 sentences exceeding 30 words in the opening 150 words (AI citation extractability)
- Added `[AUTHOR NOTE:]` placeholder after H1 (E-E-A-T)
- Replaced "some markets" with "key logistics markets" (vague language)

**Round 2 changes (per user direction):**
- YAML frontmatter: updated author `name` to "Deepak Gupta", added `url: https://www.linkedin.com/in/deepakgupta5`
- JSON-LD schema: updated `author.name` to "Deepak Gupta", added `sameAs: https://www.linkedin.com/in/deepakgupta5`
- Added `(Source: Autonomy Bridge proprietary analysis, 2024)` to three unsourced statistics:
  - "35–50% annually" warehouse turnover rate
  - "$2–5M capital expenditure / 12–18 months" pre-2021 baseline
- Added `[INTERNAL LINK:]` placeholders at first occurrence of key terms:
  - `[INTERNAL LINK: Glossary — RaaS]` after RaaS first use (Industry Landscape)
  - `[INTERNAL LINK: Glossary — AMR]` after AMR first use (Technology Stack)
  - `[INTERNAL LINK: Glossary — ASRS]` after ASRS first use (Technology Stack)
  - `[INTERNAL LINK: Glossary — WMS]` after WMS first use (Technology Stack)
  - `[INTERNAL LINK: Glossary — WES]` — pending (WES placeholder still to be added to Technology Stack)

**Flagged gaps (not invented — awaiting source confirmation):**
- "60–90 days" modular AMR deployment timeline — needs external source
- No `[INTERNAL LINK: Glossary — WES]` added yet — pending continuation
- No `[INTERNAL LINK: Glossary — Systems Integrator]` added yet — pending continuation

---

### File 2: `frameworks-hub.md`

Enhanced by user/operator directly in session. Key upgrades applied:
- Author updated to `Deepak Gupta`, role `Founder & Principal Analyst, Autonomy Bridge`
- `schema.additionalType: FAQPage` added alongside `DefinedTermSet`
- `sections` list updated to include `faq` section
- All 7 framework entries updated with:
  - Inline glossary links (e.g. `[removable labor share](/glossary/removable-labor-share)`)
  - Structured `Primary content connections` using live URL paths
  - `(Autonomy Bridge proprietary analysis, 2026)` attribution on each "What it solves" block
- New `## Frequently Asked Questions {#faq}` section added with 4 Q&A blocks (GEO/AI citation optimised)
- JSON-LD schema upgraded to dual-type `["DefinedTermSet", "FAQPage"]` with:
  - Full `mainEntity` FAQ block
  - `speakable` specification targeting `#positioning` and `#faq`
  - `author` block with `jobTitle`, `worksFor`, `url`, `sameAs` (LinkedIn)
  - `publisher` block with `sameAs` (LinkedIn company + Twitter)
- Navigation breadcrumb line added: `[INTERNAL LINK: /] · [INTERNAL LINK: /market-overview] · [INTERNAL LINK: /glossary]`
- `Metadata Snapshot` updated with author, schema type, section count

---

## Standing Rules Established This Session

These rules apply to ALL remaining files:

1. **Author field** — always update to `Deepak Gupta` with `sameAs: https://www.linkedin.com/in/deepakgupta5` in JSON-LD schema
2. **Proprietary statistics** — add `(Source: Autonomy Bridge proprietary analysis, 2024)` to any unsourced claim or internal data point
3. **[INTERNAL LINK:]** — add placeholders at first occurrence of: AMR, ASRS, WMS, WES, RaaS, Systems Integrator, and any Framework page reference
4. **No full rewrites** — surgical enhancement only
5. **Do not proceed to next file without user approval**

---

## Files Included in This Folder

| File | Description |
|------|-------------|
| `market-overview.md` | Enhanced version — Market Overview landing page |
| `frameworks-hub.md` | Enhanced version — Frameworks hub index page |
| `conversation-log.md` | This session log |

---

*Session ongoing. Remaining 31 files to be processed in subsequent sessions.*
