// Words per minute for considered prose. 200 is the low end of the usual 200–250
// range, which is the right end to sit on: a case study full of constraints and
// numbers is read slower than an article, and a figure that undersells the time is
// a promise kept rather than broken.
const WPM = 200;

// Fields that are metadata rather than prose. Counting them would inflate the figure
// with things nobody reads end to end.
const SKIP = new Set(['role', 'period']);

function countWords(value, key) {
  if (key && SKIP.has(key)) return 0;
  if (typeof value === 'string') return value.trim() ? value.trim().split(/\s+/).length : 0;
  if (Array.isArray(value)) return value.reduce((sum, item) => sum + countWords(item), 0);
  if (value && typeof value === 'object') {
    return Object.entries(value).reduce((sum, [k, v]) => sum + countWords(v, k), 0);
  }
  return 0;
}

/**
 * Reading time, computed from the text rather than typed in beside it.
 *
 * The notes carry a hand-written `minutes` field, and that is fine because a note is
 * one author writing one thing. A case study is assembled from half a dozen arrays in
 * projects.js, and any number written next to it would be wrong the first time
 * somebody added a decision. Deriving it means the figure cannot drift from the page.
 */
export function readingMinutes(...values) {
  const words = values.reduce((sum, value) => sum + countWords(value), 0);
  return Math.max(1, Math.round(words / WPM));
}
