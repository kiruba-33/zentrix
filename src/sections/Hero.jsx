import { useState, useRef } from 'react'
import { gsap, useGSAP, CINEMATIC_EASE, prefersReducedMotion } from '../animations/gsapConfig'

// Editorial photography assets for the Hero composition
const HERO_MEDIA = {
  mainImage: {
    src: '/media/images/hero-production-main.jpg',
    webp: '/media/images/hero-production-main.webp',
    width: 1600,
    height: 1081,
    alt: 'Cinematographer operating an ARRI cinema camera rig on set',
    caption: 'CAM A // ARRI ALEXA 35 — 35MM ANAMORPHIC',
    takeInfo: 'REC ● 24 FPS',
    scene: 'PROD STILL 04',
  },
  insetImage: {
    src: '/media/images/hero-production-inset.jpg',
    webp: '/media/images/hero-production-inset.webp',
    width: 800,
    height: 542,
    alt: 'Production clapperboard slate during studio take',
    caption: 'DIRECTOR’S SLATE // SCENE 28',
    takeInfo: 'TAKE 02',
  },
}

export default function Hero() {
  const [mainImgLoaded, setMainImgLoaded] = useState(false)
  const [insetImgLoaded, setInsetImgLoaded] = useState(false)
  const heroRef = useRef(null)

  // Premium opening sequence with GSAP
  useGSAP(
    () => {
      if (prefersReducedMotion()) return

      const tl = gsap.timeline({
        defaults: { ease: CINEMATIC_EASE.power3Out },
      })

      // 1. Small hero label fades in
      tl.fromTo(
        '[data-hero-elem="kicker"]',
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.75 }
      )

      // 2. Main heading reveals line by line
      tl.fromTo(
        '[data-hero-elem="heading-line"]',
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.95,
          stagger: 0.12,
          ease: CINEMATIC_EASE.power4Out,
        },
        '-=0.45'
      )

      // 3. Supporting paragraph fades upward
      tl.fromTo(
        '[data-hero-elem="description"]',
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.55'
      )

      // 4. CTA elements appear with subtle stagger
      tl.fromTo(
        ['[data-hero-elem="cta-primary"]', '[data-hero-elem="cta-secondary"]'],
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 },
        '-=0.5'
      )

      // Technical metadata fade in
      tl.fromTo(
        '[data-hero-elem="metadata"]',
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.65 },
        '-=0.45'
      )

      // 5. Main image reveals using an elegant clip-path transition
      tl.fromTo(
        '[data-hero-elem="photo-main"]',
        {
          clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
          opacity: 0,
        },
        {
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          opacity: 1,
          duration: 1.25,
          ease: CINEMATIC_EASE.power3Out,
        },
        '-=0.85'
      )

      // 6. Image settles into its final position
      tl.fromTo(
        '[data-hero-elem="photo-main"] img',
        { scale: 1.08 },
        { scale: 1, duration: 1.4, ease: CINEMATIC_EASE.power3Out },
        '<'
      )

      // Inset collage element settles
      tl.fromTo(
        '[data-hero-elem="photo-inset"]',
        { opacity: 0, y: 25, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.85 },
        '-=0.6'
      )
    },
    { scope: heroRef }
  )

  return (
    <section
      ref={heroRef}
      id="top"
      aria-label="Studio Introduction and Cinematic Reel"
      className="relative w-full pt-28 sm:pt-32 lg:pt-36 xl:pt-40 pb-16 sm:pb-20 lg:pb-28 overflow-hidden bg-paper text-ink"
    >
      <div className="editorial-container">
        {/* 1. Header Metadata & Live Kicker */}
        <div
          data-hero-elem="kicker"
          className="flex flex-wrap items-center justify-between gap-4 mb-8 sm:mb-10 lg:mb-12 pb-4 border-b border-border/80"
        >
          <div className="flex items-center gap-2.5">
            <span
              className="w-2 h-2 rounded-full bg-blue shrink-0 animate-pulse"
              aria-hidden="true"
            />
            <span className="editorial-kicker text-ink/80 tracking-[0.16em]">
              INDEPENDENT FILM &amp; VISUAL PRODUCTION
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-6 text-[11px] font-display font-semibold tracking-[0.16em] uppercase text-muted">
            <span>CINEMATOGRAPHY LAB</span>
            <span className="w-1 h-1 rounded-full bg-border shrink-0" aria-hidden="true" />
            <span className="editorial-numeral">EST. 2024</span>
          </div>
        </div>

        {/* 2. Primary Headline (Spanning upper-left & central area) */}
        <div className="relative z-20 mb-8 sm:mb-12 lg:mb-14">
          <h1
            data-hero-elem="heading"
            className="font-display font-extrabold uppercase tracking-[-0.035em] text-ink leading-[0.92] text-[clamp(2.25rem,7.5vw,7.5rem)]"
          >
            <span data-hero-elem="heading-line" className="block">
              STORIES,
            </span>
            <span data-hero-elem="heading-line" className="block mt-1 sm:mt-2">
              SET IN{' '}
              <span
                data-hero-elem="heading-accent"
                className="font-serif-accent font-normal italic lowercase sm:normal-case tracking-normal text-ink inline-block pr-1"
              >
                motion
              </span>
              <span className="text-blue" aria-hidden="true">
                .
              </span>
            </span>
          </h1>
        </div>

        {/* 3. Asymmetric 12-Column Editorial Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-14 items-start">
          {/* Left Block (Cols 1-5 on desktop): Copy, CTAs, Technical Metadata */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8 sm:space-y-10 lg:space-y-12 relative z-20">
            {/* Supporting Copy */}
            <div className="space-y-4">
              <p
                data-hero-elem="description"
                className="text-body-lead text-ink/85 leading-relaxed max-w-xl font-sans"
              >
                We shape ideas into films with a clear point of view — from the first frame to the final grade.
              </p>
            </div>

            {/* CTAs */}
            <div
              data-hero-elem="ctas"
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4"
            >
              <a
                href="#work"
                data-hero-elem="cta-primary"
                className="group inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-ink text-paper text-xs font-display font-bold tracking-[0.14em] uppercase transition-all duration-300 hover:bg-ink/85 focus-visible:outline-blue"
              >
                <span>EXPLORE OUR WORK</span>
                <span
                  className="editorial-cta-arrow text-sm leading-none"
                  aria-hidden="true"
                >
                  ↗
                </span>
              </a>

              <a
                href="#contact"
                data-hero-elem="cta-secondary"
                className="group inline-flex items-center justify-center gap-2.5 px-7 py-4 border border-ink text-ink text-xs font-display font-semibold tracking-[0.14em] uppercase transition-all duration-300 hover:bg-ink hover:text-paper focus-visible:outline-blue"
              >
                <span>START A PROJECT</span>
                <span
                  className="editorial-cta-arrow text-sm leading-none"
                  aria-hidden="true"
                >
                  ↗
                </span>
              </a>
            </div>

            {/* Small Metadata & Format Indicators */}
            <div
              data-hero-elem="metadata"
              className="pt-6 sm:pt-8 border-t border-border/80 flex flex-col gap-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-display font-semibold tracking-[0.14em] uppercase text-ink">
                <span>FILM / DIRECTION / CINEMATOGRAPHY</span>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-sans tracking-wider text-muted">
                <span>FORMAT: 35MM ANAMORPHIC</span>
                <span className="editorial-numeral">ASPECT 2.39 : 1</span>
              </div>
            </div>
          </div>

          {/* Right Block (Cols 6-12 on desktop): Cinematic Photography & Inset Collage */}
          <div className="lg:col-span-7 relative lg:-mt-16 xl:-mt-24 z-10">
            {/* Primary Film Production Photograph */}
            <div
              data-hero-elem="photo-main"
              className="relative border border-border/80 bg-[#E8E6DF] overflow-hidden shadow-[0_24px_48px_rgba(21,21,21,0.06)] group"
            >
              {/* Aspect Ratio Container (16:11) */}
              <div className="relative aspect-[16/11] w-full overflow-hidden">
                <picture className="w-full h-full block">
                  <source type="image/webp" srcSet={HERO_MEDIA.mainImage.webp} />
                  <img
                    src={HERO_MEDIA.mainImage.src}
                    alt={HERO_MEDIA.mainImage.alt}
                    width={HERO_MEDIA.mainImage.width}
                    height={HERO_MEDIA.mainImage.height}
                    loading="eager"
                    fetchPriority="high"
                    onLoad={() => setMainImgLoaded(true)}
                    className={`w-full h-full object-cover object-[center_30%] film-contrast transition-opacity duration-700 ${
                      mainImgLoaded ? 'opacity-100' : 'opacity-80'
                    }`}
                  />
                </picture>

                {/* Film Viewfinder Overlays (Subtle, Authentic Cinematic Metadata) */}
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 flex items-center gap-2 px-2.5 py-1 bg-ink/75 backdrop-blur-sm text-paper text-[10px] font-mono tracking-widest uppercase pointer-events-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" aria-hidden="true" />
                  <span>{HERO_MEDIA.mainImage.takeInfo}</span>
                </div>

                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 hidden sm:block px-2.5 py-1 bg-ink/75 backdrop-blur-sm text-paper text-[10px] font-mono tracking-widest uppercase pointer-events-none">
                  <span>{HERO_MEDIA.mainImage.scene}</span>
                </div>
              </div>

              {/* Main Photo Caption Bar */}
              <div
                data-hero-elem="caption"
                className="px-4 py-3 bg-paper border-t border-border/80 flex flex-wrap items-center justify-between gap-2 text-[11px] font-display font-medium tracking-wider uppercase text-muted"
              >
                <span className="text-ink font-semibold">
                  {HERO_MEDIA.mainImage.caption}
                </span>
                <span className="editorial-numeral text-muted-dark">
                  ISO 800 — 800 ASA / 24 FPS
                </span>
              </div>
            </div>

            {/* Inset Collage Element (Desktop / Tablet view) */}
            <div
              data-hero-elem="photo-inset"
              className="hidden md:block absolute -bottom-8 -left-8 xl:-bottom-10 xl:-left-12 w-48 sm:w-56 xl:w-64 aspect-[4/3] shadow-[0_20px_40px_rgba(21,21,21,0.12)] border-4 border-paper bg-paper z-30"
            >
              <div className="relative w-full h-[calc(100%-28px)] overflow-hidden bg-[#E8E6DF]">
                <picture className="w-full h-full block">
                  <source type="image/webp" srcSet={HERO_MEDIA.insetImage.webp} />
                  <img
                    src={HERO_MEDIA.insetImage.src}
                    alt={HERO_MEDIA.insetImage.alt}
                    width={HERO_MEDIA.insetImage.width}
                    height={HERO_MEDIA.insetImage.height}
                    loading="lazy"
                    onLoad={() => setInsetImgLoaded(true)}
                    className={`w-full h-full object-cover object-center film-contrast transition-opacity duration-500 ${
                      insetImgLoaded ? 'opacity-100' : 'opacity-80'
                    }`}
                  />
                </picture>
              </div>

              <div className="h-7 px-2.5 flex items-center justify-between text-[10px] font-display font-semibold tracking-wider uppercase text-muted bg-paper">
                <span className="truncate">{HERO_MEDIA.insetImage.caption}</span>
                <span className="editorial-numeral shrink-0">{HERO_MEDIA.insetImage.takeInfo}</span>
              </div>
            </div>

            {/* Mobile Companion Vignette */}
            <div className="block md:hidden mt-4 p-2.5 border border-border/80 bg-paper-light">
              <div className="flex items-center gap-3">
                <picture className="w-20 h-14 shrink-0 block overflow-hidden border border-border/60">
                  <source type="image/webp" srcSet={HERO_MEDIA.insetImage.webp} />
                  <img
                    src={HERO_MEDIA.insetImage.src}
                    alt={HERO_MEDIA.insetImage.alt}
                    width={HERO_MEDIA.insetImage.width}
                    height={HERO_MEDIA.insetImage.height}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </picture>
                <div className="text-[11px] font-display tracking-wider uppercase">
                  <p className="font-semibold text-ink">
                    {HERO_MEDIA.insetImage.caption}
                  </p>
                  <p className="text-muted text-[10px] mt-0.5">
                    PRODUCTION ARCHIVE // {HERO_MEDIA.insetImage.takeInfo}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
