import { useRef } from 'react'
import { gsap, useGSAP, CINEMATIC_EASE, prefersReducedMotion } from '../animations/gsapConfig'

export default function StudioIntro() {
  const containerRef = useRef(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return

      const kicker = containerRef.current.querySelector('[data-studio-kicker]')
      const heading = containerRef.current.querySelector('#studio-heading')
      const copy = containerRef.current.querySelector('[data-studio-copy]')
      const badges = containerRef.current.querySelector('[data-studio-badges]')
      const photoFrame = containerRef.current.querySelector('[data-studio-photo]')
      const photoImg = photoFrame ? photoFrame.querySelector('img') : null

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
          once: true,
        },
      })

      if (kicker) {
        tl.fromTo(
          kicker,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.7, ease: CINEMATIC_EASE.power3Out }
        )
      }

      if (heading) {
        tl.fromTo(
          heading,
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, duration: 0.95, ease: CINEMATIC_EASE.power4Out },
          '-=0.45'
        )
      }

      if (copy) {
        tl.fromTo(
          copy,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: CINEMATIC_EASE.power3Out },
          '-=0.5'
        )
      }

      if (badges) {
        tl.fromTo(
          badges,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.7, ease: CINEMATIC_EASE.power3Out },
          '-=0.4'
        )
      }

      if (photoFrame) {
        tl.fromTo(
          photoFrame,
          {
            clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
            opacity: 0,
          },
          {
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
            opacity: 1,
            duration: 1.2,
            ease: CINEMATIC_EASE.power3Out,
          },
          '-=0.8'
        )

        if (photoImg) {
          tl.fromTo(
            photoImg,
            { scale: 1.08 },
            { scale: 1, duration: 1.35, ease: CINEMATIC_EASE.power3Out },
            '<'
          )
        }
      }

      // Restrained Desktop-only subtle parallax
      const mm = gsap.matchMedia()
      mm.add('(min-width: 1024px)', () => {
        if (photoImg) {
          gsap.to(photoImg, {
            yPercent: 6,
            ease: 'none',
            scrollTrigger: {
              trigger: photoFrame,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.6,
            },
          })
        }
      })
    },
    { scope: containerRef }
  )

  return (
    <section
      ref={containerRef}
      id="studio"
      aria-labelledby="studio-heading"
      className="relative w-full py-20 sm:py-28 lg:py-36 bg-paper text-ink border-t border-border/80 overflow-hidden"
    >
      <div className="editorial-container">
        {/* Asymmetrical 12-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 xl:gap-20 items-start">
          {/* Left Column (Cols 1-7 on Desktop): Philosophy & Narrative */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              {/* Kicker */}
              <div data-studio-kicker className="flex items-center gap-2.5 mb-6 sm:mb-8">
                <span className="w-2 h-2 rounded-full bg-blue shrink-0" aria-hidden="true" />
                <span className="editorial-kicker text-ink/75">
                  THE STUDIO / OUR CREATIVE PHILOSOPHY
                </span>
              </div>

              {/* Dominant Editorial Headline */}
              <h2
                id="studio-heading"
                className="font-display font-extrabold uppercase text-[clamp(2.25rem,5.2vw,5rem)] leading-[0.94] tracking-[-0.035em] text-ink"
              >
                <span>WE DON'T JUST SHOOT FILMS.</span>
                <span className="block mt-2 sm:mt-3">
                  WE BUILD{' '}
                  <span className="font-serif-accent font-normal italic lowercase sm:normal-case tracking-normal text-ink">
                    visual experiences
                  </span>
                  <span className="text-blue" aria-hidden="true">
                    .
                  </span>
                </span>
              </h2>

              {/* Concise Supporting Body Copy */}
              <div data-studio-copy className="mt-8 sm:mt-12 space-y-6 max-w-xl">
                <p className="text-body-lead text-ink/85 leading-relaxed font-sans">
                  We believe every frame has a purpose. From the first creative conversation to the final colour grade, we bring ideas to life through thoughtful direction and purposeful visual storytelling.
                </p>
              </div>
            </div>

            {/* Studio Technical Discipline Badges */}
            <div data-studio-badges className="mt-12 sm:mt-16 pt-8 border-t border-border/70 flex flex-wrap items-center justify-between gap-4 text-xs font-display tracking-[0.14em] uppercase text-muted">
              <span>INDEPENDENT FILMMAKING LAB</span>
              <span className="editorial-numeral">EST. 2024 // LOS ANGELES — LONDON — TOKYO</span>
            </div>
          </div>

          {/* Right Column (Cols 8-12 on Desktop): Director / Cinematographer Portrait */}
          <div className="lg:col-span-5 relative lg:mt-6">
            <div data-studio-photo className="relative border border-border/80 bg-[#E8E6DF] overflow-hidden shadow-[0_20px_40px_rgba(21,21,21,0.06)] group">
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <picture className="w-full h-full block">
                  <source type="image/webp" srcSet="/media/images/studio-director.webp" />
                  <img
                    src="/media/images/studio-director.jpg"
                    alt="Film director and cinematographer monitoring a production scene on set"
                    width={1400}
                    height={2100}
                    loading="lazy"
                    className="w-full h-full object-cover object-[center_25%] film-contrast transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                </picture>

                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 flex items-center gap-2 px-2.5 py-1 bg-ink/75 backdrop-blur-sm text-paper text-[10px] font-mono tracking-widest uppercase pointer-events-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue" aria-hidden="true" />
                  <span>ON SET // DIRECTION</span>
                </div>
              </div>

              {/* Subtle Caption */}
              <div className="px-4 py-3 bg-paper border-t border-border/80 flex flex-wrap items-center justify-between gap-2 text-[11px] font-display font-medium tracking-wider uppercase text-muted">
                <span className="text-ink font-semibold">DIRECTOR'S MONITOR // PRODUCTION RIGGING</span>
                <span className="editorial-numeral text-muted-dark">35MM OPTICS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
