---
title: "Customer Concentration Risk"
term: "Customer Concentration Risk"
termId: "T71"
slug: "customer-concentration-risk"
description: "The utilization exposure created when a small number of customers generate a disproportionate share of throughput volume, such that a single exit pushes volume below the capital recovery threshold."
summary: "The utilization exposure created when a small number of customers generate a disproportionate share of throughput volume, such that a single exit pushes volume below the capital recovery threshold. Customer concentration risk is the primary…"
definition: "The utilization exposure created when a small number of customers generate a disproportionate share of throughput volume, such that a single exit pushes volume below the capital recovery threshold."
glossaryCategory: "deployment-economics"
contentType: "glossary"
status: "published"
canonicalPath: "/glossary/customer-concentration-risk"
seoTitle: "Customer Concentration Risk | Autonomy Bridge Glossary"
seoDescription: "The utilization exposure created when a small number of customers generate a disproportionate share of throughput volume, such that a single exit pushes volume below the capital recovery threshold."
keywords:
  - "glossary"
  - "Deployment Economics"
frameworks:
  - "robotics-roi-model"
  - "automation-failure-framework"
topics: []
industries: []
technologies: []
relatedGlossary:
  - "sortation-volume-floor"
  - "contract-duration-risk"
  - "capital-recovery-period"
relatedUseCases: []
relatedCaseStudies: []
relatedInsights: []
relatedPages:
  - "/glossary/sortation-volume-floor"
  - "/glossary/contract-duration-risk"
  - "/glossary/capital-recovery-period"
draft: false
documentId: "doc_glossary_term_t71"
authors:
  - "Deepak Gupta"
datePublished: "2026-03-30"
dateModified: "2026-03-30"
structuredDataType: "DefinedTerm"
migration:
  sourceFilename: "Glossary.md"
  aipmVersion: "1.0"
---

The utilization exposure created when a small number of customers generate a disproportionate share of throughput volume, such that a single exit pushes volume below the capital recovery threshold.

Customer concentration risk is the primary structural vulnerability in 3PL and multi-client sortation automation. When a single customer accounts for 30–50% of total throughput, the capital recovery model for the automation system is implicitly underwritten by that customer's continued volume. A contract non-renewal, volume reduction, or customer business failure directly degrades system utilization — potentially below the floor required for capital recovery viability. This risk compounds with contract duration risk: a customer on a short-term agreement who generates high throughput concentration creates both a near-term exit probability and a severe utilization consequence if that exit occurs. Automation investment decisions in 3PL environments should stress-test capital recovery scenarios against realistic customer attrition scenarios, not just contracted volume — and should evaluate whether the automation architecture can redistribute displaced capacity to alternative customers or segments if concentration risk materializes.

**Related terms:** [sortation-volume-floor](/glossary/sortation-volume-floor) · [contract-duration-risk](/glossary/contract-duration-risk) · [capital-recovery-period](/glossary/capital-recovery-period)

---
