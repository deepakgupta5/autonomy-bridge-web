import { defineCollection, z } from "astro:content";
import {
  type NormalizedContentType,
  normalizeFrontmatter,
} from "../utils/contentNormalize";
import { normalizedFrontmatterSchema } from "./normalizedSchema";

function normalizedCollectionSchema(contentType: NormalizedContentType) {
  return z
    .record(z.any())
    .transform((rawData) =>
      normalizeFrontmatter(rawData, contentType, typeof rawData.sourceFilename === "string" ? rawData.sourceFilename : undefined)
    )
    .pipe(normalizedFrontmatterSchema);
}

const frameworks = defineCollection({
  type: "content",
  schema: normalizedCollectionSchema("frameworks"),
});

const insights = defineCollection({
  type: "content",
  schema: normalizedCollectionSchema("insights"),
});

const useCases = defineCollection({
  type: "content",
  schema: normalizedCollectionSchema("useCases"),
});

const caseStudies = defineCollection({
  type: "content",
  schema: normalizedCollectionSchema("caseStudies"),
});

const marketOverview = defineCollection({
  type: "content",
  schema: normalizedCollectionSchema("marketOverview"),
});

const glossary = defineCollection({
  type: "content",
  schema: normalizedCollectionSchema("glossary"),
});

const pages = defineCollection({
  type: "content",
  schema: normalizedCollectionSchema("pages"),
});

const legal = defineCollection({
  type: "content",
  schema: normalizedCollectionSchema("legal"),
});

export const collections = {
  frameworks,
  insights,
  useCases,
  caseStudies,
  marketOverview,
  glossary,
  pages,
  legal,
};
