import { useEffect, useState } from 'react';

// Item 14: the site already had a correct `prefers-reduced-motion` CSS block. Everything
// added in items 08-15 is JavaScript-driven, which CSS cannot switch off, so the same
// preference is read here and threaded through every animated component.
// The listener stays live: visitors can change the OS setting without reloading.
export function useReducedMotion() {
  const [prefers, setPrefers] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (event) => setPrefers(event.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  return prefers;
}
