// Source-controlled release boundary. Environment variables cannot change mode.
// Release candidate target; merge and deployment require owner approval.
// The owner specified the Research revision date; it is separate from site and notice dates.
export const approvedResearchRevisionDate = '2026-03-01';
export const deploymentPolicy = Object.freeze({
  mode: 'production', // local release-artifact build; merge and deployment await owner approval
  origin: 'https://autonomybridge.com', // exact approved HTTPS production origin
  siteId: '3df07dc5-6950-4241-98eb-cf95df3d271d', // independently verified Netlify site ID
  publicationDate: '2026-03-01', // owner-approved site publication date
  researchRevisionDate: '2026-03-01', // owner-approved Research revision date
  termsRevisionDate: '2026-03-01', // independently approved Terms notice date
  cookieRevisionDate: '2026-03-01', // independently approved Cookie notice date
  methodologyRevisionDate: '2026-03-01', // original publication and revision corrected by owner
  formEnabled: true, // production form; real submission testing requires separate authorization
});

export function validCalendarDate(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split('-').map(Number);
  if (year < 1 || month < 1 || month > 12) return false;
  const leap = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  const days = [31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return day >= 1 && day <= days[month - 1];
}

export function validTarget(policy) {
  if (policy.mode !== 'production' || !validCalendarDate(policy.publicationDate) ||
      policy.researchRevisionDate !== approvedResearchRevisionDate ||
      !validCalendarDate(policy.termsRevisionDate) ||
      !validCalendarDate(policy.cookieRevisionDate) ||
      !validCalendarDate(policy.methodologyRevisionDate) ||
      policy.methodologyRevisionDate < '2026-03-01' ||
      !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(policy.siteId)) return false;
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
