const MAX_REQUESTS = 5;
const WINDOW_MS = 10 * 60 * 1000;
const attempts = new Map();

function validateContact({ name, email, message }) {
  if (typeof name !== 'string' || !name.trim() || name.trim().length > 80 || /[\r\n]/.test(name))
    return 'Enter a name of up to 80 characters.';
  if (typeof email !== 'string' || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return 'Enter a valid email address.';
  if (typeof message !== 'string' || message.trim().length < 10 || message.length > 1200)
    return 'Write a message between 10 and 1,200 characters.';
  return null;
}

function escapeHtml(value) {
  return value.replace(
    /[&<>"']/g,
    (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[character],
  );
}

function isRateLimited(request) {
  const ip = request.headers['x-forwarded-for']?.split(',')[0]?.trim() || 'unknown';
  const now = Date.now();
  const recent = (attempts.get(ip) || []).filter((time) => now - time < WINDOW_MS);
  recent.push(now);
  attempts.set(ip, recent);
  return recent.length > MAX_REQUESTS;
}

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ error: 'Method not allowed.' });
  }
  if (isRateLimited(request))
    return response.status(429).json({ error: 'Please wait a few minutes before trying again.' });

  const { name, email, message, website } = request.body || {};
  if (website) return response.status(200).json({ ok: true });
  const validationError = validateContact({ name, email, message });
  if (validationError) return response.status(400).json({ error: validationError });
  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not configured.');
    return response
      .status(503)
      .json({ error: 'The inquiry form is temporarily unavailable. Please email me directly.' });
  }

  const recipient = process.env.CONTACT_TO || 'hadiqbz@gmail.com';
  const sender = process.env.CONTACT_FROM || 'Portfolio enquiries <onboarding@resend.dev>';
  const safeName = escapeHtml(name.trim());
  const safeEmail = escapeHtml(email.trim());
  const safeMessage = escapeHtml(message.trim()).replace(/\n/g, '<br>');
  try {
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: sender,
        to: [recipient],
        reply_to: email.trim(),
        subject: `Portfolio enquiry from ${name.trim()}`,
        html: `<h1>New portfolio inquiry</h1><p><strong>From:</strong> ${safeName} (${safeEmail})</p><p><strong>Message:</strong></p><p>${safeMessage}</p>`,
      }),
    });
    if (!resendResponse.ok) {
      console.error('Resend rejected contact submission:', await resendResponse.text());
      return response
        .status(502)
        .json({ error: 'Your inquiry could not be sent. Please try again or email me directly.' });
    }
  } catch (error) {
    console.error('Contact delivery failed:', error);
    return response
      .status(502)
      .json({ error: 'Your inquiry could not be sent. Please try again or email me directly.' });
  }
  return response.status(200).json({ ok: true });
}
