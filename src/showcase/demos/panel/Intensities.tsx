import { GlassGrid, GlassPanel } from 'glass-design-system';

const TIERS = [
  { intensity: 'subtle', use: 'Page regions, sidebars, list rows. The furthest pane.' },
  { intensity: 'medium', use: 'Cards and content. The default.' },
  { intensity: 'strong', use: 'Dialogs, popovers, forms in focus. The closest pane.' },
] as const;

export default function PanelIntensities() {
  return (
    <GlassGrid min="13rem" style={{ width: '100%' }}>
      {TIERS.map(({ intensity, use }) => (
        <GlassPanel key={intensity} intensity={intensity} radius="card">
          <h3 className="glass-h4">{intensity}</h3>
          <p className="glass-small">{use}</p>
        </GlassPanel>
      ))}
    </GlassGrid>
  );
}
