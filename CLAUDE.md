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

The site is an operations board. **Dark is the authored state** — `:root` carries it —
and light is not that board inverted but a separate design, a printed handover sheet
with its own paper, rules and signal colours. `[data-theme='light']` overrides.

- Style through tokens. Never put a colour's only definition inside `[data-theme]`.
- **Colour means signal, and there are exactly two.** Amber = unresolved, wants a
  person. Lime = decided. Nothing else on the site is allowed to be coloured;
  hover, active nav and list markers are ink, rule or an ink inversion.
- **Editorial emphasis is a width, not a colour.** `h1 em` / `h2 em` drop to
  `font-stretch: var(--display-narrow)` (78%). This replaced a coral italic that
  measured 2.52:1 on cream. If you find yourself reaching for a colour to emphasise
  a heading, use the width axis.
- Each signal is **three tokens**, and the split matters:
  `--signal-fill` / `--signal-on-fill` are **fixed-role** — a bright chip with dark
  ink, identical in both themes, and the primary carrier. `--signal-ink` is
  per-theme, for signal-tinted _text_ on the page ground: amber has to go to a burnt
  `#96590a` on paper to clear 4.5:1, and lime cannot be text on paper at all.
  **Never use a `-fill` value as text**, in either theme.
- `--invert-*` tokens are fixed-role for the same reason: the inverted band is always
  a dark ground with light text. It used to be `background: var(--ink); color:
var(--bg)`, which swapped with the theme and rendered a pale slab with 1.00:1 text.
  **Everything inside `.process-section` takes `--invert-*`, including one level
  down** — `.process-grid span` was on plain `--muted` and measured 2.93:1 on the
  band in light mode.
- `--progress` and `--focus` stay separate tokens because lime only has contrast on
  a dark ground, so it cannot be the progress bar in light mode.
- **`opacity` is not a colour.** Five rules dimmed text with `opacity` between 0.55
  and 0.85; `getComputedStyle(el).color` cannot see that, so they passed every naive
  contrast check while sitting at 2.33:1. If text should be quieter, give it
  `--muted`. Dimming a _disabled_ row is not an exemption either — the reason text on
  a blocked roster row is the most useful thing on it.
- **A signal colour is a fill with its own ink, or it is nothing.** Never lay a
  `color-mix()` of a signal _under_ text that was coloured for a different ground.
  The assigned roster row used `color-mix(--resolved-fill 22%, transparent)`, which
  composites to an olive `#515F3A` on the dark board and put six elements in that row
  at 2.61:1. The lift is neutral now; the lime lives in the chips, which carry their
  own ink.
- **There is no usable text dim on this site.** `--muted` is 5.47:1 in light, so any
  opacity below about 0.9 fails and anything above it is invisible. Rows that go
  inert say so structurally — the chosen row lifts, and the inert rows lose their
  Assign control — not by fading.
- `--line` is a decorative hairline and is deliberately faint (1.2–1.8:1). Anything
  whose border is the **only** boundary of a control takes `--line-interactive`,
  held at ≥3:1 for WCAG 1.4.11.

Worst-case measured ratio across `--bg`, `--surface` and `--surface-raised`:

| token            | dark  | light |
| ---------------- | ----- | ----- |
| `--ink`          | 13.26 | 15.37 |
| `--muted`        | 6.01  | 5.47  |
| `--signal-ink`   | 8.82  | 4.84  |
| `--resolved-ink` | 13.91 | 5.24  |

## Type: three faces, three jobs

- **Bricolage Grotesque** — display only. Variable on weight _and_ width; the width
  axis is the emphasis mechanism (see above).
- **IBM Plex Mono** — every reading. Times, counts, station codes, stats, section
  labels, the status line. If it names or numbers something, it is mono.
- **Source Sans 3** — body copy and nothing else. Its job is to not be noticed.

All three are self-hosted in `public/fonts/`, subsetted to latin + latin-ext.
Two things to know:

- **Bricolage is requested without its `opsz` axis.** With it, the latin subset is
  131kB; without, 78kB. Optical sizing buys nothing here because the display face
  runs at fixed sizes whose tracking is set by hand. If you re-fetch it, keep `opsz`
  out of the request.
- **Only two faces are preloaded** (Bricolage latin, Plex Mono 400 latin) — the
  headline and the status line are what would visibly swap above the fold. Source
  Sans 3 is close enough to the system humanist fallback that its swap does not move
  layout, so it stays off the critical path.

## Material: one idea

A dot matrix, at `--dot-size` (22px), at low opacity. On the dark board it is the
phosphor grid; on paper it is the printer's grain. It appears in exactly three
places — the page ground, section boundaries, and the surface the pointer lights up.
There is no second material. Hard corners, hairline rules, and no soft drop shadows:
the one remaining `box-shadow` is a ring on a lit dot, not a shadow.

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

- **Two motion systems, on purpose.** The ~40 one-shot entrances down the page are
  `[data-reveal]`. Add the attribute; do not add another observer. **GSAP owns the
  hero only**: one timeline where each element arrives because the previous one
  landed, plus a scroll-scrubbed drift nothing else can express. Do not migrate the
  rest of the page to GSAP for consistency's sake.
- **`[data-reveal]` has four paths and all four have to be checked.** Where the
  browser supports `animation-timeline: view()` and motion is allowed, the entrance is
  a scroll timeline and no JavaScript runs at all — `useReveal` feature-detects and
  returns early. The base rule starts elements at `opacity: 0`, which is only safe
  because something always brings them back:

  |                    | motion                | reduced motion                           |
  | ------------------ | --------------------- | ---------------------------------------- |
  | scroll timeline    | CSS `@supports` block | reduced-motion block forces `opacity: 1` |
  | no scroll timeline | `useReveal` observer  | `useReveal` marks all visible at once    |

  The failure mode is a page of invisible text, and it only appears on the
  combination you did not test. If you touch any one of those rules, re-test all
  four.

- **One ambient element: the clock.** There used to be two. The pointer-following
  glow was removed — it said nothing, it could not run for a coarse pointer or under
  reduced motion, and it cost a custom-property write per frame. The clock says
  somebody is in Singapore and what time it is there. The dot matrix stays, static:
  a texture that reacts to the pointer is a texture you keep looking at.
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
