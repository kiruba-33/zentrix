import { useRef } from 'react'
import { PORTFOLIO_PROJECTS } from '../data/projects'
import { gsap, useGSAP, CINEMATIC_EASE, prefersReducedMotion } from '../animations/gsapConfig'

export default function SelectedWork() {
  const sectionRef = useRef(null)
  const [project01, project02, project03, project04, project05] = PORTFOLIO_PROJECTS

  useGSAP(
    () => {
      if (prefersReducedMotion()) return

      // Section Header Reveal
      const header = sectionRef.current.querySelector('[data-portfolio-header]')
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
              start: 'top 85%',
              toggleActions: 'play none none none',
              once: true,
            },
          }
        )
      }

      // Project Cards Editorial Curtain Reveal
      const articles = sectionRef.current.querySelectorAll('article[data-project-id]')
      articles.forEach((article) => {
        const imgWrapper = article.querySelector('.portfolio-image-wrapper')
        const img = article.querySelector('.portfolio-image')
        const meta = article.querySelector('[data-project-meta]')

        if (imgWrapper) {
          gsap.fromTo(
            imgWrapper,
            { clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)' },
            {
              clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
              duration: 1.15,
              ease: CINEMATIC_EASE.power3Out,
              scrollTrigger: {
                trigger: article,
                start: 'top 82%',
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
              duration: 1.35,
              ease: CINEMATIC_EASE.power3Out,
              scrollTrigger: {
                trigger: article,
                start: 'top 82%',
                toggleActions: 'play none none none',
                once: true,
              },
            }
          )
        }

        if (meta) {
          gsap.fromTo(
            meta,
            { opacity: 0, y: 22 },
            {
              opacity: 1,
              y: 0,
              duration: 0.85,
              delay: 0.15,
              ease: CINEMATIC_EASE.power3Out,
              scrollTrigger: {
                trigger: article,
                start: 'top 80%',
                toggleActions: 'play none none none',
                once: true,
              },
            }
          )
        }
      })
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      id="work"
      aria-labelledby="portfolio-heading"
      className="relative w-full py-20 sm:py-28 lg:py-36 bg-paper text-ink border-t border-border/80 overflow-hidden"
    >
      <div className="editorial-container">
        {/* Section Header */}
        <div
          data-portfolio-header
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 sm:pb-14 border-b border-border/80 mb-14 sm:mb-20 lg:mb-24"
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-2 h-2 rounded-full bg-blue shrink-0" aria-hidden="true" />
              <span className="editorial-kicker text-ink/75">
                01 / THE PORTFOLIO
              </span>
            </div>

            <h2
              id="portfolio-heading"
              className="font-display font-extrabold uppercase text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.94] tracking-[-0.035em] text-ink"
            >
              SELECTED<br />
              WORK<span className="text-blue" aria-hidden="true">.</span>
            </h2>

            <p className="mt-6 text-body-lead text-ink/80 max-w-xl font-sans">
              A collection of visual stories, crafted with intention and brought to life through film.
            </p>
          </div>

          <div className="pt-2 md:pt-0">
            <a
              href="#work"
              className="group inline-flex items-center gap-2 text-xs font-display font-bold tracking-[0.14em] uppercase text-ink editorial-nav-link"
              aria-label="View all studio film projects"
            >
              <span>VIEW ALL PROJECTS</span>
              <span className="portfolio-arrow text-sm leading-none" aria-hidden="true">
                ↗
              </span>
            </a>
          </div>
        </div>

        {/* Asymmetric 12-Column Portfolio Grid */}
        <div className="space-y-16 sm:space-y-24 lg:space-y-32">
          {/* Row 1: Featured Landscape (7 cols) + Offset Portrait (5 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-start">
            {/* Project 01: Large Featured Landscape */}
            <article
              data-project-id={project01.id}
              className="group lg:col-span-7 flex flex-col"
            >
              <div className={`portfolio-image-wrapper border border-border/80 ${project01.aspectRatio} w-full`}>
                <picture className="w-full h-full block">
                  <source type="image/webp" srcSet={project01.webp} />
                  <img
                    src={project01.image}
                    alt={project01.imageAlt}
                    width={project01.width}
                    height={project01.height}
                    loading="lazy"
                    className="portfolio-image film-contrast"
                  />
                </picture>
                <div className="viewfinder-badge">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue" aria-hidden="true" />
                  <span>{project01.format}</span>
                </div>
              </div>

              <div data-project-meta className="mt-5 sm:mt-6 flex flex-col space-y-2.5">
                <div className="flex items-baseline justify-between gap-4 pb-2.5 border-b border-border/60">
                  <div className="flex items-baseline gap-3">
                    <span className="editorial-numeral text-xs font-display font-bold tracking-widest text-muted">
                      {project01.number}
                    </span>
                    <h3 className="portfolio-title font-display font-bold text-xl sm:text-2xl uppercase tracking-[-0.02em] text-ink">
                      {project01.title}
                    </h3>
                  </div>
                  <span className="editorial-numeral text-xs font-display font-medium text-ink/70 shrink-0">
                    {project01.year}
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-sans text-muted pt-1">
                  <span className="tracking-wider uppercase">{project01.category}</span>
                  <span className="editorial-numeral text-[11px] text-muted-dark">{project01.runtime}</span>
                </div>

                {project01.description && (
                  <p className="text-body-sm text-ink/75 pt-2 max-w-xl font-sans leading-relaxed">
                    {project01.description}
                  </p>
                )}
              </div>
            </article>

            {/* Project 02: Editorial Portrait (with deliberate asymmetric top offset on desktop) */}
            <article
              data-project-id={project02.id}
              className="group lg:col-span-5 flex flex-col lg:mt-24"
            >
              <div className={`portfolio-image-wrapper border border-border/80 ${project02.aspectRatio} w-full`}>
                <picture className="w-full h-full block">
                  <source type="image/webp" srcSet={project02.webp} />
                  <img
                    src={project02.image}
                    alt={project02.imageAlt}
                    width={project02.width}
                    height={project02.height}
                    loading="lazy"
                    className="portfolio-image film-contrast"
                  />
                </picture>
                <div className="viewfinder-badge">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue" aria-hidden="true" />
                  <span>{project02.format}</span>
                </div>
              </div>

              <div data-project-meta className="mt-5 sm:mt-6 flex flex-col space-y-2.5">
                <div className="flex items-baseline justify-between gap-4 pb-2.5 border-b border-border/60">
                  <div className="flex items-baseline gap-3">
                    <span className="editorial-numeral text-xs font-display font-bold tracking-widest text-muted">
                      {project02.number}
                    </span>
                    <h3 className="portfolio-title font-display font-bold text-xl sm:text-2xl uppercase tracking-[-0.02em] text-ink">
                      {project02.title}
                    </h3>
                  </div>
                  <span className="editorial-numeral text-xs font-display font-medium text-ink/70 shrink-0">
                    {project02.year}
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-sans text-muted pt-1">
                  <span className="tracking-wider uppercase">{project02.category}</span>
                  <span className="editorial-numeral text-[11px] text-muted-dark">{project02.runtime}</span>
                </div>

                {project02.description && (
                  <p className="text-body-sm text-ink/75 pt-2 max-w-md font-sans leading-relaxed">
                    {project02.description}
                  </p>
                )}
              </div>
            </article>
          </div>

          {/* Row 2: Wide Cinematic Panoramic Frame (12 cols) */}
          <article
            data-project-id={project03.id}
            className="group w-full flex flex-col"
          >
            <div className={`portfolio-image-wrapper border border-border/80 ${project03.aspectRatio} w-full`}>
              <picture className="w-full h-full block">
                <source type="image/webp" srcSet={project03.webp} />
                <img
                  src={project03.image}
                  alt={project03.imageAlt}
                  width={project03.width}
                  height={project03.height}
                  loading="lazy"
                  className="portfolio-image film-contrast object-[center_40%]"
                />
              </picture>
              <div className="viewfinder-badge">
                <span className="w-1.5 h-1.5 rounded-full bg-blue" aria-hidden="true" />
                <span>{project03.format}</span>
              </div>
            </div>

            <div data-project-meta className="mt-5 sm:mt-6 flex flex-col space-y-2.5">
              <div className="flex items-baseline justify-between gap-4 pb-2.5 border-b border-border/60">
                <div className="flex items-baseline gap-3">
                  <span className="editorial-numeral text-xs font-display font-bold tracking-widest text-muted">
                    {project03.number}
                  </span>
                  <h3 className="portfolio-title font-display font-bold text-xl sm:text-2xl lg:text-3xl uppercase tracking-[-0.02em] text-ink">
                    {project03.title}
                  </h3>
                </div>
                <span className="editorial-numeral text-xs font-display font-medium text-ink/70 shrink-0">
                  {project03.year}
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-sans text-muted pt-1">
                <span className="tracking-wider uppercase">{project03.category}</span>
                <span className="editorial-numeral text-[11px] text-muted-dark">{project03.runtime}</span>
              </div>

              {project03.description && (
                <p className="text-body-sm text-ink/75 pt-2 max-w-2xl font-sans leading-relaxed">
                  {project03.description}
                </p>
              )}
            </div>
          </article>

          {/* Row 3: Narrative Landscape (7 cols) + Intimate Portrait (5 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-start">
            {/* Project 04: Narrative Landscape */}
            <article
              data-project-id={project04.id}
              className="group lg:col-span-7 flex flex-col"
            >
              <div className={`portfolio-image-wrapper border border-border/80 ${project04.aspectRatio} w-full`}>
                <picture className="w-full h-full block">
                  <source type="image/webp" srcSet={project04.webp} />
                  <img
                    src={project04.image}
                    alt={project04.imageAlt}
                    width={project04.width}
                    height={project04.height}
                    loading="lazy"
                    className="portfolio-image film-contrast"
                  />
                </picture>
                <div className="viewfinder-badge">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue" aria-hidden="true" />
                  <span>{project04.format}</span>
                </div>
              </div>

              <div data-project-meta className="mt-5 sm:mt-6 flex flex-col space-y-2.5">
                <div className="flex items-baseline justify-between gap-4 pb-2.5 border-b border-border/60">
                  <div className="flex items-baseline gap-3">
                    <span className="editorial-numeral text-xs font-display font-bold tracking-widest text-muted">
                      {project04.number}
                    </span>
                    <h3 className="portfolio-title font-display font-bold text-xl sm:text-2xl uppercase tracking-[-0.02em] text-ink">
                      {project04.title}
                    </h3>
                  </div>
                  <span className="editorial-numeral text-xs font-display font-medium text-ink/70 shrink-0">
                    {project04.year}
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-sans text-muted pt-1">
                  <span className="tracking-wider uppercase">{project04.category}</span>
                  <span className="editorial-numeral text-[11px] text-muted-dark">{project04.runtime}</span>
                </div>

                {project04.description && (
                  <p className="text-body-sm text-ink/75 pt-2 max-w-xl font-sans leading-relaxed">
                    {project04.description}
                  </p>
                )}
              </div>
            </article>

            {/* Project 05: Character Portrait (Contrasting Spacing on Desktop) */}
            <article
              data-project-id={project05.id}
              className="group lg:col-span-5 flex flex-col lg:mt-16"
            >
              <div className={`portfolio-image-wrapper border border-border/80 ${project05.aspectRatio} w-full`}>
                <picture className="w-full h-full block">
                  <source type="image/webp" srcSet={project05.webp} />
                  <img
                    src={project05.image}
                    alt={project05.imageAlt}
                    width={project05.width}
                    height={project05.height}
                    loading="lazy"
                    className="portfolio-image film-contrast"
                  />
                </picture>
                <div className="viewfinder-badge">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue" aria-hidden="true" />
                  <span>{project05.format}</span>
                </div>
              </div>

              <div data-project-meta className="mt-5 sm:mt-6 flex flex-col space-y-2.5">
                <div className="flex items-baseline justify-between gap-4 pb-2.5 border-b border-border/60">
                  <div className="flex items-baseline gap-3">
                    <span className="editorial-numeral text-xs font-display font-bold tracking-widest text-muted">
                      {project05.number}
                    </span>
                    <h3 className="portfolio-title font-display font-bold text-xl sm:text-2xl uppercase tracking-[-0.02em] text-ink">
                      {project05.title}
                    </h3>
                  </div>
                  <span className="editorial-numeral text-xs font-display font-medium text-ink/70 shrink-0">
                    {project05.year}
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-sans text-muted pt-1">
                  <span className="tracking-wider uppercase">{project05.category}</span>
                  <span className="editorial-numeral text-[11px] text-muted-dark">{project05.runtime}</span>
                </div>

                {project05.description && (
                  <p className="text-body-sm text-ink/75 pt-2 max-w-md font-sans leading-relaxed">
                    {project05.description}
                  </p>
                )}
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}
