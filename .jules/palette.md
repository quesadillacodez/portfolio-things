## 2026-03-30 - Search Dialog Keyboard Shortcuts and Empty State Guidance

**Learning:** In portfolio search dialogs, leaving the result area blank upon typing an unmatched query creates ambiguity about whether the search stalled or found no results. Adding an explicit `role="status"` empty state along with global `Cmd+K`/`Ctrl+K` shortcuts and clear shortcut hints provides immediate feedback and matches user mental models.
**Action:** Always pair in-page search dialogs with an explicit empty state message and `aria-keyshortcuts` documentation on the trigger.
