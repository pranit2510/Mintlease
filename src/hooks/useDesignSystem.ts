'use client'

import { useReducedMotion } from 'framer-motion'
import { 
  springConfigs,
  easings,
  transitions,
  motionVariants,
  animationVariants,
  interactionVariants,
  designSystemClasses,
  themeColors,
  createResponsiveAnimation,
  createStaggerAnimation,
  createHoverInteraction
} from '@/lib/design-system'

/**
 * Design System Hook - Centralized access to all design system utilities
 * Provides: Animations, spring configs, interactions, classes, and responsive helpers
 */
export const useDesignSystem = () => {
  const shouldReduceMotion = useReducedMotion()

  // Responsive spring configurations
  const responsiveSpringConfigs = {
    ultraSmooth: shouldReduceMotion ? springConfigs.gentle : springConfigs.ultraSmooth,
    floatingReturn: shouldReduceMotion ? springConfigs.gentle : springConfigs.floatingReturn,
    visualUltra: shouldReduceMotion ? springConfigs.gentle : springConfigs.visualUltra,
    bouncy: shouldReduceMotion ? springConfigs.gentle : springConfigs.bouncy,
  }

  // Responsive animation variants
  const responsiveAnimationVariants = {
    fadeInUp: createResponsiveAnimation(animationVariants.fadeInUp),
    fadeInScale: createResponsiveAnimation(animationVariants.fadeInScale),
    staggerContainer: createResponsiveAnimation(animationVariants.staggerContainer),
    staggerItem: createResponsiveAnimation(animationVariants.staggerItem),
    hero: createResponsiveAnimation(animationVariants.hero),
    floating: shouldReduceMotion ? { animate: {} } : animationVariants.floating,
    pulseGlow: shouldReduceMotion ? { animate: {} } : animationVariants.pulseGlow,
    slideInLeft: createResponsiveAnimation(animationVariants.slideInLeft),
    slideInRight: createResponsiveAnimation(animationVariants.slideInRight),
    modalOverlay: createResponsiveAnimation(animationVariants.modalOverlay),
    modalContent: createResponsiveAnimation(animationVariants.modalContent),
  }

  // Responsive interaction variants
  const responsiveInteractionVariants = {
    button: shouldReduceMotion ? {
      rest: { scale: 1, y: 0 },
      hover: { scale: 1, y: 0 },
      tap: { scale: 1, y: 0 }
    } : interactionVariants.button,
    
    card: shouldReduceMotion ? {
      rest: { scale: 1, y: 0, rotateX: 0, rotateY: 0 },
      hover: { scale: 1, y: 0, rotateX: 0, rotateY: 0 },
      tap: { scale: 1, y: 0, rotateX: 0, rotateY: 0 }
    } : interactionVariants.card,
    
    luxuryCard: shouldReduceMotion ? {
      rest: { scale: 1, y: 0, rotateX: 0, rotateY: 0 },
      hover: { scale: 1, y: 0, rotateX: 0, rotateY: 0 },
      tap: { scale: 1, y: 0, rotateX: 0, rotateY: 0 }
    } : interactionVariants.luxuryCard,
    
    interactive: shouldReduceMotion ? {
      rest: { scale: 1 },
      hover: { scale: 1 },
      tap: { scale: 1 }
    } : interactionVariants.interactive,
  }

  // Helper functions for common patterns
  const createButtonAnimation = (variant: 'primary' | 'secondary' | 'luxury' | 'outline' = 'primary') => {
    if (shouldReduceMotion) {
      return {
        whileHover: {},
        whileTap: {},
        transition: { duration: 0 }
      }
    }

    return {
      whileHover: motionVariants.buttonHover,
      whileTap: motionVariants.buttonTap,
      transition: { type: "spring", ...springConfigs.ultraSmooth }
    }
  }

  const createCardAnimation = (variant: 'default' | 'luxury' = 'default') => {
    if (shouldReduceMotion) {
      return {
        whileHover: {},
        whileTap: {},
        transition: { duration: 0 }
      }
    }

    return {
      whileHover: variant === 'luxury' ? motionVariants.luxuryCardHover : motionVariants.cardHover,
      whileTap: motionVariants.cardTap,
      transition: { type: "spring", ...springConfigs.floatingReturn }
    }
  }

  const createStaggeredListAnimation = (staggerDelay: number = 0.1) => {
    return createStaggerAnimation(
      responsiveAnimationVariants.staggerItem,
      staggerDelay,
      0.1
    )
  }

  // Page-specific animation presets
  const pageAnimations = {
    hero: responsiveAnimationVariants.hero,
    form: responsiveAnimationVariants.fadeInUp,
    content: responsiveAnimationVariants.staggerContainer,
    modal: {
      overlay: responsiveAnimationVariants.modalOverlay,
      content: responsiveAnimationVariants.modalContent
    }
  }

  // Component class builders
  const buildButtonClasses = (variant: 'primary' | 'secondary' | 'outline' | 'luxury' = 'primary', size: 'sm' | 'md' | 'lg' | 'xl' = 'md') => {
    const variantClass = designSystemClasses[`btn${variant.charAt(0).toUpperCase() + variant.slice(1)}` as keyof typeof designSystemClasses]
    const sizeClass = designSystemClasses[`btn${size.charAt(0).toUpperCase() + size.slice(1)}` as keyof typeof designSystemClasses]
    return `${variantClass} ${sizeClass} ${designSystemClasses.transformGpu}`
  }

  const buildCardClasses = (variant: 'luxury' | 'glass' | 'default' = 'luxury', shadow: 'sm' | 'md' | 'lg' | 'xl' = 'md') => {
    const variantClass = variant === 'luxury' ? designSystemClasses.luxuryCard : 
                        variant === 'glass' ? designSystemClasses.glass : 
                        designSystemClasses.card3d
    const shadowClass = designSystemClasses[`shadow3d${shadow === 'md' ? '' : shadow.charAt(0).toUpperCase() + shadow.slice(1)}` as keyof typeof designSystemClasses]
    return `${variantClass} ${shadowClass} ${designSystemClasses.transformGpu}`
  }

  const buildInputClasses = (variant: 'luxury' | 'default' = 'luxury') => {
    return variant === 'luxury' ? 
      `${designSystemClasses.inputLuxury} ${designSystemClasses.focusLuxury}` :
      'border border-neutral-200 rounded-lg px-4 py-3 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200'
  }

  // Layout utilities
  const containerClasses = {
    narrow: designSystemClasses.containerNarrow,
    default: designSystemClasses.containerLuxury,
    wide: designSystemClasses.containerWide,
  }

  const gridClasses = {
    responsive: designSystemClasses.gridResponsive,
    responsive4: designSystemClasses.gridResponsive4,
  }

  // Typography utilities
  const typographyClasses = {
    heading: designSystemClasses.headingLuxury,
    textShadow: designSystemClasses.textShadowLuxury,
    textShadowEmerald: designSystemClasses.textShadowLuxuryEmerald,
    gradient: designSystemClasses.gradientText,
    floating: designSystemClasses.textFloat,
    hoverLift: designSystemClasses.textHoverLift,
  }

  // Performance utilities
  const performanceClasses = {
    gpu: designSystemClasses.transformGpu,
    willChange: designSystemClasses.willChangeTransform,
  }

  return {
    // Core configurations
    springConfigs: responsiveSpringConfigs,
    easings,
    transitions,
    
    // Animation variants (responsive)
    animations: responsiveAnimationVariants,
    interactions: responsiveInteractionVariants,
    motionVariants,
    
    // Page-specific presets
    pageAnimations,
    
    // Helper functions
    createButtonAnimation,
    createCardAnimation,
    createStaggeredListAnimation,
    createHoverInteraction,
    
    // Class builders
    buildButtonClasses,
    buildCardClasses,
    buildInputClasses,
    
    // Layout utilities
    containerClasses,
    gridClasses,
    
    // Typography utilities
    typographyClasses,
    
    // Performance utilities
    performanceClasses,
    
    // Theme colors
    colors: themeColors,
    
    // State
    shouldReduceMotion,
    
    // Raw classes (for advanced usage)
    classes: designSystemClasses,
  }
}

export default useDesignSystem 