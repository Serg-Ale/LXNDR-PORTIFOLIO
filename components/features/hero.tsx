import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"

export function Hero() {
  return (
    <section className="pt-32 pb-20 px-6 bg-cream">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-light/40 rounded-full">
              <span className="w-2 h-2 bg-teal-deep rounded-full animate-pulse" />
              <span className="text-sm text-teal-deep font-medium">Now Available</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-dark leading-tight text-balance">
              Create <span className="text-teal-deep">mindful</span> digital experiences
            </h1>

            <p className="text-lg text-dark/70 max-w-xl leading-relaxed">
              Transform your workflow with tools designed for calm, focused productivity. Build beautiful products
              without the chaos.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-teal-deep hover:bg-teal-medium text-cream px-8">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-teal-deep text-teal-deep hover:bg-teal-deep hover:text-cream bg-transparent"
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>

            <div className="flex items-center gap-6 pt-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-cream bg-teal-light flex items-center justify-center text-teal-deep text-sm font-medium"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div>
                <p className="text-sm font-medium text-dark">Join 10,000+ creators</p>
                <p className="text-sm text-dark/60">building with serenity</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square bg-teal-deep rounded-3xl overflow-hidden relative">
              <div className="absolute inset-0 bg-teal-medium/30" />
              <div className="absolute inset-8 bg-cream/10 rounded-2xl backdrop-blur-sm border border-cream/20 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 bg-cream/20 rounded-2xl mx-auto flex items-center justify-center">
                    <svg className="w-10 h-10 text-cream" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </div>
                  <p className="text-cream/80 text-sm">Designed with care</p>
                </div>
              </div>
              <div className="absolute bottom-4 left-4 right-4 bg-cream/10 backdrop-blur-sm rounded-xl p-4 border border-cream/20">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-teal-light rounded-full animate-pulse" />
                  <p className="text-cream text-sm">Live preview active</p>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-teal-light rounded-2xl -z-10" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-teal-medium/20 rounded-2xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  )
}
