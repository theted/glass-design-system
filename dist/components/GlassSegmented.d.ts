import React from 'react';
export type GlassSegmentedOption<T extends string> = T | {
    value: T;
    label: React.ReactNode;
};
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
/**
 * GlassSegmented — pick one of a few options. The selection is a pane of
 * glass that springs across the tray. A radio group underneath: arrow keys
 * move the selection, Tab leaves the group.
 *
 * ```tsx
 * <GlassSegmented aria-label="View" options={['Grid', 'List']} value={view} onChange={setView} />
 * ```
 */
declare function GlassSegmented<T extends string>({ options, value, onChange, size, block, className, 'aria-label': ariaLabel, }: GlassSegmentedProps<T>): import("react/jsx-runtime").JSX.Element;
export default GlassSegmented;
