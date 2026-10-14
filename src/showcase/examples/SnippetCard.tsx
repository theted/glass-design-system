import { useState } from 'react';
import { GlassBadge, GlassButton, GlassCluster, GlassPanel, GlassStack, GlassToast } from 'glass-design-system';
import { CheckIcon, CopyIcon, StarIcon } from '../demos/icons';

const CODE = `export const debounce = <A extends unknown[]>(
  fn: (...args: A) => void,
  ms = 200,
) => {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: A) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
};`;

// A code card: the code sits in a recessed well cut into the pane.
export default function SnippetCard() {
  const [copied, setCopied] = useState(false);
  const [starred, setStarred] = useState(false);

  const copy = () => {
    navigator.clipboard?.writeText(CODE).catch(() => {});
    setCopied(true);
  };

  return (
    <GlassPanel as="article" radius="sheet" padding="sm" style={{ width: 'min(100%, 38rem)' }}>
      <GlassStack gap={4}>
        <GlassCluster justify="between" style={{ alignItems: 'flex-start' }}>
          <GlassStack gap={2}>
            <span className="glass-caption">TypeScript · edited 2 days ago</span>
            <h3 className="glass-h3">debounce</h3>
          </GlassStack>
          <GlassCluster gap={1}>
            <GlassButton icon variant="ghost" size="sm" pressed={starred} aria-label="Star" onClick={() => setStarred(!starred)}>
              <StarIcon style={starred ? { fill: 'currentColor', color: 'var(--color-light)' } : undefined} />
            </GlassButton>
            <GlassButton size="sm" onClick={copy}>
              {copied ? <CheckIcon /> : <CopyIcon />} {copied ? 'Copied' : 'Copy'}
            </GlassButton>
          </GlassCluster>
        </GlassCluster>

        <p className="glass-small">Wait until calls stop for a moment, then run once with the last arguments.</p>

        <pre
          style={{
            margin: 0,
            padding: 'var(--space-4) var(--space-6)',
            overflowX: 'auto',
            borderRadius: 'var(--radius-card)',
            background: 'var(--color-well)',
            boxShadow: 'inset 0 1px 3px oklch(0.04 0.02 var(--glass-hue) / 0.5), inset 0 0 0 1px var(--color-line)',
            color: 'var(--color-text-muted)',
            fontSize: '0.8125rem',
            lineHeight: 1.7,
          }}
        >
          <code>{CODE}</code>
        </pre>

        <GlassCluster>
          <GlassBadge>timing</GlassBadge>
          <GlassBadge>events</GlassBadge>
          <GlassBadge>utilities</GlassBadge>
        </GlassCluster>
      </GlassStack>
      <GlassToast open={copied} onClose={() => setCopied(false)} duration={2500}>
        Copied debounce to the clipboard.
      </GlassToast>
    </GlassPanel>
  );
}
