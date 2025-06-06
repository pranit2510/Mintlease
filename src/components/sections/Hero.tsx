'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'
import { gsap } from 'gsap'
import { ArrowRight, Play, Shield, Award, Users, DollarSign } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { animationVariants } from '@/lib/utils'

/**
 * Hero Section - Luxury Auto Brokerage Landing
 * Features: Glassmorphism, Gradient background, Typewriter effect, Enhanced animations
 */
export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  const controls = useAnimation()
  const isInView = useInView(containerRef, { once: true, amount: 0.3 })

  // Typewriter effect state
  const [currentWord, setCurrentWord] = useState(0)
  const [currentChar, setCurrentChar] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [displayText, setDisplayText] = useState('')
  const [showCursor, setShowCursor] = useState(true)

  const words = [
    "Spotted",
    "Approved", 
    "Signed",
    "Delivered"
  ]

    // Typewriter effect
  useEffect(() => {
    const word = words[currentWord]
    
    const typewriterTimer = setTimeout(() => {
      if (isPaused) {
        setIsPaused(false)
        setIsDeleting(true)
        return
      }

      if (!isDeleting) {
        // Typing
        if (currentChar < word.length) {
          setDisplayText(word.substring(0, currentChar + 1))
          setCurrentChar(prev => prev + 1)
        } else {
          // Pause at end of word
          setIsPaused(true)
        }
      } else {
        // Deleting
        if (currentChar > 0) {
          setDisplayText(word.substring(0, currentChar - 1))
          setCurrentChar(prev => prev - 1)
        } else {
          // Move to next word
          setIsDeleting(false)
          setCurrentWord(prev => (prev + 1) % words.length)
        }
      }
    }, isPaused ? 1200 : isDeleting ? 60 : 90)

    return () => clearTimeout(typewriterTimer)
  }, [currentChar, currentWord, isDeleting, isPaused])

  // Cursor blinking effect - elegant and subtle
  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 600)

    return () => clearInterval(cursorTimer)
  }, [])

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
    window.location.href = '/inventory'
  }

  const handleWatchVideo = () => {
    // TODO: Implement video modal
    console.log('Watch video clicked')
  }

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-neutral-50 via-neutral-100 to-neutral-200"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        {/* Primary gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-emerald/10 via-neutral-50 to-gold-primary/10" />
        
        {/* Radial Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-radial opacity-60" />
        
        {/* Enhanced Mesh Gradient Effect */}
        <div className="absolute inset-0 opacity-30">
          <motion.div 
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-emerald/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold-primary/20 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.1, 0.3],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
          <motion.div 
            className="absolute top-1/2 left-1/2 w-96 h-96 bg-primary-emerald-light/15 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.15, 0.35, 0.15],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </div>
      </div>

      {/* Enhanced Floating Background Elements */}
      <div className="absolute inset-0 z-10">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-64 h-64 rounded-full bg-gradient-emerald opacity-5 blur-3xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, 150, -100, 0],
              y: [0, -80, 60, 0],
              scale: [1, 1.4, 0.8, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 12 + i * 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-20 container mx-auto px-4 text-center max-w-6xl">
        <motion.div
          initial="initial"
          animate={controls}
          variants={animationVariants.luxuryStagger}
          className="space-y-8"
        >
          {/* Premium Badge */}
          <motion.div
            variants={animationVariants.gentleReveal}
            whileHover={{ 
              scale: 1.02,
              y: -2,
              boxShadow: "0 8px 25px rgba(4, 120, 87, 0.15)"
            }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-50/90 via-white/80 to-emerald-50/90 px-8 py-4 rounded-full text-sm font-medium text-neutral-700 backdrop-blur-lg border border-emerald-200/40 relative overflow-hidden group cursor-pointer"
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          >
            {/* Subtle background shimmer */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-100/30 to-transparent"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
            
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              whileHover={{ scale: 1.1 }}
            >
              <Award className="w-4 h-4 text-gold-primary relative z-10" />
            </motion.div>
            <span className="relative z-10">#1 Luxury Auto Brokerage in NYC</span>
            
            {/* Subtle border glow */}
            <motion.div
              className="absolute inset-0 rounded-full border border-emerald-300/50 opacity-0"
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          {/* Enhanced Main Heading with Typewriter Effect */}
          <div className="space-y-8 mb-12">
            <h1 
              ref={titleRef}
              className="text-5xl md:text-7xl lg:text-8xl heading-luxury leading-tight mb-8"
            >
              <span className="block">
                <span className="text-neutral-800 text-shadow-subtle">Your dream car</span>
              </span>
              <span className="block">
                <span 
                  className="text-3d-luxury relative inline-block min-w-[200px] md:min-w-[300px] lg:min-w-[400px]"
                  style={{ 
                    minHeight: '1.2em',
                    display: 'inline-block',
                    textAlign: 'left'
                  }}
                >
                  {displayText}
                  <motion.span
                    className="text-primary-emerald"
                    animate={{ opacity: showCursor ? 1 : 0 }}
                    transition={{ duration: 0.1 }}
                  >
                    |
                  </motion.span>
                </span>
              </span>
            </h1>
            
            <div className="px-4 md:px-8 lg:px-12">
              <motion.p 
                ref={subtitleRef}
                className="text-base md:text-lg text-saas text-neutral-600 max-w-2xl mx-auto leading-relaxed relative py-4 px-5 md:px-6 bg-gradient-to-r from-neutral-50/60 via-white/80 to-neutral-50/60 backdrop-blur-sm rounded-xl border border-neutral-200/40 shadow-sm"
                whileHover={{ 
                  scale: 1.002,
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.03)",
                  borderColor: "rgba(4, 120, 87, 0.12)"
                }}
                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              >
                <motion.span
                  className="inline-block"
                  whileHover={{ y: -0.2 }}
                  transition={{ duration: 0.2 }}
                >
                  Skip the dealership hassle.
                </motion.span>{" "}
                <motion.span
                  className="inline-block text-neutral-700 font-medium text-shadow-luxury-subtle"
                  whileHover={{ 
                    y: -0.2,
                    color: "rgb(4, 120, 87)"
                  }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  We find, negotiate, and deliver luxury vehicles
                </motion.span>
                <br />
                <motion.span
                  className="inline-block"
                  whileHover={{ y: -0.2 }}
                  transition={{ duration: 0.2, delay: 0.2 }}
                >
                  directly to your door with our premium concierge service.
                </motion.span>
              </motion.p>
            </div>
          </div>

          {/* Enhanced CTA Buttons with 3D Depth */}
          <motion.div 
            ref={ctaRef}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.div
              whileHover={{ 
                scale: 1.02,
                y: -4,
                rotateX: 2,
                rotateY: 1,
              }}
              whileTap={{ 
                scale: 0.98,
                y: 0,
                rotateX: 0,
                rotateY: 0,
              }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              style={{
                transformStyle: 'preserve-3d',
                perspective: '1000px',
              }}
            >
              <Button 
                size="xl" 
                onClick={handleScrollToDeals}
                className="group relative overflow-hidden emerald-3d bg-gradient-to-r from-primary-emerald to-primary-emerald-dark hover:from-primary-emerald-dark hover:to-primary-emerald transform-style-preserve-3d"
              >
                {/* Enhanced 3D shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  style={{ transform: 'translateZ(1px)' }}
                />
                
                {/* 3D Background glow */}
                <motion.div
                  className="absolute inset-0 bg-white/10 opacity-0"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  style={{ transform: 'translateZ(-1px)' }}
                />
                
                <motion.span 
                  className="relative z-10 font-medium"
                  whileHover={{ letterSpacing: "0.01em" }}
                  transition={{ duration: 0.15 }}
                  style={{ transform: 'translateZ(2px)' }}
                >
                  Browse Inventory
                </motion.span>
                
                <motion.div
                  whileHover={{ x: 4, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className="relative z-10"
                  style={{ transform: 'translateZ(2px)' }}
                >
                  <ArrowRight className="w-5 h-5 ml-2" />
                </motion.div>

                {/* 3D Border highlight */}
                <motion.div
                  className="absolute inset-0 rounded-xl border-2 border-transparent opacity-0"
                  whileHover={{ 
                    opacity: 1,
                    borderColor: 'rgba(16, 185, 129, 0.4)'
                  }}
                  transition={{ duration: 0.3 }}
                  style={{ transform: 'translateZ(1px)' }}
                />
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ 
                scale: 1.02,
                y: -4,
                rotateX: 2,
                rotateY: 1,
              }}
              whileTap={{ 
                scale: 0.98,
                y: 0,
                rotateX: 0,
                rotateY: 0,
              }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              style={{
                transformStyle: 'preserve-3d',
                perspective: '1000px',
              }}
            >
              <Button 
                variant="luxury" 
                size="xl"
                onClick={handleWatchVideo}
                className="group relative overflow-hidden card-3d bg-gradient-to-r from-neutral-100 to-white border border-emerald-200/40 text-emerald-700 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-emerald-100 hover:border-emerald-300/50 transform-style-preserve-3d"
              >
                {/* Enhanced 3D background animation */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-emerald-50/30 to-transparent opacity-0"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{ transform: 'translateZ(-1px)' }}
                />
                
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
                  whileHover={{ scale: 1.1 }}
                  className="relative z-10"
                  style={{ transform: 'translateZ(2px)' }}
                >
                  <Play className="w-5 h-5" />
                </motion.div>
                
                <motion.span 
                  className="ml-3 relative z-10 font-medium"
                  style={{ transform: 'translateZ(2px)' }}
                  whileHover={{ letterSpacing: "0.005em" }}
                  transition={{ duration: 0.15 }}
                >
                  Watch How It Works
                </motion.span>
              </Button>
            </motion.div>
          </motion.div>

          {/* Enhanced Trust Badges / Stats */}
          <motion.div 
            ref={statsRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
            variants={animationVariants.premiumStagger}
          >
            <motion.div
              variants={animationVariants.saasCardEntrance}
              className="card-3d bg-gradient-depth p-8 text-center relative overflow-hidden group rounded-xl border border-emerald-100/50 backdrop-blur-sm cursor-pointer transform-style-preserve-3d"
              whileHover={{ 
                y: -6,
                rotateX: 3,
                rotateY: 2,
                scale: 1.01,
              }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              style={{
                transformStyle: 'preserve-3d',
                perspective: '1000px',
              }}
            >
              {/* Enhanced 3D background gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-emerald-50/15 to-transparent opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                style={{ transform: 'translateZ(-1px)' }}
              />

              {/* Enhanced Hover Overlay with 3D depth */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-emerald-600/95 to-emerald-700/95 backdrop-blur-sm rounded-xl flex flex-col justify-center items-center text-white p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out"
                style={{ transform: 'translateZ(2px)' }}
              >
                <motion.div
                  className="transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 ease-out"
                  style={{ transform: 'translateZ(1px)' }}
                >
                  <Shield className="w-8 h-8 text-white mb-4 mx-auto" />
                  <h4 className="text-lg font-semibold mb-3">Risk-Free Start</h4>
                  <p className="text-emerald-100 text-sm leading-relaxed">
                    Begin your journey with confidence. If we can't find your perfect vehicle within 30 days, 
                    get your deposit back—no questions asked.
                  </p>
                </motion.div>
              </motion.div>
              
              <div className="relative z-10 group-hover:opacity-0 transition-opacity duration-300" style={{ transform: 'translateZ(2px)' }}>
                <div className="flex items-center justify-center mb-6">
                  <div className="p-3 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-full shadow-3d-sm">
                    <Shield className="w-6 h-6 text-emerald-700" />
                  </div>
                </div>
                
                <div className="text-3xl font-bold text-neutral-900 mb-3 text-shadow-3d-sm">
                  $499
                </div>
                
                <div className="text-neutral-600 font-medium">
                  Fully Refundable Deposit
                </div>
              </div>

              {/* 3D Border highlight */}
              <motion.div
                className="absolute inset-0 rounded-xl border-2 border-transparent opacity-0"
                whileHover={{ 
                  opacity: 1,
                  borderColor: 'rgba(4, 120, 87, 0.2)'
                }}
                transition={{ duration: 0.3 }}
                style={{ transform: 'translateZ(1px)' }}
              />
            </motion.div>

            <motion.div
              variants={animationVariants.saasCardEntrance}
              className="card-3d bg-gradient-depth p-8 text-center relative overflow-hidden group rounded-xl border border-emerald-100/50 backdrop-blur-sm cursor-pointer transform-style-preserve-3d"
              whileHover={{ 
                y: -6,
                rotateX: 3,
                rotateY: 2,
                scale: 1.01,
              }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              style={{
                transformStyle: 'preserve-3d',
                perspective: '1000px',
              }}
            >
              {/* Enhanced 3D background gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-emerald-50/15 to-transparent opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                style={{ transform: 'translateZ(-1px)' }}
              />

              {/* Enhanced Hover Overlay with 3D depth */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-emerald-600/95 to-emerald-700/95 backdrop-blur-sm rounded-xl flex flex-col justify-center items-center text-white p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out"
                style={{ transform: 'translateZ(2px)' }}
              >
                <motion.div
                  className="transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 ease-out"
                  style={{ transform: 'translateZ(1px)' }}
                >
                  <Users className="w-8 h-8 text-white mb-4 mx-auto" />
                  <h4 className="text-lg font-semibold mb-3">Proven Track Record</h4>
                  <p className="text-emerald-100 text-sm leading-relaxed">
                    Join thousands of satisfied clients who've trusted us with their luxury vehicle acquisitions. 
                    95% customer satisfaction rate with over 2,500 successful deliveries.
                  </p>
                </motion.div>
              </motion.div>
              
              <div className="relative z-10 group-hover:opacity-0 transition-opacity duration-300" style={{ transform: 'translateZ(2px)' }}>
                <div className="flex items-center justify-center mb-6">
                  <div className="p-3 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-full shadow-3d-sm">
                    <Users className="w-6 h-6 text-emerald-700" />
                  </div>
                </div>
                
                <div className="text-3xl font-bold text-neutral-900 mb-3 text-shadow-3d-sm">
                  2,500+
                </div>
                
                <div className="text-neutral-600 font-medium">
                  Happy Customers
                </div>
              </div>

              {/* 3D Border highlight */}
              <motion.div
                className="absolute inset-0 rounded-xl border-2 border-transparent opacity-0"
                whileHover={{ 
                  opacity: 1,
                  borderColor: 'rgba(4, 120, 87, 0.2)'
                }}
                transition={{ duration: 0.3 }}
                style={{ transform: 'translateZ(1px)' }}
              />
            </motion.div>

            <motion.div
              variants={animationVariants.saasCardEntrance}
              className="card-3d bg-gradient-depth p-8 text-center relative overflow-hidden group rounded-xl border border-amber-100/50 backdrop-blur-sm cursor-pointer transform-style-preserve-3d"
              whileHover={{ 
                y: -6,
                rotateX: 3,
                rotateY: 2,
                scale: 1.01,
              }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              style={{
                transformStyle: 'preserve-3d',
                perspective: '1000px',
              }}
            >
              {/* Enhanced 3D background gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-amber-50/15 to-transparent opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                style={{ transform: 'translateZ(-1px)' }}
              />

              {/* Enhanced Hover Overlay with 3D depth - Gold theme */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-amber-600/95 to-amber-700/95 backdrop-blur-sm rounded-xl flex flex-col justify-center items-center text-white p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out"
                style={{ transform: 'translateZ(2px)' }}
              >
                <motion.div
                  className="transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 ease-out"
                  style={{ transform: 'translateZ(1px)' }}
                >
                  <DollarSign className="w-8 h-8 text-white mb-4 mx-auto" />
                  <h4 className="text-lg font-semibold mb-3">Maximum Savings</h4>
                  <p className="text-amber-100 text-sm leading-relaxed">
                    Our expert negotiation team has saved clients an average of $50,000+ on luxury vehicle purchases. 
                    Premium service without the premium price tag.
                  </p>
                </motion.div>
              </motion.div>
              
              <div className="relative z-10 group-hover:opacity-0 transition-opacity duration-300" style={{ transform: 'translateZ(2px)' }}>
                <div className="flex items-center justify-center mb-6">
                  <div className="p-3 bg-gradient-to-br from-amber-100 to-amber-200 rounded-full shadow-3d-sm">
                    <DollarSign className="w-6 h-6 text-amber-700" />
                  </div>
                </div>
                
                <div className="text-3xl font-bold text-neutral-900 mb-3 text-shadow-3d-gold">
                  $50K+
                </div>
                
                <div className="text-neutral-600 font-medium">
                  Average Savings
                </div>
              </div>

              {/* 3D Border highlight - Gold theme */}
              <motion.div
                className="absolute inset-0 rounded-xl border-2 border-transparent opacity-0"
                whileHover={{ 
                  opacity: 1,
                  borderColor: 'rgba(245, 158, 11, 0.2)'
                }}
                transition={{ duration: 0.3 }}
                style={{ transform: 'translateZ(1px)' }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Premium Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
        animate={{ 
          y: [0, 6, 0],
          opacity: [0.6, 1, 0.6]
        }}
        transition={{ 
          duration: 2.5, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div 
          className="flex flex-col items-center text-neutral-500 group"
          whileHover={{ color: "rgb(4, 120, 87)" }}
        >
          <motion.span 
            className="text-xs mb-3 font-medium tracking-wide"
            whileHover={{ letterSpacing: "0.1em" }}
            transition={{ duration: 0.2 }}
          >
            Discover More
          </motion.span>
          
          <motion.div
            className="relative"
            whileHover={{ 
              boxShadow: "0 0 20px rgba(4, 120, 87, 0.3)"
            }}
          >
            <motion.div
              className="w-6 h-10 border-2 border-neutral-300 rounded-full flex justify-center bg-gradient-to-b from-white/80 to-emerald-50/50 backdrop-blur-sm"
              whileHover={{ 
                borderColor: "rgb(4, 120, 87)",
                backgroundColor: "rgba(4, 120, 87, 0.05)"
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="w-1.5 h-3 bg-gradient-to-b from-neutral-400 to-emerald-500 rounded-full mt-2"
                animate={{ 
                  y: [0, 12, 0],
                  opacity: [1, 0.3, 1],
                  scaleY: [1, 0.8, 1]
                }}
                transition={{ 
                  duration: 1.8, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                whileHover={{ backgroundColor: "rgb(4, 120, 87)" }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero 