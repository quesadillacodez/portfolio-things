import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

/**
 * Everything GSAP lives behind this module so it can be a separate chunk. Importing it
 * statically put 48kB gzipped in front of first paint — a 58% bundle increase on a page
 * that is mostly text. `useHeroMotion` imports it dynamically instead.
 *
 * Returns a teardown. The caller is responsible for having hidden the targets first;
 * see the note in useHeroMotion about why that has to happen before paint.
 */
export function playHero(root) {
  const mm = gsap.matchMedia();

  mm.add(
    {
      motion: '(prefers-reduced-motion: no-preference)',
      reduced: '(prefers-reduced-motion: reduce)',
    },
    (context) => {
      const q = gsap.utils.selector(root);
      const targets = root.querySelectorAll('[data-hero]');

      // matchMedia re-runs this when the query flips, so a visitor who turns reduced
      // motion on mid-session gets the static page immediately, not on next reload.
      if (!context.conditions.motion) {
        gsap.set(targets, { clearProps: 'all', opacity: 1 });
        return undefined;
      }

      // SplitText restores the original nodes on revert, so the h1 stays one
      // selectable, screen-reader-legible string once the animation is done.
      const heading = root.querySelector('[data-hero="title"]');
      const split = heading
        ? SplitText.create(heading, { type: 'lines,words', mask: 'lines', linesClass: 'hero-line' })
        : null;

      // The elements were hidden inline before paint. Hand control to GSAP in the same
      // frame it starts animating, so there is never a visible flash of final state.
      gsap.set(targets, { clearProps: 'opacity' });

      const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.9 } });

      // The board comes online top-down: the status row's readings arrive one field
      // at a time, the way a real board fills in, and only then does the headline
      // land. Everything after it is a consequence of the row above it.
      tl.from(q('[data-hero="status"] > div'), { opacity: 0, duration: 0.45, stagger: 0.07 })
        .from(
          split ? split.words : q('[data-hero="title"]'),
          { yPercent: 115, opacity: 0, duration: 1, stagger: 0.035 },
          '-=0.25',
        )
        .from(q('[data-hero="blurb"]'), { y: 18, opacity: 0 }, '-=0.65')
        .from(q('[data-hero="actions"] > *'), { y: 16, opacity: 0, duration: 0.6, stagger: 0.08 }, '-=0.6')
        .from(q('[data-hero="aside"]'), { opacity: 0, duration: 0.5 }, '-=0.4')
        // The frame arrives last and from further away: it is the thing the headline
        // has just made a claim about.
        .from(q('[data-hero="frame"]'), { y: 40, opacity: 0, scale: 0.97, duration: 1.1 }, '-=1.1')
        .from(q('[data-hero="id"]'), { y: 20, opacity: 0, duration: 0.7 }, '-=0.7')
        .from(q('[data-hero="index"] li'), { y: 14, opacity: 0, duration: 0.5, stagger: 0.06 }, '-=0.6');

      // Scrubbed rather than triggered — the part an IntersectionObserver cannot do.
      // The frame drifts slower than the column beside it, so leaving the hero has a
      // small amount of depth.
      const frame = root.querySelector('[data-hero="frame"]');
      if (frame) {
        gsap.to(frame, {
          yPercent: -8,
          ease: 'none',
          scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: 0.6 },
        });
      }

      return () => split?.revert();
    },
  );

  return () => mm.revert();
}
