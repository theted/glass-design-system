import { useState } from 'react';
import {
  GlassButton,
  GlassDivider,
  GlassPanel,
  GlassProvider,
  GlassSegmented,
  GlassSlider,
  GlassSplit,
  GlassStack,
  GlassSwitch,
} from 'glass-design-system';
import { BellIcon, LockIcon, SunIcon, UserIcon } from '../demos/icons';

const SECTIONS = [
  { id: 'account', label: 'Account', icon: <UserIcon /> },
  { id: 'notifications', label: 'Notifications', icon: <BellIcon /> },
  { id: 'appearance', label: 'Appearance', icon: <SunIcon /> },
  { id: 'privacy', label: 'Privacy', icon: <LockIcon /> },
];

export default function Settings() {
  const [section, setSection] = useState('appearance');
  const [theme, setTheme] = useState('Dark');
  const [size, setSize] = useState(16);
  const [blur, setBlur] = useState(40);
  const [motion, setMotion] = useState(true);
  const [contrast, setContrast] = useState(false);

  return (
    // This window has its own provider: its sliders retune only it.
    <GlassProvider blur={blur} opacity={contrast ? 0.95 : undefined}>
      <GlassPanel intensity="strong" radius="sheet" padding="none" style={{ width: 'min(100%, 46rem)', overflow: 'hidden' }}>
        <GlassSplit side="12rem" gap={1}>
          <nav aria-label="Settings" style={{ padding: 'var(--space-4)', borderRight: '1px solid var(--color-line)' }}>
            <GlassStack gap={1}>
              <p className="glass-caption" style={{ padding: 'var(--space-2) var(--space-3)' }}>Settings</p>
              {SECTIONS.map((s) => (
                <GlassButton
                  key={s.id}
                  variant="ghost"
                  aria-current={section === s.id ? 'page' : undefined}
                  onClick={() => setSection(s.id)}
                  style={{ justifyContent: 'flex-start' }}
                >
                  {s.icon} {s.label}
                </GlassButton>
              ))}
            </GlassStack>
          </nav>

          <GlassStack gap={8} style={{ padding: 'var(--space-8)' }}>
            <GlassStack gap={2}>
              <h2 className="glass-h3">Appearance</h2>
              <p className="glass-small">Changes apply right away, on this device only.</p>
            </GlassStack>

            <GlassStack gap={6}>
              <GlassStack gap={3}>
                <span className="glass-label">Theme</span>
                <GlassSegmented aria-label="Theme" options={['Auto', 'Dark', 'Darker']} value={theme} onChange={setTheme} />
              </GlassStack>
              <GlassSlider label="Text size" min={14} max={20} value={size} onChange={setSize} format={(v) => `${v}px`} />
              <p style={{ fontSize: size, color: 'var(--color-text)', margin: 0 }}>The quick brown fox, frosted.</p>
              <GlassSlider label="Glass blur" min={0} max={80} value={blur} onChange={setBlur} format={(v) => `${v}px`} />
            </GlassStack>

            <GlassDivider />

            <GlassStack gap={4}>
              <GlassSwitch block checked={motion} onChange={setMotion}>Animations</GlassSwitch>
              <GlassSwitch block checked={contrast} onChange={setContrast}>Denser glass behind text</GlassSwitch>
            </GlassStack>
          </GlassStack>
        </GlassSplit>
      </GlassPanel>
    </GlassProvider>
  );
}
