import type { ComponentPropsWithRef, ElementType, Ref, RefCallback } from 'react';
/** Join class names, skipping anything falsy. */
export declare const cx: (...classes: (string | false | null | undefined)[]) => string;
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
export declare const mergeRefs: <T>(...refs: (Ref<T> | undefined)[]) => RefCallback<T>;
/** mergeRefs, kept stable across renders while the refs don't change. */
export declare const useMergedRef: <T>(...refs: (Ref<T> | undefined)[]) => RefCallback<T>;
/** The spacing scale. Layout props accept only these steps. */
export type SpaceStep = 1 | 2 | 3 | 4 | 6 | 8 | 12 | 16 | 24 | 32;
export declare const space: (step: SpaceStep) => string;
