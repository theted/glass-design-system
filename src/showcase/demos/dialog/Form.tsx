import { useState } from 'react';
import type { FormEvent } from 'react';
import { GlassButton, GlassDialog, GlassField, GlassInput, GlassSelect, GlassStack } from 'glass-design-system';
import { PlusIcon } from '../icons';

// A form in a dialog. Focus starts in the first field. The footer's submit
// button points at the form with form="…", so Enter in a field submits too.
export default function DialogForm() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  const create = (e: FormEvent) => {
    e.preventDefault();
    close();
  };

  return (
    <>
      <GlassButton variant="primary" onClick={() => setOpen(true)}>
        <PlusIcon /> New collection
      </GlassButton>
      <GlassDialog
        open={open}
        onClose={close}
        title="New collection"
        description="Group snippets you reach for together."
        footer={
          <>
            <GlassButton variant="ghost" onClick={close}>Cancel</GlassButton>
            <GlassButton variant="primary" type="submit" form="new-collection">Create collection</GlassButton>
          </>
        }
      >
        <GlassStack as="form" id="new-collection" gap={6} onSubmit={create}>
          <GlassField label="Name" required>
            <GlassInput placeholder="React hooks" />
          </GlassField>
          <GlassField label="Who can see it">
            <GlassSelect defaultValue="private">
              <option value="private">Only me</option>
              <option value="link">Anyone with the link</option>
            </GlassSelect>
          </GlassField>
        </GlassStack>
      </GlassDialog>
    </>
  );
}
