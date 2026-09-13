import { useEffect, useState } from 'react';
import { flushSync } from 'react-dom';

import { resolveRoute } from '../lib/routes';

const read = () => resolveRoute(window.location.pathname, window.location.hash);

export function useHashRoute() {
  const [route, setRoute] = useState(read);

  useEffect(() => {
    // Item 13 (round two): the route used to swap the whole page instantly, which read as
    // a hard cut. Where the browser supports it, the same state change is wrapped in a
    // view transition so the two pages cross-fade. Everywhere else this is the exact
    // previous behaviour — there is no fallback path to maintain.
    const onHashChange = () => {
      if (window.location.hash === '#main-content') {
        document.getElementById('main-content')?.focus();
        return;
      }
      const next = read();
      if (
        typeof document.startViewTransition !== 'function' ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ) {
        setRoute(next);
        return;
      }
      document.startViewTransition(() => flushSync(() => setRoute(next)));
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return route;
}
