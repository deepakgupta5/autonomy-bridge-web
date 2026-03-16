import {
  caseStudySlugs,
  frameworkSlugs,
  glossaryTermSlugs,
  insightSlugs,
  marketOverviewChildSlugs,
  useCaseSlugs,
} from "./ia";

export interface HubCardItem {
  title: string;
  href: string;
  description: string;
  metadata: string[];
  taxonomy: string[];
}

export interface HubPageContent {
  title: string;
  summary: string;
  intro: string;
  emptyState: string;
  items: HubCardItem[];
}

function formatSlugLabel(slug: string): string {
  const uppercaseTokens = new Set(["ai", "amr", "roi", "3pl", "wms", "wes"]);
  return slug
    .split("-")
    .map((token) => {
      if (uppercaseTokens.has(token)) {
        return token.toUpperCase();
      }
      return `${token.charAt(0).toUpperCase()}${token.slice(1)}`;
    })
    .join(" ");
}

function mapSlugsToHubItems(
  slugs: readonly string[],
  prefix: string,
  contentTypeLabel: string,
  taxonomy: string[]
): HubCardItem[] {
  return slugs.map((slug) => {
    const href = `${prefix}/${slug}`;
    return {
      title: formatSlugLabel(slug),
      href,
      description: `${contentTypeLabel} entry from the locked canonical route set.`,
      metadata: [`Canonical: ${href}`, `Type: ${contentTypeLabel}`],
      taxonomy,
    };
  });
}

export const insightsHubContent: HubPageContent = {
  title: "Insights",
  summary: "Insights hub for locked production routes.",
  intro: "Browse all locked insight routes.",
  emptyState: "No insight entries are available yet.",
  items: mapSlugsToHubItems(insightSlugs, "/insights", "Insight", ["insights"]),
};

export const frameworksHubContent: HubPageContent = {
  title: "Frameworks",
  summary: "Frameworks hub for locked production routes.",
  intro: "Browse all locked framework routes.",
  emptyState: "No framework entries are available yet.",
  items: mapSlugsToHubItems(frameworkSlugs, "/frameworks", "Framework", ["frameworks"]),
};

export const useCasesHubContent: HubPageContent = {
  title: "Use Cases",
  summary: "Use cases hub for locked production routes.",
  intro: "Browse all locked use case routes.",
  emptyState: "No use case entries are available yet.",
  items: mapSlugsToHubItems(useCaseSlugs, "/use-cases", "Use Case", ["use-cases"]),
};

export const caseStudiesHubContent: HubPageContent = {
  title: "Case Studies",
  summary: "Case studies hub for locked production routes.",
  intro: "Browse all locked case study routes.",
  emptyState: "No case study entries are available yet.",
  items: mapSlugsToHubItems(caseStudySlugs, "/case-studies", "Case Study", ["case-studies"]),
};

export const glossaryHubContent: HubPageContent = {
  title: "Glossary",
  summary: "Glossary hub for locked production term routes.",
  intro: "Browse all locked glossary term routes.",
  emptyState: "No glossary terms are available yet.",
  items: mapSlugsToHubItems(glossaryTermSlugs, "/glossary", "Glossary Term", ["glossary"]),
};

export const marketOverviewHubContent: HubPageContent = {
  title: "Market Overview",
  summary: "Market overview hub for locked production routes.",
  intro: "Browse all locked market overview child routes.",
  emptyState: "No market overview child entries are available yet.",
  items: mapSlugsToHubItems(
    marketOverviewChildSlugs,
    "/market-overview",
    "Market Overview Section",
    ["market-overview"]
  ),
};
