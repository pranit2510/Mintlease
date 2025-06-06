'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'
import { gsap } from 'gsap'
import { ArrowRight, Play, Shield, Award, Users } from 'lucide-react'
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
          variants={animationVariants.staggerContainer}
          className="space-y-8"
        >
          {/* Enhanced Badge */}
          <motion.div
            variants={animationVariants.fadeIn}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 30px rgba(4, 120, 87, 0.3)"
            }}
            className="inline-flex items-center gap-2 glass px-6 py-3 rounded-full text-sm font-medium text-neutral-700 backdrop-blur-lg border border-primary-emerald/20"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Award className="w-4 h-4 text-gold-primary" />
            </motion.div>
            #1 Luxury Auto Brokerage in NYC
          </motion.div>

          {/* Enhanced Main Heading with Typewriter Effect */}
          <div className="space-y-6">
            <h1 
              ref={titleRef}
              className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight"
            >
              <span className="block">
                <span className="text-neutral-800">Your dream car </span>
                <span className="gradient-text relative">
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
            
            <motion.p 
              ref={subtitleRef}
              className="text-xl md:text-2xl text-neutral-600 max-w-3xl mx-auto leading-relaxed"
              whileInView={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              Skip the dealership hassle. We find, negotiate, and deliver 
              luxury vehicles directly to your door with our premium concierge service.
            </motion.p>
          </div>

          {/* Enhanced CTA Buttons */}
          <motion.div 
            ref={ctaRef}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.div
              whileHover={{ 
                scale: 1.05,
                rotate: [0, -1, 1, 0],
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="xl" 
                onClick={handleScrollToDeals}
                className="group relative overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary-emerald-light to-primary-emerald opacity-0 group-hover:opacity-100"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10">Browse Inventory</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 group-hover:scale-110 transition-all duration-300" />
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ 
                scale: 1.05,
                rotate: [0, 1, -1, 0],
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                variant="luxury" 
                size="xl"
                onClick={handleWatchVideo}
                className="group relative overflow-hidden"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Play className="w-5 h-5 group-hover:scale-125 transition-transform duration-300" />
                </motion.div>
                <span className="ml-2">Watch How It Works</span>
              </Button>
            </motion.div>
          </motion.div>

          {/* Enhanced Trust Badges / Stats */}
          <motion.div 
            ref={statsRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
          >
            <motion.div
              variants={animationVariants.slideUp}
              whileHover={{ 
                y: -8,
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(4, 120, 87, 0.2)"
              }}
              className="luxury-card p-6 text-center relative overflow-hidden group"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary-emerald/5 to-transparent opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              />
              <div className="relative z-10">
                <motion.div
                  className="flex items-center justify-center mb-4"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Shield className="w-8 h-8 text-primary-emerald" />
                </motion.div>
                <motion.div 
                  className="text-3xl font-bold text-neutral-900 mb-2"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  $499
                </motion.div>
                <div className="text-neutral-600">Fully Refundable Deposit</div>
              </div>
            </motion.div>

            <motion.div
              variants={animationVariants.slideUp}
              whileHover={{ 
                y: -8,
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(4, 120, 87, 0.2)"
              }}
              className="luxury-card p-6 text-center relative overflow-hidden group"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary-emerald/5 to-transparent opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              />
              <div className="relative z-10">
                <motion.div
                  className="flex items-center justify-center mb-4"
                  animate={{ rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                >
                  <Users className="w-8 h-8 text-primary-emerald" />
                </motion.div>
                <motion.div 
                  className="text-3xl font-bold text-neutral-900 mb-2"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                >
                  2,500+
                </motion.div>
                <div className="text-neutral-600">Happy Customers</div>
              </div>
            </motion.div>

            <motion.div
              variants={animationVariants.slideUp}
              whileHover={{ 
                y: -8,
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(245, 158, 11, 0.2)"
              }}
              className="luxury-card p-6 text-center relative overflow-hidden group"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-gold-primary/5 to-transparent opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              />
              <div className="relative z-10">
                <motion.div
                  className="flex items-center justify-center mb-4"
                  animate={{ 
                    rotate: 360,
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                    scale: { duration: 2, repeat: Infinity, delay: 1 }
                  }}
                >
                  <Award className="w-8 h-8 text-gold-primary" />
                </motion.div>
                <motion.div 
                  className="text-3xl font-bold text-neutral-900 mb-2"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                >
                  $50K+
                </motion.div>
                <div className="text-neutral-600">Average Savings</div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced Floating Action Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ 
          y: [0, 10, 0],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="flex flex-col items-center text-neutral-500">
          <span className="text-xs mb-2 font-medium">Discover More</span>
          <motion.div
            className="w-6 h-10 border-2 border-neutral-400 rounded-full flex justify-center"
            whileHover={{ scale: 1.1, borderColor: "#047857" }}
          >
            <motion.div
              className="w-1 h-3 bg-neutral-400 rounded-full mt-2"
              animate={{ 
                y: [0, 16, 0],
                opacity: [1, 0.3, 1]
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default Hero 