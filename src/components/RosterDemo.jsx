import { useState } from 'react';
import Icon from './Icon';

// Item 15 (round one) — the signature moment.
//
// The brief was: pick one hook and go deep, and prefer the version that doubles as
// proof. A particle field would have been decorative; this is the actual decision
// PulseOps exists to support, playable in the page.
//
// Deliberately a *miniature*: it is labelled as a working model of the matching rules,
// not a slice of the real product. The rules below are the ones described in the case
// study — qualification is a hard gate, fatigue is a safety constraint rather than a
// preference, and the tool ranks candidates but never chooses for you.
//
// Round two, items 10 and 11: assigning used to change state instantly and silently,
// and the whole block read as a table. It now has a status bar that resolves, a
// coverage figure that counts, and rows that look like something you can press.

// Two scenarios, because the demo appears twice. The index instance teaches the
// mechanic with a clean answer available; the case-study instance is the version worth
// meeting a second time — every remaining candidate carries a flag and the tool cannot
// hand you a right answer. Same rules, different Tuesday.
export const SCENARIOS = {
  clean: {
    shift: { code: 'A04', day: 'Tue 14 Jul', window: '07:00 – 19:00', needs: 'Paramedic', seats: 3 },
    eyebrow: 'A working model of the matching rules',
    sub: (
      <>
        Four crew could cover it. Two of them legally cannot, and the tool will tell you why — but it will not
        choose. <strong>That part is yours.</strong>
      </>
    ),
    crew: [
      { id: 'c1', name: 'Nadia R.', role: 'Paramedic', hours: 38, restHours: 14, available: true },
      { id: 'c2', name: 'Wei Lun T.', role: 'Paramedic', hours: 56, restHours: 8, available: true },
      { id: 'c3', name: 'Siti A.', role: 'Emergency medic', hours: 22, restHours: 30, available: true },
      { id: 'c4', name: 'Daniel O.', role: 'Paramedic', hours: 44, restHours: 26, available: false },
    ],
  },

  // The one where the rules run out. Both eligible crew are flagged, and the ranking
  // puts the one nearer the weekly ceiling first because rest is weighted heavier than
  // hours — which is exactly the judgement the tool refuses to make for you.
  hard: {
    shift: { code: 'A07', day: 'Sat 18 Jul', window: '19:00 – 07:00', needs: 'Paramedic', seats: 2 },
    eyebrow: 'The same rules, on a worse night',
    sub: (
      <>
        A night shift, and nobody left is a clean answer. Both crew who can legally take it are carrying a
        flag. <strong>The tool ranks them and stops there.</strong>
      </>
    ),
    crew: [
      { id: 'h1', name: 'Marcus L.', role: 'Paramedic', hours: 54, restHours: 13, available: true },
      { id: 'h2', name: 'Farah B.', role: 'Paramedic', hours: 51, restHours: 9, available: true },
      { id: 'h3', name: 'Priya N.', role: 'Emergency medic', hours: 20, restHours: 40, available: true },
      { id: 'h4', name: 'Jason T.', role: 'Paramedic', hours: 30, restHours: 20, available: false },
    ],
  },
};

// The ranking rules, kept in one place so the explanation under the demo and the
// behaviour of the demo cannot drift apart.
function assess(person, shift) {
  const blockers = [];
  const flags = [];

  if (!person.available) blockers.push('Already rostered on this shift');
  if (person.role !== shift.needs)
    blockers.push(`Not qualified — shift needs a ${shift.needs.toLowerCase()}`);

  if (person.restHours < 11) flags.push(`Only ${person.restHours}h rest since last shift`);
  if (person.hours >= 52) flags.push(`${person.hours}h this week — near the weekly ceiling`);

  const eligible = blockers.length === 0;
  // Lower is better: fatigue load dominates, hours break the tie.
  const score = person.hours + Math.max(0, 12 - person.restHours) * 4;

  return { eligible, blockers, flags, score };
}

