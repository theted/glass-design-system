import type { ReactNode } from 'react';
import { cx } from '../utils';

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
export const GlassDivider = ({ label, orientation = 'horizontal', className }: GlassDividerProps) => {
  if (orientation === 'vertical') {
    return (
      <div role="separator" aria-orientation="vertical" className={cx('glass-divider glass-divider--vertical', className)} />
    );
  }
  if (label != null) {
    return (
      <div role="separator" className={cx('glass-divider glass-divider--labelled', className)}>
        {label}
      </div>
    );
  }
  return <hr className={cx('glass-divider', className)} />;
};
