import { useState } from 'react';
import { GlassBadge, GlassButton, GlassCluster, GlassGrid, GlassPanel, GlassSegmented, GlassStack } from 'glass-design-system';
import { CheckIcon } from '../demos/icons';

const PLANS = [
  { name: 'Hobby', monthly: 0, blurb: 'For your own snippets.', features: ['Unlimited public snippets', 'Search and tags', 'One device'] },
  { name: 'Pro', monthly: 49, blurb: 'For people who live in their snippets.', features: ['Private snippets', 'Sync on every device', 'Version history', 'AI remix'], featured: true },
  { name: 'Team', monthly: 99, blurb: 'Per person, for shared collections.', features: ['Everything in Pro', 'Shared collections', 'Roles and access'] },
];

export default function Pricing() {
  const [billing, setBilling] = useState<'Monthly' | 'Yearly'>('Yearly');
  const price = (monthly: number) => (billing === 'Yearly' ? Math.round(monthly * 0.8) : monthly);

  return (
    <GlassStack gap={8} style={{ width: 'min(100%, 60rem)', alignItems: 'center' }}>
      <GlassSegmented aria-label="Billing" options={['Monthly', 'Yearly']} value={billing} onChange={setBilling} />

      <GlassGrid min="15rem" style={{ width: '100%', alignItems: 'stretch' }}>
        {PLANS.map((plan) => (
          <GlassPanel
            key={plan.name}
            intensity={plan.featured ? 'strong' : 'medium'}
            glow={plan.featured}
            radius="sheet"
            style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}
          >
            <GlassStack gap={3}>
              <GlassCluster justify="between">
                <h3 className="glass-h3">{plan.name}</h3>
                {plan.featured && <GlassBadge tone="light">Most picked</GlassBadge>}
              </GlassCluster>
              <p className="glass-small">{plan.blurb}</p>
            </GlassStack>

            <p style={{ margin: 0 }}>
              <span className="glass-h1" style={{ fontVariantNumeric: 'tabular-nums' }}>{price(plan.monthly)}</span>
              <span className="glass-small"> kr / month</span>
            </p>

            <GlassStack as="ul" gap={3} style={{ margin: 0, padding: 0, listStyle: 'none', flex: 1 }}>
              {plan.features.map((f) => (
                <GlassCluster as="li" key={f} gap={2} className="glass-small" style={{ flexWrap: 'nowrap', color: 'var(--color-text-muted)' }}>
                  <CheckIcon style={{ color: 'var(--color-success)', flex: 'none' }} /> {f}
                </GlassCluster>
              ))}
            </GlassStack>

            <GlassButton block size="lg" variant={plan.featured ? 'primary' : 'secondary'}>
              {plan.monthly === 0 ? 'Start for free' : `Choose ${plan.name}`}
            </GlassButton>
          </GlassPanel>
        ))}
      </GlassGrid>
    </GlassStack>
  );
}
