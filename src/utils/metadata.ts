import { normalizePathname } from "./navigation";
import { toAbsoluteCanonicalUrl } from "./schema";

interface MetadataInput {
  title: string;
  summary?: string;
  canonicalPath: string;
  seoTitle?: string;
  seoDescription?: string;
  keywords?: string[];
  robots?: string;
  ogType?: "website" | "article";
}

export interface ResolvedMetadata {
  titleTag: string;
  ogTitle: string;
  description: string;
  keywordsContent?: string;
  robots: string;
  canonicalPath: string;
  absoluteCanonicalUrl: string;
  ogType: "website" | "article";
}

function normalizeKeywords(keywords?: string[]): string | undefined {
  if (!keywords || keywords.length === 0) {
    return undefined;
  }

  const unique = Array.from(
    new Set(
      keywords
        .map((keyword) => keyword.trim())
        .filter((keyword) => keyword.length > 0)
    )
  );

  return unique.length > 0 ? unique.join(", ") : undefined;
}

export function resolvePageMetadata(input: MetadataInput): ResolvedMetadata {
  const canonicalPath = normalizePathname(input.canonicalPath || "/");
  const titleTag = input.seoTitle?.trim() || `${input.title} | Autonomy Bridge`;
  const ogTitle = input.seoTitle?.trim() || input.title;
  const description = input.seoDescription?.trim() || input.summary?.trim() || "";
  const keywordsContent = normalizeKeywords(input.keywords);
  const robots = input.robots?.trim() || "index,follow";
  const ogType = input.ogType || (canonicalPath === "/" ? "website" : "article");

  return {
    titleTag,
    ogTitle,
    description,
    keywordsContent,
    robots,
    canonicalPath,
    absoluteCanonicalUrl: toAbsoluteCanonicalUrl(canonicalPath),
    ogType,
  };
}
