import { GlassButton, GlassCluster } from 'glass-design-system';
import { CopyIcon, EditIcon, PlusIcon, TrashIcon } from '../icons';

// Icons size themselves to the label. A lone icon needs `icon` (square) and
// an aria-label to say what it does.
export default function ButtonIcons() {
  return (
    <GlassCluster gap={3} justify="center">
      <GlassButton variant="primary">
        <PlusIcon /> New snippet
      </GlassButton>
      <GlassButton>
        <CopyIcon /> Copy
      </GlassButton>
      <GlassCluster gap={1}>
        <GlassButton icon variant="ghost" aria-label="Edit">
          <EditIcon />
        </GlassButton>
        <GlassButton icon variant="ghost" aria-label="Delete">
          <TrashIcon />
        </GlassButton>
      </GlassCluster>
    </GlassCluster>
  );
}
