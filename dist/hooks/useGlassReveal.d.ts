import type { RefObject } from 'react';
/**
 * Marks the element `data-reveal="pending"` until it scrolls into view, then
 * `"in"`, which plays the frost-condense entrance on `.glass--reveal`. Runs
 * once per element. Built into `<GlassPanel reveal>`.
 */
export declare const useGlassReveal: (ref: RefObject<HTMLElement | null>, enabled?: boolean) => void;
