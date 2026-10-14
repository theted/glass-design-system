import { useState } from 'react';
import { GlassButton, GlassDialog } from 'glass-design-system';

// Built on <dialog>: focus moves in and stays, Escape closes, and focus
// goes back to the button afterwards. Name the action on the button
// ("Delete"), not "OK".
export default function DialogConfirm() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
      <GlassButton variant="danger" onClick={() => setOpen(true)}>
        Delete snippet
      </GlassButton>
      <GlassDialog
        size="sm"
        open={open}
        onClose={close}
        title="Delete debounce.ts?"
        description="It's removed for good, along with its 14 versions. Links to it stop working."
        footer={
          <>
            <GlassButton variant="ghost" onClick={close}>Keep it</GlassButton>
            <GlassButton variant="danger" onClick={close}>Delete</GlassButton>
          </>
        }
      />
    </>
  );
}
