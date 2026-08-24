import { useEffect, useState } from 'react';
import Icon from './Icon';

// Item 09: a 7,600px page gave no sense of position. The bar under the header is
// driven by CSS `animation-timeline: scroll()` where the browser supports it —
// no JavaScript on the scroll path at all — and falls back to a passive listener
// with a rAF guard everywhere else.
const SUPPORTS_SCROLL_TIMELINE = typeof CSS !== 'undefined' && CSS.supports?.('animation-timeline: scroll()');

const links = [
  { id: 'about', label: 'About', number: '01' },
  { id: 'work', label: 'Work', number: '02' },
  { id: 'try', label: 'Try it', number: '03' },
  { id: 'process', label: 'Process', number: '04' },
  { id: 'notes', label: 'Notes', number: '05' },
  { id: 'skills', label: 'Skills', number: '06' },
  { id: 'contact', label: 'Contact', number: '07' },
];

export default function Header({ theme, onToggleTheme }) {
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('');

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

  // Item 27: the accent picks up the active-section state as one of its new jobs.
  useEffect(() => {
    const sections = links.map(({ id }) => document.getElementById(id)).filter(Boolean);
    if (!sections.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length) {
          setActive(visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0].target.id);
        }
      },
      { rootMargin: '-84px 0px -55% 0px', threshold: 0 },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Item 45: the menu overlays the page, so lock the page behind it and let Escape out.
  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKeyDown = (event) => event.key === 'Escape' && setMenuOpen(false);
    document.body.classList.add('nav-open');
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.classList.remove('nav-open');
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  return (
    <>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Back to top">
          HQ<span>.</span>
        </a>
        <nav aria-label="Main navigation">
          {links.map(({ id, label }) => (
            <a key={id} href={`#${id}`} aria-current={active === id ? 'true' : undefined}>
              {label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          {/* Item 45: below 700px the nav was display:none with nothing in its place. */}
          <button
            className="nav-toggle"
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <Icon name={menuOpen ? 'close' : 'menu'} size={20} />
          </button>
          <button
            className="theme-toggle"
            type="button"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            <Icon name={theme === 'light' ? 'moon' : 'sun'} />
          </button>
        </div>

        <div
          className={`scroll-progress ${SUPPORTS_SCROLL_TIMELINE ? 'is-css-driven' : ''}`}
          style={SUPPORTS_SCROLL_TIMELINE ? undefined : { transform: `scaleX(${progress})` }}
          aria-hidden="true"
        />
      </header>

      {menuOpen && (
        <div className="site-nav-panel" id="mobile-nav">
          {links.map(({ id, label, number }) => (
            <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>
              <span>{number}</span>
              {label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
