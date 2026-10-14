import { useRef } from 'react';
import type { ComponentPropsWithRef } from 'react';
import { useGlassIndicator } from '../hooks/useGlassIndicator';
import { cx, useMergedRef } from '../utils';

export type GlassNavProps = ComponentPropsWithRef<'nav'> & {
  /** Item height: 'sm' 34px (default), 'md' 40px. */
  size?: 'sm' | 'md';
};

/**
 * A row of links with a pane of glass gliding to the current one. Mark the
 * current link with `aria-current` (React Router's NavLink does it for you;
 * a scroll-spy can set it by hand) and the pane follows. Children are the
 * links themselves: `<a>`, `<button>`, or a router link.
 *
 * Wrap it in `<GlassPanel radius="round" padding="none">` for a floating bar.
 *
 * ```tsx
 * <GlassNav aria-label="Main">
 *   <NavLink to="/" end>Overview</NavLink>
 *   <NavLink to="/components">Components</NavLink>
 * </GlassNav>
 * ```
 */
export const GlassNav = ({ size = 'sm', className, children, ref, ...rest }: GlassNavProps) => {
  const own = useRef<HTMLElement>(null);
  const setRef = useMergedRef(own, ref);
  useGlassIndicator(own, '[aria-current]:not([aria-current="false"])');

  return (
    <nav ref={setRef} className={cx('glass-nav', size === 'md' && 'glass-nav--lg', className)} {...rest}>
      <span aria-hidden="true" className="glass-indicator" />
      {children}
    </nav>
  );
};
