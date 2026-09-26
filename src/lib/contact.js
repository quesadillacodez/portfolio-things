export function validateMessage({ name, email, message, website }) {
  const errors = {};
  if (website) errors.website = 'Invalid submission.';
  if (!name.trim() || name.trim().length > 80 || /[\r\n]/.test(name))
    errors.name = 'Enter your name (up to 80 characters).';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254)
    errors.email = 'Enter a valid email address.';
  if (message.trim().length < 10 || message.length > 1200)
    errors.message = 'Write between 10 and 1,200 characters.';
  return errors;
}
