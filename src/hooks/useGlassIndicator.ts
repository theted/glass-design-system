import { useLayoutEffect } from 'react';
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
export const useGlassIndicator = (ref: RefObject<HTMLElement | null>, selector: string) => {
  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;

    let frame = 0;
    const place = () => {
      frame = 0;
      const item = root.querySelector<HTMLElement>(`:scope > ${selector}`);
      root.style.setProperty('--indicator-on', item ? '1' : '0');
      if (!item) return;
      root.style.setProperty('--indicator-x', `${item.offsetLeft}px`);
      root.style.setProperty('--indicator-w', `${item.offsetWidth}px`);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(place);
    };

    place();
    const ready = requestAnimationFrame(() => {
      root.dataset.indicator = 'ready';
    });

    const resize = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(schedule);
    resize?.observe(root);
    for (const child of root.children) resize?.observe(child);

    // The selection lives in the DOM (aria-checked, aria-current …), so
    // watch it there: a router link can change it without this re-rendering.
    const mutations = new MutationObserver(schedule);
    mutations.observe(root, { subtree: true, childList: true, attributes: true, attributeFilter: ['aria-current', 'aria-checked', 'aria-selected', 'aria-pressed'] });

    document.fonts?.ready.then(schedule);

    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(ready);
      resize?.disconnect();
      mutations.disconnect();
      delete root.dataset.indicator;
    };
  }, [ref, selector]);
};
