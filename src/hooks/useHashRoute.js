import { useEffect, useState } from 'react';

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
    const onHashChange = () => setSlug(read());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return slug;
}
