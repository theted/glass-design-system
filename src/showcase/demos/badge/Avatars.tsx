import { GlassAvatar, GlassCluster } from 'glass-design-system';

// Initials on a tint picked from the name, so the same person always gets
// the same colour. Pass src for a photo.
export default function BadgeAvatars() {
  return (
    <GlassCluster gap={4} justify="center">
      <GlassAvatar name="Ada Lovelace" size="lg" />
      <GlassAvatar name="Grace Hopper" size="lg" />
      <GlassAvatar name="Alan Turing" size="lg" />
      <GlassAvatar name="Katherine Johnson" />
      <GlassAvatar name="Linus Torvalds" size="sm" />
    </GlassCluster>
  );
}
