import { useEffect, useState } from 'react';
import Icon from './Icon';

// Item 09: a 7,600px page gave no sense of position. The bar under the header is
// driven by CSS `animation-timeline: scroll()` where the browser supports it —
// no JavaScript on the scroll path at all — and falls back to a passive listener
// with a rAF guard everywhere else.
const SUPPORTS_SCROLL_TIMELINE =
  typeof CSS !== 'undefined' && CSS.supports?.('animation-timeline: scroll()');

export default function Header({ theme, onToggleTheme }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (SUPPORTS_SCROLL_TIMELINE) return undefined;

    let frame = 0;
    const update = () => {
      frame = 0;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? window.scrollY / scrollable : 0);
    };
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Back to top">HQ<span>.</span></a>
      <nav aria-label="Main navigation">
        <a href="#work">Work</a>
        <a href="#process">Process</a>
        <a href="#skills">Skills</a>
        <a href="#contact">Contact</a>
      </nav>
      <button
        className="theme-toggle"
        type="button"
        onClick={onToggleTheme}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        <Icon name={theme === 'light' ? 'moon' : 'sun'} />
      </button>

      <div
        className={`scroll-progress ${SUPPORTS_SCROLL_TIMELINE ? 'is-css-driven' : ''}`}
        style={SUPPORTS_SCROLL_TIMELINE ? undefined : { transform: `scaleX(${progress})` }}
        aria-hidden="true"
      />
    </header>
  );
}
