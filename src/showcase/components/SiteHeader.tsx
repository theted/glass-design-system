import React, { useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { GlassPanel, GlassPill } from 'glass-design-system';
import ThemePanel from './ThemePanel';
import { usePopover } from './usePopover';

export const PRIMARY_NAV = [
  { to: '/', label: 'Overview' },
  { to: '/foundations', label: 'Foundations' },
  { to: '/components', label: 'Components' },
  { to: '/layouts', label: 'Layouts' },
  { to: '/examples', label: 'Examples' },
  { to: '/orbs', label: 'Orbs' },
];

export const MORE_NAV = [
  { to: '/surfaces', label: 'Surfaces' },
  { to: '/type', label: 'Type' },
  { to: '/colors', label: 'Colour' },
  { to: '/philosophy', label: 'Philosophy' },
  { to: '/product', label: 'Product demo' },
];

/** A glass tile with its catch-light in the top-right corner. */
export const BrandMark: React.FC<{ size?: number }> = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id="brand-rim" x1="1" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="oklch(0.96 0.08 86)" />
        <stop offset="0.45" stopColor="oklch(0.78 0.1 250 / 0.7)" />
        <stop offset="1" stopColor="oklch(0.55 0.15 264 / 0.35)" />
      </linearGradient>
      <linearGradient id="brand-body" x1="1" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="oklch(0.75 0.12 250 / 0.35)" />
        <stop offset="1" stopColor="oklch(0.45 0.16 264 / 0.15)" />
      </linearGradient>
    </defs>
    <rect x="2.75" y="2.75" width="18.5" height="18.5" rx="6" fill="url(#brand-body)" stroke="url(#brand-rim)" strokeWidth="1.5" />
    <path d="M14.5 6.5h3v3" stroke="oklch(0.97 0.06 88)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const navPill = (to: string, label: string, size: 'sm' | 'md' = 'sm') => (
  <GlassPill key={to} as={NavLink} to={to} end={to === '/'} size={size} variant="ghost">
    {label}
  </GlassPill>
);

const SiteHeader: React.FC = () => {
  const innerRef = useRef<HTMLDivElement>(null);
  const more = usePopover(innerRef);
  const theme = usePopover(innerRef);
  const menu = usePopover(innerRef);

  return (
    <header className="site-header">
      <div ref={innerRef} className="glass-container site-header__inner">
        <GlassPanel intensity="medium" topGlow={false} spectrum={false} className="site-header__bar">
          <Link to="/" className="site-brand">
            <BrandMark />
            <span>Glass</span>
          </Link>

          <nav aria-label="Main" className="site-nav">
            {PRIMARY_NAV.map(({ to, label }) => navPill(to, label))}
          </nav>

          <div className="site-header__end">
            <div ref={more.triggerRef} className="site-only-wide">
              <GlassPill size="sm" variant="ghost" aria-expanded={more.open} onClick={more.toggle}>
                More
                <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true" className={more.open ? 'rotate-180' : ''}>
                  <path d="M2 3.5l3 3 3-3" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </GlassPill>
            </div>

            <div ref={theme.triggerRef}>
              <GlassPill size="sm" variant={theme.open ? 'active' : 'default'} aria-expanded={theme.open} onClick={theme.toggle}>
                <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
                  <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.4" fill="none" />
                  <path d="M8 1.75a6.25 6.25 0 0 1 0 12.5z" fill="currentColor" />
                </svg>
                Theme
              </GlassPill>
            </div>

            <div ref={menu.triggerRef} className="site-only-narrow">
              <GlassPill size="sm" aria-expanded={menu.open} onClick={menu.toggle}>
                {menu.open ? 'Close' : 'Menu'}
              </GlassPill>
            </div>
          </div>
        </GlassPanel>

        {/* Popovers live outside the bar: it clips, and a backdrop blur nested
            inside another one can't see the page behind it. */}
        {more.open && (
          <div ref={more.panelRef} className="site-popover site-popover--menu" style={more.panelStyle}>
            <GlassPanel intensity="strong" topGlow={false} className="site-popover__pane">
              <nav aria-label="More pages" className="glass-stack [--stack:var(--space-1)]">
                {MORE_NAV.map(({ to, label }) => navPill(to, label, 'md'))}
                <GlassPill as="a" href="https://sundbergsolutions.se" size="md" variant="ghost">Portfolio ↗</GlassPill>
              </nav>
            </GlassPanel>
          </div>
        )}

        {theme.open && (
          <div ref={theme.panelRef} className="site-popover site-popover--theme" style={theme.panelStyle}>
            <GlassPanel intensity="strong" topGlow={false} padding="sm" className="site-popover__pane">
              <ThemePanel />
            </GlassPanel>
          </div>
        )}

        {menu.open && (
          <div ref={menu.panelRef} className="site-popover site-popover--sheet" style={menu.panelStyle}>
            <GlassPanel intensity="strong" topGlow={false} padding="sm" className="site-popover__pane">
              <nav aria-label="All pages" className="site-sheet-nav">
                {[...PRIMARY_NAV, ...MORE_NAV].map(({ to, label }) => navPill(to, label, 'md'))}
                <GlassPill as="a" href="https://sundbergsolutions.se" size="md" variant="ghost">Portfolio ↗</GlassPill>
              </nav>
            </GlassPanel>
          </div>
        )}
      </div>
    </header>
  );
};

export default SiteHeader;
