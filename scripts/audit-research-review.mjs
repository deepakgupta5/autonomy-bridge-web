import {deploymentPolicy} from '../config/deployment-policy.mjs';
import {readFileSync,writeFileSync,readdirSync} from 'node:fs';
import {join} from 'node:path';import assert from 'node:assert/strict';import {parse} from 'parse5';
const [dist,out]=process.argv.slice(2),walk=n=>[n,...(n.childNodes??[]).flatMap(walk)],attr=(n,k)=>n.attrs?.find(a=>a.name===k)?.value,text=n=>n.value??(n.childNodes??[]).map(text).join('');
const files=d=>readdirSync(d,{withFileTypes:true}).flatMap(e=>e.isDirectory()?files(join(d,e.name)):[join(d,e.name)]);
const revised=JSON.parse(readFileSync('config/material-research-revisions.json'));const report={passed:true,public_files:0,pages:0,material_revision_notices:[],checks:[]};
for(const f of files(dist)){
 const s=readFileSync(f,'utf8');assert(!/deepak@autonomybridge\.com|mailto:/i.test(s),f+' email');if(/\.(html|js)$/.test(f))assert(!/googletagmanager\.com|google-analytics\.com|G-ZX7LHWYBWP/.test(s),f+' analytics');report.public_files++;
 if(!f.endsWith('.html'))continue;report.pages++;
 const ns=walk(parse(s)),visible=text(ns.find(n=>n.tagName==='main')).replace(/\s+/g,' '),route='/'+f.slice(dist.length+1,-5).replace(/^index$/,'');
 assert(!/calculated by dividing annualized capital cost|U\s*[≥<]\s*U_min|V_min\s*=|utilization.*(?:require|above approximately) 70.?80%/i.test(visible),route+' stale threshold');
 const metadata=ns.filter(n=>n.tagName==='meta'&&['description','og:description'].includes(attr(n,'name')??attr(n,'property'))).map(n=>attr(n,'content')).join(' ');
 if(/^\/(case-studies|glossary)\//.test(route))assert(!/%|\b\d+(?:\.\d+)?[x×]\b/.test(metadata),route+' unsupported metadata figure');
 const schemas=ns.filter(n=>attr(n,'type')==='application/ld+json').map(text).join(' ');
 assert(!/calculated by dividing annualized capital cost|total annual capital cost by per-unit labor savings|Every automation investment carries a minimum utilization threshold/.test(metadata+schemas),route+' contrary metadata/schema threshold');
 if(revised.includes(route)){assert(visible.includes(deploymentPolicy.researchRevisionDate ? 'Last updated: '+deploymentPolicy.researchRevisionDate : 'Revision prepared for release; publication pending.'),route+' revision notice');report.material_revision_notices.push(route);}
 if(route==='/terms-of-use'){assert(!visible.includes('email the contact form'));assert(ns.some(n=>n.tagName==='a'&&attr(n,'href')==='/contact'&&text(n)==='the contact form'));}
 if(route==='/privacy-policy')for(const phrase of ['15 minutes','scheduled','has not been verified in production','us-east-2 (Ohio)','does not establish account-wide residency'])assert(visible.includes(phrase),phrase);
 if(route==='/contact'){assert(ns.some(n=>n.tagName==='form'&&attr(n,'data-netlify')==='true'));assert(!s.includes('name="privacy-request"'));assert(ns.some(n=>n.tagName==='input'&&attr(n,'name')==='company'&&!n.attrs?.some(a=>a.name==='required')));}
}
assert.equal(report.pages,160);assert.equal(report.material_revision_notices.length,revised.length);
const robots=readFileSync(join(dist,'robots.txt'),'utf8');for(const agent of ['GPTBot','ClaudeBot','Google-Extended'])assert(new RegExp('User-agent: '+agent+'\\s+Allow: /').test(robots),agent);
assert(readFileSync(join(dist,'_redirects'),'utf8').includes(JSON.parse(readFileSync('config/research-review-exceptions.json')).redirect_line));
report.checks=['160 pages scanned; all public files checked for mailbox/mailto and Google analytics','Stale ROI threshold formulations absent in rendered main content','All registered material revisions show the configured release date or pending state','Terms uses linked contact form; privacy distinguishes validity, scheduled cleanup and region scope','Form-only Contact with optional company; privacy requests described in policy','GPTBot, ClaudeBot, Google-Extended remain Allow /','Historical diagram redirect present'];
writeFileSync(out,JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify({passed:true,pages:report.pages,files:report.public_files,revised:revised.length}));
