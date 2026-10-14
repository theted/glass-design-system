import { useMemo } from 'react';
import type { ComponentPropsWithRef, ElementType, Ref, RefCallback } from 'react';

/** Join class names, skipping anything falsy. */
export const cx = (...classes: (string | false | null | undefined)[]) => classes.filter(Boolean).join(' ');

/**
 * Props for a component that renders as `as` (default element `E`): its own
 * props, plus everything the rendered element or component accepts, `ref`
 * included. `<GlassPanel as="form" onSubmit={…}>` and
 * `<GlassButton as={Link} to="/">` are both fully typed.
 */
export type PolymorphicProps<E extends ElementType, Own = object> = Own & {
  /** Render as another element or component. */
  as?: E;
} & Omit<ComponentPropsWithRef<E>, keyof Own | 'as'>;

/** One callback ref that feeds several refs (object or function). */
export const mergeRefs =
  <T>(...refs: (Ref<T> | undefined)[]): RefCallback<T> =>
  (node) => {
    for (const ref of refs) {
      if (typeof ref === 'function') ref(node);
      else if (ref) ref.current = node;
    }
  };

/** mergeRefs, kept stable across renders while the refs don't change. */
export const useMergedRef = <T>(...refs: (Ref<T> | undefined)[]) =>
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useMemo(() => mergeRefs(...refs), refs);

/** The spacing scale. Layout props accept only these steps. */
export type SpaceStep = 1 | 2 | 3 | 4 | 6 | 8 | 12 | 16 | 24 | 32;

export const space = (step: SpaceStep) => `var(--space-${step})`;
