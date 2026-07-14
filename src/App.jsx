import { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProjectCard from './components/ProjectCard';
import ImageModal from './components/ImageModal';
import Icon from './components/Icon';
import { projects } from './data/projects';

const skills = [
  { number: '01', title: 'Languages & web', items: ['Python', 'HTML', 'CSS', 'JavaScript', 'React fundamentals'] },
  { number: '02', title: 'Data & tools', items: ['Tableau Desktop', 'Tableau Prep Builder', 'Excel', 'Data cleaning', 'Statistics'] },
  { number: '03', title: 'Product & domain', items: ['Digital product development', 'Financial analysis fundamentals', 'Workflow design', 'UI/UX awareness', 'Customer experience'] },
];

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [modal, setModal] = useState(null);

  useEffect(() => {
    // Persist the visitor's choice while still rendering a usable light theme by default.
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const openImage = (gallery, index) => setModal({ gallery, index });

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Header theme={theme} onToggleTheme={() => setTheme((value) => value === 'light' ? 'dark' : 'light')} />
      <Hero />

      {/* Project cards share one data-backed structure so claims stay consistent. */}
      <section className="section work-section" id="work">
        <div className="section-intro">
          <p className="section-label">Selected work · 2024 to 2026</p>
          <h2>Projects built around <em>real decisions.</em></h2>
          <p>Each project starts with an operational question, then turns it into software, analysis, or a clearer workflow.</p>
        </div>
        <div className="project-list">
          {projects.map((project) => <ProjectCard key={project.number} project={project} onOpenImage={openImage} />)}
        </div>
      </section>

      <section className="section process-section" id="process">
        <div className="section-intro compact">
          <p className="section-label">How I work</p>
          <h2>From messy process to <em>usable system.</em></h2>
        </div>
        <ol className="process-grid">
          <li><span>01</span><h3>Observe the workflow</h3><p>I map who does what, where information changes hands, and which steps create avoidable waiting or errors.</p></li>
          <li><span>02</span><h3>Model the logic</h3><p>I define the data, rules, edge cases, and success criteria before choosing the interface or visualization.</p></li>
          <li><span>03</span><h3>Build the smallest useful version</h3><p>I connect core actions first, then improve feedback, validation, and readability around actual user tasks.</p></li>
          <li><span>04</span><h3>Test the claim</h3><p>I separate measured outcomes from projections, collect feedback, and document assumptions that still need validation.</p></li>
        </ol>
      </section>

      <section className="section skills-section" id="skills">
        <div className="section-intro compact">
          <p className="section-label">Technical toolkit</p>
          <h2>Skills I use to <em>ship and explain.</em></h2>
        </div>
        <div className="skills-grid">
          {skills.map((group) => (
            <article key={group.number}>
              <span>{group.number}</span>
              <h3>{group.title}</h3>
              <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
          ))}
        </div>
      </section>

      <footer id="contact">
        <div className="footer-top">
          <p className="section-label">Let’s connect</p>
          <h2>Looking for someone who can understand the process <em>and build the tool?</em></h2>
          <a className="button button-primary" href="mailto:hadiqbz@gmail.com">Start a conversation <Icon name="arrow" /></a>
        </div>
        <div className="footer-bottom">
          <p>Hadi Qusyairi · Singapore</p>
          <div>
            <a href="mailto:hadiqbz@gmail.com">Email</a>
            <a href="https://linkedin.com/in/hadi-qusyairi" target="_blank" rel="noreferrer">LinkedIn</a>
            <span title="Profile will be added when available">GitHub soon</span>
            <a href="/Hadi-Qusyairi-Resume.pdf" download>Résumé</a>
          </div>
        </div>
      </footer>

      {modal && <ImageModal gallery={modal.gallery} initialIndex={modal.index} onClose={() => setModal(null)} />}
    </>
  );
}
