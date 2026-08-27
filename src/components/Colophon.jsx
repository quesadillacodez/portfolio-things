import Icon from './Icon';
import { site } from '../data/site';
import SectionLabel from './SectionLabel';

// Item 22 (round two): nothing told a visitor what this site is made of, why it looks
// the way it does, or what its author has opinions about. That is cheap to write and
// disproportionately loved — especially from someone whose whole pitch is caring about
// how things are put together.
export default function Colophon() {
  return (
    <article className="colophon">
      <a className="case-back" href="#top">
        <Icon name="arrow" size={14} /> Back to the site
      </a>

      <header className="colophon-head">
        <SectionLabel code="CLP">Colophon</SectionLabel>
        <h1>How this site is put together</h1>
        <p className="colophon-dek">
          A portfolio that argues for caring about process should probably show its own. Everything below is
          the actual answer, including the parts that are unfinished.
        </p>
      </header>

      <section className="colophon-block">
        <h2>Built with</h2>
        <dl>
          <div>
            <dt>Framework</dt>
            <dd>
              React and Vite. No router, no CSS framework, no component library — the site is small enough
              that all three would have been more code than they saved.
            </dd>
          </div>
          <div>
            <dt>Routing</dt>
            <dd>
              Hash routes, hand-rolled in about forty lines. It means case studies and notes deploy as plain
              static files anywhere, with no rewrite rules to get wrong.
            </dd>
          </div>
          <div>
            <dt>Styling</dt>
            <dd>
              One stylesheet, semantic custom properties, no preprocessor. Both themes are driven by the same
              token names so component styles never know which one is on.
            </dd>
          </div>
          <div>
            <dt>Images</dt>
            <dd>
              A build script turns one master per screenshot into AVIF, WebP and JPEG at four widths, and
              writes a manifest of intrinsic dimensions so nothing shifts as it loads.
            </dd>
          </div>
        </dl>
      </section>

      <section className="colophon-block">
        <h2>Set in</h2>
        <dl>
          <div>
            <dt>DM Sans</dt>
            <dd>
              For everything you read. It is quiet at body size and holds up at 9rem, which is a rarer
              combination than it sounds.
            </dd>
          </div>
          <div>
            <dt>Instrument Serif</dt>
            <dd>
              Italic only, and only for the phrase each heading turns on. Used everywhere it would stop
              meaning anything.
            </dd>
          </div>
        </dl>
      </section>

      <section className="colophon-block">
        <h2>Two colours, with rules</h2>
        <dl>
          <div>
            <dt>Lime</dt>
            <dd>
              Every interactive and system signal: focus rings, the active section, scroll progress, hover,
              the availability dot, the grid that follows your pointer.
            </dd>
          </div>
          <div>
            <dt>Coral</dt>
            <dd>
              Editorial emphasis only, in two tuned values — one for display italic, one for the 11px labels,
              which need a darker version to stay legible on cream.
            </dd>
          </div>
        </dl>
        <p className="colophon-note">
          There used to be a third. It appeared once, in the footer, and owned nothing, so it is gone.
        </p>
      </section>

      <section className="colophon-block">
        <h2>Still on the list</h2>
        <ul className="colophon-todo">
          <li>Self-host the fonts. Right now one third-party request can stall first paint.</li>
          <li>Default to the visitor&rsquo;s system theme instead of always starting light.</li>
          <li>
            Give case studies and notes their own titles and share cards — today they inherit the home
            page&rsquo;s.
          </li>
          <li>
            Get a named quote from one of the doctors who saw the clinic concept. The current one is an honest
            paraphrase, which is not the same thing.
          </li>
        </ul>
      </section>

      <footer className="colophon-foot">
        <p>
          Questions about any of it are welcome at <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </footer>
    </article>
  );
}
