import { useState } from 'react';
import { GlassButton, GlassPopover, GlassSegmented, GlassSlider, GlassStack, GlassSwitch } from 'glass-design-system';
import { SlidersIcon } from '../icons';

// padded turns the popover into a small settings pane.
export default function PopoverSettings() {
  const [size, setSize] = useState(15);
  const [wrap, setWrap] = useState(true);
  const [theme, setTheme] = useState('Night');

  return (
    <GlassPopover
      padded
      placement="bottom"
      aria-label="Editor settings"
      trigger={
        <GlassButton>
          <SlidersIcon /> Editor
        </GlassButton>
      }
    >
      <GlassStack gap={6} style={{ width: '17rem' }}>
        <GlassSlider label="Font size" min={12} max={20} value={size} onChange={setSize} format={(v) => `${v}px`} />
        <GlassSegmented block size="sm" aria-label="Theme" options={['Night', 'Dusk', 'Day']} value={theme} onChange={setTheme} />
        <GlassSwitch block size="sm" checked={wrap} onChange={setWrap}>
          Wrap long lines
        </GlassSwitch>
      </GlassStack>
    </GlassPopover>
  );
}
