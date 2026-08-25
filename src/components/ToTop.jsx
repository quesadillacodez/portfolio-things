import { useEffect, useState } from 'react';

// Item 36: the page is 19,000px on a 390px phone — roughly 22 screens — with no
// sticky nav once you are past the header and no way back short of flicking.
// This appears after the first screen and leaves before it.
export default function ToTop({ reducedMotion }) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setShown(window.scrollY > window.innerHeight * 1.5);
    };
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <button
      className={`to-top ${shown ? 'is-visible' : ''}`}
      type="button"
      tabIndex={shown ? 0 : -1}
      aria-hidden={shown ? undefined : 'true'}
      onClick={() => window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' })}
      aria-label="Back to top"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 20V5" />
        <path d="m5 12 7-7 7 7" />
      </svg>
    </button>
  );
}
