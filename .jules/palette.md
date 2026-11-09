# Palette's Journal

## 2026-03-30 - Search Dialog Keyboard Shortcut & Focus Retention Pattern

**Learning:** Native `<dialog>` elements triggered from non-modal buttons need explicit focus return to their opener upon closing (`toggleButton.current?.focus()`), as well as discoverable shortcut hints (`<kbd>` with `aria-hidden="true"`) paired with semantic `aria-keyshortcuts` and `aria-haspopup="dialog"`.
**Action:** When adding modal search or utility drawers, ensure keyboard shortcuts (`Cmd+K`/`Ctrl+K`) toggle the dialog gracefully, input autofocuses, and focus smoothly returns to the trigger on dialog exit.
