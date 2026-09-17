## 2026-09-17 - [Package lock desynchronization with package.json]

**Vulnerability:** CI builds failed during `npm ci` because `package-lock.json` was missing `@formspree/react` present in `package.json`.
**Learning:** Adding dependencies to `package.json` without updating `package-lock.json` breaks strict CI `npm ci` installations.
**Prevention:** Use `npm install --package-lock-only` to keep `package-lock.json` strictly synchronized with `package.json`.
