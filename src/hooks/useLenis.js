/**
 * ZENTRIX STUDIO — LENIS SMOOTH SCROLL HOOK
 * Seamlessly integrates Lenis with GSAP ScrollTrigger via the GSAP Ticker.
 */

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../animations/gsapConfig'

export function useLenis() {
  const lenisRef = useRef(null)

  useEffect(() => {
    // Respect user's motion preferences
    if (prefersReducedMotion()) return

    // Initialize single Lenis instance
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.4,
      autoRaf: false, // GSAP ticker drives Lenis for synchronous frame rendering
    })

    lenisRef.current = lenis

    // Notify ScrollTrigger on every Lenis scroll tick
    lenis.on('scroll', ScrollTrigger.update)

    // Drive Lenis directly from GSAP's internal ticker
    const tickerUpdate = (time) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(tickerUpdate)
    gsap.ticker.lagSmoothing(0)

    // Handle smooth anchor navigation (Navbar & CTAs)
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]')
      if (!anchor) return

      const href = anchor.getAttribute('href')
      if (href && href !== '#' && href.length > 1) {
        const targetElement = document.querySelector(href)
        if (targetElement) {
          e.preventDefault()
          lenis.scrollTo(targetElement, {
            offset: -80, // Navbar height offset
            duration: 1.1,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          })
        }
      }
    }

    document.addEventListener('click', handleAnchorClick)

    return () => {
      document.removeEventListener('click', handleAnchorClick)
      gsap.ticker.remove(tickerUpdate)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  return lenisRef
}
