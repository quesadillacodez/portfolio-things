# CLAUDE.md

Notes for anyone — human or agent — working on this repo. Read this before editing;
several of the conventions here exist because the obvious approach was tried and
broke something.

## What this is

A single-page React portfolio for Hadi Qusyairi, plus hash-routed case study pages.
No framework beyond React and Vite. It deploys as static files.

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

## Motion

Every animation is gated twice — once in CSS via `prefers-reduced-motion`, and once in
JavaScript via `useReducedMotion`. CSS alone cannot switch off a `setTimeout`, so any
new JS-driven motion must take the hook and honour it.

- `useReveal` runs one shared `IntersectionObserver` for every `[data-reveal]`
  element. Add the attribute; do not add another observer.
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

- `public/assets/portrait.jpg` does not exist yet. The hero renders an `HQ` monogram
  and swaps itself for the photo the moment the file is added — no code change.
- `artifacts: []` is empty on every project by design. These are real process
  artifacts (whiteboards, rejected layouts) and must not be invented.
- Three of five projects have no demo or source link.
