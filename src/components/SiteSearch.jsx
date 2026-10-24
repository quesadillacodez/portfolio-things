import { useEffect, useRef, useState } from 'react';
import { projects } from '../data/projects';
import { notes } from '../data/notes';
import { faqs } from '../data/faqs';

const entries = [
  ...projects.map((project) => ({
    title: project.title,
    body: project.summary,
    href: project.caseStudy ? `/case/${project.slug}` : '/#work',
    type: 'Project',
  })),
  ...notes.map((note) => ({ title: note.title, body: note.dek, href: `/note/${note.slug}`, type: 'Note' })),
  ...faqs.map((faq) => ({ title: faq.question, body: faq.answer, href: '/#faq', type: 'FAQ' })),
  {
    title: 'Contact Hadi',
    body: 'Email, internships, résumé and opportunities',
    href: '/#contact',
    type: 'Section',
  },
  {
    title: 'About Hadi',
    body: 'Singapore, Digital Business and FinTech, experience',
    href: '/#about',
    type: 'Section',
  },
];

export default function SiteSearch() {
  const dialog = useRef(null);
  const input = useRef(null);
  const [query, setQuery] = useState('');
  const [isMac] = useState(() => {
    if (typeof navigator !== 'undefined') {
      return /Mac|iPod|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
    }
    return true;
  });

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.key === 'k' || event.key === 'K') && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        if (dialog.current && !dialog.current.open) {
          dialog.current.showModal();
          input.current?.focus();
        } else if (dialog.current?.open) {
          dialog.current.close();
        }
        return;
      }

      if (event.key === '/') {
        const activeTag = document.activeElement?.tagName.toLowerCase();
        const isEditable =
          activeTag === 'input' ||
          activeTag === 'textarea' ||
          activeTag === 'select' ||
          document.activeElement?.isContentEditable;

        if (!isEditable) {
          event.preventDefault();
          if (dialog.current && !dialog.current.open) {
            dialog.current.showModal();
            input.current?.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const results = words.length
    ? entries.filter((entry) =>
        words.every((word) => `${entry.title} ${entry.body}`.toLowerCase().includes(word)),
      )
    : [];
  return (
    <>
      <button
        className="search-toggle"
        type="button"
        aria-keyshortcuts="Control+k Meta+k /"
        onClick={() => {
          dialog.current.showModal();
          input.current.focus();
        }}
      >
        <span>Search</span>
        <kbd className="search-shortcut">{isMac ? '⌘K' : 'Ctrl+K'}</kbd>
      </button>
      <dialog
        className="utility-dialog search-dialog"
        ref={dialog}
        aria-labelledby="search-title"
        onClose={() => setQuery('')}
      >
        <div className="utility-dialog-head">
          <h2 id="search-title">Find something</h2>
          <button type="button" onClick={() => dialog.current.close()} aria-label="Close search">
            Close
          </button>
        </div>
        <label htmlFor="site-search">Search projects, notes, and FAQs</label>
        <input
          id="site-search"
          ref={input}
          type="search"
          maxLength={120}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <p role="status" className="utility-muted">
          {words.length
            ? `${results.length} result${results.length === 1 ? '' : 's'}`
            : 'Try “roster”, “NETS”, or “internships”.'}
        </p>
        <ul className="search-results">
          {results.map((entry) => (
            <li key={entry.title}>
              <a href={entry.href} onClick={() => dialog.current.close()}>
                <span>{entry.type}</span>
                <strong>{entry.title}</strong>
                <p>{entry.body}</p>
              </a>
            </li>
          ))}
        </ul>
      </dialog>
    </>
  );
}
