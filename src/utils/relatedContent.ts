import {
  caseStudySlugs,
  frameworkSlugs,
  glossaryTermSlugs,
  insightSlugs,
  marketOverviewChildSlugs,
  useCaseSlugs,
} from "../data/ia";
import { formatSlugLabel } from "./slugLabel";

type FrameworkSlug = (typeof frameworkSlugs)[number];
type InsightSlug = (typeof insightSlugs)[number];
type UseCaseSlug = (typeof useCaseSlugs)[number];
type CaseStudySlug = (typeof caseStudySlugs)[number];
type GlossarySlug = (typeof glossaryTermSlugs)[number];

export type RelatedContentType =
  | "frameworks"
  | "insights"
  | "useCases"
  | "caseStudies"
  | "marketOverview"
  | "glossary";

interface RelationshipSeed {
  relatedInsights: InsightSlug[];
  relatedUseCases: UseCaseSlug[];
  relatedCaseStudies: CaseStudySlug[];
}

interface RelatedContentNode {
  title: string;
  slug: string;
  canonicalPath: string;
  contentType: RelatedContentType;
  frameworks: FrameworkSlug[];
  topics: string[];
  industries: string[];
  technologies: string[];
  relatedGlossary: GlossarySlug[];
  relatedUseCases: UseCaseSlug[];
  relatedCaseStudies: CaseStudySlug[];
  relatedInsights: InsightSlug[];
  isHub: boolean;
  order: number;
}

export interface RelatedContentLink {
  title: string;
  canonicalPath: string;
  contentType: RelatedContentType;
  slug: string;
  reason:
    | "explicit"
    | "shared-framework"
    | "shared-topic"
    | "shared-technology"
    | "shared-industry"
    | "hub-parent"
    | "hub-surfacing"
    | "semantic-framework"
    | "semantic-glossary";
}

export interface RelatedContentContext {
  current: RelatedContentNode | null;
  upwardHub: RelatedContentLink | null;
  lateralRelated: RelatedContentLink[];
  downwardHubAssets: RelatedContentLink[];
  semanticFrameworkLinks: RelatedContentLink[];
  semanticGlossaryLinks: RelatedContentLink[];
}

const frameworkRelationshipSeed: Record<FrameworkSlug, RelationshipSeed> = {
  "robotics-roi-model": {
    relatedInsights: [
      "how-warehouse-robotics-economics-actually-works",
      "how-warehouse-workflows-determine-automation-success",
      "why-mid-market-operators-struggle-to-evaluate-warehouse-robotics",
      "why-robotics-pilots-fail-to-scale",
      "why-warehouse-automation-projects-fail",
      "how-warehouse-operators-evaluate-robotics-vendors",
    ],
    relatedUseCases: [
      "warehouse-automation-roi-evaluation",
      "robotics-deployment-3pl-warehouses",
      "amr-deployment-evaluation",
    ],
    relatedCaseStudies: [
      "automation-deployment-risk-assessment",
      "vendor-deployment-viability-assessment",
      "robotics-pricing-strategy-research",
    ],
  },
  "automation-failure-framework": {
    relatedInsights: [
      "why-warehouse-automation-projects-fail",
      "how-warehouse-robotics-economics-actually-works",
      "how-warehouse-workflows-determine-automation-success",
    ],
    relatedUseCases: [
      "warehouse-automation-roi-evaluation",
      "robotics-deployment-3pl-warehouses",
    ],
    relatedCaseStudies: [
      "automation-deployment-risk-assessment",
      "vendor-deployment-viability-assessment",
    ],
  },
  "warehouse-automation-decision-framework": {
    relatedInsights: [
      "why-mid-market-operators-struggle-to-evaluate-warehouse-robotics",
      "how-warehouse-operators-evaluate-robotics-vendors",
    ],
    relatedUseCases: ["goods-to-person-system-evaluation"],
    relatedCaseStudies: [
      "robotics-market-entry-decision-analysis",
      "ai-robotics-market-sizing-engagement",
    ],
  },
  "pilot-to-scale-failure-framework": {
    relatedInsights: ["why-robotics-pilots-fail-to-scale"],
    relatedUseCases: [],
    relatedCaseStudies: ["vendor-deployment-viability-assessment"],
  },
  "vendor-economics-framework": {
    relatedInsights: ["how-warehouse-operators-evaluate-robotics-vendors"],
    relatedUseCases: [],
    relatedCaseStudies: [
      "robotics-pricing-strategy-research",
      "robotics-market-entry-decision-analysis",
    ],
  },
  "vendor-evaluation-framework": {
    relatedInsights: [
      "how-warehouse-operators-evaluate-robotics-vendors",
      "why-mid-market-operators-struggle-to-evaluate-warehouse-robotics",
    ],
    relatedUseCases: [],
    relatedCaseStudies: [
      "vendor-deployment-viability-assessment",
      "robotics-market-entry-decision-analysis",
    ],
  },
  "workflow-architecture-framework": {
    relatedInsights: [
      "how-warehouse-workflows-determine-automation-success",
      "how-warehouse-robotics-economics-actually-works",
    ],
    relatedUseCases: [
      "amr-deployment-evaluation",
      "goods-to-person-system-evaluation",
    ],
    relatedCaseStudies: [],
  },
};

