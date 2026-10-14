import { GlassBadge, GlassButton, GlassCluster, GlassPanel, GlassSplit, GlassStack } from 'glass-design-system';
import { ExternalIcon, GithubIcon } from '../demos/icons';

const TECH = ['TypeScript', 'WebGPU', 'WGSL', 'Vite'];

// A portfolio feature: the screenshot is a link of its own, a subtle pane
// that tilts; the words sit straight on the backdrop beside it.
export default function ProjectCard() {
  return (
    <GlassSplit side="18rem" sideAt="end" gap={12} style={{ width: 'min(100%, 58rem)', alignItems: 'center' }}>
      <GlassPanel as="a" href="#projectcard" aria-label="Open Particles" intensity="subtle" radius="sheet" padding="none" tilt style={{ padding: '0.6rem' }}>
        <div
          style={{
            aspectRatio: '16 / 10',
            borderRadius: 'calc(var(--radius-sheet) - 0.6rem)',
            background:
              'radial-gradient(ellipse 34% 14% at 50% 56%, oklch(0.95 0.1 80), oklch(0.8 0.17 60) 30%, oklch(0.55 0.2 35 / 0.6) 55%, transparent 75%), radial-gradient(circle at 50% 56%, oklch(0.3 0.1 40 / 0.6), transparent 50%), oklch(0.12 0.02 40)',
          }}
        />
      </GlassPanel>

      <GlassStack gap={6}>
        <GlassStack gap={4}>
          <GlassBadge tone="success" dot style={{ alignSelf: 'flex-start' }}>Live</GlassBadge>
          <h2 className="glass-h1">Particles</h2>
          <p className="glass-body">Millions of glowing particles you steer through 3D space with the mouse, simulated and drawn entirely on the GPU with WebGPU compute shaders.</p>
        </GlassStack>
        <GlassCluster>
          {TECH.map((t) => (
            <GlassBadge key={t}>{t}</GlassBadge>
          ))}
        </GlassCluster>
        <GlassCluster gap={3}>
          <GlassButton as="a" href="#projectcard" variant="primary">
            Visit site <ExternalIcon />
          </GlassButton>
          <GlassButton as="a" href="#projectcard">
            <GithubIcon /> Source
          </GlassButton>
        </GlassCluster>
      </GlassStack>
    </GlassSplit>
  );
}
