export function validateMessage({ name = '', email = '', message = '' } = {}) {
  const errors = {};
  const safeName = typeof name === 'string' ? name.trim() : '';
  const safeEmail = typeof email === 'string' ? email.trim() : '';
  const safeMessage = typeof message === 'string' ? message.trim() : '';
  const rawMessage = typeof message === 'string' ? message : '';

  if (!safeName || safeName.length > 80 || /[\r\n]/.test(safeName))
    errors.name = 'Enter your name (up to 80 characters).';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(safeEmail) || safeEmail.length > 254)
    errors.email = 'Enter a valid email address.';
  if (safeMessage.length < 10 || rawMessage.length > 1200)
    errors.message = 'Write between 10 and 1,200 characters.';
  return errors;
}
