# Hadi Qusyairi — Portfolio

A responsive, single-page React portfolio focused on practical software, analytics, and
operational problem solving.

Live: <https://portfolio-things-eight.vercel.app/>

## Featured work

- **NETS Pay Together** — mobile banking prototype; XP Rewards Store (Distinction Presentation)
- **PulseOps EMS Command Center** — EMS workforce operations (Distinction Presentation)
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

## Content

Project content lives in `src/data/projects.js`, separate from presentation, so copy and
links can change without touching component structure.

## Images

`assets-src/` holds one master per screenshot. `npm run images` regenerates
`public/assets/` as AVIF, WebP, and JPEG at 400/800/1200/1600px, and writes
`src/data/images.json` with intrinsic dimensions so every `<img>` reserves the right space
before it loads. The generated files are committed so deploys do not need to re-encode
them; re-run the script after replacing or adding a master.

## Accessibility notes

- One `<main>` landmark wraps everything between header and footer, and each section is
  labelled by its heading.
- A single global `:focus-visible` ring is used everywhere; inverted surfaces override the
  ring colour so it stays visible on dark grounds.
- The screenshot viewer is a native `<dialog>`, so Tab is trapped, Escape closes, and focus
  returns to the control that opened it.
