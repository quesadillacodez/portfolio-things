import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Icon from './Icon';
import Picture from './Picture';

const SWIPE_DISTANCE = 55;

// Item 12: the modal used to appear instantly, so the relationship between the
// thumbnail you clicked and the image that filled the screen was lost. The caller
// hands over the bounding rect of the element that was clicked, we invert the final
// position back onto that rect, then play it forward.
//
// Items 42/43/46: it is now a native <dialog>, which traps Tab and paints the
// backdrop for free. Focus starts on the close button and returns to whatever opened
// the viewer, and the image can be zoomed, panned and swiped on touch.
export default function ImageModal({ gallery, initialIndex, originRect, onClose, reducedMotion }) {
  const [index, setIndex] = useState(initialIndex);
  const [zoomed, setZoomed] = useState(false);
  const dialogRef = useRef(null);
  const figureRef = useRef(null);
  const closeRef = useRef(null);
  const stageRef = useRef(null);
  const touchStart = useRef(null);

  const go = useCallback(
    (step) => {
      setZoomed(false);
      setIndex((current) => (current + step + gallery.length) % gallery.length);
    },
    [gallery.length],
  );

  // Declared first so the dialog is open (and laid out) before the FLIP measures it.
  useLayoutEffect(() => {
    const opener = document.activeElement;
    dialogRef.current?.showModal();
    closeRef.current?.focus();
    document.body.classList.add('modal-open');
    return () => {
      document.body.classList.remove('modal-open');
      if (opener instanceof HTMLElement) opener.focus();
    };
  }, []);

  useLayoutEffect(() => {
    if (reducedMotion || !originRect || !figureRef.current) return;
    const node = figureRef.current;
    const target = node.getBoundingClientRect();
    if (!target.width || !target.height) return;

    // First → Last → Invert → Play.
    const dx = originRect.left + originRect.width / 2 - (target.left + target.width / 2);
    const dy = originRect.top + originRect.height / 2 - (target.top + target.height / 2);
    const scale = originRect.width / target.width;

    node.animate(
      [
        { transform: `translate(${dx}px, ${dy}px) scale(${scale})`, opacity: 0.4 },
        { transform: 'translate(0, 0) scale(1)', opacity: 1 },
      ],
      { duration: 380, easing: 'cubic-bezier(.2,.8,.2,1)' },
    );
  }, [originRect, reducedMotion]);

  // Escape is handled by the dialog itself, which fires onClose.
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'ArrowRight') go(1);
      if (event.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [go]);

  // A new image starts unpanned rather than at the previous scroll position.
  useEffect(() => {
    stageRef.current?.scrollTo({ top: 0, left: 0 });
  }, [index]);

  const onTouchStart = (event) => {
    if (zoomed || event.touches.length !== 1) return;
    touchStart.current = { x: event.touches[0].clientX, y: event.touches[0].clientY };
  };

  const onTouchEnd = (event) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start || zoomed || gallery.length < 2) return;
    const dx = event.changedTouches[0].clientX - start.x;
    const dy = event.changedTouches[0].clientY - start.y;
    if (Math.abs(dx) > SWIPE_DISTANCE && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1);
  };

  const current = gallery[index];
  const caption = current.alt || current.caption;

  return (
    <dialog
      className={`modal ${reducedMotion ? '' : 'modal-animated'}`}
      ref={dialogRef}
      onClose={onClose}
      aria-label="Project screenshot viewer"
    >
      <div className="modal-bar">
        <span className="modal-count">
          {index + 1} / {gallery.length}
        </span>
        <button
          className="modal-close"
          type="button"
          onClick={onClose}
          ref={closeRef}
          aria-label="Close image viewer"
        >
          <Icon name="close" size={22} />
        </button>
      </div>

      <div
        className={`modal-stage${zoomed ? ' zoomed' : ''}`}
        ref={stageRef}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <figure ref={figureRef}>
          {/* Item 46: on a 390px viewport a dense dashboard rendered at 351px was
              illegible. Tapping switches to full size, and the stage becomes the pan
              surface — which is also what makes native pinch-zoom useful here. */}
          <button
            type="button"
            onClick={() => setZoomed((on) => !on)}
            aria-label={zoomed ? 'Fit image to screen' : 'Zoom in to pan around this screen'}
          >
            <Picture name={current.image} alt={caption} sizes="100vw" loading="eager" full={zoomed} />
          </button>
        </figure>
      </div>

      <div className="modal-foot">
        <p>{caption}</p>
        <button type="button" onClick={() => go(-1)} disabled={gallery.length < 2}>
          Previous
        </button>
        <button type="button" onClick={() => setZoomed((on) => !on)}>
          {zoomed ? 'Fit' : 'Zoom'}
        </button>
        <button type="button" onClick={() => go(1)} disabled={gallery.length < 2}>
          Next
        </button>
      </div>
    </dialog>
  );
}
