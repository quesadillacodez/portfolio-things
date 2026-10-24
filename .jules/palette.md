## 2026-10-11 - Conditional Error Elements and Dynamic ARIA Associations

**Learning:** Hardcoding `aria-describedby` references to error elements that are always present in the DOM (even when empty) causes screen readers to encounter empty `role="alert"` nodes or announce phantom descriptions when form fields are valid.
**Action:** Always conditionally render error elements and dynamically construct `aria-describedby` string attributes so they only reference IDs of elements that currently exist and contain text.
