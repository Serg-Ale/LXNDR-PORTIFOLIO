"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-cream/80 backdrop-blur-md border-b border-teal-light">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-teal-deep">
            Serenity
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-dark/80 hover:text-teal-deep transition-colors">
              Features
            </Link>
            <Link href="#about" className="text-dark/80 hover:text-teal-deep transition-colors">
              About
            </Link>
            <Link href="#testimonials" className="text-dark/80 hover:text-teal-deep transition-colors">
              Testimonials
            </Link>
            <Link href="#contact" className="text-dark/80 hover:text-teal-deep transition-colors">
              Contact
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" className="text-dark hover:text-teal-deep hover:bg-teal-light/30">
              Sign In
            </Button>
            <Button className="bg-teal-deep hover:bg-teal-medium text-cream">Get Started</Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-dark" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-teal-light mt-4">
            <div className="flex flex-col gap-4">
              <Link href="#features" className="text-dark/80 hover:text-teal-deep transition-colors py-2">
                Features
              </Link>
              <Link href="#about" className="text-dark/80 hover:text-teal-deep transition-colors py-2">
                About
              </Link>
              <Link href="#testimonials" className="text-dark/80 hover:text-teal-deep transition-colors py-2">
                Testimonials
              </Link>
              <Link href="#contact" className="text-dark/80 hover:text-teal-deep transition-colors py-2">
                Contact
              </Link>
              <div className="flex flex-col gap-2 pt-4">
                <Button variant="ghost" className="w-full text-dark hover:text-teal-deep hover:bg-teal-light/30">
                  Sign In
                </Button>
                <Button className="w-full bg-teal-deep hover:bg-teal-medium text-cream">Get Started</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
