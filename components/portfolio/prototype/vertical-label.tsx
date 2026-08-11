// PROTOTYPE — running vertical text, magazine-spine style. Shared furniture
// piece for the B1 round's "unusual text placement" direction.

export function VerticalLabel({ text, className = "" }: { text: string; className?: string }) {
  return (
    <div
      className={`pointer-events-none select-none font-mono text-[10px] uppercase tracking-[0.5em] text-black/25 ${className}`}
      style={{ writingMode: "vertical-rl" }}
      aria-hidden="true"
    >
      {text}
    </div>
  )
}
