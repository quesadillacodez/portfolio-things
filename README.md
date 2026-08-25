# Hadi Qusyairi Portfolio

A responsive, single-page React portfolio focused on practical software, analytics, and
operational problem solving, with dedicated case study pages for the flagship projects.

Live: <https://portfolio-things-eight.vercel.app/>

## Featured work

- **NETS Pay Together** — Distinction Presentation · XP Rewards Store — [case study](/#/case/nets-pay-together)
- **PulseOps EMS Command Center** — Distinction Presentation — [case study](/#/case/pulseops)
- Global Food Insecurity Dashboard
- FairPrice Shopping Simulation
- Clinic Digitalisation Concept

## Run locally

```bash
npm install
npm run dev
```

## Scripts

| Script            | What it does                                     |
| ----------------- | ------------------------------------------------ |
| `npm run dev`     | Vite dev server with React Fast Refresh          |
| `npm run build`   | Production build into `dist/`                    |
| `npm run preview` | Serve the production build locally               |
| `npm run lint`    | ESLint, including React Hooks and jsx-a11y rules |
| `npm run format`  | Prettier write (`format:check` in CI)            |
| `npm run images`  | Regenerate responsive images from `assets-src/`  |

CI runs lint, format check, and build on every push.

## Structure

A file-by-file map of the repository lives in [`INDEX.md`](INDEX.md).

Project content lives in `src/data/projects.js`, separate from presentation, so adding a
project or a link never means touching component structure. Each project carries:

| field                   | purpose                                                                |
| ----------------------- | ---------------------------------------------------------------------- |
| `label`                 | the presentation a project was submitted for, shown as a chip          |
| `stats`                 | the scannable numbers shown under the case                             |
| `headline` / `footnote` | an outcome figure and the caveat attached to it                        |
| `visual`                | `gallery`, `terminal`, or `flow` — every project has one               |
| `highlight`             | the one feature the project is remembered for                          |
| `walkthrough`           | ordered steps for the auto-advancing replay                            |
| `artifacts`             | process artifacts; hidden while empty                                  |
| `caseStudy`             | long-form content for the `#/case/<slug>` route                        |
| `bleed`                 | opts one card out of the contained grid so its visual runs to the edge |

Motion is centralised: `src/hooks/useReveal.js` drives every scroll reveal from one
`IntersectionObserver`, and `src/hooks/useReducedMotion.js` is threaded into every
animated component so `prefers-reduced-motion` switches off the JavaScript-driven
effects that CSS alone cannot reach.

## Images

`assets-src/` holds one master per screenshot. `npm run images` regenerates
`public/assets/` as AVIF, WebP, and JPEG at 400/800/1200/1600px, and writes
`src/data/images.json` with intrinsic dimensions, which `src/components/Picture.jsx`
turns into a `<picture>` with a full `srcset` and `width`/`height` on every image. The
generated files are committed so deploys do not re-encode them; re-run the script after
replacing or adding a master.

## Accessibility notes

- One `<main>` landmark wraps everything between header and footer, and every section is
  labelled by its own heading.
- A single global `:focus-visible` ring is used everywhere; inverted surfaces override
  the ring colour so it stays visible on dark grounds.
- The screenshot viewer is a native `<dialog>`: Tab is trapped, Escape closes it, focus
  starts on the close button and returns to the control that opened it, and the image can
  be zoomed, panned and swiped on touch.
- The inverted process band uses fixed-role `--invert-*` tokens rather than swapping
  `--ink` and `--bg`, so it cannot invert into an unreadable slab in dark mode.
