import { useEffect } from 'react';

// Item 03 + 14 (round two): after the load sequence finished, nothing on the page moved
// again, and the only pointer personality lived inside project image frames.
//
// This is the ambient element the site commits to: the 80px grid the whole layout is
// built on lights up around the pointer. It reuses a motif that is already there rather
// than adding a decorative one, and it costs a custom property write per frame.
//
// It never runs for a coarse pointer (there is nothing to follow on a phone) or under
// prefers-reduced-motion, and the CSS falls back to a plain static grid in both cases.
export function usePointerGlow(reducedMotion) {
  useEffect(() => {
    if (reducedMotion) return undefined;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined;

    const root = document.documentElement;
    let frame = 0;
    let next = null;

    const paint = () => {
      frame = 0;
      if (!next) return;
      root.style.setProperty('--pointer-x', `${next.x}px`);
      root.style.setProperty('--pointer-y', `${next.y}px`);
    };

    const onMove = (event) => {
      next = { x: event.clientX, y: event.clientY };
      if (!frame) frame = requestAnimationFrame(paint);
    };

    root.dataset.glow = 'on';
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
      delete root.dataset.glow;
      root.style.removeProperty('--pointer-x');
      root.style.removeProperty('--pointer-y');
    };
  }, [reducedMotion]);
}
