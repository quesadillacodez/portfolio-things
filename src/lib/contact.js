export function validateMessage(rawInput = {}) {
  const {
    name = '',
    email = '',
    message = '',
    website = '',
  } = rawInput && typeof rawInput === 'object' ? rawInput : {};

  const safeName = typeof name === 'string' ? name : '';
  const safeEmail = typeof email === 'string' ? email : '';
  const safeMessage = typeof message === 'string' ? message : '';
  const safeWebsite = typeof website === 'string' ? website : '';

  const errors = {};
  if (safeWebsite.trim()) {
    errors.website = 'Invalid submission.';
  }
  if (!safeName.trim() || safeName.trim().length > 80 || /[\r\n]/.test(safeName))
    errors.name = 'Enter your name (up to 80 characters).';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(safeEmail) || safeEmail.length > 254)
    errors.email = 'Enter a valid email address.';
  if (safeMessage.trim().length < 10 || safeMessage.length > 1200)
    errors.message = 'Write between 10 and 1,200 characters.';
  return errors;
}
