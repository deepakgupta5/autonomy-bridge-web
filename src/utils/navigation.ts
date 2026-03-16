import { primaryNavItems } from "../data/ia";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface LocalSubnavLink {
  label: string;
  href: string;
}

export interface LocalSubnavConfig {
  heading: string;
  links: LocalSubnavLink[];
}

const topLevelLabelByPath = new Map<string, string>([
  ...primaryNavItems.map((item) => [item.href, item.label] as const),
  ["/contact", "Contact"],
  ["/privacy-policy", "Privacy Policy"],
  ["/terms-of-use", "Terms of Use"],
  ["/cookie-policy", "Cookie Policy"],
  ["/sitemap", "Sitemap"],
]);

const knowledgeHubLinks: LocalSubnavLink[] = [
  { label: "Insights", href: "/insights" },
  { label: "Market Overview", href: "/market-overview" },
  { label: "Frameworks", href: "/frameworks" },
  { label: "Use Cases", href: "/use-cases" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Glossary", href: "/glossary" },
];

const marketOverviewLinks: LocalSubnavLink[] = [
  { label: "Industry Landscape", href: "/market-overview/industry-landscape" },
  { label: "Technology Stack", href: "/market-overview/technology-stack" },
  { label: "Market Drivers", href: "/market-overview/market-drivers" },
  { label: "Market Segments", href: "/market-overview/market-segments" },
  { label: "Key Players", href: "/market-overview/key-players" },
];

const knowledgeHubPaths = new Set<string>([
  "/insights",
  "/market-overview",
  "/frameworks",
  "/use-cases",
  "/case-studies",
  "/glossary",
]);

export function normalizePathname(pathname: string): string {
  if (!pathname || pathname === "/") {
    return "/";
  }
  return pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
}

function titleCaseFromSlug(slug: string): string {
  const upper = new Set(["ai", "amr", "roi", "3pl"]);
  return slug
    .split("-")
    .map((part) => {
      if (upper.has(part)) {
        return part.toUpperCase();
      }
      return `${part.charAt(0).toUpperCase()}${part.slice(1)}`;
    })
    .join(" ");
}

function withCurrentPageLast(items: BreadcrumbItem[]): BreadcrumbItem[] {
  if (items.length === 0) {
    return [{ label: "Home", href: "/" }];
  }
  return items.map((item, index) => {
    if (index === items.length - 1) {
      return { label: item.label };
    }
    return item;
  });
}

export function buildBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const current = normalizePathname(pathname);

  if (current === "/") {
    return [{ label: "Home" }];
  }

  if (topLevelLabelByPath.has(current)) {
    return withCurrentPageLast([
      { label: "Home", href: "/" },
      { label: topLevelLabelByPath.get(current)! },
    ]);
  }

  const detailPrefixes: Array<{ prefix: string; hubLabel: string; hubHref: string }> = [
    { prefix: "/frameworks/", hubLabel: "Frameworks", hubHref: "/frameworks" },
    { prefix: "/insights/", hubLabel: "Insights", hubHref: "/insights" },
    { prefix: "/use-cases/", hubLabel: "Use Cases", hubHref: "/use-cases" },
    { prefix: "/case-studies/", hubLabel: "Case Studies", hubHref: "/case-studies" },
    { prefix: "/glossary/", hubLabel: "Glossary", hubHref: "/glossary" },
    { prefix: "/market-overview/", hubLabel: "Market Overview", hubHref: "/market-overview" },
  ];

  for (const prefix of detailPrefixes) {
    if (current.startsWith(prefix.prefix)) {
      const slug = current.slice(prefix.prefix.length);
      return withCurrentPageLast([
        { label: "Home", href: "/" },
        { label: prefix.hubLabel, href: prefix.hubHref },
        { label: titleCaseFromSlug(slug) },
      ]);
    }
  }

  return withCurrentPageLast([
    { label: "Home", href: "/" },
    { label: titleCaseFromSlug(current.replace(/^\//, "")) },
  ]);
}

export function getLocalSubnav(pathname: string): LocalSubnavConfig | null {
  const current = normalizePathname(pathname);

  if (current === "/market-overview" || current.startsWith("/market-overview/")) {
    return {
      heading: "Market Overview Sections",
      links: marketOverviewLinks,
    };
  }

  if (knowledgeHubPaths.has(current)) {
    return {
      heading: "Knowledge Sections",
      links: knowledgeHubLinks,
    };
  }

  return null;
}
