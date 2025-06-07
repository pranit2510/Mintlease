'use client'

import React, { useState, useRef, useCallback, useEffect } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { motion, useAnimation, useInView, useMotionValue, useSpring, AnimatePresence, useReducedMotion, useTransform } from 'framer-motion'
import { CalculatorIcon, CurrencyDollarIcon, ChartBarIcon, CheckCircleIcon, SparklesIcon, TrophyIcon, ShieldCheckIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/outline'
import { animationVariants } from '@/lib/utils'

/**
 * Calculator Page - Premium Savings & Financing Calculator
 * Features: Luxury animations, glassmorphism, interactive 3D effects, advanced calculations
 */
export default function CalculatorPage() {
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

  // Calculator state
  const [vehiclePrice, setVehiclePrice] = useState(65000)
  const [downPayment, setDownPayment] = useState(8000)
  const [leaseTerm, setLeaseTerm] = useState(36)
  const [interestRate, setInterestRate] = useState(4.2)
  const [tradeinValue, setTradeinValue] = useState(0)
  const [calculationStep, setCalculationStep] = useState(0)

  // Animation variants matching home page style
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

  // Enhanced calculations
  const calculateLeasePayment = () => {
    const monthlyRate = interestRate / 100 / 12
    const residualValue = vehiclePrice * 0.58 // Premium vehicle residual
    const capitalizedCost = vehiclePrice - downPayment - tradeinValue
    const depreciation = (capitalizedCost - residualValue) / leaseTerm
    const finance = (capitalizedCost + residualValue) * monthlyRate
    return Math.round(depreciation + finance)
  }

  const calculateLoanPayment = () => {
    const principal = vehiclePrice - downPayment - tradeinValue
    const monthlyRate = interestRate / 100 / 12
    const payment = principal * (monthlyRate * Math.pow(1 + monthlyRate, leaseTerm)) / (Math.pow(1 + monthlyRate, leaseTerm) - 1)
    return Math.round(payment)
  }

  const calculateSavings = () => {
    const standardPrice = vehiclePrice
    const mintLeasePrice = vehiclePrice * 0.89 // 11% average savings
    const totalSavings = standardPrice - mintLeasePrice
    const feesSaved = vehiclePrice * 0.03 // Documentation fees, etc.
    return {
      vehicleSavings: Math.round(totalSavings),
      feesSaved: Math.round(feesSaved),
      totalSavings: Math.round(totalSavings + feesSaved)
    }
  }

  const leasePayment = calculateLeasePayment()
  const loanPayment = calculateLoanPayment()
  const savings = calculateSavings()

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

  // Enhanced number formatting
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const benefits = [
    {
      icon: <TrophyIcon className="w-7 h-7" />,
      title: "Expert Negotiation",
      description: "Our certified negotiators save you thousands",
      value: "11% Average Savings"
    },
    {
      icon: <ShieldCheckIcon className="w-7 h-7" />,
      title: "Zero Risk Guarantee",
      description: "100% refundable if we don't save you money",
      value: "Risk-Free Service"
    },
    {
      icon: <ArrowTrendingUpIcon className="w-7 h-7" />,
      title: "Market Intelligence",
      description: "Access to wholesale pricing and incentives",
      value: "Insider Access"
    }
  ]

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
            radial-gradient(circle at 20% 80%, rgba(16, 185, 129, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(245, 158, 11, 0.05) 0%, transparent 50%),
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
              <span className="text-sm font-medium text-emerald-700">Premium Savings Calculator</span>
            </motion.div>

            <motion.h1 
              className="text-5xl lg:text-7xl font-bold text-neutral-800 mb-8 text-3d-luxury"
              variants={itemVariants}
            >
              Calculate Your{' '}
              <span className="gradient-text bg-gradient-to-r from-emerald-600 via-emerald-500 to-gold-primary bg-clip-text text-transparent">
                Savings
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl lg:text-2xl text-neutral-600 max-w-4xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              Discover your potential savings with our expert negotiation services. 
              See exactly how much you could save on your dream vehicle.
            </motion.p>
          </motion.div>

          <div className="max-w-8xl mx-auto grid grid-cols-1 xl:grid-cols-12 gap-12">
            {/* Calculator Form - Enhanced */}
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
                  className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-gold-50/30 rounded-xl"
                  animate={{
                    scale: isHovering ? 1.02 : 1,
                    opacity: isHovering ? 0.8 : 0.5
                  }}
                  transition={{ duration: 0.4 }}
                />
                
                <div className="relative z-10">
                  <div className="flex items-center space-x-4 mb-10">
                    <motion.div
                      className="p-3 bg-gradient-emerald rounded-xl shadow-glow"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      <CalculatorIcon className="w-8 h-8 text-white" />
                    </motion.div>
                    <h2 className="text-3xl font-bold text-neutral-800 text-3d-luxury">
                      Vehicle Calculator
                    </h2>
                  </div>

                  <div className="space-y-8">
                    {/* Vehicle Price */}
                    <motion.div
                      variants={itemVariants}
                      className="space-y-4"
                    >
                      <label className="block text-lg font-semibold text-neutral-700 mb-3">
                        Vehicle Price
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-500 text-lg font-medium">$</span>
                        <input
                          type="number"
                          value={vehiclePrice}
                          onChange={(e) => setVehiclePrice(Number(e.target.value))}
                          className="w-full pl-10 pr-6 py-4 border-2 border-neutral-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition-all duration-300 text-lg font-semibold bg-white/80 backdrop-blur-sm"
                        />
                      </div>
                      <motion.input
                        type="range"
                        min="25000"
                        max="250000"
                        step="5000"
                        value={vehiclePrice}
                        onChange={(e) => setVehiclePrice(Number(e.target.value))}
                        className="w-full mt-3 accent-emerald-500 h-3 rounded-full appearance-none bg-gradient-to-r from-emerald-100 to-emerald-200"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      />
                      <div className="flex justify-between text-sm text-neutral-500 font-medium">
                        <span>$25k</span>
                        <span>$250k</span>
                      </div>
                    </motion.div>

                    {/* Down Payment */}
                    <motion.div
                      variants={itemVariants}
                      className="space-y-4"
                    >
                      <label className="block text-lg font-semibold text-neutral-700 mb-3">
                        Down Payment
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-500 text-lg font-medium">$</span>
                        <input
                          type="number"
                          value={downPayment}
                          onChange={(e) => setDownPayment(Number(e.target.value))}
                          className="w-full pl-10 pr-6 py-4 border-2 border-neutral-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition-all duration-300 text-lg font-semibold bg-white/80 backdrop-blur-sm"
                        />
                      </div>
                      <motion.input
                        type="range"
                        min="0"
                        max={vehiclePrice * 0.4}
                        step="1000"
                        value={downPayment}
                        onChange={(e) => setDownPayment(Number(e.target.value))}
                        className="w-full mt-3 accent-emerald-500 h-3 rounded-full appearance-none bg-gradient-to-r from-emerald-100 to-emerald-200"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      />
                      <div className="flex justify-between text-sm text-neutral-500 font-medium">
                        <span>$0</span>
                        <span>{formatCurrency(vehiclePrice * 0.4)}</span>
                      </div>
                    </motion.div>

                    {/* Trade-in Value */}
                    <motion.div
                      variants={itemVariants}
                      className="space-y-4"
                    >
                      <label className="block text-lg font-semibold text-neutral-700 mb-3">
                        Trade-in Value (Optional)
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-500 text-lg font-medium">$</span>
                        <input
                          type="number"
                          value={tradeinValue}
                          onChange={(e) => setTradeinValue(Number(e.target.value))}
                          className="w-full pl-10 pr-6 py-4 border-2 border-neutral-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition-all duration-300 text-lg font-semibold bg-white/80 backdrop-blur-sm"
                        />
                      </div>
                    </motion.div>

                    {/* Term Selection */}
                    <motion.div
                      variants={itemVariants}
                      className="space-y-4"
                    >
                      <label className="block text-lg font-semibold text-neutral-700 mb-3">
                        Lease/Loan Term
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {[24, 36, 48, 60].map((term) => (
                          <motion.button
                            key={term}
                            onClick={() => setLeaseTerm(term)}
                            className={`p-4 rounded-xl border-2 transition-all duration-300 font-semibold ${
                              leaseTerm === term
                                ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                                : 'border-neutral-200 bg-white/80 text-neutral-600 hover:border-emerald-300'
                            }`}
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                          >
                            {term} Months
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>

                    {/* Interest Rate */}
                    <motion.div
                      variants={itemVariants}
                      className="space-y-4"
                    >
                      <label className="block text-lg font-semibold text-neutral-700 mb-3">
                        Interest Rate (%)
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          step="0.1"
                          value={interestRate}
                          onChange={(e) => setInterestRate(Number(e.target.value))}
                          className="w-full px-6 py-4 border-2 border-neutral-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition-all duration-300 text-lg font-semibold bg-white/80 backdrop-blur-sm"
                        />
                        <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-neutral-500 text-lg font-medium">%</span>
                      </div>
                      <motion.input
                        type="range"
                        min="1"
                        max="12"
                        step="0.1"
                        value={interestRate}
                        onChange={(e) => setInterestRate(Number(e.target.value))}
                        className="w-full mt-3 accent-emerald-500 h-3 rounded-full appearance-none bg-gradient-to-r from-emerald-100 to-emerald-200"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      />
                      <div className="flex justify-between text-sm text-neutral-500 font-medium">
                        <span>1%</span>
                        <span>12%</span>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Results Section - Enhanced */}
            <motion.div
              variants={itemVariants}
              className="xl:col-span-7 space-y-8"
            >
              {/* Savings Highlight */}
              <motion.div
                className="luxury-card p-8 lg:p-10 relative overflow-hidden"
                whileHover={{ 
                  y: -8,
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 400, damping: 25 }
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-emerald opacity-5 rounded-xl"
                  animate={{
                    scale: isHovering ? 1.1 : 1,
                    opacity: isHovering ? 0.1 : 0.05
                  }}
                  transition={{ duration: 0.4 }}
                />
                
                <div className="relative z-10">
                  <div className="flex items-center space-x-4 mb-8">
                    <motion.div
                      className="p-3 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl shadow-glow"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      <CurrencyDollarIcon className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3 className="text-3xl font-bold text-neutral-800 text-3d-luxury">
                      Your Potential Savings
                    </h3>
                  </div>
                  
                  <div className="text-center p-8 bg-gradient-emerald rounded-2xl text-white mb-8 relative overflow-hidden shadow-luxury">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                      animate={{
                        x: ['-100%', '100%'],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                    <motion.div 
                      className="text-6xl font-bold mb-3"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.2 }}
                    >
                      {formatCurrency(savings.totalSavings)}
                    </motion.div>
                    <div className="text-emerald-100 text-xl font-medium">Total Estimated Savings</div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <motion.div 
                      className="text-center p-6 glass rounded-xl"
                      whileHover={{ scale: 1.05, y: -5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      <div className="text-2xl font-bold text-emerald-600 mb-2">{formatCurrency(savings.vehicleSavings)}</div>
                      <div className="text-sm text-neutral-600 font-medium">Vehicle Negotiation</div>
                    </motion.div>
                    <motion.div 
                      className="text-center p-6 glass rounded-xl"
                      whileHover={{ scale: 1.05, y: -5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      <div className="text-2xl font-bold text-gold-primary mb-2">{formatCurrency(savings.feesSaved)}</div>
                      <div className="text-sm text-neutral-600 font-medium">Fees & Documentation</div>
                    </motion.div>
                    <motion.div 
                      className="text-center p-6 glass rounded-xl"
                      whileHover={{ scale: 1.05, y: -5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      <div className="text-2xl font-bold text-neutral-700 mb-2">{Math.round((savings.totalSavings / vehiclePrice) * 100)}%</div>
                      <div className="text-sm text-neutral-600 font-medium">Total Discount</div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Payment Comparison */}
              <motion.div
                className="luxury-card p-8 lg:p-10"
                whileHover={{ 
                  y: -8,
                  transition: { type: "spring", stiffness: 400, damping: 25 }
                }}
                variants={itemVariants}
              >
                <div className="flex items-center space-x-4 mb-8">
                  <motion.div
                    className="p-3 bg-gradient-to-r from-gold-primary to-gold-secondary rounded-xl shadow-glow"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <ChartBarIcon className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-3xl font-bold text-neutral-800 text-3d-luxury">
                    Payment Options
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <motion.div 
                    className="p-6 border-2 border-emerald-200 rounded-xl bg-emerald-50/50"
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <h4 className="text-xl font-bold text-emerald-700 mb-4">Lease Payment</h4>
                    <div className="text-4xl font-bold text-emerald-600 mb-2">{formatCurrency(leasePayment)}</div>
                    <div className="text-emerald-600 font-medium">per month</div>
                    <div className="mt-4 text-sm text-neutral-600">
                      <div>• Lower monthly payments</div>
                      <div>• Latest technology</div>
                      <div>• Warranty coverage</div>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="p-6 border-2 border-neutral-200 rounded-xl bg-neutral-50/50"
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <h4 className="text-xl font-bold text-neutral-700 mb-4">Loan Payment</h4>
                    <div className="text-4xl font-bold text-neutral-600 mb-2">{formatCurrency(loanPayment)}</div>
                    <div className="text-neutral-600 font-medium">per month</div>
                    <div className="mt-4 text-sm text-neutral-600">
                      <div>• Build equity</div>
                      <div>• No mileage limits</div>
                      <div>• Full ownership</div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Benefits Section */}
              <motion.div
                className="luxury-card p-8 lg:p-10"
                whileHover={{ 
                  y: -8,
                  transition: { type: "spring", stiffness: 400, damping: 25 }
                }}
                variants={itemVariants}
              >
                <h3 className="text-3xl font-bold text-neutral-800 text-3d-luxury mb-8">
                  Why Choose Mint Lease?
                </h3>
                
                <div className="space-y-6">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start space-x-6 p-6 glass rounded-xl"
                      variants={itemVariants}
                      whileHover={{ scale: 1.02, x: 10 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      <motion.div 
                        className="w-16 h-16 bg-gradient-emerald rounded-xl flex items-center justify-center text-white shadow-glow"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      >
                        {benefit.icon}
                      </motion.div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-neutral-800 mb-2">
                          {benefit.title}
                        </h4>
                        <p className="text-neutral-600 mb-3 leading-relaxed">
                          {benefit.description}
                        </p>
                        <div className="inline-flex items-center px-4 py-2 bg-emerald-100 rounded-full">
                          <span className="text-sm font-semibold text-emerald-700">{benefit.value}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* CTA Section */}
              <motion.div
                className="text-center"
                variants={itemVariants}
              >
                <motion.button
                  className="inline-flex items-center space-x-3 px-12 py-6 bg-gradient-emerald text-white text-xl font-bold rounded-2xl shadow-luxury"
                  whileHover={{ 
                    scale: 1.05, 
                    y: -5,
                    boxShadow: "0 35px 60px -12px rgba(0, 0, 0, 0.35), 0 0 30px rgba(16, 185, 129, 0.4)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  onClick={() => window.location.href = '/booking'}
                >
                  <span>Start Saving Today</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.div>
                </motion.button>
                
                <motion.p 
                  className="mt-6 text-neutral-600 text-lg"
                  variants={itemVariants}
                >
                  Ready to save {formatCurrency(savings.totalSavings)} on your next vehicle?
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