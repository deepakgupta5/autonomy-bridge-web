export const legacyPathToCanonicalPath: Record<string, string> = {
  "/insights/how-warehouse-robotics-economics-works":
    "/insights/how-warehouse-robotics-economics-actually-works",
  "/use-cases/evaluating-warehouse-automation-roi":
    "/use-cases/warehouse-automation-roi-evaluation",
};

function removeTrailingSlash(path: string): string {
  if (path === "/") {
    return "/";
  }

  return path.endsWith("/") ? path.slice(0, -1) : path;
}

export function toCanonicalPath(path: string): string {
  const normalized = removeTrailingSlash(path);
  return legacyPathToCanonicalPath[normalized] ?? normalized;
}

export function isLegacyPath(path: string): boolean {
  return Object.prototype.hasOwnProperty.call(
    legacyPathToCanonicalPath,
    removeTrailingSlash(path)
  );
}
