import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { deploymentPolicy } from './config/deployment-policy.mjs';
import revisedResearch from './config/material-research-revisions.json' assert { type: 'json' };

/** Strips :::directive blocks from markdown before rendering. */
function remarkStripDirectives() {
  return function (tree) {
    const nodeText = node => node.value ?? (node.children ?? []).map(nodeText).join('\n');
    let inDirective = false;
    tree.children = tree.children.filter((node) => {
      const value = nodeText(node).trim();
      if (inDirective) {
        if (/(?:^|\n):::$/.test(value)) inDirective = false;
        return false;
      }
      if (/^:::[a-z]/.test(value)) {
        inDirective = !value.endsWith(':::');
        return false;
      }
      return value !== ':::';
    });
    if (inDirective) throw new Error('Unclosed internal Markdown directive');
  };
}

/** Strips {#anchor-id} annotations from heading text nodes.
 *  e.g. "## The TAM Trap {#the-tam-trap}" → "## The TAM Trap"
 */
function remarkStripHeadingIds() {
  return function (tree) {
    function walk(node) {
      if (node.type === 'heading' && Array.isArray(node.children)) {
        const last = node.children[node.children.length - 1];
        if (last?.type === 'text') {
          last.value = last.value.replace(/\s*\{#[^}]+\}$/, '');
          if (last.value === '') node.children.pop();
        }
      }
      if (Array.isArray(node.children)) node.children.forEach(walk);
    }
    walk(tree);
  };
}

/** Strips all ## Appendix: sections and everything after them.
 *  These are internal metadata sections (Citations, Assets, Metadata Snapshot)
 *  not intended for public rendering.
 */
function remarkStripAppendix() {
  return function (tree) {
    const children = tree.children;
    for (let i = 0; i < children.length; i++) {
      const node = children[i];
      if (
        node.type === 'heading' &&
        node.children?.[0]?.type === 'text' &&
        node.children[0].value.startsWith('Appendix:')
      ) {
        children.splice(i);
        break;
      }
    }
  };
}

const topLevelCanonicalPaths = new Set([
  '/',
  '/startups',
  '/nonprofits',
  '/sales-leadership',
  '/research',
  '/insights',
  '/market-overview',
  '/frameworks',
  '/use-cases',
  '/case-studies',
  '/methodology',
  '/glossary',
  '/bespoke-research',
  '/about',
  '/contact',
  '/sitemap',
]);

// Legal/utility pages -- excluded from sitemap (thin content, Google declines to index)
const legalPaths = new Set([
  '/privacy-policy',
  '/terms-of-use',
  '/cookie-policy',
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
  return normalizePathname(new URL(asString, 'https://autonomybridge.com').pathname);
}

function isAllowedSitemapPath(pathname) {
  if (legacyPaths.has(pathname) || legalPaths.has(pathname) || isDateBasedPath(pathname)) {
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
  site: 'https://autonomybridge.com',
  trailingSlash: 'never',
  build: {
    format: 'file',
  },
  markdown: {
    syntaxHighlight: false,
    remarkPlugins: [remarkStripDirectives, remarkStripHeadingIds, remarkStripAppendix],
  },
  integrations: [
    sitemap({
      filter: (entry) => isAllowedSitemapPath(toPathname(entry)),
      serialize: item => ({...item, ...(deploymentPolicy.mode === 'production' && revisedResearch.includes(toPathname(item.url)) && deploymentPolicy.researchRevisionDate ? {lastmod: deploymentPolicy.researchRevisionDate} : {})}),
    }),
  ],
});
