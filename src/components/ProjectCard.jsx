import Icon from './Icon';
import Picture from './Picture';
import TiltFrame from './TiltFrame';
import Walkthrough from './Walkthrough';
import TerminalVisual from './TerminalVisual';
import FlowVisual from './FlowVisual';

export default function ProjectCard({ project, onOpenImage, reducedMotion }) {
  const { visual } = project;

  // Rendering five projects at identical weight made the two strong ones look like
  // exceptions rather than the pattern. A compact card keeps the claim, the year and
  // the stack — everything a reader needs to know it exists — and drops the visual,
  // the prose blocks and the stat row that were buying nothing on work with nothing
  // to click through to.
  if (project.compact) {
    return (
      <article className="project project-compact" data-reveal>
        <div className="project-compact-head">
          <span className="numeric">{project.number}</span>
          <h3>{project.title}</h3>
          {project.year && <span className="numeric project-year">{project.year}</span>}
        </div>
        <p className="project-compact-eyebrow">{project.eyebrow}</p>
        <p className="project-compact-summary">{project.summary}</p>
        <ul className="stack-list" aria-label="Technologies used">
          {project.stack.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </article>
    );
  }

  // Item 16: every project now resolves to something visual. Previously only the two
  // with screenshots did, and 03 and 04 rendered as walls of grey text.
  const renderVisual = () => {
    if (!visual) return null;

    if (visual.kind === 'terminal') return <TerminalVisual visual={visual} reducedMotion={reducedMotion} />;
    if (visual.kind === 'flow') return <FlowVisual visual={visual} />;

    // Item 23: PulseOps has enough real screens to walk through rather than display.
    if (project.walkthrough) {
      return (
        <Walkthrough
          steps={project.walkthrough}
          reducedMotion={reducedMotion}
          onOpenImage={(index, rect) => onOpenImage(project.walkthrough, index, rect)}
        />
      );
    }

    const [main] = visual.images;
    return (
      <TiltFrame
        label="Enlarge"
        ariaLabel={`Enlarge ${project.title} screenshot`}
        reducedMotion={reducedMotion}
        onActivate={(rect) => onOpenImage(visual.images, 0, rect)}
      >
        <Picture
          name={main.image}
          alt={main.alt}
          sizes={project.bleed ? '(min-width: 1050px) 60vw, 92vw' : '(min-width: 1050px) 40vw, 92vw'}
        />
      </TiltFrame>
    );
  };

  return (
    <article className={`project project-${project.number}${project.bleed ? ' project-bleed' : ''}`}>
      {project.label && (
        <p className="project-label" data-reveal>
          {project.label}
        </p>
      )}

      <div className="project-meta" data-reveal>
        <span className="numeric">{project.number}</span>
        <span>{project.eyebrow}</span>
        {/* Item 18 */}
        {project.year && <span className="numeric project-year">{project.year}</span>}
      </div>

      <div className="project-heading" data-reveal>
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
      </div>

      <div className="project-visual" data-reveal>
        {renderVisual()}
      </div>

      <div className="project-details" data-reveal>
        <div>
          <span>Problem</span>
          <p>{project.problem}</p>
        </div>
        <div>
          <span>Approach</span>
          <p>{project.approach}</p>
        </div>

        {/* Item 21: where a project has earned a figure, the figure leads and the
            honesty caveat becomes a footnote instead of swallowing the result. */}
        <div>
          <span>Outcome</span>
          {project.headline ? (
            <>
              <p className="outcome-figure">
                <b className="numeric">{project.headline.figure}</b>
                <span>
                  {project.headline.unit} {project.headline.label}
                </span>
              </p>
              <p className="outcome-footnote">{project.footnote}</p>
            </>
          ) : (
            <p>{project.outcome}</p>
          )}
        </div>
      </div>

      {/* The one feature this project is remembered for, lifted out of the prose. */}
      {project.highlight && (
        <div className="project-highlight" data-reveal>
          <h4>
            <em>{project.highlight.eyebrow}</em> {project.highlight.title}
          </h4>
          <p>{project.highlight.blurb}</p>
          <ul>
            {project.highlight.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Item 24: the hard facts, pulled out of prose so a skim catches on something. */}
      {project.stats && (
        <ul className="project-stats" data-reveal>
          {project.stats.map((stat) => (
            <li key={stat.label}>
              <b className="numeric">{stat.value}</b>
              <span>{stat.label}</span>
            </li>
          ))}
        </ul>
      )}

      {project.note && (
        <p className="project-note" data-reveal>
          Technical note: {project.note}
        </p>
      )}

      <div className="project-footer" data-reveal>
        <ul className="stack-list" aria-label="Technologies used">
          {project.stack.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        {/* Items 19 + 20: "Source coming soon" appeared on all four cards, turning one
            caveat into a pattern that read as "nothing here is public". The advertised
            absence is gone; real links stand on their own. */}
        <div className="project-links">
          {project.caseStudy && (
            <a className="link-strong" href={`#/case/${project.slug}`}>
              Read the case study <Icon name="arrow" />
            </a>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noreferrer">
              {project.demoNote || 'Live demo'} <Icon name="arrow" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
