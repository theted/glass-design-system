import { useState } from 'react';
import { GlassButton, GlassCluster, GlassToast } from 'glass-design-system';
import type { GlassToastTone } from 'glass-design-system';

const MESSAGES: Record<GlassToastTone, string> = {
  success: 'Snippet saved.',
  error: "Couldn't save. Check your connection and try again.",
  info: 'A newer version of this snippet exists.',
};

// Say what happened in a short sentence. Errors are announced at once;
// everything else waits for a pause.
export default function ToastTones() {
  const [tone, setTone] = useState<GlassToastTone | null>(null);

  return (
    <>
      <GlassCluster gap={3} justify="center">
        {(Object.keys(MESSAGES) as GlassToastTone[]).map((t) => (
          <GlassButton key={t} onClick={() => setTone(t)}>
            Show {t}
          </GlassButton>
        ))}
      </GlassCluster>
      <GlassToast open={tone !== null} tone={tone ?? 'success'} onClose={() => setTone(null)}>
        {tone && MESSAGES[tone]}
      </GlassToast>
    </>
  );
}
