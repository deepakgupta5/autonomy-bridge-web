# Image and Diagram System (Locked)

Last updated: 2026-03-16  
Status: Locked image/diagram contract for restart

## 1) Source and Inclusion Rules
- Ingest only production diagram assets from `Content.zip`.
- Include production framework diagrams only (34 PNGs total).
- Exclude duplicate/junk/internal assets:
  - nested duplicate `Diagrams.zip` (if raw production PNGs are ingested)
  - `__MACOSX/*`
  - `.DS_Store`
  - temporary/system artifacts

## 2) Required Normalized Storage Layout
All framework diagrams must be normalized into:
- `/public/diagrams/frameworks/robotics-roi-model/robotics-roi-model-diagram-01.png`
- `/public/diagrams/frameworks/automation-failure-framework/automation-failure-framework-diagram-01.png` ... `-05.png`
- `/public/diagrams/frameworks/warehouse-automation-decision-framework/warehouse-automation-decision-framework-diagram-01.png` ... `-05.png`
- `/public/diagrams/frameworks/pilot-to-scale-failure-framework/pilot-to-scale-failure-framework-diagram-01.png` ... `-05.png`
- `/public/diagrams/frameworks/vendor-economics-framework/vendor-economics-framework-diagram-01.png` ... `-05.png`
- `/public/diagrams/frameworks/vendor-evaluation-framework/vendor-evaluation-framework-diagram-01.png` ... `-05.png`
- `/public/diagrams/frameworks/workflow-architecture-framework/workflow-architecture-framework-diagram-01.png` ... `-08.png`

## 3) Required Mapping Artifacts
- Runtime map file:
  - `src/data/diagramAssetMap.ts`
- Audit/control file:
  - `docs/revamp/diagram-asset-map.md`

Each mapping record must include:
- original filename
- normalized filename
- framework slug
- diagram order
- caption (if derivable from source filename or appendix)

## 4) Rendering Behavior (Locked)
Diagrams/images must:
- render as bounded inline previews first
- reserve aspect ratio to avoid layout shift
- lazy-load non-critical images
- support click/tap expand to larger view
- use reusable component (`Figure` and/or `ZoomImage`)
- avoid dumping full-size raw PNG inline by default

## 5) Visual Layout Rules
- Inline figure sits within long-form measure (not full-bleed by default).
- Use subtle frame/border/background to separate figure from text.
- Caption is below figure.
- Expanded view must keep image readable on mobile and desktop.

## 6) Performance and Stability Rules
- Non-critical images: `loading="lazy"`.
- Prevent CLS via explicit width/height or aspect-ratio container.
- Reuse normalized assets only; do not reference inconsistent raw filenames in templates.

## 7) Validation Gates
- Exactly 34 normalized diagram files exist in expected directories.
- Every framework has expected diagram count:
  - F1: 1
  - F2: 5
  - F3: 5
  - F4: 5
  - F5: 5
  - F6: 5
  - F7: 8
- `diagramAssetMap` resolves every framework diagram reference.
- No template references legacy raw diagram filenames after normalization.
