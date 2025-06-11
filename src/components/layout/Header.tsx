'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion, useMotionValue, useSpring, useTransform, useMotionValueEvent, useVelocity } from 'framer-motion'
import { Menu, X } from 'lucide-react'

import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'

/**
 * Ultra-Smooth 120fps Floating Header with Directional Transitions
 * Features: Advanced scroll direction detection, 120fps optimized springs, directional easing
 */
export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isRouterReady, setIsRouterReady] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const shouldReduceMotion = useReducedMotion()
  const lastScrollTime = useRef(0)
  const router = useRouter()
  const pathname = usePathname()

  // Fix hydration issues by detecting client-side mounting
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Check if router is ready for navigation
  useEffect(() => {
    console.log('🏁 Header component mounted, router ready!')
    setIsRouterReady(true)
  }, [])
  
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

  // Fix mobile menu on window resize - prevents menu staying open when switching to desktop
  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined' && window.innerWidth >= 768) { // md breakpoint
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // AGGRESSIVE OUTLINE REMOVAL via DOM manipulation
  useEffect(() => {
    const removeOutlines = () => {
      // Target all navbar buttons
      const navbarButtons = document.querySelectorAll('[data-navbar-button="true"]');
      navbarButtons.forEach((button) => {
        const element = button as HTMLElement;
        element.style.outline = 'none';
        element.style.outlineColor = 'transparent';
        element.style.outlineStyle = 'none';
        element.style.outlineWidth = '0';
        element.style.outlineOffset = '0';
        element.style.boxShadow = 'none';
        element.style.border = 'none';
        // @ts-ignore
        element.style.webkitFocusRingColor = 'transparent';
        // @ts-ignore
        element.style.webkitTapHighlightColor = 'transparent';
        // @ts-ignore
        element.style.webkitAppearance = 'none';
        // @ts-ignore
        element.style.mozAppearance = 'none';
        element.style.appearance = 'none';
      });
    };

    // Run immediately
    removeOutlines();
    
    // Run again after component mount
    const timer = setTimeout(removeOutlines, 100);
    
    // Run on window focus (for browser dev tools interactions)
    window.addEventListener('focus', removeOutlines);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('focus', removeOutlines);
    };
  }, []);

  // Navigation items with proper routes
  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Inventory', href: '/inventory' },
    { label: 'Calculator', href: '/calculator' },
    { label: 'Credit App', href: '/credit-application' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Contact', href: '#contact' }
  ]

  const handleNavClick = useCallback((href: string, event?: React.MouseEvent) => {
    console.log('🚀 Navigation clicked:', { href, pathname, routerReady: !!router && isRouterReady })
    console.log('🔧 Debug info:', { 
      windowLocation: typeof window !== 'undefined' ? window.location.href : 'SSR',
      documentTitle: typeof document !== 'undefined' ? document.title : 'SSR',
      timestamp: new Date().toISOString()
    })
    
    // Close mobile menu first
    setIsMobileMenuOpen(false)

    // For anchor links, handle them differently
    if (href.startsWith('#')) {
      if (event) {
        event.preventDefault()
      }
      
      if (pathname !== '/') {
        // Navigate to home page first, then scroll
        console.log('📍 Navigating to home with anchor:', '/' + href)
        if (typeof window !== 'undefined') {
          window.location.href = '/' + href
        }
      } else {
        // Smooth scroll for anchor links on home page
        if (typeof document !== 'undefined') {
          const element = document.querySelector(href)
          if (element) {
            console.log('🎯 Scrolling to element:', href)
            element.scrollIntoView({ behavior: 'smooth' })
          } else {
            console.warn('⚠️ Element not found:', href)
          }
        }
      }
      return
    }

    // For regular page navigation, use window.location for reliability
    // This addresses the Next.js App Router navigation issues
    console.log('🔗 Navigating to page:', href)
    if (typeof window !== 'undefined') {
      try {
        console.log('🎯 Setting window.location.href to:', href)
        window.location.href = href
        console.log('✅ Navigation initiated successfully')
      } catch (error) {
        console.error('❌ Navigation failed:', error)
        // Fallback: try using Next.js router if available
        if (router && router.push) {
          console.log('🔄 Trying fallback with Next.js router...')
          router.push(href)
        }
      }
    }
  }, [pathname])

  // Improved mobile menu toggle handler
  const toggleMobileMenu = useCallback((event?: React.MouseEvent | React.TouchEvent) => {
    if (event) {
      event.preventDefault()
      event.stopPropagation()
    }
    
    console.log('📱 Mobile menu toggle clicked:', { 
      currentState: isMobileMenuOpen, 
      windowWidth: typeof window !== 'undefined' ? window.innerWidth : 'SSR',
      userAgent: typeof navigator !== 'undefined' ? (navigator.userAgent.includes('Mobile') ? 'Mobile' : 'Desktop') : 'SSR'
    })
    
    setIsMobileMenuOpen(prev => {
      const newState = !prev
      console.log('📱 Mobile menu state changed:', { from: prev, to: newState })
      return newState
    })
  }, [isMobileMenuOpen])

  // Add keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden' // Prevent background scroll
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  return (
    <>
      {/* 120fps Optimized Dynamic Navigation Header */}
      <motion.header
        className="fixed z-50 w-full"
        initial={isMounted ? { y: -100, opacity: 0 } : { y: 0, opacity: 1 }}
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
          scale: navbarScale,
          y: navbarY,
          x: 0,
          willChange: 'transform',
        }}
        suppressHydrationWarning
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
            suppressHydrationWarning
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
            suppressHydrationWarning
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
            suppressHydrationWarning
          />
          

          
          <div className="mx-auto max-w-full px-3 mobile-sm:px-4 mobile-md:px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16 container-mobile">
            <div className="flex items-center justify-between h-14 mobile-sm:h-16 mobile-md:h-16 sm:h-18 lg:h-20 header-mobile-height">
              {/* Logo */}
              <motion.div
                className="flex items-center gap-1.5 mobile-sm:gap-2 sm:gap-3 lg:gap-4 flex-shrink-0"
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
                  className="w-12 h-8 mobile-sm:w-14 mobile-sm:h-9 mobile-md:w-16 mobile-md:h-10 sm:w-18 sm:h-11 lg:w-20 lg:h-12 flex items-center justify-center relative flex-shrink-0"
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
                <div className="hidden mobile-md:block">
                  <h1 className="text-sm mobile-lg:text-base sm:text-lg lg:text-xl heading-luxury text-3d-luxury whitespace-nowrap">Mint Lease</h1>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 -mt-1 hidden tablet-sm:block">Premium Auto Brokerage</p>
                </div>
                <div className="block mobile-md:hidden">
                  <h1 className="text-sm mobile-sm:text-base font-bold bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent whitespace-nowrap">Mint Lease</h1>
                </div>
              </motion.div>

              {/* Desktop Navigation */}
              <nav className="hidden tablet-lg:flex items-center gap-4 lg:gap-6 xl:gap-8 2xl:gap-10 ml-4 lg:ml-6 xl:ml-8 2xl:ml-12 flex-shrink-0">
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
                      className="absolute inset-0 rounded-lg"
                      variants={{
                        initial: { 
                          opacity: 0, 
                          scale: 0.95,
                          backgroundColor: 'transparent',
                          boxShadow: '0 0 0 rgba(4, 120, 87, 0)'
                        },
                        hover: { 
                          opacity: 1, 
                          scale: 1,
                          backgroundColor: 'rgba(236, 253, 245, 0.8)', // More subtle emerald-50 
                          boxShadow: '0 1px 4px rgba(4, 120, 87, 0.08)'
                        }
                      }}
                      transition={{ 
                        duration: 0.12,
                        ease: [0.25, 0.46, 0.45, 0.94] // Custom cubic-bezier for smoother animation
                      }}
                      style={{
                        zIndex: 1,
                        pointerEvents: 'none', // Don't interfere with button clicks
                      }}
                      suppressHydrationWarning
                    />
                    
                    {/* Div with button behavior - ABOVE background */}
                    <motion.div
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log('🎯 Button clicked:', item.label, item.href);
                        handleNavClick(item.href);
                      }}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleNavClick(item.href);
                        }
                      }}
                      data-navbar-button="true"
                      className="relative text-neutral-600 dark:text-neutral-400 font-medium px-3 md:px-4 lg:px-6 xl:px-8 py-3 md:py-4 w-full h-full cursor-pointer touch-manipulation focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-none border-0 border-none ring-0 ring-offset-0"
                      variants={{
                        initial: isMounted ? { opacity: 0, y: -8 } : { opacity: 1, y: 0 },
                        animate: { opacity: 1, y: 0 },
                        hover: { 
                          scale: shouldReduceMotion ? 1 : 1.01,
                          y: shouldReduceMotion ? 0 : -0.5,
                          color: "rgb(4, 120, 87)",
                        },
                        tap: { 
                          scale: shouldReduceMotion ? 1 : 0.99,
                          y: 0,
                        }
                      }}
                      transition={{ 
                        duration: 0.15,
                        ease: [0.25, 0.46, 0.45, 0.94] // Smooth cubic-bezier
                      }}
                      style={{
                        willChange: 'transform, color',
                        zIndex: 100,
                        position: 'relative',
                        pointerEvents: 'auto',
                        outline: 'none',
                        border: 'none',
                        borderRadius: '0',
                        background: 'transparent',
                        boxShadow: 'none',
                        appearance: 'none',
                        WebkitAppearance: 'none',
                        MozAppearance: 'none'
                      } as React.CSSProperties}
                      suppressHydrationWarning
                    >
                      {item.label}
                    </motion.div>
                    
                    {/* BORDER ANIMATION - Only visible on hover */}
                    <motion.div
                      className="absolute inset-0 rounded-lg overflow-hidden"
                      style={{ 
                        zIndex: 2,
                        pointerEvents: 'none',
                      }}
                    >
                      {/* Top border - Silk-smooth entrance */}
                      <motion.div
                        className="absolute top-0 left-0 h-[2px]"
                        style={{
                          background: 'linear-gradient(90deg, rgba(4, 120, 87, 0.8) 0%, rgba(16, 185, 129, 0.9) 100%)',
                          transformOrigin: "left",
                          willChange: 'transform',
                          transform: 'translate3d(0,0,0)',
                          width: 'calc(100% + 2px)', // Extend to overlap with right border
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
                          stiffness: shouldReduceMotion ? 200 : 420,
                          damping: shouldReduceMotion ? 30 : 28,
                          mass: shouldReduceMotion ? 1 : 0.05,
                          velocity: shouldReduceMotion ? 0 : 3,
                          restSpeed: 0.001,
                          restDelta: 0.0001,
                          delay: 0
                        }}
                        suppressHydrationWarning
                      />
                      
                      {/* Right border - Flowing cascade */}
                      <motion.div
                        className="absolute top-0 right-0 w-[2px]"
                        style={{
                          background: 'linear-gradient(180deg, rgba(16, 185, 129, 0.9) 0%, rgba(5, 150, 105, 0.85) 100%)',
                          transformOrigin: "top",
                          willChange: 'transform',
                          transform: 'translate3d(0,0,0)',
                          height: 'calc(100% + 2px)', // Extend to overlap with bottom border
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
                          stiffness: shouldReduceMotion ? 200 : 410,
                          damping: shouldReduceMotion ? 30 : 27,
                          mass: shouldReduceMotion ? 1 : 0.04,
                          velocity: shouldReduceMotion ? 0 : 2.8,
                          restSpeed: 0.001,
                          restDelta: 0.0001,
                          delay: 0.03
                        }}
                        suppressHydrationWarning
                      />
                      
                      {/* Bottom border - Elegant continuation */}
                      <motion.div
                        className="absolute bottom-0 right-0 h-[2px]"
                        style={{
                          background: 'linear-gradient(270deg, rgba(5, 150, 105, 0.85) 0%, rgba(4, 120, 87, 0.8) 100%)',
                          transformOrigin: "right",
                          willChange: 'transform',
                          transform: 'translate3d(0,0,0)',
                          width: 'calc(100% + 2px)', // Extend to overlap with left border
                          left: '-2px', // Shift left to cover the gap
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
                          stiffness: shouldReduceMotion ? 200 : 400,
                          damping: shouldReduceMotion ? 30 : 26,
                          mass: shouldReduceMotion ? 1 : 0.035,
                          velocity: shouldReduceMotion ? 0 : 2.6,
                          restSpeed: 0.001,
                          restDelta: 0.0001,
                          delay: 0.06
                        }}
                        suppressHydrationWarning
                      />
                      
                      {/* Left border - Perfect completion */}
                      <motion.div
                        className="absolute bottom-0 left-0 w-[2px]"
                        style={{
                          background: 'linear-gradient(0deg, rgba(4, 120, 87, 0.8) 0%, rgba(16, 185, 129, 0.9) 100%)',
                          transformOrigin: "bottom",
                          willChange: 'transform',
                          transform: 'translate3d(0,0,0)',
                          height: 'calc(100% + 2px)', // Extend to overlap with top border
                          top: '-2px', // Shift up to cover the gap
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
                          stiffness: shouldReduceMotion ? 200 : 390,
                          damping: shouldReduceMotion ? 30 : 25,
                          mass: shouldReduceMotion ? 1 : 0.03,
                          velocity: shouldReduceMotion ? 0 : 2.4,
                          restSpeed: 0.001,
                          restDelta: 0.0001,
                          delay: 0.09
                        }}
                        suppressHydrationWarning
                      />
                    </motion.div>
                  </motion.div>
                ))}
              </nav>

              {/* CTA Button & Mobile Menu */}
              <div className="flex items-center gap-2 mobile-sm:gap-3 sm:gap-4 md:gap-6 lg:gap-8 mr-1 mobile-sm:mr-2 lg:mr-4">
                <motion.div
                  initial={isMounted ? { opacity: 0, scale: 0.9 } : { opacity: 1, scale: 1 }}
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
                  suppressHydrationWarning
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
                    className="hidden lg:block"
                  >
                    <motion.div
                      onClick={() => handleNavClick('/lead')}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleNavClick('/lead');
                        }
                      }}
                      className="bg-emerald-600 text-white border-0 rounded-full px-4 sm:px-6 lg:px-7 py-2.5 sm:py-3 lg:py-3.5 text-xs sm:text-sm font-medium transition-all duration-300 group relative overflow-hidden focus:outline-none focus:ring-0 cursor-pointer whitespace-nowrap"
                      style={{
                        background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                        outline: 'none',
                        border: 'none',
                      }}
                      whileHover={{
                        background: 'linear-gradient(135deg, #059669 0%, #10b981 30%, #f97316 70%, #ea580c 100%)',
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="flex items-center relative z-10">
                        Get a Quote
                      </span>
                    </motion.div>
                  </motion.div>
                </motion.div>
                
                {/* Mobile Menu Button - Improved Responsiveness */}
                <motion.div
                  className="tablet-lg:hidden p-2.5 mobile-sm:p-3 sm:p-3.5 rounded-lg border-2 bg-emerald-50 dark:bg-emerald-900 border-emerald-300 dark:border-emerald-600 backdrop-blur-sm relative overflow-hidden touch-manipulation select-none shadow-lg focus:outline-none focus:ring-0 cursor-pointer flex-shrink-0"
                  onClick={toggleMobileMenu}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleMobileMenu();
                    }
                  }}
                  aria-label={isMobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
                  aria-expanded={isMobileMenuOpen}
                  aria-controls="mobile-menu"
                  data-testid="mobile-menu-toggle"
                  whileTap={{ 
                    scale: 0.95,
                  }}
                  whileHover={{ 
                    scale: 1.02,
                    y: -1,
                    backgroundColor: "rgba(4, 120, 87, 0.15)",
                  }}
                  transition={{
                    duration: 0.2,
                    ease: "easeOut",
                    type: "tween"
                  }}
                  style={{
                    willChange: 'transform, background-color',
                    minHeight: '48px', // Minimum touch target size
                    minWidth: '48px',
                    maxHeight: '52px', // Maximum size to prevent overflow
                    maxWidth: '52px',
                    zIndex: 10000,
                    position: 'relative',
                    cursor: 'pointer',
                    outline: 'none',
                    border: '2px solid rgba(52, 211, 153, 0.3)',
                  }}
                >
                  <AnimatePresence mode="wait">
                    {isMobileMenuOpen ? (
                      <motion.div
                        key="close"
                        initial={isMounted ? { rotate: -90, opacity: 0 } : { rotate: 0, opacity: 1 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="relative z-10"
                        suppressHydrationWarning
                      >
                        <X className="w-5 h-5 mobile-sm:w-6 mobile-sm:h-6 text-emerald-700 dark:text-emerald-300" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="menu"
                        initial={isMounted ? { rotate: 90, opacity: 0 } : { rotate: 0, opacity: 1 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="relative z-10"
                        suppressHydrationWarning
                      >
                        <Menu className="w-5 h-5 mobile-sm:w-6 mobile-sm:h-6 text-emerald-700 dark:text-emerald-300" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
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
              style={{ touchAction: 'none' }}
            />

            {/* Enhanced Mobile Menu */}
            <motion.div
              id="mobile-menu"
              role="navigation"
              aria-label="Mobile navigation menu"
              className="fixed z-50 bg-gradient-to-br from-emerald-50/98 via-white/95 to-emerald-100/98 dark:from-emerald-950/98 dark:via-neutral-900/95 dark:to-emerald-900/98 backdrop-blur-md border border-emerald-200/40 dark:border-emerald-700/40 overflow-hidden shadow-lg shadow-emerald-200/20 dark:shadow-emerald-900/20 rounded-xl tablet-lg:hidden"
              style={{
                top: '80px', // Adjusted for smaller header on mobile
                left: '12px', // Tighter margins on small screens
                right: '12px',
                maxHeight: 'calc(100vh - 100px)',
                overflowY: 'auto',
                willChange: 'transform, opacity',
                zIndex: 9999,
              }}
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
              <div className="p-4 mobile-sm:p-5 mobile-md:p-6 space-y-1 mobile-sm:space-y-2">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      console.log('📱 Mobile button clicked:', item.label, item.href);
                      handleNavClick(item.href);
                    }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleNavClick(item.href);
                      }
                    }}
                    className="block w-full text-left text-base mobile-sm:text-lg font-medium transition-all duration-200 py-3 mobile-sm:py-4 px-3 mobile-sm:px-4 rounded-lg border-b border-emerald-200/20 dark:border-emerald-700/20 last:border-b-0 relative overflow-hidden group cursor-pointer touch-manipulation focus:outline-none focus:ring-0"
                    style={{ color: '#64748B', zIndex: 10, position: 'relative', outline: 'none', border: 'none', background: 'transparent' }}
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
                  </motion.div>
                ))}
                
                {/* Mobile Menu Actions */}
                <div className="pt-4 mobile-sm:pt-6 border-t border-emerald-200/30 space-y-3 mobile-sm:space-y-4">
                  {/* Primary CTA */}
                  <motion.div 
                    className="w-full"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  >
                    <motion.div
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log('📱 Mobile Get a Quote clicked:', '/lead');
                        handleNavClick('/lead');
                      }}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleNavClick('/lead');
                        }
                      }}
                      className="w-full bg-emerald-600 text-white border-0 rounded-full px-6 mobile-sm:px-8 py-3 mobile-sm:py-4 text-base mobile-sm:text-lg font-medium transition-all duration-300 group relative overflow-hidden cursor-pointer touch-manipulation focus:outline-none focus:ring-0"
                      style={{
                        background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                        boxShadow: '0 6px 16px -3px rgba(5, 150, 105, 0.3), 0 12px 32px -6px rgba(5, 150, 105, 0.2)',
                        outline: 'none',
                        border: 'none',
                      }}
                      whileHover={{
                        background: 'linear-gradient(135deg, #059669 0%, #10b981 30%, #f97316 70%, #ea580c 100%)',
                        boxShadow: '0 8px 20px -3px rgba(5, 150, 105, 0.4), 0 16px 36px -6px rgba(5, 150, 105, 0.25)',
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="flex items-center justify-center relative z-10">
                        Get a Quote
                      </span>
                    </motion.div>
                  </motion.div>

                  {/* Secondary CTA */}
                  <motion.div
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      console.log('📱 Mobile View Inventory clicked:', '/inventory');
                      handleNavClick('/inventory');
                    }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleNavClick('/inventory');
                      }
                    }}
                    className="w-full border-2 border-emerald-600 text-emerald-600 bg-transparent rounded-full px-6 mobile-sm:px-8 py-3 mobile-sm:py-4 text-base mobile-sm:text-lg font-medium transition-all duration-300 hover:bg-emerald-600 hover:text-white cursor-pointer touch-manipulation focus:outline-none focus:ring-0"
                    style={{
                      outline: 'none',
                    }}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    View Inventory
                  </motion.div>

                  {/* Contact Info */}
                  <div className="pt-3 mobile-sm:pt-4 text-center">
                    <p className="text-xs mobile-sm:text-sm text-neutral-600 mb-2">Questions? Call us:</p>
                    <a href="tel:1-555-MINT-LEASE" className="text-base mobile-sm:text-lg font-semibold text-emerald-600 hover:text-emerald-700">
                      1-555-MINT-LEASE
                    </a>
                    <p className="text-xs text-neutral-500 mt-1">Available 7 days a week</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Header 