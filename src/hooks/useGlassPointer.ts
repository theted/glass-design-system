import { useEffect, useLayoutEffect } from 'react';
import type { RefObject } from 'react';

/** Where the light rests when nothing is pointing at the glass: upper right. */
export const GLASS_REST_ANGLE = 45;

/**
 * useGlassPointer — drives the glass material's light from the pointer.
 *
 * Writes `--glass-x`, `--glass-y`, `--glass-angle` and `--glass-hover`
 * directly onto the element (rAF-batched, no React state), so a page full
 * of panels never re-renders on mousemove. The CSS in `material.css`
 * interpolates the values, which is what makes the light trail smoothly.
 *
 * Touch pointers are ignored: there is no hover on glass you're holding.
 *
 * ```tsx
 * const ref = useRef<HTMLDivElement>(null);
 * useGlassPointer(ref);
 * return <div ref={ref} className="glass-surface">…</div>;
 * ```
 */
export function useGlassPointer(ref: RefObject<HTMLElement | null>, enabled = true) {
  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;

    let frame = 0;
    let angle = GLASS_REST_ANGLE;
    let pending: { x: number; y: number } | null = null;

    // Take the short way round: 350° → 10° should move +20°, not −340°.
    const turnTo = (target: number) => {
      const delta = ((((target - angle) % 360) + 540) % 360) - 180;
      angle += delta;
      el.style.setProperty('--glass-angle', `${angle}deg`);
    };

    const flush = () => {
      frame = 0;
      if (!pending) return;
      const { x, y } = pending;
      pending = null;
      el.style.setProperty('--glass-x', x.toFixed(4));
      el.style.setProperty('--glass-y', y.toFixed(4));
      // Angle from the element's centre to the pointer, 0° = up, clockwise.
      turnTo((Math.atan2(x - 0.5, 0.5 - y) * 180) / Math.PI);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      const rect = el.getBoundingClientRect();
      pending = {
        x: Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width)),
        y: Math.min(1, Math.max(0, (e.clientY - rect.top) / rect.height)),
      };
      if (!frame) frame = requestAnimationFrame(flush);
    };

    const onEnter = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      el.style.setProperty('--glass-hover', '1');
      onMove(e);
    };

    const onLeave = () => {
      pending = null;
      el.style.setProperty('--glass-hover', '0');
      turnTo(GLASS_REST_ANGLE);
    };

    el.addEventListener('pointerenter', onEnter);
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener('pointerenter', onEnter);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, [ref, enabled]);
}

/**
 * useGlassReveal — marks the element `data-reveal="pending"` until it
 * scrolls into view, then `"in"`, which plays the frost-condense entrance.
 * Runs once per element.
 */
export function useGlassReveal(ref: RefObject<HTMLElement | null>, enabled = true) {
  // Layout effect: hide before first paint, or the panel would flash in.
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || !enabled || typeof IntersectionObserver === 'undefined') return;

    el.dataset.reveal = 'pending';
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          el.dataset.reveal = 'in';
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, enabled]);
}
