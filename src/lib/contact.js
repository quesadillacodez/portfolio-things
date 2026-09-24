export function validateMessage(input = {}) {
  const name = typeof input?.name === 'string' ? input.name : '';
  const email = typeof input?.email === 'string' ? input.email : '';
  const message = typeof input?.message === 'string' ? input.message : '';

  const errors = {};
  if (!name.trim() || name.trim().length > 80 || /[\r\n]/.test(name))
    errors.name = 'Enter your name (up to 80 characters).';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254 || /[\r\n]/.test(email))
    errors.email = 'Enter a valid email address.';
  if (message.trim().length < 10 || message.length > 1200)
    errors.message = 'Write between 10 and 1,200 characters.';
  return errors;
}
