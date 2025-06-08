'use client'

import React, { useState, useRef, useCallback } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { motion, useAnimation, useInView, useMotionValue, useSpring, useReducedMotion, useTransform } from 'framer-motion'
import { ArrowRight, Phone, Clock, Shield, Star, Users, CheckCircle, Sparkles, Award, DollarSign } from 'lucide-react'
import { animationVariants } from '@/lib/utils'

/**
 * Lead Capture Page - Premium Contact Form
 * Features: Luxury design matching homepage exactly, warm cream theme, emerald-orange gradients
 */

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  vehicleInterest: string
  timeline: string
}

export default function LeadPage() {
  const containerRef = useRef<HTMLElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.3 })
  const shouldReduceMotion = useReducedMotion()

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    vehicleInterest: '',
    timeline: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  // Interactive mouse tracking - matching homepage exactly
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
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

  // Transform values for parallax - matching homepage exactly
  const backgroundX = useTransform(springMouseX, [-100, 100], [-20, 20])
  const backgroundY = useTransform(springMouseY, [-100, 100], [-10, 10])
  const accentX = useTransform(springMouseX, [-100, 100], [-5, 5])
  const accentY = useTransform(springMouseY, [-100, 100], [-8, 8])

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

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      setShowSuccess(true)
    } catch (error) {
      console.error('Lead submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Trust indicators with premium styling
  const trustIndicators = [
    {
      icon: <Shield className="w-5 h-5" />,
      text: "Secure & Private",
      color: "text-emerald-600"
    },
    {
      icon: <Clock className="w-5 h-5" />,
      text: "5 Min Response",
      color: "text-amber-600"
    },
    {
      icon: <Star className="w-5 h-5" />,
      text: "4.9/5 Rating",
      color: "text-orange-500"
    },
    {
      icon: <Users className="w-5 h-5" />,
      text: "2500+ Happy Clients",
      color: "text-emerald-600"
    }
  ]

  // Value propositions with luxury styling
  const valueProps = [
    {
      icon: <Award className="w-6 h-6" />,
      title: "Premium Selection",
      description: "Access to exclusive luxury vehicles from premium dealers nationwide",
      color: "text-emerald-600"
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: "Best Price Guarantee",
      description: "We negotiate the best deals and pass the savings directly to you",
      color: "text-amber-600"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "White Glove Service",
      description: "Personal concierge service from selection to delivery at your door",
      color: "text-orange-500"
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Hassle-Free Process",
      description: "Skip the dealership entirely - we handle everything for you",
      color: "text-emerald-600"
    }
  ]

  if (showSuccess) {
    return (
      <>
        <Header />
        <main 
          className="min-h-screen flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: '#FEF7ED' }}
        >
          {/* Homepage-style background */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-orange-50/30 via-amber-50/20 to-emerald-50/10"
              style={{
                x: backgroundX,
                y: backgroundY,
                willChange: 'transform',
              }}
            />
            <motion.div 
              className="absolute top-0 right-0 w-[60%] h-[60%] bg-gradient-radial from-amber-50/25 to-transparent blur-3xl"
              style={{
                x: accentX,
                y: accentY,
                willChange: 'transform',
              }}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 bg-[#FEFCFA] rounded-[20px] p-12 text-center max-w-2xl w-full mx-4
                       shadow-[0_8px_32px_rgba(139,69,19,0.12),0_16px_64px_rgba(139,69,19,0.06)]"
          >
            {/* Success icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, duration: 0.8, type: "spring", stiffness: 400 }}
              className="w-20 h-20 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8
                         shadow-[0_8px_20px_-4px_rgba(5,150,105,0.3)]"
            >
              <CheckCircle className="w-10 h-10 text-white" />
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-3xl font-bold text-neutral-900 mb-4"
            >
              We'll Call You in 5 Minutes!
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-lg text-neutral-600 mb-8"
            >
              Thank you for choosing Mint Lease. Our luxury vehicle specialist will contact you shortly.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
            >
              <div className="bg-emerald-50 rounded-[16px] p-6 border border-emerald-100">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <Phone className="w-5 h-5 text-emerald-600" />
                  <span className="font-semibold text-neutral-900">Quick Response</span>
                </div>
                <p className="text-neutral-600 text-sm">
                  Expect a call within <strong className="text-emerald-600">5 minutes</strong>
                </p>
              </div>
              
              <div className="bg-amber-50 rounded-[16px] p-6 border border-amber-100">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <Sparkles className="w-5 h-5 text-amber-600" />
                  <span className="font-semibold text-neutral-900">Premium Service</span>
                </div>
                <p className="text-neutral-600 text-sm">
                  White glove <strong className="text-amber-600">concierge service</strong>
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.location.href = '/inventory'}
                className="flex-1 bg-emerald-600 text-white border-0 rounded-full px-6 py-3 font-medium 
                         transition-all duration-300 group"
                style={{
                  background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                  boxShadow: '0 8px 20px -4px rgba(5, 150, 105, 0.3)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #059669 0%, #10b981 30%, #f97316 70%, #ea580c 100%)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #059669 0%, #047857 100%)'
                }}
              >
                Browse Inventory
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.location.href = '/'}
                className="flex-1 bg-white border-2 border-emerald-600 text-emerald-600 rounded-full px-6 py-3 font-medium 
                         hover:bg-emerald-50 transition-all duration-300"
              >
                Back to Home
              </motion.button>
            </motion.div>
          </motion.div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      
      <main 
        ref={containerRef}
        className="min-h-screen py-20 px-4 relative overflow-hidden"
        style={{ backgroundColor: '#FEF7ED' }}
        onMouseMove={handleMouseMove}
      >
        {/* Homepage-style background with mouse tracking */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-orange-50/30 via-amber-50/20 to-emerald-50/10"
            style={{
              x: backgroundX,
              y: backgroundY,
              willChange: 'transform',
            }}
          />
          <motion.div 
            className="absolute top-0 right-0 w-[60%] h-[60%] bg-gradient-radial from-amber-50/25 to-transparent blur-3xl"
            style={{
              x: accentX,
              y: accentY,
              willChange: 'transform',
            }}
          />
          <motion.div 
            className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-gradient-radial from-orange-100/15 to-transparent blur-3xl"
            style={{
              x: useTransform(springMouseX, [-100, 100], [-3, 3]),
              y: useTransform(springMouseY, [-100, 100], [-5, 5]),
              willChange: 'transform',
            }}
          />
        </div>

        <motion.div
          className="max-w-6xl mx-auto relative z-10"
          initial="initial"
          animate={isInView ? "visible" : "initial"}
          variants={animationVariants.luxuryStagger}
        >
          {/* Header Section */}
          <motion.div variants={animationVariants.premiumSlideUp} className="text-center mb-16">
            <motion.div className="inline-block mb-6">
              <div className="w-16 h-16 bg-emerald-600 rounded-[16px] flex items-center justify-center
                             shadow-[0_8px_20px_-4px_rgba(5,150,105,0.3)] mx-auto mb-6">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
            </motion.div>
            
            <motion.h1 
              variants={animationVariants.premiumSlideUp}
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-6"
              style={{
                background: 'linear-gradient(135deg, #000000 0%, #1f2937 50%, #059669 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Get Your Premium
              <span className="block" style={{
                background: 'linear-gradient(135deg, #059669 0%, #10b981 30%, #f97316 70%, #ea580c 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Quote Today
              </span>
            </motion.h1>
            
            <motion.p 
              variants={animationVariants.premiumSlideUp}
              className="text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed mb-8"
            >
              Experience luxury auto brokerage. Our AI specialist will call you within 5 minutes to begin your premium vehicle journey.
            </motion.p>

            {/* Trust indicators */}
            <motion.div
              variants={animationVariants.premiumStagger}
              className="flex flex-wrap justify-center gap-6 mb-12"
            >
              {trustIndicators.map((indicator, index) => (
                <motion.div
                  key={index}
                  variants={animationVariants.saasCardEntrance}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 
                           border border-white/40 shadow-lg"
                >
                  <span className={indicator.color}>{indicator.icon}</span>
                  <span className="text-neutral-700 text-sm font-medium">{indicator.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Value Propositions */}
            <motion.div variants={animationVariants.premiumSlideUp} className="space-y-8">
              <h2 className="text-3xl font-bold text-neutral-900 mb-8">Why Choose Mint Lease?</h2>
              
              {valueProps.map((prop, index) => (
                <motion.div
                  key={index}
                  variants={animationVariants.saasCardEntrance}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="bg-[#FEFCFA] rounded-[16px] p-6 border border-white/40
                           shadow-[0_4px_20px_rgba(139,69,19,0.08)] hover:shadow-[0_8px_32px_rgba(139,69,19,0.12)]
                           transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 ${prop.color} bg-opacity-10 rounded-[12px] flex items-center justify-center`}>
                      <span className={prop.color}>{prop.icon}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-neutral-900 mb-2">{prop.title}</h3>
                      <p className="text-neutral-600 leading-relaxed">{prop.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Premium Form */}
            <motion.div variants={animationVariants.premiumSlideUp}>
              <motion.form
                onSubmit={handleSubmit}
                className="bg-[#FEFCFA] rounded-[20px] p-8 border border-white/40
                          shadow-[0_8px_32px_rgba(139,69,19,0.12),0_16px_64px_rgba(139,69,19,0.06)]"
              >
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-neutral-900 mb-2">Start Your Journey</h3>
                  <p className="text-neutral-600">Get your personalized quote in minutes</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-neutral-700 text-sm font-medium mb-2">First Name</label>
                    <input 
                      type="text" 
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="w-full px-4 py-3 rounded-[12px] bg-white border border-neutral-200
                               text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-500
                               focus:border-emerald-500 transition-all duration-300"
                      placeholder="Enter first name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-700 text-sm font-medium mb-2">Last Name</label>
                    <input 
                      type="text" 
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="w-full px-4 py-3 rounded-[12px] bg-white border border-neutral-200
                               text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-500
                               focus:border-emerald-500 transition-all duration-300"
                      placeholder="Enter last name"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-neutral-700 text-sm font-medium mb-2">Email Address</label>
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-3 rounded-[12px] bg-white border border-neutral-200
                             text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-500
                             focus:border-emerald-500 transition-all duration-300"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-neutral-700 text-sm font-medium mb-2">Phone Number</label>
                  <input 
                    type="tel" 
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-4 py-3 rounded-[12px] bg-white border border-neutral-200
                             text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-500
                             focus:border-emerald-500 transition-all duration-300"
                    placeholder="(555) 123-4567"
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label className="block text-neutral-700 text-sm font-medium mb-2">Vehicle Interest</label>
                  <select
                    value={formData.vehicleInterest}
                    onChange={(e) => handleInputChange('vehicleInterest', e.target.value)}
                    className="w-full px-4 py-3 rounded-[12px] bg-white border border-neutral-200
                             text-neutral-900 focus:outline-none focus:ring-2 focus:ring-emerald-500
                             focus:border-emerald-500 transition-all duration-300"
                    required
                  >
                    <option value="">Select vehicle type</option>
                    <option value="luxury-sedan">Luxury Sedan</option>
                    <option value="luxury-suv">Luxury SUV</option>
                    <option value="sports-car">Sports Car</option>
                    <option value="electric-luxury">Electric Luxury</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div className="mb-8">
                  <label className="block text-neutral-700 text-sm font-medium mb-2">Timeline</label>
                  <select
                    value={formData.timeline}
                    onChange={(e) => handleInputChange('timeline', e.target.value)}
                    className="w-full px-4 py-3 rounded-[12px] bg-white border border-neutral-200
                             text-neutral-900 focus:outline-none focus:ring-2 focus:ring-emerald-500
                             focus:border-emerald-500 transition-all duration-300"
                    required
                  >
                    <option value="">When do you need a vehicle?</option>
                    <option value="asap">ASAP</option>
                    <option value="1-2-weeks">1-2 weeks</option>
                    <option value="1-month">Within a month</option>
                    <option value="3-months">Within 3 months</option>
                    <option value="just-browsing">Just browsing</option>
                  </select>
                </div>
                
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ 
                    scale: shouldReduceMotion ? 1 : 1.02, 
                    y: shouldReduceMotion ? 0 : -3 
                  }}
                  whileTap={{ 
                    scale: shouldReduceMotion ? 1 : 0.98,
                    y: 0
                  }}
                  transition={{ 
                    type: "spring",
                    stiffness: 400,
                    damping: 25,
                    mass: 0.1
                  }}
                  className="w-full bg-emerald-600 text-white border-0 rounded-full px-10 py-4 text-lg font-medium 
                           transition-all duration-300 group relative overflow-hidden"
                  style={{
                    background: isSubmitting ? '#6b7280' : 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                    boxShadow: '0 8px 20px -4px rgba(5, 150, 105, 0.3), 0 16px 40px -8px rgba(5, 150, 105, 0.2), 0 32px 64px -16px rgba(0, 0, 0, 0.15), inset 0 2px 0 rgba(255, 255, 255, 0.1)',
                  }}
                  onMouseEnter={(e) => {
                    if (!isSubmitting) {
                      e.currentTarget.style.background = 'linear-gradient(135deg, #059669 0%, #10b981 30%, #f97316 70%, #ea580c 100%)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSubmitting) {
                      e.currentTarget.style.background = 'linear-gradient(135deg, #059669 0%, #047857 100%)'
                    }
                  }}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center relative z-10">
                      Get My Quote
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                    </span>
                  )}
                </motion.button>

                <p className="text-neutral-500 text-sm text-center mt-4">
                  By submitting, you agree to receive calls from our AI specialist within 5 minutes.
                </p>
              </motion.form>
            </motion.div>
          </div>
        </motion.div>
      </main>
      
      <Footer />
    </>
  )
} 