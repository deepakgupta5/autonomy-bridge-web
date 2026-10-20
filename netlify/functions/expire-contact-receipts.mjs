import {receiptStore,lifetime} from '../lib/contact-receipts.mjs';
// Deletes only our opaque confirmation markers, never Netlify Forms submissions.
export default async ()=>{
 const store=receiptStore();const now=Date.now();
 for await(const {blobs} of store.list({paginate:true})){
  for(const {key} of blobs){
   const entry=await store.get(key,{type:'json'});
   if(entry&&now-entry.acceptedAt>=lifetime)await store.delete(key);
  }
 }
 return new Response(null,{status:204});
};
export const config={schedule:'15 * * * *'};
