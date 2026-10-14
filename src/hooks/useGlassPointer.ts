import { useEffect } from 'react';
import type { RefObject } from 'react';

/** Where the light rests when nothing points at the glass: the upper right. */
export const GLASS_REST = { x: 0.72, y: 0.18, angle: 45 } as const;

/**
 * Makes the glass light follow the pointer. Writes `--glass-x`, `--glass-y`
 * and `--glass-angle` straight onto the element, batched to one write per
 * frame and never through React state, so a page of panels doesn't
 * re-render on mousemove. The CSS interpolates the values (they're
 * registered properties), which is why the light glides. Whether the light
 * shows at all is CSS too: `.glass:hover` sets `--glass-hover`.
 *
 * Built into GlassPanel. Use it for your own `.glass` elements:
 *
 * ```tsx
 * const ref = useRef<HTMLDivElement>(null);
 * useGlassPointer(ref);
 * return <div ref={ref} className="glass">…</div>;
 * ```
 */
export const useGlassPointer = (ref: RefObject<HTMLElement | null>, enabled = true) => {
  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;

    let frame = 0;
    let angle: number = GLASS_REST.angle;
    let pending: { x: number; y: number } | null = null;

    // Take the short way round: 350° → 10° turns +20°, not −340°.
    const turnTo = (target: number) => {
      angle += ((((target - angle) % 360) + 540) % 360) - 180;
      el.style.setProperty('--glass-angle', `${angle}deg`);
    };

    const write = (x: number, y: number) => {
      el.style.setProperty('--glass-x', x.toFixed(4));
      el.style.setProperty('--glass-y', y.toFixed(4));
    };

    const flush = () => {
      frame = 0;
      if (!pending) return;
      const { x, y } = pending;
      pending = null;
      write(x, y);
      // From the element's centre to the pointer; 0° is up, clockwise.
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

    const onLeave = () => {
      pending = null;
      write(GLASS_REST.x, GLASS_REST.y);
      turnTo(GLASS_REST.angle);
    };

    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, [ref, enabled]);
};
