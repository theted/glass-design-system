import type { RefObject } from 'react';
/** Where the light rests when nothing is pointing at the glass: upper right. */
export declare const GLASS_REST_ANGLE = 45;
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
export declare function useGlassPointer(ref: RefObject<HTMLElement | null>, enabled?: boolean): void;
/**
 * useGlassReveal — marks the element `data-reveal="pending"` until it
 * scrolls into view, then `"in"`, which plays the frost-condense entrance.
 * Runs once per element.
 */
export declare function useGlassReveal(ref: RefObject<HTMLElement | null>, enabled?: boolean): void;
