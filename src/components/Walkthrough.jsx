import { useEffect, useRef, useState } from 'react';
import TiltFrame from './TiltFrame';
import Picture from './Picture';
import Icon from './Icon';

const DWELL = 4200;

// Item 23: six real screenshots existed and all six were frozen in a thumbnail row.
// This walks them in task order — build the week, fill a gap, watch the crew, verify
// pay, export — so a visitor sees the product being *used* rather than photographed.
//
// It is a real control, not a decorative carousel: the step list is a set of buttons,
// autoplay stops the moment anyone interacts, and progress is visible.
export default function Walkthrough({ steps, onOpenImage, reducedMotion }) {
  const [index, setIndex] = useState(0);
  // Item 14: no autoplay under reduced motion — the visitor drives it entirely.
  const [playing, setPlaying] = useState(!reducedMotion);
  const containerRef = useRef(null);
  const [inView, setInView] = useState(false);

  // Do not advance a walkthrough nobody is looking at.
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return undefined;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.4,
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!playing || !inView || reducedMotion) return undefined;
    const timer = setTimeout(() => setIndex((value) => (value + 1) % steps.length), DWELL);
    return () => clearTimeout(timer);
  }, [playing, inView, index, steps.length, reducedMotion]);

  const select = (next) => {
    setPlaying(false);
    setIndex(next);
  };

  const active = steps[index];

  return (
    <div className="walkthrough" ref={containerRef}>
      <TiltFrame
        className="walkthrough-frame"
        label="Enlarge"
        ariaLabel={`Enlarge: ${active.caption}`}
        reducedMotion={reducedMotion}
        onActivate={(rect) => onOpenImage(index, rect)}
      >
        {/* All frames are stacked and cross-faded so the container never reflows and
            the browser never has to decode an image mid-transition. */}
        {steps.map((step, stepIndex) => (
          <Picture
            key={step.image}
            name={step.image}
            alt={stepIndex === index ? step.caption : ''}
            sizes="(min-width: 1050px) 55vw, 92vw"
            loading={stepIndex === 0 ? 'eager' : 'lazy'}
            className={stepIndex === index ? 'is-active' : ''}
            ariaHidden={stepIndex === index ? undefined : 'true'}
          />
        ))}
      </TiltFrame>

      <div className="walkthrough-rail">
        <p className="walkthrough-caption" aria-live="polite">
          <strong>{active.step}</strong>
          {active.caption}
        </p>

        <ol className="walkthrough-steps">
          {steps.map((step, stepIndex) => (
            <li key={step.image}>
              <button
                type="button"
                className={stepIndex === index ? 'is-active' : ''}
                onClick={() => select(stepIndex)}
                aria-current={stepIndex === index ? 'step' : undefined}
              >
                <span className="walkthrough-num">{String(stepIndex + 1).padStart(2, '0')}</span>
                <span className="walkthrough-name">{step.step}</span>
                {stepIndex === index && playing && !reducedMotion ? (
                  <span className="walkthrough-bar" aria-hidden="true" />
                ) : null}
              </button>
            </li>
          ))}
        </ol>

        {!reducedMotion && (
          <button type="button" className="walkthrough-play" onClick={() => setPlaying((value) => !value)}>
            <Icon name={playing ? 'pause' : 'play'} size={14} />
            {playing ? 'Pause walkthrough' : 'Play walkthrough'}
          </button>
        )}
      </div>
    </div>
  );
}