const hubByContentType: Record<RelatedContentType, { label: string; path: string }> = {
  frameworks: { label: "Frameworks", path: "/frameworks" },
  insights: { label: "Insights", path: "/insights" },
  useCases: { label: "Use Cases", path: "/use-cases" },
  caseStudies: { label: "Case Studies", path: "/case-studies" },
  marketOverview: { label: "Market Overview", path: "/market-overview" },
  glossary: { label: "Glossary", path: "/glossary" },
};

function normalizePath(path: string): string {
  if (!path || path === "/") {
    return "/";
  }
  return path.endsWith("/") ? path.slice(0, -1) : path;
}

function canonicalPathForSlug(
  contentType: RelatedContentType,
  slug: string,
  isHub = false
): string {
  if (isHub) {
    return hubByContentType[contentType].path;
  }

  switch (contentType) {
    case "frameworks":
      return `/frameworks/${slug}`;
    case "insights":
      return `/insights/${slug}`;
    case "useCases":
      return `/use-cases/${slug}`;
    case "caseStudies":
      return `/case-studies/${slug}`;
    case "marketOverview":
      return `/market-overview/${slug}`;
    case "glossary":
      return `/glossary/${slug}`;
    default:
      return "/";
  }
}

function buildFrameworkIndexFromSeed<
  TSlug extends string,
  TSeedField extends keyof RelationshipSeed,
>(
  seedField: TSeedField
): Record<TSlug, FrameworkSlug[]> {
  const index = {} as Record<TSlug, FrameworkSlug[]>;

  frameworkSlugs.forEach((frameworkSlug) => {
    const relationship = frameworkRelationshipSeed[frameworkSlug][seedField] as unknown as TSlug[];
    relationship.forEach((slug) => {
      if (!index[slug]) {
        index[slug] = [];
      }
      if (!index[slug].includes(frameworkSlug)) {
        index[slug].push(frameworkSlug);
      }
    });
  });

  return index;
}

const insightFrameworkIndex =
  buildFrameworkIndexFromSeed<InsightSlug, "relatedInsights">("relatedInsights");
const useCaseFrameworkIndex =
  buildFrameworkIndexFromSeed<UseCaseSlug, "relatedUseCases">("relatedUseCases");
const caseStudyFrameworkIndex =
  buildFrameworkIndexFromSeed<CaseStudySlug, "relatedCaseStudies">("relatedCaseStudies");

const nodeRegistry: RelatedContentNode[] = [];
let registryOrder = 0;

function pushNode(partial: Omit<RelatedContentNode, "order">): void {
  nodeRegistry.push({ ...partial, order: registryOrder++ });
}

