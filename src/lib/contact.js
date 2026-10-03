export function validateMessage(data = {}) {
  const { name = '', email = '', message = '' } = data || {};
  const strName = typeof name === 'string' ? name : '';
  const strEmail = typeof email === 'string' ? email : '';
  const strMessage = typeof message === 'string' ? message : '';

  const errors = {};
  if (!strName.trim() || strName.trim().length > 80 || /[\r\n]/.test(strName))
    errors.name = 'Enter your name (up to 80 characters).';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(strEmail) || strEmail.length > 254)
    errors.email = 'Enter a valid email address.';
  if (strMessage.trim().length < 10 || strMessage.length > 1200)
    errors.message = 'Write between 10 and 1,200 characters.';
  return errors;
}
