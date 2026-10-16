# Palette's Journal - UX & Accessibility Learnings

## 2025-05-18 - Keyboard Search Shortcuts & Platform Detection
**Learning:** Adding `Cmd+K` / `Ctrl+K` and `/` shortcuts to search modal triggers significantly improves desktop keyboard navigation. Detecting platform synchronously in state initializer prevents `react-hooks/set-state-in-effect` linting errors and hydration/re-render flashes.
**Action:** Always check `document.activeElement` for editable fields before intercepting single-key shortcuts like `/`.
