import {deploymentPolicy} from '../../config/deployment-policy.mjs';
import {submitNetlifyContact} from './netlify-contact-transport.mjs';
/** Preview transport never calls Netlify or any external receiver.
 * Existing Netlify form name/action/field encoding remain in the HTML.
 * After approved deployment, verify receipt and delivery with a separately authorized test.
 */
export function mountContactForm(form: HTMLFormElement) {
  const button = form.querySelector<HTMLButtonElement>('button[type=submit]')!;
  const status = form.querySelector<HTMLElement>('#form-status')!;
  const missing = { name: 'Please enter your name.', email: 'Please enter your email address.', company: 'Please enter your company or organisation.', message: 'Please enter a message.' };
  const privacy = form.elements.namedItem('privacy-request') as HTMLInputElement;
  const company = form.elements.namedItem('company') as HTMLInputElement;
  const syncPrivacy = () => {
    company.required = !privacy.checked;
    form.querySelector('#company-requirement')!.textContent = privacy.checked ? '— optional for privacy requests' : '— required';
    if (privacy.checked) { form.querySelector('#company-error')!.textContent = ''; company.setAttribute('aria-invalid', 'false'); }
  };
  privacy.addEventListener('change', syncPrivacy); syncPrivacy();
  let busy = false;
  button.disabled = false;
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (busy) return;
    let first: HTMLInputElement | HTMLTextAreaElement | null = null;
    for (const [name, message] of Object.entries(missing)) {
      const field = form.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement;
      const error = name === 'company' && privacy.checked ? '' : !field.value.trim() ? message : name === 'email' && !field.validity.valid ? 'Please enter a valid email address.' : '';
      form.querySelector(`#${name}-error`)!.textContent = error;
      field.setAttribute('aria-invalid', String(Boolean(error)));
      if (error && !first) first = field;
    }
    if (first) { status.textContent = 'Please check the highlighted fields.'; first.focus(); return; }
    busy = true; button.disabled = true; status.textContent = '';
    const unknown = 'We couldn’t confirm receipt. Your enquiry may have arrived. Keep a copy of your message and any reference shown below. Please do not submit it again now; a missing confirmation does not mean delivery failed.';
    const failed = 'Your enquiry wasn’t submitted. Your entries are still here. Please check them and try again. If the problem continues, keep a copy and return later.';
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), 30000);
    try {
      if (deploymentPolicy.mode !== 'local') {
        const result = await submitNetlifyContact(new URLSearchParams(new FormData(form) as any), {
          enabled: deploymentPolicy.formEnabled, origin: location.origin, allowedOrigin: deploymentPolicy.origin,
          signal: controller.signal, receiptAttempts: 10,
        });
        if (result.outcome === 'accepted') {
          sessionStorage.setItem('ab-service-accepted', '1');
          location.assign('/contact-success');
          return;
        }
        status.textContent = result.outcome === 'rejected' ? failed : unknown + (result.reference ? ' Reference: ' + result.reference : '');
        if (result.outcome !== 'rejected') button.dataset.outcome = 'unknown';
        return;
      }
      // Loopback-only mock endpoint; no production notification settings are changed.
      if (!['localhost','127.0.0.1','[::1]'].includes(location.hostname)) throw new Error('Preview requires loopback');
      const response = await fetch('/__preview/contact', {
        method: 'POST', signal: controller.signal,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(form) as any),
      });
      if ([400,404,405,422].includes(response.status)) {
        status.textContent = failed;
      } else {
        const result = response.ok ? await response.json() : null;
        // A 200 HTML page, timeout, server error or ambiguous reply is never success.
        if (result?.accepted === true) {
          sessionStorage.setItem('ab-preview-accepted', '1');
          location.assign('/contact-success');
          return;
        }
        status.textContent = unknown;
        button.dataset.outcome = 'unknown';
      }
    } catch { status.textContent = unknown; button.dataset.outcome = 'unknown'; }
    finally {
      clearTimeout(timer);
      // Unknown outcome is held for follow-up instead of encouraging duplicate sends.
      busy = button.dataset.outcome === 'unknown'; button.disabled = busy;
      if (status.textContent) status.focus();
    }
  });
}
