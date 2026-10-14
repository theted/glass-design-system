import { useCallback, useState } from 'react';
import { GlassButton, GlassToast } from 'glass-design-system';
import { TrashIcon } from '../icons';

// An action at the end of the toast. Prefer undo to "Are you sure?" for
// anything that can be put back.
export default function ToastUndo() {
  const [archived, setArchived] = useState(false);
  const close = useCallback(() => setArchived(false), []);

  return (
    <>
      <GlassButton onClick={() => setArchived(true)}>
        <TrashIcon /> Archive snippet
      </GlassButton>
      <GlassToast
        open={archived}
        onClose={close}
        duration={6000}
        tone="info"
        action={<GlassButton size="sm" onClick={close}>Undo</GlassButton>}
      >
        Moved to the archive.
      </GlassToast>
    </>
  );
}
