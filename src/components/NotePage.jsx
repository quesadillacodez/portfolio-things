import Icon from './Icon';
import CopyLink from './CopyLink';
import { notes } from '../data/notes';
import SectionLabel from './SectionLabel';

const longDate = (iso) =>
  new Date(iso).toLocaleDateString('en-SG', { day: 'numeric', month: 'long', year: 'numeric' });

// Item 17 (round two): a note now has a page, a date and a URL, instead of being a
// paragraph in a three-column strip that looked like writing without being readable.
export default function NotePage({ note }) {
  const others = notes.filter((entry) => entry.slug !== note.slug);

  return (
    <article className="note-page">
      <a className="case-back" href="#notes">
        <Icon name="arrow" size={14} /> All notes
      </a>

      <header className="note-head">
        <SectionLabel code="NOTE">{note.project}</SectionLabel>
        <p className="note-meta">
          <time className="numeric" dateTime={note.date}>
            {longDate(note.date)}
          </time>
          <span>
            <span className="numeric">{note.minutes}</span> min read
          </span>
        </p>
        <h1>{note.title}</h1>
        <p className="note-dek">{note.dek}</p>
      </header>

      <div className="note-body">
        {note.body.map((paragraph) => (
          <p key={paragraph.slice(0, 40)}>{paragraph}</p>
        ))}
      </div>

      <footer className="note-foot">
        <CopyLink label="Copy link to this note" />
        <div className="note-next">
          <p className="note-next-label">Also written</p>
          {others.map((entry) => (
            <a key={entry.slug} href={`#/note/${entry.slug}`}>
              {entry.title} <Icon name="arrow" size={14} />
            </a>
          ))}
        </div>
      </footer>
    </article>
  );
}
