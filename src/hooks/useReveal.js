import { useEffect } from 'react';

// Item 08: the original `.reveal` class only ran once, on page load, so it was spent
// on the hero and unused for the remaining ~7000px. One shared observer now wakes
// every element that opts in with `data-reveal`, at any point in the page.
//
// Item 14: when the visitor prefers reduced motion we do not observe at all — we mark
// everything visible immediately, so nothing depends on a scroll event to become readable.
// The CSS carries a scroll-timeline version of the same entrance. Where that is
// supported AND motion is allowed, this observer is pure redundant work — the
// stylesheet has already overridden everything it would set. It still has to run
// under reduced motion, because the scroll-timeline rules are inside a
// no-preference media query and something must mark elements visible.
const hasScrollTimeline = () =>
  typeof CSS !== 'undefined' && CSS.supports && CSS.supports('animation-timeline: view()');

export function useReveal(prefersReducedMotion) {
  useEffect(() => {
    const targets = document.querySelectorAll('[data-reveal]:not(.is-visible)');

    if (prefersReducedMotion) {
      targets.forEach((el) => el.classList.add('is-visible'));
      return undefined;
    }

    if (hasScrollTimeline()) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          // Reveal is a one-way trip: re-animating on scroll-up reads as a glitch.
          observer.unobserve(entry.target);
        });
      },
      // Fire slightly before the element is fully on screen so the motion finishes
      // as the reader arrives at it, rather than starting once they are already there.
      { rootMargin: '0px 0px -12% 0px', threshold: 0.1 },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  });
}
