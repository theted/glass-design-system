import { useState } from 'react';
import type { ReactNode } from 'react';
import { GlassBackdrop, GlassSegmented, cx } from 'glass-design-system';
import { CodeBlock, CopyButton } from './Code';
import { getDemo } from './registry';
import { useTheme } from './theme';

interface DemoProps {
  /** Registry id: 'button/Variants'. */
  id: string;
  title?: ReactNode;
  description?: ReactNode;
  /** 'center' (default) for a few small things; 'fill' lets the demo take the full width. */
  layout?: 'center' | 'fill';
}

/** A live demo over the site's backdrop, with its source underneath. */
export const Demo = ({ id, title, description, layout = 'center' }: DemoProps) => {
  const { Component, source } = getDemo(id);
  return (
    <figure className="demo">
      {(title || description) && (
        <figcaption className="demo__caption">
          {title && <h3 className="glass-h4">{title}</h3>}
          {description && <p className="glass-small demo__description">{description}</p>}
        </figcaption>
      )}
      <div className={cx('demo__stage', `demo__stage--${layout}`)}>
        <Component />
      </div>
      <CodeBlock>{source}</CodeBlock>
    </figure>
  );
};

/**
 * A whole screen on its own backdrop, with a Preview / Code switch. The
 * backdrop holds still so a page of examples stays light on the GPU.
 */
export const Example = ({ id, title, description }: { id: string; title: string; description: ReactNode }) => {
  const { Component, source } = getDemo(id);
  const { theme } = useTheme();
  const [view, setView] = useState<'Preview' | 'Code'>('Preview');
  const anchor = id.replace('examples/', '').toLowerCase();

  return (
    <section id={anchor} className="example">
      <header className="example__head">
        <div className="example__title">
          <h2 className="glass-h3">{title}</h2>
          <p className="glass-small">{description}</p>
        </div>
        <div className="example__tools">
          {view === 'Code' && <CopyButton text={source} />}
          <GlassSegmented size="sm" aria-label={`${title}: view`} options={['Preview', 'Code']} value={view} onChange={setView} />
        </div>
      </header>
      {view === 'Preview' ? (
        <div className="glass-stage example__stage">
          <GlassBackdrop palette={theme.palette} motion={false} texture={theme.texture} />
          <Component />
        </div>
      ) : (
        <CodeBlock collapsible={false} title={`${anchor}.tsx`}>
          {source}
        </CodeBlock>
      )}
    </section>
  );
};
