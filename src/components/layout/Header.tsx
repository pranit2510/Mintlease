'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion, useMotionValue, useSpring, useTransform, useMotionValueEvent } from 'framer-motion'
import { Menu, X, Phone, Mail, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

/**
 * Floating Luxury Header Component with Glassmorphism
 * Features: Floating design, rounded edges, scroll animations, mobile responsive
 */
export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const shouldReduceMotion = useReducedMotion()
  
  // 120fps optimized scroll tracking with motion values
  const scrollY = useMotionValue(0)
  const scrollProgress = useMotionValue(0)
  
  // Ultra-smooth spring configurations for 120fps
  const springConfig = {
    stiffness: shouldReduceMotion ? 100 : 600,
    damping: shouldReduceMotion ? 40 : 25,
    mass: shouldReduceMotion ? 1 : 0.1,
    restSpeed: shouldReduceMotion ? 1 : 0.01,
    restDelta: shouldReduceMotion ? 0.5 : 0.001
  }

  // Smooth transforms for all navbar properties
  const navbarScale = useSpring(useTransform(scrollProgress, [0, 1], [1, 0.98]), springConfig)
  const navbarY = useSpring(useTransform(scrollProgress, [0, 1], [0, -2]), springConfig)
  const navbarOpacity = useSpring(useTransform(scrollProgress, [0, 1], [1, 1]), springConfig)
  const borderRadius = useSpring(useTransform(scrollProgress, [0, 1], [0, 12]), springConfig)
  const navbarPadding = useSpring(useTransform(scrollProgress, [0, 1], [0, 16]), springConfig)
  
  // Background and shadow animations
  const backgroundOpacity = useSpring(useTransform(scrollProgress, [0, 1], [0, 0.95]), springConfig)
  const shadowIntensity = useSpring(useTransform(scrollProgress, [0, 1], [0, 1]), springConfig)
  const borderOpacity = useSpring(useTransform(scrollProgress, [0, 1], [0, 0.4]), springConfig)

  // Derived state for conditional rendering
  const isScrolled = useTransform(scrollProgress, (value) => value > 0.5)

  // Handle scroll with motion values for 120fps performance
  useMotionValueEvent(scrollY, "change", (latest) => {
    const progress = Math.min(Math.max((latest - 10) / 30, 0), 1)
    scrollProgress.set(progress)
  })

  useEffect(() => {
    const handleScroll = () => {
      scrollY.set(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
          className="relative overflow-hidden backdrop-blur-xl border border-white/10"
          style={{
            borderRadius: borderRadius,
            background: useTransform(
              backgroundOpacity,
              [0, 1],
              [
                'rgba(255, 255, 255, 0)',
                'linear-gradient(135deg, rgba(4, 120, 87, 0.08) 0%, rgba(16, 185, 129, 0.05) 50%, rgba(4, 120, 87, 0.08) 100%)'
              ]
            ),
            borderColor: useTransform(
              borderOpacity,
              [0, 1],
              ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.15)']
            ),
            boxShadow: useTransform(
              shadowIntensity,
              [0, 1],
              [
                '0 0 0 0 rgba(0, 0, 0, 0)',
                '0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 4px 8px -2px rgba(0, 0, 0, 0.10), 0 8px 16px -4px rgba(4, 120, 87, 0.12), 0 16px 32px -8px rgba(4, 120, 87, 0.08), inset 0 1px 0 0 rgba(255, 255, 255, 0.15)'
              ]
            ),
            willChange: 'transform, background, border-color, box-shadow, border-radius',
            transform: 'translateZ(0)', // 3D acceleration
            backfaceVisibility: 'hidden',
          }}
        >
          {/* Premium Depth Layer - Bottom */}
          <motion.div
            className="absolute inset-0"
            style={{
              opacity: useTransform(scrollProgress, [0, 1], [0, 0.4]),
              background: 'radial-gradient(ellipse at top, rgba(16, 185, 129, 0.03) 0%, transparent 70%)',
              borderRadius: borderRadius,
              willChange: 'opacity',
            }}
          />
          
          {/* Premium Depth Layer - Middle */}
          <motion.div
            className="absolute inset-0"
            style={{
              opacity: useTransform(scrollProgress, [0, 1], [0, 0.6]),
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 50%, rgba(4, 120, 87, 0.06) 100%)',
              borderRadius: borderRadius,
              willChange: 'opacity',
            }}
          />
          
          {/* Premium Inner Glow */}
          <motion.div
            className="absolute inset-0.5"
            style={{
              opacity: useTransform(scrollProgress, [0, 1], [0, 0.8]),
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, transparent 50%)',
              borderRadius: useTransform(borderRadius, (value) => Math.max(0, value - 2)),
              willChange: 'opacity',
            }}
          />
          
          {/* Sleek Border Highlight */}
          <motion.div
            className="absolute inset-0"
            style={{
              opacity: useTransform(scrollProgress, [0, 1], [0, 1]),
              borderRadius: borderRadius,
              padding: '1px',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(255, 255, 255, 0.1) 100%)',
              mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              maskComposite: 'xor',
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
                  className="w-10 h-10 bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-700 rounded-xl flex items-center justify-center relative overflow-hidden shadow-lg"
                  style={{
                    rotate: useTransform(scrollProgress, [0, 1], [0, 360]),
                    willChange: 'transform',
                    transformStyle: 'preserve-3d',
                    boxShadow: useTransform(
                      scrollProgress,
                      [0, 1],
                      [
                        '0 4px 8px rgba(4, 120, 87, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                        '0 6px 12px rgba(4, 120, 87, 0.3), 0 2px 4px rgba(4, 120, 87, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3), inset 0 -1px 0 rgba(0, 0, 0, 0.1)'
                      ]
                    ),
                  }}
                  whileHover={{
                    scale: shouldReduceMotion ? 1 : 1.08,
                    rotateY: shouldReduceMotion ? 0 : 15,
                    rotateX: shouldReduceMotion ? 0 : 8,
                    y: shouldReduceMotion ? 0 : -1,
                  }}
                  transition={{ type: "spring", stiffness: 500, damping: 25, mass: 0.1 }}
                >
                  {/* Premium Inner Highlight */}
                  <motion.div
                    className="absolute inset-0.5 bg-gradient-to-br from-white/25 via-white/10 to-transparent rounded-lg"
                    style={{
                      opacity: useTransform(scrollProgress, [0, 1], [0.8, 1]),
                      willChange: 'opacity',
                    }}
                  />
                  
                  {/* 3D Depth Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"
                    style={{
                      opacity: useTransform(scrollProgress, [0, 1], [0.3, 0.5]),
                      willChange: 'opacity',
                    }}
                  />
                  
                  <span className="text-white font-bold text-xl relative z-10 drop-shadow-sm">M</span>
                </motion.div>
                <div>
                  <h1 className="text-xl heading-luxury text-3d-luxury">Mint Lease</h1>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 -mt-1">Premium Auto Brokerage</p>
                </div>
              </motion.div>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center gap-8">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.label}
                    onClick={() => handleNavClick(item.href)}
                    className="text-neutral-600 dark:text-neutral-400 font-medium relative group px-4 py-2.5 rounded-lg transition-all duration-200"
                    whileHover={{ 
                      scale: shouldReduceMotion ? 1 : 1.02,
                      y: shouldReduceMotion ? 0 : -1,
                      backgroundColor: "rgba(4, 120, 87, 0.06)",
                      boxShadow: shouldReduceMotion ? "none" : "0 4px 12px rgba(4, 120, 87, 0.1)"
                    }}
                    whileTap={{ 
                      scale: shouldReduceMotion ? 1 : 0.98,
                      y: 0,
                      backgroundColor: "rgba(4, 120, 87, 0.12)"
                    }}
                    transition={{ 
                      type: "spring", 
                      stiffness: shouldReduceMotion ? 100 : 500, 
                      damping: shouldReduceMotion ? 40 : 30,
                      mass: 0.1,
                      duration: shouldReduceMotion ? 0.15 : undefined
                    }}
                    style={{
                      willChange: 'transform',
                      transitionDelay: `${index * 0.1}s`
                    }}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <motion.span 
                      className="text-neutral-600 dark:text-neutral-400 relative z-10"
                      whileHover={{ 
                        color: "rgb(4, 120, 87)",
                        fontWeight: 500
                      }}
                      transition={{ duration: 0.15 }}
                    >
                      {item.label}
                    </motion.span>
                    
                    {/* Background highlight */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-emerald-50/50 to-emerald-100/50 rounded-lg opacity-0"
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                    
                    {/* Animated underline */}
                    <motion.div
                      className="absolute -bottom-0.5 left-4 right-4 h-0.5 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full origin-left"
                      initial={{ scaleX: 0, opacity: 0 }}
                      whileHover={{ scaleX: 1, opacity: 1 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    />
                    
                    {/* Subtle glow effect */}
                    <motion.div
                      className="absolute inset-0 bg-emerald-500/10 rounded-lg blur-sm opacity-0"
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>
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
                  <Button className="hidden md:block relative overflow-hidden group emerald-3d bg-gradient-to-r from-primary-emerald to-primary-emerald-dark transition-all duration-200 transform-style-preserve-3d">
                    {/* Shimmer effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    />
                    
                    {/* Background glow on hover */}
                    <motion.div
                      className="absolute inset-0 bg-white/10 rounded-lg opacity-0"
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                    
                    {/* Button text */}
                    <motion.span 
                      className="relative z-10 font-medium"
                      whileHover={{ 
                        letterSpacing: "0.02em" 
                      }}
                      transition={{ duration: 0.15 }}
                    >
                      Get Pre-Approved
                    </motion.span>
                    
                    {/* Subtle border glow */}
                    <motion.div
                      className="absolute inset-0 rounded-lg border border-white/20 opacity-0"
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  </Button>
                </motion.div>
                
                {/* Mobile Menu Button */}
                <motion.button
                  className="lg:hidden p-2.5 rounded-lg border transition-all duration-200 bg-emerald-50/80 dark:bg-emerald-900/80 border-emerald-200/60 dark:border-emerald-700/60 backdrop-blur-sm relative overflow-hidden"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  whileTap={{ 
                    scale: 0.95,
                    backgroundColor: "rgba(4, 120, 87, 0.1)"
                  }}
                  whileHover={{ 
                    scale: 1.02,
                    y: -1,
                    backgroundColor: "rgba(4, 120, 87, 0.06)",
                    boxShadow: "0 4px 12px rgba(4, 120, 87, 0.15)"
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30
                  }}
                >
                  {/* Background glow */}
                  <motion.div
                    className="absolute inset-0 bg-emerald-100/50 rounded-lg opacity-0"
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                  <AnimatePresence mode="wait">
                    {isMobileMenuOpen ? (
                      <motion.div
                        key="close"
                        initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
                        animate={{ rotate: 0, opacity: 1, scale: 1 }}
                        exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="relative z-10"
                      >
                        <X className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="menu"
                        initial={{ rotate: 90, opacity: 0, scale: 0.8 }}
                        animate={{ rotate: 0, opacity: 1, scale: 1 }}
                        exit={{ rotate: -90, opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="relative z-10"
                      >
                        <Menu className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
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

            {/* Mobile Menu */}
            <motion.div
              className="fixed z-50 bg-gradient-to-br from-emerald-50/98 via-white/95 to-emerald-100/98 dark:from-emerald-950/98 dark:via-neutral-900/95 dark:to-emerald-900/98 backdrop-blur-md border border-emerald-200/40 dark:border-emerald-700/40 overflow-hidden shadow-lg shadow-emerald-200/20 dark:shadow-emerald-900/20 rounded-xl"
              style={{
                top: useTransform(scrollProgress, [0, 1], [120, 96]), // top-30 to top-24
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
                    className="block w-full text-left text-lg font-medium text-neutral-600 dark:text-neutral-400 transition-all duration-200 py-4 px-4 rounded-lg border-b border-emerald-200/20 dark:border-emerald-700/20 last:border-b-0 relative overflow-hidden group"
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
                  <Button fullWidth size="lg" className="shadow-md bg-gradient-to-r from-primary-emerald to-primary-emerald-dark hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-200 relative overflow-hidden group">
                    {/* Shimmer effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    />
                    
                    {/* Button text with subtle animation */}
                    <motion.span 
                      className="relative z-10"
                      whileHover={{ letterSpacing: "0.01em" }}
                      transition={{ duration: 0.15 }}
                    >
                      Get Pre-Approved
                    </motion.span>
                  </Button>
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