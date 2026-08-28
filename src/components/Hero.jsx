import { useEffect, useRef, useState } from 'react';
import Icon from './Icon';
import Picture from './Picture';
import images from '../data/images.json';
import { site } from '../data/site';
import { useHeroMotion } from '../hooks/useHeroMotion';

// Two photos, and the second one is the point. The headshot sits at rest; hovering or
// focusing swaps to him in the snow with his hands on his head. Presence is read from
// the manifest rather than caught with onError, so a missing master costs no request
// and the slot falls back to the monogram.
//
// This is now the largest thing above the fold, which makes it the LCP element and the
// reason index.html preloads it. If the key changes here, change it there too.
const PORTRAIT = 'portrait';
const PORTRAIT_ALT = 'portrait-fun';
const hasPortrait = Boolean(images[PORTRAIT]);
const hasPortraitAlt = Boolean(images[PORTRAIT_ALT]);

const CONTENTS = [
  { id: 'try', n: '01', label: 'Try it', note: 'One real rostering decision' },
  { id: 'work', n: '02', label: 'Work', note: '5 projects, 2 case studies' },
  { id: 'about', n: '03', label: 'About', note: 'Where the instinct came from' },
  { id: 'notes', n: '04', label: 'Notes', note: '3 things I got wrong first' },
];

/** A live clock in Singapore, so "Singapore" is a fact about a person, not a label. */
function useLocalTime(timeZone) {
  const format = () =>
    new Intl.DateTimeFormat('en-SG', {
      timeZone,
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).format(new Date());

  const [time, setTime] = useState(format);

  useEffect(() => {
    // Tick on the minute boundary rather than every second — same result, far less work.
    let timer;
    const schedule = () => {
      timer = setTimeout(
        () => {
          setTime(format());
          schedule();
        },
        60_000 - (Date.now() % 60_000),
      );
    };
    schedule();
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeZone]);

  return time;
}

export default function Hero({ onOpenProof }) {
  const localTime = useLocalTime(site.timeZone);
  const root = useRef(null);

  // GSAP owns this section: one timeline, plus the scrub the observer cannot express.
  useHeroMotion(root);

  return (
    <section className="hero" id="top" aria-labelledby="hero-title" ref={root}>
      <div className="hero-grid">
        <div className="hero-lead">
          {/* One warm line, not a four-column instrument row. The board's status bar
              used to live here and it opened the site with readings about a person
              rather than the person — the vocabulary now starts at the demo, where
              there is actually something being monitored. */}
          <p className="hero-meta" data-hero="meta">
            <a href={`mailto:${site.email}?subject=Internship%20opportunity`}>
              <span className="status-dot" aria-hidden="true" />
              Open to internships
            </a>
            <span className="hero-meta-sep" aria-hidden="true" />
            <span>
              Singapore, <time className="numeric">{localTime}</time>
            </span>
          </p>

          {/* Plain markup: GSAP's SplitText does the splitting at runtime and restores
              the original nodes on revert, so the heading stays one selectable string. */}
          {/* The name is the h1 and the claim is the line under it. Written as one
              display sentence it ran to six lines at 1440 and pushed everything else
              below the fold — the person, the buttons and the index all lost to a
              headline. Two elements, two sizes, one idea each. */}
          <h1 className="hero-title" id="hero-title" data-hero="title">
            I&rsquo;m Hadi Qusyairi.
          </h1>

          <p className="hero-claim" data-hero="claim">
            The delay is never the task. <em>It&rsquo;s the handover.</em>
          </p>

          <p className="hero-blurb" data-hero="blurb">
            Three years on retail floors, in stockrooms and behind a shooting-range equipment counter taught
            me the same thing in three places: the hold-up is almost never the job, it is the ten minutes
            between one person finishing and the next person finding out. I build the software that closes
            those ten minutes.
          </p>

          <div className="hero-actions" data-hero="actions">
            <a
              className="button button-primary"
              href={`mailto:${site.email}?subject=Let%E2%80%99s%20work%20together`}
            >
              Start a conversation <Icon name="arrow" />
            </a>
            <a className="button button-quiet" href="#try">
              Try the thing I built
            </a>
          </div>
          <p className="hero-aside" data-hero="aside">
            or{' '}
            <a href="/Hadi-Qusyairi-Resume.pdf" download>
              download my résumé
            </a>{' '}
            — two pages, no buzzwords.
          </p>
        </div>

        <div className="hero-person">
          <div className={`portrait ${hasPortrait ? '' : 'is-monogram'}`} data-hero="portrait">
            {hasPortrait ? (
              <>
                <Picture
                  className="portrait-main"
                  name={PORTRAIT}
                  alt="Hadi Qusyairi"
                  sizes="(min-width: 1050px) 34vw, 76vw"
                  loading="eager"
                  fetchPriority="high"
                />
                {/* The one hover on the site that surprises you. */}
                {hasPortraitAlt ? (
                  <Picture
                    className="portrait-alt"
                    name={PORTRAIT_ALT}
                    alt=""
                    ariaHidden="true"
                    sizes="(min-width: 1050px) 34vw, 76vw"
                    loading="eager"
                  />
                ) : null}
              </>
            ) : (
              <span aria-hidden="true">HQ</span>
            )}
          </div>

          <div className="hero-now" data-hero="now">
            <p className="hero-now-label">This week</p>
            <p className="hero-now-body">Making an XP ledger reconcile without ever storing a balance.</p>
            <button type="button" className="hero-now-link" onClick={onOpenProof}>
              See what that looks like <Icon name="arrow" />
            </button>
          </div>
        </div>
      </div>

      {/* The page index closes the hero. It is the one piece of the board treatment
          that belongs this high: it is a contents list, and a contents list is allowed
          to look like an instrument. */}
      <nav className="hero-index" aria-label="What's on this page" data-hero="index">
        <ul>
          {CONTENTS.map(({ id, n, label, note }) => (
            <li key={id}>
              <a href={`#${id}`}>
                <span className="numeric">{n}</span>
                <b>{label}</b>
                <em>{note}</em>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
