/**
 * ZENTRIX STUDIO — CENTRAL GSAP CONFIGURATION
 * Safe registration of ScrollTrigger, cinematic easings, and animation tokens.
 */

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

// Safely register plugins in client browser environments once
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Cinematic easing curves
export const CINEMATIC_EASE = {
  power3Out: 'power3.out',
  power4Out: 'power4.out',
  inOut: 'power3.inOut',
  smooth: 'power2.out',
  editorial: 'expo.out',
}

// Helper to determine if the user has requested reduced motion
export const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export { gsap, ScrollTrigger, useGSAP }
