import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';

export type GlassSegmentedOption<T extends string> = T | { value: T; label: React.ReactNode };

export interface GlassSegmentedProps<T extends string> {
  options: readonly GlassSegmentedOption<T>[];
  value: T;
  onChange: (value: T) => void;
  /** Accessible name for the group. */
  'aria-label'?: string;
  /** Default 'md'. */
  size?: 'sm' | 'md';
  /** Stretch to the container width, options sharing it equally. */
  block?: boolean;
  className?: string;
}

const norm = <T extends string>(o: GlassSegmentedOption<T>) =>
  typeof o === 'string' ? { value: o, label: o } : o;

/**
 * GlassSegmented — pick one of a few options. The selection is a pane of
 * glass that springs across the tray. A radio group underneath: arrow keys
 * move the selection, Tab leaves the group.
 *
 * ```tsx
 * <GlassSegmented aria-label="View" options={['Grid', 'List']} value={view} onChange={setView} />
 * ```
 */
function GlassSegmented<T extends string>({
  options,
  value,
  onChange,
  size = 'md',
  block = false,
  className = '',
  'aria-label': ariaLabel,
}: GlassSegmentedProps<T>) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const items = options.map(norm);
  const index = Math.max(0, items.findIndex((o) => o.value === value));

  const measure = useCallback(() => {
    const root = rootRef.current;
    const el = root?.querySelectorAll<HTMLElement>('[role="radio"]')[index];
    if (!root || !el) return;
    root.style.setProperty('--seg-x', `${el.offsetLeft}px`);
    root.style.setProperty('--seg-w', `${el.offsetWidth}px`);
  }, [index]);

  useLayoutEffect(() => {
    measure();
    // Turn on the spring only after the first placement, so it doesn't fly in.
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, [measure]);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(measure);
    ro.observe(root);
    // Web fonts change label widths after first paint.
    document.fonts?.ready.then(measure);
    return () => ro.disconnect();
  }, [measure]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    const step = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = (index + step + items.length) % items.length;
    onChange(items[next].value);
    rootRef.current?.querySelectorAll<HTMLElement>('[role="radio"]')[next]?.focus();
  };

  return (
    <div
      ref={rootRef}
      role="radiogroup"
      aria-label={ariaLabel}
      data-ready={ready}
      onKeyDown={onKeyDown}
      className={[
        'glass-segmented',
        size === 'sm' && 'glass-segmented--sm',
        block && 'glass-segmented--block',
        className,
      ].filter(Boolean).join(' ')}
    >
      <span aria-hidden="true" className="glass-segmented__indicator" />
      {items.map((o, i) => (
        <button
          key={o.value}
          type="button"
          role="radio"
          aria-checked={i === index}
          tabIndex={i === index ? 0 : -1}
          className="glass-segmented__option"
          onClick={() => onChange(o.value)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export default GlassSegmented;
