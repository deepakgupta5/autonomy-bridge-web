export function formatSlugLabel(slug: string): string {
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
