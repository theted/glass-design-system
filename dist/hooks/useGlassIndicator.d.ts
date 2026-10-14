import type { RefObject } from 'react';
/**
 * Glides a `.glass-indicator` to whichever child of the container matches
 * `selector`. Writes `--indicator-x`, `--indicator-w` and `--indicator-on`
 * on the container and re-measures when the selection, the container's size
 * or the web fonts change. The first placement happens before paint with
 * no transition (`data-indicator="ready"` turns the spring on afterwards),
 * so the indicator never flies in from the left.
 *
 * Used by GlassSegmented and GlassNav. For your own:
 *
 * ```tsx
 * const ref = useRef<HTMLDivElement>(null);
 * useGlassIndicator(ref, '[aria-selected="true"]');
 * return (
 *   <div ref={ref} role="tablist" style={{ position: 'relative', isolation: 'isolate' }}>
 *     <span className="glass-indicator" aria-hidden="true" />
 *     …tabs…
 *   </div>
 * );
 * ```
 */
export declare const useGlassIndicator: (ref: RefObject<HTMLElement | null>, selector: string) => void;
