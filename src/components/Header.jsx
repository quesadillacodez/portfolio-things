import { useEffect, useState } from 'react';
import Icon from './Icon';

const links = [
  { id: 'about', label: 'About', number: '01' },
  { id: 'work', label: 'Work', number: '02' },
  { id: 'process', label: 'Process', number: '03' },
  { id: 'notes', label: 'Notes', number: '04' },
  { id: 'skills', label: 'Skills', number: '05' },
  { id: 'contact', label: 'Contact', number: '06' },
];

export default function Header({ theme, onToggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('');

  // Highlight whichever section is currently nearest the top of the viewport.
  useEffect(() => {
    const sections = links.map(({ id }) => document.getElementById(id)).filter(Boolean);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length) {
          setActive(visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0].target.id);
        }
      },
      { rootMargin: '-72px 0px -55% 0px', threshold: 0 },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // The menu overlays the page, so lock the page behind it and let Escape out.
  useEffect(() => {
    if (!menuOpen) return;
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
