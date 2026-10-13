import React from 'react';
import { GlassDivider, GlassPill, GlassSlider } from 'glass-design-system';
import { BG_PRESETS, PATTERNS, useBackground } from '../context/BackgroundContext';

/**
 * The site's theme controls: the four material knobs (fed to the
 * GlassProvider around every page), the backdrop and the pattern overlay.
 */
const ThemePanel: React.FC = () => {
  const {
    glass, setGlass, resetGlass,
    bgId, customHue, backdropIntensity, patternId, copied,
    setBgId, setCustomHue, setBackdropIntensity, setPatternId, handleCopy,
  } = useBackground();

  return (
    <div className="theme-panel">
      <section className="glass-stack [--stack:var(--space-4)]">
        <div className="theme-panel__head">
          <h2 className="glass-h4">Material</h2>
          <GlassPill size="xs" variant="ghost" onClick={resetGlass}>Reset</GlassPill>
        </div>
        <p className="glass-small -mt-2">Every pane on this site follows these.</p>
        <GlassSlider label="Blur" min={0} max={80} value={glass.blur} onChange={(blur) => setGlass({ blur })} format={(v) => `${v}px`} />
        <GlassSlider label="Opacity" min={0} max={1} step={0.01} value={glass.opacity} onChange={(opacity) => setGlass({ opacity })} format={(v) => v.toFixed(2)} />
        <GlassSlider label="Light" min={0} max={0.6} step={0.01} value={glass.lightAlpha} onChange={(lightAlpha) => setGlass({ lightAlpha })} format={(v) => v.toFixed(2)} />
        <GlassSlider label="Shadow" min={0} max={0.6} step={0.01} value={glass.shadowAlpha} onChange={(shadowAlpha) => setGlass({ shadowAlpha })} format={(v) => v.toFixed(2)} />
      </section>

      <GlassDivider />

      <section className="glass-stack [--stack:var(--space-3)]">
        <div className="theme-panel__head">
          <h2 className="glass-h4">Backdrop</h2>
          <GlassPill size="xs" variant="ghost" onClick={handleCopy}>{copied ? 'Copied' : 'Copy CSS'}</GlassPill>
        </div>
        <div className="swatch-grid">
          {BG_PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              className="swatch"
              aria-pressed={customHue === null && bgId === preset.id}
              onClick={() => { setBgId(preset.id); setCustomHue(null); }}
            >
              <span className="swatch__chip" style={{ background: preset.swatch }} />
              {preset.label}
            </button>
          ))}
        </div>
        <GlassSlider
          label="Custom hue"
          className="hue-slider"
          min={0}
          max={359}
          value={customHue ?? 240}
          onChange={(v) => setCustomHue(v)}
          format={(v) => (customHue === null ? 'Off' : `${v}°`)}
        />
        <GlassSlider
          label="Custom strength"
          min={0.1}
          max={1.5}
          step={0.05}
          value={backdropIntensity}
          onChange={(v) => { setBackdropIntensity(v); if (customHue === null) setCustomHue(240); }}
          format={(v) => `${Math.round(v * 100)}%`}
        />
      </section>

      <GlassDivider />

      <section className="glass-stack [--stack:var(--space-3)]">
        <h2 className="glass-h4">Pattern</h2>
        <div className="swatch-grid">
          {PATTERNS.map((p) => (
            <button
              key={p.id}
              type="button"
              className="swatch"
              aria-pressed={patternId === p.id}
              onClick={() => setPatternId(p.id)}
            >
              <span
                className="swatch__chip"
                style={p.id === 'none'
                  ? { background: 'oklch(0.18 0.02 254 / 0.6)' }
                  : { backgroundImage: `url("${p.swatch}")`, backgroundSize: 'cover', backgroundColor: 'oklch(0.3 0.05 255)' }}
              />
              {p.label}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ThemePanel;
