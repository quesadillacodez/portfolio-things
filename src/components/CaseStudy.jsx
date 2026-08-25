import { useEffect } from 'react';
import Icon from './Icon';
import TiltFrame from './TiltFrame';
import Picture from './Picture';
import RosterDemo from './RosterDemo';

// Item 17: a project with six interface screens and CPF-aware payroll logic was
// compressed into three short paragraphs on a shared index. This is the page it earned:
// context, constraints, the decisions that were rejected and why, the screens at full
// size, and what would change next time.
//
// The "decisions" and "what I'd change" sections are the ones that actually matter for
// a junior hire — they are the only place a reader can see judgement rather than output.
export default function CaseStudy({ project, onOpenImage, reducedMotion }) {
  const study = project.caseStudy;

  // A route change should start at the top of the new page, not wherever the index
  // happened to be scrolled to.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [project.slug]);

  return (
    <article className="case">
      <div className="case-inner">
        <a className="case-back" href="#work">
          <span aria-hidden="true">←</span> All work
        </a>

        <header className="case-head">
          <p className="section-label">{project.eyebrow}</p>
          <h1>{project.title}</h1>
          <p className="case-summary">{project.summary}</p>

          <dl className="case-facts">
            <div>
              <dt>Role</dt>
              <dd>{study.role}</dd>
            </div>
            <div>
              <dt>Period</dt>
              <dd>{study.period}</dd>
            </div>
            <div>
              <dt>Stack</dt>
              <dd>{project.stack.join(' · ')}</dd>
            </div>
          </dl>

          {project.demo && (
            <a className="button button-primary" href={project.demo} target="_blank" rel="noreferrer">
              {project.demoNote || 'Live demo'} <Icon name="arrow" />
            </a>
          )}
        </header>

        <section className="case-block">
          <h2>Context</h2>
          <p>{study.context}</p>
        </section>

        <section className="case-block">
          <h2>Constraints</h2>
          <ul className="case-constraints">
            {study.constraints.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </section>

        {/* Item 15 lives here as well as on the index: the case study is exactly where a
            reader is most willing to spend thirty seconds on the actual decision. */}
        {/* The index already carries the clean version of this. Meeting the identical
            puzzle twice is a re-run, so the case study gets the one where the rules run
            out and a person has to decide. */}
        <section className="case-block case-block-wide">
          <h2>Where the rules run out</h2>
          <RosterDemo scenario="hard" />
        </section>

        {/* The index card shows the first two of these. This is the whole argument —
            the reader is here because they wanted it. */}
        {project.highlight && (
          <section className="case-block">
            <h2>{project.highlight.title}</h2>
            <p>{project.highlight.blurb}</p>
            <ul className="case-constraints">
              {project.highlight.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </section>
        )}

        <section className="case-block">
          <h2>Decisions</h2>
          <div className="case-decisions">
            {study.decisions.map((decision, index) => (
              <div key={decision.title}>
                <span className="case-decision-num">{String(index + 1).padStart(2, '0')}</span>
                <h3>{decision.title}</h3>
                <p>{decision.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="case-block case-block-wide">
          <h2>The screens</h2>
          <div className="case-grid">
            {project.visual.images.map((image, index) => (
              <TiltFrame
                key={image.image}
                label="Enlarge"
                ariaLabel={`Enlarge: ${image.alt}`}
                reducedMotion={reducedMotion}
                onActivate={(rect) => onOpenImage(project.visual.images, index, rect)}
              >
                <Picture name={image.image} alt={image.alt} sizes="(min-width: 900px) 45vw, 92vw" />
              </TiltFrame>
            ))}
          </div>
        </section>

        {/* Item 22: renders only when Hadi adds real artifacts — see data/projects.js. */}
        {project.artifacts?.length > 0 && (
          <section className="case-block case-block-wide">
            <h2>The messy middle</h2>
            <div className="case-grid">
              {project.artifacts.map((artifact) => (
                <figure key={artifact.src} className="case-artifact">
                  <img src={artifact.src} alt={artifact.label} loading="lazy" decoding="async" />
                  <figcaption>
                    <strong>{artifact.label}</strong>
                    {artifact.note}
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}

        <section className="case-block">
          <h2>What I&rsquo;d change</h2>
          <ul className="case-next">
            {study.nextTime.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </section>

        <footer className="case-foot">
          <a className="button button-quiet" href="#work">
            <span aria-hidden="true">←</span> Back to all work
          </a>
          <a className="button button-primary" href="mailto:hadiqbz@gmail.com?subject=PulseOps">
            Ask me about this project <Icon name="arrow" />
          </a>
        </footer>
      </div>
    </article>
  );
}
