import type { RefObject } from 'react';
/** Where the light rests when nothing points at the glass: the upper right. */
export declare const GLASS_REST: {
    readonly x: 0.72;
    readonly y: 0.18;
    readonly angle: 45;
};
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
export declare const useGlassPointer: (ref: RefObject<HTMLElement | null>, enabled?: boolean) => void;
