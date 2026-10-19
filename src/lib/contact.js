export function validateMessage(payload = {}) {
  const { name, email, message } = payload && typeof payload === 'object' ? payload : {};
  const nameStr = typeof name === 'string' ? name : '';
  const emailStr = typeof email === 'string' ? email : '';
  const messageStr = typeof message === 'string' ? message : '';
  const errors = {};
  if (!nameStr.trim() || nameStr.trim().length > 80 || /[\r\n]/.test(nameStr))
    errors.name = 'Enter your name (up to 80 characters).';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr) || emailStr.length > 254)
    errors.email = 'Enter a valid email address.';
  if (messageStr.trim().length < 10 || messageStr.length > 1200)
    errors.message = 'Write between 10 and 1,200 characters.';
  return errors;
}
