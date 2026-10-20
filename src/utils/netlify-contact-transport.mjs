/** Preparatory adapter. Not imported by the preview form; never enabled implicitly.
 * HTTP success from the form POST is NOT proof of acceptance. Only a server-side
 * Netlify submissions lookup for this random reference can confirm receipt.
 */
export async function submitNetlifyContact(data, {
  enabled = false, origin, signal, fetchImpl = fetch,
  reference = () => crypto.randomUUID(),
} = {}) {
  if (!enabled) return { outcome: 'rejected', reason: 'disabled' };
  let url;
  try { url = new URL(origin); }
  catch { return { outcome: 'rejected', reason: 'invalid-origin' }; }
  if (url.protocol !== 'https:' || !['autonomybridge.com', 'www.autonomybridge.com'].includes(url.hostname) || url.port) {
    return { outcome: 'rejected', reason: 'invalid-origin' };
  }
  const body = new URLSearchParams(data);
  for (const field of ['name', 'email', 'company', 'message']) {
    if (!body.get(field)?.trim()) return { outcome: 'rejected', reason: 'invalid-fields' };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.get('email')) || body.get('bot-field')) {
    return { outcome: 'rejected', reason: 'invalid-fields' };
  }
  const id = reference();
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)) return { outcome: 'rejected', reason: 'invalid-reference' };
  body.set('form-name', 'contact');
  body.set('submission-reference', id);
  // No automatic re-POST, including after timeout: the receiver may have stored it.
  try {
    await fetchImpl(new URL('/contact-success', url), {
      method: 'POST', signal, credentials: 'same-origin', redirect: 'error',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}, body,
    });
  } catch { /* A redirect/network error cannot establish non-receipt. Verify below. */ }
  try {
    const receipt = await fetchImpl(new URL('/.netlify/functions/contact-receipt?reference=' + id, url), {
      method: 'GET', signal, cache: 'no-store', credentials: 'same-origin', redirect: 'error',
    });
    if (receipt.ok && receipt.headers.get('content-type')?.includes('application/json')) {
      const result = await receipt.json();
      if (result.accepted === true && result.reference === id) return {outcome: 'accepted', reference: id};
    }
  } catch { /* Timeout, malformed JSON and unavailable verification remain unknown. */ }
  return {outcome: 'unknown', reference: id};
}
