import { Link } from 'react-router-dom';
import { GlassContainer, GlassDivider } from 'glass-design-system';
import { Brand, NAV, REPO } from './Header';

const ELSEWHERE = [
  { href: REPO, label: 'Source on GitHub' },
  { href: `${REPO}/blob/master/MIGRATION.md`, label: 'Upgrading from 0.x' },
  { href: 'https://sundbergsolutions.se', label: 'sundbergsolutions.se' },
  { href: 'https://snippets.sundbergsolutions.se', label: 'Snippets' },
];

export const Footer = () => (
  <footer className="site-footer">
    <GlassContainer width="wide">
      <GlassDivider />
      <div className="site-footer__grid">
        <div className="site-footer__about">
          <Brand />
          <p className="glass-small">
            A frosted-glass design system for React, by Fredrik Sundberg. It runs his portfolio and the Snippets app.
          </p>
        </div>
        <nav aria-label="Docs" className="site-footer__links">
          {NAV.map(({ to, label }) => (
            <Link key={to} to={to}>
              {label}
            </Link>
          ))}
        </nav>
        <nav aria-label="Elsewhere" className="site-footer__links">
          {ELSEWHERE.map(({ href, label }) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>
      </div>
    </GlassContainer>
  </footer>
);
