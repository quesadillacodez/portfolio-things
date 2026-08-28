import SectionLabel from './SectionLabel';

export default function About() {
  return (
    <section className="section about-section" id="about" aria-labelledby="about-title">
      <div className="section-intro compact">
        <SectionLabel code="ABT">About</SectionLabel>
        <h2 id="about-title">
          Operations first, <em>software second.</em>
        </h2>
      </div>

      <div className="about-grid">
        <div className="about-copy">
          <p>
            Before I built tools for operations, I worked inside them — retail floors, stockrooms, and the
            equipment counter at a SAFRA shooting range.
          </p>
          <p>
            Those jobs taught me the same thing in three different places: the delay is almost never in the
            task itself, it is in the handover. At the range I issued and accounted for{' '}
            <strong>200+ rifles a week</strong> under strict safety protocol, and the bottleneck was never the
            safety check — it was how equipment got logged. Reworking that step cut customer waiting by up to
            20% at peak. On the shop floor it was stock takes: holding accuracy <strong>above 98%</strong> is
            a process outcome, not a personality trait, and you get there by making the count harder to do
            wrong.
          </p>
          <p>
            That is the same instinct behind PulseOps and the NETS XP store. I look for the step where
            information changes hands, and I build the thing that stops it getting lost.
          </p>
        </div>

        <aside className="currently">
          <h3>Currently</h3>
          <dl>
            <div>
              <dt>Building</dt>
              <dd>A rewards ledger where every point reconciles without ever storing a balance.</dd>
            </div>
            <div>
              <dt>Learning</dt>
              <dd>TypeScript, and end-to-end testing with Playwright against a real production build.</dd>
            </div>
            <div>
              <dt>Curious about</dt>
              <dd>How CPF and payroll edge cases get encoded in systems people actually trust.</dd>
            </div>
          </dl>
          <span className="stamp">Updated August 2026</span>
        </aside>
      </div>

      <figure className="pullquote">
        <blockquote>They responded to its simplicity — the workflow, not the interface.</blockquote>
        <figcaption>
          <b>Clinic Digitalisation concept</b>
          Paraphrased feedback from practising doctors shown the concept.
        </figcaption>
      </figure>
    </section>
  );
}
