## 2025-10-01 - Backdrop Click Handling on Native Dialogs in React

**Learning:** Attaching `onClick` handlers directly to `<dialog>` elements in React triggers `jsx-a11y/no-noninteractive-element-interactions` ESLint errors because standard dialogs are non-interactive container elements.
**Action:** Attach backdrop click event listeners imperatively inside a `useEffect` hook using `dialogRef.current.addEventListener('click', ...)` to provide backdrop dismissal without triggering accessibility lint errors.
