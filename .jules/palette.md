# Palette's Journal

## 2026-10-07 - Native Dialog Backdrop Click Dismissal Pattern

**Learning:** Native `<dialog>` elements trigger `onClick` events with `event.target === dialogRef.current` when a user clicks the backdrop area outside the dialog content box. Adding backdrop click dismissal provides a standard, intuitive modal experience across mobile and desktop. `jsx-a11y` linter rules (`no-noninteractive-element-interactions`, `click-events-have-key-events`) flag `onClick` on `<dialog>`, but native `<dialog>` already supports native keyboard cancellation (`Escape`), so inline `eslint-disable` comments are appropriate.
**Action:** Apply `event.target === dialogRef.current` checks on `<dialog>` onClick handlers and suppress `jsx-a11y` rules for backdrop-dismissible native modal dialogs.
