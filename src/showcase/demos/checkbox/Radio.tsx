import { useState } from 'react';
import { GlassRadio, GlassStack } from 'glass-design-system';

const PLANS = [
  { value: 'hobby', label: 'Hobby', description: 'Free. Public snippets, one device.' },
  { value: 'pro', label: 'Pro', description: '49 kr a month. Private snippets, sync everywhere.' },
  { value: 'team', label: 'Team', description: '99 kr per person a month. Shared collections.' },
];

// Radios share a name; a fieldset and legend name the group.
export default function CheckboxRadio() {
  const [plan, setPlan] = useState('pro');

  return (
    <fieldset style={{ border: 0, margin: 0, padding: 0 }}>
      <legend className="glass-label" style={{ marginBottom: 'var(--space-4)' }}>
        Plan
      </legend>
      <GlassStack gap={4}>
        {PLANS.map((p) => (
          <GlassRadio
            key={p.value}
            name="plan"
            value={p.value}
            label={p.label}
            description={p.description}
            checked={plan === p.value}
            onChange={() => setPlan(p.value)}
          />
        ))}
      </GlassStack>
    </fieldset>
  );
}
