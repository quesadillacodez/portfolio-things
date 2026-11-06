## 2026-11-06 - Dual Package Manager Synchronization and Audit Gates

**Vulnerability:** High-severity CVEs in build/dev dependencies (sharp, vite, brace-expansion, source-map-js, zod) caused `npm audit --audit-level=high` in GitHub Actions CI to fail.
**Learning:** The project uses `pnpm` locally but GitHub Actions CI runs `npm ci` followed by `npm audit --audit-level=high`. Both `package-lock.json` and `pnpm-lock.yaml` must stay synchronized with `package.json` to pass both local pnpm checks and CI npm checks.
**Prevention:** Whenever updating dependencies or running security audits, update dependencies in `package.json`, update `package-lock.json` (via `npm audit fix` or `npm install --package-lock-only`), and regenerate `pnpm-lock.yaml` with `pnpm install`, then verify with both `pnpm test` and `npm audit --audit-level=high`.
