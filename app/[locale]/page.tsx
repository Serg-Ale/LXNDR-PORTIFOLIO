import { PortfolioNav } from "@/components/portfolio-nav"
import { PortfolioFooter } from "@/components/portfolio-footer"
import { PortfolioIntro } from "@/components/portfolio-intro"
import { PortfolioJourney } from "@/components/portfolio-journey"
import { PortfolioSkills } from "@/components/portfolio-skills"
import { PortfolioImpact } from "@/components/portfolio-impact"
import { PortfolioConnect } from "@/components/portfolio-connect"
import { MagneticCursor } from "@/components/magnetic-cursor"
import { ScrollProgress } from "@/components/scroll-progress"

export default function Home() {
  return (
    <main className="min-h-screen">
      <PortfolioNav />
      <MagneticCursor />
      <ScrollProgress sections={["intro", "journey", "skills", "impact", "connect"]} />

      <PortfolioIntro />
      <PortfolioJourney />
      <PortfolioSkills />
      <PortfolioImpact />
      <PortfolioConnect />
      <PortfolioFooter />
    </main>
  )
}
