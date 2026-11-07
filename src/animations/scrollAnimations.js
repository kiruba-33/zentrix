/**
 * ZENTRIX STUDIO — REUSABLE SCROLL ANIMATION HELPERS
 * Pure GSAP + ScrollTrigger helpers for editorial reveals, clip-paths, and subtle parallax.
 */

import { gsap, CINEMATIC_EASE, prefersReducedMotion } from './gsapConfig'

/**
 * Creates an editorial curtain clip-path reveal with gentle scale settle
 */
export function createClipReveal(target, trigger, options = {}) {
  if (prefersReducedMotion() || !target) return null

  const {
    duration = 1.2,
    delay = 0,
    ease = CINEMATIC_EASE.power3Out,
    scaleFrom = 1.08,
    start = 'top 82%',
  } = options

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: trigger || target,
      start,
      toggleActions: 'play none none none',
      once: true,
    },
  })

  tl.fromTo(
    target,
    { clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)' },
    {
      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
      duration,
      delay,
      ease,
    }
  )

  // Find inner image for scale settle if present
  const innerImg = target.querySelector('img') || (target.tagName === 'IMG' ? target : null)
  if (innerImg) {
    tl.fromTo(
      innerImg,
      { scale: scaleFrom },
      { scale: 1, duration: duration * 1.15, ease },
      '<'
    )
  }

  return tl
}

/**
 * Creates a confident line-by-line editorial heading reveal
 */
export function createHeadingReveal(lines, trigger, options = {}) {
  if (prefersReducedMotion() || !lines || lines.length === 0) return null

  const {
    duration = 0.95,
    stagger = 0.1,
    ease = CINEMATIC_EASE.power4Out,
    start = 'top 80%',
    delay = 0,
  } = options

  return gsap.fromTo(
    lines,
    { opacity: 0, y: 35 },
    {
      opacity: 1,
      y: 0,
      duration,
      stagger,
      delay,
      ease,
      scrollTrigger: {
        trigger: trigger || lines[0],
        start,
        toggleActions: 'play none none none',
        once: true,
      },
    }
  )
}

/**
 * Creates a staggered fade-up for copy, cards, or service rows
 */
export function createFadeUp(targets, trigger, options = {}) {
  if (prefersReducedMotion() || !targets) return null

  const {
    duration = 0.8,
    stagger = 0.08,
    y = 24,
    ease = CINEMATIC_EASE.power3Out,
    start = 'top 82%',
    delay = 0,
  } = options

  return gsap.fromTo(
    targets,
    { opacity: 0, y },
    {
      opacity: 1,
      y: 0,
      duration,
      stagger,
      delay,
      ease,
      scrollTrigger: {
        trigger: trigger || targets[0] || targets,
        start,
        toggleActions: 'play none none none',
        once: true,
      },
    }
  )
}

/**
 * Restrained desktop parallax (gentle scrub, strictly disabled on mobile/reduced-motion)
 */
export function createParallax(target, trigger, yPercent = 6) {
  if (prefersReducedMotion() || !target) return null

  return gsap.to(target, {
    yPercent,
    ease: 'none',
    scrollTrigger: {
      trigger: trigger || target,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 0.5,
    },
  })
}
