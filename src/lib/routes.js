import { projects } from '../data/projects.js';
import { notes } from '../data/notes.js';

export const siteUrl = 'https://portfolio-things-eight.vercel.app';
export const pages = [
  {
    path: '/',
    kind: 'home',
    title: 'Hadi Qusyairi | FinTech & Data Builder',
    description:
      'Digital Business and FinTech student in Singapore. Operational software, loyalty systems, and analytics built around real decisions.',
  },
  ...projects
    .filter((project) => project.caseStudy)
    .map((project) => ({
      path: `/case/${project.slug}`,
      kind: 'case',
      slug: project.slug,
      title: `${project.title} — case study | Hadi Qusyairi`,
      description: project.summary,
    })),
  ...notes.map((note) => ({
    path: `/note/${note.slug}`,
    kind: 'note',
    slug: note.slug,
    title: `${note.title} | Hadi Qusyairi`,
    description: note.dek,
  })),
  {
    path: '/colophon',
    kind: 'colophon',
    title: 'Colophon | Hadi Qusyairi',
    description: 'The type, tokens, image pipeline and decisions behind this portfolio.',
  },
  {
    path: '/privacy',
    kind: 'privacy',
    title: 'Privacy | Hadi Qusyairi',
    description: 'How this portfolio handles preferences, optional analytics, and contact information.',
  },
  {
    path: '/terms',
    kind: 'terms',
    title: 'Terms | Hadi Qusyairi',
    description: 'Using this portfolio, its project examples, and linked resources.',
  },
  {
    path: '/thank-you',
    kind: 'thank-you',
    title: 'Your email draft | Hadi Qusyairi',
    description: 'Finish sending your message in your email app.',
    noindex: true,
  },
];

export function resolveRoute(pathname, hash = '') {
  const path = (hash.startsWith('#/') ? hash.slice(1) : pathname).replace(/\/$/, '') || '/';
  if (path === '/' || path === '/index.html') return null;
  const page = pages.find((entry) => entry.path === path);
  return (
    page || {
      kind: 'missing',
      slug: path,
      path,
      title: 'Not found | Hadi Qusyairi',
      description: 'No page at this address.',
      noindex: true,
    }
  );
}
