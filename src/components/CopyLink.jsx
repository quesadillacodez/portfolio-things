import { useEffect, useState } from 'react';
import Icon from './Icon';

// Item 24 (round two): nothing on the site was built to leave it. A permalink you can
// actually copy is the cheapest version of that — it turns a page into something a
// reader can send to someone else without hunting in the address bar.
export default function CopyLink({ label = 'Copy link' }) {
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!copied && !failed) return undefined;
    const timer = setTimeout(() => {
      setCopied(false);
      setFailed(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [copied, failed]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setFailed(false);
      setCopied(true);
    } catch {
      // Clipboard access can be refused (insecure context, denied permission).
      setCopied(false);
      setFailed(true);
    }
  };

  const getButtonText = () => {
    if (copied) return 'Copied';
    if (failed) return 'Failed to copy';
    return label;
  };

  return (
    <>
      <button
        type="button"
        className="copy-link"
        onClick={copy}
        aria-label={copied ? 'Link copied to clipboard' : failed ? 'Failed to copy link' : label}
      >
        <Icon name={copied ? 'check' : 'arrow'} size={14} />
        {getButtonText()}
      </button>
      <span className="sr-only" aria-live="polite" aria-atomic="true">
        {copied ? 'Link copied to clipboard' : failed ? 'Could not copy link to clipboard' : ''}
      </span>
    </>
  );
}
