import { getCollection, type CollectionEntry, type CollectionKey } from "astro:content";

export type RevampCollection =
  | "frameworks"
  | "insights"
  | "useCases"
  | "caseStudies"
  | "marketOverview"
  | "glossary"
  | "pages"
  | "legal";

function normalizePath(path: string): string {
  if (!path || path === "/") {
    return "/";
  }
  return path.endsWith("/") ? path.slice(0, -1) : path;
}

function sortByCanonicalPath<TCollection extends CollectionKey>(
  entries: CollectionEntry<TCollection>[]
): CollectionEntry<TCollection>[] {
  return entries.sort((left, right) =>
    normalizePath(String(left.data.canonicalPath)).localeCompare(
      normalizePath(String(right.data.canonicalPath))
    )
  );
}

export async function getEntryByCanonicalPath<TCollection extends RevampCollection>(
  collection: TCollection,
  canonicalPath: string
): Promise<CollectionEntry<TCollection>> {
  const normalizedTarget = normalizePath(canonicalPath);
  const entries = await getCollection(collection);
  const match = entries.find(
    (entry) => normalizePath(String(entry.data.canonicalPath)) === normalizedTarget
  );

  if (!match) {
    throw new Error(
      `Missing collection entry for ${collection} canonicalPath '${normalizedTarget}'`
    );
  }

  return match as CollectionEntry<TCollection>;
}

export async function getEntriesByCanonicalPrefix<TCollection extends RevampCollection>(
  collection: TCollection,
  canonicalPrefix: string,
  options: {
    excludeCanonicalPaths?: string[];
  } = {}
): Promise<CollectionEntry<TCollection>[]> {
  const normalizedPrefix = normalizePath(canonicalPrefix);
  const excludeSet = new Set(
    (options.excludeCanonicalPaths ?? []).map((path) => normalizePath(path))
  );

  const entries = await getCollection(collection, ({ data }) => {
    const canonicalPath = normalizePath(String(data.canonicalPath));
    return canonicalPath.startsWith(`${normalizedPrefix}/`) && !excludeSet.has(canonicalPath);
  });

  return sortByCanonicalPath(entries as CollectionEntry<TCollection>[]);
}
