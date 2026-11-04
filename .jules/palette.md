## 2026-11-04 - Live Character Counting in Constrained Forms

**Learning:** For forms enforcing strict character bounds (e.g. 10–1,200 chars), displaying a live count in the field's `aria-describedby` helper element gives real-time feedback without interrupting screen reader flow or introducing layout thrashing.
**Action:** Include dynamic character counts in the static helper text bound via `aria-describedby` whenever `minLength`/`maxLength` constraints are present on text inputs or textareas.
