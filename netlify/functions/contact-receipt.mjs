/** Release preparation only. This endpoint cannot access Netlify until a reviewed
 * code change enables it AND server-only configuration is supplied. Never log
 * request bodies, tokens, API responses or submission records.
 */
const RELEASE_APPROVED = false;
const referencePattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function verifyReceipt(reference, {enabled = false, formId, token, fetchImpl = fetch, now = Date.now()} = {}) {
  if (!enabled || !formId || !token) return {accepted: false};
  if (!referencePattern.test(reference)) return {accepted: false};
  try {
    const result = await fetchImpl('https://api.netlify.com/api/v1/forms/' + encodeURIComponent(formId) + '/submissions?per_page=100', {
      headers: {Authorization: 'Bearer ' + token, Accept: 'application/json'},
      signal: AbortSignal.timeout(5000), redirect: 'error', cache: 'no-store',
    });
    if (!result.ok) return {accepted: false};
    const submissions = await result.json();
    if (!Array.isArray(submissions)) return {accepted: false};
    const found = submissions.some(s => {
      const created = Date.parse(s.created_at);
      return typeof s.id === 'string' && s.id.length > 0 &&
        s.data?.['submission-reference'] === reference &&
        Number.isFinite(created) && created <= now && now - created < 15 * 60 * 1000;
    });
    // Only return the opaque reference. Never expose other submissions or PII.
    return found ? {accepted: true, reference} : {accepted: false};
  } catch { return {accepted: false}; }
}

export default async function handler(request) {
  const headers = {'Content-Type': 'application/json', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff'};
  if (!RELEASE_APPROVED) return new Response(JSON.stringify({accepted: false}), {status: 503, headers});
  const url = new URL(request.url);
  if (request.method !== 'GET' || !['autonomybridge.com', 'www.autonomybridge.com'].includes(url.hostname) ||
      !referencePattern.test(url.searchParams.get('reference') || '')) {
    return new Response(JSON.stringify({accepted: false}), {status: 400, headers});
  }
  const result = await verifyReceipt(url.searchParams.get('reference'), {
    enabled: process.env.CONTEXT === 'production' && process.env.AB_CONTACT_RECEIPTS_ENABLED === 'true',
    formId: process.env.AB_NETLIFY_CONTACT_FORM_ID, token: process.env.AB_NETLIFY_FORMS_TOKEN,
  });
  return new Response(JSON.stringify(result), {status: result.accepted ? 200 : 202, headers});
}
