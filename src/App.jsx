import { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProjectCard from './components/ProjectCard';
import ImageModal from './components/ImageModal';
import CaseStudy from './components/CaseStudy';
import About from './components/About';
import NotePage from './components/NotePage';
import Colophon from './components/Colophon';
import Notes from './components/Notes';
import ToTop from './components/ToTop';
import RosterDemo from './components/RosterDemo';
import SplitHeading from './components/SplitHeading';
import Icon from './components/Icon';
import { projects, getProject } from './data/projects';
import { site } from './data/site';
import { getNote } from './data/notes';
import { useReveal } from './hooks/useReveal';
import { useReducedMotion } from './hooks/useReducedMotion';
import { useHashRoute } from './hooks/useHashRoute';
import { usePointerGlow } from './hooks/usePointerGlow';

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

const SITE_URL = 'https://portfolio-things-eight.vercel.app/';
const HOME_TITLE = 'Hadi Qusyairi | FinTech & Data Builder';
const HOME_DESCRIPTION =
  'Digital Business and FinTech student in Singapore. EMS workforce command center, a NETS loyalty engine, and analytics built around real operational decisions.';

export default function App() {
  // Item 46: this used to fall back to 'light', so a visitor whose OS is set to dark
  // got a cream site no matter what — prefers-color-scheme was never consulted. The
  // inline bootstrap in index.html has already stamped the right value before paint;
  // read it back rather than recomputing and risking a mismatch.
  const [theme, setTheme] = useState(
    () =>
      localStorage.getItem('theme') ||
      document.documentElement.dataset.theme ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),
  );
  const [modal, setModal] = useState(null);
  const reducedMotion = useReducedMotion();
  const route = useHashRoute();

  // Applying the theme and *persisting* it are deliberately separate. Writing to
  // localStorage here would stamp the OS-derived value on first render, which would
  // make the visitor look like they had chosen it and freeze the preference below.
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  // Item 46 continued: if the visitor has never pressed the toggle, follow their OS
  // when it changes rather than freezing whatever it was at first load.
  useEffect(() => {
    if (localStorage.getItem('theme')) return undefined;
    const query = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (event) => setTheme(event.matches ? 'dark' : 'light');
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  // Item 08: one observer wakes every `data-reveal` element anywhere on the page.
  useReveal(reducedMotion);

  // Items 03 + 14 (round two): the one ambient element the site commits to.
  usePointerGlow(reducedMotion);

  // A hash route is a same-document navigation, so the browser keeps the scroll
  // position it had on the index — which drops the reader into the middle of a note.
  // Entering a page route starts it at the top; leaving one lets the browser restore.
  useEffect(() => {
    if (route) window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [route]);

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

  const caseProject = route?.kind === 'case' ? getProject(route.slug) : null;
  const note = route?.kind === 'note' ? getNote(route.slug) : null;

  // Pressing the toggle is the only thing that counts as an explicit choice, and the
  // only thing that writes localStorage.
  const toggleTheme = () =>
    setTheme((value) => {
      const next = value === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', next);
      return next;
    });

  const header = <Header theme={theme} onToggleTheme={toggleTheme} />;

  const lightbox = modal && (
    <ImageModal
      gallery={modal.gallery}
      initialIndex={modal.index}
      originRect={modal.originRect}
      reducedMotion={reducedMotion}
      onClose={() => setModal(null)}
    />
  );

  // Item 48: every page route shared as the homepage — the title and OG tags never
  // moved off the root, so pasting a case study or a note into Slack produced the
  // index card. They now follow the route and restore on the way back.
  useEffect(() => {
    const set = (selector, value) => {
      const tag = document.head.querySelector(selector);
      if (tag) tag.setAttribute('content', value);
    };
    const apply = (title, description, path) => {
      const url = `${SITE_URL}${path}`;
      document.title = title;
      set('meta[property="og:title"]', title);
      set('meta[name="twitter:title"]', title);
      set('meta[property="og:description"]', description);
      set('meta[name="twitter:description"]', description);
      set('meta[name="description"]', description);
      set('meta[property="og:url"]', url);
      document.querySelector('link[rel="canonical"]')?.setAttribute('href', url);
    };

    if (caseProject?.caseStudy) {
      apply(
        `${caseProject.title} — case study | Hadi Qusyairi`,
        caseProject.summary,
        `#/case/${caseProject.slug}`,
      );
    } else if (note) {
      apply(`${note.title} | Hadi Qusyairi`, note.dek, `#/note/${note.slug}`);
    } else if (route?.kind === 'colophon') {
      apply(
        'Colophon | Hadi Qusyairi',
        'How this site is built — the type, the tokens, the pipeline and the decisions behind them.',
        '#/colophon',
      );
    } else {
      apply(HOME_TITLE, HOME_DESCRIPTION, '');
    }
  }, [route, caseProject, note]);

  // Item 17: the case study is a route of its own rather than a longer card.
  // Round two: notes (item 17) and the colophon (item 22) are routes too.
  const page =
    (caseProject?.caseStudy && (
      <CaseStudy project={caseProject} onOpenImage={openImage} reducedMotion={reducedMotion} />
    )) ||
    (note && <NotePage note={note} />) ||
    (route?.kind === 'colophon' && <Colophon />) ||
    null;

  if (page) {
    return (
      <>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        {header}
        <main id="main-content">{page}</main>
        <ToTop reducedMotion={reducedMotion} />
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
        {/* The hero shot is a crop of the PulseOps roster, so enlarging it opens that
            project's gallery rather than whichever project happens to be first. */}
        <Hero
          reducedMotion={reducedMotion}
          onOpenProof={() => openImage(getProject('pulseops').visual.images, 1, null)}
        />

        {/* Item 09 (round two): this was at screen six of fifteen, below three project
            cards and ~6,000px of scroll, so most visitors never reached the one thing on
            the site worth touching. It is now the first thing under the hero.

            Item 25 — breaking the rhythm, first of two.
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
              Five of them. Two got a full case study because the decisions were worth writing down; the
              others are here because they are true, not because they are impressive.
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

        <About />

        <section className="section process-section" id="process" aria-labelledby="process-title">
          <div className="section-intro compact">
            <p className="section-label" data-reveal>
              How I work — when it goes well
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
            <span className="footer-konami" title="Try it on this page.">
              ↑ ↑ ↓ ↓ ← → ← → B A
            </span>
          </p>
          <div>
            {/* Item 16, third hover exception: this one tells you the address. */}
            <a className="email-link" href={`mailto:${site.email}`}>
              <span className="email-label">Email</span>
              <span className="email-real" aria-hidden="true">
                {site.email}
              </span>
            </a>
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
            {/* Item 22 */}
            <a href="#/colophon">Colophon</a>
            {/* Item 21: the 404 page has the best line on the site and lived at a URL
                nobody visits on purpose. Now it is reachable. */}
            <a href="/404.html">Lost?</a>
          </div>
        </div>
      </footer>

      <ToTop reducedMotion={reducedMotion} />
      {lightbox}
    </>
  );
}
