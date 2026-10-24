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
  const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const results = words.length
    ? entries.filter((entry) =>
        words.every((word) => `${entry.title} ${entry.body}`.toLowerCase().includes(word)),
      )
    : [];

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        if (dialog.current?.open) {
          dialog.current.close();
        } else {
          dialog.current?.showModal();
          input.current?.focus();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const getStatusText = () => {
    if (!words.length) return 'Try “roster”, “NETS”, or “internships”.';
    if (!results.length)
      return `No matching results for “${query}”. Try searching for “roster”, “NETS”, or “internships”.`;
    return `${results.length} result${results.length === 1 ? '' : 's'}`;
  };

  return (
    <>
      <button
        className="search-toggle"
        type="button"
        aria-label="Search site (⌘K)"
        onClick={() => {
          dialog.current.showModal();
          input.current.focus();
        }}
      >
        Search <kbd className="search-kbd">⌘K</kbd>
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
          {getStatusText()}
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
