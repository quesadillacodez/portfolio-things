## 2025-05-18 - Conditional ARIA Descriptions on Form Controls

**Learning:** Hardcoding static IDs in `aria-describedby` when error alert elements are conditionally unrendered causes screen readers to encounter broken DOM references or empty alert nodes.
**Action:** Always conditionally append error element IDs to `aria-describedby` only when an error is actively present, and avoid rendering empty `role="alert"` nodes.
