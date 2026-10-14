import { GlassButton, GlassGrid, GlassPanel, GlassProvider, GlassSwitch } from 'glass-design-system';

const THEMES = [
  { name: 'Cobalt and amber', hue: 262, lightHue: 76 },
  { name: 'Forest and gold', hue: 160, lightHue: 92 },
  { name: 'Plum and coral', hue: 320, lightHue: 40 },
];

// Two hues set the whole palette: --glass-hue for everything cool, and
// --light-hue for the light. A provider retunes only its subtree.
export default function ThemingProvider() {
  return (
    <GlassGrid min="13rem" style={{ width: '100%' }}>
      {THEMES.map(({ name, hue, lightHue }) => (
        <GlassProvider key={name} hue={hue} lightHue={lightHue}>
          <GlassPanel radius="card" glow className="glass-stack">
            <h3 className="glass-h4">{name}</h3>
            <GlassSwitch defaultChecked size="sm">Sync</GlassSwitch>
            <div>
              <GlassButton size="sm" variant="primary">Save</GlassButton>
            </div>
          </GlassPanel>
        </GlassProvider>
      ))}
    </GlassGrid>
  );
}
