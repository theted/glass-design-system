import { GlassAvatar, GlassButton, GlassMenu, GlassMenuItem, GlassPopover, GlassStack } from 'glass-design-system';
import { LogoutIcon, SettingsIcon, StarIcon, UserIcon } from '../icons';

// An account menu: a label above the items, placed under the trigger's end.
export default function PopoverAccount() {
  return (
    <GlassPopover
      placement="bottom-end"
      trigger={
        <GlassButton variant="ghost" style={{ paddingLeft: 'var(--space-1)' }}>
          <GlassAvatar name="Ada Lovelace" size="sm" aria-hidden="true" />
          Ada
        </GlassButton>
      }
    >
      {(close) => (
        <GlassMenu aria-label="Account">
          <GlassStack gap={1} className="glass-menu__label">
            <span style={{ color: 'var(--color-text)', fontWeight: 500 }}>Ada Lovelace</span>
            <span>ada@example.com</span>
          </GlassStack>
          <div role="separator" className="glass-menu__separator" />
          <GlassMenuItem icon={<UserIcon />} onClick={close}>Profile</GlassMenuItem>
          <GlassMenuItem icon={<StarIcon />} onClick={close}>Favourites</GlassMenuItem>
          <GlassMenuItem icon={<SettingsIcon />} hint="⌘ ," onClick={close}>Settings</GlassMenuItem>
          <div role="separator" className="glass-menu__separator" />
          <GlassMenuItem icon={<LogoutIcon />} onClick={close}>Sign out</GlassMenuItem>
        </GlassMenu>
      )}
    </GlassPopover>
  );
}
