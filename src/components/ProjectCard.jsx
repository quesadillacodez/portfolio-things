import Icon from './Icon';
import Picture from './Picture';

const HERO_SIZES = '(min-width: 1050px) 55vw, 90vw';
const THUMB_SIZES = '(min-width: 1050px) 14vw, 22vw';

export default function ProjectCard({ project, onOpenImage }) {
  const images = project.images ?? [];
  const [mainImage, ...rest] = images;
  const extra = images.length - 4;

  return (
    <article className={`project project-${project.number}${project.bleed ? ' project-bleed' : ''}`}>
      {project.label && <p className="project-label">{project.label}</p>}

      <div className="project-meta">
        <span className="numeric">{project.number}</span>
        <span>{project.eyebrow}</span>
      </div>

      <div className="project-heading">
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
      </div>

      {mainImage && (
        <div className="project-visual">
          <button
            type="button"
            onClick={() => onOpenImage(images, 0)}
            aria-label={`Enlarge ${project.title} screenshot`}
          >
            <Picture name={mainImage.image} alt={mainImage.alt} sizes={HERO_SIZES} />
            <span className="expand-label">
              <Icon name="expand" /> View interface
            </span>
          </button>
          {rest.length > 0 && (
            <div className="thumbnail-row" aria-label={`More ${project.title} screens`}>
              {rest.slice(0, 3).map((image, offset) => (
                <button
                  key={image.image}
                  type="button"
                  onClick={() => onOpenImage(images, offset + 1)}
                  aria-label={`View screenshot ${offset + 2}: ${image.alt}`}
                >
                  <Picture name={image.image} alt="" sizes={THUMB_SIZES} />
                </button>
              ))}
              {extra > 0 && (
                <button
                  className="more-images numeric"
                  type="button"
                  onClick={() => onOpenImage(images, 4)}
                  aria-label="View remaining screenshots"
                >
                  +{extra}
                  <small>more</small>
                </button>
              )}
            </div>
          )}
        </div>
      )}

      <div className="project-details">
        <div>
          <span>Problem</span>
          <p>{project.problem}</p>
        </div>
        <div>
          <span>Approach</span>
          <p>{project.approach}</p>
        </div>
        <div>
          <span>Outcome</span>
          <p>{project.outcome}</p>
        </div>
      </div>

      {project.highlight && (
        <div className="project-highlight">
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

      {project.note && <p className="project-note">Technical note: {project.note}</p>}

      <div className="project-footer">
        <ul className="stack-list" aria-label="Technologies used">
          {project.stack.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="project-links">
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noreferrer">
              Live demo <Icon name="arrow" />
            </a>
          )}
          {project.repo ? (
            <a href={project.repo} target="_blank" rel="noreferrer">
              Source <Icon name="arrow" />
            </a>
          ) : (
            <span className="coming-soon" title="Repository will be added when available">
              Source coming soon
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
