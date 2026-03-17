import { toCanonicalPath } from "./legacySlugMap";

export type NormalizedContentType =
  | "frameworks"
  | "insights"
  | "useCases"
  | "caseStudies"
  | "marketOverview"
  | "glossary"
  | "pages"
  | "legal";

type UnknownRecord = Record<string, unknown>;

const statusValues = new Set(["published", "draft", "archived"]);

const pageSlugToPath: Record<string, string> = {
  home: "/",
  methodology: "/methodology",
  advisory: "/advisory",
  "bespoke-research": "/bespoke-research",
  about: "/about",
  contact: "/contact",
  sitemap: "/sitemap",
  "market-overview": "/market-overview",
};

const legalSlugToPath: Record<string, string> = {
  "privacy-policy": "/privacy-policy",
  "terms-of-use": "/terms-of-use",
  "cookie-policy": "/cookie-policy",
};

function asRecord(value: unknown): UnknownRecord | null {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return null;
  }

  return value as UnknownRecord;
}

function getAtPath(source: UnknownRecord, path: string): unknown {
  const segments = path.split(".");
  let current: unknown = source;

  for (const segment of segments) {
    const asObj = asRecord(current);
    if (!asObj || !(segment in asObj)) {
      return undefined;
    }
    current = asObj[segment];
  }

  return current;
}

function firstDefined(source: UnknownRecord, candidates: string[]): unknown {
  for (const path of candidates) {
    const value = getAtPath(source, path);
    if (value !== undefined) {
      return value;
    }
  }

  return undefined;
}

function toStringValue(value: unknown): string | undefined {
  if (typeof value !== "string") {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function toBooleanValue(value: unknown): boolean | undefined {
  if (typeof value === "boolean") {
    return value;
  }
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    if (normalized === "true") {
      return true;
    }
    if (normalized === "false") {
      return false;
    }
  }
  return undefined;
}

function toStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value
      .map((entry) => toStringValue(entry))
      .filter((entry): entry is string => Boolean(entry));
  }

  const single = toStringValue(value);
  return single ? [single] : [];
}

function toAuthorArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value
      .map((entry) => {
        const asString = toStringValue(entry);
        if (asString) {
          return asString;
        }

        const asObj = asRecord(entry);
        if (!asObj) {
          return undefined;
        }

        return toStringValue(asObj.name) ?? toStringValue(asObj.id);
      })
      .filter((entry): entry is string => Boolean(entry));
  }

  const single = toStringValue(value);
  return single ? [single] : [];
}

function normalizePath(path: string): string {
  const trimmedPath = path.trim();
  let pathOnly = trimmedPath;

  if (/^https?:\/\//i.test(trimmedPath)) {
    try {
      pathOnly = new URL(trimmedPath).pathname || "/";
    } catch {
      pathOnly = trimmedPath;
    }
  }

  const withoutQuery = pathOnly.split("?")[0]?.split("#")[0] ?? pathOnly;
  const ensuredLeadingSlash = withoutQuery.startsWith("/") ? withoutQuery : `/${withoutQuery}`;
  if (ensuredLeadingSlash === "/") {
    return "/";
  }

  const withoutTrailingSlash = ensuredLeadingSlash.endsWith("/")
    ? ensuredLeadingSlash.slice(0, -1)
    : ensuredLeadingSlash;

  return toCanonicalPath(withoutTrailingSlash);
}

function deriveSlugFromCanonicalPath(canonicalPath: string): string {
  if (canonicalPath === "/") {
    return "home";
  }

  const parts = canonicalPath.split("/").filter(Boolean);
  return parts[parts.length - 1] ?? "";
}

function inferCanonicalPathFromSlug(
  contentType: NormalizedContentType,
  slug: string | undefined
): string | undefined {
  if (!slug) {
    return undefined;
  }

  switch (contentType) {
    case "frameworks":
      return slug === "frameworks" ? "/frameworks" : `/frameworks/${slug}`;
    case "insights":
      return slug === "insights" ? "/insights" : `/insights/${slug}`;
    case "useCases":
      return slug === "use-cases" ? "/use-cases" : `/use-cases/${slug}`;
    case "caseStudies":
      return slug === "case-studies" ? "/case-studies" : `/case-studies/${slug}`;
    case "marketOverview":
      return slug === "market-overview"
        ? "/market-overview"
        : `/market-overview/${slug}`;
    case "glossary":
      return slug === "glossary" ? "/glossary" : `/glossary/${slug}`;
    case "pages":
      return pageSlugToPath[slug];
    case "legal":
      return legalSlugToPath[slug];
    default:
      return undefined;
  }
}

function firstString(source: UnknownRecord, candidates: string[]): string | undefined {
  return toStringValue(firstDefined(source, candidates));
}

function firstStringArray(source: UnknownRecord, candidates: string[]): string[] {
  for (const candidate of candidates) {
    const value = getAtPath(source, candidate);
    if (value !== undefined) {
      return toStringArray(value);
    }
  }
  return [];
}

function firstAuthorArray(source: UnknownRecord, candidates: string[]): string[] {
  for (const candidate of candidates) {
    const value = getAtPath(source, candidate);
    if (value !== undefined) {
      return toAuthorArray(value);
    }
  }
  return [];
}

