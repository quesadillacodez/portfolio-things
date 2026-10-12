export function validateMessage(payload = {}) {
  const name = typeof payload?.name === 'string' ? payload.name : '';
  const email = typeof payload?.email === 'string' ? payload.email : '';
  const message = typeof payload?.message === 'string' ? payload.message : '';

  const errors = {};
  if (!name.trim() || name.trim().length > 80 || /[\r\n]/.test(name))
    errors.name = 'Enter your name (up to 80 characters).';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254)
    errors.email = 'Enter a valid email address.';
  if (message.trim().length < 10 || message.length > 1200)
    errors.message = 'Write between 10 and 1,200 characters.';
  return errors;
}
