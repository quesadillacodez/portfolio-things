const notes = [
  {
    title: 'What CPF rules taught me about edge cases',
    meta: ['Note', 'PulseOps'],
    body: 'Payroll looks like arithmetic until you write the contribution logic. Age bands, wage ceilings and ordinary-versus-additional wages each move the answer, and none of them are visible in the happy path. It changed how I read a spec: the interesting part is never the formula, it is the boundary the formula stops being true at.',
  },
  {
    title: 'Why I threw out my first roster UI',
    meta: ['Note', 'PulseOps'],
    body: 'The first roster builder let you assign anyone to anything and then complained afterwards. It looked flexible and was useless — a manager filling an urgent gap does not want a warning, they want the three people who can legally take the shift. Moving validation in front of the assignment made the screen smaller and the job faster.',
  },
  {
    title: 'Every rewards system has a loophole',
    meta: ['Note', 'NETS'],
    body: 'The first version of the XP store earned points on every transaction. Two users repaying each other in a loop could mint XP out of nothing. The fix was not a limit or a fraud check — it was deciding that the transaction type, not the amount, is what qualifies. Repayments, top-ups and cashback earn nothing.',
  },
];

export default function Notes() {
  return (
    <section className="section notes-section" id="notes" aria-labelledby="notes-title">
      <div className="section-intro compact">
        <p className="section-label">Notes</p>
        <h2 id="notes-title">
          Things I got wrong <em>the first time.</em>
        </h2>
      </div>
      <div className="notes-list">
        {notes.map((note) => (
          <article key={note.title}>
            <p className="notes-meta">
              {note.meta.map((tag, i) => (i === 0 ? <b key={tag}>{tag}</b> : <span key={tag}>{tag}</span>))}
            </p>
            <h3>{note.title}</h3>
            <p>{note.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
