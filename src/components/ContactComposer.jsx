import { useRef, useState } from 'react';
import { ValidationError, useForm } from '@formspree/react';
import { site } from '../data/site';
import { validateMessage } from '../lib/contact';

const empty = { name: '', email: '', message: '' };
export default function ContactComposer() {
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('');
  const [copyStatus, setCopyStatus] = useState('');
  const [formState, submitToFormspree, resetFormspree] = useForm('xvkojqge');
  const discard = useRef(null);

  const submit = async (event) => {
    event.preventDefault();
    const next = validateMessage(values);
    setErrors(next);
    if (Object.keys(next).length) {
      document.getElementById(`contact-${Object.keys(next)[0]}`)?.focus();
      return;
    }
    setStatus('');
    try {
      await submitToFormspree(event);
    } catch (error) {
      setStatus(error.message || 'Your inquiry could not be sent. Please try again.');
    }
  };
  const update = (event) => {
    if (formState.succeeded) resetFormspree();
    setValues({ ...values, [event.target.name]: event.target.value });
    setStatus('');
    setCopyStatus('');
  };
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopyStatus('Email address copied.');
    } catch {
      setCopyStatus(`Copy manually: ${site.email}`);
    }
  };
  return (
    <div className="contact-composer">
      <div>
        <h3>Send an inquiry.</h3>
        <p>
          Tell me about the opportunity, team, and timing. Your message will be sent directly to my inbox.
        </p>
        <p>I’ll reply to the email address you provide when I can.</p>
        <button type="button" className="copy-link" onClick={copy}>
          Copy email address
        </button>
        <p role="status">{copyStatus}</p>
      </div>
      <form onSubmit={submit} noValidate>
        <label
          htmlFor="contact-website"
          aria-hidden="true"
          style={{ position: 'absolute', left: '-10000px', width: '1px', height: '1px', overflow: 'hidden' }}
        >
          Website
          <input id="contact-website" name="website" tabIndex="-1" autoComplete="off" />
        </label>
        <label htmlFor="contact-name">Your name</label>
        <input
          id="contact-name"
          name="name"
          autoComplete="name"
          required
          maxLength={80}
          value={values.name}
          onChange={update}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'error-name' : undefined}
        />
        {errors.name && (
          <p id="error-name" className="form-error" role="alert">
            {errors.name}
          </p>
        )}
        <label htmlFor="contact-email">Your email</label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={254}
          value={values.email}
          onChange={update}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'error-email' : undefined}
        />
        {errors.email && (
          <p id="error-email" className="form-error" role="alert">
            {errors.email}
          </p>
        )}
        <label htmlFor="contact-message">What would you like to discuss?</label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          minLength={10}
          maxLength={1200}
          value={values.message}
          onChange={update}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-help error-message' : 'message-help'}
        />
        <p id="message-help" className="utility-muted">
          10–1,200 characters ({values.message.length.toLocaleString()}/1,200). Please leave out sensitive
          details.
        </p>
        {errors.message && (
          <p id="error-message" className="form-error" role="alert">
            {errors.message}
          </p>
        )}
        <div className="utility-actions">
          <button className="button button-primary" type="submit" disabled={formState.submitting}>
            {formState.submitting ? 'Sending…' : 'Send inquiry'}
          </button>
          <button
            className="button button-quiet"
            type="button"
            disabled={formState.submitting || !Object.values(values).some(Boolean)}
            onClick={() => discard.current.showModal()}
          >
            Clear draft
          </button>
        </div>
        {(status || formState.succeeded) && (
          <p className="draft-ready" role="status">
            {status || 'Thanks — your inquiry has been sent. I’ll get back to you soon.'}
          </p>
        )}
        <ValidationError className="form-error" prefix="Inquiry" errors={formState.errors} />
        <p className="utility-muted">
          Or email <a href={`mailto:${site.email}`}>{site.email}</a> directly · <a href="/privacy">Privacy</a>
        </p>
      </form>
      <dialog className="utility-dialog" ref={discard} aria-labelledby="discard-title">
        <h2 id="discard-title">Clear this draft?</h2>
        <p>Your unsent text will be removed from this page.</p>
        <div className="utility-actions">
          <button type="button" className="button button-primary" onClick={() => discard.current.close()}>
            Keep writing
          </button>
          <button
            type="button"
            className="button button-quiet"
            onClick={() => {
              setValues(empty);
              setErrors({});
              setStatus('');
              resetFormspree();
              discard.current.close();
            }}
          >
            Clear draft
          </button>
        </div>
      </dialog>
    </div>
  );
}
