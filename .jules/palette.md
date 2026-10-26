## 2026-10-26 - [Search input accessible guidance and status linking]

**Learning:** Dialog search inputs often announce result counts via live regions, but without `aria-describedby` linking the search `<input>` to the status element ID, screen readers may not read the initial guidance or status message when the user focuses the field.
**Action:** Always link search inputs to status/helper text using `aria-describedby` and disable browser `autoComplete="off"` to prevent auto-fill popups over live search results.
