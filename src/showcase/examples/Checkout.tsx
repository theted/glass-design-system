import { useState } from 'react';
import type { FormEvent } from 'react';
import {
  GlassButton,
  GlassCheckbox,
  GlassCluster,
  GlassDivider,
  GlassField,
  GlassGrid,
  GlassInput,
  GlassPanel,
  GlassSplit,
  GlassStack,
  GlassToast,
} from 'glass-design-system';
import { LockIcon } from '../demos/icons';

const LINES = [
  { item: 'Pro, yearly', price: 470 },
  { item: 'Extra seat × 2', price: 180 },
];
const VAT = 0.25;

const kr = (n: number) => `${n.toLocaleString('sv-SE')} kr`;

export default function Checkout() {
  const [paying, setPaying] = useState(false);
  const [paid, setPaid] = useState(false);
  const subtotal = LINES.reduce((sum, l) => sum + l.price, 0);
  const total = Math.round(subtotal * (1 + VAT));

  const pay = (e: FormEvent) => {
    e.preventDefault();
    setPaying(true);
    setTimeout(() => {
      setPaying(false);
      setPaid(true);
    }, 1400);
  };

  return (
    <GlassSplit side="17rem" sideAt="end" gap={4} style={{ width: 'min(100%, 52rem)' }}>
      <GlassPanel as="form" onSubmit={pay} intensity="strong" radius="sheet">
        <GlassStack gap={6}>
          <h2 className="glass-h3">Payment</h2>
          <GlassField label="Name on card">
            <GlassInput autoComplete="cc-name" defaultValue="Ada Lovelace" />
          </GlassField>
          <GlassField label="Card number">
            <GlassInput inputMode="numeric" autoComplete="cc-number" placeholder="1234 1234 1234 1234" trailing={<LockIcon />} />
          </GlassField>
          <GlassGrid min="8rem" gap={4}>
            <GlassField label="Expires">
              <GlassInput autoComplete="cc-exp" placeholder="MM / YY" />
            </GlassField>
            <GlassField label="CVC" hint="Three digits on the back.">
              <GlassInput inputMode="numeric" autoComplete="cc-csc" maxLength={4} />
            </GlassField>
          </GlassGrid>
          <GlassCheckbox label="Save this card for next time" />
          <GlassButton type="submit" variant="primary" size="lg" block loading={paying}>
            Pay {kr(total)}
          </GlassButton>
        </GlassStack>
      </GlassPanel>

      <GlassPanel intensity="subtle" radius="sheet" padding="sm">
        <GlassStack gap={4}>
          <h3 className="glass-h4">Order</h3>
          {LINES.map((l) => (
            <GlassCluster key={l.item} justify="between" className="glass-small">
              <span>{l.item}</span>
              <span style={{ fontVariantNumeric: 'tabular-nums' }}>{kr(l.price)}</span>
            </GlassCluster>
          ))}
          <GlassCluster justify="between" className="glass-small">
            <span>VAT 25%</span>
            <span style={{ fontVariantNumeric: 'tabular-nums' }}>{kr(total - subtotal)}</span>
          </GlassCluster>
          <GlassDivider />
          <GlassCluster justify="between">
            <span className="glass-label">Total</span>
            <span className="glass-h3" style={{ fontVariantNumeric: 'tabular-nums' }}>{kr(total)}</span>
          </GlassCluster>
        </GlassStack>
      </GlassPanel>

      <GlassToast open={paid} onClose={() => setPaid(false)}>
        Paid {kr(total)}. A receipt is on its way to your inbox.
      </GlassToast>
    </GlassSplit>
  );
}
