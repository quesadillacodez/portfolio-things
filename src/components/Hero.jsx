import { useState } from 'react';
import Icon from './Icon';
import SplitHeading from './SplitHeading';
import Picture from './Picture';

const EMAIL = 'hadiqbz@gmail.com';

// The one screenshot that best answers "can this person build?" — pulled up out of
// the work section so it lands above the fold (item 02).
const PROOF_IMAGE = 'pulseops-roster';

export default function Hero({ reducedMotion, onOpenProof }) {
  // Item 05: a portrait is the one asset that has to come from Hadi. Rather than
  // shipping a broken image or a grey avatar blob, the slot renders a typographic
  // monogram and swaps itself for the photo the moment
  // /public/assets/portrait.jpg exists. Nothing to wire up — just add the file.
  const [hasPortrait, setHasPortrait] = useState(true);

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-grid">
        <div className="hero-lead">
          {/* Item 04: this was 11.5px of muted grey uppercase — the most commercially
              useful string on the site, styled like a footnote. It is now a live
              status pill with a pulsing dot that links straight to email. */}
          <a className="status-pill" href={`mailto:${EMAIL}?subject=Internship%20opportunity`}>
            <span className="status-dot" aria-hidden="true" />
            Open to internships
            <span className="status-sep" aria-hidden="true" />
            Singapore
          </a>

          {/* Item 03: staggered in per word on load rather than arriving as one block. */}
          <SplitHeading
            as="h1"
            id="hero-title"
            text="I turn operational friction into"
            emphasis="clear digital tools."
            immediate
            reducedMotion={reducedMotion}
            step={45}
          />

          <p className="hero-blurb">
            I&rsquo;m Hadi Qusyairi, a Digital Business and FinTech student building practical software and
            analytics tools, informed by hands-on experience in retail, logistics, and service operations.
          </p>

          {/* Item 06: the primary action was "Explore my work", which only scrolled.
              Starting a conversation is now the primary button; scrolling is demoted
              to the quiet one next to it. */}
          <div className="hero-actions">
            <a
              className="button button-primary"
              href={`mailto:${EMAIL}?subject=Let%E2%80%99s%20work%20together`}
            >
              Start a conversation <Icon name="arrow" />
            </a>
            <a className="button button-quiet" href="#work">
              See the work
            </a>
            <a className="button button-text" href="/Hadi-Qusyairi-Resume.pdf" download>
              Résumé <Icon name="download" />
            </a>
          </div>
        </div>

        {/* Items 01 + 02: the original hero pushed the headline and paragraph to
            opposite ends with `margin-top: auto`, leaving ~200px of empty field in the
            middle of the most valuable screen on the site. That space now holds the
            portrait, a real interface, and the three facts worth leading with. */}
        <div className="hero-proof">
          <figure className="hero-shot">
            <button
              type="button"
              onClick={onOpenProof}
              aria-label="Enlarge the PulseOps roster builder screenshot"
            >
              <Picture
                name={PROOF_IMAGE}
                alt="The PulseOps roster builder, showing a week of ambulance crew assignments"
                sizes="(min-width: 1050px) 45vw, 92vw"
                loading="eager"
                fetchPriority="high"
              />
            </button>
            <figcaption>PulseOps — building a week of ambulance coverage</figcaption>
          </figure>

          <div className="hero-id">
            <div className={`portrait ${hasPortrait ? '' : 'is-monogram'}`}>
              {hasPortrait ? (
                <img
                  src="/assets/portrait.jpg"
                  alt="Hadi Qusyairi"
                  width="240"
                  height="240"
                  onError={() => setHasPortrait(false)}
                />
              ) : (
                <span aria-hidden="true">HQ</span>
              )}
            </div>
            <dl className="hero-facts">
              <div>
                <dt>Based in</dt>
                <dd>Singapore</dd>
              </div>
              <div>
                <dt>Studying</dt>
                <dd>Digital Business &amp; FinTech</dd>
              </div>
              <div>
                <dt>Builds</dt>
                <dd>Operational tools &amp; dashboards</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* Item 07: nothing previously indicated that 7,600px followed a full-height hero. */}
      <a className="scroll-cue" href="#work">
        <span>Selected work</span>
        <span className="scroll-cue-line" aria-hidden="true" />
      </a>
    </section>
  );
}
