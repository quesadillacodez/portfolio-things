// ASCII control characters (excluding standard whitespace like \t, \n, \r)
// eslint-disable-next-line no-control-regex
const controlCharsRegex = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/;

export function validateMessage({ name = '', email = '', message = '' }) {
  const errors = {};
  if (!name.trim() || name.trim().length > 80 || /[\r\n]/.test(name) || controlCharsRegex.test(name)) {
    errors.name = 'Enter your name (up to 80 characters).';
  }
  if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    email.length > 254 ||
    controlCharsRegex.test(email) ||
    /[\r\n]/.test(email)
  ) {
    errors.email = 'Enter a valid email address.';
  }
  if (message.trim().length < 10 || message.length > 1200 || controlCharsRegex.test(message)) {
    errors.message = 'Write between 10 and 1,200 characters.';
  }
  return errors;
}
