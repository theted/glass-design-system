import { GLASS_PALETTES, GLASS_TEXTURES, GlassBackdrop, GlassButton, GlassDivider, GlassSegmented, GlassSlider, GlassSwitch } from 'glass-design-system';
import type { GlassTexture } from 'glass-design-system';
import { useTheme } from './theme';

const capitalise = (s: string) => s[0].toUpperCase() + s.slice(1);

/**
 * The site's theme: the five material knobs (fed to the GlassProvider
 * around every page) and the backdrop. Each palette swatch is a real,
 * still backdrop at swatch size.
 */
export const ThemeControls = () => {
  const { theme, setTheme, resetTheme, isDefault } = useTheme();

  return (
    <div className="theme-controls">
      <div className="theme-controls__head">
        <div>
          <h2 className="glass-h4">Theme</h2>
          <p className="glass-caption">Every pane on this site follows these.</p>
        </div>
        <GlassButton size="xs" variant="ghost" onClick={resetTheme} disabled={isDefault}>
          Reset
        </GlassButton>
      </div>

      <div className="theme-controls__group">
        <GlassSlider label="Blur" min={0} max={80} value={theme.blur} onChange={(blur) => setTheme({ blur })} format={(v) => `${v}px`} />
        <GlassSlider label="Opacity" min={0} max={1} step={0.01} value={theme.opacity} onChange={(opacity) => setTheme({ opacity })} format={(v) => v.toFixed(2)} />
        <GlassSlider label="Sheen" min={0} max={0.6} step={0.01} value={theme.sheen} onChange={(sheen) => setTheme({ sheen })} format={(v) => v.toFixed(2)} />
        <GlassSlider label="Glass hue" className="hue-track" min={0} max={359} value={theme.hue} onChange={(hue) => setTheme({ hue })} format={(v) => `${v}°`} />
        <GlassSlider label="Light hue" className="hue-track" min={0} max={359} value={theme.lightHue} onChange={(lightHue) => setTheme({ lightHue })} format={(v) => `${v}°`} />
      </div>

      <GlassDivider />

      <div className="theme-controls__group">
        <p className="glass-label">Backdrop</p>
        <div className="palette-picker" role="radiogroup" aria-label="Backdrop palette">
          {GLASS_PALETTES.map((palette) => (
            <button
              key={palette}
              type="button"
              role="radio"
              aria-checked={theme.palette === palette}
              className="palette-picker__option"
              onClick={() => setTheme({ palette })}
            >
              <span className="palette-picker__swatch glass-stage">
                <GlassBackdrop palette={palette} motion={false} />
              </span>
              {capitalise(palette)}
            </button>
          ))}
        </div>
        <GlassSegmented
          size="sm"
          block
          aria-label="Texture"
          options={GLASS_TEXTURES.map((t) => ({ value: t, label: capitalise(t) }))}
          value={theme.texture}
          onChange={(texture: GlassTexture) => setTheme({ texture })}
        />
        <GlassSwitch block size="sm" checked={theme.motion} onChange={(motion) => setTheme({ motion })}>
          Drifting light
        </GlassSwitch>
      </div>
    </div>
  );
};
