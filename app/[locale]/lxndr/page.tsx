import { LxndrNav } from "@/components/lxndr/lxndr-nav"
import { LxndrHero } from "@/components/lxndr/lxndr-hero"
import { LxndrManifesto } from "@/components/lxndr/lxndr-manifesto"
import { LxndrSound } from "@/components/lxndr/lxndr-sound"
import { LxndrReleases } from "@/components/lxndr/lxndr-releases"
import { LxndrMusicalJourney } from "@/components/lxndr/lxndr-musical-journey"
import { LxndrVisualWorld } from "@/components/lxndr/lxndr-visual-world"
import { LxndrScene } from "@/components/lxndr/lxndr-scene"
import { LxndrBooking } from "@/components/lxndr/lxndr-booking"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "LXNDR — DJ / Open Format / Londrina",
  description: "LXNDR é um DJ de Londrina com open format, assinatura eletrônica e sets voltados para pista, groove e energia noturna.",
}

export default function LxndrPage() {
  return (
    <main id="main-content">
      <LxndrNav />
      <LxndrHero />
      <LxndrManifesto />
      <LxndrSound />
      <LxndrMusicalJourney />
      <LxndrReleases />
      <LxndrVisualWorld />
      <LxndrScene />
      <LxndrBooking />
    </main>
  )
}
