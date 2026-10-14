import { useState } from 'react';
import { GlassField, GlassInput } from 'glass-design-system';

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

// Say what's wrong and how to fix it. Validate when the person leaves the
// field, not on every keystroke while they're still typing.
export default function FieldValidation() {
  const [value, setValue] = useState('My Snippet!');
  const [touched, setTouched] = useState(true);
  const error =
    touched && !SLUG.test(value)
      ? 'Use lowercase letters, numbers and hyphens, like my-snippet.'
      : undefined;

  return (
    <div style={{ width: 'min(100%, 22rem)' }}>
      <GlassField label="Address" hint="snippets.example.com/s/your-address" error={error}>
        <GlassInput
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={() => setTouched(true)}
          onFocus={() => setTouched(false)}
          spellCheck={false}
        />
      </GlassField>
    </div>
  );
}
