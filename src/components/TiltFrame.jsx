import { useRef, useState } from 'react';

// Item 11: the only hover feedback on project images was `scale(1.015)` — subtle enough
// to read as a rendering artifact. This tracks the pointer and tilts the frame, so the
// screenshot behaves like an object sitting on the page.
//
// Item 10: a site-wide custom cursor is played out and hurts usability. This is the
// contextual version — the label disc only exists over a project image, follows the
// pointer inside it, and never affects the cursor anywhere else on the page.
//
// Item 14: both effects are pointer-driven enhancements. With reduced motion, or on a
// touch device (no hover), the frame is a plain button and the disc never renders.
export default function TiltFrame({
  children,
  label = 'View',
  onActivate,
  ariaLabel,
  reducedMotion,
  className = '',
}) {
  const ref = useRef(null);
  const [tilt, setTilt] = useState(null);
  const [cursor, setCursor] = useState(null);

  const interactive = !reducedMotion;

  const onPointerMove = (event) => {
    if (!interactive || event.pointerType !== 'mouse') return;
    const rect = ref.current.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    // Deliberately shallow: 5 degrees reads as depth, 15 reads as a gimmick.
    setTilt({ rx: (0.5 - py) * 5, ry: (px - 0.5) * 5 });
    setCursor({ x: event.clientX - rect.left, y: event.clientY - rect.top });
  };

  const reset = () => {
    setTilt(null);
    setCursor(null);
  };

  return (
    <div className={`tilt ${className}`.trim()} ref={ref} onPointerLeave={reset}>
      <button
        type="button"
        className="tilt-button"
        aria-label={ariaLabel}
        onPointerMove={onPointerMove}
        onClick={(event) => onActivate?.(event.currentTarget.getBoundingClientRect())}
        onBlur={reset}
        style={
          tilt
            ? { transform: `perspective(1100px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(1.012)` }
            : undefined
        }
      >
        {children}
        {cursor ? (
          <span
            className="tilt-cursor"
            style={{ left: `${cursor.x}px`, top: `${cursor.y}px` }}
            aria-hidden="true"
          >
            {label}
          </span>
        ) : null}
      </button>
    </div>
  );
}
