import { useMemo, useState } from 'react';
import { highlight } from 'sugar-high';
import { GlassButton, cx } from 'glass-design-system';
import { CheckIcon, CopyIcon } from '../demos/icons';

/** Highlighted code. `inline` for a single line that wraps instead of scrolling. */
export const Code = ({ children, className }: { children: string; className?: string }) => {
  const html = useMemo(() => highlight(children), [children]);
  return (
    <pre className={cx('code', className)}>
      <code dangerouslySetInnerHTML={{ __html: html }} />
    </pre>
  );
};

const useCopy = (text: string) => {
  const [copied, setCopied] = useState(false);
  const copy = () =>
    navigator.clipboard?.writeText(text).then(
      () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
      },
      () => setCopied(false),
    );
  return { copied, copy };
};

export const CopyButton = ({ text, label = 'Copy' }: { text: string; label?: string }) => {
  const { copied, copy } = useCopy(text);
  return (
    <GlassButton size="xs" variant="ghost" onClick={copy} aria-label={copied ? 'Copied' : `${label} code`}>
      {copied ? <CheckIcon /> : <CopyIcon />}
      {copied ? 'Copied' : label}
    </GlassButton>
  );
};

const COLLAPSED_LINES = 14;

/**
 * A recessed block of code with a copy button. Long code starts folded to
 * its first lines; `collapsible={false}` always shows it all.
 */
export const CodeBlock = ({
  children,
  title,
  collapsible = true,
  className,
}: {
  children: string;
  title?: string;
  collapsible?: boolean;
  className?: string;
}) => {
  const lines = children.split('\n').length;
  const foldable = collapsible && lines > COLLAPSED_LINES + 4;
  const [open, setOpen] = useState(!foldable);

  return (
    <div className={cx('code-block', !open && 'code-block--folded', className)}>
      <div className="code-block__bar">
        <span className="code-block__title">{title ?? (lines === 1 ? 'Shell' : 'TSX')}</span>
        <CopyButton text={children} />
      </div>
      <Code>{children}</Code>
      {foldable && (
        <div className="code-block__fold">
          <GlassButton size="xs" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
            {open ? 'Show less' : `Show all ${lines} lines`}
          </GlassButton>
        </div>
      )}
    </div>
  );
};

/** A one-line command or snippet, wrapping rather than scrolling. */
export const Snippet = ({ children }: { children: string }) => (
  <div className="snippet">
    <Code className="code--inline">{children}</Code>
    <CopyButton text={children} />
  </div>
);
