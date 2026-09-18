export function validateMessage({ name = '', email = '', message = '', website = '' } = {}) {
  const errors = {};

  const nameStr = typeof name === 'string' ? name : '';
  const emailStr = typeof email === 'string' ? email : '';
  const messageStr = typeof message === 'string' ? message : '';
  const websiteStr = typeof website === 'string' ? website : '';

  // Honeypot field check: hidden from human users, populated by automated bots
  if (websiteStr.trim().length > 0) {
    errors.website = 'Submission rejected.';
  }

  if (!nameStr.trim() || nameStr.trim().length > 80 || /[\r\n]/.test(nameStr))
    errors.name = 'Enter your name (up to 80 characters).';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr) || emailStr.length > 254)
    errors.email = 'Enter a valid email address.';
  if (messageStr.trim().length < 10 || messageStr.length > 1200)
    errors.message = 'Write between 10 and 1,200 characters.';

  return errors;
}
