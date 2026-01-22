import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight } from "lucide-react"

export function CTA() {
  return (
    <section id="contact" className="py-24 px-6 bg-cream">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-dark mb-6 text-balance">Ready to experience serenity?</h2>
        <p className="text-dark/70 text-lg mb-10 max-w-xl mx-auto">
          Join thousands of creators and teams who have transformed their workflow. Start your free trial today.
        </p>

        <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Enter your email"
            className="h-12 bg-cream border-teal-light focus:border-teal-deep text-dark placeholder:text-dark/40"
          />
          <Button className="h-12 bg-teal-deep hover:bg-teal-medium text-cream px-8">
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </form>

        <p className="text-sm text-dark/50 mt-6">Free 14-day trial • No credit card required • Cancel anytime</p>
      </div>
    </section>
  )
}
