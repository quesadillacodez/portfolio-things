import { useEffect, useRef, useState } from 'react';
import Icon from './Icon';
import Picture from './Picture';
import images from '../data/images.json';
import { site } from '../data/site';
import { useHeroMotion } from '../hooks/useHeroMotion';

// The hero shot is a crop of the roster screen, not the whole dashboard: at ~790px the
// full 1600px screen put its interface type at roughly 8px. The crop was previously cut
// by hand and its right edge landed mid-card, so A09 read as "X dr" and a "+ Log demand"
// button was sliced in half — it looked like a rendering bug rather than a crop. It is
// now cut on real boundaries: all seven station cards and the whole coverage row.
const PROOF_IMAGE = 'pulseops-hero-crop';

// Item 01: two photos, and the second one is the point. The headshot sits at rest;
// hovering or focusing swaps to him in the snow with his hands on his head.
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

/** Item 05: a live clock in Singapore, so "Singapore" is a signal rather than a label. */
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
          <a
            className="status-pill"
            data-hero="pill"
            href={`mailto:${site.email}?subject=Internship%20opportunity`}
          >
            <span className="status-dot" aria-hidden="true" />
            Open to internships
            <span className="status-sep" aria-hidden="true" />
            <span className="status-time">
              Singapore, <time className="numeric">{localTime}</time>
            </span>
          </a>

          {/* Plain markup: GSAP's SplitText does the splitting at runtime and restores
              the original nodes on revert, so the heading stays one selectable string. */}
          <h1 className="hero-title" id="hero-title" data-hero="title">
            The delay is never the task. <em>It&rsquo;s the handover.</em>
          </h1>

          <p className="hero-blurb" data-hero="blurb">
            I&rsquo;m Hadi Qusyairi, a Digital Business and FinTech student in Singapore. I spent three years
            on retail floors, in stockrooms and behind a shooting-range equipment counter, watching where work
            actually gets stuck. Now I build the software that unsticks it.
          </p>

          <div className="hero-actions" data-hero="actions">
            <a
              className="button button-primary"
              href={`mailto:${site.email}?subject=Let%E2%80%99s%20work%20together`}
            >
              Start a conversation <Icon name="arrow" />
            </a>
            <a className="button button-quiet" href="#work">
              See the work
            </a>
          </div>
          <p className="hero-aside" data-hero="aside">
            or{' '}
            <a href="/Hadi-Qusyairi-Resume.pdf" download>
              download my résumé
            </a>{' '}
            — two pages, no buzzwords.
          </p>

          {/* Item 08 (revised): this contents list used to sit under the whole hero,
              which put it below the fold on a 890px screen — a table of contents nobody
              saw. It now closes the left column, which also fills the 163px of dead
              field the two-column grid was leaving under the résumé line. */}
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
        </div>

        <div className="hero-proof">
          {/* The screenshot used to sit raw on the page: in dark mode a bright slab
              with a hard edge. The window chrome makes it read as a product rather than
              an image, and gives the crop an edge it is allowed to end on. */}
          <figure className="hero-shot" data-hero="frame">
            <div className="hero-shot-chrome" aria-hidden="true">
              <span />
              <span />
              <span />
              <code>PulseOps — Build Roster</code>
            </div>
            <button type="button" onClick={onOpenProof} aria-label="Enlarge the PulseOps roster screenshot">
              <Picture
                name={PROOF_IMAGE}
                alt="PulseOps warning that seven stations still need crew, above the week's coverage summary"
                sizes="(min-width: 1050px) 44vw, 92vw"
                loading="eager"
                fetchPriority="high"
              />
            </button>
            <figcaption>Seven ambulances, and nobody assigned yet</figcaption>
          </figure>

          <div className="hero-id" data-hero="id">
            <div className={`portrait ${hasPortrait ? '' : 'is-monogram'}`}>
              {hasPortrait ? (
                <>
                  <Picture
                    className="portrait-main"
                    name={PORTRAIT}
                    alt="Hadi Qusyairi"
                    sizes="104px"
                    loading="eager"
                  />
                  {/* Item 16: one hover on the site that surprises you. */}
                  {hasPortraitAlt ? (
                    <Picture
                      className="portrait-alt"
                      name={PORTRAIT_ALT}
                      alt=""
                      ariaHidden="true"
                      sizes="104px"
                      loading="eager"
                    />
                  ) : null}
                </>
              ) : (
                <span aria-hidden="true">HQ</span>
              )}
            </div>

            <div className="hero-now">
              <p className="hero-now-label">This week</p>
              <p className="hero-now-body">Making an XP ledger reconcile without ever storing a balance.</p>
              <a className="hero-now-link" href="#try">
                Try the decision this supports <Icon name="arrow" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
