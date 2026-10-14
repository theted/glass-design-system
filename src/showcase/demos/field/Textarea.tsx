import { useState } from 'react';
import { GlassField, GlassTextarea } from 'glass-design-system';

const MAX = 280;

// autoGrow lets the field grow with the text (where the browser supports
// field-sizing) instead of scrolling inside a tiny box.
export default function FieldTextarea() {
  const [text, setText] = useState('');

  return (
    <div style={{ width: 'min(100%, 26rem)' }}>
      <GlassField label="Description" hint={`${MAX - text.length} characters left`}>
        <GlassTextarea
          autoGrow
          maxLength={MAX}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What does this snippet do, and when would you reach for it?"
        />
      </GlassField>
    </div>
  );
}
