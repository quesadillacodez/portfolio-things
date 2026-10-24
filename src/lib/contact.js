export function validateMessage({ name, email, message, website }) {
  const errors = {};
  // Honeypot check for spam bots filling out hidden inputs
  if (website) {
    errors.website = 'Spam detected.';
  }
  if (!name.trim() || name.trim().length > 80 || /[\r\n]/.test(name))
    errors.name = 'Enter your name (up to 80 characters).';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254)
    errors.email = 'Enter a valid email address.';
  if (message.trim().length < 10 || message.length > 1200)
    errors.message = 'Write between 10 and 1,200 characters.';
  return errors;
}

export function sanitizeUrl(url) {
  if (!url) return '#';
  const trimmed = String(url).trim();
  // Allow relative URLs or fragment links
  if (trimmed.startsWith('/') || trimmed.startsWith('#')) return trimmed;
  try {
    const parsed = new URL(trimmed);
    if (['http:', 'https:', 'mailto:'].includes(parsed.protocol)) {
      return trimmed;
    }
  } catch {
    // Return safe fallback if URL parsing fails
    return '#';
  }
  return '#';
}
