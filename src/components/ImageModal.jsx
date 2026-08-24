import { useCallback, useEffect, useRef, useState } from 'react';
import Icon from './Icon';
import Picture from './Picture';

const SWIPE_DISTANCE = 55;

export default function ImageModal({ gallery, initialIndex, onClose }) {
  const [index, setIndex] = useState(initialIndex);
  const [zoomed, setZoomed] = useState(false);
  const dialogRef = useRef(null);
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

  // A native dialog traps Tab and paints the backdrop for free. Focus starts on
  // the close button and returns to whatever opened the viewer.
  useEffect(() => {
    const opener = document.activeElement;
    dialogRef.current?.showModal();
    closeRef.current?.focus();
    document.body.classList.add('modal-open');
    return () => {
      document.body.classList.remove('modal-open');
      if (opener instanceof HTMLElement) opener.focus();
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'ArrowRight') go(1);
      if (event.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [go]);

  // A new image starts unpanned, otherwise it opens scrolled to the last position.
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

  return (
    <dialog className="modal" ref={dialogRef} onClose={onClose} aria-label="Project screenshot viewer">
      <div className="modal-bar">
        <span className="modal-count numeric">
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
        <figure>
          {/* Tapping toggles between fit-to-screen and full size; when it is full
              size the stage itself scrolls, which is how panning works on touch. */}
          <button
            type="button"
            onClick={() => setZoomed((on) => !on)}
            aria-label={zoomed ? 'Zoom out' : 'Zoom in to pan around this screen'}
          >
            <Picture name={current.image} alt={current.alt} sizes="100vw" loading="eager" />
          </button>
        </figure>
      </div>

      <div className="modal-foot">
        <p>{current.alt}</p>
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
