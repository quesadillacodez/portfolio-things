import { useEffect, useState } from 'react';
import Icon from './Icon';
import SplitHeading from './SplitHeading';
import Picture from './Picture';
import { site } from '../data/site';

// Item 02: the hero used to show the whole roster dashboard shrunk to ~568px, which
// put its interface type at roughly 8px. This is a crop of the one region that tells
// the story — the crew-gap banner and the coverage it belongs to — so the screenshot
// is legible at the size it actually renders.
const PROOF_IMAGE = 'pulseops-hero-crop';

// Item 01: two photos, and the second one is the point. The portrait is the real,
// unposed one; holding or tapping it swaps to the other. Both live in /public and the
// slot degrades to a typographic monogram until they exist, so nothing ever renders
// broken.
const PORTRAIT = '/portrait.jpg';
const PORTRAIT_ALT = '/portrait-fun.jpg';

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

export default function Hero({ reducedMotion, onOpenProof }) {
  const [hasPortrait, setHasPortrait] = useState(true);
  const localTime = useLocalTime(site.timeZone);

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-grid">
        <div className="hero-lead">
          {/* Item 04 + 05: the pill now carries a live local time, so it reads as
              somebody who is actually awake somewhere rather than a static label. */}
          <a className="status-pill" href={`mailto:${site.email}?subject=Internship%20opportunity`}>
            <span className="status-dot" aria-hidden="true" />
            Open to internships
            <span className="status-sep" aria-hidden="true" />
            <span className="status-time">
              Singapore, <time className="numeric">{localTime}</time>
            </span>
          </a>

          {/* Item 04: the old headline — "I turn operational friction into clear digital
              tools" — was agency copy that would sit unchanged on any consultancy site.
              This is the actual thesis, and it is his. */}
          <SplitHeading
            as="h1"
            id="hero-title"
            text="The delay is never the task."
            emphasis="It’s the handover."
            immediate
            reducedMotion={reducedMotion}
            step={45}
          />

          <p className="hero-blurb">
            I&rsquo;m Hadi Qusyairi, a Digital Business and FinTech student in Singapore. I spent three years
            on retail floors, in stockrooms and behind a shooting-range equipment counter, watching where work
            actually gets stuck. Now I build the software that unsticks it.
          </p>

          {/* Item 06: three competing buttons became one primary, one secondary, and a
              quiet text link. The résumé is still above the fold, just no longer pretending
              to be equal in weight to "start a conversation". */}
          <div className="hero-actions">
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
          <p className="hero-aside">
            or{' '}
            <a href="/Hadi-Qusyairi-Resume.pdf" download>
              download my résumé
            </a>{' '}
            — two pages, no buzzwords.
          </p>
        </div>

        <div className="hero-proof">
          <figure className="hero-shot">
            <button
              type="button"
              onClick={onOpenProof}
              aria-label="Enlarge the PulseOps roster builder screenshot"
            >
              <Picture
                name={PROOF_IMAGE}
                alt="PulseOps warning that seven stations still need crew, above the week's coverage summary"
                sizes="(min-width: 1050px) 42vw, 92vw"
                loading="eager"
                fetchPriority="high"
              />
            </button>
            <figcaption>PulseOps — seven ambulances, and nobody assigned yet</figcaption>
          </figure>

          {/* Item 07: this slot used to end on three static facts (Based in / Studying /
              Builds) in the most valuable space on the site. It now holds the face, what is
              actually happening this week, and a way into the one thing worth touching. */}
          <div className="hero-id">
            <div className={`portrait ${hasPortrait ? '' : 'is-monogram'}`}>
              {hasPortrait ? (
                <>
                  <img
                    className="portrait-main"
                    src={PORTRAIT}
                    alt="Hadi Qusyairi"
                    width="240"
                    height="240"
                    onError={() => setHasPortrait(false)}
                  />
                  {/* Item 16: one hover on the site that surprises you. */}
                  <img
                    className="portrait-alt"
                    src={PORTRAIT_ALT}
                    alt=""
                    aria-hidden="true"
                    width="240"
                    height="240"
                  />
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

      {/* Item 08: the visitor used to commit to fifteen screens of scroll with no idea
          what was down there. This is the contents page. */}
      <nav className="hero-index" aria-label="What's on this page">
        <a href="#try">
          <span className="numeric">01</span>
          <b>Try it</b>
          <em>One real rostering decision</em>
        </a>
        <a href="#work">
          <span className="numeric">02</span>
          <b>Work</b>
          <em>5 projects, 2 case studies</em>
        </a>
        <a href="#notes">
          <span className="numeric">03</span>
          <b>Notes</b>
          <em>3 things I got wrong first</em>
        </a>
        <a href="#about">
          <span className="numeric">04</span>
          <b>About</b>
          <em>Where the instinct came from</em>
        </a>
      </nav>
    </section>
  );
}
