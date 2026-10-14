import { useState } from 'react';
import type { FormEvent } from 'react';
import {
  GlassButton,
  GlassCheckbox,
  GlassCluster,
  GlassDivider,
  GlassField,
  GlassInput,
  GlassPanel,
  GlassStack,
} from 'glass-design-system';
import { GithubIcon, LockIcon, MailIcon } from '../demos/icons';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string>();
  const [busy, setBusy] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) {
      setError('Enter the email you signed up with, like ada@example.com.');
      return;
    }
    setError(undefined);
    setBusy(true);
    setTimeout(() => setBusy(false), 1500);
  };

  return (
    <GlassPanel as="form" onSubmit={submit} noValidate intensity="strong" radius="sheet" padding="lg" glow style={{ width: 'min(100%, 26rem)' }}>
      <GlassStack gap={8}>
        <GlassStack gap={3}>
          <h2 className="glass-h2">Welcome back</h2>
          <p className="glass-small">Sign in to pick up where you left off.</p>
        </GlassStack>

        <GlassButton block size="lg">
          <GithubIcon /> Continue with GitHub
        </GlassButton>

        <GlassDivider label="or with email" />

        <GlassStack gap={4}>
          <GlassField label="Email" error={error}>
            <GlassInput type="email" autoComplete="email" leading={<MailIcon />} value={email} onChange={(e) => setEmail(e.target.value)} />
          </GlassField>
          <GlassField label="Password">
            <GlassInput type="password" autoComplete="current-password" leading={<LockIcon />} />
          </GlassField>
          <GlassCluster justify="between">
            <GlassCheckbox label="Keep me signed in" defaultChecked />
            <a href="#sign-in" className="glass-link glass-small">Forgot password?</a>
          </GlassCluster>
        </GlassStack>

        <GlassStack gap={4}>
          <GlassButton type="submit" block size="lg" variant="primary" loading={busy}>
            Sign in
          </GlassButton>
          <p className="glass-small" style={{ textAlign: 'center' }}>
            New here? <a href="#sign-in" className="glass-link">Create an account</a>
          </p>
        </GlassStack>
      </GlassStack>
    </GlassPanel>
  );
}
