// No React component needed: the material is one class. Hovering lights the
// rim from where the light rests (the upper right); add useGlassPointer()
// to make it follow the pointer.
export default function PanelPlainHtml() {
  return (
    <div className="glass glass--strong glass--pad-md glass--glow" style={{ maxWidth: '22rem' }}>
      <h3 className="glass-h3">Just a class</h3>
      <p className="glass-body">
        <code className="glass-code">class="glass glass--strong"</code> on any
        element. Plain HTML, Vue, Svelte: anywhere the stylesheet loads.
      </p>
    </div>
  );
}
