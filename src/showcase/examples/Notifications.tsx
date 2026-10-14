import { useState } from 'react';
import { GlassAvatar, GlassButton, GlassCluster, GlassPanel, GlassSegmented, GlassStack } from 'glass-design-system';

const INITIAL = [
  { id: 1, who: 'Grace Hopper', text: 'replied to your snippet retry-with-backoff.go', when: '2 min ago', mention: false, unread: true },
  { id: 2, who: 'Alan Turing', text: 'mentioned you: “@ada this is the one I meant”', when: '20 min ago', mention: true, unread: true },
  { id: 3, who: 'Katherine Johnson', text: 'starred oklch-mix.css', when: 'Yesterday', mention: false, unread: false },
  { id: 4, who: 'Linus Torvalds', text: 'mentioned you in Shell one-liners', when: 'Monday', mention: true, unread: false },
];

export default function Notifications() {
  const [items, setItems] = useState(INITIAL);
  const [show, setShow] = useState<'All' | 'Mentions'>('All');
  const unread = items.filter((n) => n.unread).length;
  const shown = items.filter((n) => show === 'All' || n.mention);

  return (
    <GlassPanel intensity="strong" radius="sheet" padding="none" style={{ width: 'min(100%, 28rem)' }}>
      <GlassStack gap={4} style={{ padding: 'var(--space-6) var(--space-6) var(--space-4)' }}>
        <GlassCluster justify="between">
          <h2 className="glass-h3">Notifications</h2>
          <GlassButton size="sm" variant="ghost" disabled={!unread} onClick={() => setItems(items.map((n) => ({ ...n, unread: false })))}>
            Mark all as read
          </GlassButton>
        </GlassCluster>
        <GlassSegmented block size="sm" aria-label="Show" options={['All', 'Mentions']} value={show} onChange={setShow} />
      </GlassStack>

      <ul style={{ margin: 0, padding: '0 var(--space-3) var(--space-3)', listStyle: 'none' }}>
        {shown.map((n) => (
          <li key={n.id}>
            <button
              type="button"
              className="glass-menu__item"
              onClick={() => setItems(items.map((m) => (m.id === n.id ? { ...m, unread: false } : m)))}
              style={{ alignItems: 'flex-start', gap: 'var(--space-3)', padding: 'var(--space-3)', minHeight: 0 }}
            >
              <GlassAvatar name={n.who} aria-hidden="true" />
              <GlassStack gap={1} style={{ flex: 1, minWidth: 0 }}>
                <span style={{ color: n.unread ? 'var(--color-text)' : 'var(--color-text-muted)', fontWeight: 400, lineHeight: 1.45 }}>
                  <strong style={{ fontWeight: 600 }}>{n.who}</strong> {n.text}
                </span>
                <span className="glass-caption">{n.when}</span>
              </GlassStack>
              {n.unread && (
                <span aria-label="Unread" style={{ width: 8, height: 8, marginTop: 6, borderRadius: '50%', background: 'var(--color-light)', boxShadow: '0 0 8px var(--color-light)' }} />
              )}
            </button>
          </li>
        ))}
      </ul>
    </GlassPanel>
  );
}
