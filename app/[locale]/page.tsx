import { PortfolioNav } from "@/components/portfolio-nav"
import { PortfolioHero } from "@/components/portfolio-hero"
import { PortfolioAbout } from "@/components/portfolio-about"
import { PortfolioExperience } from "@/components/portfolio-experience"
import { PortfolioProjects } from "@/components/portfolio-projects"
import { PortfolioContact } from "@/components/portfolio-contact"
import { PortfolioFooter } from "@/components/portfolio-footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <PortfolioNav />
      <PortfolioHero />
      <div id="about">
        <PortfolioAbout />
      </div>
      <div id="experience">
        <PortfolioExperience />
      </div>
      <div id="projects">
        <PortfolioProjects />
      </div>
      <div id="contact">
        <PortfolioContact />
      </div>
      <PortfolioFooter />
    </main>
  )
}
