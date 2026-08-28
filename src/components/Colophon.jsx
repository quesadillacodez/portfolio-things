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
            <dt>Fraunces</dt>
            <dd>
              Headlines only. It carries a WONK axis that swaps in wonky glyph alternates — a single-storey g
              with a curl, a straight-tailed y — and that axis is doing a job: the emphasised phrase in every
              heading is the wonky cut of the same face, not a colour. Emphasis you can see with the sound
              off.
            </dd>
          </div>
          <div>
            <dt>IBM Plex Mono</dt>
            <dd>
              Every reading. Times, counts, station codes, section markers, the status line at the top. If it
              names or numbers a thing, it is in this face — which is why a section marker and an ambulance
              call sign look like they came out of the same system.
            </dd>
          </div>
          <div>
            <dt>Source Sans 3</dt>
            <dd>
              The paragraphs. Its entire job is to not be noticed, and you have read four of them without
              thinking about it.
            </dd>
          </div>
        </dl>
        <p className="colophon-note">
          All three are self-hosted and subsetted to latin. Fraunces is fetched with weight and WONK only —
          adding its SOFT axis nearly doubles the file for a difference you cannot see at these sizes.
        </p>
      </section>

      <section className="colophon-block">
        <h2>Two colours, and they both mean something</h2>
        <dl>
          <div>
            <dt>Amber</dt>
            <dd>
              Unresolved. Something here is waiting on a person. It is on the availability line at the top of
              the page and on the shift nobody has crewed yet, and those are the same statement — the second
              one is just easier to see.
            </dd>
          </div>
          <div>
            <dt>Lime</dt>
            <dd>
              Decided. There is exactly one moment on this site where a thing changes from the first colour to
              the second, and it happens because you clicked something.
            </dd>
          </div>
        </dl>
        <p className="colophon-note">
          Everything else is ground, ink and hairline. That is a constraint rather than a mood: the palette
          this replaced used a coral for emphasis that measured 2.52:1 against the background on every
          headline it appeared in. A colour that carries meaning gets checked against every surface it lands
          on. A colour that carries emphasis gets checked against the one somebody remembered.
        </p>
      </section>

      <section className="colophon-block">
        <h2>Still on the list</h2>
        <ul className="colophon-todo">
          <li>
            Get a named quote from one of the doctors who saw the clinic concept. The current one is an honest
            paraphrase, which is not the same thing, and no amount of typography fixes that.
          </li>
          <li>
            Three of the five projects have nothing you can click. They are here because they happened, not
            because they are linkable, and I would rather leave the gap visible than pad it.
          </li>
          <li>
            The process-artifact sections are empty and hide themselves. Whiteboards and rejected layouts are
            the most useful thing a portfolio can show; mine are on paper, in a drawer, and inventing them
            would defeat the point.
          </li>
        </ul>
        <p className="colophon-note">
          Three things that were on this list are not any more: the fonts are self-hosted, the site follows
          your system theme before it follows anything else, and every case study and note carries its own
          title and share card. Leaving them here would have been the easier kind of honest.
        </p>
      </section>

      <footer className="colophon-foot">
        <p>
          Questions about any of it are welcome at <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </footer>
    </article>
  );
}
