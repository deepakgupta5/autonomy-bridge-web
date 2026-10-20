import {deploymentPolicy} from '../config/deployment-policy.mjs';
import {readFileSync,writeFileSync,readdirSync,existsSync} from 'node:fs';
import {join} from 'node:path';
import assert from 'node:assert/strict';
import {parse} from 'parse5';
const [dist,baseline,out]=process.argv.slice(2);
const walk=n=>[n,...(n.childNodes??[]).flatMap(walk)];
const attr=(n,k)=>n.attrs?.find(a=>a.name===k)?.value;
const text=n=>n.value??(n.childNodes??[]).map(text).join('');
const select=(nodes,tag)=>nodes.filter(n=>n.tagName===tag);
const results=[];
const revised=JSON.parse(readFileSync('config/material-research-revisions.json'));
const dates=JSON.parse(readFileSync('config/research-review-exceptions.json'));

for(const family of ['frameworks','insights','use-cases','case-studies'])for(const file of readdirSync(join(dist,family)).filter(x=>x.endsWith('.html'))){
 const route=`/${family}/${file.replace(/\.html$/,'')}`;
 const html=readFileSync(join(dist,family,file),'utf8'),nodes=walk(parse(html));
 const old=walk(parse(readFileSync(join(baseline,family,file),'utf8')));
 assert.equal(select(nodes,'h1').length,1,route+' H1');
 const body=nodes.find(n=>(attr(n,'class')??'').split(' ').includes('detail-body'));
 const bodyNodes=walk(body);
 assert(!/\[NO VISIBLE IMAGE|:::[a-z]|rule_id:|GENERATED_BY_PIPELINE/.test(text(body)),route+' leaked metadata');
 assert(!html.includes('const figMap = new Map'),route+' client transform');
 const ids=nodes.map(n=>attr(n,'id')).filter(Boolean);
 assert.equal(ids.length,new Set(ids).size,route+' duplicate ids');
 for(const id of old.map(n=>attr(n,'id')).filter(Boolean))assert(ids.includes(id),route+' lost fragment '+id);
 const structured=ns=>select(ns,'script').filter(n=>attr(n,'type')==='application/ld+json').map(n=>JSON.parse(text(n)));
 // Baseline is the canonical PR build, so full schema must match, not only dates.
 const now=structured(nodes),prior=structured(old);
 const normalize=(entries,changed)=>entries.map(e=>{
  const x=structuredClone(e);delete x.datePublished;delete x.dateModified;
  if(dates.title_routes.includes(route)&&x['@type']==='BreadcrumbList')delete x.itemListElement.at(-1).name;
  if(changed){delete x.headline;delete x.description;if(x['@type']==='FAQPage')return null;}
  return x;
 }).filter(Boolean);
 assert.deepEqual(normalize(now,revised.includes(route)),normalize(prior,revised.includes(route)),route+' schema identity');
 const article=now.flat().find(e=>[e['@type']].flat().some(t=>['Article','TechArticle','CaseStudy'].includes(t)));assert(article,route+' article');assert.equal(article.headline??article.name,text(select(nodes,'h1')[0]),route+' schema headline');
 for(const e of now){assert(!e.datePublished,route+' unverified publication date');const expected=e===article&&revised.includes(route)?deploymentPolicy.researchRevisionDate:undefined;assert.equal(e.dateModified,expected??undefined,route+' modification date');if(e['@type']==='FAQPage')for(const q of e.mainEntity){const plain=text(body).replace(/\s+/g,' ');assert(plain.includes(q.name.replace(/\s+/g,' ')),route+' FAQ question');assert(plain.includes(q.acceptedAnswer.text.replace(/\s+/g,' ')),route+' FAQ answer');}}

 const figures=select(bodyNodes,'figure');
 for(const f of figures){
  const fn=walk(f),img=select(fn,'img');assert.equal(img.length,1,route);
  assert(attr(img[0],'alt')?.trim(),route+' alt');
  assert(existsSync(join(dist,attr(img[0],'src'))),route+' image file');
  assert.equal(attr(img[0],'alt'),text(select(fn,'figcaption')[0]),route+' caption');
 }
 const oldBody=old.find(n=>(attr(n,'class')??'').split(' ').includes('detail-body'));
 const oldLinks=select(walk(oldBody),'a').map(n=>attr(n,'href'));
 const newLinks=select(nodes,'a').map(n=>attr(n,'href'));
 for(const link of oldLinks)assert(newLinks.includes(link),route+' lost reference '+link);
 results.push({route,h1:1,figures:figures.length,fragment_targets_preserved:true,schema_identity_preserved:true,faq_matches_visible_text:true,unverified_dates_omitted:true,reference_destinations_preserved:true});
}
writeFileSync(out,JSON.stringify({passed:true,detail_pages:results.length,figures:results.reduce((s,r)=>s+r.figures,0),pages:results},null,2)+'\n');
console.log(`${results.length} detail pages; ${results.reduce((s,r)=>s+r.figures,0)} figures; all static checks passed`);
