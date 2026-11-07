import { useState, useEffect } from 'react'

const NAV_LINKS = [
  { label: 'WORK', href: '#work', number: '01' },
  { label: 'STUDIO', href: '#studio', number: '02' },
  { label: 'SERVICES', href: '#services', number: '03' },
  { label: 'CONTACT', href: '#contact', number: '04' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Track scroll position for subtle background transition
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll and listen for Escape key when mobile menu is active
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          setIsMobileMenuOpen(false)
        }
      }
      window.addEventListener('keydown', handleKeyDown)
      return () => {
        document.body.style.overflow = ''
        window.removeEventListener('keydown', handleKeyDown)
      }
    } else {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      {/* Accessible Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-ink focus:text-paper focus:font-display focus:text-xs focus:tracking-wider focus:outline-none"
      >
        Skip to main content
      </a>

      {/* Primary Editorial Navbar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 h-20 transition-all duration-300 ${
          isScrolled
            ? 'bg-paper/95 backdrop-blur-md border-b border-border shadow-[0_4px_24px_rgba(21,21,21,0.03)]'
            : 'bg-paper border-b border-border/70'
        }`}
      >
        <div className="h-full w-full max-w-[1680px] mx-auto px-6 sm:px-10 lg:px-16 flex items-center justify-between">
          {/* Left: ZENTRIX. Wordmark */}
          <div className="flex items-center">
            <a
              href="#top"
              className="group inline-flex items-center gap-1.5 text-ink no-underline focus-visible:outline-blue"
              aria-label="ZENTRIX Studio Homepage"
              onClick={closeMobileMenu}
            >
              <span className="font-display font-extrabold tracking-[-0.04em] text-xl sm:text-2xl text-ink uppercase">
                ZENTRIX<span className="text-blue">.</span>
              </span>
            </a>
          </div>

          {/* Right: Desktop Navigation Links + CTA */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-8 lg:gap-12 xl:gap-14"
          >
            <ul className="flex items-center gap-8 lg:gap-12 xl:gap-14 list-none m-0 p-0">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="editorial-nav-link font-display text-xs font-semibold tracking-[0.14em] uppercase text-ink/80 hover:text-ink transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Desktop CTA Button */}
            <a
              href="#contact"
              className="group inline-flex items-center gap-1.5 px-4 py-2 border border-ink text-ink text-xs font-display font-semibold tracking-[0.12em] uppercase transition-all duration-300 hover:bg-ink hover:text-paper"
            >
              <span>START A PROJECT</span>
              <span
                className="editorial-cta-arrow text-sm leading-none font-sans"
                aria-hidden="true"
              >
                ↗
              </span>
            </a>
          </nav>

          {/* Mobile Navigation Trigger Button */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              onClick={toggleMobileMenu}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation-menu"
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="p-2 -mr-2 text-ink flex items-center gap-2 focus-visible:outline-blue cursor-pointer"
            >
              <span className="font-display text-[11px] font-bold tracking-[0.16em] uppercase">
                {isMobileMenuOpen ? 'CLOSE' : 'MENU'}
              </span>
              <div className="w-5 h-4 relative flex flex-col justify-center items-center gap-1.5" aria-hidden="true">
                <span
                  className={`block w-5 h-[1.5px] bg-ink transition-transform duration-300 origin-center ${
                    isMobileMenuOpen ? 'rotate-45 translate-y-[4px]' : ''
                  }`}
                />
                <span
                  className={`block w-5 h-[1.5px] bg-ink transition-transform duration-300 origin-center ${
                    isMobileMenuOpen ? '-rotate-45 -translate-y-[4px]' : ''
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay Drawer */}
      <div
        id="mobile-navigation-menu"
        aria-hidden={!isMobileMenuOpen}
        className={`fixed inset-0 z-40 bg-paper md:hidden flex flex-col justify-between pt-24 pb-8 px-6 sm:px-10 transition-all duration-400 ease-editorial ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none -translate-y-4'
        }`}
      >
        {/* Navigation List with Editorial Numbers */}
        <nav aria-label="Mobile Navigation" className="mt-4 flex-1">
          <ul className="list-none m-0 p-0 flex flex-col">
            {NAV_LINKS.map((link) => (
              <li key={link.label} className="border-b border-border/80">
                <a
                  href={link.href}
                  onClick={closeMobileMenu}
                  tabIndex={isMobileMenuOpen ? 0 : -1}
                  className="group flex items-baseline justify-between py-5 text-ink no-underline transition-colors hover:text-blue"
                >
                  <span className="font-display font-bold text-3xl sm:text-4xl tracking-tight transition-transform duration-300 group-hover:translate-x-2">
                    {link.label}
                  </span>
                  <span className="editorial-numeral text-xs font-display font-semibold tracking-widest text-muted group-hover:text-ink">
                    {link.number}
                  </span>
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile CTA */}
          <div className="mt-8">
            <a
              href="#contact"
              onClick={closeMobileMenu}
              tabIndex={isMobileMenuOpen ? 0 : -1}
              className="group flex items-center justify-between w-full px-6 py-4 bg-ink text-paper text-xs font-display font-bold tracking-[0.14em] uppercase transition-all hover:bg-ink/90"
            >
              <span>START A PROJECT</span>
              <span className="editorial-cta-arrow text-base leading-none" aria-hidden="true">
                ↗
              </span>
            </a>
          </div>
        </nav>

        {/* Mobile Drawer Footer: Studio Editorial Metadata */}
        <div className="pt-6 border-t border-border flex flex-col sm:flex-row justify-between gap-4 text-xs font-sans text-muted">
          <div>
            <p className="font-display font-semibold tracking-wider uppercase text-ink">
              ZENTRIX STUDIO
            </p>
            <p className="text-[11px] text-muted-dark">Independent Film & Cinematography</p>
          </div>
          <div>
            <p className="font-display font-semibold tracking-wider uppercase text-ink">
              INQUIRIES
            </p>
            <p className="text-[11px] text-muted-dark">hello@zentrix.studio</p>
          </div>
        </div>
      </div>
    </>
  )
}
