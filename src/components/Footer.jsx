const CURRENT_YEAR = new Date().getFullYear()

export default function Footer() {

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const FOOTER_NAV_LINKS = [
    { label: 'WORK', href: '#work' },
    { label: 'STUDIO', href: '#studio' },
    { label: 'SERVICES', href: '#services' },
    { label: 'PROCESS', href: '#process' },
    { label: 'CONTACT', href: '#contact' },
  ]

  return (
    <footer
      aria-label="Studio Footer"
      className="relative w-full bg-[#111111] text-paper border-t border-[#222222] pt-16 sm:pt-20 pb-12 overflow-hidden"
    >
      <div className="editorial-container">
        {/* Top Grid: Wordmark, Navigation, Inquiries */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 pb-16 border-b border-[#222222]">
          {/* Brand & Focus (Cols 1-5) */}
          <div className="md:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              <a
                href="#top"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToTop()
                }}
                className="group inline-flex items-center gap-1.5 focus-visible:outline-blue text-paper no-underline"
                aria-label="Back to top"
              >
                <span className="font-display font-extrabold tracking-[-0.04em] text-2xl sm:text-3xl uppercase text-paper">
                  ZENTRIX<span className="text-blue">.</span>
                </span>
              </a>
              <p className="mt-2 text-xs font-display font-semibold tracking-[0.16em] uppercase text-muted">
                FILM / DIRECTION / VISUAL STORIES
              </p>
            </div>

            <p className="text-body-sm text-muted/80 max-w-sm font-sans leading-relaxed">
              An independent film production and cinematography studio creating visionary cinema across commercial, narrative, and documentary mediums.
            </p>
          </div>

          {/* Navigation Links (Cols 6-8) */}
          <div className="md:col-span-3 space-y-4">
            <p className="text-[11px] font-display font-semibold tracking-[0.16em] uppercase text-muted">
              NAVIGATION
            </p>
            <ul className="space-y-3 list-none p-0 m-0 text-xs font-display font-semibold tracking-[0.14em] uppercase">
              {FOOTER_NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="editorial-nav-link editorial-nav-link-light text-paper/80 hover:text-paper transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Inquiries & Locations (Cols 9-12) */}
          <div className="md:col-span-4 space-y-6">
            <div>
              <p className="text-[11px] font-display font-semibold tracking-[0.16em] uppercase text-muted">
                INQUIRIES
              </p>
              <a
                href="mailto:hello@zentrix.studio"
                className="mt-1.5 inline-block text-sm font-display font-medium text-paper hover:text-blue transition-colors"
              >
                hello@zentrix.studio
              </a>
            </div>

            <div>
              <p className="text-[11px] font-display font-semibold tracking-[0.16em] uppercase text-muted">
                STUDIO LOCATIONS
              </p>
              <p className="mt-1.5 text-xs font-sans text-paper/80">
                LOS ANGELES — LONDON — TOKYO
              </p>
            </div>
          </div>
        </div>

        {/* Large Typography Sign-off */}
        <div className="py-14 sm:py-20 border-b border-[#222222] flex flex-col sm:flex-row items-baseline justify-between gap-6">
          <p className="font-display font-extrabold uppercase text-[clamp(1.75rem,4.5vw,4rem)] leading-[0.96] tracking-[-0.03em] text-paper/90">
            MADE WITH INTENTION.<br />
            <span className="font-serif-accent font-normal italic lowercase sm:normal-case tracking-normal text-paper/70">
              frame by frame
            </span>
            <span className="text-blue">.</span>
          </p>

          {/* Back To Top Interaction */}
          <button
            type="button"
            onClick={scrollToTop}
            className="group inline-flex items-center gap-2 text-xs font-display font-bold tracking-[0.16em] uppercase text-paper hover:text-blue transition-colors cursor-pointer self-start sm:self-end shrink-0"
            aria-label="Scroll back to top of the page"
          >
            <span>BACK TO TOP</span>
            <span className="editorial-cta-arrow text-sm leading-none" aria-hidden="true">
              ↑
            </span>
          </button>
        </div>

        {/* Bottom Legal & Colophon */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-sans text-muted">
          <p className="editorial-numeral">
            © {CURRENT_YEAR} ZENTRIX STUDIO. ALL RIGHTS RESERVED.
          </p>

          <p className="text-muted/60 tracking-wider uppercase font-mono text-[10px]">
            INDEPENDENT FILM PRODUCTION LAB // 35MM OPTICS
          </p>
        </div>
      </div>
    </footer>
  )
}
