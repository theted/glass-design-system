import { useLayoutEffect } from 'react';
import type { RefObject } from 'react';

/**
 * Marks the element `data-reveal="pending"` until it scrolls into view, then
 * `"in"`, which plays the frost-condense entrance on `.glass--reveal`. Runs
 * once per element. Built into `<GlassPanel reveal>`.
 */
export const useGlassReveal = (ref: RefObject<HTMLElement | null>, enabled = true) => {
  // A layout effect hides the element before first paint, so it can't flash.
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || !enabled || typeof IntersectionObserver === 'undefined') return;

    el.dataset.reveal = 'pending';
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        el.dataset.reveal = 'in';
        io.disconnect();
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, enabled]);
};
