## 2026-09-22 - Search Dialog ARIA Describedby & Empty State Guidance

**Learning:** Dialog search inputs often lack explicit aria-describedby linkage to live status regions, and bare "0 results" strings leave users without clear recovery paths. Linking `aria-describedby` to `role="status"` and providing actionable keyword suggestions on zero-results states significantly improves screen reader clarity and search usability.
**Action:** Always link dialog search inputs to their live status region via `aria-describedby` and offer helpful example search terms when queries yield no results.
