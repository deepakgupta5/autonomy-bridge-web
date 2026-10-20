import {readFileSync,writeFileSync,readdirSync} from 'node:fs';
import {join} from 'node:path';import assert from 'node:assert/strict';import {parse} from 'parse5';
const [dist,baseline,output]=process.argv.slice(2),routes=['/','/commercial-leadership','/ai-consulting','/about','/contact'];
const walk=n=>[n,...(n.childNodes??[]).flatMap(walk)];const text=n=>n.value??(n.childNodes??[]).map(text).join('');const attr=(n,k)=>n.attrs?.find(a=>a.name===k)?.value;
function snapshot(root,route){
 const html=readFileSync(join(root,route==='/'?'index.html':route.slice(1)+'.html'),'utf8'),ns=walk(parse(html));
 const article=ns.find(n=>n.tagName==='article'),an=walk(article);
 const meta=name=>attr(ns.find(n=>n.tagName==='meta'&&(attr(n,'name')===name||attr(n,'property')===name))??{},'content');
 return {title:text(ns.find(n=>n.tagName==='title')),description:meta('description'),ogTitle:meta('og:title'),ogDescription:meta('og:description'),twitterDescription:meta('twitter:description'),ogUrl:meta('og:url'),robots:meta('robots'),canonical:attr(ns.find(n=>n.tagName==='link'&&attr(n,'rel')==='canonical'),'href'),headings:an.filter(n=>/^h[1-6]$/.test(n.tagName??'')).map(n=>({tag:n.tagName,id:attr(n,'id'),text:text(n)})),paragraphs:an.filter(n=>n.tagName==='p').map(text),links:an.filter(n=>n.tagName==='a').map(n=>({text:text(n),href:attr(n,'href')})),schema:ns.filter(n=>n.tagName==='script'&&attr(n,'type')==='application/ld+json').map(n=>JSON.parse(text(n))),forms:ns.filter(n=>n.tagName==='form').length,articleText:text(article).replace(/\s+/g,' ').trim()};
}
const copy=JSON.parse(readFileSync('src/data/preview-copy.json')),report={pages:{},passed:true};
for(const route of routes){
 const before=snapshot(baseline,route),after=snapshot(dist,route);
 assert.equal(after.headings.filter(h=>h.tag==='h1').length,1,route);
 assert.equal(after.title,copy[route].metadata.title);assert.equal(after.description,copy[route].metadata.description);
 assert.equal(after.ogTitle,after.title);assert.equal(after.ogDescription,after.description);
 assert.equal(after.robots,'index,follow');assert.equal(after.canonical,before.canonical);assert.equal(after.ogUrl,after.canonical);
 assert.deepEqual(after.schema,before.schema,route+' schema changed');
 if(route==='/commercial-leadership')assert(!/nonprofit/i.test(after.articleText+' '+after.description));
 report.pages[route]={before,after};
}
assert.equal(report.pages['/'].before.headings[0].text,report.pages['/'].after.headings[0].text);
assert.equal(report.pages['/contact'].after.forms,1);
assert(!report.pages['/contact'].after.links.some(l=>l.href?.startsWith('mailto:')));
assert(report.pages['/contact'].after.articleText.includes('Send enquiry'));
for(const needle of ['organizational question','defined requirement','existing attempt'])assert(report.pages['/ai-consulting'].after.articleText.toLowerCase().includes(needle));

assert(readFileSync(join(dist,'robots.txt')).equals(readFileSync(join(baseline,'robots.txt'))));
const lines=s=>s.split('\n').filter(l=>l.trim()&&!l.startsWith('#'));
const exception=JSON.parse(readFileSync('config/research-review-exceptions.json'));
assert.deepEqual(lines(readFileSync(join(dist,'_redirects'),'utf8')), [...lines(readFileSync(join(baseline,'_redirects'),'utf8')),exception.redirect_line]);
report.crawler_rules_unchanged=true;report.redirect_registry_preserved_with_approved_diagram_redirect=true;
writeFileSync(output,JSON.stringify(report,null,2)+'\n');console.log('Passed: five core pages, title/description/OG/schema consistency, audiences, form-only Contact, crawler/redirect preservation.');
