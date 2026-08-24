import { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProjectCard from './components/ProjectCard';
import ImageModal from './components/ImageModal';
import CaseStudy from './components/CaseStudy';
import About from './components/About';
import Notes from './components/Notes';
import RosterDemo from './components/RosterDemo';
import SplitHeading from './components/SplitHeading';
import Icon from './components/Icon';
import { projects, getProject } from './data/projects';
import { site } from './data/site';
import { useReveal } from './hooks/useReveal';
import { useReducedMotion } from './hooks/useReducedMotion';
import { useHashRoute } from './hooks/useHashRoute';

const skills = [
  {
    number: '01',
    title: 'Languages & web',
    items: ['Python', 'HTML', 'CSS', 'JavaScript', 'React fundamentals'],
  },
  {
    number: '02',
    title: 'Data & tools',
    items: ['Tableau Desktop', 'Tableau Prep Builder', 'Excel', 'Data cleaning', 'Statistics'],
  },
  {
    number: '03',
    title: 'Product & domain',
    items: [
      'Digital product development',
      'Financial analysis fundamentals',
      'Workflow design',
      'UI/UX awareness',
      'Customer experience',
    ],
  },
];

const process = [
  {
    n: '01',
    title: 'Observe the workflow',
    body: 'I map who does what, where information changes hands, and which steps create avoidable waiting or errors.',
  },
  {
    n: '02',
    title: 'Model the logic',
    body: 'I define the data, rules, edge cases, and success criteria before choosing the interface or visualization.',
  },
  {
    n: '03',
    title: 'Build the smallest useful version',
    body: 'I connect core actions first, then improve feedback, validation, and readability around actual user tasks.',
  },
  {
    n: '04',
    title: 'Test the claim',
    body: 'I separate measured outcomes from projections, collect feedback, and document assumptions that still need validation.',
  },
];

const KONAMI = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [modal, setModal] = useState(null);
  const reducedMotion = useReducedMotion();
  const route = useHashRoute();

  useEffect(() => {
    // Persist the visitor's choice while still rendering a usable light theme by default.
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Item 08: one observer wakes every `data-reveal` element anywhere on the page.
  useReveal(reducedMotion);

  // Item 34: for whoever opens devtools, and for whoever still remembers the code.
  useEffect(() => {
    console.log(
      '%cHQ.',
      'font: 600 22px/1 system-ui; color:#101f20; background:#d9ff53; padding:6px 10px;',
      '\nBuilt with React and no framework I did not need.\nLooking for the grid? ↑ ↑ ↓ ↓ ← → ← → B A',
    );

    let progress = 0;
    const onKeyDown = (event) => {
      progress = event.key.toLowerCase() === KONAMI[progress].toLowerCase() ? progress + 1 : 0;
      if (progress === KONAMI.length) {
        progress = 0;
        const root = document.documentElement;
        root.dataset.grid = root.dataset.grid === 'on' ? 'off' : 'on';
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  // Item 12: the origin rect travels with the request so the modal can FLIP from
  // whatever was clicked.
  const openImage = (gallery, index, originRect) => setModal({ gallery, index, originRect });

  const caseProject = route ? getProject(route) : null;

  const header = (
    <Header theme={theme} onToggleTheme={() => setTheme((value) => (value === 'light' ? 'dark' : 'light'))} />
  );

  const lightbox = modal && (
    <ImageModal
      gallery={modal.gallery}
      initialIndex={modal.index}
      originRect={modal.originRect}
      reducedMotion={reducedMotion}
      onClose={() => setModal(null)}
    />
  );

  // Item 17: the case study is a route of its own rather than a longer card.
  if (caseProject?.caseStudy) {
    return (
      <>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        {header}
        <main id="main-content">
          <CaseStudy project={caseProject} onOpenImage={openImage} reducedMotion={reducedMotion} />
        </main>
        {lightbox}
      </>
    );
  }

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      {header}

      <main id="main-content">
        <Hero
          reducedMotion={reducedMotion}
          onOpenProof={() => openImage(projects[0].visual.images, 0, null)}
        />

        <About />

        {/* Project cards share one data-backed structure so claims stay consistent. */}
        <section className="section work-section" id="work" aria-labelledby="work-title">
          <div className="section-intro">
            <p className="section-label" data-reveal>
              Selected work · 2024 to 2026
            </p>
            <SplitHeading
              id="work-title"
              text="Projects built around"
              emphasis="real decisions."
              reducedMotion={reducedMotion}
            />
            <p data-reveal>
              Each project starts with an operational question, then turns it into software, analysis, or a
              clearer workflow.
            </p>
          </div>
          <div className="project-list">
            {projects.map((project) => (
              <ProjectCard
                key={project.number}
                project={project}
                onOpenImage={openImage}
                reducedMotion={reducedMotion}
              />
            ))}
          </div>
        </section>

        {/* Item 25 — breaking the rhythm, first of two.
            Every section used to open with the same eyebrow-plus-enormous-heading block,
            four times running. This one is a full-bleed interactive band instead: no
            giant heading, no left-aligned intro, and the reader does something rather
            than reads something. It is also where the signature moment (item 15) lands
            on the index page. */}
        <section className="section demo-section" id="try" aria-labelledby="try-heading">
          <div className="demo-inner" data-reveal>
            <div className="demo-copy">
              <p className="section-label">Rather than tell you</p>
              <h2 id="try-heading">The decision my software exists to&nbsp;support.</h2>
              <p>
                Every project on this site started as somebody&rsquo;s awkward Tuesday. This is one of them,
                rebuilt small enough to play with in your browser.
              </p>
            </div>
            <RosterDemo />
          </div>
        </section>

        <section className="section process-section" id="process" aria-labelledby="process-title">
          <div className="section-intro compact">
            <p className="section-label" data-reveal>
              How I work
            </p>
            <SplitHeading
              id="process-title"
              text="From messy process to"
              emphasis="usable system."
              reducedMotion={reducedMotion}
            />
          </div>
          <ol className="process-grid">
            {process.map((step) => (
              <li key={step.n} data-reveal>
                <span className="numeric">{step.n}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <Notes />

        {/* Item 25 — breaking the rhythm, second of two.
            The skills section keeps its content but drops the giant heading in favour of
            a quiet two-column layout, so the run of enormous type is interrupted rather
            than continued a fourth time. */}
        <section className="section skills-section" id="skills" aria-labelledby="skills-title">
          <div className="skills-shell">
            <div className="skills-aside" data-reveal>
              <p className="section-label">Technical toolkit</p>
              <h2 id="skills-title">
                Skills I use to <em>ship and explain.</em>
              </h2>
              <p className="skills-note">
                Grouped by what they are for rather than by how well I know them — the second list is the one
                worth talking about in person.
              </p>
            </div>
            <div className="skills-grid">
              {skills.map((group) => (
                <article key={group.number} data-reveal>
                  <span className="numeric">{group.number}</span>
                  <h3>{group.title}</h3>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer id="contact">
        <div className="footer-top">
          <p className="section-label" data-reveal>
            Let’s connect
          </p>
          <SplitHeading
            text="Looking for someone who can understand the process"
            emphasis="and build the tool?"
            reducedMotion={reducedMotion}
          />
          <a className="button button-primary" href="mailto:hadiqbz@gmail.com" data-reveal>
            Start a conversation <Icon name="arrow" />
          </a>
        </div>
        <div className="footer-bottom">
          {/* Item 18: freshness is a trust signal the site was giving away. */}
          <p>
            Hadi Qusyairi · Singapore
            <span className="footer-stamp">Last updated {site.lastUpdated}</span>
          </p>
          <div>
            <a href="mailto:hadiqbz@gmail.com">Email</a>
            <a href="https://linkedin.com/in/hadi-qusyairi" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            {/* Item 20: was a non-clickable span reading "GitHub soon". */}
            <a href="https://github.com/quesadillacodez" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href="/Hadi-Qusyairi-Resume.pdf" download>
              Résumé
            </a>
          </div>
        </div>
      </footer>

      {lightbox}
    </>
  );
}
