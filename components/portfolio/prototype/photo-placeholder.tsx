// PROTOTYPE — stand-in for a real portrait that doesn't exist yet.
// Each variant treats this differently (aspect ratio, framing, tone) —
// that's the point. When a real photo lands, swap the fill, keep the frame
// decisions the winning variant made.

import { cn } from "@/lib/utils"

export function PhotoPlaceholder({ className, tone = "neutral" }: { className?: string; tone?: "neutral" | "warm" | "mono" }) {
  const toneClasses = {
    neutral: "bg-[repeating-linear-gradient(135deg,#d4d4d4_0px,#d4d4d4_2px,#e5e5e5_2px,#e5e5e5_14px)]",
    warm: "bg-[repeating-linear-gradient(135deg,#e7ddd0_0px,#e7ddd0_2px,#f2ece2_2px,#f2ece2_14px)]",
    mono: "bg-[repeating-linear-gradient(135deg,#2a2a2a_0px,#2a2a2a_2px,#1a1a1a_2px,#1a1a1a_14px)]",
  }[tone]

  const labelColor = tone === "mono" ? "text-white/40" : "text-black/35"

  return (
    <div className={cn("relative flex items-center justify-center overflow-hidden", toneClasses, className)}>
      <span className={cn("font-mono text-[10px] uppercase tracking-[0.3em]", labelColor)}>
        photo — placeholder
      </span>
    </div>
  )
}
