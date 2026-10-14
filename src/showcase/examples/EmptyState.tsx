import { GlassButton, GlassCluster, GlassPanel, GlassStack } from 'glass-design-system';
import { PlusIcon, SearchIcon } from '../demos/icons';

// An empty screen says what will appear here and how to make the first one.
export default function EmptyState() {
  return (
    <GlassStack gap={8} style={{ width: 'min(100%, 28rem)', alignItems: 'center', textAlign: 'center' }}>
      <GlassPanel intensity="strong" radius="round" padding="none" prism glow style={{ display: 'grid', placeItems: 'center', width: '6rem', height: '6rem', color: 'var(--color-light)' }}>
        <SearchIcon width="2.25rem" height="2.25rem" />
      </GlassPanel>
      <GlassStack gap={3}>
        <h2 className="glass-h2">No snippets yet</h2>
        <p className="glass-body">
          Snippets you save show up here, newest first. Paste some code to save
          your first, or import a GitHub gist.
        </p>
      </GlassStack>
      <GlassCluster gap={3} justify="center">
        <GlassButton variant="primary" size="lg">
          <PlusIcon /> New snippet
        </GlassButton>
        <GlassButton size="lg">Import a gist</GlassButton>
      </GlassCluster>
    </GlassStack>
  );
}