function firstDateLike(source: UnknownRecord, candidates: string[]): string | Date | undefined {
  const value = firstDefined(source, candidates);
  if (value instanceof Date) {
    return value;
  }
  return toStringValue(value);
}

export function normalizeFrontmatter(
  rawData: UnknownRecord,
  contentType: NormalizedContentType,
  sourceFilename?: string
): UnknownRecord {
  const slugCandidate = firstString(rawData, ["slug", "document.slug", "meta.slug", "id"]);
  const canonicalCandidate = firstString(rawData, [
    "canonicalPath",
    "canonical.path",
    "canonical.url",
    "canonical",
    "url",
    "permalink",
  ]);

  const inferredCanonical = inferCanonicalPathFromSlug(contentType, slugCandidate);
  const canonicalPath = canonicalCandidate
    ? normalizePath(canonicalCandidate)
    : inferredCanonical
    ? normalizePath(inferredCanonical)
    : undefined;

  const slug = slugCandidate ?? (canonicalPath ? deriveSlugFromCanonicalPath(canonicalPath) : undefined);
  const description = firstString(rawData, ["description", "meta.description", "excerpt"]);
  const summary = firstString(rawData, ["summary", "meta.summary", "excerpt", "description"]);
  const seoTitle = firstString(rawData, [
    "seoTitle",
    "seo.meta_title",
    "seo.title",
    "meta.seoTitle",
    "title",
  ]);
  const seoDescription = firstString(rawData, [
    "seoDescription",
    "seo.meta_description",
    "seo.description",
    "meta.seoDescription",
    "description",
    "summary",
    "excerpt",
  ]);
  const authors = firstAuthorArray(rawData, ["authors", "author", "meta.authors"]);
  const ogTitle = firstString(rawData, [
    "ogTitle",
    "seo.og_title",
    "seo.ogTitle",
    "seo.meta_title",
    "title",
  ]);
  const ogDescription = firstString(rawData, [
    "ogDescription",
    "seo.og_description",
    "seo.ogDescription",
    "seo.meta_description",
    "description",
    "summary",
  ]);
  const ogType = firstString(rawData, ["ogType", "seo.og_type", "seo.ogType"]);
  const twitterCard = firstString(rawData, [
    "twitterCard",
    "seo.twitter_card",
    "seo.twitterCard",
  ]);
  const canonicalUrl = firstString(rawData, ["canonical.url", "canonicalUrl", "url"]);
  const robotsDirective = firstString(rawData, ["robots"]);
  const schemaType = firstString(rawData, ["schema.type"]);
  const schemaAdditionalType = firstString(rawData, ["schema.additionalType"]);

  const statusCandidate = firstString(rawData, [
    "status",
    "document.status",
    "meta.status",
    "workflow.status",
  ]);
  const normalizedStatus = statusCandidate ? statusCandidate.toLowerCase() : undefined;
  const status =
    normalizedStatus && statusValues.has(normalizedStatus) ? normalizedStatus : undefined;

  const documentId = firstString(rawData, [
    "documentId",
    "document.id",
    "docId",
    "meta.documentId",
    "id",
  ]);

  const aipmVersion = firstString(rawData, [
    "aipmVersion",
    "aipm.version",
    "meta.aipmVersion",
  ]);

  return {
    title: firstString(rawData, ["title", "meta.title"]),
    slug,
    description,
    summary,
    contentType,
    status,
    canonicalPath,
    seoTitle: seoTitle ?? firstString(rawData, ["seo.meta_title"]),
    seoDescription,
    ogTitle,
    ogDescription,
    ogType,
    twitterCard,
    canonicalUrl,
    robots: robotsDirective,
    schemaType,
    schemaAdditionalType,
    keywords: firstStringArray(rawData, ["keywords", "seo.keywords", "tags", "meta.keywords"]),
    frameworks: firstStringArray(rawData, ["frameworks", "related.frameworks"]),
    topics: firstStringArray(rawData, ["topics", "taxonomy.topics", "related.topics"]),
    industries: firstStringArray(rawData, ["industries", "taxonomy.industries"]),
    technologies: firstStringArray(rawData, ["technologies", "taxonomy.technologies"]),
    relatedGlossary: firstStringArray(rawData, [
      "relatedGlossary",
      "related.glossary",
      "relations.glossary",
    ]),
    relatedUseCases: firstStringArray(rawData, [
      "relatedUseCases",
      "related.useCases",
      "relations.useCases",
    ]),
    relatedCaseStudies: firstStringArray(rawData, [
      "relatedCaseStudies",
      "related.caseStudies",
      "relations.caseStudies",
    ]),
    relatedInsights: firstStringArray(rawData, [
      "relatedInsights",
      "related.insights",
      "relations.insights",
    ]),
    draft: toBooleanValue(firstDefined(rawData, ["draft", "meta.draft"])) ?? false,
    documentId,
    authors,
    datePublished: firstDateLike(rawData, [
      "datePublished",
      "dates.published",
      "publishedAt",
      "publishDate",
      "date",
    ]),
    dateModified: firstDateLike(rawData, [
      "dateModified",
      "dates.updated",
      "updatedAt",
      "updated",
    ]),
    migration: {
      sourceFilename,
      aipmVersion,
    },
  };
}
