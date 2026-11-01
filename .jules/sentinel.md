# Sentinel Security Journal

This journal records critical security learnings, constraints, and architecture-specific patterns discovered in this codebase.

## 2026-11-01 - High-Severity Dependency Audit Gate in CI

**Vulnerability:** Known high-severity CVEs in build devDependencies (`sharp` < 0.35.5 and `vite` < 8.3.5) failing GitHub Actions CI during `npm audit --audit-level=high`.
**Learning:** CI workflow runs `npm ci` followed by `npm audit --audit-level=high`. Even though the repository primarily uses `pnpm` for local dev commands, `package-lock.json` must remain strictly synchronized with `package.json` via `npm install --package-lock-only` and free of high-severity vulnerabilities for CI builds to pass.
**Prevention:** Whenever patching dependency CVEs or upgrading build tooling, update `package.json`, synchronize `package-lock.json`, and run `npm audit --audit-level=high` before submitting.
