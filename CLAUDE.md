# CLAUDE.md

Notes for anyone — human or agent — working on this repo. Read this before editing;
several of the conventions here exist because the obvious approach was tried and
broke something.

## What this is

A single-page React portfolio for Hadi Qusyairi, plus hash-routed case study, note
and colophon pages. No framework beyond React and Vite. It deploys as static files.

```bash
npm install
npm run dev            # local dev
npm run build          # production build to dist/
npm run preview        # serve dist/
npm run lint           # eslint, including jsx-a11y
npm run format:check   # prettier
npm run images         # regenerate responsive images from assets-src/
```

CI runs lint, format:check and build on every push. Keep all three green.

## Content lives in data, not components

`src/data/projects.js` is the single source of truth for every project. Adding a
project or changing a link should never require touching a component. Fields:

| field                   | purpose                                                              |
| ----------------------- | -------------------------------------------------------------------- |
| `stats`                 | scannable numbers under the case                                     |
| `headline` / `footnote` | an outcome figure, and the caveat attached to it                     |
| `visual`                | `gallery`, `terminal`, or `flow` — every project has one             |
| `walkthrough`           | ordered steps for the auto-advancing replay                          |
| `highlight`             | the one feature a project is remembered for                          |
| `bleed`                 | opts the card out of the contained grid. Exactly one project sets it |
| `artifacts`             | process artifacts; the section hides itself while empty              |
| `caseStudy`             | long-form content for the `#/case/<slug>` route                      |

## Images go through the pipeline, never raw

Masters live in `assets-src/`. `npm run images` writes AVIF/WebP/JPEG at five widths
into `public/assets/` plus a manifest at `src/data/images.json`.

Components reference images by **key**, not path, and render through `Picture`:

```jsx
<Picture name="pulseops-roster" alt="…" sizes="(min-width: 1050px) 45vw, 92vw" />
```

`Picture` takes intrinsic width/height from the manifest, which is what keeps CLS at
zero. Two things to know:

- **Always pass `sizes`.** Get it wrong and the browser picks a badly sized file.
- **`full` exists for the lightbox.** Responsive selection is exactly wrong when
  zooming: with `sizes="100vw"` a 390px phone is served the 400px file, so zoom had
  nothing to magnify. `full` drops srcset and loads the widest variant outright.

## Theming: three states, not two

The site supports light, dark, and an inverted band that must stay dark in both.

- Style through tokens. Never put a colour's only definition inside `[data-theme]`.
- `--invert-*` tokens are **fixed-role**: the inverted band is always a dark ground
  with light text. This exists because it used to be `background: var(--ink);
color: var(--bg)`, which swapped with the theme and rendered a cream slab with
  1.00:1 text in dark mode.
- `--coral` is the accessible label colour (4.5:1 on cream); `--coral-display` is the
  brand colour for headline-sized text. Small text takes `--coral`, always.
- `--progress` and `--focus` are separate tokens for the same reason: the lime accent
  only has contrast on a dark ground, so it cannot be the progress bar in light mode.

## Routes

`useHashRoute` returns `{ kind, slug }` for three page routes and `null` for the
index. Plain fragments like `#work` stay ordinary in-page anchors.

| route           | renders     | data             |
| --------------- | ----------- | ---------------- |
| `#/case/<slug>` | `CaseStudy` | `projects.js`    |
| `#/note/<slug>` | `NotePage`  | `notes.js`       |
| `#/colophon`    | `Colophon`  | in the component |

Two things that bit already:

- **Entering a route must reset scroll.** A hash route is a same-document navigation,
  so the browser keeps the index's scroll position. Clicking a note from the notes
  section dropped the reader into the middle of the article. `App.jsx` scrolls to top
  whenever `route` becomes non-null.
- **Route changes go through `startViewTransition`** with `flushSync`, so React
  commits inside the transition. Browsers without it take the plain path.

## Motion

