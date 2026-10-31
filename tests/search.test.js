import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

test('SiteSearch component includes keyboard shortcut and accessibility hints', () => {
  const code = readFileSync('src/components/SiteSearch.jsx', 'utf8');
  assert.ok(code.includes('aria-keyshortcuts="/ Control+k Meta+k"'), 'Should define aria-keyshortcuts');
  assert.ok(code.includes('<kbd aria-hidden="true">/</kbd>'), 'Should display visual kbd shortcut hint');
  assert.ok(code.includes('search-empty'), 'Should contain search-empty state');
  assert.ok(code.includes("event.key === '/'"), 'Should handle slash key shortcut');
  assert.ok(code.includes("event.key.toLowerCase() === 'k'"), 'Should handle Cmd/Ctrl+K shortcut');
});

test('CSS includes styling for search shortcut badge and empty state', () => {
  const css = readFileSync('src/styles.css', 'utf8');
  assert.ok(css.includes('.search-toggle kbd'), 'CSS should style .search-toggle kbd');
  assert.ok(css.includes('.search-empty'), 'CSS should style .search-empty');
});
