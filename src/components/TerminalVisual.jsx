import { useEffect, useRef, useState } from 'react';

// Item 16: FairPrice previously rendered as a wall of grey text between two illustrated
// projects, which made it read as filler. This replays the documented program flow —
// browse, validate, reject bad input, check out, print a receipt.
//
// It is captioned in the UI as an illustration of the flow rather than presented as a
// capture of a real terminal session, because that is what it is.
export default function TerminalVisual({ visual, reducedMotion }) {
  const { lines, caption } = visual;
  // Item 14: with reduced motion the full transcript is present immediately.
  const [count, setCount] = useState(reducedMotion ? lines.length : 0);
  const [running, setRunning] = useState(false);
  const ref = useRef(null);

  // Only start once the block is actually on screen — an animation that finishes
  // before the reader arrives is the same as no animation.
  useEffect(() => {
    if (reducedMotion || running) return undefined;
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setRunning(true);
        observer.disconnect();
      },
      { threshold: 0.35 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [reducedMotion, running]);

  useEffect(() => {
    if (!running || count >= lines.length) return undefined;
    // Typed input pauses longer than printed output, which is what makes it read
    // as somebody using the program rather than a log dumping to screen.
    const delay = lines[count].type === 'in' ? 420 : 190;
    const timer = setTimeout(() => setCount((value) => value + 1), delay);
    return () => clearTimeout(timer);
  }, [running, count, lines]);

  const done = count >= lines.length;

  return (
    <figure className="visual-terminal" ref={ref}>
      <div className="term-chrome" aria-hidden="true">
        <span />
        <span />
        <span />
        <code>fairprice_sim.py</code>
      </div>

      {/* The transcript is a single static region for assistive tech: the animation is
          decorative, so the full text is always exposed and never re-announced. */}
      <div className="term-body">
        <pre aria-hidden="true">
          {lines.slice(0, count).map((line, index) => (
            <span className={`term-line term-${line.type}`} key={index}>
              {line.type === 'in' ? <b>&gt; </b> : null}
              {line.text}
            </span>
          ))}
          {!done && running ? <span className="term-caret" /> : null}
        </pre>
        <div className="sr-only">
          {lines.map((line) => `${line.type === 'in' ? 'Input: ' : ''}${line.text}`).join('. ')}
        </div>
      </div>

      <figcaption>{caption}</figcaption>
    </figure>
  );
}
