# Home visual direction — awaiting approval

Scope: Home only, including a Home-specific header variant. Other core pages and research compositions await approval of this direction.

The earlier layout stacked both services and buried the first enquiry action; repeated text sections lacked distinction and the mobile header occupied three rows. The revision pairs a display headline with introduction/action, gives both services equal columns, groups experience in a restrained band, aligns service questions beside explanations and proof, reduces research prominence and closes with a navy enquiry section. Mobile uses sequential blocks and a native details/summary menu. Existing palette and fonts are retained; no stock imagery, animation or gradients were added.

Approved Home wording was checked against the previous commit; only markup and CTA placement changed. Other replacement-page data is unchanged. The private overlay was regenerated from current public markup and all 18 selected paragraphs were verified in localhost responses against V2. Full-copy screenshots stay in ignored `.preview-private/home-design/`; do not upload them to the public PR.

## Verification

- Build passed: 160 pages. Baseline route audit passed: 147 retained research pages, 158 HTML sitemap destinations, 156 XML destinations; only the eight historical broken destinations remain.
- Home visually inspected at 1440, 768 and 390 pixels; no horizontal overflow at those widths. Desktop and mobile full-page screenshots captured before/after. Mobile menu opens/closes with Enter; Tab reaches the first link with a visible 3px focus outline. Menu links are approximately 50px high.
- Main text contrast against page background: 17.06:1; secondary text 9.90:1; muted text 7.24:1. Secondary text on experience surface 9.45:1. Existing amber focus outline on white 3.19:1. Closing action uses inverse navy/page colours.
- Home enquiry action reaches Contact. Mobile Contact labels, 16px fields, focus and required-field errors inspected with an empty submission: no transport or notification sent. Full prior simulated submission-state suite was not rerun for this Home-only change.
- Preview robots remain noindex,nofollow; production build guard, disabled analytics, disabled real form transport and deployment safeguards remain unchanged.

## Local review

The running full-copy preview is http://127.0.0.1:4321/ . Refresh Home, review at desktop width, then narrow to tablet/mobile and open Menu. Scroll through both service explanations, experience/proof, working approach, research and final enquiry. Follow the enquiry button to inspect the existing Contact form.

If restarting, from the repository root use Node 20:

```sh
python3 scripts/import-private-proof.py /Users/deepakgupta/Downloads/AutonomyBridge_Website_Copy_and_Data_v2.zip
AB_PRIVATE_PREVIEW=1 npm run dev -- --host 127.0.0.1
```

No publication approval is implied. Proof permissions, legal/provider/tracking facts, revision dates and real form acceptance/delivery remain unresolved. PR #1 stays draft and unmerged.
