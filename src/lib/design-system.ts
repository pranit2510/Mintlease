/**
 * MINT LEASE V4 - DESIGN SYSTEM UTILITIES
 * Complete implementation of the luxury design system
 * Features: Motion variants, spring configs, animations, utilities
 */

import { Variants, Transition } from 'framer-motion'

// ===== SPRING CONFIGURATIONS (120FPS Optimized) =====

export const springConfigs = {
  ultraSmooth: {
    stiffness: 400,
    damping: 28,
    mass: 0.15,
    restSpeed: 0.01,
    restDelta: 0.001
  },
  
  floatingReturn: {
    stiffness: 350,
    damping: 32,
    mass: 0.12,
    restSpeed: 0.005,
    restDelta: 0.0005
  },
  
  visualUltra: {
    stiffness: 280,
    damping: 30,
    mass: 0.18,
    restSpeed: 0.008,
    restDelta: 0.0008
  },
  
  bouncy: {
    stiffness: 300,
    damping: 15,
    mass: 0.8
  },
  
  gentle: {
    stiffness: 200,
    damping: 50,
    mass: 1
  }
}

// ===== EASING FUNCTIONS =====

export const easings = {
  luxury: [0.4, 0.0, 0.2, 1] as const,
  bounce: [0.68, -0.55, 0.265, 1.55] as const,
  smooth: [0.25, 0.46, 0.45, 0.94] as const,
  elastic: [0.175, 0.885, 0.32, 1.275] as const
}

// ===== TRANSITION PRESETS =====

export const transitions: Record<string, Transition> = {
  fast: {
    duration: 0.15,
    ease: easings.luxury
  },
  
  medium: {
    duration: 0.3,
    ease: easings.luxury
  },
  
  slow: {
    duration: 0.5,
    ease: easings.luxury
  },
  
  spring: {
    type: "spring",
    ...springConfigs.ultraSmooth
  },
  
  springFloating: {
    type: "spring",
    ...springConfigs.floatingReturn
  },
  
  springBouncy: {
    type: "spring",
    ...springConfigs.bouncy
  }
}

// ===== MOTION VARIANTS =====

export const motionVariants = {
  // Button Animations
  buttonHover: {
    scale: 1.02,
    y: -2,
    rotateX: 2,
    rotateY: 1,
    transition: { type: "spring", stiffness: 400, damping: 17 }
  },
  
  buttonTap: {
    scale: 0.98,
    y: 0,
    rotateX: 0,
    rotateY: 0,
    transition: { type: "spring", stiffness: 400, damping: 17 }
  },
  
  // Card Animations
  cardHover: {
    scale: 1.01,
    y: -8,
    rotateX: 3,
    transition: { type: "spring", stiffness: 300, damping: 20 }
  },
  
  cardTap: {
    scale: 0.99,
    y: -4,
    transition: { type: "spring", stiffness: 400, damping: 25 }
  },
  
  // Luxury Card with Enhanced Depth
  luxuryCardHover: {
    scale: 1.01,
    y: -12,
    rotateX: 4,
    rotateY: 2,
    transition: { type: "spring", stiffness: 280, damping: 30 }
  },
  
  // Interactive Elements
  interactiveHover: {
    scale: 1.05,
    transition: { type: "spring", stiffness: 400, damping: 25 }
  },
  
  interactiveTap: {
    scale: 0.95,
    transition: { type: "spring", stiffness: 400, damping: 25 }
  }
}

// ===== ANIMATION VARIANTS =====

export const animationVariants: Record<string, Variants> = {
  // Fade in from bottom
  fadeInUp: {
    initial: { 
      opacity: 0, 
      y: 40,
      scale: 0.95
    },
    animate: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: easings.smooth
      }
    },
    exit: {
      opacity: 0,
      y: 20,
      scale: 0.95,
      transition: {
        duration: 0.3,
        ease: easings.luxury
      }
    }
  },
  
  // Fade in with scale
  fadeInScale: {
    initial: { 
      opacity: 0, 
      scale: 0.8,
      rotateX: -15
    },
    animate: { 
      opacity: 1, 
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        ...springConfigs.visualUltra
      }
    }
  },
  
  // Stagger children animation
  staggerContainer: {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: easings.luxury,
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  },
  
  // Individual stagger items
  staggerItem: {
    initial: { 
      opacity: 0, 
      y: 30,
      rotateX: -15,
      scale: 0.95
    },
    animate: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
        mass: 0.5
      }
    }
  },
  
  // Hero section animation
  hero: {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 0.8,
        duration: 1.2
      }
    }
  },
  
  // Floating animation
  floating: {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  },
  
  // Pulse glow effect
  pulseGlow: {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [0.8, 1, 0.8],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  },
  
  // Slide in from left
  slideInLeft: {
    initial: { x: -100, opacity: 0 },
    animate: { 
      x: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        ...springConfigs.ultraSmooth
      }
    }
  },
  
  // Slide in from right
  slideInRight: {
    initial: { x: 100, opacity: 0 },
    animate: { 
      x: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        ...springConfigs.ultraSmooth
      }
    }
  },
  
  // Modal/Overlay animations
  modalOverlay: {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { duration: 0.3 }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 }
    }
  },
  
  modalContent: {
    initial: { 
      opacity: 0, 
      scale: 0.95,
      y: 20
    },
    animate: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        ...springConfigs.floatingReturn
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: 20,
      transition: { duration: 0.2 }
    }
  }
}

