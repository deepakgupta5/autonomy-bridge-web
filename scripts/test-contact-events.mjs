import assert from 'node:assert/strict';
import {recordReceipt,readReceipt,lifetime} from '../netlify/lib/contact-receipts.mjs';
import {submitNetlifyContact} from '../src/utils/netlify-contact-transport.mjs';
const entries=new Map();const store={setJSON:async(k,v)=>entries.set(k,v),get:async k=>entries.get(k),delete:async k=>entries.delete(k)};
const id='0f0085ca-69b6-43d4-b8b6-933fffa0b052';const now=1000000;
assert.equal(await recordReceipt({'submission-reference':id},store,now),false);
assert.equal(await recordReceipt({'receipt-kind':'autonomybridge-contact-v1','submission-reference':id,email:'never-stored@example.invalid'},store,now),true);
assert.deepEqual(entries.get(id),{acceptedAt:now});
assert.deepEqual(await readReceipt(id,store,now+1000),{accepted:true,reference:id});
assert.deepEqual(await readReceipt('bad',store,now),{accepted:false});
assert.deepEqual(await readReceipt(id,store,now+lifetime),{accepted:false});assert.equal(entries.size,0);
const data={name:'Fixture',email:'fixture@example.invalid',company:'Fixture',message:'Fixture'};
let posts=0,gets=0;
const result=await submitNetlifyContact(data,{enabled:true,origin:'https://autonomybridge.com',reference:()=>id,receiptAttempts:3,wait:async()=>{},fetchImpl:async(url,opts)=>{
 if(opts.method==='POST'){posts++;return new Response('OK');}
 gets++;return new Response(JSON.stringify(gets===3?{accepted:true,reference:id}:{accepted:false}),{headers:{'content-type':'application/json'}});
}});
assert.equal(result.outcome,'accepted');assert.equal(posts,1);assert.equal(gets,3);
const unknown=await submitNetlifyContact(data,{enabled:true,origin:'https://autonomybridge.com',reference:()=>id,fetchImpl:async()=>new Response('HTML')});assert.equal(unknown.outcome,'unknown');
console.log('Passed: verified-event marker only, no enquiry data stored, expiry, one POST with receipt polling, ambiguous response never success. Offline fixtures only.');
