// Netlify validates its event signature before invoking this reserved event function.
// Never expose this event as an ordinary HTTP handler under a different filename.
import {recordReceipt} from '../lib/contact-receipts.mjs';
import {deploymentPolicy} from '../../config/deployment-policy.mjs';
export default async request=>{
 if(deploymentPolicy.mode!=='production'||!deploymentPolicy.formEnabled)return new Response(null,{status:204});
 const {payload}=await request.json();
 if(payload?.id)await recordReceipt(payload.data);
 return new Response(null,{status:204});
};
