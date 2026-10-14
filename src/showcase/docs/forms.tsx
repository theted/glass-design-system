import { GlassButton, GlassCheckbox, GlassInput, GlassSegmented, GlassSlider, GlassSwitch } from 'glass-design-system';
import { InlineCode } from '../site/Page';
import type { ComponentDoc } from './types';

const noop = () => {};

export const FORMS: ComponentDoc[] = [
  {
    slug: 'button',
    name: 'Button',
    group: 'Actions',
    summary: 'Buttons and links that look like them, in four variants.',
    intro: (
      <>
        Clear glass that frosts over on hover, a spring on press, a warm focus ring. The primary variant is the light
        itself as a surface: one per screen. Render a link with <InlineCode>as="a"</InlineCode> or a router{' '}
        <InlineCode>Link</InlineCode>.
      </>
    ),
    imports: "import { GlassButton } from 'glass-design-system';",
    thumb: (
      <span style={{ display: 'flex', gap: 6 }}>
        <GlassButton size="sm" variant="primary" tabIndex={-1}>Save</GlassButton>
        <GlassButton size="sm" tabIndex={-1}>Cancel</GlassButton>
      </span>
    ),
    demos: [
      { id: 'button/Variants', title: 'Variants', description: 'primary for the one main action, secondary for the rest, ghost for toolbars and "Cancel", danger for the confirm step of something you can’t undo.' },
      { id: 'button/Sizes', title: 'Sizes', description: 'Heights from the control scale, shared with fields.' },
      { id: 'button/Icons', title: 'With icons', description: 'Any svg inside sizes itself. A lone icon needs icon and an aria-label.' },
      { id: 'button/Toggle', title: 'Toggle buttons', description: 'pressed sets aria-pressed; pressed buttons are denser glass.' },
      { id: 'button/Loading', title: 'Loading', description: 'The label keeps its place under a spinner, so nothing jumps.' },
      { id: 'button/Links', title: 'Links', description: 'aria-current shows as selected, so router NavLinks light up on their own.' },
      { id: 'button/Block', title: 'Full width', description: 'Stacked actions on a narrow card or a phone.' },
    ],
    props: [
      {
        rows: [
          { name: 'variant', type: "'secondary' | 'primary' | 'ghost' | 'danger'", default: "'secondary'", description: 'What kind of action this is.' },
          { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg'", default: "'md'", description: '28, 34, 40 or 48px tall.' },
          { name: 'pressed', type: 'boolean', description: 'A toggle’s state. Sets aria-pressed.' },
          { name: 'loading', type: 'boolean', default: 'false', description: 'A spinner over the label; sets aria-busy and ignores presses.' },
          { name: 'icon', type: 'boolean', default: 'false', description: 'Square, for a lone icon.' },
          { name: 'block', type: 'boolean', default: 'false', description: 'Fill the container’s width.' },
          { name: 'as', type: 'ElementType', default: "'button'", description: "'a', Link, NavLink … Buttons default to type=\"button\"." },
        ],
      },
    ],
    css: `<button class="glass-button glass-button--primary">Publish</button>
<a class="glass-button glass-button--ghost glass-button--sm" href="/docs">Docs</a>`,
    guidelines: {
      dos: ['Name the action: “Save changes”, “Delete snippet”.', 'One primary button per screen.', 'Put the primary action last in a row.'],
      donts: ['“OK”, “Submit”, “Click here”.', 'Two primaries side by side.', 'Danger for actions that can be undone; offer Undo instead.'],
    },
  },
  {
    slug: 'field',
    name: 'Field and input',
    group: 'Forms',
    summary: 'Labels, text fields, textareas and selects, wired together.',
    intro: (
      <>
        <InlineCode>GlassField</InlineCode> holds a label, one control, a hint and an error, and wires them together:
        the label points at the control, the hint and error describe it, an error marks it invalid. The controls are
        the native elements cut into recessed wells, so <InlineCode>onChange</InlineCode> is the real event and form
        libraries work as usual.
      </>
    ),
    imports: "import { GlassField, GlassInput, GlassTextarea, GlassSelect } from 'glass-design-system';",
    thumb: <GlassInput size="sm" placeholder="Search" tabIndex={-1} style={{ width: '9rem' }} />,
    demos: [
      { id: 'field/Basic', title: 'Fields', description: 'Visible labels, a hint where it helps, “Optional” on the few that are.' },
      { id: 'field/Validation', title: 'Errors', description: 'What’s wrong and how to fix it, checked when the person leaves the field.' },
      { id: 'field/Adornments', title: 'Icons and suffixes', description: 'leading and trailing put icons, units, keys or a button inside the field.' },
      { id: 'field/Sizes', title: 'Sizes', description: 'Same heights as buttons, so rows line up.' },
      { id: 'field/Textarea', title: 'Textarea', description: 'autoGrow grows with the text where the browser supports field-sizing.' },
      { id: 'field/Select', title: 'Select', description: 'The browser’s own menu, in the same well.' },
      { id: 'field/Form', title: 'A whole form', description: 'Strong glass for a form in focus, fields in a collapsing grid, one primary action.' },
    ],
    props: [
      {
        caption: 'GlassField',
        rows: [
          { name: 'label', type: 'ReactNode', description: 'Always visible. A placeholder isn’t a label.' },
          { name: 'hint', type: 'ReactNode', description: 'One line of help under the control.' },
          { name: 'error', type: 'ReactNode', description: 'What’s wrong and how to fix it. Marks the control invalid.' },
          { name: 'required', type: 'boolean', description: 'Passed to the control.' },
          { name: 'optional', type: 'boolean', description: 'Shows “Optional” after the label.' },
          { name: 'id', type: 'string', description: 'The control’s id; generated when left out.' },
        ],
      },
      {
        caption: 'GlassInput, GlassTextarea, GlassSelect (plus every native prop)',
        rows: [
          { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Input and select: 34, 40 or 48px.' },
          { name: 'invalid', type: 'boolean', description: 'Marks it invalid outside a field.' },
          { name: 'leading / trailing', type: 'ReactNode', description: 'Input only: content inside the field before and after the value.' },
          { name: 'autoGrow', type: 'boolean', default: 'false', description: 'Textarea only: grow with the text.' },
        ],
      },
    ],
    css: `<div class="glass-field">
  <label class="glass-field__label" for="email">Email</label>
  <input class="glass-input" id="email" type="email" aria-describedby="email-hint" />
  <p class="glass-field__hint" id="email-hint">Only used to reply.</p>
</div>`,
    guidelines: {
      dos: ['A label on every field.', 'Errors that say how to fix it.', 'Mark the few optional fields, not the many required ones.'],
      donts: ['Placeholder text as the label.', 'Validating while someone is still typing.', 'Disabling the submit button instead of explaining what’s missing.'],
    },
  },
  {
    slug: 'checkbox',
    name: 'Checkbox and radio',
    group: 'Forms',
    summary: 'Native checkboxes and radios in wells that fill with the light.',
    intro: (
      <>
        The native inputs, restyled. A label and an optional description sit beside the box. Use checkboxes for
        choices that wait for a Save button; for settings that apply immediately, use a switch.
      </>
    ),
    imports: "import { GlassCheckbox, GlassRadio } from 'glass-design-system';",
    thumb: <GlassCheckbox label="Remember" defaultChecked tabIndex={-1} />,
    demos: [
      { id: 'checkbox/Basic', title: 'Checkboxes', description: 'With a description where the label needs one.' },
      { id: 'checkbox/SelectAll', title: 'Select all', description: 'indeterminate shows the dash.' },
      { id: 'checkbox/Radio', title: 'Radios', description: 'One choice from a short list, named by a fieldset and legend.' },
    ],
    props: [
      {
        caption: 'Both, plus every native input prop',
        rows: [
          { name: 'label', type: 'ReactNode', description: 'Text beside the box. Without it, pass aria-label.' },
          { name: 'description', type: 'ReactNode', description: 'A quieter line under the label.' },
          { name: 'invalid', type: 'boolean', description: 'Marks it invalid.' },
          { name: 'indeterminate', type: 'boolean', default: 'false', description: 'Checkbox only: some, not all, of a group.' },
        ],
      },
    ],
    css: `<label class="glass-check">
  <input class="glass-checkbox" type="checkbox" />
  <span class="glass-check__text">Email me</span>
</label>`,
  },
  {
    slug: 'switch',
    name: 'Switch',
    group: 'Forms',
    summary: 'On or off, taking effect immediately.',
    intro: (
      <>
        A recessed track that fills with the light, a thumb that springs across. A{' '}
        <InlineCode>{'<button role="switch">'}</InlineCode>; <InlineCode>onChange</InlineCode> hands you the new state.
      </>
    ),
    imports: "import { GlassSwitch } from 'glass-design-system';",
    thumb: <GlassSwitch defaultChecked aria-label="Example switch" tabIndex={-1} />,
    demos: [
      { id: 'switch/Basic', title: 'Switches', description: 'Controlled, uncontrolled, small and disabled.' },
      { id: 'switch/SettingsList', title: 'A settings list', description: 'Lay out the row yourself and name the switch with aria-labelledby.' },
    ],
    props: [
      {
        rows: [
          { name: 'checked', type: 'boolean', description: 'Controlled state.' },
          { name: 'defaultChecked', type: 'boolean', default: 'false', description: 'Starting state when uncontrolled.' },
          { name: 'onChange', type: '(checked: boolean) => void', description: 'Called with the new state.' },
          { name: 'children', type: 'ReactNode', description: 'The label, before the switch.' },
          { name: 'size', type: "'sm' | 'md'", default: "'md'", description: '36×22 or 44×26px.' },
          { name: 'block', type: 'boolean', default: 'false', description: 'Label left, switch right, across the row.' },
        ],
      },
    ],
    css: `<button class="glass-switch" role="switch" aria-checked="true">
  <span class="glass-switch__thumb"></span>
</button>`,
  },
  {
    slug: 'slider',
    name: 'Slider',
    group: 'Forms',
    summary: 'A range on a recessed track, the filled part lit.',
    intro: <>A native range input. The thumb is a bead of frosted glass; the filled part of the track is the light.</>,
    imports: "import { GlassSlider } from 'glass-design-system';",
    thumb: <GlassSlider aria-label="Example slider" defaultValue={62} onChange={noop} tabIndex={-1} style={{ width: '9rem' }} />,
    demos: [
      { id: 'slider/Basic', title: 'Sliders', description: 'A label, a formatted value, any step.' },
      { id: 'slider/LiveMaterial', title: 'Tuning the glass', description: 'Sliders on the material knobs, scoped to one pane.' },
    ],
    props: [
      {
        rows: [
          { name: 'value / defaultValue', type: 'number', description: 'Controlled or starting value.' },
          { name: 'onChange', type: '(value: number) => void', description: 'Called with the new value as a number.' },
          { name: 'min / max / step', type: 'number', default: '0 / 100 / 1', description: 'The range.' },
          { name: 'label', type: 'ReactNode', description: 'Above the track. Without it, pass aria-label.' },
          { name: 'showValue', type: 'boolean', default: 'true', description: 'Show the value opposite the label.' },
          { name: 'format', type: '(value: number) => string', default: 'String', description: 'Shape the shown value.' },
        ],
      },
    ],
  },
  {
    slug: 'segmented',
    name: 'Segmented',
    group: 'Forms',
    summary: 'Pick one of a few; the selection springs across.',
    intro: (
      <>
        A recessed tray with a pane of glass that springs to whatever you pick. A radio group underneath: arrow keys
        move the selection. Two to five options; for more, use a select.
      </>
    ),
    imports: "import { GlassSegmented } from 'glass-design-system';",
    thumb: <GlassSegmented size="sm" aria-label="Example" options={['Day', 'Week']} value="Week" onChange={noop} />,
    demos: [
      { id: 'segmented/Basic', title: 'Segmented controls', description: 'Strings as their own labels, or value and label pairs.' },
      { id: 'segmented/Filter', title: 'As a filter', description: 'block shares the width between options.' },
    ],
    props: [
      {
        rows: [
          { name: 'options', type: 'T[] | { value: T; label: ReactNode }[]', description: 'Two to five reads best.' },
          { name: 'value', type: 'T', description: 'The selected value.' },
          { name: 'onChange', type: '(value: T) => void', description: 'Called with the picked value.' },
          { name: 'size', type: "'sm' | 'md'", default: "'md'", description: '34 or 40px.' },
          { name: 'block', type: 'boolean', default: 'false', description: 'Fill the container.' },
          { name: 'aria-label', type: 'string', description: 'Names the group.' },
        ],
      },
    ],
  },
];
