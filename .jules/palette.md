## 2025-05-18 - Global Keyboard Shortcuts for Search Dialogs
**Learning:** Adding a global `Cmd+K`/`Ctrl+K` shortcut listener to a modal search component vastly improves keyboard accessibility and quick site-wide navigation without cluttering the screen. Paired with a `<kbd>` indicator and an explicit `aria-label`, users gain both visual and auditory cues for fast navigation.
**Action:** Always include keyboard shortcut hints (`<kbd>`) alongside explicit `aria-label`s on header action buttons, and ensure global listeners properly handle active dialog states.
