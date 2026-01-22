export function Stats() {
  const stats = [
    { value: "20 days", label: "saved on average", company: "Enterprise" },
    { value: "98%", label: "faster workflows", company: "Startups" },
    { value: "300%", label: "increase in output", company: "Agencies" },
    { value: "6×", label: "faster to launch", company: "Freelancers" },
  ]

  return (
    <section className="py-20 px-6 bg-dark">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center lg:text-left space-y-2">
              <p className="text-3xl md:text-4xl font-bold text-cream">{stat.value}</p>
              <p className="text-teal-light/80">{stat.label}</p>
              <p className="text-sm text-cream/40 font-medium uppercase tracking-wide">{stat.company}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
