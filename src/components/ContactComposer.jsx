import { useRef, useState } from 'react';
import { site } from '../data/site';
import { createMailto, validateMessage } from '../lib/contact';

const empty = { name: '', email: '', message: '' };
export default function ContactComposer() {
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState({});
  const [ready, setReady] = useState(false);
  const [copyStatus, setCopyStatus] = useState('');
  const discard = useRef(null);
  const prepare = (event) => {
    event.preventDefault();
    const next = validateMessage(values);
    setErrors(next);
    setReady(Object.keys(next).length === 0);
    if (Object.keys(next).length) document.getElementById(`contact-${Object.keys(next)[0]}`)?.focus();
  };
  const update = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
    setReady(false);
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
        <h3>Write a first hello.</h3>
        <p>This prepares a draft in your own email app. Nothing is sent or stored by this website.</p>
        <p>Email me about the opportunity, team, and timing. I’ll reply when I can.</p>
        <button type="button" className="copy-link" onClick={copy}>
          Copy email address
        </button>
        <p role="status">{copyStatus}</p>
      </div>
      <form onSubmit={prepare} noValidate>
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
          aria-describedby="message-help error-message"
        />
        <p id="message-help" className="utility-muted">
          10–1,200 characters. Please leave out sensitive details.
        </p>
        <p id="error-message" className="form-error" role="alert">
          {errors.message}
        </p>
        <div className="utility-actions">
          <button className="button button-primary" type="submit">
            Prepare email
          </button>
          <button
            className="button button-quiet"
            type="button"
            disabled={!Object.values(values).some(Boolean)}
            onClick={() => discard.current.showModal()}
          >
            Clear draft
          </button>
        </div>
        {ready && (
          <div className="draft-ready" role="status">
            <p>Your draft is ready. Open your email app, review it, and press Send there.</p>
            <a className="button button-primary" href={createMailto(site.email, values)}>
              Open email app
            </a>
            <p>
              <a href="/thank-you">What happens next?</a>
            </p>
          </div>
        )}
        <p className="utility-muted">
          Prefer your own editor? <a href={`mailto:${site.email}`}>{site.email}</a> ·{' '}
          <a href="/privacy">Privacy</a>
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
              setReady(false);
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
