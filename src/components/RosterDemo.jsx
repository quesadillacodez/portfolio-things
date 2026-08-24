import { useState } from 'react';
import Icon from './Icon';

// Item 15 — the signature moment.
//
// The brief was: pick one hook and go deep, and prefer the version that doubles as
// proof. A particle field would have been decorative; this is the actual decision
// PulseOps exists to support, playable in the page.
//
// Deliberately a *miniature*: it is labelled as a working model of the matching rules,
// not a slice of the real product. The rules below are the ones described in the case
// study — qualification is a hard gate, fatigue is a safety constraint rather than a
// preference, and the tool ranks candidates but never chooses for you.

const SHIFT = { code: 'A04', day: 'Tue 14 Jul', window: '07:00 – 19:00', needs: 'Paramedic' };

const CREW = [
  {
    id: 'c1',
    name: 'Nadia R.',
    role: 'Paramedic',
    hours: 38,
    restHours: 14,
    available: true,
  },
  {
    id: 'c2',
    name: 'Wei Lun T.',
    role: 'Paramedic',
    hours: 56,
    restHours: 8,
    available: true,
  },
  {
    id: 'c3',
    name: 'Siti A.',
    role: 'Emergency medic',
    hours: 22,
    restHours: 30,
    available: true,
  },
  {
    id: 'c4',
    name: 'Daniel O.',
    role: 'Paramedic',
    hours: 44,
    restHours: 26,
    available: false,
  },
];

// The ranking rules, kept in one place so the explanation under the demo and the
// behaviour of the demo cannot drift apart.
function assess(person, shift) {
  const blockers = [];
  const flags = [];

  if (!person.available) blockers.push('Already rostered on this shift');
  if (person.role !== shift.needs) blockers.push(`Not qualified — shift needs a ${shift.needs.toLowerCase()}`);

  if (person.restHours < 11) flags.push(`Only ${person.restHours}h rest since last shift`);
  if (person.hours >= 52) flags.push(`${person.hours}h this week — near the weekly ceiling`);

  const eligible = blockers.length === 0;
  // Lower is better: fatigue load dominates, hours break the tie.
  const score = person.hours + Math.max(0, 12 - person.restHours) * 4;

  return { eligible, blockers, flags, score };
}

export default function RosterDemo() {
  const [assigned, setAssigned] = useState(null);

  const ranked = CREW.map((person) => ({ person, ...assess(person, SHIFT) })).sort((a, b) => {
    if (a.eligible !== b.eligible) return a.eligible ? -1 : 1;
    return a.score - b.score;
  });

  const chosen = assigned ? ranked.find((entry) => entry.person.id === assigned) : null;

  return (
    <div className="roster-demo">
      <div className="roster-head">
        <div>
          <p className="roster-eyebrow">Try it — a working model of the matching rules</p>
          <h3>
            {SHIFT.code} is short a {SHIFT.needs.toLowerCase()}
          </h3>
          <p className="roster-sub">
            {SHIFT.day} · {SHIFT.window}. Four crew could cover it. The tool ranks them and
            shows its reasoning — you make the call.
          </p>
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
              ? `Logged with a fatigue note: ${chosen.flags.join('; ').toLowerCase()}. In the real system this stays attached to the shift so it surfaces again at payroll and in the weekly report.`
              : 'Clean match — qualified, rested, and inside the weekly ceiling. The roster, the staff view and the payroll record all update from this one action.'}
          </p>
        </div>
      ) : null}

      <ul className="roster-list">
        {ranked.map(({ person, eligible, blockers, flags }, position) => (
          <li key={person.id} className={eligible ? '' : 'is-blocked'}>
            <button
              type="button"
              disabled={!eligible}
              onClick={() => setAssigned(person.id)}
              aria-label={
                eligible
                  ? `Assign ${person.name} to shift ${SHIFT.code}`
                  : `${person.name} unavailable: ${blockers.join('; ')}`
              }
            >
              <span className="roster-rank">{eligible ? String(position + 1).padStart(2, '0') : '—'}</span>

              <span className="roster-person">
                <strong>{person.name}</strong>
                <em>{person.role}</em>
              </span>

              <span className="roster-metrics">
                <span><b>{person.hours}h</b> this week</span>
                <span><b>{person.restHours}h</b> rest</span>
              </span>

              <span className="roster-status">
                {blockers.map((reason) => (
                  <span className="roster-chip roster-chip-block" key={reason}>{reason}</span>
                ))}
                {eligible && flags.map((flag) => (
                  <span className="roster-chip roster-chip-warn" key={flag}>{flag}</span>
                ))}
                {eligible && flags.length === 0 ? (
                  <span className="roster-chip roster-chip-ok">Rested · qualified</span>
                ) : null}
              </span>

              {eligible ? <span className="roster-action" aria-hidden="true">Assign <Icon name="arrow" size={14} /></span> : null}
            </button>
          </li>
        ))}
      </ul>

      <p className="roster-note">
        Ranking is fatigue-weighted: rest below 11 hours costs four times as much as an
        ordinary hour worked, and qualification is a hard gate rather than a penalty. The
        tool never assigns on its own — a coordinator knows things the roster does not.
      </p>
    </div>
  );
}
