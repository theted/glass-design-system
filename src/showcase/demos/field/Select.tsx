import { GlassField, GlassGrid, GlassSelect } from 'glass-design-system';

// The browser's own select, in the same well as the text fields. Its menu
// stays native: right on every phone, and accessible for free.
export default function FieldSelect() {
  return (
    <GlassGrid min="12rem" style={{ width: 'min(100%, 28rem)' }}>
      <GlassField label="Language">
        <GlassSelect defaultValue="ts">
          <option value="ts">TypeScript</option>
          <option value="go">Go</option>
          <option value="py">Python</option>
          <option value="rs">Rust</option>
        </GlassSelect>
      </GlassField>
      <GlassField label="Visibility">
        <GlassSelect defaultValue="private">
          <option value="private">Only me</option>
          <option value="link">Anyone with the link</option>
          <option value="public">Public</option>
        </GlassSelect>
      </GlassField>
    </GlassGrid>
  );
}
