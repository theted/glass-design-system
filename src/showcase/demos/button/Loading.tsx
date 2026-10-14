import { useState } from 'react';
import { GlassButton, GlassCluster } from 'glass-design-system';

// `loading` keeps the label in place (so the width doesn't jump), lays a
// spinner over it and sets aria-busy.
export default function ButtonLoading() {
  const [saving, setSaving] = useState(false);

  const save = () => {
    setSaving(true);
    setTimeout(() => setSaving(false), 1800);
  };

  return (
    <GlassCluster gap={3} justify="center">
      <GlassButton variant="primary" loading={saving} onClick={save}>
        Save changes
      </GlassButton>
      <GlassButton loading>Uploading</GlassButton>
    </GlassCluster>
  );
}
