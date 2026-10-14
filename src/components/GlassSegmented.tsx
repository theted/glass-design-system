import { useRef } from 'react';
import type { KeyboardEvent, ReactNode } from 'react';
import { useGlassIndicator } from '../hooks/useGlassIndicator';
import { cx } from '../utils';

export type GlassSegmentedOption<T extends string> = T | { value: T; label: ReactNode };

export interface GlassSegmentedProps<T extends string> {
  /** Strings, or values with their own labels. Two to five reads best. */
  options: readonly GlassSegmentedOption<T>[];
  value: T;
  onChange: (value: T) => void;
  /** Names the group for screen readers. */
  'aria-label'?: string;
  /** Default 'md' (40px); 'sm' is 34px. */
  size?: 'sm' | 'md';
  /** Fill the container, options sharing the width. */
  block?: boolean;
  className?: string;
}

const STEP: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };

const normalise = <T extends string>(o: GlassSegmentedOption<T>) => (typeof o === 'string' ? { value: o, label: o } : o);

/**
 * Pick one of a few. The selection is a pane of glass that springs across
 * the tray. A radio group underneath: arrow keys move the selection, Tab
 * leaves the group.
 *
 * ```tsx
 * <GlassSegmented aria-label="View" options={['Grid', 'List']} value={view} onChange={setView} />
 * ```
 */
export const GlassSegmented = <T extends string>({
  options,
  value,
  onChange,
  size = 'md',
  block = false,
  className,
  'aria-label': ariaLabel,
}: GlassSegmentedProps<T>) => {
  const ref = useRef<HTMLDivElement>(null);
  const items = options.map(normalise);
  const index = Math.max(0, items.findIndex((o) => o.value === value));

  useGlassIndicator(ref, '[aria-checked="true"]');

  const onKeyDown = (e: KeyboardEvent) => {
    const step = STEP[e.key];
    if (!step) return;
    e.preventDefault();
    const next = (index + step + items.length) % items.length;
    onChange(items[next].value);
    ref.current?.querySelectorAll<HTMLElement>('[role="radio"]')[next]?.focus();
  };

  return (
    <div
      ref={ref}
      role="radiogroup"
      aria-label={ariaLabel}
      onKeyDown={onKeyDown}
      className={cx(
        'glass-segmented',
        size === 'sm' && 'glass-segmented--sm',
        block && 'glass-segmented--block',
        className,
      )}
    >
      <span aria-hidden="true" className="glass-indicator" />
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
};
