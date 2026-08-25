# Repository index

A map of what lives where, and which file to open for a given change.

This file is navigational only. [`README.md`](README.md) covers what the site is and how to run
it; [`CLAUDE.md`](CLAUDE.md) covers the conventions and the mistakes already made and fixed. Where
they disagree with this file, they win — this is the table of contents, not the rulebook.

## Layout

```
portfolio-things/
├── .github/workflows/ci.yml   lint + format:check + build, on every push
├── assets-src/                13 image masters — the only place photos are hand-added
├── public/                    copied verbatim into dist/
│   ├── assets/                144 generated files — pipeline output only, never hand-placed
│   ├── fonts/                 6 subset woff2 + fonts.css
│   ├── 404.html               SPA fallback
│   ├── Hadi-Qusyairi-Resume.pdf
│   ├── og-card.png            social card
│   └── favicon.*, robots.txt, sitemap.xml, site.webmanifest
├── scripts/optimize-images.mjs   the image pipeline (`npm run images`)
├── src/
│   ├── components/            19 components
│   ├── data/                  4 files — content lives here, not in components
│   ├── hooks/                 4 hooks
│   ├── App.jsx                route switch, <main>, scroll reset
│   ├── main.jsx               React root
│   └── styles.css             3,112 lines — all styling, token-driven
├── index.html                 shell, font preloads, meta
├── vercel.json                cache + security headers
└── vite.config.js
```

## Components

| File                 | What it is                                                           |
| -------------------- | -------------------------------------------------------------------- |
| `About.jsx`          | The About section on the index                                       |
| `CaseStudy.jsx`      | The long-form `#/case/<slug>` page                                   |
| `Colophon.jsx`       | The `#/colophon` page — what the site is built from and why          |
| `CopyLink.jsx`       | Copy-permalink button used on case and note pages                    |
| `FlowVisual.jsx`     | Before/after workflow map — the Clinic project's visual              |
| `Header.jsx`         | Sticky header and scroll progress bar                                |
| `Hero.jsx`           | Split heading, portrait slot, local clock                            |
| `Icon.jsx`           | The inline SVG icon set — every icon on the site                     |
| `ImageModal.jsx`     | Lightbox: a native `<dialog>` with `showModal()`, plus swipe         |
| `NotePage.jsx`       | The `#/note/<slug>` page                                             |
| `Notes.jsx`          | The notes index section                                              |
| `Picture.jsx`        | Responsive `<picture>`; reads intrinsic size from the manifest       |
| `ProjectCard.jsx`    | One project on the index; dispatches to that project's `visual`      |
| `RosterDemo.jsx`     | The playable roster-conflict demo — the site's signature interaction |
| `SplitHeading.jsx`   | Splits headings into words for staggered entry                       |
| `TerminalVisual.jsx` | Replays the FairPrice program flow                                   |
| `TiltFrame.jsx`      | Pointer-tracking tilt and the contextual cursor label                |
| `ToTop.jsx`          | Back-to-top control, after the first screen                          |
| `Walkthrough.jsx`    | Auto-advancing screen replay (`DWELL`, 6500ms)                       |

## Hooks

| File                  | What it does                                                           |
| --------------------- | ---------------------------------------------------------------------- |
| `useHashRoute.js`     | Returns `{ kind, slug }` or `null`; wraps changes in a view transition |
| `usePointerGlow.js`   | The ambient grid glow; opts out on coarse pointers and reduced motion  |
| `useReducedMotion.js` | Live `prefers-reduced-motion`; threaded into every animated component  |
| `useReveal.js`        | One shared `IntersectionObserver` for every `[data-reveal]` element    |

## Data

| File          | Contents                                                         |
| ------------- | ---------------------------------------------------------------- |
| `projects.js` | 5 projects — the source of truth for every project and link      |
| `notes.js`    | 3 notes: `cpf-edge-cases`, `first-roster-ui`, `rewards-loophole` |
| `site.js`     | Email, LinkedIn, GitHub, `lastUpdated`, `timeZone`               |
| `images.json` | **Generated.** Written by `npm run images`; never edit by hand   |

## Routes

Handled by `useHashRoute`. Plain fragments like `#work` stay ordinary in-page anchors.

| Route           | Renders     | Slugs                                                                                        |
| --------------- | ----------- | -------------------------------------------------------------------------------------------- |
| `#/case/<slug>` | `CaseStudy` | `nets-pay-together`, `pulseops`, `food-insecurity`, `fairprice-sim`, `clinic-digitalisation` |
| `#/note/<slug>` | `NotePage`  | `cpf-edge-cases`, `first-roster-ui`, `rewards-loophole`                                      |
| `#/colophon`    | `Colophon`  | —                                                                                            |

## Design tokens

All defined in `src/styles.css`. Style through these; never define a colour only inside
`[data-theme]`.

| Group             | Tokens                                                                           |
| ----------------- | -------------------------------------------------------------------------------- |
| Surface and ink   | `--bg` `--surface` `--surface-raised` `--ink` `--muted` `--line` `--line-strong` |
| Accent            | `--accent` `--accent-ink` `--coral` `--coral-display`                            |
| Inverted band     | `--invert-bg` `--invert-ink` `--invert-line` `--invert-muted`                    |
| Contrast-specific | `--progress` `--focus`                                                           |
| Type              | `--display` `--sans` `--mono`                                                    |
| Motion and misc   | `--ease` `--header` `--glow-line` `--glow-radius` `--shot-brightness`            |

The `--invert-*` set is fixed-role: that band stays a dark ground with light text in both
themes. `--coral` is the accessible label colour; `--coral-display` is headline-only.
`--progress` and `--focus` are separate because the lime accent only has contrast on dark.

## Where to change what

| To change…                     | Open                                                      |
| ------------------------------ | --------------------------------------------------------- |
| A project, its links or stats  | `src/data/projects.js`                                    |
| Case study prose               | `src/data/projects.js` → the project's `caseStudy`        |
| A note                         | `src/data/notes.js`                                       |
| Email, socials, "last updated" | `src/data/site.js`                                        |
| Any colour, spacing or type    | `src/styles.css` (tokens first)                           |
| Add or replace an image        | Drop the master in `assets-src/`, run `npm run images`    |
| Add an icon                    | `src/components/Icon.jsx`                                 |
| Add a route                    | `src/hooks/useHashRoute.js` + the switch in `src/App.jsx` |
| Walkthrough timing             | `Walkthrough.jsx` **and** the `dwell` duration in the CSS |
| Cache or security headers      | `vercel.json`                                             |

## Toolchain

Node 22 (`.nvmrc`). React 19 and Vite only — no framework, no router, no CSS library.
`sharp` powers the image pipeline and is a dev dependency.

| Command                | Does                                          |
| ---------------------- | --------------------------------------------- |
| `npm run dev`          | Vite dev server                               |
| `npm run build`        | Production build to `dist/`                   |
| `npm run preview`      | Serve `dist/`                                 |
| `npm run lint`         | ESLint, including `jsx-a11y`                  |
| `npm run format:check` | Prettier (`npm run format` writes)            |
| `npm run images`       | Regenerate `public/assets/` and `images.json` |

CI runs lint, format:check and build on every push. Deploys to Vercel as static files.
