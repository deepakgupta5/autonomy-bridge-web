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
assert.equal(report.pages['/contact'].after.forms,0);
assert(report.pages['/contact'].after.links.some(l=>l.href==='mailto:deepak@autonomybridge.com'));
assert(!/submitted|reply by|response time|Send enquiry/i.test(report.pages['/contact'].after.articleText));
for(const needle of ['organizational question','defined requirement','existing attempt'])assert(report.pages['/ai-consulting'].after.articleText.toLowerCase().includes(needle));
// No research content, image or legal-page changes behind the new shared header.
const files=(root)=>readdirSync(root,{withFileTypes:true}).flatMap(d=>d.isDirectory()?files(join(root,d.name)):[join(root,d.name)]);
let assets=0;
for(const old of files(join(baseline,'diagrams'))){const current=join(dist,old.slice(baseline.length));assert(readFileSync(old).equals(readFileSync(current)),current+' image changed');assets++;}
for(const family of ['frameworks','insights','use-cases','case-studies','market-overview','glossary']){
 for(const file of readdirSync(join(dist,family)).filter(x=>x.endsWith('.html'))){
  const route='/'+family+'/'+file.slice(0,-5);
  const old=walk(parse(readFileSync(join(baseline,family,file),'utf8'))),now=walk(parse(readFileSync(join(dist,family,file),'utf8')));
  assert.equal(text(now.find(n=>n.tagName==='main')),text(old.find(n=>n.tagName==='main')),route+' research text changed');
 }
}
for(const route of ['/privacy-policy','/terms-of-use','/cookie-policy','/methodology']){
 const old=walk(parse(readFileSync(join(baseline,route.slice(1)+'.html'),'utf8'))),now=walk(parse(readFileSync(join(dist,route.slice(1)+'.html'),'utf8')));
 assert.equal(text(now.find(n=>n.tagName==='main')),text(old.find(n=>n.tagName==='main')),route+' text changed');
}
assert(readFileSync(join(dist,'robots.txt')).equals(readFileSync(join(baseline,'robots.txt'))));
assert(readFileSync(join(dist,'_redirects')).equals(readFileSync(join(baseline,'_redirects'))));
report.unchanged_diagram_files=assets;report.research_legal_methodology_text_unchanged=true;
report.nonprofit_occurrences=[];
for(const [route,p] of Object.entries(report.pages))for(const [field,value] of [['meta description',p.after.description],['og description',p.after.ogDescription],['twitter description',p.after.twitterDescription],...p.after.paragraphs.map((s,i)=>['paragraph '+(i+1),s])])if(/nonprofit/i.test(value))report.nonprofit_occurrences.push({route,field,text:value});
report.nonprofit_occurrences.push({file:'public/llms.txt',text:readFileSync('public/llms.txt','utf8').split('\n').find(s=>s.includes('nonprofit'))});
writeFileSync(output,JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify({passed:true,core_pages:5,unchanged_diagram_files:assets,nonprofit_occurrences:report.nonprofit_occurrences.length}));
