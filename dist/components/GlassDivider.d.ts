import type { ReactNode } from 'react';
export interface GlassDividerProps {
    /** A word in the middle of the line, like "or". */
    label?: ReactNode;
    /** 'vertical' stretches to the height of a flex row. Default 'horizontal'. */
    orientation?: 'horizontal' | 'vertical';
    className?: string;
}
/**
 * A hairline that fades out at both ends and warms where the light hits its
 * middle. Use it between groups that a gap alone doesn't separate enough.
 *
 * ```tsx
 * <GlassDivider />
 * <GlassDivider label="or" />
 * ```
 */
export declare const GlassDivider: ({ label, orientation, className }: GlassDividerProps) => import("react/jsx-runtime").JSX.Element;
