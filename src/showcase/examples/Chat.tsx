import { useState } from 'react';
import type { FormEvent } from 'react';
import { GlassAvatar, GlassButton, GlassCluster, GlassInput, GlassPanel, GlassStack } from 'glass-design-system';
import { ArrowRightIcon } from '../demos/icons';

interface Message {
  id: number;
  mine: boolean;
  text: string;
}

const START: Message[] = [
  { id: 1, mine: false, text: 'Did the glass knobs ship?' },
  { id: 2, mine: true, text: 'They did. Five CSS variables: blur, opacity, sheen and the two hues.' },
  { id: 3, mine: false, text: 'So I can make the sidebar denser without touching a component?' },
];

// Theirs on subtle glass, yours on medium: depth says who's speaking
// without a new colour.
export default function Chat() {
  const [messages, setMessages] = useState(START);
  const [draft, setDraft] = useState('');

  const send = (e: FormEvent) => {
    e.preventDefault();
    if (!draft.trim()) return;
    setMessages((m) => [...m, { id: Date.now(), mine: true, text: draft.trim() }]);
    setDraft('');
  };

  return (
    <GlassPanel intensity="strong" radius="sheet" padding="none" style={{ width: 'min(100%, 30rem)' }}>
      <GlassCluster gap={3} style={{ padding: 'var(--space-4) var(--space-6)', borderBottom: '1px solid var(--color-line)' }}>
        <GlassAvatar name="Grace Hopper" aria-hidden="true" />
        <GlassStack gap={1}>
          <span className="glass-label" style={{ color: 'var(--color-text)' }}>Grace Hopper</span>
          <span className="glass-caption">Active now</span>
        </GlassStack>
      </GlassCluster>

      <GlassStack gap={3} style={{ padding: 'var(--space-6)' }} aria-live="polite">
        {messages.map((m) => (
          <GlassPanel
            key={m.id}
            intensity={m.mine ? 'medium' : 'subtle'}
            padding="none"
            radius="card"
            pointerLight={false}
            style={{
              alignSelf: m.mine ? 'flex-end' : 'flex-start',
              maxWidth: '80%',
              padding: 'var(--space-3) var(--space-4)',
              borderBottomRightRadius: m.mine ? 'var(--radius-chip)' : undefined,
              borderBottomLeftRadius: m.mine ? undefined : 'var(--radius-chip)',
            }}
          >
            <p className="glass-small" style={{ color: 'var(--color-text)' }}>{m.text}</p>
          </GlassPanel>
        ))}
      </GlassStack>

      <form onSubmit={send} style={{ padding: '0 var(--space-4) var(--space-4)' }}>
        <GlassInput
          aria-label="Message"
          placeholder="Write a message"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          trailing={
            <GlassButton type="submit" icon size="sm" variant="primary" aria-label="Send" disabled={!draft.trim()}>
              <ArrowRightIcon />
            </GlassButton>
          }
          style={{ paddingRight: 'var(--space-1)' }}
        />
      </form>
    </GlassPanel>
  );
}
