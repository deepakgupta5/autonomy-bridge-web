# Diagram Asset Map (Normalized)

Last updated: 2026-03-16  
Status: Populated in Block 09 from production assets in `Content.zip`

## 1) Source Rules
- Source pack: `Content.zip`
- Primary source folder: `Content/Frameworks Diagrams/`
- Excluded from ingestion: `__MACOSX/*`, `.DS_Store`, nested duplicate `Content/Diagrams.zip`, temporary files

## 2) Normalized Target Paths
- Base path: `/public/diagrams/frameworks/{framework-slug}/{framework-slug}-diagram-XX.png`
- Runtime map: `src/data/diagramAssetMap.ts`

## 3) Expected Framework Counts (Validated)
- `robotics-roi-model`: 1
- `automation-failure-framework`: 5
- `warehouse-automation-decision-framework`: 5
- `pilot-to-scale-failure-framework`: 5
- `vendor-economics-framework`: 5
- `vendor-evaluation-framework`: 5
- `workflow-architecture-framework`: 8

Total normalized diagrams: 34

## 4) Mapping Table
| originalFilename | normalizedFilename | frameworkSlug | diagramOrder | caption | notes |
|---|---|---|---:|---|---|
| 2.1_Automation Failure Mechanism Model.png | automation-failure-framework-diagram-01.png | automation-failure-framework | 1 | Automation Failure Mechanism Model | production source |
| 2.2_Utilization Risk Curve for Warehouse Automation.png | automation-failure-framework-diagram-02.png | automation-failure-framework | 2 | Utilization Risk Curve for Warehouse Automation | production source |
| 2.3_Fulfillment Workflow Bottleneck Models.png | automation-failure-framework-diagram-03.png | automation-failure-framework | 3 | Fulfillment Workflow Bottleneck Models | production source |
| 2.4_Automation Failure Risk Categories.png | automation-failure-framework-diagram-04.png | automation-failure-framework | 4 | Automation Failure Risk Categories | production source |
| 2.5_Warehouse Automation Deployment Risk Screen.png | automation-failure-framework-diagram-05.png | automation-failure-framework | 5 | Warehouse Automation Deployment Risk Screen | production source |
| 4.1_Pilot-to-Scale Performance Breakdown.png | pilot-to-scale-failure-framework-diagram-01.png | pilot-to-scale-failure-framework | 1 | Pilot-to-Scale Performance Breakdown | production source |
| 4.2_Pilot Environment vs Full Deployment Architecture.png | pilot-to-scale-failure-framework-diagram-02.png | pilot-to-scale-failure-framework | 2 | Pilot Environment vs Full Deployment Architecture | production source |
| 4.3_Robot Density vs Throughput.png | pilot-to-scale-failure-framework-diagram-03.png | pilot-to-scale-failure-framework | 3 | Robot Density vs Throughput | production source |
| 4.4_Warehouse Robotics Orchestration Architecture.png | pilot-to-scale-failure-framework-diagram-04.png | pilot-to-scale-failure-framework | 4 | Warehouse Robotics Orchestration Architecture | production source |
| 4.5_Robot Fleet Interaction Across Warehouse Workflows.png | pilot-to-scale-failure-framework-diagram-05.png | pilot-to-scale-failure-framework | 5 | Robot Fleet Interaction Across Warehouse Workflows | production source |
| 1_robotics payback economics framework.png | robotics-roi-model-diagram-01.png | robotics-roi-model | 1 | robotics payback economics framework | production source |
| 5.1_Pricing Structure Comparison.png | vendor-economics-framework-diagram-01.png | vendor-economics-framework | 1 | Pricing Structure Comparison | production source |
| 5.2_Vendor Pricing Structure Impact on Automation Economics.png | vendor-economics-framework-diagram-02.png | vendor-economics-framework | 2 | Vendor Pricing Structure Impact on Automation Economics | production source |
| 5.3_Warehouse Robotics Vendor Pricing Model Selection.png | vendor-economics-framework-diagram-03.png | vendor-economics-framework | 3 | Warehouse Robotics Vendor Pricing Model Selection | production source |
| 5.4_Automation Pricing Economics Variable Relationships.png | vendor-economics-framework-diagram-04.png | vendor-economics-framework | 4 | Automation Pricing Economics Variable Relationships | production source |
| 5.5_Robotics Interaction in Fulfillment Warehouse Operations.png | vendor-economics-framework-diagram-05.png | vendor-economics-framework | 5 | Robotics Interaction in Fulfillment Warehouse Operations | production source |
| 6.1_Vendor Deployment Viability Evaluation Process.png | vendor-evaluation-framework-diagram-01.png | vendor-evaluation-framework | 1 | Vendor Deployment Viability Evaluation Process | production source |
| 6.2_Warehouse Robotics System Architecture.png | vendor-evaluation-framework-diagram-02.png | vendor-evaluation-framework | 2 | Warehouse Robotics System Architecture | production source |
| 6.3_Robotics Deployment Risk Landscape.png | vendor-evaluation-framework-diagram-03.png | vendor-evaluation-framework | 3 | Robotics Deployment Risk Landscape | production source |
| 6.4_Vendor Capability vs Operational Fit Analysis.png | vendor-evaluation-framework-diagram-04.png | vendor-evaluation-framework | 4 | Vendor Capability vs Operational Fit Analysis | production source |
| 6.5_Warehouse Robotics Vendor Comparison Matrix.png | vendor-evaluation-framework-diagram-05.png | vendor-evaluation-framework | 5 | Warehouse Robotics Vendor Comparison Matrix | production source |
| 3.1_Warehouse Automation Decision Framework.png | warehouse-automation-decision-framework-diagram-01.png | warehouse-automation-decision-framework | 1 | Warehouse Automation Decision Framework | production source |
| 3.2_Warehouse Order Fulfillment Workflow.png | warehouse-automation-decision-framework-diagram-02.png | warehouse-automation-decision-framework | 2 | Warehouse Order Fulfillment Workflow | production source |
| 3.3_Warehouse Automation Economic Model.png | warehouse-automation-decision-framework-diagram-03.png | warehouse-automation-decision-framework | 3 | Warehouse Automation Economic Model | production source |
| 3.4_Key Variables in Warehouse Automation.png | warehouse-automation-decision-framework-diagram-04.png | warehouse-automation-decision-framework | 4 | Key Variables in Warehouse Automation | production source |
| 3.5_Warehouse Automation Deployment Risk Structure.png | warehouse-automation-decision-framework-diagram-05.png | warehouse-automation-decision-framework | 5 | Warehouse Automation Deployment Risk Structure | production source |
| 7.1_warehouse order fulfillment process.png | workflow-architecture-framework-diagram-01.png | workflow-architecture-framework | 1 | warehouse order fulfillment process | production source |
| 7.2_Workflow Compatibility Model for Warehouse Robotics.png | workflow-architecture-framework-diagram-02.png | workflow-architecture-framework | 2 | Workflow Compatibility Model for Warehouse Robotics | production source |
| 7.3_warehouse workflow architecture.png | workflow-architecture-framework-diagram-03.png | workflow-architecture-framework | 3 | warehouse workflow architecture | production source |
| 7.4_warehouse labor time splits.png | workflow-architecture-framework-diagram-04.png | workflow-architecture-framework | 4 | warehouse labor time splits | production source |
| 7.5_SKU velocity distribution in warehouses.png | workflow-architecture-framework-diagram-05.png | workflow-architecture-framework | 5 | SKU velocity distribution in warehouses | production source |
| 7.6_Task Density vs Robot Productivity.png | workflow-architecture-framework-diagram-06.png | workflow-architecture-framework | 6 | Task Density vs Robot Productivity | production source |
| 7.7_Robot Fleet Size vs System Throughput.png | workflow-architecture-framework-diagram-07.png | workflow-architecture-framework | 7 | Robot Fleet Size vs System Throughput | production source |
| 7.8_Hybrid Warehouse Workflow.png | workflow-architecture-framework-diagram-08.png | workflow-architecture-framework | 8 | Hybrid Warehouse Workflow | production source |

## 5) Validation Gates
- 34 mapping rows populated and matched to 34 normalized PNG files.
- `src/data/diagramAssetMap.ts` entries match this table.
- No legacy raw diagram filenames are referenced by normalized framework paths.
