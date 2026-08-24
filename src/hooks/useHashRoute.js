import { useEffect, useState } from 'react';
import { flushSync } from 'react-dom';

// Item 17: PulseOps needed a page of its own rather than three paragraphs on a shared
// index. A hash route keeps that possible with no router dependency and no server
// rewrite rules, so the site still deploys as plain static files anywhere.
//
// Only `#/case/<slug>` is treated as a route. Plain fragments like `#work` stay
// ordinary in-page anchors and are deliberately ignored here.
export function useHashRoute() {
  const read = () => {
    const match = window.location.hash.match(/^#\/case\/([\w-]+)$/);
    return match ? match[1] : null;
  };

  const [slug, setSlug] = useState(read);

  useEffect(() => {
    // Item 13 (round two): the route used to swap the whole page instantly, which read
    // as a hard cut. Where the browser supports it, the same state change is wrapped in
    // a view transition so the two pages cross-fade. Everywhere else this is the exact
    // previous behaviour — there is no fallback path to maintain.
    const onHashChange = () => {
      const next = read();
      if (typeof document.startViewTransition !== 'function') {
        setSlug(next);
        return;
      }
      document.startViewTransition(() => flushSync(() => setSlug(next)));
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return slug;
}
