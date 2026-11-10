# Sentinel's Journal

## 2026-11-10 - Enforce noopener noreferrer on External Links

**Vulnerability:** External anchor tag in `src/components/InfoPage.jsx` opened in a new tab (`target="_blank"`) using only `rel="noreferrer"` instead of `rel="noopener noreferrer"`.
**Learning:** While `noreferrer` implies `noopener` in some modern engines, omitting `noopener` risks reverse tabnabbing (`window.opener` manipulation) on older browsers or webviews, and caused inconsistency across components.
**Prevention:** Enforce `rel="noopener noreferrer"` across all JSX files using an automated regression test in `tests/launch.test.js`.
