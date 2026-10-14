import type { ReactNode } from 'react';
import { GlassContainer, cx } from 'glass-design-system';

/**
 * Page scaffolding: every page opens with the same header and sections sit
 * one --space-section apart, all from the tokens.
 */

export const PageHeader = ({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  lede?: ReactNode;
  children?: ReactNode;
}) => (
  <header className="page-header">
    {eyebrow && <p className="page-header__eyebrow">{eyebrow}</p>}
    <h1 className="glass-h1">{title}</h1>
    {lede && <p className="glass-lede page-header__lede">{lede}</p>}
    {children && <div className="page-header__extra">{children}</div>}
  </header>
);

export const Section = ({
  id,
  title,
  lede,
  aside,
  className,
  children,
}: {
  id?: string;
  title: ReactNode;
  lede?: ReactNode;
  aside?: ReactNode;
  className?: string;
  children: ReactNode;
}) => (
  <section id={id} className={cx('page-section', className)}>
    <div className="page-section__head">
      <div className="page-section__titles">
        <h2 className="glass-h2">
          {id ? (
            <a href={`#${id}`} className="anchor">
              {title}
            </a>
          ) : (
            title
          )}
        </h2>
        {lede && <p className="glass-lede">{lede}</p>}
      </div>
      {aside}
    </div>
    {children}
  </section>
);

/** A standalone page in the default container. */
export const Page = ({ children, width }: { children: ReactNode; width?: 'default' | 'wide' | 'narrow' }) => (
  <GlassContainer width={width} className="page">
    {children}
  </GlassContainer>
);

/** Inline code in running text. */
export const InlineCode = ({ children }: { children: ReactNode }) => <code className="glass-code">{children}</code>;

export interface PropRow {
  name: string;
  type: string;
  default?: string;
  description: ReactNode;
}

/** Props as a list of name, type, default and what it does. */
export const PropsTable = ({ rows, caption }: { rows: PropRow[]; caption?: string }) => (
  <div className="props">
    {caption && <p className="glass-label props__caption">{caption}</p>}
    <dl className="props__list">
      {rows.map((row) => (
        <div key={row.name} className="props__row">
          <dt className="props__name">
            <code>{row.name}</code>
          </dt>
          <dd className="props__type">
            <code>{row.type}</code>
            {row.default !== undefined && <span className="props__default">Default {row.default}</span>}
          </dd>
          <dd className="props__description">{row.description}</dd>
        </div>
      ))}
    </dl>
  </div>
);

/** Two short lists side by side: what to do and what to avoid. */
export const Guidelines = ({ dos, donts }: { dos: ReactNode[]; donts: ReactNode[] }) => (
  <div className="guidelines">
    <div className="guidelines__col guidelines__col--do">
      <p className="glass-label">Do</p>
      <ul>
        {dos.map((d, i) => (
          <li key={i}>{d}</li>
        ))}
      </ul>
    </div>
    <div className="guidelines__col guidelines__col--dont">
      <p className="glass-label">Avoid</p>
      <ul>
        {donts.map((d, i) => (
          <li key={i}>{d}</li>
        ))}
      </ul>
    </div>
  </div>
);
