import Icon from './Icon';
import { notes } from '../data/notes';
import SectionLabel from './SectionLabel';

const shortDate = (iso) =>
  new Date(iso).toLocaleDateString('en-SG', { day: 'numeric', month: 'short', year: 'numeric' });

export default function Notes() {
  return (
    <section className="section notes-section" id="notes" aria-labelledby="notes-title">
      <div className="section-intro compact">
        <SectionLabel code="NTS" reveal>
          Notes
        </SectionLabel>
        <h2 id="notes-title" data-reveal>
          Things I got wrong <em>the first time.</em>
        </h2>
        <p className="notes-intro" data-reveal>
          Three that cost me a rewrite each. Writing them down is the cheapest way I have found to not repeat
          them.
        </p>
      </div>

      {/* Item 17 (round two): each of these is now a page with a date and a URL. */}
      <div className="notes-list">
        {notes.map((note) => (
          <article key={note.slug} data-reveal>
            <p className="notes-meta">
              <time className="notes-date numeric" dateTime={note.date}>
                {shortDate(note.date)}
              </time>
              <span>{note.project}</span>
              <span>{note.minutes} min</span>
            </p>
            <h3>
              <a href={`#/note/${note.slug}`}>{note.title}</a>
            </h3>
            <p>{note.dek}</p>
            <a className="notes-read" href={`#/note/${note.slug}`}>
              Read it <Icon name="arrow" size={14} />
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
