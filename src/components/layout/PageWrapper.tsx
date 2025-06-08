'use client'

import React, { useRef, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { animationVariants } from '@/lib/design-system'
import { cn } from '@/lib/utils'

interface PageWrapperProps {
  children: React.ReactNode
  title?: string
  description?: string
  className?: string
  enableParallax?: boolean
  enableInteractiveBackground?: boolean
  backgroundVariant?: 'default' | 'luxury' | 'minimal'
  animationVariant?: 'fadeInUp' | 'staggerContainer' | 'hero' | 'slideInLeft' | 'slideInRight'
  containerSize?: 'narrow' | 'default' | 'wide' | 'full'
  spacing?: 'sm' | 'md' | 'lg' | 'xl'
}

/**
 * Page Wrapper Component - Ensures Design System Consistency
 * Features: Consistent layouts, animations, backgrounds, interactive effects
 */
export const PageWrapper: React.FC<PageWrapperProps> = ({
  children,
  title,
  description,
  className,
  enableParallax = true,
  enableInteractiveBackground = true,
  backgroundVariant = 'default',
  animationVariant = 'fadeInUp',
  containerSize = 'default',
  spacing = 'lg',
  ...props
}) => {
  const containerRef = useRef<HTMLElement>(null)
  const shouldReduceMotion = useReducedMotion()

  // Interactive mouse tracking for premium effects
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springMouseX = useSpring(mouseX, { 
    stiffness: shouldReduceMotion ? 100 : 400, 
    damping: shouldReduceMotion ? 40 : 25, 
    mass: 0.1 
  })
  const springMouseY = useSpring(mouseY, { 
    stiffness: shouldReduceMotion ? 100 : 400, 
    damping: shouldReduceMotion ? 40 : 25, 
    mass: 0.1 
  })

  // Parallax transforms
  const backgroundX = useTransform(springMouseX, [-100, 100], [-20, 20])
  const backgroundY = useTransform(springMouseY, [-100, 100], [-10, 10])
  const accentX = useTransform(springMouseX, [-100, 100], [-5, 5])
  const accentY = useTransform(springMouseY, [-100, 100], [-8, 8])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!enableParallax || !containerRef.current) return
    
    const rect = containerRef.current.getBoundingClientRect()
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    const x = (e.clientX - rect.left - centerX) / centerX
    const y = (e.clientY - rect.top - centerY) / centerY
    
    mouseX.set(x * 100)
    mouseY.set(y * 100)
  }, [mouseX, mouseY, enableParallax])

  const handleMouseLeave = useCallback(() => {
    if (!enableParallax) return
    mouseX.set(0)
    mouseY.set(0)
  }, [mouseX, mouseY, enableParallax])

  // Container classes based on size
  const containerClasses = cn({
    'container-narrow': containerSize === 'narrow',
    'container-luxury': containerSize === 'default',
    'container-wide': containerSize === 'wide',
    'w-full px-4': containerSize === 'full',
  })

  // Spacing classes
  const spacingClasses = cn({
    'py-8': spacing === 'sm',
    'py-12': spacing === 'md', 
    'py-16': spacing === 'lg',
    'py-24': spacing === 'xl',
  })

  // Background variants
  const backgroundClasses = cn(
    'min-h-screen',
    {
      // Default - Warm cream with subtle gradients
      'bg-gradient-to-br from-neutral-50 via-orange-50/30 to-amber-50/20': 
        backgroundVariant === 'default',
      
      // Luxury - Enhanced gradients with depth
      'bg-gradient-to-br from-neutral-50 via-emerald-50/20 to-gold-light/30': 
        backgroundVariant === 'luxury',
        
      // Minimal - Clean light background
      'bg-neutral-50': 
        backgroundVariant === 'minimal',
    }
  )

  return (
    <>
      {/* SEO Meta Tags */}
      {title && (
        <title>{title} | Mint Lease</title>
      )}
      {description && (
        <meta name="description" content={description} />
      )}

      {/* Navigation Header */}
      <Header />
      
      {/* Main Content */}
      <motion.main
        ref={containerRef}
        className={cn(backgroundClasses, 'relative overflow-hidden', className)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        variants={animationVariants[animationVariant]}
        initial="initial"
        animate="animate"
        exit="exit"
        {...props}
      >
        {/* Interactive Background Effects */}
        {enableInteractiveBackground && (
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            {/* Primary gradient layer */}
            <motion.div 
              className={cn(
                'absolute inset-0',
                {
                  'bg-gradient-to-br from-orange-50/30 via-amber-50/20 to-emerald-50/10': 
                    backgroundVariant === 'default',
                  'bg-gradient-to-br from-emerald-50/20 via-gold-light/10 to-orange-50/15': 
                    backgroundVariant === 'luxury',
                  'bg-gradient-to-br from-neutral-100/50 to-neutral-50': 
                    backgroundVariant === 'minimal',
                }
              )}
              style={enableParallax ? {
                x: backgroundX,
                y: backgroundY,
                willChange: 'transform',
              } : {}}
            />
            
            {/* Accent gradient layer */}
            <motion.div 
              className={cn(
                'absolute top-0 right-0 w-[60%] h-[60%] blur-3xl',
                {
                  'bg-gradient-radial from-amber-50/25 to-transparent': 
                    backgroundVariant === 'default',
                  'bg-gradient-radial from-emerald-50/20 to-transparent': 
                    backgroundVariant === 'luxury',
                  'bg-gradient-radial from-neutral-100/30 to-transparent': 
                    backgroundVariant === 'minimal',
                }
              )}
              style={enableParallax ? {
                x: accentX,
                y: accentY,
                willChange: 'transform',
              } : {}}
            />

            {/* Interactive particles effect */}
            {backgroundVariant !== 'minimal' && (
              <motion.div
                className="absolute bottom-0 left-0 w-[40%] h-[40%] blur-2xl opacity-30"
                style={enableParallax ? {
                  x: useTransform(springMouseX, [-100, 100], [10, -10]),
                  y: useTransform(springMouseY, [-100, 100], [5, -5]),
                  willChange: 'transform',
                } : {}}
              >
                <div className="w-full h-full bg-gradient-radial from-emerald-100/40 to-transparent" />
              </motion.div>
            )}
          </div>
        )}

        {/* Content Container */}
        <div className={cn(containerClasses, spacingClasses, 'relative z-10')}>
          {children}
        </div>

        {/* GPU acceleration hint */}
        <div className="transform-gpu will-change-transform absolute inset-0 pointer-events-none" />
      </motion.main>
      
      {/* Footer */}
      <Footer />
    </>
  )
}

// Pre-configured page wrapper variants for common use cases
export const HeroPageWrapper = (props: Omit<PageWrapperProps, 'animationVariant' | 'backgroundVariant' | 'spacing'>) => (
  <PageWrapper 
    animationVariant="hero" 
    backgroundVariant="luxury" 
    spacing="xl" 
    {...props} 
  />
)

export const FormPageWrapper = (props: Omit<PageWrapperProps, 'animationVariant' | 'containerSize' | 'spacing'>) => (
  <PageWrapper 
    animationVariant="fadeInUp" 
    containerSize="narrow" 
    spacing="lg" 
    {...props} 
  />
)

export const ContentPageWrapper = (props: Omit<PageWrapperProps, 'animationVariant' | 'backgroundVariant'>) => (
  <PageWrapper 
    animationVariant="staggerContainer" 
    backgroundVariant="default" 
    {...props} 
  />
)

export const MinimalPageWrapper = (props: Omit<PageWrapperProps, 'backgroundVariant' | 'enableInteractiveBackground'>) => (
  <PageWrapper 
    backgroundVariant="minimal" 
    enableInteractiveBackground={false} 
    {...props} 
  />
)

export default PageWrapper 