import Icon from './Icon';

export default function Hero() {
  return (
    <main id="main-content">
      <section className="hero" id="top">
        <div className="hero-kicker reveal">Singapore · Open to internships</div>
        <h1 className="reveal reveal-delay-1">I turn operational friction into <em>clear digital tools.</em></h1>
        <div className="hero-bottom reveal reveal-delay-2">
          <p>
            I’m Hadi Qusyairi, a Digital Business and FinTech student building practical software and analytics tools, informed by hands-on experience in retail, logistics, and service operations.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#work">Explore my work <Icon name="arrow" /></a>
            <a className="button button-quiet" href="/Hadi-Qusyairi-Resume.pdf" download>Résumé <Icon name="download" /></a>
          </div>
        </div>
        <div className="hero-index reveal reveal-delay-3" aria-label="Key disciplines">
          <span>01 Product thinking</span>
          <span>02 Data analysis</span>
          <span>03 Operational design</span>
        </div>
      </section>
    </main>
  );
}
