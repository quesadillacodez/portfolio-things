# Sentinel Journal

## 2025-05-18 - Formspree Honeypot Name and CSP form-action Alignment

**Vulnerability:** The contact form used `website` as a honeypot field name instead of Formspree's expected `_gotcha` field, and `form-action` in `vercel.json` CSP lacked `https://formspree.io`.
**Learning:** External services like Formspree rely on specific convention field names (`_gotcha`) for automated server-side spam suppression, and CSP `form-action` must explicitly list external form submission target origins.
**Prevention:** Always verify third-party form handler standard honeypot conventions and align `form-action` in security header policies whenever forms post to external services.
