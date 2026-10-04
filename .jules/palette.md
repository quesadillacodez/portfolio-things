## 2025-05-18 - Copy Button Visual and Assistive Technology Consistency

**Learning:** Copy-to-clipboard buttons in form sections benefit from clear visual icon state transitions (`check` mark when copied) and auto-reset timers. Keeping the button's accessible name constant avoids disrupting screen reader focus while updates are announced cleanly via an associated `role="status"` element.
**Action:** When enhancing copy buttons, pair an icon state indicator with an auto-clearing timer (e.g. 2.5s) and rely on `<p role="status">` for screen reader status updates without modifying the button's accessible name mid-interaction.
