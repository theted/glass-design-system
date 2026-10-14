import { useState } from 'react';
import { GlassCheckbox, GlassDivider, GlassStack } from 'glass-design-system';

const FILES = ['debounce.ts', 'useMeasure.tsx', 'retry.go', 'oklch-mix.css'];

// indeterminate is the dash: some, not all, of the group is checked.
export default function CheckboxSelectAll() {
  const [checked, setChecked] = useState(new Set(['retry.go']));
  const all = checked.size === FILES.length;

  const toggle = (file: string) =>
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(file)) next.delete(file);
      else next.add(file);
      return next;
    });

  return (
    <GlassStack gap={3} style={{ width: 'min(100%, 16rem)' }}>
      <GlassCheckbox
        label={`${checked.size} of ${FILES.length} selected`}
        checked={all}
        indeterminate={checked.size > 0 && !all}
        onChange={() => setChecked(all ? new Set() : new Set(FILES))}
      />
      <GlassDivider />
      {FILES.map((file) => (
        <GlassCheckbox key={file} label={file} checked={checked.has(file)} onChange={() => toggle(file)} />
      ))}
    </GlassStack>
  );
}
