import { LxndrNav } from "@/components/lxndr/lxndr-nav"
import { LxndrHero } from "@/components/lxndr/lxndr-hero"
import { LxndrManifesto } from "@/components/lxndr/lxndr-manifesto"
import { LxndrSound } from "@/components/lxndr/lxndr-sound"
import { LxndrReleases } from "@/components/lxndr/lxndr-releases"
import { LxndrVisualWorld } from "@/components/lxndr/lxndr-visual-world"
import { LxndrScene } from "@/components/lxndr/lxndr-scene"
import { LxndrBooking } from "@/components/lxndr/lxndr-booking"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "LXNDR — DJ / Producer / Electronic Artist",
  description: "LXNDR is a Paraná-based electronic artist moving through techno, psytrance, industrial tension and sonic ritual.",
}

export default function LxndrPage() {
  return (
    <main id="main-content">
      <LxndrNav />
      <LxndrHero />
      <LxndrManifesto />
      <LxndrSound />
      <LxndrReleases />
      <LxndrVisualWorld />
      <LxndrScene />
      <LxndrBooking />
    </main>
  )
}
