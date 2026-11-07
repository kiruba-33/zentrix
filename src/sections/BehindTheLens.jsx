import { useRef } from 'react'
import { gsap, useGSAP, CINEMATIC_EASE, prefersReducedMotion } from '../animations/gsapConfig'

export default function BehindTheLens() {
  const containerRef = useRef(null)

  const JOURNAL_ITEMS = [
    {
      id: 'on-set',
      caption: 'ON SET',
      detail: 'DOLLY RIG & CAMERA OPERATOR',
      image: '/media/images/journal-on-set.jpg',
      webp: '/media/images/journal-on-set.webp',
      width: 1200,
      height: 675,
      imageAlt: 'Camera operator working with dolly track on a film set',
      aspectRatio: 'aspect-[16/10]',
      colSpan: 'lg:col-span-8',
      offsetClass: '',
      index: '01',
    },
    {
      id: 'behind-the-frame',
      caption: 'BEHIND THE FRAME',
      detail: 'SLATE & TIMECODE SYNC',
      image: '/media/images/hero-production-inset.jpg',
      webp: '/media/images/hero-production-inset.webp',
      width: 800,
      height: 542,
      imageAlt: 'Production clapperboard slate on studio set',
      aspectRatio: 'aspect-[4/5]',
      colSpan: 'lg:col-span-4',
      offsetClass: 'lg:mt-16',
      index: '02',
    },
    {
      id: 'the-creative-process',
      caption: 'THE CREATIVE PROCESS',
      detail: 'DIRECTOR MONITOR & CONTINUITY',
      image: '/media/images/journal-creative-process.jpg',
      webp: '/media/images/journal-creative-process.webp',
      width: 1000,
      height: 750,
      imageAlt: 'Film director reviewing take on calibrated field monitor',
      aspectRatio: 'aspect-[4/3]',
      colSpan: 'lg:col-span-5',
      offsetClass: '',
      index: '03',
    },
    {
      id: 'camera-and-light',
      caption: 'CAMERA & LIGHT',
      detail: 'TUNGSTEN RIGGING & DIFFUSION',
      image: '/media/images/journal-camera-light.jpg',
      webp: '/media/images/journal-camera-light.webp',
      width: 1200,
      height: 800,
      imageAlt: 'Studio lighting arrangement with large diffusion frames',
      aspectRatio: 'aspect-[16/10]',
      colSpan: 'lg:col-span-7',
      offsetClass: 'lg:mt-8',
      index: '04',
    },
  ]

  useGSAP(
    () => {
      if (prefersReducedMotion()) return

      // Section Header Reveal
      const header = containerRef.current.querySelector('[data-journal-header]')
      if (header) {
        gsap.fromTo(
          header,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: CINEMATIC_EASE.power3Out,
            scrollTrigger: {
              trigger: header,
              start: 'top 85%',
              toggleActions: 'play none none none',
              once: true,
            },
          }
        )
      }

      // Photographic Journal Staggered Reveals
      const figures = containerRef.current.querySelectorAll('figure')
      figures.forEach((figure, idx) => {
        const imgWrapper = figure.querySelector('[data-journal-img-wrapper]')
        const img = figure.querySelector('img')
        const caption = figure.querySelector('figcaption')

        const duration = 1.1 + (idx % 2) * 0.15
        const delay = (idx % 2) * 0.1

        if (imgWrapper) {
          gsap.fromTo(
            imgWrapper,
            { clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)' },
            {
              clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
              duration,
              delay,
              ease: CINEMATIC_EASE.power3Out,
              scrollTrigger: {
                trigger: figure,
                start: 'top 85%',
                toggleActions: 'play none none none',
                once: true,
              },
            }
          )
        }

        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.08 },
            {
              scale: 1,
              duration: duration * 1.2,
              delay,
              ease: CINEMATIC_EASE.power3Out,
              scrollTrigger: {
                trigger: figure,
                start: 'top 85%',
                toggleActions: 'play none none none',
                once: true,
              },
            }
          )
        }

        if (caption) {
          gsap.fromTo(
            caption,
            { opacity: 0, y: 15 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              delay: delay + 0.15,
              ease: CINEMATIC_EASE.power3Out,
              scrollTrigger: {
                trigger: figure,
                start: 'top 82%',
                toggleActions: 'play none none none',
                once: true,
              },
            }
          )
        }
      })

      // Restrained Desktop-only subtle parallax on asymmetric offset items
      const mm = gsap.matchMedia()
      mm.add('(min-width: 1024px)', () => {
        figures.forEach((figure, idx) => {
          const img = figure.querySelector('img')
          if (img && (idx === 1 || idx === 3)) {
            gsap.to(img, {
              yPercent: idx === 1 ? -6 : 6,
              ease: 'none',
              scrollTrigger: {
                trigger: figure,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.5,
              },
            })
          }
        })
      })
    },
    { scope: containerRef }
  )

  return (
    <section
      ref={containerRef}
      id="behind-the-lens"
      aria-labelledby="journal-heading"
      className="relative w-full py-20 sm:py-28 lg:py-36 bg-paper text-ink border-t border-border/80 overflow-hidden"
    >
      <div className="editorial-container">
        {/* Section Header */}
        <div
          data-journal-header
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 sm:pb-14 border-b border-border/80 mb-14 sm:mb-20"
        >
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-2 h-2 rounded-full bg-blue shrink-0" aria-hidden="true" />
              <span className="editorial-kicker text-ink/75">
                BEHIND THE LENS.
              </span>
            </div>

            <h2
              id="journal-heading"
              className="font-display font-extrabold uppercase text-[clamp(2.25rem,5.2vw,4.75rem)] leading-[0.94] tracking-[-0.035em] text-ink"
            >
              A CLOSER LOOK<br />
              AT THE PROCESS<span className="text-blue" aria-hidden="true">.</span>
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-body-sm text-ink/75 font-sans leading-relaxed">
              A photographic production journal documenting the discipline, technical craft, and atmosphere behind our cinematography.
            </p>
          </div>
        </div>

        {/* Asymmetric Production Journal Grid */}
        <div className="space-y-12 sm:space-y-16 lg:space-y-20">
          {/* Row 1: Item 1 (8 cols) + Item 2 (4 cols with top offset) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {JOURNAL_ITEMS.slice(0, 2).map((item) => (
              <figure
                key={item.id}
                className={`group flex flex-col ${item.colSpan} ${item.offsetClass}`}
              >
                <div
                  data-journal-img-wrapper
                  className={`relative border border-border/80 bg-[#E8E6DF] overflow-hidden ${item.aspectRatio} w-full`}
                >
                  <picture className="w-full h-full block">
                    <source type="image/webp" srcSet={item.webp} />
                    <img
                      src={item.image}
                      alt={item.imageAlt}
                      width={item.width}
                      height={item.height}
                      loading="lazy"
                      className="w-full h-full object-cover film-contrast transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                    />
                  </picture>

                  {/* Top Identifier Badge */}
                  <div className="absolute top-3 left-3 z-10 flex items-center gap-2 px-2.5 py-1 bg-ink/75 backdrop-blur-sm text-paper text-[10px] font-mono tracking-widest uppercase pointer-events-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue" aria-hidden="true" />
                    <span>JOURNAL // {item.index}</span>
                  </div>
                </div>

                {/* Minimal Editorial Caption */}
                <figcaption className="mt-3.5 sm:mt-4 flex items-center justify-between gap-4 text-[11px] font-display uppercase tracking-wider text-muted">
                  <span className="font-semibold text-ink">{item.caption}</span>
                  <span className="editorial-numeral text-muted-dark">{item.detail}</span>
                </figcaption>
              </figure>
            ))}
          </div>

          {/* Row 2: Item 3 (5 cols) + Item 4 (7 cols with subtle offset) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {JOURNAL_ITEMS.slice(2, 4).map((item) => (
              <figure
                key={item.id}
                className={`group flex flex-col ${item.colSpan} ${item.offsetClass}`}
              >
                <div
                  data-journal-img-wrapper
                  className={`relative border border-border/80 bg-[#E8E6DF] overflow-hidden ${item.aspectRatio} w-full`}
                >
                  <picture className="w-full h-full block">
                    <source type="image/webp" srcSet={item.webp} />
                    <img
                      src={item.image}
                      alt={item.imageAlt}
                      width={item.width}
                      height={item.height}
                      loading="lazy"
                      className="w-full h-full object-cover film-contrast transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                    />
                  </picture>

                  {/* Top Identifier Badge */}
                  <div className="absolute top-3 left-3 z-10 flex items-center gap-2 px-2.5 py-1 bg-ink/75 backdrop-blur-sm text-paper text-[10px] font-mono tracking-widest uppercase pointer-events-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue" aria-hidden="true" />
                    <span>JOURNAL // {item.index}</span>
                  </div>
                </div>

                {/* Minimal Editorial Caption */}
                <figcaption className="mt-3.5 sm:mt-4 flex items-center justify-between gap-4 text-[11px] font-display uppercase tracking-wider text-muted">
                  <span className="font-semibold text-ink">{item.caption}</span>
                  <span className="editorial-numeral text-muted-dark">{item.detail}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
