import {getStore} from '@netlify/blobs';
export const referencePattern=/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
export const lifetime=15*60*1000;
export const receiptStore=()=>getStore({name:'contact-receipts',consistency:'strong',region:'us-east-2'});
// Called only by Netlify's signed, verified-submission event, never a public write API.
export async function recordReceipt(data,store=receiptStore(),now=Date.now()) {
 const reference=data?.['submission-reference'];
 if(data?.['receipt-kind']!=='autonomybridge-contact-v1'||!referencePattern.test(reference||''))return false;
 await store.setJSON(reference,{acceptedAt:now});
 return true;
}
export async function readReceipt(reference,store=receiptStore(),now=Date.now()) {
 if(!referencePattern.test(reference||''))return {accepted:false};
 const record=await store.get(reference,{type:'json'});
 if(!record||!Number.isFinite(record.acceptedAt)||record.acceptedAt>now)return {accepted:false};
 if(now-record.acceptedAt>=lifetime){await store.delete(reference);return {accepted:false};}
 return {accepted:true,reference};
}
