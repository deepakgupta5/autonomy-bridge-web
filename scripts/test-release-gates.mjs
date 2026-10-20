import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import vm from 'node:vm';
import ts from 'typescript';
import {deploymentPolicy, allowedRuntime} from '../config/deployment-policy.mjs';
const checks=[];
const policy={mode:'production',origin:'https://autonomybridge.com',siteId:'00000000-0000-4000-8000-000000000001',formEnabled:true};
const env={SITE_ID:policy.siteId,CONTEXT:'production',AB_CONTACT_RECEIPTS_ENABLED:'true'};
assert.equal(allowedRuntime(deploymentPolicy,env,policy.origin),false);
assert.equal(allowedRuntime(policy,env,policy.origin),true);
for(const changed of [{...policy,formEnabled:false},{...policy,mode:'acceptance'},{...policy,siteId:'placeholder'},{...policy,origin:'https://other.invalid'},{...policy,origin:'https://autonomybridge.com/path'}]) assert.equal(allowedRuntime(changed,env,changed.origin),false);
for(const changed of [{...env,SITE_ID:'other'},{...env,CONTEXT:'deploy-preview'},{...env,AB_CONTACT_RECEIPTS_ENABLED:'false'}]) assert.equal(allowedRuntime(policy,changed,policy.origin),false);
assert.equal(allowedRuntime(policy,env,'https://www.autonomybridge.com'),false);
checks.push('Source mode, form flag, exact origin/site/context and server gate fail closed');
for(const extra of [{NETLIFY:'true'},{CI:'true'}]) assert.notEqual(spawnSync(process.execPath,['scripts/preview-build-guard.mjs'],{env:{...process.env,...extra}}).status,0);
checks.push('Local source refuses remote builds even with release environment settings');
const js=ts.transpileModule(readFileSync('src/utils/contact-form.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
for(const outcome of ['accepted','unknown','rejected','throw']) {
 const controls=Object.fromEntries(['name','email','company','message'].map(name=>[name,{value:name==='email'?'fixture@example.invalid':'Fixture',validity:{valid:true},setAttribute(){},focus(){}}]));
 const button={disabled:true,dataset:{}};const status={textContent:'',focus(){}};const errors={};let listener;let sends=0;let assigned;const stored=new Map();
 const form={elements:{namedItem:n=>controls[n]},querySelector:s=>s==='button[type=submit]'?button:s==='#form-status'?status:(errors[s]??={textContent:''}),addEventListener:(event,fn)=>listener=fn};
 const context={exports:{},require:name=>name.includes('deployment-policy')?{deploymentPolicy:policy}:{submitNetlifyContact:async(data,opts)=>{sends++;assert.equal(opts.enabled,true);assert.equal(data.get('message'),'Fixture');if(outcome==='throw')throw Error('fixture');return {outcome};}},AbortController,URLSearchParams,FormData:class {constructor(){return Object.entries(controls).map(([k,v])=>[k,v.value]);}},window:{setTimeout:()=>1},clearTimeout(){},location:{origin:policy.origin,assign:p=>assigned=p},sessionStorage:{setItem:(k,v)=>stored.set(k,v)},fetch(){throw Error('Real fetch forbidden');}};
 vm.runInNewContext(js,context);context.exports.mountContactForm(form);
 await listener({preventDefault(){}});
 assert.equal(sends,1);assert.equal(controls.message.value,'Fixture');
 if(outcome==='accepted'){assert.equal(assigned,'/contact-success');assert.equal(stored.get('ab-service-accepted'),'1');assert.equal(stored.has('ab-preview-accepted'),false);}
 else {assert.equal(assigned,undefined);assert.equal(stored.size,0);assert.match(status.textContent,outcome==='rejected'?/wasn’t submitted/:/couldn’t confirm/);}
 if(outcome==='unknown'||outcome==='throw'){assert.equal(button.disabled,true);await listener({preventDefault(){}});assert.equal(sends,1);}
}
checks.push('Wired UI: confirmed acceptance alone redirects; failure/unknown preserve inputs; unknown blocks duplicate sends; service and fixture markers distinct');
const diff=spawnSync('python3',['scripts/prepare-release-patch.py','--origin',policy.origin,'--site-id',policy.siteId],{encoding:'utf8'});
assert.equal(diff.status,0);assert.match(diff.stdout,/\+  mode: 'production'/);assert.match(diff.stdout,/\+  formEnabled: true/);
assert.equal(spawnSync('git',['apply','--check','-'],{input:diff.stdout}).status,0);
assert.equal(spawnSync('python3',['scripts/prepare-release-patch.py','--origin',policy.origin,'--site-id','PLACEHOLDER']).status,2);
const fallback=spawnSync('python3',['scripts/prepare-release-patch.py','--origin',policy.origin,'--site-id',policy.siteId,'--email-only'],{encoding:'utf8'});
assert.equal(fallback.status,0);assert.doesNotMatch(fallback.stdout,/\+  formEnabled: true/);
assert.equal(spawnSync('git',['apply','--check','-'],{input:fallback.stdout}).status,0);
checks.push('Activation and email-only diffs apply cleanly without modifying checkout; placeholder target rejected');
console.log(JSON.stringify({passed:true,checks,limits:'Offline fixtures only. No deployment, Netlify receipt or mailbox delivery tested.'},null,2));
