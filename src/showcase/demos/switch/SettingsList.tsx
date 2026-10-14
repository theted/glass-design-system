import { useState } from 'react';
import { GlassCluster, GlassDivider, GlassPanel, GlassStack, GlassSwitch } from 'glass-design-system';

const SETTINGS = [
  { id: 'replies', label: 'Replies', description: 'When someone answers one of your snippets.' },
  { id: 'mentions', label: 'Mentions', description: 'When someone tags you in a comment.' },
  { id: 'digest', label: 'Weekly digest', description: 'A Monday summary of what was copied most.' },
];

// When the label needs a description, lay out the row yourself and name
// the switch with aria-labelledby.
export default function SwitchSettingsList() {
  const [on, setOn] = useState<Record<string, boolean>>({ replies: true, mentions: true, digest: false });

  return (
    <GlassPanel intensity="subtle" radius="card" padding="sm" style={{ width: 'min(100%, 26rem)' }}>
      <GlassStack gap={4}>
        {SETTINGS.map((s, i) => (
          <GlassStack key={s.id} gap={4}>
            {i > 0 && <GlassDivider />}
            <GlassCluster gap={6} justify="between" style={{ flexWrap: 'nowrap' }}>
              <div>
                <p id={`setting-${s.id}`} className="glass-label" style={{ color: 'var(--color-text)' }}>
                  {s.label}
                </p>
                <p className="glass-caption">{s.description}</p>
              </div>
              <GlassSwitch
                aria-labelledby={`setting-${s.id}`}
                checked={on[s.id]}
                onChange={(value) => setOn((prev) => ({ ...prev, [s.id]: value }))}
              />
            </GlassCluster>
          </GlassStack>
        ))}
      </GlassStack>
    </GlassPanel>
  );
}
