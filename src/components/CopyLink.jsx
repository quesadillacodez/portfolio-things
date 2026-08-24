import { useEffect, useState } from 'react';
import Icon from './Icon';

// Item 24 (round two): nothing on the site was built to leave it. A permalink you can
// actually copy is the cheapest version of that — it turns a page into something a
// reader can send to someone else without hunting in the address bar.
export default function CopyLink({ label = 'Copy link' }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return undefined;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
    } catch {
      // Clipboard access can be refused (insecure context, denied permission).
      // Selecting the address bar is the fallback, so say nothing rather than lying.
      setCopied(false);
    }
  };

  return (
    <button type="button" className="copy-link" onClick={copy}>
      <Icon name={copied ? 'check' : 'arrow'} size={14} />
      {copied ? 'Copied' : label}
    </button>
  );
}
