'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone, Mail, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

/**
 * Floating Luxury Header Component with Glassmorphism
 * Features: Floating design, rounded edges, scroll animations, mobile responsive
 */
export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  // Handle scroll effect for floating navbar
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setScrollY(scrollPosition)
      setIsScrolled(scrollPosition > 20)
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
      {/* Top Contact Bar - Only visible when not scrolled */}
      <motion.div 
        className="bg-gradient-to-r from-neutral-800 via-neutral-700 to-neutral-800 text-white py-2 px-4 text-sm fixed top-0 left-0 right-0 z-40"
        initial={{ y: 0 }}
        animate={{ 
          y: isScrolled ? -48 : 0,
          opacity: isScrolled ? 0 : 1 
        }}
        transition={{ 
          duration: 0.5, 
          ease: [0.4, 0.0, 0.2, 1] 
        }}
      >
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>(555) MINT-LEASE</span>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>hello@mintlease.com</span>
            </div>
            <div className="hidden lg:flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>NYC Metro Area</span>
            </div>
          </div>
          <div className="text-xs">
            🚗 Free Delivery • $499 Deposit • 5-Star Service
          </div>
        </div>
      </motion.div>

      {/* Floating Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-emerald via-primary-emerald-light to-gold-primary z-60"
        initial={{ scaleX: 0 }}
        animate={{ 
          scaleX: Math.min(scrollY / 1000, 1),
          opacity: isScrolled ? 1 : 0
        }}
        style={{ transformOrigin: 'left' }}
        transition={{ duration: 0.2 }}
      />

      {/* Main Floating Navigation Header */}
      <motion.header
        className={cn(
          'fixed z-50 transition-all duration-500 ease-out',
          {
            // Floating state - when scrolled
            'top-4 left-4 right-4 md:left-8 md:right-8 lg:left-12 lg:right-12': isScrolled,
            // Floating state at top - positioned after contact bar but with floating design
            'top-14 left-4 right-4 md:left-8 md:right-8 lg:left-12 lg:right-12': !isScrolled,
          }
        )}
        initial={{ y: -100, opacity: 0 }}
        animate={{ 
          y: 0, 
          opacity: 1,
          scale: isScrolled ? 0.98 : 1,
        }}
        transition={{ 
          duration: 0.6, 
          ease: [0.4, 0.0, 0.2, 1],
          scale: { duration: 0.4 }
        }}
        style={{
          transform: `translateY(${Math.max(0, scrollY * 0.1)}px)`,
        }}
      >
        <motion.div
          className="transition-all duration-700 ease-out backdrop-blur-md border relative overflow-hidden bg-gradient-to-br from-emerald-50/95 via-white/85 to-emerald-100/95 dark:from-emerald-950/95 dark:via-neutral-800/85 dark:to-emerald-900/95 rounded-xl shadow-3d-lg border-emerald-200/40 dark:border-emerald-700/40 transform-style-preserve-3d"
          animate={{
            boxShadow: isScrolled 
              ? '0 8px 16px -4px rgba(4, 120, 87, 0.25), 0 20px 40px -8px rgba(4, 120, 87, 0.15), 0 40px 64px -16px rgba(0, 0, 0, 0.1), 0 4px 8px rgba(4, 120, 87, 0.1)' 
              : '0 4px 6px -1px rgba(4, 120, 87, 0.1), 0 8px 16px -4px rgba(4, 120, 87, 0.15), 0 16px 24px -8px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(4, 120, 87, 0.05)',
            y: isScrolled ? -2 : 0,
          }}
          transition={{ duration: 0.6, ease: [0.4, 0.0, 0.2, 1] }}
          layout
        >
          {/* Rich Green Background Enhancement */}
          <motion.div
            className="absolute inset-0 opacity-30"
            animate={{
              background: isScrolled
                ? 'radial-gradient(circle at 30% 30%, rgba(4, 120, 87, 0.12) 0%, rgba(16, 185, 129, 0.06) 50%, transparent 80%)'
                : 'radial-gradient(circle at 70% 70%, rgba(4, 120, 87, 0.08) 0%, rgba(16, 185, 129, 0.04) 60%, transparent 90%)',
            }}
            transition={{ duration: 0.8 }}
          />
          
          {/* Rich Green Border Enhancement */}
          <motion.div
            className="absolute inset-0 rounded-xl"
            style={{
              background: isScrolled
                ? 'linear-gradient(135deg, rgba(4, 120, 87, 0.15), rgba(16, 185, 129, 0.08), rgba(4, 120, 87, 0.15))'
                : 'linear-gradient(135deg, rgba(4, 120, 87, 0.08), rgba(16, 185, 129, 0.04), rgba(4, 120, 87, 0.08))',
              padding: '1px',
              mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              maskComposite: 'xor',
            }}
            animate={{
              opacity: isScrolled ? 0.8 : 0.4,
            }}
            transition={{ duration: 0.5 }}
          />
          
          <div className="px-6 lg:px-8 mx-auto transition-all duration-500 relative z-10 max-w-7xl">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <motion.div
                className="flex items-center gap-3"
                whileHover={{ 
                  scale: 1.05,
                  y: -1,
                  rotateY: 5,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                style={{
                  transformStyle: 'preserve-3d',
                  perspective: '1000px',
                }}
              >
                <motion.div 
                  className="w-10 h-10 emerald-3d bg-gradient-to-br from-primary-emerald to-primary-emerald-dark rounded-lg flex items-center justify-center relative overflow-hidden transform-style-preserve-3d"
                  animate={{
                    rotate: isScrolled ? 180 : 0,
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  whileHover={{
                    scale: 1.05,
                    rotateY: 10,
                    rotateX: 5,
                  }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-white/15 to-transparent rounded-lg"
                    animate={{
                      opacity: isScrolled ? 0.8 : 0.6,
                    }}
                  />
                  <span className="text-white font-bold text-xl relative z-10">M</span>
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
                      scale: 1.02,
                      y: -1,
                      backgroundColor: "rgba(4, 120, 87, 0.06)",
                      boxShadow: "0 4px 12px rgba(4, 120, 87, 0.1)"
                    }}
                    whileTap={{ 
                      scale: 0.98,
                      y: 0,
                      backgroundColor: "rgba(4, 120, 87, 0.12)"
                    }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 500, 
                      damping: 30,
                      mass: 0.8
                    }}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ transitionDelay: `${index * 0.1}s` }}
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
              className={cn(
                'fixed z-50 bg-gradient-to-br from-emerald-50/98 via-white/95 to-emerald-100/98 dark:from-emerald-950/98 dark:via-neutral-900/95 dark:to-emerald-900/98 backdrop-blur-md border border-emerald-200/40 dark:border-emerald-700/40 overflow-hidden shadow-lg shadow-emerald-200/20 dark:shadow-emerald-900/20 rounded-xl',
                {
                  'top-24 left-4 right-4 md:left-8 md:right-8 lg:left-12 lg:right-12': isScrolled,
                  'top-30 left-4 right-4 md:left-8 md:right-8 lg:left-12 lg:right-12': !isScrolled,
                }
              )}
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