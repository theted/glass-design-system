import { useState } from 'react';
import { GlassSegmented, GlassStack } from 'glass-design-system';

// Pick one of a few. Strings are their own labels; pass { value, label }
// pairs for anything else.
export default function SegmentedBasic() {
  const [view, setView] = useState('Grid');
  const [range, setRange] = useState<'7d' | '30d' | '1y'>('30d');

  return (
    <GlassStack gap={4} style={{ alignItems: 'center' }}>
      <GlassSegmented aria-label="View" options={['Grid', 'List', 'Board']} value={view} onChange={setView} />
      <GlassSegmented
        size="sm"
        aria-label="Range"
        options={[
          { value: '7d', label: '7 days' },
          { value: '30d', label: '30 days' },
          { value: '1y', label: 'Year' },
        ]}
        value={range}
        onChange={setRange}
      />
    </GlassStack>
  );
}
