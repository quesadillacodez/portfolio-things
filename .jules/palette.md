## 2026-09-15 - Quick Search Keyboard Shortcuts and Accessible Empty States

**Learning:** When adding global search hotkeys (`/` and `Cmd+K`/`Ctrl+K`), check `document.activeElement` for input fields (`INPUT`, `TEXTAREA`, `SELECT`, `isContentEditable`) to avoid capturing intended text entry. Always pair `<kbd>` visual badges with `aria-keyshortcuts` on the trigger button and provide an explicit zero-result empty state rather than silence.
**Action:** When implementing global shortcuts in dialog-based triggers, guard against active input states and dialog re-entrancy, and announce key shortcuts semantically to assistive tech.
