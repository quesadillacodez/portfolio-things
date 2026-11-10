## 2026-04-18 - Native dialog search keyboard shortcuts and backdrop dismissal

**Learning:** Native `<dialog>` elements with modal overlays trap Tab and handle Escape natively, but lack native backdrop click dismissal (`event.target === dialog`) and global shortcut discoverability. Adding `/` and `Cmd+K` keyboard shortcuts accompanied by an `aria-keyshortcuts` attribute and a subtle `<kbd>` tag makes site search immediately accessible to power users without intrusive UI elements.
**Action:** When implementing modal dialogs and search overlays, always pair global key handlers (safeguarded against inputs/textareas) with backdrop-click closing and visual keyboard shortcut indicators in the launcher.