function pushHubNode(contentType: RelatedContentType): void {
  const hub = hubByContentType[contentType];
  pushNode({
    title: hub.label,
    slug: contentType,
    canonicalPath: hub.path,
    contentType,
    frameworks: [],
    topics: [],
    industries: [],
    technologies: [],
    relatedGlossary: [],
    relatedUseCases: [],
    relatedCaseStudies: [],
    relatedInsights: [],
    isHub: true,
  });
}

function pushDetailNodes(): void {
  frameworkSlugs.forEach((slug) => {
    const relationship = frameworkRelationshipSeed[slug];
    pushNode({
      title: formatSlugLabel(slug),
      slug,
      canonicalPath: canonicalPathForSlug("frameworks", slug),
      contentType: "frameworks",
      frameworks: [slug],
      topics: [],
      industries: [],
      technologies: [],
      relatedGlossary: [],
      relatedUseCases: relationship.relatedUseCases,
      relatedCaseStudies: relationship.relatedCaseStudies,
      relatedInsights: relationship.relatedInsights,
      isHub: false,
    });
  });

  insightSlugs.forEach((slug) => {
    pushNode({
      title: formatSlugLabel(slug),
      slug,
      canonicalPath: canonicalPathForSlug("insights", slug),
      contentType: "insights",
      frameworks: insightFrameworkIndex[slug] ?? [],
      topics: [],
      industries: [],
      technologies: [],
      relatedGlossary: [],
      relatedUseCases: [],
      relatedCaseStudies: [],
      relatedInsights: [],
      isHub: false,
    });
  });

  useCaseSlugs.forEach((slug) => {
    pushNode({
      title: formatSlugLabel(slug),
      slug,
      canonicalPath: canonicalPathForSlug("useCases", slug),
      contentType: "useCases",
      frameworks: useCaseFrameworkIndex[slug] ?? [],
      topics: [],
      industries: [],
      technologies: [],
      relatedGlossary: [],
      relatedUseCases: [],
      relatedCaseStudies: [],
      relatedInsights: [],
      isHub: false,
    });
  });

  caseStudySlugs.forEach((slug) => {
    pushNode({
      title: formatSlugLabel(slug),
      slug,
      canonicalPath: canonicalPathForSlug("caseStudies", slug),
      contentType: "caseStudies",
      frameworks: caseStudyFrameworkIndex[slug] ?? [],
      topics: [],
      industries: [],
      technologies: [],
      relatedGlossary: [],
      relatedUseCases: [],
      relatedCaseStudies: [],
      relatedInsights: [],
      isHub: false,
    });
  });

  marketOverviewChildSlugs.forEach((slug) => {
    pushNode({
      title: formatSlugLabel(slug),
      slug,
      canonicalPath: canonicalPathForSlug("marketOverview", slug),
      contentType: "marketOverview",
      frameworks: [],
      topics: [],
      industries: [],
      technologies: [],
      relatedGlossary: [],
      relatedUseCases: [],
      relatedCaseStudies: [],
      relatedInsights: [],
      isHub: false,
    });
  });

  glossaryTermSlugs.forEach((slug) => {
    pushNode({
      title: formatSlugLabel(slug),
      slug,
      canonicalPath: canonicalPathForSlug("glossary", slug),
      contentType: "glossary",
      frameworks: [],
      topics: [],
      industries: [],
      technologies: [],
      relatedGlossary: [],
      relatedUseCases: [],
      relatedCaseStudies: [],
      relatedInsights: [],
      isHub: false,
    });
  });
}

[
  "frameworks",
  "insights",
  "useCases",
  "caseStudies",
  "marketOverview",
  "glossary",
].forEach((contentType) => pushHubNode(contentType as RelatedContentType));
pushDetailNodes();

const registryByCanonicalPath = new Map<string, RelatedContentNode>(
  nodeRegistry.map((node) => [node.canonicalPath, node])
);

function toLink(
  node: RelatedContentNode,
  reason: RelatedContentLink["reason"]
): RelatedContentLink {
  return {
    title: node.title,
    canonicalPath: node.canonicalPath,
    contentType: node.contentType,
    slug: node.slug,
    reason,
  };
}

