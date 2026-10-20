// Source-controlled release boundary. Environment variables cannot change mode.
// Keep local until publication is explicitly approved and facts are resolved.
export const deploymentPolicy = Object.freeze({
  mode: 'local', // local | production
  origin: '', // exact approved HTTPS production origin
  siteId: '', // independently verified Netlify site ID
  formEnabled: false, // production only; false provides email-only fallback
});

export function validTarget(policy) {
  if (policy.mode !== 'production' || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(policy.siteId)) return false;
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