// ===== INTERACTION VARIANTS =====

export const interactionVariants = {
  // Standard button interactions
  button: {
    rest: { scale: 1, y: 0 },
    hover: motionVariants.buttonHover,
    tap: motionVariants.buttonTap
  },
  
  // Card interactions
  card: {
    rest: { scale: 1, y: 0, rotateX: 0, rotateY: 0 },
    hover: motionVariants.cardHover,
    tap: motionVariants.cardTap
  },
  
  // Luxury card interactions
  luxuryCard: {
    rest: { scale: 1, y: 0, rotateX: 0, rotateY: 0 },
    hover: motionVariants.luxuryCardHover,
    tap: motionVariants.cardTap
  },
  
  // Interactive elements
  interactive: {
    rest: { scale: 1 },
    hover: motionVariants.interactiveHover,
    tap: motionVariants.interactiveTap
  }
}

// ===== UTILITY FUNCTIONS =====

/**
 * Get reduced motion preferences
 */
export const getReducedMotion = () => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Create responsive animation based on reduced motion preference
 */
export const createResponsiveAnimation = (
  normalAnimation: Variants,
  reducedAnimation?: Variants
): Variants => {
  if (getReducedMotion()) {
    return reducedAnimation || {
      initial: { opacity: 0 },
      animate: { opacity: 1, transition: { duration: 0.2 } }
    }
  }
  return normalAnimation
}

/**
 * Create staggered animation for multiple children
 */
export const createStaggerAnimation = (
  itemVariant: Variants,
  staggerDelay: number = 0.1,
  delayChildren: number = 0.1
): { container: Variants; item: Variants } => ({
  container: {
    animate: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delayChildren
      }
    }
  },
  item: itemVariant
})

/**
 * Create hover interaction with spring physics
 */
export const createHoverInteraction = (
  hoverScale: number = 1.02,
  hoverY: number = -2,
  springConfig = springConfigs.ultraSmooth
) => ({
  whileHover: {
    scale: hoverScale,
    y: hoverY,
    transition: { type: "spring", ...springConfig }
  },
  whileTap: {
    scale: 0.98,
    y: 0,
    transition: { type: "spring", ...springConfig }
  }
})

/**
 * Design system CSS class names for easy application
 */
export const designSystemClasses = {
  // Layout
  containerLuxury: 'container-luxury',
  containerWide: 'container-wide', 
  containerNarrow: 'container-narrow',
  gridResponsive: 'grid-responsive',
  gridResponsive4: 'grid-responsive-4',
  
  // Buttons
  btnPrimary: 'btn-primary',
  btnSecondary: 'btn-secondary',
  btnOutline: 'btn-outline',
  btnLuxury: 'btn-luxury',
  btnSm: 'btn-sm',
  btnMd: 'btn-md',
  btnLg: 'btn-lg',
  btnXl: 'btn-xl',
  
  // Cards & Effects
  luxuryCard: 'luxury-card',
  glass: 'glass',
  glassStrong: 'glass-strong',
  depth3d: 'depth-3d',
  card3d: 'card-3d',
  emerald3d: 'emerald-3d',
  gold3d: 'gold-3d',
  
  // Shadows
  shadow3d: 'shadow-3d',
  shadow3dSm: 'shadow-3d-sm',
  shadow3dLg: 'shadow-3d-lg',
  shadow3dXl: 'shadow-3d-xl',
  shadow3dHover: 'shadow-3d-hover',
  shadow3dInset: 'shadow-3d-inset',
  shadowLuxury: 'shadow-luxury',
  shadowGlow: 'shadow-glow',
  
  // Typography
  headingLuxury: 'heading-luxury',
  text3dLuxury: 'text-3d-luxury',
  textShadowLuxury: 'text-shadow-luxury',
  textShadowLuxuryEmerald: 'text-shadow-luxury-emerald',
  textFloat: 'text-float',
  textHoverLift: 'text-hover-lift',
  gradientText: 'gradient-text',
  
  // Animations
  floating: 'floating',
  floating3d: 'floating-3d',
  pulseGlow: 'pulse-glow',
  pulse3d: 'pulse-3d',
  
  // Interactions
  interactiveZone: 'interactive-zone',
  
  // Springs
  springUltraSmooth: 'spring-ultra-smooth',
  springBouncy: 'spring-bouncy',
  springFloating: 'spring-floating',
  
  // Performance
  transformGpu: 'transform-gpu',
  willChangeTransform: 'will-change-transform',
  
  // Forms
  inputLuxury: 'input-luxury',
  focusLuxury: 'focus-luxury'
}

// ===== THEME COLORS =====

export const themeColors = {
  primary: {
    emerald: '#047857',
    emeraldLight: '#10b981',
    emeraldDark: '#065f46'
  },
  
  luxury: {
    goldPrimary: '#f59e0b',
    goldSecondary: '#fbbf24',
    goldLight: '#fef3c7'
  },
  
  neutral: {
    50: '#FEF7ED',
    100: '#FDF4E7',
    200: '#FCF0E1',
    300: '#E7D5C7',
    400: '#C9B29B',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717'
  }
}

export default {
  springConfigs,
  easings,
  transitions,
  motionVariants,
  animationVariants,
  interactionVariants,
  designSystemClasses,
  themeColors,
  getReducedMotion,
  createResponsiveAnimation,
  createStaggerAnimation,
  createHoverInteraction
} 