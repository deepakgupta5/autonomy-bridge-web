import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

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
  integrations: [
    sitemap({
      filter: (entry) => isAllowedSitemapPath(toPathname(entry)),
    }),
  ],
});
