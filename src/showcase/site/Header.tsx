import { Link, NavLink } from 'react-router-dom';
import { GlassButton, GlassContainer, GlassMenu, GlassMenuItem, GlassNav, GlassPanel, GlassPopover } from 'glass-design-system';
import { GithubIcon, MenuIcon, SlidersIcon } from '../demos/icons';
import { ThemeControls } from './ThemeControls';

export const NAV = [
  { to: '/', label: 'Overview' },
  { to: '/start', label: 'Get started' },
  { to: '/foundations', label: 'Foundations' },
  { to: '/components', label: 'Components' },
  { to: '/examples', label: 'Examples' },
  { to: '/backdrops', label: 'Backdrops' },
];

export const REPO = 'https://github.com/theted/glass-design-system';

/** A tile of glass with its catch-light in the top-right corner. */
export const BrandMark = ({ size = 22 }: { size?: number }) => (
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

export const Brand = () => (
  <Link to="/" className="site-brand">
    <BrandMark />
    Glass
  </Link>
);

export const Header = () => (
  <header className="site-header">
    <GlassContainer width="wide">
      <GlassPanel radius="round" padding="none" className="site-bar">
        <Brand />

        <GlassNav aria-label="Main" className="site-nav">
          {NAV.map(({ to, label }) => (
            <NavLink key={to} to={to} end={to === '/'}>
              {label}
            </NavLink>
          ))}
        </GlassNav>

        <div className="site-bar__end">
          <GlassPopover
            placement="bottom-end"
            padded
            aria-label="Theme"
            className="site-theme"
            trigger={
              <GlassButton size="sm" variant="ghost">
                <SlidersIcon />
                <span className="site-only-wide">Theme</span>
              </GlassButton>
            }
          >
            <ThemeControls />
          </GlassPopover>

          <GlassButton as="a" href={REPO} size="sm" variant="ghost" icon aria-label="Source on GitHub" className="site-only-wide">
            <GithubIcon />
          </GlassButton>

          <GlassPopover
            placement="bottom-end"
            aria-label="Pages"
            trigger={
              <GlassButton size="sm" className="site-only-narrow">
                <MenuIcon />
                Menu
              </GlassButton>
            }
          >
            {(close) => (
              <GlassMenu>
                {NAV.map(({ to, label }) => (
                  <GlassMenuItem key={to} as={NavLink} to={to} end={to === '/'} onClick={close}>
                    {label}
                  </GlassMenuItem>
                ))}
                <div role="separator" className="glass-menu__separator" />
                <GlassMenuItem as="a" href={REPO} icon={<GithubIcon />}>
                  Source on GitHub
                </GlassMenuItem>
              </GlassMenu>
            )}
          </GlassPopover>
        </div>
      </GlassPanel>
    </GlassContainer>
  </header>
);
