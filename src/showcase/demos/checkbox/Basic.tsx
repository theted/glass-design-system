import { GlassCheckbox, GlassStack } from 'glass-design-system';

// Native checkboxes: onChange is the real event, so form libraries work as
// they always do. A description sits quietly under the label.
export default function CheckboxBasic() {
  return (
    <GlassStack gap={4}>
      <GlassCheckbox label="Email me when someone replies" defaultChecked />
      <GlassCheckbox label="Weekly digest" description="The five most-copied snippets, every Monday." />
      <GlassCheckbox label="Product news" disabled />
    </GlassStack>
  );
}
