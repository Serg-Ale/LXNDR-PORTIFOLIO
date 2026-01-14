export function PortfolioFooter() {
  return (
    <footer className="border-t-4 border-foreground bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <h3 className="text-4xl md:text-6xl font-black mb-4">
              SA_DEV
            </h3>
            <p className="text-lg md:text-xl font-bold">
              SÉRGIO ALEXANDRE
              <br />
              SOFTWARE ENGINEER
            </p>
          </div>
          
          <div className="flex flex-col md:items-end space-y-4">
            <a
              href="https://linkedin.com/in/serg-alexandre"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl md:text-2xl font-bold hover:bg-foreground hover:text-background p-2 transition-colors inline-block"
            >
              LINKEDIN →
            </a>
            <a
              href="mailto:sergioalexandre0716@gmail.com"
              className="text-xl md:text-2xl font-bold hover:bg-foreground hover:text-background p-2 transition-colors inline-block"
            >
              EMAIL →
            </a>
            <a
              href="tel:+5543988732020"
              className="text-xl md:text-2xl font-bold hover:bg-foreground hover:text-background p-2 transition-colors inline-block"
            >
              PHONE →
            </a>
          </div>
        </div>

        <div className="border-t-4 border-foreground pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-base md:text-lg font-bold">
            © {new Date().getFullYear()} ALL RIGHTS RESERVED
          </p>
          <p className="text-base md:text-lg font-bold">
            DESIGNED & DEVELOPED WITH ❤️
          </p>
        </div>
      </div>
    </footer>
  )
}
