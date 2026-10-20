// Source-controlled release boundary. Environment variables cannot change mode.
// Release candidate target; merge and deployment require owner approval.
export const deploymentPolicy = Object.freeze({
  mode: 'production', // local | candidate (loopback release rendering) | production
  origin: 'https://autonomybridge.com', // exact approved HTTPS production origin
  siteId: '3df07dc5-6950-4241-98eb-cf95df3d271d', // independently verified Netlify site ID
  publicationDate: '2026-10-19', // actual release day, set only at approved publication
  researchRevisionDate: null, // set to actual release date only when this revision is approved for publication
  formEnabled: true, // production form; real submission testing requires separate authorization
});

export function validTarget(policy) {
  if (policy.mode !== 'production' || !/^\d{4}-\d{2}-\d{2}$/.test(policy.publicationDate || '') || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(policy.siteId)) return false;
  try {
    const url = new URL(policy.origin);
    return url.origin === policy.origin && url.protocol === 'https:' && !url.port &&
      ['autonomybridge.com', 'www.autonomybridge.com'].includes(url.hostname);
  } catch { return false; }
}

export function allowedRuntime(policy, env, requestOrigin) {
  return validTarget(policy) && policy.formEnabled === true && requestOrigin === policy.origin &&
    env.SITE_ID === policy.siteId && env.CONTEXT === 'production' &&
    env.AB_CONTACT_RECEIPTS_ENABLED === 'true';
}