export default function RosterDemo({ scenario = 'clean' }) {
  const [assigned, setAssigned] = useState(null);
  const { shift: SHIFT, crew: CREW, eyebrow, sub } = SCENARIOS[scenario] ?? SCENARIOS.clean;

  const ranked = CREW.map((person) => ({ person, ...assess(person, SHIFT) })).sort((a, b) => {
    if (a.eligible !== b.eligible) return a.eligible ? -1 : 1;
    return a.score - b.score;
  });

  const chosen = assigned ? ranked.find((entry) => entry.person.id === assigned) : null;
  const crewed = chosen ? SHIFT.seats : SHIFT.seats - 1;

  return (
    <div className={`roster-demo${chosen ? ' is-resolved' : ''}`}>
      {/* Item 11: an instrument reads as an instrument. The unit, the window and the
          live coverage sit in a status bar, the way they would in the real product. */}
      <div className="roster-bar">
        <span className="roster-unit">{SHIFT.code}</span>
        <span className="roster-when">
          {SHIFT.day} · {SHIFT.window}
        </span>
        <span className={`roster-coverage${chosen ? ' is-full' : ''}`} role="status">
          <span className="roster-coverage-dot" aria-hidden="true" />
          <b className="numeric roster-count" key={crewed}>
            {crewed}
          </b>{' '}
          of {SHIFT.seats} crewed
        </span>
      </div>

      <div className="roster-head">
        <div>
          <p className="roster-eyebrow">{eyebrow}</p>
          <h3>
            {SHIFT.code} is short a {SHIFT.needs.toLowerCase()}
          </h3>
          <p className="roster-sub">{sub}</p>
        </div>
        {assigned ? (
          <button type="button" className="roster-reset" onClick={() => setAssigned(null)}>
            <Icon name="reset" size={14} /> Reset
          </button>
        ) : null}
      </div>

      {chosen ? (
        <div className="roster-result" role="status">
          <p className="roster-result-title">
            <Icon name="check" size={16} /> {chosen.person.name} assigned to {SHIFT.code}
          </p>
          <p>
            {chosen.flags.length > 0
              ? `Logged with a fatigue note: ${chosen.flags.join('; ').toLowerCase()}. In the real system this stays attached to the shift so it surfaces again at payroll and in the weekly report — a decision someone made, not a rule that fired.`
              : 'Clean match — qualified, rested, and inside the weekly ceiling. The roster, the staff view and the payroll record all update from this one action.'}
          </p>
        </div>
      ) : null}

      <ul className="roster-list">
        {ranked.map(({ person, eligible, blockers, flags }, position) => {
          const isChosen = chosen?.person.id === person.id;
          const dimmed = Boolean(chosen) && !isChosen;
          return (
            <li
              key={person.id}
              className={[
                eligible ? '' : 'is-blocked',
                isChosen ? 'is-chosen' : '',
                dimmed ? 'is-dimmed' : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <button
                type="button"
                disabled={!eligible || Boolean(chosen)}
                onClick={() => setAssigned(person.id)}
                aria-label={
                  eligible
                    ? `Assign ${person.name} to shift ${SHIFT.code}`
                    : `${person.name} unavailable: ${blockers.join('; ')}`
                }
              >
                <span className="roster-rank numeric">
                  {eligible ? String(position + 1).padStart(2, '0') : '—'}
                </span>

                <span className="roster-person">
                  <strong>{person.name}</strong>
                  <em>{person.role}</em>
                </span>

                <span className="roster-metrics">
                  <span>
                    <b className="numeric">{person.hours}h</b> this week
                  </span>
                  <span>
                    <b className="numeric">{person.restHours}h</b> rest
                  </span>
                </span>

                <span className="roster-status">
                  {blockers.map((reason) => (
                    <span className="roster-chip roster-chip-block" key={reason}>
                      {reason}
                    </span>
                  ))}
                  {eligible &&
                    flags.map((flag) => (
                      <span className="roster-chip roster-chip-warn" key={flag}>
                        {flag}
                      </span>
                    ))}
                  {eligible && flags.length === 0 ? (
                    <span className="roster-chip roster-chip-ok">Rested · qualified</span>
                  ) : null}
                </span>

                {/* Item 11: a real button at rest, not text that turns out to be clickable. */}
                {eligible ? (
                  <span className="roster-action" aria-hidden="true">
                    {isChosen ? (
                      <>
                        <Icon name="check" size={14} /> Assigned
                      </>
                    ) : (
                      <>
                        Assign <Icon name="arrow" size={14} />
                      </>
                    )}
                  </span>
                ) : null}
              </button>
            </li>
          );
        })}
      </ul>

      <p className="roster-note">
        Ranking is fatigue-weighted: rest below 11 hours costs four times as much as an ordinary hour worked,
        and qualification is a hard gate rather than a penalty. The tool never assigns on its own — a
        coordinator knows things the roster does not.
      </p>
    </div>
  );
}
