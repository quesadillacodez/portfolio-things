import { useEffect, useState } from 'react';
import { flushSync } from 'react-dom';

// Item 17 (round one): PulseOps needed a page of its own rather than three paragraphs on
// a shared index. A hash route keeps that possible with no router dependency and no
// server rewrite rules, so the site still deploys as plain static files anywhere.
//
// Round two: notes (item 17) and the colophon (item 22) needed pages too, so this now
// returns a { kind, slug } pair rather than a bare case-study slug.
//
// Plain fragments like `#work` stay ordinary in-page anchors and are deliberately ignored.
const ROUTES = [
  { kind: 'case', pattern: /^#\/case\/([\w-]+)$/ },
  { kind: 'note', pattern: /^#\/note\/([\w-]+)$/ },
  { kind: 'colophon', pattern: /^#\/colophon$/ },
];

const read = () => {
  const hash = window.location.hash;
  for (const { kind, pattern } of ROUTES) {
    const match = hash.match(pattern);
    if (match) return { kind, slug: match[1] ?? null };
  }
  return null;
};

export function useHashRoute() {
  const [route, setRoute] = useState(read);

  useEffect(() => {
    // Item 13 (round two): the route used to swap the whole page instantly, which read as
    // a hard cut. Where the browser supports it, the same state change is wrapped in a
    // view transition so the two pages cross-fade. Everywhere else this is the exact
    // previous behaviour — there is no fallback path to maintain.
    const onHashChange = () => {
      const next = read();
      if (typeof document.startViewTransition !== 'function') {
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
