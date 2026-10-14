import { useState } from 'react';
import type { FormEvent } from 'react';
import { GlassButton, GlassCluster, GlassField, GlassGrid, GlassInput, GlassPanel, GlassStack, GlassTextarea, GlassToast } from 'glass-design-system';

// A whole form: a strong pane (it's in focus), fields in a grid that
// collapses to one column, the one primary action last.
export default function FieldForm() {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
      (e.target as HTMLFormElement).reset();
    }, 1200);
  };

  return (
    <GlassPanel as="form" onSubmit={submit} intensity="strong" padding="lg" style={{ width: 'min(100%, 36rem)' }}>
      <GlassStack gap={6}>
        <GlassStack gap={2}>
          <h3 className="glass-h3">Let's talk</h3>
          <p className="glass-small">I usually reply within a couple of days.</p>
        </GlassStack>
        <GlassGrid min="12rem" gap={4}>
          <GlassField label="Name" required>
            <GlassInput autoComplete="name" />
          </GlassField>
          <GlassField label="Email" required>
            <GlassInput type="email" autoComplete="email" />
          </GlassField>
        </GlassGrid>
        <GlassField label="Message" required>
          <GlassTextarea rows={5} />
        </GlassField>
        <GlassCluster justify="end">
          <GlassButton type="submit" variant="primary" size="lg" loading={sending}>
            Send message
          </GlassButton>
        </GlassCluster>
      </GlassStack>
      <GlassToast open={sent} onClose={() => setSent(false)}>
        Message sent. I'll get back to you soon.
      </GlassToast>
    </GlassPanel>
  );
}
