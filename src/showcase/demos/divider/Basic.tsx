import { GlassButton, GlassCluster, GlassDivider, GlassStack } from 'glass-design-system';
import { GithubIcon } from '../icons';

// Reach for space first; a divider is for groups that a gap alone doesn't
// separate enough.
export default function DividerBasic() {
  return (
    <GlassStack gap={6} style={{ width: 'min(100%, 22rem)' }}>
      <GlassButton block>
        <GithubIcon /> Continue with GitHub
      </GlassButton>
      <GlassDivider label="or" />
      <GlassCluster justify="center" gap={4} style={{ flexWrap: 'nowrap' }}>
        <span className="glass-small">Snippets</span>
        <GlassDivider orientation="vertical" />
        <span className="glass-small">Collections</span>
        <GlassDivider orientation="vertical" />
        <span className="glass-small">Archive</span>
      </GlassCluster>
      <GlassDivider />
    </GlassStack>
  );
}
