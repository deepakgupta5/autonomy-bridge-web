import {deploymentPolicy, validTarget} from '../config/deployment-policy.mjs';
if (deploymentPolicy.mode !== 'production') {
  if (process.env.NETLIFY || process.env.CI) {
    console.error('Preview-only branch: remote builds disabled pending approval. Build locally.');
    process.exit(1);
  }
} else if (!validTarget(deploymentPolicy) || process.env.SITE_ID !== deploymentPolicy.siteId ||
           process.env.CONTEXT !== 'production' || process.env.AB_PRIVATE_PREVIEW === '1') {
  console.error('Release candidate requires its exact approved Netlify target/context and public copy.');
  process.exit(1);
}

if (process.env.NETLIFY && deploymentPolicy.mode === "production" && !/^\d{4}-\d{2}-\d{2}$/.test(deploymentPolicy.researchRevisionDate || "")) {
 console.error("Material research revisions require the approved actual release date before remote publication."); process.exit(1);
}
