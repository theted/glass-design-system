import { GlassField, GlassInput, GlassStack } from 'glass-design-system';

// GlassField wires the label, hint and error to the control inside it:
// ids, aria-describedby and aria-invalid are handled for you.
export default function FieldBasic() {
  return (
    <GlassStack gap={6} style={{ width: 'min(100%, 22rem)' }}>
      <GlassField label="Name">
        <GlassInput autoComplete="name" placeholder="Ada Lovelace" />
      </GlassField>
      <GlassField label="Email" hint="Only used to reply to you.">
        <GlassInput type="email" autoComplete="email" placeholder="ada@example.com" />
      </GlassField>
      <GlassField label="Company" optional>
        <GlassInput autoComplete="organization" />
      </GlassField>
    </GlassStack>
  );
}