Every animation is gated twice — once in CSS via `prefers-reduced-motion`, and once in
JavaScript via `useReducedMotion`. CSS alone cannot switch off a `setTimeout`, so any
new JS-driven motion must take the hook and honour it.

- **Two motion systems, on purpose.** `useReveal` runs one shared
  `IntersectionObserver` for every `[data-reveal]` element — the ~40 one-shot entrances
  down the page, where there is nothing to orchestrate. Add the attribute; do not add
  another observer. **GSAP owns the hero only**: one timeline where each element
  arrives because the previous one landed, plus a scroll-scrubbed drift an observer
  cannot express. Do not migrate the rest of the page to GSAP for consistency's sake —
  the observer is cheaper and already correct.
- **GSAP is a dynamic import.** `src/motion/heroTimeline.js` is loaded by
  `useHeroMotion` at runtime. Statically it put 48kB gzipped in front of first paint,
  a 58% bundle increase; deferred it costs 0.8kB on the critical path.
  That defer creates one trap: `gsap.from()` only sets its start state when the
  timeline is built, so a deferred import would paint the hero visible and then snap it
  backwards. `useHeroMotion` hides the targets in a **layout** effect (before paint),
  and guarantees they come back via three routes — reduced motion never hides them at
  all, a 700ms timeout reveals them if the chunk is slow, and a failed import reveals
  them too. If you touch that hook, keep all three.
- **`nav` is not a safe selector here.** The header's rules were once written as bare
  `nav { display: none }` / `nav { display: flex }`, which reached into the hero
  contents list — squeezing it into one grid cell on desktop and hiding it entirely
  below 700px. Header rules are scoped `.site-header nav`. Keep component internals
  behind a class.
- `usePointerGlow` is the site's one ambient element: the 80px grid lights up around
  the pointer. It writes two custom properties per animation frame and refuses to run
  for a coarse pointer or under reduced motion, so the CSS is guarded on
  `:root[data-glow='on']` and needs no fallback.
- `SplitHeading` splits headings into words for staggered entry. The spaces between
  words are **real text nodes**, not CSS generated content — `::after { content: ' ' }`
  renders visually but is invisible to `innerText`, so the heading copied and was
  announced as `Iturnoperationalfriction`.
- If you change `DWELL` in `Walkthrough.jsx`, change the `dwell` animation duration in
  `styles.css` to match, or the progress bar fills early and then waits.

## Gotchas that have already cost time

- **`aspect-ratio` needs `height: auto`.** The `width`/`height` HTML attributes are
  presentational hints that make height definite, which silently makes `aspect-ratio`
  a no-op.
- **The lightbox is a native `<dialog>` with `showModal()`.** That is what traps focus
  and paints the backdrop. Do not replace it with a div.
- **`<main>` lives in `App.jsx`**, wrapping everything between header and footer. It
  used to live inside `Hero` and covered 7% of the page, which made the skip link
  useless.

## Known gaps

- **The portraits are in.** `assets-src/portrait.png` is the headshot shown at rest;
  `assets-src/portrait-fun.png` is the snow photo revealed on hover and focus. Both go
  through `npm run images` like every other image, and the hero reads them by manifest
  key. If either master is removed the slot falls back to the `HQ` monogram with no
  network request, because presence is read from `images.json` rather than caught with
  `onError`.

  Photos belong in `assets-src/`, **never** hand-placed in `public/assets/`.
  `npm run images` starts with `rm -rf public/assets`, so anything dropped there is
  deleted on the next image rebuild. Only pipeline output lives in that folder.

  A phone HEIC will not decode with sharp — iPhone files carry more references than
  libheif's default 16-reference ceiling allows, and `.heic` is not a web format
  anyway. Convert to PNG first, then treat it as a normal master.

- `artifacts: []` is empty on every project by design. These are real process
  artifacts (whiteboards, rejected layouts) and must not be invented.
- Three of five projects have no demo or source link.
