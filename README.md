# Hadi Qusyairi Portfolio

A responsive, single-page React portfolio focused on practical software, analytics, and
operational problem solving, with a dedicated case study page for the flagship project.

## Featured work

- PulseOps EMS Command Center — [case study](/#/case/pulseops)
- Global Food Insecurity Dashboard
- FairPrice Shopping Simulation
- Clinic Digitalisation Concept

## Run locally

```bash
pnpm install
pnpm run dev
```

## Production build

```bash
pnpm run build
```

## Structure

Project content lives in `src/data/projects.js`, separate from presentation, so adding a
project or a link never means touching component structure. Each project carries:

| field | purpose |
| --- | --- |
| `stats` | the scannable numbers shown under the case |
| `headline` / `footnote` | an outcome figure and the caveat attached to it |
| `visual` | `gallery`, `terminal`, or `flow` — every project has one |
| `walkthrough` | ordered steps for the auto-advancing replay |
| `artifacts` | process artifacts; hidden while empty |
| `caseStudy` | long-form content for the `#/case/<slug>` route |

Motion is centralised: `src/hooks/useReveal.js` drives every scroll reveal from one
`IntersectionObserver`, and `src/hooks/useReducedMotion.js` is threaded into every
animated component so `prefers-reduced-motion` switches off the JavaScript-driven
effects that CSS alone cannot reach.

## Known gaps

Three things need real assets or information before they are finished:

1. **Portrait.** The hero renders an `HQ` monogram until `public/assets/portrait.jpg`
   exists. Drop the file in and it swaps itself — no code change needed.
2. **Process artifacts.** `artifacts: []` on each project is deliberately empty. Add
   `{ src, label, note }` entries pointing at files in `public/assets/process/` and the
   "messy middle" section appears on the case study page.
3. **Demo URL.** The PulseOps demo still points at a `bit.ly` shortener. Replace
   `demo:` in `src/data/projects.js` with the canonical deployment URL.
