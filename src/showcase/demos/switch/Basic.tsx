import { useState } from 'react';
import { GlassStack, GlassSwitch } from 'glass-design-system';

// A switch takes effect immediately; use a checkbox for choices that wait
// for a Save button. onChange hands you the new state.
export default function SwitchBasic() {
  const [wifi, setWifi] = useState(true);
  const [bluetooth, setBluetooth] = useState(false);

  return (
    <GlassStack gap={4}>
      <GlassSwitch checked={wifi} onChange={setWifi}>Wi-Fi</GlassSwitch>
      <GlassSwitch checked={bluetooth} onChange={setBluetooth}>Bluetooth</GlassSwitch>
      <GlassSwitch size="sm" defaultChecked>Small, uncontrolled</GlassSwitch>
      <GlassSwitch disabled>Airplane mode</GlassSwitch>
    </GlassStack>
  );
}
