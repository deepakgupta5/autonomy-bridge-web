import { allLockedRoutes } from "./ia";

const lockedCanonicalPathSet = new Set<string>(allLockedRoutes);

export function isLockedCanonicalPath(path: string): boolean {
  return lockedCanonicalPathSet.has(path);
}

export function getLockedCanonicalPaths(): string[] {
  return Array.from(lockedCanonicalPathSet).sort();
}
