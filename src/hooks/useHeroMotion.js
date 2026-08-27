import { useLayoutEffect } from 'react';

// If the GSAP chunk is slow or fails, the hero must not stay invisible. This is the
// longest it is allowed to wait before revealing itself unanimated.
const SAFETY_MS = 700;

/**
 * The hero is the one place on this site that deserves choreography rather than a
 * reveal. `useReveal` still owns the ~40 one-shot entrances further down the page — it
 * is cheaper and there is nothing to orchestrate there. GSAP owns this section: one
 * timeline where each element arrives because the one before it landed, plus a
 * scroll-scrubbed drift an IntersectionObserver cannot express.
 *
 * GSAP is imported dynamically. Statically it added 48kB gzipped in front of first
 * paint, a 58% bundle increase on a page that is mostly text.
 *
 * That defer creates one problem this hook exists to solve. `gsap.from()` animates from
 * a state to the element's natural one, and GSAP only sets that "from" state when the
 * timeline is built — so a deferred import means the hero paints fully visible and then
 * snaps backwards to animate in. Hiding the targets here, in a layout effect, happens
 * before the browser paints, so there is no flash either way.
 *
 * Three things keep that from becoming an invisible hero:
 *   - reduced motion returns immediately and never hides anything;
 *   - a timeout reveals the hero unanimated if the chunk is slow;
 *   - a failed import reveals it too.
 */
export function useHeroMotion(ref) {
  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return undefined;

    // Never hide anything for a visitor who asked for less motion — for them the
    // static hero is the finished state, not a fallback.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    // THE BIG THREE ARRIVE BY MOVEMENT, NOT BY FADING, AND THAT IS A PERFORMANCE RULE
    // RATHER THAN A TASTE ONE.
    //
    // An element at opacity:0 does not count as painted, so whichever element is the
    // largest thing above the fold sets LCP — and if it is fading in behind a deferred
    // 48kB chunk, LCP is whenever that chunk lands. Chasing them one at a time is
    // whack-a-mole: it was the screenshot at 1440 (1272ms), then the blurb at 390
    // (1300ms), because the largest element changes with the viewport.
    //
    // So title, blurb and frame are never hidden and never fade. They still arrive:
    // the title's words rise out of the line mask SplitText builds, which conceals
    // them exactly as well as opacity did, and the blurb and frame travel in. Only the
    // small chrome — status row, buttons, aside, ID block, index — fades, and none of
    // it is ever the largest element on screen.
    const KEEP_PAINTED = ['frame', 'title', 'blurb'];
    const hidden = root.querySelectorAll(
      `[data-hero]${KEEP_PAINTED.map((name) => `:not([data-hero='${name}'])`).join('')}`,
    );
    hidden.forEach((el) => {
      el.style.opacity = '0';
    });

    let cancelled = false;
    let teardown;

    const reveal = () =>
      hidden.forEach((el) => {
        el.style.removeProperty('opacity');
      });

    const safety = setTimeout(reveal, SAFETY_MS);

    import('../motion/heroTimeline')
      .then(({ playHero }) => {
        clearTimeout(safety);
        if (cancelled) return;
        teardown = playHero(root);
      })
      .catch(() => {
        clearTimeout(safety);
        reveal();
      });

    return () => {
      cancelled = true;
      clearTimeout(safety);
      reveal();
      teardown?.();
    };
  }, [ref]);
}
