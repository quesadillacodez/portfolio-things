import Icon from './Icon';

export default function ProjectCard({ project, onOpenImage }) {
  const mainImage = project.images?.[0];

  return (
    <article className={`project project-${project.number}`}>
      <div className="project-meta">
        <span>{project.number}</span>
        <span>{project.eyebrow}</span>
      </div>

      <div className="project-heading">
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
      </div>

      {mainImage && (
        <div className="project-visual">
          <button type="button" onClick={() => onOpenImage(project.images, 0)} aria-label={`Enlarge ${project.title} screenshot`}>
            <img src={mainImage.src} alt={mainImage.alt} loading="lazy" />
            <span className="expand-label"><Icon name="expand" /> View interface</span>
          </button>
          {project.images.length > 1 && (
            <div className="thumbnail-row" aria-label="More PulseOps screens">
              {project.images.slice(1, 4).map((image, index) => (
                <button type="button" key={image.src} onClick={() => onOpenImage(project.images, index + 1)} aria-label={`View screenshot ${index + 2}`}>
                  <img src={image.src} alt="" loading="lazy" />
                </button>
              ))}
              <button className="more-images" type="button" onClick={() => onOpenImage(project.images, 4)} aria-label="View remaining screenshots">
                +{project.images.length - 4}<small>more</small>
              </button>
            </div>
          )}
        </div>
      )}

      <div className="project-details">
        <div><span>Problem</span><p>{project.problem}</p></div>
        <div><span>Approach</span><p>{project.approach}</p></div>
        <div><span>Outcome</span><p>{project.outcome}</p></div>
      </div>

      {project.note && <p className="project-note">Technical note: {project.note}</p>}

      <div className="project-footer">
        <ul className="stack-list" aria-label="Technologies used">
          {project.stack.map((item) => <li key={item}>{item}</li>)}
        </ul>
        <div className="project-links">
          {project.demo && <a href={project.demo} target="_blank" rel="noreferrer">Live demo <Icon name="arrow" /></a>}
          <span className="coming-soon" title="Repository will be added when available">Source coming soon</span>
        </div>
      </div>
    </article>
  );
}
