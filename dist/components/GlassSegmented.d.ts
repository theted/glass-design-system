import type { ReactNode } from 'react';
export type GlassSegmentedOption<T extends string> = T | {
    value: T;
    label: ReactNode;
};
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
/**
 * Pick one of a few. The selection is a pane of glass that springs across
 * the tray. A radio group underneath: arrow keys move the selection, Tab
 * leaves the group.
 *
 * ```tsx
 * <GlassSegmented aria-label="View" options={['Grid', 'List']} value={view} onChange={setView} />
 * ```
 */
export declare const GlassSegmented: <T extends string>({ options, value, onChange, size, block, className, "aria-label": ariaLabel, }: GlassSegmentedProps<T>) => import("react/jsx-runtime").JSX.Element;
