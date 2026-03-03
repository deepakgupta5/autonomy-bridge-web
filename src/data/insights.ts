export type InsightEntry = {
  id: string;
  slug: string;
  title: string;
  description: string;
  keyPoints: string[];
  decisionBoundary: string;
};

export const insights: InsightEntry[] = [
  {
    id: "raas-market",
    slug: "raas-market",
    title: "The Robotics-as-a-Service Market: Size, Structure, and Adoption Barriers",
    description:
      "Definition-heavy analysis of the Robotics-as-a-Service market, deployable market sizing filters, unit economics thresholds, and adoption barriers.",
    keyPoints: [
      "Deployable SOM compresses after integration and governance filters are applied.",
      "RaaS economics depend on utilization, service-cost stability, and churn tolerance.",
      "Pilot metrics must include governance readiness, not only technical uptime.",
    ],
    decisionBoundary:
      "RaaS viability depends on deployable density and governance readiness more than TAM magnitude.",
  },
  {
    id: "pilot-failure",
    slug: "why-pilots-fail",
    title: "Why Most Enterprise Robotics Pilots Never Reach Production",
    description:
      "Analysis of pilot-to-production failure patterns, stakeholder veto pathways, and conversion requirements in enterprise robotics buying cycles.",
    keyPoints: [
      "Pilot success and production readiness are separate thresholds.",
      "Most failures occur in governance gates such as security, procurement, and safety.",
      "Conversion improves when approval pathways are defined before pilot launch.",
    ],
    decisionBoundary:
      "Increasing pilot volume does not increase production probability unless governance pathway is embedded into pilot design.",
  },
  {
    id: "enterprise-buying",
    slug: "industrial-automation-buying",
    title: "How Enterprises Actually Buy Industrial Automation",
    description:
      "Breakdown of budget ownership, committee sequencing, and procurement constraints in industrial automation purchase decisions.",
    keyPoints: [
      "Approval sequence includes operations, finance, IT/security, procurement, and compliance.",
      "Undefined ROI language fails committee-level validation.",
      "GTM must align to approval order, not individual champion enthusiasm.",
    ],
    decisionBoundary:
      "GTM motion must align to approval sequence, not individual champion enthusiasm.",
  },
  {
    id: "pricing-ai",
    slug: "pricing-ai-robotics",
    title: "Pricing AI and Robotics Products: Why Hardware Logic Breaks Down",
    description:
      "Evaluation of capex, subscription, and RaaS pricing architectures under budget-owner and accounting constraints.",
    keyPoints: [
      "Budget classification frequently determines pricing viability more than buyer preference.",
      "Subscription models fail when churn, service cost, or utilization assumptions break.",
      "Pricing architecture must map to enterprise finance realities, not revenue optics.",
    ],
    decisionBoundary:
      "Pricing architecture must align to budget ownership and accounting treatment, not investor revenue optics.",
  },
  {
    id: "market-sizing",
    slug: "market-sizing-ai-automation",
    title: "Market Sizing AI and Automation Without Overstating Demand",
    description:
      "Framework for realistic TAM, SAM, and SOM modeling using deployability filters and assumption hygiene.",
    keyPoints: [
      "Top-down TAM often overstates opportunity by ignoring integration and governance constraints.",
      "Credible SOM requires site-level qualification, budget validation, and sales-motion fit.",
      "Explicit assumption documentation is required for decision-grade market models.",
    ],
    decisionBoundary:
      "Capital allocation should anchor to SOM realism, not TAM magnitude.",
  },
  {
    id: "kill-signals",
    slug: "kill-the-idea",
    title: "When Market Research Should Kill a Product Idea",
    description:
      "Signals for distinguishing fixable execution gaps from structural non-viability in commercialization decisions.",
    keyPoints: [
      "Some market constraints are structural and do not improve through iteration.",
      "No-Go calls are justified when economics fail under conservative assumptions.",
      "Research should explicitly separate iteration risk from non-viability risk.",
    ],
    decisionBoundary:
      "No-Go is justified when structural constraints persist after assumption stress testing.",
  },
  {
    id: "icp-definition",
    slug: "icp-not-a-persona",
    title: "ICP Is Not a Persona: Enterprise SaaS Misclassification",
    description:
      "Clarifies ICP as organization-level deployability criteria rather than persona-level engagement traits.",
    keyPoints: [
      "Valid ICP requires budget ownership, manageable governance, and integration fit.",
      "Personas describe people; ICP defines organization-level deployment conditions.",
      "Interest without deployability creates false pipeline signal.",
    ],
    decisionBoundary:
      "ICP definition must filter for structural deployability, not engagement volume.",
  },
  {
    id: "pilot-production",
    slug: "missing-middle-gtm",
    title: "Pilot-to-Production: The Missing Middle in Enterprise GTM",
    description:
      "Analysis of conversion gaps between pilot success and scalable rollout in enterprise AI and automation GTM motions.",
    keyPoints: [
      "Pilot count without conversion criteria creates false progress signals.",
      "Scale readiness requires executive sponsorship, procurement design, and compliance pre-work.",
      "Investment should follow validated conversion mechanics, not pilot volume.",
    ],
    decisionBoundary:
      "Scale investment should follow conversion validation, not pilot volume.",
  },
];
