'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { CardProps } from '@/types'

/**
 * Luxury Card Component with 2025 3D Depth Design
 * Features: Multiple variants, padding options, shadow depths, hover effects, 3D transformations
 */
export const Card: React.FC<CardProps> = ({
  variant = 'default',
  padding = 'md',
  shadow = 'md',
  hover = true,
  children,
  className,
  onClick,
  ...props
}) => {
  const baseClasses = cn(
    // Base 3D styles
    'relative group cursor-pointer transform-gpu',
    'transition-all duration-500 ease-3d-smooth',
    'transform-style-preserve-3d',
    'rounded-xl border backdrop-blur-lg',
    
    // Interactive 3D effects
    {
      'hover:-translate-y-2 hover:translate-z-4 hover:rotate-x-1 hover:rotate-y-1': hover,
      'active:translate-y-0 active:translate-z-0 active:rotate-x-0 active:rotate-y-0': hover,
    },
    
    className
  )

  // Variant styles with 3D depth
  const variantClasses = cn({
    // Default - Clean white with subtle 3D
    'card-3d bg-gradient-depth border-neutral-200/60': variant === 'default',
    
    // Luxury - Premium glass with gold accents
    'luxury-card bg-gradient-to-br from-white/95 via-gold-light/10 to-white/90 border-gold-primary/20 backdrop-blur-xl': variant === 'luxury',
    
    // Glass - Enhanced glassmorphism with 3D
    'glass-strong border-white/20 bg-gradient-to-br from-white/10 via-white/5 to-white/10': variant === 'glass',
    
    // Floating - Elevated with enhanced shadows
    'floating-3d bg-gradient-depth border-neutral-100/80 animate-3d-float': variant === 'floating',
  })

  // Padding variants
  const paddingClasses = cn({
    'p-0': padding === 'none',
    'p-3': padding === 'sm',
    'p-6': padding === 'md',
    'p-8': padding === 'lg',
    'p-12': padding === 'xl',
  })

  // Shadow depth variants
  const shadowClasses = cn({
    'shadow-none': shadow === 'none',
    'shadow-3d-sm': shadow === 'sm',
    'shadow-3d': shadow === 'md',
    'shadow-3d-lg': shadow === 'lg',
    'shadow-3d-xl': shadow === 'luxury',
  })

  // Enhanced hover shadow effects
  const hoverShadowClasses = cn({
    'hover:shadow-3d-sm': shadow === 'none' && hover,
    'hover:shadow-3d': shadow === 'sm' && hover,
    'hover:shadow-3d-lg': shadow === 'md' && hover,
    'hover:shadow-3d-xl': (shadow === 'lg' || shadow === 'luxury') && hover,
  })

  const cardClasses = cn(
    baseClasses,
    variantClasses,
    paddingClasses,
    shadowClasses,
    hoverShadowClasses
  )

  return (
    <motion.div
      className={cardClasses}
      onClick={onClick}
      whileHover={hover ? {
        scale: 1.01,
        y: -8,
        rotateX: 2,
        rotateY: 1,
        transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
      } : {}}
      whileTap={hover ? {
        scale: 0.99,
        y: 0,
        rotateX: 0,
        rotateY: 0,
        transition: { duration: 0.1 }
      } : {}}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
      {...props}
    >
      {/* 3D Background Layer */}
      <motion.div
        className="absolute inset-0 rounded-inherit opacity-0"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        style={{
          background: variant === 'luxury'
            ? 'linear-gradient(145deg, rgba(245,158,11,0.05) 0%, rgba(245,158,11,0.02) 50%, rgba(0,0,0,0.02) 100%)'
            : variant === 'glass'
            ? 'linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(0,0,0,0.02) 100%)'
            : 'linear-gradient(145deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) 50%, rgba(0,0,0,0.02) 100%)',
          transform: 'translateZ(-1px)',
        }}
      />

      {/* Enhanced Border Highlight */}
      <motion.div
        className="absolute inset-0 rounded-inherit border-2 border-transparent opacity-0"
        whileHover={{
          opacity: 1,
          borderColor: variant === 'luxury' 
            ? 'rgba(245, 158, 11, 0.3)' 
            : variant === 'glass'
            ? 'rgba(255, 255, 255, 0.3)'
            : 'rgba(4, 120, 87, 0.2)',
        }}
        transition={{ duration: 0.3 }}
        style={{ transform: 'translateZ(1px)' }}
      />

      {/* Inner Glow Effect */}
      <motion.div
        className="absolute inset-[1px] rounded-inherit opacity-0 pointer-events-none"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        style={{
          background: variant === 'luxury'
            ? 'linear-gradient(145deg, rgba(245,158,11,0.1) 0%, transparent 50%, rgba(245,158,11,0.05) 100%)'
            : 'linear-gradient(145deg, rgba(4,120,87,0.05) 0%, transparent 50%, rgba(4,120,87,0.02) 100%)',
          transform: 'translateZ(-1px)',
        }}
      />

      {/* Card Content with 3D positioning */}
      <div 
        className="relative z-10 h-full"
        style={{ transform: 'translateZ(2px)' }}
      >
        {children}
      </div>

      {/* Subtle depth indicator */}
      <div
        className="absolute inset-0 rounded-inherit opacity-10 pointer-events-none"
        style={{
          background: 'linear-gradient(145deg, transparent 0%, rgba(0,0,0,0.1) 50%, transparent 100%)',
          transform: 'translateZ(-2px)',
        }}
      />
    </motion.div>
  )
}

// Create compound components for different use cases
const CardDefault = (props: Omit<CardProps, 'variant'>) => (
  <Card variant="default" {...props} />
)

const CardLuxury = (props: Omit<CardProps, 'variant'>) => (
  <Card variant="luxury" {...props} />
)

const CardGlass = (props: Omit<CardProps, 'variant'>) => (
  <Card variant="glass" {...props} />
)

const CardFloating = (props: Omit<CardProps, 'variant'>) => (
  <Card variant="floating" {...props} />
)

// Assign compound components
Object.assign(Card, {
  Default: CardDefault,
  Luxury: CardLuxury,
  Glass: CardGlass,
  Floating: CardFloating,
})

export default Card 