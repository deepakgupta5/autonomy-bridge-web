import {readFileSync,writeFileSync,readdirSync} from 'node:fs';
import {join} from 'node:path';
import {parse} from 'parse5';
import assert from 'node:assert/strict';
const [dist,out]=process.argv.slice(2);
const walk=n=>[n,...(n.childNodes??[]).flatMap(walk)];
const attr=(n,k)=>n.attrs?.find(a=>a.name===k)?.value;
const text=n=>n.value??(n.childNodes??[]).map(text).join('');
const hasClass=(n,c)=>(attr(n,'class')??'').split(' ').includes(c);
const files=dir=>readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?files(join(dir,e.name)):[join(dir,e.name)]);
let scanned=0;for(const f of files(dist)){const b=readFileSync(f);assert(!/deepak@autonomybridge\.com|mailto:/i.test(b.toString('utf8')),f+' public mailbox');scanned++;}
const research=[];
for(const family of ['frameworks','insights','use-cases','case-studies'])for(const f of readdirSync(join(dist,family)).filter(f=>f.endsWith('.html'))){
 const route=`/${family}/${f.replace(/\.html$/,'')}`,nodes=walk(parse(readFileSync(join(dist,family,f),'utf8')));
 const schemas=nodes.filter(n=>attr(n,'type')==='application/ld+json').flatMap(n=>JSON.parse(text(n)));
 const article=schemas.find(n=>[n['@type']].flat().some(t=>['Article','TechArticle','CaseStudy'].includes(t)));assert(article,route);
 const byline=nodes.find(n=>hasClass(n,'research-byline'));assert(byline,route+' byline');
 const names=[article.author].flat().map(a=>a.name);for(const name of names)assert(text(byline).includes(name),route+' author parity');
 assert(!article.datePublished&&!article.dateModified,route+' unverified public dates');assert(text(byline).includes('Source date record:'),route+' historical source dates');
 const body=nodes.find(n=>hasClass(n,'detail-body')),bn=walk(body);
 const publicReferences=[...new Set(bn.filter(n=>n.tagName==='a').map(n=>attr(n,'href')).filter(h=>/^https?:/.test(h)&&!new URL(h).hostname.endsWith('autonomybridge.com')))];
 const claims=bn.filter(n=>['p','li','td'].includes(n.tagName)).map(text).filter(t=>/\d\s*(?:%|percent|months?|years?|hours?|million|billion)|[>$€£]\s*\d|\b\d+[–-]\d+\b/i.test(t));
 const proprietary=bn.filter(n=>['p','blockquote'].includes(n.tagName)).map(text).filter(t=>/proprietary analysis/i.test(t));
 const qualification=nodes.find(n=>hasClass(n,'research-evidence-note'));assert(qualification&&text(qualification).includes('Unsupported numerical benchmarks identified in the review have been withdrawn'),route+' evidence scope');
 research.push({route,authors:names,datePublished:article.datePublished,dateModified:article.dateModified,visible_schema_parity:true,public_references:publicReferences,proprietary_analysis_excerpts:[...new Set(proprietary)],numerical_claims:[...new Set(claims)],treatment:'Claim-level withdrawals and revisions are recorded in revision-2 ledgers. Remaining source accounts are identified as not independently verified; linked definitions are not evidence for client outcomes.',exception:publicReferences.length?'Definition/method references do not independently substantiate proprietary findings.':'No public third-party source links in article body; proprietary claims not independently substantiated.'});
}
assert.equal(research.length,55);
for(const route of ['contact','privacy-policy','terms-of-use','cookie-policy']){const html=readFileSync(join(dist,route+'.html'),'utf8');assert(html.includes('privacy-request'),route+' privacy request path');}
const contact=readFileSync(join(dist,'contact.html'),'utf8');assert(contact.includes('data-netlify="true"')&&contact.includes('name="privacy-request"'));assert(contact.includes('Enable JavaScript'));
const roi=readFileSync(join(dist,'frameworks/robotics-roi-model.html'),'utf8');assert(roi.includes('ROI_H')&&roi.includes('66.7%')&&roi.includes('robotics-roi-model-diagram-01.svg'));
assert(!roi.includes('U = Tsystem / Davg'));assert(!readFileSync(join(dist,'frameworks/automation-failure-framework.html'),'utf8').includes('U = Installed Capacity / Actual Task Volume'));
for(const f of files(dist).filter(f=>f.endsWith('.html')))assert(!readFileSync(f,'utf8').includes('require sustained utilization above approximately 70-80%'),f);
const report={passed:true,public_files_scanned:scanned,public_email_or_mailto_matches:0,research_detail_pages:research.length,research,scope:'Source/built attribution audit; not independent validation of underlying proprietary records. Unsubstantiated public dates omitted; original source date records retained visibly.'};
writeFileSync(out,JSON.stringify(report,null,2)+'\n');
const md=['# Research attribution exceptions: all 55 detail routes','','Each row has matching visible and structured author identity. Original date values are displayed as source records; unsubstantiated public datePublished/dateModified fields are omitted. Claim-level changes are in the revision-2 ledgers. Case identities and 18 service proof excerpts are unchanged. Public references listed below support definitions/methods only. Full claim excerpts and URLs are in attribution.json.','','| Route | Public references | Numeric passages flagged | Proprietary passages | Concrete release treatment / remaining evidence |','|---|---:|---:|---:|---|',...research.map(r=>`| ${r.route} | ${r.public_references.length} | ${r.numerical_claims.length} | ${r.proprietary_analysis_excerpts.length} | ${r.exception} See claim-level withdrawal and replacement ledgers. Source-account identity is retained without claiming independent verification. |`)];
writeFileSync(out.replace(/\.json$/,'.md'),md.join('\n')+'\n');console.log(JSON.stringify({passed:true,public_files_scanned:scanned,details:research.length,with_external_sources:research.filter(r=>r.public_references.length).length}));
