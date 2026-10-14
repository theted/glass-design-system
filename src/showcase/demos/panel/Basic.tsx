import { GlassButton, GlassCluster, GlassPanel, GlassStack } from 'glass-design-system';

export default function PanelBasic() {
  return (
    <GlassPanel style={{ maxWidth: '24rem' }}>
      <GlassStack>
        <h3 className="glass-h3">Low sun, cold water</h3>
        <p className="glass-body">
          Hover the pane: the rim turns toward your pointer and a faint pool of
          light follows it. Nothing re-renders while it does.
        </p>
        <GlassCluster>
          <GlassButton variant="primary">Listen</GlassButton>
          <GlassButton variant="ghost">Later</GlassButton>
        </GlassCluster>
      </GlassStack>
    </GlassPanel>
  );
}
