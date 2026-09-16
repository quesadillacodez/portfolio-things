export function validateMessage(input) {
  const { name = '', email = '', message = '' } = input && typeof input === 'object' ? input : {};
  const safeName = typeof name === 'string' ? name : '';
  const safeEmail = typeof email === 'string' ? email : '';
  const safeMessage = typeof message === 'string' ? message : '';

  const errors = {};
  if (!safeName.trim() || safeName.trim().length > 80 || /[\r\n]/.test(safeName))
    errors.name = 'Enter your name (up to 80 characters).';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(safeEmail) || safeEmail.length > 254)
    errors.email = 'Enter a valid email address.';
  if (safeMessage.trim().length < 10 || safeMessage.length > 1200)
    errors.message = 'Write between 10 and 1,200 characters.';
  return errors;
}
