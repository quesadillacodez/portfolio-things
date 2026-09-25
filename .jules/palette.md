# Palette's Journal - UX & Accessibility Learnings

## 2026-09-25 - Global Keyboard Shortcuts for Search Triggers

**Learning:** Adding a global keyboard shortcut (`Cmd+K`/`Ctrl+K` or `/`) to modal search dialogs significantly improves keyboard efficiency for power users. Pairing the event listener with `aria-keyshortcuts` on the trigger button and an `aria-hidden="true"` `<kbd>` visual badge ensures both screen readers and visual users discover the functionality without cluttering speech outputs.
**Action:** Always check if global search or utility triggers have corresponding keyboard shortcuts and convey them clearly with `aria-keyshortcuts` and semantic `<kbd>` badges.
