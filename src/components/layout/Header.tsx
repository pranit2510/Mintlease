'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { motion, useMotionValue, useSpring, useReducedMotion, useTransform } from 'framer-motion'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { PremiumBadge } from '@/components/ui/PremiumBadge'

/**
 * Premium Header Component - Luxury Navigation with Advanced Interactions
 * Features: Blended resting state, ultra-smooth animations, intelligent scroll behavior
 */

// Ultra-smooth spring configuration for premium feel
const ultraSmoothConfig = {
  type: "spring" as const,
  stiffness: 350,
  damping: 35,
  mass: 0.6,
  restSpeed: 0.01,
  restDelta: 0.01
}

// Floating return animation with enhanced easing
const floatingReturnConfig = {
  type: "spring" as const,
  stiffness: 280,
  damping: 28,
  mass: 0.4,
  restSpeed: 0.1,
  restDelta: 0.01
}

// Gentle hover animations
const gentleHoverConfig = {
  type: "spring" as const,
  stiffness: 400,
  damping: 25,
  mass: 0.3
}

// Navigation items with luxury styling
const navigationItems = [
  { name: 'Home', href: '/', description: 'Premium auto brokerage' },
  { name: 'Inventory', href: '/inventory', description: 'Luxury vehicles' },
  { name: 'Calculator', href: '/calculator', description: 'Finance tools' },
  { name: 'Apply', href: '/credit-application', description: 'Get approved' },
  { name: 'Contact', href: '/lead', description: 'Expert consultation' }
]

