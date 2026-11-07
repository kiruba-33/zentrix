import { useState, useRef } from 'react'
import { STUDIO_SERVICES } from '../data/services'
import { gsap, useGSAP, CINEMATIC_EASE, prefersReducedMotion } from '../animations/gsapConfig'

export default function Services() {
  const sectionRef = useRef(null)
  const [activeServiceIndex, setActiveServiceIndex] = useState(0)
  const activeService = STUDIO_SERVICES[activeServiceIndex] || STUDIO_SERVICES[0]

  useGSAP(
    () => {
      if (prefersReducedMotion()) return

      // Section Header Reveal
      const header = sectionRef.current.querySelector('[data-services-header]')
      if (header) {
        gsap.fromTo(
          header,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: CINEMATIC_EASE.power3Out,
            scrollTrigger: {
              trigger: header,
              start: 'top 82%',
              toggleActions: 'play none none none',
              once: true,
            },
          }
        )
      }

      // Service Rows Controlled Stagger Reveal
      const rows = sectionRef.current.querySelectorAll('.service-row')
      if (rows.length > 0) {
        gsap.fromTo(
          rows,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.09,
            ease: CINEMATIC_EASE.power3Out,
            scrollTrigger: {
              trigger: rows[0],
              start: 'top 85%',
              toggleActions: 'play none none none',
              once: true,
            },
          }
        )
      }
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      id="services"
      aria-labelledby="services-heading"
      className="relative w-full py-20 sm:py-28 lg:py-36 bg-paper text-ink border-t border-border/80 overflow-hidden"
    >
      <div className="editorial-container">
        {/* Section Grid: Sticky Preview & Intro on Left, Editorial List on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 xl:gap-20 items-start">
          {/* Left Column (Cols 1-5 on Desktop): Section Intro + Desktop Image Reveal */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 flex flex-col justify-between space-y-8 sm:space-y-10">
            <div data-services-header>
              <div className="flex items-center gap-2.5 mb-4">
                <span className="w-2 h-2 rounded-full bg-blue shrink-0" aria-hidden="true" />
                <span className="editorial-kicker text-ink/75">
                  WHAT WE DO
                </span>
              </div>

              <h2
                id="services-heading"
                className="font-display font-extrabold uppercase text-[clamp(2.5rem,5.5vw,5rem)] leading-[0.94] tracking-[-0.035em] text-ink"
              >
                MADE WITH<br />
                INTENTION<span className="text-blue" aria-hidden="true">.</span>
              </h2>

              <p className="mt-6 text-body-lead text-ink/80 max-w-md font-sans">
                From creative direction to final delivery, we shape every stage of the filmmaking process.
              </p>
            </div>

            {/* Desktop Dynamic Preview Frame (Cross-fades on service hover) */}
            <div className="hidden lg:block">
              <div className="service-preview-frame shadow-[0_16px_36px_rgba(21,21,21,0.06)]">
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#E8E6DF]">
                  {STUDIO_SERVICES.map((service, index) => (
                    <picture
                      key={service.number}
                      className={`absolute inset-0 w-full h-full block ${
                        activeServiceIndex === index
                          ? 'opacity-100 scale-100 z-10'
                          : 'opacity-0 scale-105 z-0'
                      }`}
                    >
                      <source type="image/webp" srcSet={service.webp} />
                      <img
                        src={service.image}
                        alt={service.imageAlt}
                        width={service.width}
                        height={service.height}
                        loading="lazy"
                        className="service-preview-img film-contrast"
                      />
                    </picture>
                  ))}

                  <div className="absolute top-3 left-3 z-20 flex items-center gap-2 px-2.5 py-1 bg-ink/75 backdrop-blur-sm text-paper text-[10px] font-mono tracking-widest uppercase pointer-events-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue" aria-hidden="true" />
                    <span>SERVICE {activeService.number} // {activeService.discipline}</span>
                  </div>
                </div>

                {/* Technical Specs Indicator */}
                <div className="px-4 py-2.5 bg-paper border-t border-border/80 flex items-center justify-between text-[11px] font-display font-semibold tracking-wider uppercase text-muted">
                  <span className="text-ink">{activeService.title}</span>
                  <span className="editorial-numeral text-muted-dark">{activeService.specs}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (Cols 6-12 on Desktop): Minimal Editorial Services List */}
          <div className="lg:col-span-7 flex flex-col border-t border-border/80 lg:border-t-0">
            {STUDIO_SERVICES.map((service, index) => (
              <div
                key={service.number}
                onMouseEnter={() => setActiveServiceIndex(index)}
                onFocus={() => setActiveServiceIndex(index)}
                tabIndex={0}
                className="service-row group py-8 sm:py-10 border-b border-border/80 cursor-default focus:outline-none focus-visible:bg-ink/[0.03]"
              >
                <div className="flex items-start justify-between gap-6 sm:gap-8">
                  {/* Service Number & Content */}
                  <div className="flex items-start gap-5 sm:gap-8">
                    <span className="editorial-numeral text-xs sm:text-sm font-display font-bold tracking-widest text-muted mt-1 shrink-0">
                      {service.number}
                    </span>

                    <div className="space-y-2.5">
                      <h3 className="font-display font-bold text-xl sm:text-2xl lg:text-3xl uppercase tracking-[-0.02em] text-ink transition-colors group-hover:text-ink">
                        {service.title}
                      </h3>

                      <p className="text-body-sm text-ink/75 max-w-lg font-sans leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  {/* Interactive Editorial Arrow */}
                  <div className="pt-1.5 shrink-0">
                    <span
                      className="service-row-arrow text-base sm:text-lg font-sans leading-none text-muted"
                      aria-hidden="true"
                    >
                      ↗
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
