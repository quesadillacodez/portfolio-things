## 2025-05-18 - Conditional ARIA Error Associations
**Learning:** Statically pointing `aria-describedby` to an empty `<p role="alert">` element when no error is present causes screen readers to announce empty alerts or confusing empty descriptions when controls receive focus.
**Action:** Always conditionally set `aria-describedby` to reference error IDs only when errors exist, and conditionally render the error alert paragraph itself.
