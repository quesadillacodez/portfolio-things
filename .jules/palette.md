# Palette's Journal - Critical UX & Accessibility Learnings

## 2026-03-30 - Modal Dialog Focus Restoration & Universal Search Shortcuts

**Learning:** In single-page React portfolio applications using native `<dialog>` elements for overlays like site search, closing the dialog via backdrop click, Escape key, or close buttons often leaves browser focus lost or stranded on the document body if focus restoration is not explicitly tied to the trigger element. Pairing standard `Cmd+K`/`Ctrl+K` shortcuts with explicit `aria-keyshortcuts`, accessible `<kbd>` hints, and returning focus to the activator on close drastically improves keyboard and screen reader fluidity.
**Action:** Always capture the triggering button element with a ref and restore focus in dialog `onClose` handlers, and register global shortcut listeners so power users can trigger search without needing to scroll back to the header.
