// Styles ship separately: import 'glass-design-system/styles' once at the
// app root. (Imported here so the library build bundles them into
// dist/glass.css.)
import './styles/index.css';

// Knobs
export { GlassProvider, useGlass, glassVars, GLASS_DEFAULTS } from './components/GlassProvider';
export type { GlassConfig, GlassProviderProps } from './components/GlassProvider';

// Surfaces
export { GlassPanel } from './components/GlassPanel';
export type { GlassPanelProps, GlassPanelOwnProps, GlassIntensity, GlassPadding, GlassRadius } from './components/GlassPanel';
export { GlassBackdrop, GLASS_PALETTES, GLASS_TEXTURES } from './components/GlassBackdrop';
export type { GlassBackdropProps, GlassPalette, GlassTexture } from './components/GlassBackdrop';

// Actions
export { GlassButton } from './components/GlassButton';
export type { GlassButtonProps, GlassButtonOwnProps, GlassButtonVariant, GlassButtonSize } from './components/GlassButton';

// Forms
export { GlassField, useGlassField } from './components/GlassField';
export type { GlassFieldProps } from './components/GlassField';
export { GlassInput, GlassTextarea, GlassSelect } from './components/GlassInput';
export type { GlassInputProps, GlassTextareaProps, GlassSelectProps, GlassControlSize } from './components/GlassInput';
export { GlassCheckbox, GlassRadio } from './components/GlassCheckbox';
export type { GlassCheckboxProps, GlassRadioProps } from './components/GlassCheckbox';
export { GlassSwitch } from './components/GlassSwitch';
export type { GlassSwitchProps } from './components/GlassSwitch';
export { GlassSlider } from './components/GlassSlider';
export type { GlassSliderProps } from './components/GlassSlider';
export { GlassSegmented } from './components/GlassSegmented';
export type { GlassSegmentedProps, GlassSegmentedOption } from './components/GlassSegmented';

// Navigation and overlays
export { GlassNav } from './components/GlassNav';
export type { GlassNavProps } from './components/GlassNav';
export { GlassDialog } from './components/GlassDialog';
export type { GlassDialogProps } from './components/GlassDialog';
export { GlassPopover, GlassMenu, GlassMenuItem } from './components/GlassPopover';
export type { GlassPopoverProps, GlassPopoverPlacement, GlassMenuItemProps } from './components/GlassPopover';

// Display
export { GlassAvatar } from './components/GlassAvatar';
export type { GlassAvatarProps } from './components/GlassAvatar';
export { GlassBadge, GlassKbd } from './components/GlassBadge';
export type { GlassBadgeProps, GlassKbdProps, GlassTone } from './components/GlassBadge';
export { GlassDivider } from './components/GlassDivider';
export type { GlassDividerProps } from './components/GlassDivider';
export { GlassToast } from './components/GlassToast';
export type { GlassToastProps, GlassToastTone } from './components/GlassToast';

// Layout
export { GlassContainer, GlassStack, GlassCluster, GlassGrid, GlassSplit } from './components/layout';
export type {
  GlassContainerProps,
  GlassStackProps,
  GlassClusterProps,
  GlassGridProps,
  GlassSplitProps,
} from './components/layout';

// Hooks for your own glass
export { useGlassPointer, GLASS_REST } from './hooks/useGlassPointer';
export { useGlassReveal } from './hooks/useGlassReveal';
export { useGlassIndicator } from './hooks/useGlassIndicator';

// Helpers
export { cx } from './utils';
export type { PolymorphicProps, SpaceStep } from './utils';
