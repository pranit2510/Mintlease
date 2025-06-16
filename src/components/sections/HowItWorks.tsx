'use client';

import React, { useRef, useCallback } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { 
  MagnifyingGlassIcon, 
  CurrencyDollarIcon, 
  TruckIcon, 
  CheckCircleIcon 
} from '@heroicons/react/24/outline'

/**
 * How It Works Section - Process Overview
 * Features: Step-by-step process, luxury animations, clear value proposition
 */
export default function HowItWorks() {
  const router = useRouter()
  const containerRef = useRef<HTMLElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.3 })
  const shouldReduceMotion = useReducedMotion()

  // Interactive mouse tracking for premium effects
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Ultra-smooth spring animations
  const springMouseX = useSpring(mouseX, { 
    stiffness: shouldReduceMotion ? 100 : 400, 
    damping: shouldReduceMotion ? 40 : 25, 
    mass: 0.1 
  })
  const springMouseY = useSpring(mouseY, { 
    stiffness: shouldReduceMotion ? 100 : 400, 
    damping: shouldReduceMotion ? 40 : 25, 
    mass: 0.1 
  })

  // Parallax transforms
  const backgroundX = useTransform(springMouseX, [-100, 100], [-20, 20])
  const backgroundY = useTransform(springMouseY, [-100, 100], [-10, 10])

  // Mouse interaction handler
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return
    
    const rect = containerRef.current.getBoundingClientRect()
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    const x = (e.clientX - rect.left - centerX) / centerX
    const y = (e.clientY - rect.top - centerY) / centerY
    
    mouseX.set(x * 100)
    mouseY.set(y * 100)
  }, [mouseX, mouseY])

  const steps = [
    {
      icon: <MagnifyingGlassIcon className="w-8 h-8" />,
      title: "Tell Us What You Want",
      description: "Share your dream vehicle preferences, budget, and timeline with our expert team.",
      color: "text-emerald-600"
    },
    {
      icon: <CurrencyDollarIcon className="w-8 h-8" />,
      title: "We Find & Negotiate",
      description: "Our certified negotiators search nationwide and secure the best possible deal for you.",
      color: "text-amber-600"
    },
    {
      icon: <TruckIcon className="w-8 h-8" />,
      title: "White Glove Delivery",
      description: "Your vehicle is delivered to your door with all paperwork completed and ready to drive.",
      color: "text-orange-500"
    },
    {
      icon: <CheckCircleIcon className="w-8 h-8" />,
      title: "Enjoy Your Savings",
      description: "Drive away knowing you got the best deal without the dealership hassle.",
      color: "text-emerald-600"
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
        mass: 0.5
      }
    }
  }

  return (
    <motion.section
      ref={containerRef}
      className="py-20 relative overflow-hidden"
      style={{ 
        backgroundColor: '#FEF7ED',
        overflowX: 'hidden',
        maxWidth: '100vw',
        position: 'relative'
      }}
      onMouseMove={handleMouseMove}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      suppressHydrationWarning
    >
      {/* 120fps Optimized Luxury Background - Matching Hero Section */}
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
            x: useTransform(backgroundX, [-20, 20], [-5, 5]),
            y: useTransform(backgroundY, [-10, 10], [-8, 8]),
            opacity: 0.25,
            willChange: 'transform, opacity',
            transform: 'translate3d(0,0,0)', // Force GPU layer
          }}
          suppressHydrationWarning
        />
        
        {/* Minimal ambient light - Simplified */}
        <motion.div 
          className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-gradient-radial from-orange-100/15 to-transparent blur-3xl"
          style={{
            x: useTransform(backgroundX, [-20, 20], [-3, 3]),
            y: useTransform(backgroundY, [-10, 10], [-5, 5]),
            willChange: 'transform',
            transform: 'translate3d(0,0,0)', // Force GPU layer
          }}
          suppressHydrationWarning
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          variants={itemVariants}
          suppressHydrationWarning
        >
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 heading-luxury text-neutral-800"
            variants={itemVariants}
            suppressHydrationWarning
          >
            How It Works
          </motion.h2>
          
          <motion.p 
            className="text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
            suppressHydrationWarning
          >
            Our streamlined process eliminates dealership stress while saving you thousands. 
            From search to delivery, we handle everything.
          </motion.p>
        </motion.div>

        {/* Steps Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
          variants={containerVariants}
          suppressHydrationWarning
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative"
              variants={itemVariants}
              suppressHydrationWarning
            >
              {/* Step Number */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-bold z-10">
                {index + 1}
              </div>

              {/* Card */}
              <motion.div
                className="bg-white rounded-2xl p-6 shadow-lg border border-neutral-200 h-full"
                whileHover={{ 
                  y: -5,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                }}
                transition={{ duration: 0.3 }}
                suppressHydrationWarning
              >
                <div className={`${step.color} mb-4`}>
                  {step.icon}
                </div>
                
                <h3 className="text-xl font-semibold text-neutral-800 mb-3">
                  {step.title}
                </h3>
                
                <p className="text-neutral-600 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>

              {/* Connector Line (except for last item) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-emerald-300 to-emerald-500 transform -translate-y-1/2 z-0"></div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="text-center"
          variants={itemVariants}
          suppressHydrationWarning
        >
          <motion.div 
            className="bg-gradient-to-r from-emerald-50 to-orange-50 rounded-2xl p-8 md:p-12"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            suppressHydrationWarning
          >
            <h3 className="text-2xl md:text-3xl font-bold text-neutral-800 mb-4">
              Ready to Skip the Dealership?
            </h3>
            
            <p className="text-lg text-neutral-600 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who saved time and money with our premium service.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={() => router.push('/lead')}
                className="bg-emerald-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-emerald-700 hover:shadow-xl"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                suppressHydrationWarning
              >
                Get Started Today
              </motion.button>
              
              <motion.button
                onClick={() => router.push('/inventory')}
                className="bg-white text-emerald-600 border-2 border-emerald-600 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-emerald-50"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                suppressHydrationWarning
              >
                View Inventory
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
} 