'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { motion, useMotionValue, useSpring, useReducedMotion, useTransform } from 'framer-motion'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { PremiumBadge } from '@/components/ui/PremiumBadge'

/**
 * Premium Header Component - Luxury Navigation with Advanced Interactions
 * Features: Floating navbar, ultra-smooth animations, intelligent scroll behavior
 */

// Ultra-smooth spring configuration for premium feel
const ultraSmoothConfig = {
  type: "spring" as const,
  stiffness: 400,
  damping: 30,
  mass: 0.8,
  restSpeed: 0.01,
  restDelta: 0.01
}

// Floating return animation with enhanced easing
const floatingReturnConfig = {
  type: "spring" as const,
  stiffness: 300,
  damping: 25,
  mass: 0.5,
  restSpeed: 0.1,
  restDelta: 0.01
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
  const shouldReduceMotion = useReducedMotion()
  
  // Scroll tracking for floating navbar effect
  const scrollY = useMotionValue(0)
  const scrollYSpring = useSpring(scrollY, ultraSmoothConfig)
  
  // Enhanced navbar transformations
  const navbarY = useTransform(scrollYSpring, [0, 100], [0, -8])
  const navbarScale = useTransform(scrollYSpring, [0, 100], [1, 0.98])
  const navbarBlur = useTransform(scrollYSpring, [0, 100], [0, 20])
  const navbarOpacity = useTransform(scrollYSpring, [0, 100], [0.95, 0.98])

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
      {/* Premium Floating Header */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-[9999] px-4 pt-4"
        style={{
          y: navbarY,
          scale: navbarScale,
        }}
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
          <div className="glass-strong rounded-2xl border border-white/20 bg-white/80 px-6 py-4 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center justify-between">
              {/* Logo Section */}
              <motion.div
                className="flex items-center space-x-3"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                suppressHydrationWarning
              >
                <button
                  onClick={() => handleNavigation('/')}
                  className="flex items-center space-x-3 transition-all duration-300 hover:opacity-80"
                  data-navbar-button="true"
                  suppressHydrationWarning
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg">
                    <span className="text-lg font-bold text-white">M</span>
                  </div>
                  <div className="hidden sm:block">
                    <h1 className="text-xl font-bold text-neutral-800">Mint Lease</h1>
                    <p className="text-xs text-neutral-600">Premium Auto Brokerage</p>
                  </div>
                </button>
              </motion.div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-1" suppressHydrationWarning>
                {navigationItems.map((item, index) => (
                  <motion.button
                    key={item.name}
                    onClick={() => handleNavigation(item.href)}
                    className={`group relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                      pathname === item.href
                        ? 'bg-emerald-100 text-emerald-700 shadow-sm'
                        : 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900'
                    }`}
                    whileHover={{ scale: 1.05, y: -1 }}
                    whileTap={{ scale: 0.95 }}
                    data-navbar-button="true"
                    suppressHydrationWarning
                  >
                    <span className="relative z-10">{item.name}</span>
                    {pathname === item.href && (
                      <motion.div
                        className="absolute inset-0 rounded-xl bg-emerald-50 border border-emerald-200"
                        layoutId="activeTab"
                        transition={ultraSmoothConfig}
                        suppressHydrationWarning
                      />
                    )}
                  </motion.button>
                ))}
              </div>

              {/* CTA Button */}
              <div className="hidden md:block" suppressHydrationWarning>
                <motion.button
                  onClick={() => handleNavigation('/lead')}
                  className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl"
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  data-navbar-button="true"
                  suppressHydrationWarning
                >
                  <span className="relative z-10">Get Started</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-emerald-700 to-emerald-800"
                    initial={{ x: '100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                    suppressHydrationWarning
                  />
                </motion.button>
              </div>

              {/* Mobile Menu Button */}
              <motion.button
                onClick={toggleMobileMenu}
                className="md:hidden rounded-xl bg-neutral-100 p-2 text-neutral-700 transition-colors hover:bg-neutral-200"
                whileTap={{ scale: 0.95 }}
                data-navbar-button="true"
                suppressHydrationWarning
              >
                {isMobileMenuOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </motion.button>
            </div>
          </div>
        </motion.nav>
      </motion.header>

      {/* Mobile Menu - Ultra Simple Implementation for Next.js 15 */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[9998] md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Menu Panel */}
          <div className="absolute top-20 right-4 w-80 max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border border-gray-200">
            <div className="p-6">
              {/* Mobile Navigation Items */}
              <div className="space-y-3">
                {navigationItems.map((item) => (
                  <div key={item.name}>
                    <button
                      onClick={() => handleNavigation(item.href)}
                      className={`w-full text-left p-4 rounded-xl border transition-colors ${
                        pathname === item.href
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                          : 'bg-white border-gray-100 text-gray-800 hover:bg-gray-50'
                      }`}
                    >
                      <div className="font-semibold text-base mb-1">
                        {item.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {item.description}
                      </div>
                    </button>
                  </div>
                ))}
              </div>

              {/* Mobile CTA */}
              <div className="mt-6">
                <button
                  onClick={() => handleNavigation('/lead')}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors"
                >
                  Get Started Today
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
} 