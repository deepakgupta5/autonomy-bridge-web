import { parseFragment, serialize } from 'parse5';
import type { DefaultTreeAdapterMap } from 'parse5';
import type { DiagramAsset } from '../data/diagramAssetMap';
type Node = DefaultTreeAdapterMap['node'];
type ChildNode = DefaultTreeAdapterMap['childNode'];
type Element = DefaultTreeAdapterMap['element'];
const children = (n: Node): ChildNode[] => 'childNodes' in n ? n.childNodes : [];
const text = (n: Node): string => n.nodeName === '#text' ? (n as DefaultTreeAdapterMap['textNode']).value : children(n).map(text).join('');
const tag = (n: Node) => 'tagName' in n ? n.tagName : '';
const attr = (n: Node, key: string) => 'attrs' in n ? n.attrs.find(a => a.name === key)?.value : undefined;
const escape = (s: string) => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
function descendants(n: Node): Node[] { return children(n).flatMap(c => [c,...descendants(c)]); }
function replace(n: Node, replacements: ChildNode[]) {
  if (!('parentNode' in n) || !n.parentNode) return;
  const p = n.parentNode;
  p.childNodes.splice(p.childNodes.indexOf(n),1,...replacements);
  for (const c of replacements) if ('parentNode' in c) c.parentNode = p;
}
const fragment = (html: string) => parseFragment(html).childNodes;
// Preserve fragment destinations even when internal presentation nodes disappear.
function remove(n: Node) {
  const ids = [n,...descendants(n)].map(x => attr(x,'id')).filter((x): x is string => !!x);
  replace(n, fragment(ids.map(id => `<span id="${escape(id)}"></span>`).join('')));
}
/** Server-only presentation transform. Never evaluates source content or fetches assets. */
export function renderResearchBody(html: string, diagrams: DiagramAsset[], hubPath: string) {
  const root = parseFragment(html);
  let heroId: string | undefined;
  const firstH1 = descendants(root).find(n => tag(n) === 'h1');
  if (firstH1) {
    heroId = attr(firstH1,'id');
    // The hero takes the existing heading fragment, so no duplicate ID is emitted.
    replace(firstH1, []);
  }
  // A malformed additional H1 is a build error rather than a silently changed hierarchy.
  if (descendants(root).some(n => tag(n) === 'h1')) throw new Error('Unexpected additional research H1');
  const figures = new Map(diagrams.map(d => [`fig_${d.diagramOrder}`,d]));
  for (const p of descendants(root).filter(n => tag(n) === 'p')) {
    const value = text(p).trim();
    if (!value.startsWith('[NO VISIBLE IMAGE')) continue;
    const key = value.match(/\bfig_(\d+)(?:\b|_)/i)?.[1];
    const d = diagrams.find(d => value.includes(d.originalFilename)) ?? (key ? figures.get(`fig_${Number(key)}`) : undefined);
    // Missing assets must be resolved explicitly, never silently hidden.
    if (!d) throw new Error(`Unmapped research figure: ${value}`);
    replace(p, fragment(`<figure class="inline-diagram"><img src="${escape(d.publicPath)}" alt="${escape(d.caption)}" width="${d.width}" height="${d.height}" loading="lazy" decoding="async"><figcaption class="type-caption">${escape(d.caption)}</figcaption></figure>`));
  }
  let appendix = false, directive = false, faq = false;
  for (const n of [...root.childNodes]) {
    const value = text(n).trim();
    if (tag(n) === 'h2' && value.startsWith('Appendix')) appendix = true;
    if (appendix) { remove(n); continue; }
    if (directive) { remove(n); if (value === ':::') directive = false; continue; }
    if (tag(n) === 'p' && /^:::[a-z]/.test(value)) {
      directive = !value.endsWith(':::'); remove(n); continue;
    }
    if (tag(n) === 'h2') faq = value.toLowerCase().startsWith('frequently asked');
    if (faq && tag(n) === 'p') {
      const strong = children(n).find(c => tag(c));
      if (strong && tag(strong) === 'strong') {
        const answer = children(n).slice(children(n).indexOf(strong)+1);
        const wrapper = fragment(`<div class="faq-qa-pair"><div class="faq-q">${escape(text(strong))}</div>${answer.map(text).join('').trim() ? '<div class="faq-a"></div>' : ''}</div>`)[0] as Element;
        const a = wrapper.childNodes[1] as Element | undefined;
        if (a) { a.childNodes = answer; for (const c of answer) if ('parentNode' in c) c.parentNode = a; }
        replace(n,[wrapper]);
      }
    }
  }
  for (const n of descendants(root)) {
    const value = text(n).trim();
    if (tag(n) === 'p' && /^All .+ →$/.test(value)) {
      const links = descendants(n).filter(c => tag(c) === 'a');
      // The template already renders this exact hub link above the body.
      if (links.length === 1 && attr(links[0],'href') === hubPath) remove(n);
    }
    // Retain other link-bearing reference paragraphs. The old client cleanup
    // hid some sources that were not duplicated in the related navigation.
    if (tag(n) === 'pre' && value.startsWith('{') && value.includes('"@context"')) remove(n);
  }
  // Claim withdrawals can leave empty source sections. Keep their fragment
  // destinations while omitting headings that no longer introduce content.
  for (const n of [...root.childNodes].reverse()) {
    if (!/^h[2-6]$/.test(tag(n))) continue;
    const following = root.childNodes.slice(root.childNodes.indexOf(n) + 1).find(x =>
      !(['hr', 'span'].includes(tag(x)) || (x.nodeName === '#text' && !text(x).trim())));
    if (!following || /^h[2-6]$/.test(tag(following))) remove(n);
  }
  function clean(n: Node, linked = false) {
    if (['script','style','pre','code'].includes(tag(n))) return;
    if (n.nodeName === '#text') {
      const t = n as DefaultTreeAdapterMap['textNode'];
      // Unlinked editorial marker labels refer to internal appendices already
      // excluded by Markdown. Preserve linked source citations and public prose.
      if (!linked) t.value = t.value.replace(/\s*\[[A-Z]\d+\]/g,'');
      const pattern = /(\(Autonomy Bridge proprietary analysis[^)]*\))/g;
      if (pattern.test(t.value)) replace(t,fragment(escape(t.value).replace(pattern,'<cite class="ab-citation">$1</cite>')));
      return;
    }
    for (const c of [...children(n)]) clean(c,linked || tag(n) === 'a');
  }
  clean(root);
  return { html: serialize(root), heroId };
}
