'use client'

import React, { useEffect, useRef } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'
import { gsap } from 'gsap'
import { ArrowRight, Play, Shield, Award, Users } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { cn, animationVariants } from '@/lib/utils'

/**
 * Hero Section - Luxury Auto Brokerage Landing
 * Features: Glassmorphism, Gradient background, Scroll animations, Trust badges
 */
export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  const controls = useAnimation()
  const isInView = useInView(containerRef, { once: true, amount: 0.3 })

  useEffect(() => {
    if (isInView) {
      controls.start('animate')
    }
  }, [isInView, controls])

  useEffect(() => {
    // GSAP Timeline for advanced animations
    const tl = gsap.timeline({ delay: 0.5 })
    
    tl.fromTo(titleRef.current, 
      { opacity: 0, y: 100, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power3.out" }
    )
    .fromTo(subtitleRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.8"
    )
    .fromTo(ctaRef.current,
      { opacity: 0, y: 30, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.7)" },
      "-=0.4"
    )
    .fromTo(statsRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.3"
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
        
        {/* Mesh Gradient Effect */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-emerald/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold-primary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-primary-emerald-light/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
      </div>

      {/* Floating Background Elements */}
      <div className="absolute inset-0 z-10">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-64 h-64 rounded-full bg-gradient-emerald opacity-10 blur-3xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "linear",
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
          {/* Badge */}
          <motion.div
            variants={animationVariants.fadeIn}
            className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm font-medium text-neutral-700 backdrop-blur-lg"
          >
            <Award className="w-4 h-4 text-gold-primary" />
            #1 Luxury Auto Brokerage in NYC
          </motion.div>

          {/* Main Heading */}
          <div className="space-y-4">
            <h1 
              ref={titleRef}
              className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight"
            >
              <span className="gradient-text">Your Dream Car</span>
              <br />
              <span className="text-neutral-900">Delivered</span>
            </h1>
            
            <p 
              ref={subtitleRef}
              className="text-xl md:text-2xl text-neutral-600 max-w-3xl mx-auto leading-relaxed"
            >
              Skip the dealership hassle. We find, negotiate, and deliver 
              luxury vehicles directly to your door with our premium concierge service.
            </p>
          </div>

          {/* CTA Buttons */}
          <div 
            ref={ctaRef}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button 
              size="xl" 
              onClick={handleScrollToDeals}
              className="group"
            >
              Browse Inventory
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              variant="luxury" 
              size="xl"
              onClick={handleWatchVideo}
              className="group"
            >
              <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Watch How It Works
            </Button>
          </div>

          {/* Trust Badges / Stats */}
          <div 
            ref={statsRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
          >
            <motion.div
              variants={animationVariants.slideUp}
              className="luxury-card p-6 text-center"
            >
              <div className="flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-primary-emerald" />
              </div>
              <div className="text-3xl font-bold text-neutral-900 mb-2">$499</div>
              <div className="text-neutral-600">Fully Refundable Deposit</div>
            </motion.div>

            <motion.div
              variants={animationVariants.slideUp}
              className="luxury-card p-6 text-center"
            >
              <div className="flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-primary-emerald" />
              </div>
              <div className="text-3xl font-bold text-neutral-900 mb-2">2,500+</div>
              <div className="text-neutral-600">Happy Customers</div>
            </motion.div>

            <motion.div
              variants={animationVariants.slideUp}
              className="luxury-card p-6 text-center"
            >
              <div className="flex items-center justify-center mb-4">
                <Award className="w-8 h-8 text-primary-emerald" />
              </div>
              <div className="text-3xl font-bold text-neutral-900 mb-2">5-Star</div>
              <div className="text-neutral-600">Average Rating</div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            variants={animationVariants.fadeIn}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 border-2 border-neutral-400 rounded-full flex justify-center"
            >
              <motion.div
                animate={{ y: [0, 16, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-3 bg-neutral-400 rounded-full mt-2"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Gradient Overlay for Better Text Contrast */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-transparent via-transparent to-neutral-50/80" />
    </section>
  )
}

export default Hero 