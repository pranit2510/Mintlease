'use client'

import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import { motion, useAnimation, useInView, useMotionValue, useSpring, AnimatePresence, useReducedMotion, useTransform } from 'framer-motion'
import { gsap } from 'gsap'
import { ArrowRight, Play, Shield, Award, Users, DollarSign, Star } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { animationVariants } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { PremiumBadge } from '@/components/ui/PremiumBadge'

/**
 * Hero Section - Interactive Luxury Auto Brokerage Landing
 * Features: Mouse-responsive parallax, Interactive particles, Dynamic depth
 */
export const Hero: React.FC = () => {
  const router = useRouter()
  const containerRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  const controls = useAnimation()
  const isInView = useInView(containerRef, { once: true, amount: 0.3 })
  const shouldReduceMotion = useReducedMotion()

  // Fix hydration issues by detecting client-side mounting
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Interactive mouse tracking - 120fps optimized
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const [isHovering, setIsHovering] = useState(false)

  // Ultra-smooth spring animations for 120fps
  const springMouseX = useSpring(mouseX, { 
    stiffness: shouldReduceMotion ? 100 : 400, 
    damping: shouldReduceMotion ? 40 : 25, 
    mass: 0.1,
    restSpeed: 0.1,
    restDelta: 0.01
  })
  const springMouseY = useSpring(mouseY, { 
    stiffness: shouldReduceMotion ? 100 : 400, 
    damping: shouldReduceMotion ? 40 : 25, 
    mass: 0.1,
    restSpeed: 0.1,
    restDelta: 0.01
  })

  // Smooth transform values for parallax
  const backgroundX = useTransform(springMouseX, [-100, 100], [-20, 20])
  const backgroundY = useTransform(springMouseY, [-100, 100], [-10, 10])
  const accentX = useTransform(springMouseX, [-100, 100], [-5, 5])
  const accentY = useTransform(springMouseY, [-100, 100], [-8, 8])

  // Interactive depth layers
  const [interactiveIntensity, setInteractiveIntensity] = useState(1)

  // 120fps optimized typewriter effect - using motion values
  const [currentWord, setCurrentWord] = useState(0)
  const [currentChar, setCurrentChar] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [displayText, setDisplayText] = useState('')
  const cursorOpacity = useMotionValue(1)
  const textScale = useMotionValue(1)
  const [isTyping, setIsTyping] = useState(true)

  // Performance optimized word array
  const words = useMemo(() => [
    "Spotted.",
    "Approved.", 
    "Signed.",
    "Delivered."
  ], [])

  // Smooth cursor animation with motion values
  const cursorSpring = useSpring(cursorOpacity, {
    stiffness: 300,
    damping: 30,
    mass: 0.1
  })

  // Refs for cleanup
  const typewriterTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const cursorTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Mouse movement handler for interactive effects
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return
    
    const rect = containerRef.current.getBoundingClientRect()
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    const x = (e.clientX - rect.left - centerX) / centerX
    const y = (e.clientY - rect.top - centerY) / centerY
    
    mouseX.set(x * 100)
    mouseY.set(y * 100)
    
    // Adjust interactive intensity based on distance from center
    const distance = Math.sqrt(x * x + y * y)
    setInteractiveIntensity(Math.min(1 + distance * 0.5, 2))
  }, [mouseX, mouseY])

  // Enhanced hover effects
  const handleMouseEnter = useCallback(() => {
    setIsHovering(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false)
    mouseX.set(0)
    mouseY.set(0)
    setInteractiveIntensity(1)
  }, [mouseX, mouseY])

    // 120fps optimized typewriter effect with frame-based timing
  useEffect(() => {
    if (!isTyping || shouldReduceMotion) return

    const word = words[currentWord]
    if (!word) return // Safety check
    
    const performTypewriterAction = () => {
      if (isPaused) {
        setIsPaused(false)
        setIsDeleting(true)
        // Subtle scale animation when transitioning
        textScale.set(0.98)
        setTimeout(() => textScale.set(1), 100)
        return
      }

      if (!isDeleting) {
        // Typing phase - optimized character addition
        if (currentChar < word.length) {
          setDisplayText(word.substring(0, currentChar + 1))
          setCurrentChar(prev => prev + 1)
          // Subtle character appearance effect
          textScale.set(1.02)
          setTimeout(() => textScale.set(1), 50)
        } else {
          // Pause at end of word
          setIsPaused(true)
        }
      } else {
        // Deleting phase - optimized character removal
        if (currentChar > 0) {
          setDisplayText(word.substring(0, currentChar - 1))
          setCurrentChar(prev => prev - 1)
        } else {
          // Move to next word with wraparound
          setIsDeleting(false)
          setCurrentWord(prev => (prev + 1) % words.length)
        }
      }
    }

    // Frame-rate optimized timing for 120fps
    const getOptimalDelay = () => {
      if (isPaused) return 2000 // Comfortable reading pause
      if (isDeleting) return 42  // ~24fps for deletion (120/24 = 5 frames)
      return 100 + Math.random() * 20 // Natural typing variation
    }

    typewriterTimeoutRef.current = setTimeout(performTypewriterAction, getOptimalDelay())

    return () => {
      if (typewriterTimeoutRef.current) {
        clearTimeout(typewriterTimeoutRef.current)
        typewriterTimeoutRef.current = null
      }
    }
  }, [currentChar, currentWord, isDeleting, isPaused, words, isTyping, textScale, shouldReduceMotion])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (typewriterTimeoutRef.current) {
        clearTimeout(typewriterTimeoutRef.current)
      }
      if (cursorTimeoutRef.current) {
        clearTimeout(cursorTimeoutRef.current)
      }
    }
  }, [])

  // 120fps optimized cursor blinking effect
  useEffect(() => {
    if (!isTyping || shouldReduceMotion) return

    const blinkCursor = () => {
      cursorOpacity.set(cursorOpacity.get() > 0.5 ? 0 : 1)
      cursorTimeoutRef.current = setTimeout(blinkCursor, 530) // Consistent timing
    }

    // Start cursor blinking
    cursorTimeoutRef.current = setTimeout(blinkCursor, 530)

    return () => {
      if (cursorTimeoutRef.current) {
        clearTimeout(cursorTimeoutRef.current)
        cursorTimeoutRef.current = null
      }
    }
  }, [isTyping, cursorOpacity, shouldReduceMotion])

  useEffect(() => {
    if (isInView) {
      controls.start('animate')
    }
  }, [isInView, controls])

  useEffect(() => {
    // Enhanced GSAP Timeline for advanced animations
    const tl = gsap.timeline({ delay: 0.3 })
    
    // Title animation with enhanced effects
    tl.fromTo(titleRef.current, 
      { 
        opacity: 0, 
        y: 120, 
        scale: 0.8,
        rotateX: 45
      },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        rotateX: 0,
        duration: 1.4, 
        ease: "power3.out" 
      }
    )
    // Subtitle with floating effect
    .fromTo(subtitleRef.current,
      { 
        opacity: 0, 
        y: 60,
        filter: "blur(10px)"
      },
      { 
        opacity: 1, 
        y: 0,
        filter: "blur(0px)",
        duration: 1.0, 
        ease: "power2.out" 
      },
      "-=0.9"
    )
    // CTA buttons with bounce effect
    .fromTo(ctaRef.current,
      { 
        opacity: 0, 
        y: 40, 
        scale: 0.8,
        rotateY: 15
      },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        rotateY: 0,
        duration: 0.8, 
        ease: "back.out(2.5)" 
      },
      "-=0.5"
    )
    // Stats with stagger effect
    .fromTo(statsRef.current?.children || [],
      { 
        opacity: 0, 
        y: 30,
        scale: 0.9,
        rotateZ: -5
      },
      { 
        opacity: 1, 
        y: 0,
        scale: 1,
        rotateZ: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out" 
      },
      "-=0.4"
    )

    return () => {
      tl.kill()
    }
  }, [])

  const handleScrollToDeals = () => {
    router.push('/inventory')
  }

  const handleWatchVideo = () => {
    // TODO: Implement video modal
    // Watch video clicked
  }

  // Company names for infinite carousel
  const companyNames = [
    "Mercedes-Benz", "BMW", "Audi", "Porsche", "Lamborghini", "Ferrari", 
    "Bentley", "Rolls-Royce", "Maserati", "Lexus", "Tesla", "Range Rover",
    "Jaguar", "McLaren", "Aston Martin", "Bugatti"
  ]

  return (
    <section 
      ref={containerRef}
      className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden w-full"
      style={{ 
        backgroundColor: '#FEF7ED',
        overflowX: 'hidden',
        maxWidth: '100vw',
        position: 'relative'
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* 120fps Optimized Luxury Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Primary gradient layer - GPU accelerated */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-orange-50/30 via-amber-50/20 to-emerald-50/10"
          style={{
            x: backgroundX,
            y: backgroundY,
            willChange: 'transform',
            transform: 'translate3d(0,0,0)', // Force GPU layer
          }}
          suppressHydrationWarning
        />
        
        {/* Subtle accent glow - Optimized */}
        <motion.div 
          className="absolute top-0 right-0 w-[60%] h-[60%] bg-gradient-radial from-amber-50/25 to-transparent blur-3xl"
          style={{
            x: accentX,
            y: accentY,
            opacity: useTransform(
              useMotionValue(isHovering ? 1 : 0.7), 
              [0, 1], 
              [0.2, 0.3]
            ),
            willChange: 'transform, opacity',
            transform: 'translate3d(0,0,0)', // Force GPU layer
          }}
          suppressHydrationWarning
        />
        
        {/* Minimal ambient light - Simplified */}
        <motion.div 
          className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-gradient-radial from-orange-100/15 to-transparent blur-3xl"
          style={{
            x: useTransform(springMouseX, [-100, 100], [-3, 3]),
            y: useTransform(springMouseY, [-100, 100], [-5, 5]),
            willChange: 'transform',
            transform: 'translate3d(0,0,0)', // Force GPU layer
          }}
          suppressHydrationWarning
        />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 mobile-sm:px-5 mobile-md:px-5 mobile-lg:px-6 lg:px-8 py-12 mobile-sm:py-16 container-mobile">
        <motion.div
          className="text-center space-y-6 mobile-sm:space-y-8 mobile-md:space-y-10"
          initial={isMounted ? "initial" : false}
          animate={controls}
          variants={animationVariants.luxuryStagger}
          suppressHydrationWarning
        >
          {/* Simplified Hero Title with Integrated Typewriter */}
          <motion.div 
            className="space-y-4 mobile-sm:space-y-6 mobile-md:space-y-8"
            variants={animationVariants.premiumSlideUp}
            suppressHydrationWarning
          >
            <motion.div className="space-y-2">
              <motion.h1 
                ref={titleRef}
                className="text-3xl mobile-sm:text-4xl mobile-md:text-4xl mobile-lg:text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-tight"
                style={{
                  background: 'linear-gradient(135deg, #000000 0%, #1f2937 50%, #059669 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Your Dream Car
              </motion.h1>
              
              {/* Integrated Typewriter Effect */}
              <motion.div 
                className="relative flex items-center justify-center py-4 mobile-sm:py-6 min-h-[4rem] mobile-sm:min-h-[5rem] mobile-md:min-h-[6rem] md:min-h-[7rem] lg:min-h-[8rem]"
                variants={animationVariants.premiumSlideUp}
                suppressHydrationWarning
              >
                <div className="relative inline-flex items-center justify-center">
                  {/* Enhanced container with 120fps text animation */}
                  <motion.div 
                    className="relative flex items-center justify-center px-3 mobile-sm:px-4 mobile-md:px-6 py-2"
                    style={{
                      scale: textScale,
                      willChange: 'transform',
                    }}
                    suppressHydrationWarning
                  >
                    <motion.span
                      className="text-xl mobile-sm:text-2xl mobile-md:text-3xl mobile-lg:text-4xl sm:text-5xl lg:text-6xl font-semibold whitespace-nowrap"
                      style={{
                        background: 'linear-gradient(135deg, #059669 0%, #10b981 30%, #f97316 70%, #ea580c 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        letterSpacing: '-0.01em',
                        lineHeight: '1.4',
                        paddingTop: '0.25rem',
                        paddingBottom: '0.25rem',
                        willChange: 'transform',
                      }}
                      animate={{
                        scale: displayText ? 1 : 0.95,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                        mass: 0.1,
                      }}
                      suppressHydrationWarning
                    >
                      {displayText || '\u00A0'}
                      {/* Inline cursor positioned right after text - GPU accelerated */}
                      <motion.span
                        className="inline-block w-1 h-[0.8em] bg-emerald-600 rounded-sm ml-1 align-middle"
                        style={{
                          verticalAlign: 'middle',
                          opacity: cursorSpring,
                          willChange: 'opacity, transform',
                          transform: 'translate3d(0,0,0)', // Force GPU layer
                        }}
                        suppressHydrationWarning
                      />
                    </motion.span>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
            
            <motion.p 
              ref={subtitleRef}
              className="text-base mobile-sm:text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed px-2 mobile-sm:px-0"
            >
              Save thousands with our expert negotiation and white-glove delivery service.
            </motion.p>
          </motion.div>

          {/* Single Primary CTA - 120fps Optimized */}
          <motion.div 
            ref={ctaRef}
            className="flex justify-center"
            variants={animationVariants.premiumSlideUp}
            suppressHydrationWarning
          >
            <motion.div
              whileHover={{ 
                scale: shouldReduceMotion ? 1 : 1.02, 
                y: shouldReduceMotion ? 0 : -3 
              }}
              whileTap={{ 
                scale: shouldReduceMotion ? 1 : 0.98,
                y: 0
              }}
              transition={{ 
                type: "spring",
                stiffness: 400,
                damping: 25,
                mass: 0.1
              }}
              style={{
                willChange: 'transform',
                boxShadow: '0 8px 20px -4px rgba(5, 150, 105, 0.3), 0 16px 40px -8px rgba(5, 150, 105, 0.2), 0 32px 64px -16px rgba(0, 0, 0, 0.15), inset 0 2px 0 rgba(255, 255, 255, 0.1)',
                borderRadius: '9999px'
              }}
              suppressHydrationWarning
            >
              <motion.button
                className="bg-emerald-600 text-white border-0 rounded-full px-6 mobile-sm:px-8 mobile-md:px-10 py-3 mobile-sm:py-4 mobile-md:py-5 text-base mobile-sm:text-lg font-medium transition-all duration-300 group relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                }}
                whileHover={{
                  background: 'linear-gradient(135deg, #059669 0%, #10b981 30%, #f97316 70%, #ea580c 100%)',
                }}
                transition={{ duration: 0.3 }}
                onClick={handleScrollToDeals}
              >
                <span className="flex items-center relative z-10">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-4 w-4 mobile-sm:h-5 mobile-sm:w-5 group-hover:translate-x-1 transition-transform duration-200" />
                </span>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Subtle Trust Indicators */}
          <motion.div 
            ref={statsRef}
            className="flex flex-wrap items-center justify-center gap-x-4 mobile-sm:gap-x-6 mobile-md:gap-x-6 mobile-lg:gap-x-8 sm:gap-x-12 gap-y-3 mobile-sm:gap-y-4 mt-6 mobile-sm:mt-8 px-2 mobile-sm:px-4 trust-indicators-390"
            variants={animationVariants.premiumStagger}
            suppressHydrationWarning
          >
            {/* Customers */}
            <motion.div
              variants={animationVariants.saasCardEntrance}
              className="flex items-center gap-1.5 mobile-sm:gap-2"
              suppressHydrationWarning
            >
              <Users className="w-3.5 h-3.5 mobile-sm:w-4 mobile-sm:h-4 text-emerald-600/70" />
              <div className="flex items-baseline gap-1">
                <span className="text-base mobile-sm:text-lg sm:text-xl font-semibold text-neutral-800">2,500+</span>
                <span className="text-xs mobile-sm:text-sm text-neutral-500">Customers</span>
              </div>
            </motion.div>

            {/* Separator */}
            <div className="hidden mobile-md:block w-px h-4 mobile-sm:h-5 bg-neutral-300/60"></div>

            {/* Savings */}
            <motion.div
              variants={animationVariants.saasCardEntrance}
              className="flex items-center gap-1.5 mobile-sm:gap-2"
              suppressHydrationWarning
            >
              <DollarSign className="w-3.5 h-3.5 mobile-sm:w-4 mobile-sm:h-4 text-amber-600/70" />
              <div className="flex items-baseline gap-1">
                <span className="text-base mobile-sm:text-lg sm:text-xl font-semibold text-neutral-800">$15M+</span>
                <span className="text-xs mobile-sm:text-sm text-neutral-500">Total Saved</span>
              </div>
            </motion.div>

            {/* Separator */}
            <div className="hidden mobile-md:block w-px h-4 mobile-sm:h-5 bg-neutral-300/60"></div>

            {/* Rating */}
            <motion.div
              variants={animationVariants.saasCardEntrance}
              className="flex items-center gap-1.5 mobile-sm:gap-2"
              suppressHydrationWarning
            >
              <Star className="w-3.5 h-3.5 mobile-sm:w-4 mobile-sm:h-4 text-orange-500/70" />
              <div className="flex items-baseline gap-1">
                <span className="text-base mobile-sm:text-lg sm:text-xl font-semibold text-neutral-800">5.0</span>
                <span className="text-xs mobile-sm:text-sm text-neutral-500">Rating</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Subtle Brand Carousel */}
          <motion.div
            className="mt-12 mobile-sm:mt-16 mobile-md:mt-20 w-full relative"
            initial={isMounted ? { opacity: 0 } : { opacity: 1 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.0, duration: 1.0 }}
            suppressHydrationWarning
          >
            {/* Minimal Header */}
            <motion.div 
              className="text-center mb-4 mobile-sm:mb-6"
              initial={isMounted ? { opacity: 0 } : { opacity: 1 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2, duration: 0.8 }}
              suppressHydrationWarning
            >
              <p className="text-xs mobile-sm:text-sm text-neutral-300 tracking-wide font-normal px-2">
                Delivering luxury brands & more
              </p>
            </motion.div>

            {/* Clean Infinite Carousel with CSS Clipping */}
            <div 
              className="relative py-4 mobile-sm:py-6 w-full"
              style={{
                clipPath: 'inset(0 0 0 0)',
                WebkitClipPath: 'inset(0 0 0 0)'
              }}
            >
              <div 
                className="relative overflow-hidden"
                style={{
                  maskImage: 'linear-gradient(90deg, transparent 0%, black 5%, black 95%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, black 5%, black 95%, transparent 100%)',
                  maskSize: '100% 100%',
                  WebkitMaskSize: '100% 100%'
                }}
              >
                <motion.div
                  className="flex items-center space-x-6 will-change-transform"
                  style={{
                    width: 'max-content',
                    transform: 'translate3d(0,0,0)',
                  }}
                  animate={{
                    x: [0, -1920],
                  }}
                  transition={{
                    x: {
                      repeat: Infinity,
                      repeatType: "loop",
                      duration: 45,
                      ease: "linear",
                    },
                  }}
                >
                  {[...companyNames, ...companyNames].map((company, index) => (
                    <div
                      key={`${company}-${index}`}
                      className="flex-shrink-0 text-center carousel-item-mobile"
                      style={{ minWidth: '80px' }}
                    >
                      <span className="text-xs mobile-sm:text-sm font-medium text-neutral-500 tracking-wide hover:text-neutral-700 transition-colors duration-300 carousel-text-mobile">
                        {company}
                      </span>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Minimal Scroll Indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2"
        animate={{ 
          y: [0, 4, 0],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-5 h-8 border border-neutral-400 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-2 bg-neutral-400 rounded-full mt-1.5"
            animate={{ 
              y: [0, 8, 0],
              opacity: [0.6, 0.2, 0.6]
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </motion.div>
    </section>
  )
}

export default Hero 