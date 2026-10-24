import {deploymentPolicy, validCalendarDate, validTarget} from '../config/deployment-policy.mjs';
if (deploymentPolicy.mode !== 'production') {
  if (process.env.NETLIFY || process.env.CI) {
    console.error('Preview-only branch: remote builds disabled pending approval. Build locally.');
    process.exit(1);
  }
} else if (!validCalendarDate(deploymentPolicy.publicationDate) ||
           !validCalendarDate(deploymentPolicy.researchRevisionDate) ||
           !validCalendarDate(deploymentPolicy.termsRevisionDate) ||
           !validCalendarDate(deploymentPolicy.cookieRevisionDate) ||
           !validCalendarDate(deploymentPolicy.methodologyRevisionDate)) {
  console.error('Production builds require explicit valid site, Research, Terms, Cookie and Methodology calendar dates.');
  process.exit(1);
} else if (!validTarget(deploymentPolicy) || process.env.SITE_ID !== deploymentPolicy.siteId ||
           process.env.CONTEXT !== 'production' || process.env.AB_PRIVATE_PREVIEW === '1') {
  console.error('Release candidate requires its exact approved Netlify target/context and public copy.');
  process.exit(1);
}
