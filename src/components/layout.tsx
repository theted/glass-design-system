import type { CSSProperties, ElementType } from 'react';
import { cx, space } from '../utils';
import type { PolymorphicProps, SpaceStep } from '../utils';

/**
 * Layout primitives. Each is one class from the stylesheet (usable without
 * React) plus typed props: gaps only take steps on the spacing scale.
 */

const gapStyle = (gap: SpaceStep | undefined, style: CSSProperties | undefined, extra?: Record<string, string | undefined>) =>
  ({
    ...(gap !== undefined && { '--glass-gap': space(gap) }),
    ...Object.fromEntries(Object.entries(extra ?? {}).filter(([, v]) => v !== undefined)),
    ...style,
  }) as CSSProperties;

interface Own {
  className?: string;
  style?: CSSProperties;
}

export type GlassContainerProps<E extends ElementType = 'div'> = PolymorphicProps<
  E,
  Own & {
    /** default 76rem · wide 96rem · narrow 48rem, plus the page gutter. */
    width?: 'default' | 'wide' | 'narrow';
  }
>;

/** A centred column with the page gutter on both sides. */
export const GlassContainer = <E extends ElementType = 'div'>({ as, width = 'default', className, ...rest }: GlassContainerProps<E>) => {
  const Tag: ElementType = as ?? 'div';
  return <Tag className={cx('glass-container', width !== 'default' && `glass-container--${width}`, className)} {...rest} />;
};

export type GlassStackProps<E extends ElementType = 'div'> = PolymorphicProps<
  E,
  Own & {
    /** Space between children. Default 6 (24px). */
    gap?: SpaceStep;
  }
>;

/** Children in a column, a scale step apart. */
export const GlassStack = <E extends ElementType = 'div'>({ as, gap, className, style, ...rest }: GlassStackProps<E>) => {
  const Tag: ElementType = as ?? 'div';
  return <Tag className={cx('glass-stack', className)} style={gapStyle(gap, style)} {...rest} />;
};

export type GlassClusterProps<E extends ElementType = 'div'> = PolymorphicProps<
  E,
  Own & {
    /** Space between children. Default 2 (8px). */
    gap?: SpaceStep;
    /** Where the row's items sit. Default 'start'. */
    justify?: 'start' | 'center' | 'end' | 'between';
  }
>;

const JUSTIFY = { start: undefined, center: 'center', end: 'flex-end', between: 'space-between' } as const;

/** A wrapping row: buttons, badges, filters. */
export const GlassCluster = <E extends ElementType = 'div'>({
  as,
  gap,
  justify = 'start',
  className,
  style,
  ...rest
}: GlassClusterProps<E>) => {
  const Tag: ElementType = as ?? 'div';
  return (
    <Tag
      className={cx('glass-cluster', className)}
      style={gapStyle(gap, { justifyContent: JUSTIFY[justify], ...style })}
      {...rest}
    />
  );
};

export type GlassGridProps<E extends ElementType = 'div'> = PolymorphicProps<
  E,
  Own & {
    /** Space between cells. Default fluid 12 → 24px. */
    gap?: SpaceStep;
    /** Narrowest a column gets before the grid drops one. Default '16rem'. */
    min?: string;
  }
>;

/** As many equal columns as fit, each at least `min` wide. */
export const GlassGrid = <E extends ElementType = 'div'>({ as, gap, min, className, style, ...rest }: GlassGridProps<E>) => {
  const Tag: ElementType = as ?? 'div';
  return <Tag className={cx('glass-grid', className)} style={gapStyle(gap, style, { '--glass-min': min })} {...rest} />;
};

export type GlassSplitProps<E extends ElementType = 'div'> = PolymorphicProps<
  E,
  Own & {
    /** Space between the two sides. Default 8 (32px). */
    gap?: SpaceStep;
    /** Width of the fixed side. Default '16rem'. */
    side?: string;
    /** Which child is the fixed side. Default 'start' (the first). */
    sideAt?: 'start' | 'end';
  }
>;

/**
 * Two children: a fixed side and a fluid main. They sit side by side while
 * the main gets at least half the row, and stack when it wouldn't.
 */
export const GlassSplit = <E extends ElementType = 'div'>({
  as,
  gap,
  side,
  sideAt = 'start',
  className,
  style,
  ...rest
}: GlassSplitProps<E>) => {
  const Tag: ElementType = as ?? 'div';
  return (
    <Tag
      className={cx('glass-split', sideAt === 'end' && 'glass-split--end', className)}
      style={gapStyle(gap, style, { '--glass-side': side })}
      {...rest}
    />
  );
};