function countShared<T>(left: readonly T[], right: readonly T[]): number {
  if (left.length === 0 || right.length === 0) {
    return 0;
  }
  const rightSet = new Set(right);
  return left.reduce((total, value) => total + (rightSet.has(value) ? 1 : 0), 0);
}

function buildExplicitRankMap(current: RelatedContentNode): Map<string, number> {
  const rankedPaths: string[] = [];

  current.relatedInsights.forEach((slug) =>
    rankedPaths.push(canonicalPathForSlug("insights", slug))
  );
  current.relatedUseCases.forEach((slug) =>
    rankedPaths.push(canonicalPathForSlug("useCases", slug))
  );
  current.relatedCaseStudies.forEach((slug) =>
    rankedPaths.push(canonicalPathForSlug("caseStudies", slug))
  );
  current.relatedGlossary.forEach((slug) =>
    rankedPaths.push(canonicalPathForSlug("glossary", slug))
  );

  return new Map(rankedPaths.map((path, index) => [path, index]));
}

function resolveHubForNode(node: RelatedContentNode): RelatedContentLink | null {
  if (node.isHub) {
    return null;
  }
  const hub = hubByContentType[node.contentType];
  return {
    title: hub.label,
    canonicalPath: hub.path,
    contentType: node.contentType,
    slug: node.contentType,
    reason: "hub-parent",
  };
}

function rankLateralCandidates(
  current: RelatedContentNode,
  limit: number
): RelatedContentLink[] {
  const explicitRankMap = buildExplicitRankMap(current);
  const candidates = nodeRegistry.filter((node) => !node.isHub && node.canonicalPath !== current.canonicalPath);

  const ranked = candidates
    .map((candidate) => {
      const explicitRank = explicitRankMap.get(candidate.canonicalPath);
      const sharedFrameworkCount = countShared(current.frameworks, candidate.frameworks);
      const sharedTopicCount = countShared(current.topics, candidate.topics);
      const sharedTechnologyCount = countShared(current.technologies, candidate.technologies);
      const sharedIndustryCount = countShared(current.industries, candidate.industries);

      const isEligible =
        explicitRank !== undefined ||
        sharedFrameworkCount > 0 ||
        sharedTopicCount > 0 ||
        sharedTechnologyCount > 0 ||
        sharedIndustryCount > 0;

      if (!isEligible) {
        return null;
      }

      const reason: RelatedContentLink["reason"] =
        explicitRank !== undefined
          ? "explicit"
          : sharedFrameworkCount > 0
          ? "shared-framework"
          : sharedTopicCount > 0
          ? "shared-topic"
          : sharedTechnologyCount > 0
          ? "shared-technology"
          : "shared-industry";

      return {
        candidate,
        reason,
        sortKey: {
          explicitPriority: explicitRank !== undefined ? 0 : 1,
          explicitRank: explicitRank ?? Number.MAX_SAFE_INTEGER,
          sharedFrameworkCount,
          sharedTopicCount,
          sharedTechnologyCount,
          sharedIndustryCount,
          order: candidate.order,
          canonicalPath: candidate.canonicalPath,
        },
      };
    })
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry))
    .sort((left, right) => {
      if (left.sortKey.explicitPriority !== right.sortKey.explicitPriority) {
        return left.sortKey.explicitPriority - right.sortKey.explicitPriority;
      }
      if (left.sortKey.explicitRank !== right.sortKey.explicitRank) {
        return left.sortKey.explicitRank - right.sortKey.explicitRank;
      }
      if (left.sortKey.sharedFrameworkCount !== right.sortKey.sharedFrameworkCount) {
        return right.sortKey.sharedFrameworkCount - left.sortKey.sharedFrameworkCount;
      }
      if (left.sortKey.sharedTopicCount !== right.sortKey.sharedTopicCount) {
        return right.sortKey.sharedTopicCount - left.sortKey.sharedTopicCount;
      }
      if (left.sortKey.sharedTechnologyCount !== right.sortKey.sharedTechnologyCount) {
        return right.sortKey.sharedTechnologyCount - left.sortKey.sharedTechnologyCount;
      }
      if (left.sortKey.sharedIndustryCount !== right.sortKey.sharedIndustryCount) {
        return right.sortKey.sharedIndustryCount - left.sortKey.sharedIndustryCount;
      }
      if (left.sortKey.order !== right.sortKey.order) {
        return left.sortKey.order - right.sortKey.order;
      }
      return left.sortKey.canonicalPath.localeCompare(right.sortKey.canonicalPath);
    });

  return ranked.slice(0, limit).map((entry) => toLink(entry.candidate, entry.reason));
}

