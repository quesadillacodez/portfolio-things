import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Icon from './Icon';

// Item 12: the modal used to appear instantly, so the relationship between the
// thumbnail you clicked and the image that filled the screen was lost.
//
// This is a FLIP transition: the caller hands over the bounding rect of the element
// that was clicked, we invert the final position back onto that rect, then play it
// forward. The View Transitions API would be tidier but is still not everywhere, and
// this needs no fallback path.
//
// NOTE: the focus trap and focus restoration for this dialog are items 42 and 43,
// which sit outside the 1-25 range implemented in this pass. The Escape and arrow-key
// handling below is unchanged and already worked.
export default function ImageModal({ gallery, initialIndex, originRect, onClose, reducedMotion }) {
  const [index, setIndex] = useState(initialIndex);
  const figureRef = useRef(null);

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

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowRight') setIndex((current) => (current + 1) % gallery.length);
      if (event.key === 'ArrowLeft') setIndex((current) => (current - 1 + gallery.length) % gallery.length);
    };
    document.body.classList.add('modal-open');
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.classList.remove('modal-open');
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [gallery.length, onClose]);

  return (
    <div
      className={`modal ${reducedMotion ? '' : 'modal-animated'}`}
      role="dialog"
      aria-modal="true"
      aria-label="Project screenshot viewer"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <button className="modal-close" type="button" onClick={onClose} aria-label="Close image viewer">
        <Icon name="close" size={22} />
      </button>
      <figure ref={figureRef}>
        <img src={gallery[index].src} alt={gallery[index].alt} />
        <figcaption>{gallery[index].alt} <span>{index + 1} / {gallery.length}</span></figcaption>
      </figure>
      {gallery.length > 1 && (
        <div className="modal-controls">
          <button type="button" onClick={() => setIndex((index - 1 + gallery.length) % gallery.length)}>Previous</button>
          <button type="button" onClick={() => setIndex((index + 1) % gallery.length)}>Next</button>
        </div>
      )}
    </div>
  );
}
