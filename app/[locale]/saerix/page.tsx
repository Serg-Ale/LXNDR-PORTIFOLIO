import type { Metadata } from "next"

import { LxndrBooking } from "@/components/lxndr/lxndr-booking"
import { LxndrHero } from "@/components/lxndr/lxndr-hero"
import { LxndrManifesto } from "@/components/lxndr/lxndr-manifesto"
import { LxndrMusicalJourney } from "@/components/lxndr/lxndr-musical-journey"
import { LxndrNav } from "@/components/lxndr/lxndr-nav"
import { LxndrReleases } from "@/components/lxndr/lxndr-releases"
import { LxndrScene } from "@/components/lxndr/lxndr-scene"
import { LxndrSound } from "@/components/lxndr/lxndr-sound"
import { LxndrVisualWorld } from "@/components/lxndr/lxndr-visual-world"

export const metadata: Metadata = {
  title: "SAERIX — DJ / Open Format / Londrina",
  description: "SAERIX é um DJ de Londrina com open format, assinatura eletrônica e sets voltados para pista, groove e energia noturna.",
}

export default function SaerixPage() {
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
