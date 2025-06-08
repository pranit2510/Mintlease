'use client'

import { useEffect, useState } from 'react'
import { useAnimation } from 'framer-motion'

/**
 * Hook to fix Framer Motion animations in Next.js App Router
 * Ensures animations trigger after hydration
 */
export function useAnimationFix() {
  const [isMounted, setIsMounted] = useState(false)
  const controls = useAnimation()

  useEffect(() => {
    // Set mounted state after hydration
    setIsMounted(true)
    
    // Force animations to start
    if (controls.start) {
      controls.start('animate')
    }
  }, [controls])

  return {
    isMounted,
    controls,
    // Helper to get initial animation state
    getInitial: () => isMounted ? 'initial' : 'animate',
    // Helper to get animate state
    getAnimate: () => isMounted ? 'animate' : 'initial'
  }
} 