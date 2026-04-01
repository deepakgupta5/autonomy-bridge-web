export interface NavItem {
  label: string;
  href: string;
}

export const primaryNavItems: NavItem[] = [
  { label: 'Insights', href: '/insights' },
  { label: 'Market Overview', href: '/market-overview' },
  { label: 'Frameworks', href: '/frameworks' },
  { label: 'Methodology', href: '/methodology' },
  { label: 'Advisory', href: '/advisory' },
  { label: 'Bespoke Research', href: '/bespoke-research' },
  { label: 'About', href: '/about' },
];

export const frameworkSlugs = [
  'robotics-roi-model',
  'automation-failure-framework',
  'warehouse-automation-decision-framework',
  'pilot-to-scale-failure-framework',
  'vendor-economics-framework',
  'vendor-evaluation-framework',
  'workflow-architecture-framework',
] as const;
export const insightSlugs = [
  'how-warehouse-robotics-economics-actually-works',
  'why-mid-market-operators-struggle-to-evaluate-warehouse-robotics',
  'how-warehouse-workflows-determine-automation-success',
  'how-warehouse-operators-evaluate-robotics-vendors',
  'why-warehouse-automation-projects-fail',
  'why-robotics-pilots-fail-to-scale',
  'how-retail-distribution-center-automation-economics-actually-work',
] as const;
export const useCaseSlugs = [
  'warehouse-automation-roi-evaluation',
  'robotics-deployment-3pl-warehouses',
  'amr-deployment-evaluation',
  'goods-to-person-system-evaluation',
  'retail-dc-automation-evaluation',
] as const;
export const caseStudySlugs = [
  'automation-deployment-risk-assessment',
  'robotics-market-entry-decision-analysis',
  'ai-robotics-market-sizing-engagement',
  'vendor-deployment-viability-assessment',
  'robotics-pricing-strategy-research',
  'retail-dc-peak-demand-automation-assessment',
] as const;
export const marketOverviewChildSlugs = [
  'industry-landscape',
  'technology-stack',
  'market-drivers',
  'market-segments',
  'key-players',
] as const;
export const glossaryTermSlugs = [
  'removable-labor-share',
  'ramp-risk',
  'capital-recovery-period',
  'labor-displacement-rate',
  'automation-operating-cost',
  'cost-per-unit-processed',
  'integration-cost',
  'total-cost-of-ownership',
  'peak-to-average-ratio',
  'contract-duration-risk',
  'automated-guided-vehicle',
  'pick-station-throughput',
  'autonomous-case-handling',
  'multi-shuttle-system',
  'cobot',
  'mobile-manipulation-robot',
  'system-uptime',
  'throughput-modeling',
  'sku-velocity',
  'dwell-time',
  'order-profile',
  'slotting',
  'inbound-processing-rate',
  'pick-path-optimization',
  'returns-processing-rate',
  'labor-absorption-capacity',
  'vendor-economics',
  'vendor-lock-in',
  'pilot-to-scale-failure',
  'integration-partner',
  'vendor-reference-site',
  'market-penetration-rate',
  'competitive-displacement',
  'workflow-constraint',
  'human-machine-coordination',
  'exception-handling-rate',
  'task-orchestration',
  'digital-twin',
  'edge-computing',
  'computer-vision-reliability',
  'automation-readiness',
  'sensor-fusion',
  'autonomous-decision-threshold',
  'reinforcement-learning-in-robotics',
  'fleet-management-software',
  'ai-inference-latency',
  'autonomous-systems-maturity',
  'process-standardization',
  'autonomous-inventory-management',
  'predictive-maintenance',
  'autonomous-mobile-robot',
  'automated-storage-retrieval-system',
  'goods-to-person-system',
  'warehouse-management-system',
  'warehouse-execution-system',
  'labor-turnover-rate',
  'third-party-logistics',
  'robotics-as-a-service',
  'systems-integrator',
  'peak-labor-cost-avoidance',
  'idle-capital-cost',
  'sortation-volume-floor',
  'labor-intensity-threshold',
  'cold-rated-system-premium',
  'fixed-conveyor-sortation',
  'amr-sortation',
  'omnichannel-workflow-conflict',
  'case-level-picking-economics',
  'freezer-environment-constraint',
  'ambient-benchmark-error',
  'customer-concentration-risk',
  'automation-go-no-go',
] as const;

export const topLevelRoutes = [
  '/',
  '/insights',
  '/market-overview',
  '/frameworks',
  '/use-cases',
  '/case-studies',
  '/methodology',
  '/glossary',
  '/advisory',
  '/bespoke-research',
  '/about',
  '/contact',
  '/privacy-policy',
  '/terms-of-use',
  '/cookie-policy',
  '/sitemap',
] as const;

export const frameworkRoutes = frameworkSlugs.map((slug) => `/frameworks/${slug}`);
export const insightRoutes = insightSlugs.map((slug) => `/insights/${slug}`);
export const useCaseRoutes = useCaseSlugs.map((slug) => `/use-cases/${slug}`);
export const caseStudyRoutes = caseStudySlugs.map((slug) => `/case-studies/${slug}`);
export const marketOverviewChildRoutes = marketOverviewChildSlugs.map((slug) => `/market-overview/${slug}`);
export const glossaryTermRoutes = glossaryTermSlugs.map((slug) => `/glossary/${slug}`);

// Registered URLs for upcoming content — added to sitemap before content files exist.
// Move each slug into its typed array above once the content file is created.
export const pendingContentRoutes = [
  // Insights — Phase 2 ICP Expansion (remaining 3 pending)
  '/insights/why-cold-storage-automation-economics-are-structurally-different',
  '/insights/why-parcel-sortation-automation-breaks-at-low-volume',
  '/insights/why-general-merchandise-3pls-should-not-automate-too-early',
  // Use Cases — Phase 2 ICP Expansion
  '/use-cases/cold-storage-automation-evaluation',
  '/use-cases/parcel-sortation-automation-evaluation',
  '/use-cases/general-merchandise-3pl-automation-evaluation',
  // Case Studies — Phase 2 ICP Expansion
  '/case-studies/cold-storage-automation-economics-assessment',
  '/case-studies/parcel-sortation-volume-sensitivity-analysis',
  '/case-studies/general-merchandise-3pl-premature-automation-assessment',
] as const;

export const allLockedRoutes = [
  ...topLevelRoutes,
  ...frameworkRoutes,
  ...insightRoutes,
  ...useCaseRoutes,
  ...caseStudyRoutes,
  ...marketOverviewChildRoutes,
  ...glossaryTermRoutes,
  ...pendingContentRoutes,
];
