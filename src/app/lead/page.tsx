'use client'

import React, { useState, useRef, useCallback, useEffect } from 'react'
import { motion, useInView, useMotionValue, useSpring, useReducedMotion, useTransform } from 'framer-motion'
import { ArrowRight, Phone, Clock, Shield, Star, Users, CheckCircle, Award, DollarSign } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/layout/Header'

/**
 * Lead Capture Page - Premium Contact Form
 * Features: Luxury design matching homepage exactly, warm cream theme, emerald-orange gradients
 */

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  carBrand: string
  carTrim: string
  creditScore: string
  timeline: string
}

export default function LeadPage() {
  const router = useRouter()
  const containerRef = useRef<HTMLElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.3 })
  const shouldReduceMotion = useReducedMotion()
  const [isMounted, setIsMounted] = useState(false)

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    carBrand: '',
    carTrim: '',
    creditScore: '',
    timeline: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [redirectTimer, setRedirectTimer] = useState(0)
  
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

  // Client-side mounting detection
  useEffect(() => {
    setIsMounted(true)
  }, [])

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
    
    // Validate credit score requirement - allow Excellent and Good credit
    if (!formData.creditScore || (formData.creditScore !== 'Excellent' && formData.creditScore !== 'Good')) {
      alert('Our premium service requires good credit (700+) to ensure the best financing terms and vehicle access.')
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Scroll to top to show success message
      window.scrollTo({ top: 0, behavior: 'smooth' })
      
      setShowSuccess(true)
      
      // Start countdown for redirect to homepage
      setRedirectTimer(5)
      const countdown = setInterval(() => {
        setRedirectTimer(prev => {
          if (prev <= 1) {
            clearInterval(countdown)
            router.push('/')
            return 0
          }
          return prev - 1
        })
      }, 1000)
      
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
        {/* Navigation Header */}
        <Header />
        
        <main 
          className="min-h-screen flex items-center justify-center overflow-hidden pt-32"
          style={{ backgroundColor: '#FEF7ED' }}
        >
        {/* Homepage-style background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-orange-50/30 via-amber-50/20 to-emerald-50/10"
            style={isMounted ? {
              x: backgroundX,
              y: backgroundY,
            } : {}}
            suppressHydrationWarning
          />
        </div>

        <div className="relative z-10 text-center max-w-2xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="bg-white/90 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/20"
            suppressHydrationWarning
          >
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="w-10 h-10 text-emerald-600" />
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-6">
              Thank You!
            </h1>
            
            <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
              Your request has been submitted successfully. Our premium auto specialists will contact you within 5 minutes to discuss your luxury vehicle needs.
            </p>
            
            <div className="bg-emerald-50 rounded-2xl p-6 mb-8">
              <p className="text-emerald-800 font-semibold mb-2">What happens next?</p>
              <ul className="text-emerald-700 text-left space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                  Personal consultation call within 5 minutes
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                  Custom vehicle search based on your preferences
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                  Exclusive pricing and financing options
                </li>
              </ul>
            </div>
            
            <p className="text-neutral-500 text-sm">
              Redirecting to homepage in {redirectTimer} seconds...
            </p>
          </motion.div>
        </div>
      </main>
      </>
    )
  }

  return (
    <>
      {/* Navigation Header */}
      <Header />
      
      <motion.main
        ref={containerRef}
        className="min-h-screen pt-32 pb-16 overflow-hidden"
        style={{ backgroundColor: '#FEF7ED' }}
        onMouseMove={handleMouseMove}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        suppressHydrationWarning
      >
      {/* Dynamic Background Layers - Matching Homepage */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-orange-50/30 via-amber-50/20 to-emerald-50/10"
          style={isMounted ? {
            x: backgroundX,
            y: backgroundY,
          } : {}}
          suppressHydrationWarning
        />
        
        <motion.div 
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-orange-200/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          suppressHydrationWarning
        />
        
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-200/25 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.25, 0.4, 0.25],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          suppressHydrationWarning
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          suppressHydrationWarning
        >
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 heading-luxury text-neutral-800"
            suppressHydrationWarning
          >
            Get Your Dream Car
            <span className="block bg-gradient-to-r from-emerald-600 via-emerald-500 to-orange-500 bg-clip-text text-transparent">
              Delivered Today
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto mb-8 leading-relaxed"
            suppressHydrationWarning
          >
            Skip the dealership hassle. Our premium concierge service finds, negotiates, and delivers 
            luxury vehicles directly to your door. Save thousands while enjoying white-glove service.
          </motion.p>

          {/* Trust Indicators */}
          <motion.div 
            className="flex flex-wrap justify-center gap-6 mb-12"
            suppressHydrationWarning
          >
            {trustIndicators.map((indicator, index) => (
              <motion.div
                key={index}
                className="bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-neutral-700 border border-white/40 flex items-center space-x-2"
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
                transition={{ duration: 0.2 }}
                suppressHydrationWarning
              >
                <span className={indicator.color}>{indicator.icon}</span>
                <span>{indicator.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Form Section - Full Width Priority */}
        <motion.div
          className="max-w-2xl mx-auto mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          suppressHydrationWarning
        >
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-neutral-800 mb-3">
                Get Your Free Quote
              </h2>
              <p className="text-neutral-600">
                Fill out the form below and we'll contact you within 5 minutes
              </p>
            </div>
              
              <form action="https://formspree.io/f/xpwrlpgl" method="POST" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200"
                      placeholder="John"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200"
                    placeholder="(555) 123-4567"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Preferred Brand
                    </label>
                    <select
                      name="carBrand"
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200"
                    >
                      <option value="">Select Brand</option>
                      <option value="BMW">BMW</option>
                      <option value="Mercedes-Benz">Mercedes-Benz</option>
                      <option value="Audi">Audi</option>
                      <option value="Lexus">Lexus</option>
                      <option value="Tesla">Tesla</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Timeline
                    </label>
                    <select
                      name="timeline"
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200"
                    >
                      <option value="">Select Timeline</option>
                      <option value="ASAP">ASAP</option>
                      <option value="1-2 weeks">1-2 weeks</option>
                      <option value="1 month">1 month</option>
                      <option value="2-3 months">2-3 months</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Credit Score Range *
                  </label>
                  <select
                    name="creditScore"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200"
                  >
                    <option value="">Select Credit Score Range</option>
                    <option value="Excellent">Excellent (750+)</option>
                    <option value="Good">Good (700-749)</option>
                    <option value="Fair">Fair (650-699)</option>
                    <option value="Poor">Poor (Below 650)</option>
                  </select>
                </div>

                <motion.button
                  type="submit"
                  className="w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-xl flex items-center justify-center space-x-2"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  suppressHydrationWarning
                >
                  <span>Get My Free Quote</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </form>
            </div>
          </motion.div>

        {/* Value Propositions - Secondary Section */}
        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          suppressHydrationWarning
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-neutral-800 mb-4">
              Why Choose Mint Lease?
            </h3>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              We provide premium auto brokerage services that save you time, money, and hassle
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {valueProps.map((prop, index) => (
              <motion.div
                key={index}
                className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/40 text-center"
                whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
                transition={{ duration: 0.2 }}
                suppressHydrationWarning
              >
                <div className={`${prop.color} bg-white rounded-xl p-3 shadow-sm w-fit mx-auto mb-4`}>
                  {prop.icon}
                </div>
                <h4 className="text-lg font-semibold text-neutral-800 mb-2">
                  {prop.title}
                </h4>
                <p className="text-neutral-600 text-sm leading-relaxed">
                  {prop.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.main>
    </>
  )
} 