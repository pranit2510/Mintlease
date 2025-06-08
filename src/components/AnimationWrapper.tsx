'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

interface AnimationWrapperProps {
  children: React.ReactNode
  className?: string
}

/**
 * Wrapper component to fix Framer Motion animations in Next.js App Router
 * Forces animations to trigger after hydration
 */
export function AnimationWrapper({ children, className }: AnimationWrapperProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Force re-render after hydration to trigger animations
    setIsLoaded(true)
  }, [])

  if (!isLoaded) {
    // Return children with opacity 1 during SSR/initial load
    return <div className={className} style={{ opacity: 1 }}>{children}</div>
  }

  // After hydration, wrap with AnimatePresence and motion.div
  return (
    <AnimatePresence mode="wait">
      <motion.div
        className={className}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
} 