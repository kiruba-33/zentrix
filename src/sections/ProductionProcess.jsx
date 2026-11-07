import { useRef } from 'react'
import { gsap, useGSAP, CINEMATIC_EASE, prefersReducedMotion } from '../animations/gsapConfig'

export default function ProductionProcess() {
  const containerRef = useRef(null)

  const PROCESS_STAGES = [
    {
      number: '01',
      title: 'PRE-PRODUCTION',
      description:
        'Concept development, creative direction, scripting, visual planning and production preparation.',
      specs: 'TREATMENTS // STORYBOARDS // LOCATION SCOUTING',
    },
    {
      number: '02',
      title: 'PRODUCTION',
      description:
        'Cinematography, direction, lighting, camera operation and filming.',
      specs: '35MM & LARGE FORMAT // LIGHTING DESIGN // SOUND CAPTURE',
    },
    {
      number: '03',
      title: 'POST-PRODUCTION',
      description:
        'Video editing, colour grading, sound design, finishing and final delivery.',
      specs: 'EDITORIAL // ACES COLOR // SOUND MIXING // THEATRICAL MASTERS',
    },
  ]

  useGSAP(
    () => {
      if (prefersReducedMotion()) return

      // Section Header Reveal
      const header = containerRef.current.querySelector('[data-process-header]')
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

      // Process Stages Staggered Entrance
      const stages = containerRef.current.querySelectorAll('[data-process-stage]')
      if (stages.length > 0) {
        gsap.fromTo(
          stages,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.14,
            ease: CINEMATIC_EASE.power3Out,
            scrollTrigger: {
              trigger: stages[0],
              start: 'top 80%',
              toggleActions: 'play none none none',
              once: true,
            },
          }
        )
      }

      // Companion Image Reveal
      const photoFrame = containerRef.current.querySelector('[data-process-photo]')
      if (photoFrame) {
        gsap.fromTo(
          photoFrame,
          {
            clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
            opacity: 0,
          },
          {
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
            opacity: 1,
            duration: 1.15,
            ease: CINEMATIC_EASE.power3Out,
            scrollTrigger: {
              trigger: photoFrame,
              start: 'top 82%',
              toggleActions: 'play none none none',
              once: true,
            },
          }
        )
      }
    },
    { scope: containerRef }
  )

  return (
    <section
      ref={containerRef}
      id="process"
      aria-labelledby="process-heading"
      className="relative w-full py-20 sm:py-28 lg:py-36 bg-paper text-ink border-t border-border/80 overflow-hidden"
    >
      <div className="editorial-container">
        {/* Section Header */}
        <div
          data-process-header
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 sm:pb-14 border-b border-border/80 mb-14 sm:mb-20"
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-2 h-2 rounded-full bg-blue shrink-0" aria-hidden="true" />
              <span className="editorial-kicker text-ink/75">
                02 / THE METHODOLOGY
              </span>
            </div>

            <h2
              id="process-heading"
              className="font-display font-extrabold uppercase text-[clamp(2.5rem,5.5vw,5rem)] leading-[0.94] tracking-[-0.035em] text-ink"
            >
              FROM FIRST IDEA<br />
              TO{' '}
              <span className="font-serif-accent font-normal italic lowercase sm:normal-case tracking-normal text-ink">
                final frame
              </span>
              <span className="text-blue" aria-hidden="true">
                .
              </span>
            </h2>

            <p className="mt-6 text-body-lead text-ink/80 max-w-xl font-sans">
              Every great film begins with an idea. We bring the creative vision, people and production together to make it real.
            </p>
          </div>

          <div className="text-xs font-display font-semibold tracking-[0.14em] uppercase text-muted">
            <span>DISCIPLINE // VISION // FINISH</span>
          </div>
        </div>

        {/* Three Connected Process Stages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 items-stretch">
          {PROCESS_STAGES.map((stage) => (
            <div
              key={stage.number}
              data-process-stage
              className="group flex flex-col justify-between p-6 sm:p-8 border border-border/80 bg-paper-light/60 transition-colors duration-300 hover:border-ink/60"
            >
              <div>
                {/* Large Numbered Identifier */}
                <div className="flex items-baseline justify-between pb-6 border-b border-border/60">
                  <span className="editorial-numeral text-4xl sm:text-5xl font-display font-extrabold tracking-tight text-ink/25 transition-colors duration-300 group-hover:text-blue">
                    {stage.number}
                  </span>
                  <span className="text-[10px] font-mono tracking-widest uppercase text-muted">
                    STAGE {stage.number}
                  </span>
                </div>

                {/* Stage Title */}
                <h3 className="font-display font-bold text-xl sm:text-2xl uppercase tracking-[-0.02em] text-ink mt-6">
                  {stage.title}
                </h3>

                {/* Stage Description */}
                <p className="mt-4 text-body-sm text-ink/80 font-sans leading-relaxed">
                  {stage.description}
                </p>
              </div>

              {/* Technical Specifications */}
              <div className="mt-8 pt-4 border-t border-border/60 text-[10px] font-display font-semibold tracking-wider uppercase text-muted-dark">
                <span>{stage.specs}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Companion Photographic Frame: Continuity on Set */}
        <div
          data-process-photo
          className="mt-14 sm:mt-20 border border-border/80 bg-[#E8E6DF] overflow-hidden group shadow-[0_20px_40px_rgba(21,21,21,0.06)]"
        >
          <div className="relative aspect-[21/9] sm:aspect-[24/9] w-full overflow-hidden">
            <picture className="w-full h-full block">
              <source type="image/webp" srcSet="/media/images/journal-creative-process.webp" />
              <img
                src="/media/images/journal-creative-process.jpg"
                alt="Director and cinematographer monitoring scene continuity during filming"
                width={1000}
                height={750}
                loading="lazy"
                className="w-full h-full object-cover object-[center_35%] film-contrast transition-transform duration-700 group-hover:scale-[1.02]"
              />
            </picture>

            <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 flex items-center gap-2 px-2.5 py-1 bg-ink/75 backdrop-blur-sm text-paper text-[10px] font-mono tracking-widest uppercase pointer-events-none">
              <span className="w-1.5 h-1.5 rounded-full bg-blue" aria-hidden="true" />
              <span>CONTINUITY LAB // SCENE ANALYSIS</span>
            </div>
          </div>

          <div className="px-4 py-3 bg-paper border-t border-border/80 flex flex-wrap items-center justify-between gap-2 text-[11px] font-display font-medium tracking-wider uppercase text-muted">
            <span className="text-ink font-semibold">THE CREATIVE PIPELINE // CONCEPT TO MASTER</span>
            <span className="editorial-numeral text-muted-dark">ACES COLOR &amp; 35MM OPTICS</span>
          </div>
        </div>
      </div>
    </section>
  )
}
