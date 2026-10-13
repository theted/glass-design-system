// CSS tokens and utilities — consumers import via 'glass-design-system/styles'
import './glass.css';
import './material.css';
import './foundations.css';

// Context / provider
export { GlassProvider, useGlass, GLASS_DEFAULTS } from './context/GlassContext';
export type { GlassConfig } from './context/GlassContext';

// Core config
export {
  getGlassStyles,
  GLASS_OPACITY,
  GLASS_BLUR,
  GLASS_LIGHT_ALPHA,
  GLASS_SHADOW_ALPHA,
  CARD_BG_ALPHA,
  GLOW_TR,
  GLOW_BL,
} from './glass';
export type { GlassIntensity, GlassStyles } from './glass';

// Material hooks — drive the glass light from the pointer on custom surfaces
export { useGlassPointer, useGlassReveal, GLASS_REST_ANGLE } from './hooks/useGlassPointer';

// Patterns
export { PATTERNS } from './patterns';
export type { PatternDef, PatternId } from './patterns';

// Backgrounds
export { BG_PRESETS, makeHueGradient } from './backgrounds';
export type { BgPreset, BgId } from './backgrounds';

// Components
export { default as GlassOrbs } from './components/GlassOrbs';
export type { OrbPreset, OrbBlendMode, GlassOrbsProps } from './components/GlassOrbs';
export { default as GlassPanel } from './components/GlassPanel';
export type { GlassPanelPadding } from './components/GlassPanel';
export { default as GlassPill } from './components/GlassPill';
export type { GlassPillSize, GlassPillVariant } from './components/GlassPill';
export { default as GlassDivider } from './components/GlassDivider';
export {
  default as GlassInput,
  GlassInputWrap,
  GlassTextarea,
} from './components/GlassInput';
export type { GlassInputVariant } from './components/GlassInput';
export { default as GlassToast } from './components/GlassToast';
export type { GlassToastProps, GlassToastTone } from './components/GlassToast';
export { default as GlassSwitch } from './components/GlassSwitch';
export type { GlassSwitchProps } from './components/GlassSwitch';
export { default as GlassSlider } from './components/GlassSlider';
export type { GlassSliderProps } from './components/GlassSlider';
export { default as GlassSegmented } from './components/GlassSegmented';
export type { GlassSegmentedProps, GlassSegmentedOption } from './components/GlassSegmented';
