import { z } from "astro:content";
import { isLockedCanonicalPath } from "../data/lockedCanonicalPaths";
import { isLegacyPath, legacyPathToCanonicalPath } from "../utils/legacySlugMap";

const contentTypeValues = [
  "frameworks",
  "insights",
  "useCases",
  "caseStudies",
  "marketOverview",
  "glossary",
  "pages",
  "legal",
] as const;

const statusValues = ["published", "draft", "archived"] as const;

const canonicalPathSchema = z
  .string()
  .trim()
  .min(1, "canonicalPath is required")
  .refine((value) => value.startsWith("/"), {
    message: "canonicalPath must start with '/'",
  })
  .refine((value) => value === "/" || !value.endsWith("/"), {
    message: "canonicalPath must not include trailing slash for non-root URLs",
  });

const requiredString = (fieldName: string) =>
  z.string().trim().min(1, `${fieldName} is required`);

const nonEmptyStringArray = z.array(z.string().trim().min(1)).default([]);

function deriveSlugFromCanonicalPath(canonicalPath: string): string {
  if (canonicalPath === "/") {
    return "home";
  }

  const segments = canonicalPath.split("/").filter(Boolean);
  return segments.length > 0 ? segments[segments.length - 1] : "";
}

function contentTypeMatchesCanonicalPath(
  contentType: (typeof contentTypeValues)[number],
  canonicalPath: string
): boolean {
  switch (contentType) {
    case "frameworks":
      return canonicalPath === "/frameworks" || canonicalPath.startsWith("/frameworks/");
    case "insights":
      return canonicalPath === "/insights" || canonicalPath.startsWith("/insights/");
    case "useCases":
      return canonicalPath === "/use-cases" || canonicalPath.startsWith("/use-cases/");
    case "caseStudies":
      return canonicalPath === "/case-studies" || canonicalPath.startsWith("/case-studies/");
    case "marketOverview":
      return (
        canonicalPath === "/market-overview" ||
        canonicalPath.startsWith("/market-overview/")
      );
    case "glossary":
      return canonicalPath === "/glossary" || canonicalPath.startsWith("/glossary/");
    case "pages":
      return [
        "/",
        "/methodology",
        "/advisory",
        "/bespoke-research",
        "/about",
        "/contact",
        "/sitemap",
      ].includes(canonicalPath);
    case "legal":
      return ["/privacy-policy", "/terms-of-use", "/cookie-policy"].includes(canonicalPath);
    default:
      return false;
  }
}

export const normalizedFrontmatterSchema = z
  .object({
    title: requiredString("title"),
    // Astro treats frontmatter `slug` specially; keep optional in parse input
    // and derive from canonicalPath if absent.
    slug: z.string().trim().min(1).optional(),
    description: requiredString("description"),
    summary: requiredString("summary"),
    contentType: z.enum(contentTypeValues),
    status: z.enum(statusValues),
    canonicalPath: canonicalPathSchema,
    canonicalUrl: z.string().trim().url().optional(),
    seoTitle: requiredString("seoTitle"),
    seoDescription: requiredString("seoDescription"),
    ogTitle: z.string().trim().min(1).optional(),
    ogDescription: z.string().trim().min(1).optional(),
    ogType: z.string().trim().min(1).optional(),
    twitterCard: z.string().trim().min(1).optional(),
    robots: z.string().trim().min(1).optional(),
    schemaType: z.string().trim().min(1).optional(),
    schemaAdditionalType: z.string().trim().min(1).optional(),
    keywords: nonEmptyStringArray,
    frameworks: nonEmptyStringArray,
    topics: nonEmptyStringArray,
    industries: nonEmptyStringArray,
    technologies: nonEmptyStringArray,
    relatedGlossary: nonEmptyStringArray,
    relatedUseCases: nonEmptyStringArray,
    relatedCaseStudies: nonEmptyStringArray,
    relatedInsights: nonEmptyStringArray,
    draft: z.boolean().default(false),
    documentId: requiredString("documentId"),
    authors: z.array(z.string().trim().min(1)).min(1, "authors is required"),
    datePublished: z.union([z.string().trim().min(1), z.date()]),
    dateModified: z.union([z.string().trim().min(1), z.date()]),
    migration: z
      .object({
        sourceFilename: z.string().optional(),
        aipmVersion: z.string().optional(),
      })
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (!isLockedCanonicalPath(data.canonicalPath)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["canonicalPath"],
        message: `canonicalPath '${data.canonicalPath}' is not in locked route set`,
      });
    }

    if (isLegacyPath(data.canonicalPath)) {
      const target = legacyPathToCanonicalPath[data.canonicalPath];
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["canonicalPath"],
        message: `canonicalPath '${data.canonicalPath}' is legacy and must redirect to '${target}'`,
      });
    }

    if (!contentTypeMatchesCanonicalPath(data.contentType, data.canonicalPath)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["canonicalPath"],
        message: `canonicalPath '${data.canonicalPath}' does not match contentType '${data.contentType}'`,
      });
    }

    const resolvedSlug = data.slug ?? deriveSlugFromCanonicalPath(data.canonicalPath);
    if (!resolvedSlug) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["slug"],
        message: "slug is required and could not be derived from canonicalPath",
      });
    }
  })
  .transform((data) => ({
    ...data,
    slug: data.slug ?? deriveSlugFromCanonicalPath(data.canonicalPath),
  }));

export type NormalizedFrontmatter = z.infer<typeof normalizedFrontmatterSchema>;
