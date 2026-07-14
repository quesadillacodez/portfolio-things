import { useEffect, useState } from 'react';
import Icon from './Icon';

export default function ImageModal({ gallery, initialIndex, onClose }) {
  const [index, setIndex] = useState(initialIndex);

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
    <div className="modal" role="dialog" aria-modal="true" aria-label="Project screenshot viewer" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <button className="modal-close" type="button" onClick={onClose} aria-label="Close image viewer"><Icon name="close" size={22} /></button>
      <figure>
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
