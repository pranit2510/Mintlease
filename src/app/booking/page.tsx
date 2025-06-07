'use client'

import React, { useState, useRef, useCallback, useEffect } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { motion, useAnimation, useInView, useMotionValue, useSpring, AnimatePresence, useReducedMotion, useTransform } from 'framer-motion'
import { CalendarDaysIcon, CreditCardIcon, ShieldCheckIcon, SparklesIcon, CheckBadgeIcon, StarIcon, LockClosedIcon, ClockIcon, PhoneIcon, UserGroupIcon, TrophyIcon, DocumentCheckIcon, ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline'
import { animationVariants } from '@/lib/utils'

/**
 * Booking Page - Premium $499 Consultation Deposit
 * Features: Luxury animations, glassmorphism, interactive 3D effects, trust elements, Stripe integration ready
 */
export default function BookingPage() {
  const containerRef = useRef<HTMLElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.3 })
  const shouldReduceMotion = useReducedMotion()
  const controls = useAnimation()

  // Interactive mouse tracking for premium effects
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const [isHovering, setIsHovering] = useState(false)

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

  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    vehicleType: '',
    budget: '',
    timeline: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [step, setStep] = useState(1)

  // Animation variants matching design system
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      rotateX: -15,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
        mass: 0.5
      }
    }
  }

  const heroVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 0.8,
        duration: 1.2
      }
    }
  }

  const benefits = [
    {
      icon: <ShieldCheckIcon className="w-7 h-7" />,
      title: "100% Refundable",
      description: "Full refund if we don't save you money or you're not satisfied",
      feature: "Risk-Free Guarantee"
    },
    {
      icon: <TrophyIcon className="w-7 h-7" />,
      title: "Expert Negotiators",
      description: "Certified professionals with 15+ years automotive experience",
      feature: "Proven Track Record"
    },
    {
      icon: <LockClosedIcon className="w-7 h-7" />,
      title: "Secure Payment",
      description: "Bank-level security with Stripe payment processing",
      feature: "SSL Encrypted"
    },
    {
      icon: <ClockIcon className="w-7 h-7" />,
      title: "24hr Response",
      description: "We'll contact you within 24 hours to schedule your consultation",
      feature: "Fast Service"
    }
  ]

  const processSteps = [
    {
      step: 1,
      title: "Secure Your Spot",
      description: "Place your fully refundable $499 deposit",
      icon: <CreditCardIcon className="w-6 h-6" />
    },
    {
      step: 2,
      title: "Expert Consultation",
      description: "45-minute call with our certified negotiator",
      icon: <PhoneIcon className="w-6 h-6" />
    },
    {
      step: 3,
      title: "Vehicle Research",
      description: "We research pricing, incentives, and availability",
      icon: <DocumentCheckIcon className="w-6 h-6" />
    },
    {
      step: 4,
      title: "Negotiation & Delivery",
      description: "We handle everything from negotiation to delivery",
      icon: <CheckBadgeIcon className="w-6 h-6" />
    }
  ]

  const testimonials = [
    {
      name: "Sarah Chen",
      location: "Beverly Hills, CA", 
      savings: "$8,400",
      quote: "They saved me almost $8,500 on my new BMW X5. The process was seamless and stress-free.",
      rating: 5
    },
    {
      name: "Michael Rodriguez",
      location: "Austin, TX",
      savings: "$12,200", 
      quote: "Best investment I ever made. $499 turned into $12,000+ in savings on my Tesla Model S.",
      rating: 5
    },
    {
      name: "Jennifer Park",
      location: "Manhattan, NY",
      savings: "$6,800",
      quote: "As a busy professional, having experts handle everything was invaluable. Highly recommend!",
      rating: 5
    }
  ]

  // Mouse interaction handlers
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

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false)
    mouseX.set(0)
    mouseY.set(0)
  }, [mouseX, mouseY])

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleBookConsultation = async () => {
    setIsSubmitting(true)
    // TODO: Integrate with Stripe for payment processing
    console.log('Book consultation clicked', formData)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    // TODO: Redirect to payment or success page
  }

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  return (
    <>
      <Header />
      
      <motion.main 
        ref={containerRef}
        className="relative pt-32 min-h-screen overflow-hidden"
        style={{
          background: `
            radial-gradient(circle at 25% 75%, rgba(16, 185, 129, 0.06) 0%, transparent 50%),
            radial-gradient(circle at 75% 25%, rgba(245, 158, 11, 0.04) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.02) 0%, transparent 60%),
            linear-gradient(135deg, #FEF7ED 0%, #FDF4E7 50%, #FCF0E1 100%)
          `
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        {/* Enhanced Background Layers */}
        <motion.div
          className="absolute inset-0 hero-atmosphere-layer-1"
          style={{
            x: backgroundX,
            y: backgroundY,
          }}
        />
        <motion.div
          className="absolute inset-0 hero-atmosphere-layer-2"
          style={{
            x: useTransform(backgroundX, [0, 20], [0, -10]),
            y: useTransform(backgroundY, [0, 10], [0, -5]),
          }}
        />

        <div className="container mx-auto px-4 py-12 relative z-10">
          {/* Hero Section */}
          <motion.div
            variants={heroVariants}
            className="text-center mb-20"
          >
            <motion.div
              className="inline-flex items-center space-x-2 px-6 py-3 mb-8 glass luxury-card rounded-full"
              whileHover={{ scale: 1.05, y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <SparklesIcon className="w-5 h-5 text-primary-emerald" />
              <span className="text-sm font-medium text-emerald-700">Premium Auto Brokerage</span>
            </motion.div>

            <motion.h1 
              className="text-5xl lg:text-7xl font-bold text-neutral-800 mb-8 text-3d-luxury"
              variants={itemVariants}
            >
              Book Your{' '}
              <span className="gradient-text bg-gradient-to-r from-emerald-600 via-emerald-500 to-gold-primary bg-clip-text text-transparent">
                Consultation
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl lg:text-2xl text-neutral-600 max-w-4xl mx-auto leading-relaxed mb-8"
              variants={itemVariants}
            >
              Secure your spot with a fully refundable $499 deposit. Our experts will help you find 
              and negotiate the best deal on your dream vehicle.
            </motion.p>

            {/* Trust Indicators */}
            <motion.div 
              className="flex flex-wrap justify-center items-center gap-8 mb-12"
              variants={itemVariants}
            >
              <div className="flex items-center space-x-2 text-neutral-600">
                <StarIcon className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="font-semibold">4.9/5 Rating</span>
              </div>
              <div className="flex items-center space-x-2 text-neutral-600">
                <UserGroupIcon className="w-5 h-5 text-emerald-600" />
                <span className="font-semibold">2,500+ Happy Clients</span>
              </div>
              <div className="flex items-center space-x-2 text-neutral-600">
                <TrophyIcon className="w-5 h-5 text-gold-primary" />
                <span className="font-semibold">$15M+ Saved</span>
              </div>
            </motion.div>
          </motion.div>

          <div className="max-w-8xl mx-auto grid grid-cols-1 xl:grid-cols-12 gap-12">
            {/* Booking Form - Enhanced */}
            <motion.div
              variants={itemVariants}
              className="xl:col-span-5"
            >
              <motion.div
                className="luxury-card p-8 lg:p-10 relative overflow-hidden"
                whileHover={{ 
                  y: -8,
                  rotateY: 2,
                  rotateX: 2,
                  transition: { type: "spring", stiffness: 400, damping: 25 }
                }}
              >
                {/* Animated background elements */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-emerald-50/60 to-gold-50/40 rounded-xl"
                  animate={{
                    scale: isHovering ? 1.02 : 1,
                    opacity: isHovering ? 0.8 : 0.6
                  }}
                  transition={{ duration: 0.4 }}
                />
                
                <div className="relative z-10">
                  <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-neutral-800 text-3d-luxury mb-6">
                      Schedule Your Consultation
                    </h2>

                    {/* Deposit Amount Showcase */}
                    <motion.div 
                      className="p-8 bg-gradient-emerald rounded-2xl text-white relative overflow-hidden shadow-luxury mb-8"
                      whileHover={{ scale: 1.02, y: -2 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                        animate={{
                          x: ['-100%', '100%'],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      />
                      <div className="relative z-10">
                        <motion.div 
                          className="text-5xl font-bold mb-3"
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.2 }}
                        >
                          $499
                        </motion.div>
                        <div className="text-emerald-100 text-lg font-medium">Fully Refundable Deposit</div>
                        <div className="text-emerald-200/80 text-sm mt-2">Average client saves $8,500+</div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Enhanced Contact Form */}
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      >
                        <input
                          type="text"
                          placeholder="First Name"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          className="w-full px-4 py-4 border-2 border-neutral-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition-all duration-300 text-lg font-medium bg-white/90 backdrop-blur-sm"
                        />
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      >
                        <input
                          type="text"
                          placeholder="Last Name"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          className="w-full px-4 py-4 border-2 border-neutral-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition-all duration-300 text-lg font-medium bg-white/90 backdrop-blur-sm"
                        />
                      </motion.div>
                    </div>
                    
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      <input
                        type="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full px-4 py-4 border-2 border-neutral-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition-all duration-300 text-lg font-medium bg-white/90 backdrop-blur-sm"
                      />
                    </motion.div>
                    
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full px-4 py-4 border-2 border-neutral-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition-all duration-300 text-lg font-medium bg-white/90 backdrop-blur-sm"
                      />
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      >
                        <select 
                          value={formData.vehicleType}
                          onChange={(e) => handleInputChange('vehicleType', e.target.value)}
                          className="w-full px-4 py-4 border-2 border-neutral-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition-all duration-300 text-lg font-medium bg-white/90 backdrop-blur-sm"
                        >
                          <option value="">Vehicle Type</option>
                          <option>Luxury Sedan</option>
                          <option>SUV/Crossover</option>
                          <option>Sports Car</option>
                          <option>Electric Vehicle</option>
                          <option>Truck</option>
                          <option>Other</option>
                        </select>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      >
                        <select 
                          value={formData.budget}
                          onChange={(e) => handleInputChange('budget', e.target.value)}
                          className="w-full px-4 py-4 border-2 border-neutral-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition-all duration-300 text-lg font-medium bg-white/90 backdrop-blur-sm"
                        >
                          <option value="">Budget Range</option>
                          <option>$30k - $50k</option>
                          <option>$50k - $75k</option>
                          <option>$75k - $100k</option>
                          <option>$100k - $150k</option>
                          <option>$150k+</option>
                        </select>
                      </motion.div>
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      <select 
                        value={formData.timeline}
                        onChange={(e) => handleInputChange('timeline', e.target.value)}
                        className="w-full px-4 py-4 border-2 border-neutral-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition-all duration-300 text-lg font-medium bg-white/90 backdrop-blur-sm"
                      >
                        <option value="">Purchase Timeline</option>
                        <option>Within 2 weeks</option>
                        <option>Within 1 month</option>
                        <option>Within 3 months</option>
                        <option>More than 3 months</option>
                        <option>Just exploring options</option>
                      </select>
                    </motion.div>
                    
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      <textarea
                        placeholder="Tell us about your dream vehicle and any specific requirements..."
                        rows={4}
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        className="w-full px-4 py-4 border-2 border-neutral-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition-all duration-300 text-lg font-medium bg-white/90 backdrop-blur-sm resize-none"
                      />
                    </motion.div>

                    {/* Enhanced Payment Button */}
                    <motion.button
                      onClick={handleBookConsultation}
                      disabled={isSubmitting}
                      className="w-full bg-gradient-emerald text-white py-5 px-8 rounded-2xl font-bold text-xl shadow-luxury relative overflow-hidden"
                      whileHover={{ 
                        scale: 1.02, 
                        y: -3,
                        boxShadow: "0 35px 60px -12px rgba(0, 0, 0, 0.35), 0 0 30px rgba(16, 185, 129, 0.4)"
                      }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      {isSubmitting ? (
                        <motion.div 
                          className="flex items-center justify-center space-x-3"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          <motion.div
                            className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          <span>Processing...</span>
                        </motion.div>
                      ) : (
                        <div className="flex items-center justify-center space-x-3">
                          <LockClosedIcon className="w-6 h-6" />
                          <span>Secure My Consultation - $499</span>
                        </div>
                      )}
                      
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        animate={{
                          x: ['-100%', '100%'],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      />
                    </motion.button>

                    <motion.p 
                      className="text-center text-sm text-neutral-600"
                      variants={itemVariants}
                    >
                      <LockClosedIcon className="w-4 h-4 inline mr-1" />
                      Secure payment powered by Stripe • SSL encrypted • PCI compliant
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Benefits & Process Section - Enhanced */}
            <motion.div
              variants={itemVariants}
              className="xl:col-span-7 space-y-8"
            >
              {/* Benefits Grid */}
              <motion.div
                className="luxury-card p-8 lg:p-10 relative overflow-hidden"
                whileHover={{ 
                  y: -8,
                  scale: 1.01,
                  transition: { type: "spring", stiffness: 400, damping: 25 }
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-emerald opacity-3 rounded-xl"
                  animate={{
                    scale: isHovering ? 1.1 : 1,
                    opacity: isHovering ? 0.08 : 0.04
                  }}
                  transition={{ duration: 0.4 }}
                />
                
                <div className="relative z-10">
                  <h3 className="text-3xl font-bold text-neutral-800 text-3d-luxury mb-8">
                    Why Choose Mint Lease?
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {benefits.map((benefit, index) => (
                      <motion.div
                        key={index}
                        className="p-6 glass rounded-xl relative overflow-hidden"
                        variants={itemVariants}
                        whileHover={{ scale: 1.02, y: -5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      >
                        <div className="flex items-start space-x-4">
                          <motion.div 
                            className="w-14 h-14 bg-gradient-emerald rounded-xl flex items-center justify-center text-white shadow-glow"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                          >
                            {benefit.icon}
                          </motion.div>
                          <div className="flex-1">
                            <h4 className="text-lg font-bold text-neutral-800 mb-2">
                              {benefit.title}
                            </h4>
                            <p className="text-neutral-600 text-sm mb-3 leading-relaxed">
                              {benefit.description}
                            </p>
                            <div className="inline-flex items-center px-3 py-1 bg-emerald-100 rounded-full">
                              <span className="text-xs font-semibold text-emerald-700">{benefit.feature}</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Process Steps */}
              <motion.div
                className="luxury-card p-8 lg:p-10"
                whileHover={{ 
                  y: -8,
                  transition: { type: "spring", stiffness: 400, damping: 25 }
                }}
                variants={itemVariants}
              >
                <h3 className="text-3xl font-bold text-neutral-800 text-3d-luxury mb-8">
                  What Happens Next?
                </h3>
                
                <div className="space-y-6">
                  {processSteps.map((step, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start space-x-6 p-6 glass rounded-xl"
                      variants={itemVariants}
                      whileHover={{ scale: 1.01, x: 8 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      <motion.div 
                        className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl flex items-center justify-center shadow-glow relative overflow-hidden"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12" />
                        <div className="relative z-10">
                          <div className="text-2xl font-bold mb-1">{step.step}</div>
                          <div className="opacity-60">
                            {step.icon}
                          </div>
                        </div>
                      </motion.div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-neutral-800 mb-2">
                          {step.title}
                        </h4>
                        <p className="text-neutral-600 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Social Proof & Testimonials */}
              <motion.div
                className="luxury-card p-8 lg:p-10"
                whileHover={{ 
                  y: -8,
                  transition: { type: "spring", stiffness: 400, damping: 25 }
                }}
                variants={itemVariants}
              >
                <h3 className="text-3xl font-bold text-neutral-800 text-3d-luxury mb-8">
                  Client Success Stories
                </h3>
                
                <div className="space-y-6">
                  {testimonials.map((testimonial, index) => (
                    <motion.div
                      key={index}
                      className="p-6 glass rounded-xl"
                      variants={itemVariants}
                      whileHover={{ scale: 1.01, y: -3 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="text-lg font-bold text-neutral-800">{testimonial.name}</h4>
                          <p className="text-sm text-neutral-600">{testimonial.location}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-emerald-600">{testimonial.savings}</div>
                          <div className="text-sm text-neutral-600">Saved</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center mb-3">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <StarIcon key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      
                      <blockquote className="text-neutral-700 italic leading-relaxed">
                        "{testimonial.quote}"
                      </blockquote>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Trust Badges & Guarantees */}
              <motion.div
                className="text-center glass luxury-card p-8"
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <div className="text-3xl font-bold text-emerald-600 mb-2">2,500+</div>
                    <div className="text-neutral-600 font-medium">Happy Clients</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-gold-primary mb-2">$15M+</div>
                    <div className="text-neutral-600 font-medium">Total Savings</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-emerald-600 mb-2">4.9/5</div>
                    <div className="text-neutral-600 font-medium">Average Rating</div>
                  </div>
                </div>
                
                <motion.p 
                  className="mt-6 text-neutral-600 text-lg"
                  variants={itemVariants}
                >
                  Join thousands of satisfied clients who've saved an average of $8,500+ on their vehicle purchase.
                </motion.p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.main>
      
      <Footer />
    </>
  )
} 