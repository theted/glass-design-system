import type { CSSProperties, ElementType } from 'react';
import type { PolymorphicProps, SpaceStep } from '../utils';
interface Own {
    className?: string;
    style?: CSSProperties;
}
export type GlassContainerProps<E extends ElementType = 'div'> = PolymorphicProps<E, Own & {
    /** default 76rem · wide 96rem · narrow 48rem, plus the page gutter. */
    width?: 'default' | 'wide' | 'narrow';
}>;
/** A centred column with the page gutter on both sides. */
export declare const GlassContainer: <E extends ElementType = "div">({ as, width, className, ...rest }: GlassContainerProps<E>) => import("react/jsx-runtime").JSX.Element;
export type GlassStackProps<E extends ElementType = 'div'> = PolymorphicProps<E, Own & {
    /** Space between children. Default 6 (24px). */
    gap?: SpaceStep;
}>;
/** Children in a column, a scale step apart. */
export declare const GlassStack: <E extends ElementType = "div">({ as, gap, className, style, ...rest }: GlassStackProps<E>) => import("react/jsx-runtime").JSX.Element;
export type GlassClusterProps<E extends ElementType = 'div'> = PolymorphicProps<E, Own & {
    /** Space between children. Default 2 (8px). */
    gap?: SpaceStep;
    /** Where the row's items sit. Default 'start'. */
    justify?: 'start' | 'center' | 'end' | 'between';
}>;
/** A wrapping row: buttons, badges, filters. */
export declare const GlassCluster: <E extends ElementType = "div">({ as, gap, justify, className, style, ...rest }: GlassClusterProps<E>) => import("react/jsx-runtime").JSX.Element;
export type GlassGridProps<E extends ElementType = 'div'> = PolymorphicProps<E, Own & {
    /** Space between cells. Default fluid 12 → 24px. */
    gap?: SpaceStep;
    /** Narrowest a column gets before the grid drops one. Default '16rem'. */
    min?: string;
}>;
/** As many equal columns as fit, each at least `min` wide. */
export declare const GlassGrid: <E extends ElementType = "div">({ as, gap, min, className, style, ...rest }: GlassGridProps<E>) => import("react/jsx-runtime").JSX.Element;
export type GlassSplitProps<E extends ElementType = 'div'> = PolymorphicProps<E, Own & {
    /** Space between the two sides. Default 8 (32px). */
    gap?: SpaceStep;
    /** Width of the fixed side. Default '16rem'. */
    side?: string;
    /** Which child is the fixed side. Default 'start' (the first). */
    sideAt?: 'start' | 'end';
}>;
/**
 * Two children: a fixed side and a fluid main. They sit side by side while
 * the main gets at least half the row, and stack when it wouldn't.
 */
export declare const GlassSplit: <E extends ElementType = "div">({ as, gap, side, sideAt, className, style, ...rest }: GlassSplitProps<E>) => import("react/jsx-runtime").JSX.Element;
export {};