export function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isRouterReady, setIsRouterReady] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const shouldReduceMotion = useReducedMotion()
  
  // Scroll tracking for floating navbar effect
  const scrollY = useMotionValue(0)
  const scrollYSpring = useSpring(scrollY, ultraSmoothConfig)
  
  // Enhanced navbar transformations with blended resting state
  const navbarY = useTransform(scrollYSpring, [0, 50, 150], [0, -2, -8])
  const navbarScale = useTransform(scrollYSpring, [0, 100, 200], [1, 0.995, 0.985])
  const navbarBlur = useTransform(scrollYSpring, [0, 50, 150], [8, 12, 20])
  const navbarOpacity = useTransform(scrollYSpring, [0, 50, 150], [0.7, 0.85, 0.95])
  const borderOpacity = useTransform(scrollYSpring, [0, 50, 150], [0.1, 0.15, 0.25])
  const shadowIntensity = useTransform(scrollYSpring, [0, 100], [0.1, 0.4])

  // Router ready detection
  useEffect(() => {
    setIsRouterReady(true)
  }, [])

  // Scroll event handler with performance optimization
  useEffect(() => {
    const handleScroll = () => {
      scrollY.set(window.scrollY)
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll, {
        passive: true,
        capture: false
      })
      
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [scrollY])

  // Mobile menu auto-close on desktop
  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined' && window.innerWidth >= 768) { // md breakpoint
        setIsMobileMenuOpen(false)
      }
    }
    
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Enhanced focus management for accessibility
  useEffect(() => {
    const navbarButtons = document.querySelectorAll('[data-navbar-button="true"]');
    
    const handleFocusVisible = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.matches(':focus-visible')) {
        target.style.outline = '2px solid #10b981';
        target.style.outlineOffset = '2px';
      }
    };

    const handleBlur = (e: Event) => {
      const target = e.target as HTMLElement;
      target.style.outline = 'none';
    };

    navbarButtons.forEach(button => {
      button.addEventListener('focus', handleFocusVisible);
      button.addEventListener('blur', handleBlur);
    });

    // Global focus management
    const removeOutlines = () => {
      document.querySelectorAll('[style*="outline"]').forEach((el: Element) => {
        (el as HTMLElement).style.outline = 'none';
      });
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('focus', removeOutlines);
    }

    return () => {
      navbarButtons.forEach(button => {
        button.removeEventListener('focus', handleFocusVisible);
        button.removeEventListener('blur', handleBlur);
      });
      if (typeof window !== 'undefined') {
        window.removeEventListener('focus', removeOutlines);
      }
    };
  }, [])

  // Enhanced navigation with debugging
  const handleNavigation = useCallback((href: string) => {
    if (!isRouterReady) {
      console.warn('⚠️ Router not ready, skipping navigation')
      return
    }

    // Debug information
    const debugInfo = {
      href,
      currentPath: pathname,
      timestamp: new Date().toISOString(),
      userAgent: typeof navigator !== 'undefined' ? (navigator.userAgent.includes('Mobile') ? 'Mobile' : 'Desktop') : 'SSR'
    }
    
    console.log('🚀 Navigation initiated:', debugInfo)

    try {
      // Close mobile menu first
      setIsMobileMenuOpen(false)
      
      // Handle hash links (same page)
      if (href.startsWith('#')) {
        const element = document.querySelector(href)
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          })
          console.log('✅ Hash navigation successful:', href)
          return
        } else {
          console.warn('⚠️ Element not found:', href)
        }
      }

      // Handle external links
      if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
        window.open(href, '_blank', 'noopener,noreferrer')
        console.log('✅ External navigation successful:', href)
        return
      }

      // Use Next.js router for internal navigation
      console.log('🎯 Using Next.js router for:', href)
      router.push(href)
      console.log('✅ Router navigation initiated')
      
    } catch (error) {
      console.error('❌ Navigation failed:', error)
      // Fallback to window.location only if router fails
      window.location.href = href
    }
  }, [isRouterReady, router, pathname])

  // Mobile menu management with enhanced UX
  const toggleMobileMenu = useCallback(() => {
    const newState = !isMobileMenuOpen
    setIsMobileMenuOpen(newState)
    
    // Debug mobile interaction
    const debugInfo = {
      action: newState ? 'open' : 'close',
      newState,
      timestamp: new Date().toISOString(),
      windowWidth: typeof window !== 'undefined' ? window.innerWidth : 'SSR',
      userAgent: typeof navigator !== 'undefined' ? (navigator.userAgent.includes('Mobile') ? 'Mobile' : 'Desktop') : 'SSR'
    }
    
    console.log('📱 Mobile menu toggle:', debugInfo)
    
    // Force visibility for debugging
    if (newState) {
      setTimeout(() => {
        const mobileMenu = document.querySelector('[data-mobile-menu="true"]') as HTMLElement
        if (mobileMenu) {
          mobileMenu.style.display = 'block'
          mobileMenu.style.visibility = 'visible'
          mobileMenu.style.opacity = '1'
          console.log('🔧 Forced mobile menu visibility')
        }
      }, 100)
    }
  }, [isMobileMenuOpen])

  // Enhanced keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
        document.body.style.overflow = 'unset' // Restore scroll
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
      {/* Premium Floating Header with Blended Resting State */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-[9999] px-4 pt-4"
        style={{
          y: navbarY,
          scale: navbarScale,
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        suppressHydrationWarning
      >
        <motion.nav
          className="mx-auto max-w-7xl"
          style={{
            backdropFilter: `blur(${navbarBlur}px)`,
            opacity: navbarOpacity,
          }}
          suppressHydrationWarning
        >
          {/* Enhanced Glass Container with Dynamic Styling */}
          <motion.div 
            className="relative rounded-2xl bg-white/60 px-6 py-4 backdrop-blur-xl transition-all duration-700 ease-out"
            style={{
              borderColor: `rgba(255, 255, 255, ${borderOpacity.get()})`,
              boxShadow: `0 8px 32px rgba(0, 0, 0, ${shadowIntensity.get()}), 0 1px 0 rgba(255, 255, 255, 0.2) inset`,
            }}
            animate={{
              backgroundColor: isHovered 
                ? 'rgba(255, 255, 255, 0.9)' 
                : scrollY.get() > 50 
                  ? 'rgba(255, 255, 255, 0.8)' 
                  : 'rgba(255, 255, 255, 0.6)',
              borderWidth: isHovered ? '1px' : scrollY.get() > 50 ? '1px' : '0.5px',
            }}
            transition={ultraSmoothConfig}
            suppressHydrationWarning
          >
            {/* Subtle gradient overlay for depth */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
            
            <div className="relative flex items-center justify-between">
              {/* Logo Section with Enhanced Animation */}
              <motion.div
                className="flex items-center space-x-3"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={gentleHoverConfig}
                suppressHydrationWarning
              >
                <button
                  onClick={() => handleNavigation('/')}
                  className="group flex items-center space-x-3 transition-all duration-300 hover:opacity-90"
                  data-navbar-button="true"
                  suppressHydrationWarning
                >
                  <motion.div 
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-700 shadow-lg"
                    whileHover={{ 
                      rotate: [0, -1, 1, 0],
                      scale: 1.05,
                      boxShadow: "0 8px 20px rgba(16, 185, 129, 0.3)"
                    }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  >
                    <span className="text-lg font-bold text-white">M</span>
                  </motion.div>
                  <div className="ml-3">
                    <h1 className="text-lg sm:text-xl font-bold text-neutral-800 group-hover:text-emerald-700 transition-colors duration-300">Mint Lease</h1>
                    <p className="hidden sm:block text-xs text-neutral-600 group-hover:text-neutral-700 transition-colors duration-300">Premium Auto Brokerage</p>
                  </div>
                </button>
              </motion.div>

              {/* Desktop Navigation with Enhanced Effects */}
              <div className="hidden md:flex items-center space-x-0.5" suppressHydrationWarning>
                {navigationItems.map((item, index) => (
                  <motion.button
                    key={item.name}
                    onClick={() => handleNavigation(item.href)}
                    className={`group relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-500 ${
                      pathname === item.href
                        ? 'bg-emerald-100/80 text-emerald-700 shadow-sm backdrop-blur-sm'
                        : 'text-neutral-700 hover:bg-white/60 hover:text-neutral-900 hover:shadow-sm'
                    }`}
                    whileHover={{ 
                      scale: 1.05, 
                      y: -1,
                      backgroundColor: pathname === item.href ? 'rgba(209, 250, 229, 0.9)' : 'rgba(255, 255, 255, 0.8)'
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={gentleHoverConfig}
                    data-navbar-button="true"
                    suppressHydrationWarning
                  >
                    <span className="relative z-10">{item.name}</span>
                    {pathname === item.href && (
                      <motion.div
                        className="absolute inset-0 rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200/50"
                        layoutId="activeTab" 
                        transition={ultraSmoothConfig}
                        suppressHydrationWarning
                      />
                    )}
                    
                    {/* Hover glow effect */}
                    <motion.div
                      className="absolute inset-0 rounded-xl bg-white/40 opacity-0"
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      suppressHydrationWarning
                    />
                  </motion.button>
                ))}
              </div>

              {/* Enhanced CTA Button */}
              <div className="hidden md:block" suppressHydrationWarning>
                <motion.button
                  onClick={() => handleNavigation('/lead')}
                  className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-800 px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-500 hover:shadow-xl"
                  whileHover={{ 
                    scale: 1.05, 
                    y: -1,
                    boxShadow: "0 12px 24px rgba(16, 185, 129, 0.4)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={gentleHoverConfig}
                  data-navbar-button="true"
                  suppressHydrationWarning
                >
                  <span className="relative z-10">Get Started</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-emerald-700 via-emerald-800 to-emerald-900"
                    initial={{ x: '100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    suppressHydrationWarning
                  />
                  
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '200%' }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    suppressHydrationWarning
                  />
                </motion.button>
              </div>

              {/* Enhanced Mobile Menu Button */}
              <motion.button
                onClick={toggleMobileMenu}
                className="md:hidden rounded-xl bg-white/60 p-2.5 text-neutral-700 transition-all duration-300 hover:bg-white/80 hover:shadow-md backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={gentleHoverConfig}
                data-navbar-button="true"
                suppressHydrationWarning
              >
                <motion.div
                  animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {isMobileMenuOpen ? (
                    <XMarkIcon className="h-6 w-6" />
                  ) : (
                    <Bars3Icon className="h-6 w-6" />
                  )}
                </motion.div>
              </motion.button>
            </div>
          </motion.div>
        </motion.nav>
      </motion.header>

      {/* Enhanced Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div 
          className="fixed inset-0 z-[9998] md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Enhanced Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />

          {/* Enhanced Menu Panel */}
          <motion.div 
            className="absolute top-20 right-4 w-80 max-w-[calc(100vw-2rem)] bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20"
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="p-6">
              {/* Mobile Navigation Items with Enhanced Styling */}
              <div className="space-y-3">
                {navigationItems.map((item, index) => (
                  <motion.div 
                    key={item.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                  >
                    <button
                      onClick={() => handleNavigation(item.href)}
                      className={`w-full text-left p-4 rounded-xl border transition-all duration-300 ${
                        pathname === item.href
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-700 shadow-sm'
                          : 'bg-white/60 border-gray-100 text-gray-800 hover:bg-white/80 hover:shadow-md backdrop-blur-sm'
                      }`}
                    >
                      <div className="font-semibold text-base mb-1">
                        {item.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {item.description}
                      </div>
                    </button>
                  </motion.div>
                ))}
              </div>

              {/* Enhanced Mobile CTA */}
              <motion.div 
                className="mt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.3 }}
              >
                <button
                  onClick={() => handleNavigation('/lead')}
                  className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Get Started Today
                </button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  )
} 