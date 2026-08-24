// Items 16 + 22: the Clinic project's own stated deliverable was "mapped the current
// and proposed workflows" — so the map is the honest visual for it, drawn from the
// before/after already described in the project data.
//
// This is the "show the messy middle" idea applied to the one project where the middle
// is documented. The photographic artifacts (whiteboards, rejected layouts) are still
// Hadi's to supply — see the `artifacts` note in data/projects.js.
export default function FlowVisual({ visual }) {
  const { before, after, caption } = visual;

  const column = (side, tone) => (
    <div className={`flow-col flow-${tone}`}>
      <p className="flow-label">
        <span className="flow-dot" aria-hidden="true" />
        {side.label}
        <span className="flow-count">{side.steps.length} steps</span>
      </p>
      <ol>
        {side.steps.map((step) => (
          <li key={step}>
            <span>{step}</span>
          </li>
        ))}
      </ol>
    </div>
  );

  return (
    <figure className="visual-flow">
      <div className="flow-grid">
        {column(before, 'before')}
        <div className="flow-arrow" aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="m13 6 6 6-6 6" />
          </svg>
        </div>
        {column(after, 'after')}
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
