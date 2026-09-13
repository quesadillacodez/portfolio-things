import { useEffect, useRef, useState } from 'react';
import { readPreference, savePreference } from '../lib/storage';

const candidate = import.meta.env.VITE_GA_ID || '';
const measurementId = /^G-[A-Z0-9]+$/.test(candidate) ? candidate : '';
const consentKey = 'portfolio-analytics';

function disableAnalytics() {
  if (measurementId) window[`ga-disable-${measurementId}`] = true;
  for (const cookie of document.cookie.split(';')) {
    const name = cookie.split('=')[0].trim();
    if (!/^_ga(?:_|$)/.test(name)) continue;
    const domains = window.location.hostname.split('.');
    document.cookie = `${name}=; Max-Age=0; path=/`;
    for (let i = 0; i < domains.length - 1; i++)
      document.cookie = `${name}=; Max-Age=0; path=/; domain=.${domains.slice(i).join('.')}`;
  }
}

export default function PrivacyChoices({ path }) {
  const [choice, setChoice] = useState(() => readPreference(consentKey));
  const [dismissed, setDismissed] = useState(false);
  const dialog = useRef(null);
  useEffect(() => {
    if (choice !== 'allow' || !measurementId) return undefined;
    window[`ga-disable-${measurementId}`] = false;
    window.dataLayer = window.dataLayer || [];
    window.gtag =
      window.gtag ||
      function () {
        window.dataLayer.push(arguments);
      };
    if (!document.getElementById('portfolio-analytics-script')) {
      window.gtag('js', new Date());
      window.gtag('config', measurementId, {
        send_page_view: false,
        page_location: `${window.location.origin}${path}`,
        page_referrer: '',
        allow_google_signals: false,
        allow_ad_personalization_signals: false,
      });
      const script = document.createElement('script');
      script.id = 'portfolio-analytics-script';
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
      document.head.append(script);
    }
    const campaign = {};
    const query = new URLSearchParams(window.location.search);
    for (const [parameter, field] of [
      ['utm_source', 'campaign_source'],
      ['utm_medium', 'campaign_medium'],
      ['utm_campaign', 'campaign_name'],
    ]) {
      const value = query.get(parameter);
      if (value && /^[a-zA-Z0-9_-]{1,80}$/.test(value)) campaign[field] = value;
    }
    window.gtag('event', 'page_view', {
      page_location: `${window.location.origin}${path}`,
      page_title: document.title,
      page_referrer: '',
      ...campaign,
    });
    return undefined;
  }, [choice, path]);

  const choose = (next) => {
    savePreference(consentKey, next);
    setChoice(next);
    setDismissed(true);
    dialog.current.close();
    if (next !== 'allow') {
      disableAnalytics();
      if (document.getElementById('portfolio-analytics-script')) window.location.reload();
    }
  };
  const controls = (
    <div className="utility-actions">
      <button type="button" onClick={() => choose('reject')}>
        Reject analytics
      </button>
      <button type="button" onClick={() => choose('allow')}>
        Allow analytics
      </button>
    </div>
  );
  return (
    <>
      <div className="utility-footer">
        <a href="/privacy">Privacy</a>
        <a href="/terms">Terms</a>
        <button type="button" onClick={() => dialog.current.showModal()}>
          Privacy choices
        </button>
      </div>
      {measurementId && !choice && !dismissed && (
        <aside className="consent-banner" aria-label="Analytics choice">
          <p>
            Allow optional analytics to help understand which pages are useful? It stays off unless you agree.{' '}
            <a href="/privacy">Privacy details</a>
          </p>
          {controls}
        </aside>
      )}
      <dialog className="utility-dialog" ref={dialog} aria-labelledby="privacy-choices-title">
        <div className="utility-dialog-head">
          <h2 id="privacy-choices-title">Privacy choices</h2>
          <button type="button" onClick={() => dialog.current.close()}>
            Close
          </button>
        </div>
        <p>Your theme and this choice can be saved in your browser.</p>
        <p>
          {measurementId
            ? `Optional Google Analytics is ${choice === 'allow' ? 'on' : 'off'}. Rejecting it after allowing it reloads this page to stop the script.`
            : 'Analytics is not configured. This site currently loads no analytics cookies or scripts.'}
        </p>
        {measurementId && controls}
        <p>
          <a href="/privacy">Read the privacy details</a>
        </p>
      </dialog>
    </>
  );
}
