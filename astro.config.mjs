import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

/** Strips :::directive blocks from markdown before rendering.
 *  Without remark-directive installed, each :::name…::: block (no internal
 *  blank lines) parses as a single top-level paragraph whose text starts with
 *  ":::".  This plugin removes those paragraphs from the AST.
 */
function remarkStripDirectives() {
  return function (tree) {
    tree.children = tree.children.filter((node) => {
      if (node.type !== 'paragraph') return true;
      const first = node.children?.[0];
      return !(first?.type === 'text' && first.value.startsWith(':::'));
    });
  };
}

const topLevelCanonicalPaths = new Set([
  '/',
  '/insights',
  '/market-overview',
  '/frameworks',
  '/use-cases',
  '/case-studies',
  '/methodology',
  '/glossary',
  '/advisory',
  '/bespoke-research',
  '/about',
  '/contact',
  '/privacy-policy',
  '/terms-of-use',
  '/cookie-policy',
  '/sitemap',
]);

const detailRoutePrefixes = [
  '/frameworks/',
  '/insights/',
  '/use-cases/',
  '/case-studies/',
  '/market-overview/',
  '/glossary/',
];

const legacyPaths = new Set([
  '/insights/how-warehouse-robotics-economics-works',
  '/use-cases/evaluating-warehouse-automation-roi',
]);

function normalizePathname(pathname) {
  if (!pathname || pathname === '/') {
    return '/';
  }
  return pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
}

function isDateBasedPath(pathname) {
  return /^\/\d{4}(\/\d{2}(\/\d{2})?)?(\/|$)/.test(pathname);
}

function toPathname(entry) {
  const asString = typeof entry === 'string' ? entry : String(entry);
  return normalizePathname(new URL(asString, 'https://www.autonomybridge.com').pathname);
}

function isAllowedSitemapPath(pathname) {
  if (legacyPaths.has(pathname) || isDateBasedPath(pathname)) {
    return false;
  }

  if (topLevelCanonicalPaths.has(pathname)) {
    return true;
  }

  return detailRoutePrefixes.some(
    (prefix) => pathname.startsWith(prefix) && pathname.length > prefix.length
  );
}

export default defineConfig({
  site: 'https://www.autonomybridge.com',
  trailingSlash: 'never',
  build: {
    format: 'file',
  },
  markdown: {
    syntaxHighlight: false,
    remarkPlugins: [remarkStripDirectives],
  },
  integrations: [
    sitemap({
      filter: (entry) => isAllowedSitemapPath(toPathname(entry)),
    }),
  ],
});
