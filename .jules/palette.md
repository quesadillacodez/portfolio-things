# Palette's Journal

## 2026-10-06 - Global Keyboard Shortcut for Utility Dialogs
**Learning:** Native `<dialog>` elements handle focus trap and Escape key natively, but adding `Cmd+K` / `Ctrl+K` keyboard shortcuts with proper `aria-keyshortcuts` attributes provides keyboard-first navigation for power users.
**Action:** Always include `aria-keyshortcuts` on trigger elements when registering global keydown handlers for search or command palettes.
