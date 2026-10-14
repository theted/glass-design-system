import { GlassButton, GlassMenu, GlassMenuItem, GlassPopover } from 'glass-design-system';
import { ChevronDownIcon, CopyIcon, EditIcon, ExternalIcon, TrashIcon } from '../icons';

// Pass a function as children to get `close`, for items that should close
// the menu. Arrow keys, Home and End move between items; Escape or a press
// outside closes it.
export default function PopoverMenu() {
  return (
    <GlassPopover
      trigger={
        <GlassButton>
          Actions <ChevronDownIcon />
        </GlassButton>
      }
    >
      {(close) => (
        <GlassMenu aria-label="Snippet actions">
          <GlassMenuItem icon={<EditIcon />} hint="E" onClick={close}>Rename</GlassMenuItem>
          <GlassMenuItem icon={<CopyIcon />} hint="⌘ D" onClick={close}>Duplicate</GlassMenuItem>
          <GlassMenuItem as="a" href="#menu" icon={<ExternalIcon />} onClick={close}>Open in new tab</GlassMenuItem>
          <div role="separator" className="glass-menu__separator" />
          <GlassMenuItem danger icon={<TrashIcon />} onClick={close}>Delete</GlassMenuItem>
        </GlassMenu>
      )}
    </GlassPopover>
  );
}
