import {deploymentPolicy} from '../../config/deployment-policy.mjs';
import {readReceipt,referencePattern} from '../lib/contact-receipts.mjs';
export default async function handler(request,context) {
 const headers={'Content-Type':'application/json','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'};
 const url=new URL(request.url);
 if(deploymentPolicy.mode!=='production'||!deploymentPolicy.formEnabled||context?.site?.id!==deploymentPolicy.siteId||url.origin!==deploymentPolicy.origin)return new Response(JSON.stringify({accepted:false}),{status:503,headers});
 const reference=url.searchParams.get('reference');
 if(request.method!=='GET'||!referencePattern.test(reference||''))return new Response(JSON.stringify({accepted:false}),{status:400,headers});
 try{
  const result=await readReceipt(reference);
  return new Response(JSON.stringify(result),{status:result.accepted?200:202,headers});
 }catch{return new Response(JSON.stringify({accepted:false}),{status:503,headers});}
}
