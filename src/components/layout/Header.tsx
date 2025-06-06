'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion, useMotionValue, useSpring, useTransform, useMotionValueEvent, useVelocity } from 'framer-motion'
import { Menu, X, Phone, Mail, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

/**
 * Ultra-Smooth 120fps Floating Header with Directional Transitions
 * Features: Advanced scroll direction detection, 120fps optimized springs, directional easing
 */
export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const shouldReduceMotion = useReducedMotion()
  const lastScrollTime = useRef(0)
  
  // Advanced 120fps scroll tracking with velocity and direction
  const scrollY = useMotionValue(0)
  const scrollVelocity = useVelocity(scrollY)
  const scrollProgress = useMotionValue(0)
  const scrollDirection = useMotionValue(0) // 1 for down, -1 for up
  const lastScrollY = useMotionValue(0)
  const isScrollingUp = useMotionValue(false)
  
  // 120fps Ultra-Premium Spring Configurations
  const ultraSmoothConfig = {
    stiffness: shouldReduceMotion ? 120 : 400,
    damping: shouldReduceMotion ? 35 : 28,
    mass: shouldReduceMotion ? 0.8 : 0.15,
    restSpeed: shouldReduceMotion ? 0.5 : 0.01,
    restDelta: shouldReduceMotion ? 0.2 : 0.001,
    velocity: 0
  }

  // Specialized config for "return to floating" transitions (scrolling up)
  const floatingReturnConfig = {
    stiffness: shouldReduceMotion ? 100 : 350,
    damping: shouldReduceMotion ? 40 : 32,
    mass: shouldReduceMotion ? 1 : 0.12,
    restSpeed: shouldReduceMotion ? 0.8 : 0.005,
    restDelta: shouldReduceMotion ? 0.3 : 0.0005,
    velocity: 0
  }

  // Visual elements config for silky smooth transitions
  const visualUltraConfig = {
    stiffness: shouldReduceMotion ? 80 : 280,
    damping: shouldReduceMotion ? 38 : 30,
    mass: shouldReduceMotion ? 1.2 : 0.18,
    restSpeed: shouldReduceMotion ? 1 : 0.008,
    restDelta: shouldReduceMotion ? 0.4 : 0.0008,
    velocity: 0
  }

  // Dynamic spring config based on scroll direction
  const getDynamicConfig = useCallback((isUp: boolean) => {
    return isUp ? floatingReturnConfig : ultraSmoothConfig
  }, [floatingReturnConfig, ultraSmoothConfig])

  // Advanced directional easing functions for 120fps
  const easeOutCubicUp = useCallback((t: number): number => {
    // Faster ease-out for returning to floating state
    return 1 - Math.pow(1 - t, 2.5)
  }, [])

  const easeInOutCubicDown = useCallback((t: number): number => {
    // Smoother ease-in-out for scrolling down
    return t < 0.5 ? 2 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
  }, [])

  // Ultra-smooth transforms with enhanced directional spring configs
  const navbarScale = useSpring(
    useTransform(scrollProgress, [0, 0.15, 0.4, 1], [1, 0.995, 0.99, 0.98]), 
    ultraSmoothConfig
  )
  
  const navbarY = useSpring(
    useTransform(scrollProgress, [0, 0.1, 0.3, 1], [0, -0.5, -1.5, -3]), 
    ultraSmoothConfig
  )
  
  const borderRadius = useSpring(
    useTransform(scrollProgress, [0, 0.08, 0.25, 0.6, 1], [0, 2, 6, 10, 12]), 
    visualUltraConfig
  )
  
  const navbarPadding = useSpring(
    useTransform(scrollProgress, [0, 0.05, 0.2, 0.5, 1], [0, 2, 8, 14, 16]), 
    visualUltraConfig
  )
  
  // Enhanced background transitions with velocity-aware easing
  const backgroundOpacity = useSpring(
    useTransform(scrollProgress, [0, 0.05, 0.15, 0.4, 1], [0, 0.1, 0.3, 0.7, 0.95]), 
    visualUltraConfig
  )
  
  const shadowIntensity = useSpring(
    useTransform(scrollProgress, [0, 0.08, 0.2, 0.5, 1], [0, 0.1, 0.3, 0.7, 1]), 
    visualUltraConfig
  )
  
  const borderOpacity = useSpring(
    useTransform(scrollProgress, [0, 0.1, 0.3, 0.7, 1], [0, 0.05, 0.15, 0.3, 0.4]), 
    visualUltraConfig
  )

  // Derived state for conditional rendering
  const isScrolled = useTransform(scrollProgress, (value) => value > 0.08)

  // Advanced 120fps scroll handling with velocity and direction awareness
  useMotionValueEvent(scrollY, "change", (latest) => {
    const currentTime = performance.now()
    const lastY = lastScrollY.get()
    const direction = latest > lastY ? 1 : -1
    const isUp = direction === -1
    
    // Update direction tracking
    scrollDirection.set(direction)
    isScrollingUp.set(isUp)
    lastScrollY.set(latest)
    
    // Extended scroll range with velocity-aware thresholds
    const startThreshold = 3
    const endThreshold = isUp ? 100 : 120 // Shorter range when scrolling up for faster response
    const rawProgress = Math.min(Math.max((latest - startThreshold) / (endThreshold - startThreshold), 0), 1)
    
    // Apply directional easing for 120fps smoothness
    let easedProgress: number
    if (shouldReduceMotion) {
      easedProgress = rawProgress
    } else {
      // Different easing curves based on scroll direction
      easedProgress = isUp ? easeOutCubicUp(rawProgress) : easeInOutCubicDown(rawProgress)
    }
    
    // Smooth progress updates with velocity consideration
    const velocity = scrollVelocity.get()
    const velocityFactor = Math.min(Math.abs(velocity) / 1000, 1)
    const finalProgress = easedProgress * (1 - velocityFactor * 0.1) // Slight damping at high velocity
    
    scrollProgress.set(finalProgress)
    lastScrollTime.current = currentTime
  })

  // Optimized scroll listener with 120fps targeting
  useEffect(() => {
    let rafId: number
    
    const handleScroll = () => {
      // Use RAF for 120fps-capable updates
      if (rafId) cancelAnimationFrame(rafId)
      
      rafId = requestAnimationFrame(() => {
        scrollY.set(window.scrollY)
      })
    }

    // High-frequency passive listener
    window.addEventListener('scroll', handleScroll, { 
      passive: true,
      capture: false 
    })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [scrollY])

  // Navigation items
  const navItems = [
    { label: 'Inventory', href: '/inventory' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Calculator', href: '/calculator' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Contact', href: '#contact' }
  ]

  const handleNavClick = (href: string) => {
    if (href.startsWith('#')) {
      // Smooth scroll for anchor links
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      // Navigate to page routes
      window.location.href = href
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      {/* 120fps Optimized Dynamic Navigation Header */}
      <motion.header
        className="fixed z-50"
        initial={{ y: -100, opacity: 0 }}
        animate={{ 
          y: 0, 
          opacity: 1,
        }}
        transition={{ 
          type: "spring",
          stiffness: 400,
          damping: 30,
          mass: 0.1,
        }}
        style={{
          top: navbarPadding,
          left: navbarPadding,
          right: navbarPadding,
          scale: navbarScale,
          y: navbarY,
          willChange: 'transform, top, left, right',
        }}
      >
        <motion.div
          className="relative overflow-hidden backdrop-blur-xl"
          style={{
            borderRadius: borderRadius,
            background: useTransform(
              backgroundOpacity,
              [0, 1],
              [
                'rgba(254, 247, 237, 0)',
                '#FAF7F3'
              ]
            ),
            borderColor: 'rgba(255, 255, 255, 0)',
            boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)',
            borderBottom: useTransform(
              scrollProgress,
              [0, 0.1],
              ['1px solid transparent', '1px solid #F0EDE8']
            ),
            willChange: 'transform, background, border-color, box-shadow, border-radius',
            transform: 'translateZ(0)', // 3D acceleration
            backfaceVisibility: 'hidden',
          }}
        >
          {/* Enhanced Premium Depth Layer - Bottom */}
          <motion.div
            className="absolute inset-0"
            style={{
              opacity: useSpring(useTransform(scrollProgress, [0, 0.1, 0.3, 1], [0, 0.1, 0.25, 0.4]), visualUltraConfig),
              background: 'radial-gradient(ellipse at top, rgba(156, 163, 175, 0.04) 0%, transparent 70%)',
              borderRadius: borderRadius,
              willChange: 'opacity',
            }}
          />
          
          {/* Enhanced Premium Depth Layer - Middle */}
          <motion.div
            className="absolute inset-0"
            style={{
              opacity: useSpring(useTransform(scrollProgress, [0, 0.1, 0.4, 1], [0, 0.15, 0.4, 0.6]), visualUltraConfig),
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 50%, rgba(107, 114, 128, 0.06) 100%)',
              borderRadius: borderRadius,
              willChange: 'opacity',
            }}
          />
          
          {/* Enhanced Premium Inner Glow */}
          <motion.div
            className="absolute inset-0.5"
            style={{
              opacity: useSpring(useTransform(scrollProgress, [0, 0.15, 0.5, 1], [0, 0.2, 0.6, 0.8]), visualUltraConfig),
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, transparent 50%)',
              borderRadius: useTransform(borderRadius, (value) => Math.max(0, value - 2)),
              willChange: 'opacity',
            }}
          />
          

          
          <div className="px-6 lg:px-8 mx-auto max-w-7xl">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <motion.div
                className="flex items-center gap-3"
                whileHover={{ 
                  scale: shouldReduceMotion ? 1 : 1.02,
                  y: shouldReduceMotion ? 0 : -2,
                  rotateY: shouldReduceMotion ? 0 : 3,
                  rotateX: shouldReduceMotion ? 0 : 1,
                }}
                transition={{ type: "spring", stiffness: 500, damping: 25, mass: 0.1 }}
                style={{
                  transformStyle: 'preserve-3d',
                  perspective: '1200px',
                  willChange: 'transform',
                }}
              >
                <motion.div 
                  className="w-20 h-12 flex items-center justify-center relative"
                  style={{
                    willChange: 'transform',
                    transformStyle: 'preserve-3d',
                  }}
                  whileHover={{
                    scale: shouldReduceMotion ? 1 : 1.05,
                    y: shouldReduceMotion ? 0 : -1,
                  }}
                  transition={{ type: "spring", stiffness: 500, damping: 25, mass: 0.1 }}
                >
                  {/* Mint Lease Logo - Elegant Car Silhouette */}
                  <svg 
                    viewBox="0 0 160 60" 
                    className="w-full h-full" 
                    style={{
                      filter: 'drop-shadow(0 1px 2px rgba(139, 157, 184, 0.15))',
                    }}
                  >
                    {/* Main car silhouette - sleek coupe profile */}
                    <path 
                      d="M20 35 C25 30 35 28 50 28 L110 28 C125 28 135 30 140 35 L140 38 L20 38 Z" 
                      fill="none" 
                      stroke="#8B9DB8" 
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    
                    {/* Roof line - elegant curve */}
                    <path 
                      d="M35 35 C40 25 55 22 80 22 C105 22 120 25 125 35" 
                      fill="none" 
                      stroke="#8B9DB8" 
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    
                    {/* Windshield */}
                    <path 
                      d="M45 35 C48 30 52 28 58 28" 
                      fill="none" 
                      stroke="#8B9DB8" 
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    
                    {/* Rear window */}
                    <path 
                      d="M102 28 C108 30 112 35 115 35" 
                      fill="none" 
                      stroke="#8B9DB8" 
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    
                    {/* Front wheel arc */}
                    <path 
                      d="M40 38 C40 42 44 45 48 45 C52 45 56 42 56 38" 
                      fill="none" 
                      stroke="#8B9DB8" 
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    
                    {/* Rear wheel arc */}
                    <path 
                      d="M104 38 C104 42 108 45 112 45 C116 45 120 42 120 38" 
                      fill="none" 
                      stroke="#8B9DB8" 
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    
                    {/* Side character line */}
                    <path 
                      d="M25 32 L135 32" 
                      fill="none" 
                      stroke="#8B9DB8" 
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      opacity="0.7"
                    />
                    
                    {/* Front bumper detail */}
                    <path 
                      d="M18 36 L22 36" 
                      fill="none" 
                      stroke="#8B9DB8" 
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    
                    {/* Elegant red accent - rear detail */}
                    <path 
                      d="M138 30 L144 32 L138 34" 
                      fill="#EF4444" 
                      stroke="none"
                    />
                    
                    {/* Small front detail */}
                    <circle cx="22" cy="33" r="1.5" fill="#8B9DB8" opacity="0.8" />
                  </svg>
                </motion.div>
                <div>
                  <h1 className="text-xl heading-luxury text-3d-luxury">Mint Lease</h1>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 -mt-1">Premium Auto Brokerage</p>
                </div>
              </motion.div>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center gap-8">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    className="relative"
                    whileHover="hover"
                    whileTap="tap"
                    initial="initial"
                    animate="animate"
                  >
                    {/* Background layer - BEHIND text */}
                    <motion.div
                      className="absolute inset-0 bg-emerald-50 rounded-lg"
                      variants={{
                        initial: { opacity: 0, scale: 0.9 },
                        hover: { 
                          opacity: 1, 
                          scale: 1,
                        }
                      }}
                      transition={{ 
                        duration: 0.2,
                        ease: "easeOut"
                      }}
                      style={{
                        boxShadow: '0 2px 8px rgba(4, 120, 87, 0.12)',
                        zIndex: 1,
                      }}
                    />
                    
                    {/* Button with text - ABOVE background */}
                    <motion.button
                      onClick={() => handleNavClick(item.href)}
                      className="relative text-neutral-600 dark:text-neutral-400 font-medium px-4 py-2.5 rounded-lg w-full h-full z-10"
                      variants={{
                        initial: { opacity: 0, y: -10 },
                        animate: { opacity: 1, y: 0 },
                        hover: { 
                          scale: shouldReduceMotion ? 1 : 1.02,
                          y: shouldReduceMotion ? 0 : -1,
                          color: "rgb(4, 120, 87)",
                        },
                        tap: { 
                          scale: shouldReduceMotion ? 1 : 0.98,
                          y: 0,
                        }
                      }}
                      transition={{ 
                        duration: 0.2,
                        ease: "easeOut"
                      }}
                      style={{
                        willChange: 'transform, color',
                        zIndex: 10,
                      }}
                    >
                      {item.label}
                    </motion.button>
                    
                    {/* Ultra-Smooth 120fps Luxury Border Animation */}
                    <motion.div
                      className="absolute inset-0 rounded-lg overflow-hidden"
                      style={{ 
                        zIndex: 20,
                        willChange: 'transform',
                        transform: 'translate3d(0,0,0)', // Force GPU layer
                      }}
                    >
                      {/* Top border - Silk-smooth entrance */}
                      <motion.div
                        className="absolute top-0 left-0 h-[2px] w-full"
                        style={{
                          background: 'linear-gradient(90deg, rgba(4, 120, 87, 0.8) 0%, rgba(16, 185, 129, 0.9) 100%)',
                          transformOrigin: "left",
                          willChange: 'transform',
                          transform: 'translate3d(0,0,0)',
                        }}
                        variants={{
                          initial: { 
                            scaleX: 0,
                            opacity: 0
                          },
                          hover: { 
                            scaleX: 1,
                            opacity: 1
                          }
                        }}
                        transition={{ 
                          type: "spring",
                          stiffness: shouldReduceMotion ? 150 : 320,
                          damping: shouldReduceMotion ? 40 : 35,
                          mass: shouldReduceMotion ? 1 : 0.08,
                          velocity: shouldReduceMotion ? 0 : 2,
                          restSpeed: 0.001,
                          restDelta: 0.0001,
                          delay: 0
                        }}
                      />
                      
                      {/* Right border - Flowing cascade */}
                      <motion.div
                        className="absolute top-0 right-0 w-[2px] h-full"
                        style={{
                          background: 'linear-gradient(180deg, rgba(16, 185, 129, 0.9) 0%, rgba(5, 150, 105, 0.85) 100%)',
                          transformOrigin: "top",
                          willChange: 'transform',
                          transform: 'translate3d(0,0,0)',
                        }}
                        variants={{
                          initial: { 
                            scaleY: 0,
                            opacity: 0
                          },
                          hover: { 
                            scaleY: 1,
                            opacity: 1
                          }
                        }}
                        transition={{ 
                          type: "spring",
                          stiffness: shouldReduceMotion ? 150 : 310,
                          damping: shouldReduceMotion ? 40 : 36,
                          mass: shouldReduceMotion ? 1 : 0.07,
                          velocity: shouldReduceMotion ? 0 : 1.8,
                          restSpeed: 0.001,
                          restDelta: 0.0001,
                          delay: 0.06
                        }}
                      />
                      
                      {/* Bottom border - Elegant continuation */}
                      <motion.div
                        className="absolute bottom-0 right-0 h-[2px] w-full"
                        style={{
                          background: 'linear-gradient(270deg, rgba(5, 150, 105, 0.85) 0%, rgba(4, 120, 87, 0.8) 100%)',
                          transformOrigin: "right",
                          willChange: 'transform',
                          transform: 'translate3d(0,0,0)',
                        }}
                        variants={{
                          initial: { 
                            scaleX: 0,
                            opacity: 0
                          },
                          hover: { 
                            scaleX: 1,
                            opacity: 1
                          }
                        }}
                        transition={{ 
                          type: "spring",
                          stiffness: shouldReduceMotion ? 150 : 300,
                          damping: shouldReduceMotion ? 40 : 37,
                          mass: shouldReduceMotion ? 1 : 0.06,
                          velocity: shouldReduceMotion ? 0 : 1.6,
                          restSpeed: 0.001,
                          restDelta: 0.0001,
                          delay: 0.12
                        }}
                      />
                      
                      {/* Left border - Perfect completion */}
                      <motion.div
                        className="absolute bottom-0 left-0 w-[2px] h-full"
                        style={{
                          background: 'linear-gradient(0deg, rgba(4, 120, 87, 0.8) 0%, rgba(16, 185, 129, 0.9) 100%)',
                          transformOrigin: "bottom",
                          willChange: 'transform',
                          transform: 'translate3d(0,0,0)',
                        }}
                        variants={{
                          initial: { 
                            scaleY: 0,
                            opacity: 0
                          },
                          hover: { 
                            scaleY: 1,
                            opacity: 1
                          }
                        }}
                        transition={{ 
                          type: "spring",
                          stiffness: shouldReduceMotion ? 150 : 290,
                          damping: shouldReduceMotion ? 40 : 38,
                          mass: shouldReduceMotion ? 1 : 0.05,
                          velocity: shouldReduceMotion ? 0 : 1.4,
                          restSpeed: 0.001,
                          restDelta: 0.0001,
                          delay: 0.18
                        }}
                      />
                    </motion.div>
                  </motion.div>
                ))}
              </nav>

              {/* CTA Button & Mobile Menu */}
              <div className="flex items-center gap-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                  }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ 
                    scale: 1.02,
                    y: -1
                  }}
                  whileTap={{ 
                    scale: 0.98,
                    y: 0
                  }}
                >
                  <motion.div
                    whileHover={{ 
                      scale: 1.02,
                      y: -2
                    }}
                    whileTap={{ 
                      scale: 0.98,
                      y: 0
                    }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 400, 
                      damping: 25 
                    }}
                    style={{
                      boxShadow: '0 4px 12px -2px rgba(5, 150, 105, 0.25), 0 8px 24px -4px rgba(5, 150, 105, 0.15), 0 16px 32px -8px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                      borderRadius: '9999px'
                    }}
                    className="hidden md:block"
                  >
                    <motion.button
                      className="bg-emerald-600 text-white border-0 rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 group relative overflow-hidden"
                      style={{
                        background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                      }}
                      whileHover={{
                        background: 'linear-gradient(135deg, #059669 0%, #10b981 30%, #f97316 70%, #ea580c 100%)',
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="flex items-center relative z-10">
                        Get Pre-Approved
                      </span>
                    </motion.button>
                  </motion.div>
                </motion.div>
                
                {/* Mobile Menu Button */}
                <motion.button
                  className="lg:hidden p-2.5 rounded-lg border bg-emerald-50/80 dark:bg-emerald-900/80 border-emerald-200/60 dark:border-emerald-700/60 backdrop-blur-sm relative overflow-hidden"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  whileTap={{ 
                    scale: 0.95,
                  }}
                  whileHover={{ 
                    scale: 1.02,
                    y: -1,
                    backgroundColor: "rgba(4, 120, 87, 0.1)",
                  }}
                  transition={{
                    duration: 0.2,
                    ease: "easeOut",
                    type: "tween"
                  }}
                  style={{
                    willChange: 'transform, background-color',
                  }}
                >
                  <AnimatePresence mode="wait">
                    {isMobileMenuOpen ? (
                      <motion.div
                        key="close"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="relative z-10"
                      >
                        <X className="w-5 h-5 text-emerald-700 dark:text-emerald-300" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="menu"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="relative z-10"
                      >
                        <Menu className="w-5 h-5 text-emerald-700 dark:text-emerald-300" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-neutral-900/20 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Enhanced Mobile Menu */}
            <motion.div
              className="fixed z-50 bg-gradient-to-br from-emerald-50/98 via-white/95 to-emerald-100/98 dark:from-emerald-950/98 dark:via-neutral-900/95 dark:to-emerald-900/98 backdrop-blur-md border border-emerald-200/40 dark:border-emerald-700/40 overflow-hidden shadow-lg shadow-emerald-200/20 dark:shadow-emerald-900/20 rounded-xl"
              style={{
                top: useSpring(useTransform(scrollProgress, [0, 0.2, 0.6, 1], [120, 110, 100, 96]), visualUltraConfig),
                left: navbarPadding,
                right: navbarPadding,
                willChange: 'top, left, right',
              }}
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
              <div className="p-6 space-y-2">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.label}
                    onClick={() => handleNavClick(item.href)}
                    className="block w-full text-left text-lg font-medium transition-all duration-200 py-4 px-4 rounded-lg border-b border-emerald-200/20 dark:border-emerald-700/20 last:border-b-0 relative overflow-hidden group"
                    style={{ color: '#64748B' }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileTap={{ 
                      scale: 0.98,
                      backgroundColor: "rgba(4, 120, 87, 0.12)"
                    }}
                    whileHover={{ 
                      x: 6,
                      backgroundColor: "rgba(4, 120, 87, 0.06)",
                      color: "rgb(4, 120, 87)"
                    }}
                  >
                    {/* Background gradient on hover */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-emerald-50/50 to-transparent rounded-lg opacity-0"
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                    
                    {/* Left border accent */}
                    <motion.div
                      className="absolute left-0 top-2 bottom-2 w-1 bg-gradient-to-b from-emerald-400 to-emerald-600 rounded-r-full opacity-0"
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                    
                    <span className="relative z-10">{item.label}</span>
                  </motion.button>
                ))}
                
                <motion.div 
                  className="pt-4"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                >
                  <motion.div
                    whileHover={{ 
                      scale: 1.02,
                      y: -2
                    }}
                    whileTap={{ 
                      scale: 0.98,
                      y: 0
                    }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 400, 
                      damping: 25 
                    }}
                    style={{
                      boxShadow: '0 6px 16px -3px rgba(5, 150, 105, 0.3), 0 12px 32px -6px rgba(5, 150, 105, 0.2), 0 24px 48px -12px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                      borderRadius: '9999px'
                    }}
                    className="w-full"
                  >
                    <motion.button
                      className="w-full bg-emerald-600 text-white border-0 rounded-full px-10 py-5 text-lg font-medium transition-all duration-300 group relative overflow-hidden"
                      style={{
                        background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                      }}
                      whileHover={{
                        background: 'linear-gradient(135deg, #059669 0%, #10b981 30%, #f97316 70%, #ea580c 100%)',
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="flex items-center justify-center relative z-10">
                        Get Pre-Approved
                      </span>
                    </motion.button>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Header 