import React, { useState } from 'react';
import { GlassPill } from 'glass-design-system';

/**
 * Shared page scaffolding. Every page uses the same container, header and
 * section rhythm, all from the spacing tokens: a page title sits
 * --space-16 under the site header, and sections are --space-section apart.
 */

type Width = { wide?: boolean };

const container = (wide?: boolean) => `glass-container${wide ? ' glass-container--wide' : ''}`;

export const PageHeader: React.FC<
  React.PropsWithChildren<Width & { title: React.ReactNode; lede?: React.ReactNode }>
> = ({ title, lede, wide, children }) => (
  <header className={`${container(wide)} page-header`}>
    <h1 className="glass-h1">{title}</h1>
    {lede && <p className="glass-lede page-header__lede">{lede}</p>}
    {children && <div className="page-header__extra">{children}</div>}
  </header>
);

export const Section: React.FC<
  React.PropsWithChildren<
    Width & { id?: string; title: React.ReactNode; lede?: React.ReactNode; aside?: React.ReactNode; className?: string }
  >
> = ({ id, title, lede, aside, wide, className = '', children }) => (
  <section id={id} className={`glass-section page-section ${className}`.trim()}>
    <div className={container(wide)}>
      <div className="page-section__head">
        <div>
          <h2 className="glass-h2">{title}</h2>
          {lede && <p className="glass-lede page-section__lede">{lede}</p>}
        </div>
        {aside}
      </div>
      <div className="page-section__body">{children}</div>
    </div>
  </section>
);

/** Inline code. */
export const Code: React.FC<React.PropsWithChildren> = ({ children }) => (
  <code className="glass-code">{children}</code>
);

/** A block of code on recessed glass, with a copy button. */
export const CodeBlock: React.FC<{ children: string; className?: string }> = ({ children, className = '' }) => {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(children).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    });
  };
  return (
    <div className={`code-block${children.includes('\n') ? '' : ' code-block--inline'} ${className}`.trim()}>
      <pre><code>{children}</code></pre>
      <GlassPill size="xs" variant="ghost" className="code-block__copy" onClick={copy}>
        {copied ? 'Copied' : 'Copy'}
      </GlassPill>
    </div>
  );
};

/** Quick links to sections further down a long page. */
export const JumpLinks: React.FC<{ items: { id: string; label: string }[] }> = ({ items }) => (
  <nav aria-label="On this page" className="glass-cluster">
    {items.map(({ id, label }) => (
      <GlassPill key={id} size="sm" as="a" href={`#${id}`}>
        {label}
      </GlassPill>
    ))}
  </nav>
);
