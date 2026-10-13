import React from 'react';
import { Link } from 'react-router-dom';
import { GlassDivider } from 'glass-design-system';
import { BrandMark, MORE_NAV, PRIMARY_NAV } from './SiteHeader';

const ELSEWHERE = [
  { href: 'https://github.com/theted/glass-design-system', label: 'Source on GitHub' },
  { href: 'https://sundbergsolutions.se', label: 'sundbergsolutions.se' },
  { href: 'https://snippets.sundbergsolutions.se', label: 'Snippets' },
];

const SiteFooter: React.FC = () => (
  <footer className="glass-container site-footer">
    <GlassDivider />
    <div className="site-footer__grid">
      <div className="glass-stack [--stack:var(--space-3)]">
        <Link to="/" className="site-brand">
          <BrandMark />
          <span>Glass</span>
        </Link>
        <p className="glass-small max-w-[34ch]">
          A frosted-glass component library for React, built by Fredrik Sundberg. It runs his portfolio and the Snippets app.
        </p>
      </div>
      <nav aria-label="Docs" className="site-footer__links">
        {[...PRIMARY_NAV, ...MORE_NAV].map(({ to, label }) => (
          <Link key={to} to={to}>{label}</Link>
        ))}
      </nav>
      <nav aria-label="Elsewhere" className="site-footer__links">
        {ELSEWHERE.map(({ href, label }) => (
          <a key={href} href={href}>{label}</a>
        ))}
      </nav>
    </div>
  </footer>
);

export default SiteFooter;
