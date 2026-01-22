import { Sparkles, Zap, Shield, Users } from "lucide-react"

export function Features() {
  const features = [
    {
      icon: Sparkles,
      title: "Intuitive Design",
      description: "Beautiful interfaces that feel natural and effortless to use. No learning curve required.",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized for speed at every level. Your workflow never waits.",
    },
    {
      icon: Shield,
      title: "Secure by Default",
      description: "Enterprise-grade security without the complexity. Your data is always protected.",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Work together seamlessly with real-time sync and smart conflict resolution.",
    },
  ]

  return (
    <section id="features" className="py-24 px-6 bg-cream">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-teal-deep font-medium mb-4">Features</p>
          <h2 className="text-4xl md:text-5xl font-bold text-dark mb-6 text-balance">
            Everything you need to create with confidence
          </h2>
          <p className="text-dark/70 text-lg">
            Powerful tools that simplify complexity and let you focus on what matters most.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 bg-cream border border-teal-light rounded-2xl hover:border-teal-deep transition-colors"
            >
              <div className="w-14 h-14 bg-teal-light/50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-teal-deep transition-colors">
                <feature.icon className="w-7 h-7 text-teal-deep group-hover:text-cream transition-colors" />
              </div>
              <h3 className="text-xl font-semibold text-dark mb-3">{feature.title}</h3>
              <p className="text-dark/70 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