export function getHubAssetSurfacing(
  hubCanonicalPath: string,
  limit = 12
): RelatedContentLink[] {
  const normalizedHubPath = normalizePath(hubCanonicalPath);
  const hubNode = registryByCanonicalPath.get(normalizedHubPath);
  if (!hubNode || !hubNode.isHub) {
    return [];
  }

  return nodeRegistry
    .filter((node) => !node.isHub && node.contentType === hubNode.contentType)
    .sort((left, right) => left.order - right.order || left.canonicalPath.localeCompare(right.canonicalPath))
    .slice(0, limit)
    .map((node) => toLink(node, "hub-surfacing"));
}

function resolveSemanticFrameworkLinks(
  current: RelatedContentNode,
  limit: number
): RelatedContentLink[] {
  return current.frameworks
    .map((frameworkSlug) => registryByCanonicalPath.get(canonicalPathForSlug("frameworks", frameworkSlug)))
    .filter((node): node is RelatedContentNode => Boolean(node && node.canonicalPath !== current.canonicalPath))
    .sort((left, right) => left.order - right.order || left.canonicalPath.localeCompare(right.canonicalPath))
    .slice(0, limit)
    .map((node) => toLink(node, "semantic-framework"));
}

function resolveSemanticGlossaryLinks(
  current: RelatedContentNode,
  limit: number
): RelatedContentLink[] {
  return current.relatedGlossary
    .map((glossarySlug) => registryByCanonicalPath.get(canonicalPathForSlug("glossary", glossarySlug)))
    .filter((node): node is RelatedContentNode => Boolean(node && node.canonicalPath !== current.canonicalPath))
    .sort((left, right) => left.order - right.order || left.canonicalPath.localeCompare(right.canonicalPath))
    .slice(0, limit)
    .map((node) => toLink(node, "semantic-glossary"));
}

export function getRelatedContentContext(
  canonicalPath: string,
  options?: {
    lateralLimit?: number;
    hubAssetLimit?: number;
    semanticLimit?: number;
  }
): RelatedContentContext {
  const normalizedPath = normalizePath(canonicalPath);
  const current = registryByCanonicalPath.get(normalizedPath) ?? null;

  if (!current) {
    return {
      current: null,
      upwardHub: null,
      lateralRelated: [],
      downwardHubAssets: [],
      semanticFrameworkLinks: [],
      semanticGlossaryLinks: [],
    };
  }

  const lateralLimit = options?.lateralLimit ?? 8;
  const hubAssetLimit = options?.hubAssetLimit ?? 12;
  const semanticLimit = options?.semanticLimit ?? 8;

  return {
    current,
    upwardHub: resolveHubForNode(current),
    lateralRelated: current.isHub ? [] : rankLateralCandidates(current, lateralLimit),
    downwardHubAssets: current.isHub ? getHubAssetSurfacing(current.canonicalPath, hubAssetLimit) : [],
    semanticFrameworkLinks: current.isHub
      ? []
      : resolveSemanticFrameworkLinks(current, semanticLimit),
    semanticGlossaryLinks: current.isHub
      ? []
      : resolveSemanticGlossaryLinks(current, semanticLimit),
  };
}

export function getRelatedRegistrySize(): number {
  return nodeRegistry.length;
}
