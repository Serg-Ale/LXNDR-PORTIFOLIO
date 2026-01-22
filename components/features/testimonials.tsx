import { Card, CardContent } from "@/components/ui/card"

export function Testimonials() {
  const testimonials = [
    {
      quote:
        "This tool has completely transformed how our team works. The calm, focused interface makes all the difference.",
      author: "Sarah Chen",
      role: "Product Lead",
      company: "TechFlow",
    },
    {
      quote: "Finally, software that doesn't overwhelm. It's like a breath of fresh air in our daily workflow.",
      author: "Marcus Johnson",
      role: "Creative Director",
      company: "DesignHub",
    },
    {
      quote: "The attention to detail is incredible. Every interaction feels thoughtful and purposeful.",
      author: "Emily Rodriguez",
      role: "Founder",
      company: "StartupLab",
    },
  ]

  return (
    <section id="testimonials" className="py-24 px-6 bg-teal-deep">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-teal-light font-medium mb-4">Testimonials</p>
          <h2 className="text-4xl md:text-5xl font-bold text-cream mb-6 text-balance">Loved by teams worldwide</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-cream/10 border-cream/20 backdrop-blur-sm">
              <CardContent className="p-8">
                <blockquote className="text-cream/90 text-lg mb-6 leading-relaxed">"{testimonial.quote}"</blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-teal-light rounded-full flex items-center justify-center text-teal-deep font-semibold">
                    {testimonial.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="text-cream font-medium">{testimonial.author}</p>
                    <p className="text-cream/60 text-sm">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
