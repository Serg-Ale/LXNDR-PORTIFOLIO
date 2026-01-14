import Link from "next/link"

export function Footer() {
  const links = {
    Product: ["Features", "Pricing", "Integrations", "Changelog"],
    Company: ["About", "Blog", "Careers", "Contact"],
    Resources: ["Documentation", "Help Center", "Community", "Templates"],
    Legal: ["Privacy", "Terms", "Security", "Cookies"],
  }

  return (
    <footer className="py-16 px-6 bg-dark">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="text-2xl font-bold text-cream">
              Serenity
            </Link>
            <p className="text-cream/60 mt-4 text-sm">Creating calm in the chaos of digital creation.</p>
          </div>

          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="text-cream font-semibold mb-4">{category}</h4>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-cream/60 hover:text-teal-light transition-colors text-sm">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-cream/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-cream/40 text-sm">© 2026 Serenity. All rights reserved.</p>
          <div className="flex gap-6">
            {["Twitter", "LinkedIn", "GitHub", "Dribbble"].map((social) => (
              <Link key={social} href="#" className="text-cream/40 hover:text-teal-light transition-colors text-sm">
                {social}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
