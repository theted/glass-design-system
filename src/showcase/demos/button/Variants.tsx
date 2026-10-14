import { GlassButton, GlassCluster } from 'glass-design-system';

export default function ButtonVariants() {
  return (
    <GlassCluster gap={3} justify="center">
      <GlassButton variant="primary">Publish</GlassButton>
      <GlassButton>Save draft</GlassButton>
      <GlassButton variant="ghost">Cancel</GlassButton>
      <GlassButton variant="danger">Delete</GlassButton>
    </GlassCluster>
  );
}
