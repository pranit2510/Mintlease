'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface GlobalBackgroundProps {
  /** Background variant to use */
  variant?: 'base' | 'enhanced' | 'hero' | 'section'
  /** Whether to include interactive mouse-responsive layers */
  interactive?: boolean
  /** Children to render on top of the background */
  children?: React.ReactNode
  /** Custom className for the container */
  className?: string
}

/**
 * GlobalBackground Component
 * 
 * Provides consistent warm cream background with gradients across all pages and sections.
 * Based on the hero section background design with different intensity levels.
 * 
 * Usage:
 * - variant="base": Simple gradient background
 * - variant="enhanced": Subtle radial gradients
 * - variant="hero": Full hero-level background with all layers
 * - variant="section": Section-level background
 */
export const GlobalBackground: React.FC<GlobalBackgroundProps> = ({
  variant = 'base',
  interactive = false,
  children,
  className = ''
}) => {
  const getBackgroundClass = () => {
    switch (variant) {
      case 'hero':
        return 'mint-hero-background'
      case 'enhanced':
        return 'mint-background-enhanced'
      case 'section':
        return 'mint-section'
      default:
        return 'mint-background'
    }
  }

  const containerClasses = `${getBackgroundClass()} ${className}`.trim()

  if (!interactive) {
    return (
      <div className={containerClasses}>
        {children}
      </div>
    )
  }

  // Interactive version with mouse-responsive layers
  return (
    <div className={containerClasses}>
      {/* Interactive Background Layers */}
      <motion.div 
        className="mint-background-layer-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      
      <motion.div 
        className="mint-background-layer-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

/**
 * Pre-configured variants for common use cases
 */

// For main page layouts
export const PageBackground: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className
}) => (
  <GlobalBackground variant="enhanced" className={className}>
    {children}
  </GlobalBackground>
)

// For hero sections
export const HeroBackground: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className
}) => (
  <GlobalBackground variant="hero" interactive className={className}>
    {children}
  </GlobalBackground>
)

// For individual sections
export const SectionBackground: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className
}) => (
  <GlobalBackground variant="section" className={className}>
    {children}
  </GlobalBackground>
)

// For basic layouts (cards, modals, etc.)
export const BaseBackground: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className
}) => (
  <GlobalBackground variant="base" className={className}>
    {children}
  </GlobalBackground>
) 