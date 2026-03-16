const SITE_URL = "https://www.autonomybridge.com";
const ORGANIZATION_ID = `${SITE_URL}#organization`;
const WEBSITE_ID = `${SITE_URL}#website`;

export interface BreadcrumbSchemaItem {
  label: string;
  path: string;
}

export interface FaqSchemaItem {
  question: string;
  answer: string;
}

export interface ArticleSchemaOptions {
  title: string;
  description: string;
  canonicalPath: string;
  datePublished?: string;
  dateModified?: string;
  authors?: string[];
  keywords?: string[];
  articleType?: "Article" | "TechArticle" | "HowTo";
}

export type SchemaNode = Record<string, unknown>;

function normalizePath(path: string): string {
  if (!path || path === "/") {
    return "/";
  }

  const fromUrl = /^https?:\/\//i.test(path) ? new URL(path).pathname : path;
  const withLeadingSlash = fromUrl.startsWith("/") ? fromUrl : `/${fromUrl}`;
  return withLeadingSlash.endsWith("/") ? withLeadingSlash.slice(0, -1) : withLeadingSlash;
}

export function toAbsoluteCanonicalUrl(path: string): string {
  const normalizedPath = normalizePath(path);
  return normalizedPath === "/" ? SITE_URL : `${SITE_URL}${normalizedPath}`;
}

export function buildOrganizationSchema(): SchemaNode {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: "Autonomy Bridge",
    url: SITE_URL,
    sameAs: ["https://www.linkedin.com/company/autonomy-bridge/"],
  };
}

export function buildWebSiteSchema(): SchemaNode {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: "Autonomy Bridge",
    publisher: { "@id": ORGANIZATION_ID },
  };
}

export function buildBreadcrumbListSchema(items: BreadcrumbSchemaItem[]): SchemaNode | null {
  if (items.length === 0) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: toAbsoluteCanonicalUrl(item.path),
    })),
  };
}

export function buildArticleSchema(options: ArticleSchemaOptions): SchemaNode {
  const articleType = options.articleType ?? "Article";
  const canonicalUrl = toAbsoluteCanonicalUrl(options.canonicalPath);

  return {
    "@context": "https://schema.org",
    "@type": articleType,
    headline: options.title,
    description: options.description,
    url: canonicalUrl,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    author:
      options.authors && options.authors.length > 0
        ? options.authors.map((name) => ({ "@type": "Person", name }))
        : [{ "@type": "Organization", name: "Autonomy Bridge" }],
    publisher: { "@id": ORGANIZATION_ID },
    datePublished: options.datePublished,
    dateModified: options.dateModified,
    keywords: options.keywords && options.keywords.length > 0 ? options.keywords.join(", ") : undefined,
  };
}

export function buildUseCaseSchema(
  options: Omit<ArticleSchemaOptions, "articleType"> & {
    schemaType?: "HowTo" | "TechArticle";
  }
): SchemaNode {
  return buildArticleSchema({
    ...options,
    articleType: options.schemaType ?? "TechArticle",
  });
}

export function buildCaseStudySchema(
  options: Omit<ArticleSchemaOptions, "articleType">
): SchemaNode {
  const canonicalUrl = toAbsoluteCanonicalUrl(options.canonicalPath);
  return {
    "@context": "https://schema.org",
    "@type": ["CreativeWork", "CaseStudy"],
    name: options.title,
    description: options.description,
    url: canonicalUrl,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    author:
      options.authors && options.authors.length > 0
        ? options.authors.map((name) => ({ "@type": "Person", name }))
        : [{ "@type": "Organization", name: "Autonomy Bridge" }],
    publisher: { "@id": ORGANIZATION_ID },
    datePublished: options.datePublished,
    dateModified: options.dateModified,
    keywords: options.keywords && options.keywords.length > 0 ? options.keywords.join(", ") : undefined,
  };
}

export function buildCollectionPageSchema(options: {
  name: string;
  description: string;
  canonicalPath: string;
}): SchemaNode {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: options.name,
    description: options.description,
    url: toAbsoluteCanonicalUrl(options.canonicalPath),
    isPartOf: { "@id": WEBSITE_ID },
  };
}

export function buildDefinedTermSchema(options: {
  term: string;
  definition: string;
  canonicalPath: string;
}): SchemaNode {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: options.term,
    description: options.definition,
    url: toAbsoluteCanonicalUrl(options.canonicalPath),
    inDefinedTermSet: toAbsoluteCanonicalUrl("/glossary"),
  };
}

export function buildFaqPageSchema(options: {
  canonicalPath: string;
  items: FaqSchemaItem[];
}): SchemaNode | null {
  if (options.items.length === 0) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    url: toAbsoluteCanonicalUrl(options.canonicalPath),
    mainEntity: options.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function buildAboutPageSchema(options: {
  title: string;
  description: string;
  canonicalPath: string;
}): SchemaNode {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: options.title,
    description: options.description,
    url: toAbsoluteCanonicalUrl(options.canonicalPath),
    isPartOf: { "@id": WEBSITE_ID },
  };
}

export function buildContactPageSchema(options: {
  title: string;
  description: string;
  canonicalPath: string;
}): SchemaNode {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: options.title,
    description: options.description,
    url: toAbsoluteCanonicalUrl(options.canonicalPath),
    isPartOf: { "@id": WEBSITE_ID },
  };
}

export function buildDefaultLayoutSchemas(options: {
  breadcrumbItems: BreadcrumbSchemaItem[];
}): SchemaNode[] {
  const defaultSchemas: SchemaNode[] = [buildOrganizationSchema(), buildWebSiteSchema()];
  const breadcrumbSchema = buildBreadcrumbListSchema(options.breadcrumbItems);
  if (breadcrumbSchema) {
    defaultSchemas.push(breadcrumbSchema);
  }
  return defaultSchemas;
}
