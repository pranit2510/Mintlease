'use client'

import React, { useState, useRef, useCallback, useEffect } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { motion, useAnimation, useInView, useMotionValue, useSpring, AnimatePresence, useReducedMotion, useTransform } from 'framer-motion'
import { CalculatorIcon, CurrencyDollarIcon, ChartBarIcon, CheckCircleIcon, SparklesIcon, TrophyIcon, ShieldCheckIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/outline'
import { TrendingUp, Shield, Zap } from 'lucide-react'
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
  const [scrollY, setScrollY] = useState(0)

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        setScrollY(window.scrollY)
      })
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
      
      <main className="pt-20">

        
        {/* Page Header - Scaled to match inventory */}
        <section className="py-20 relative overflow-hidden z-10">
          {/* Animated background gradient */}
          <motion.div
            className="absolute inset-0 opacity-50"
            animate={{
              background: [
                'radial-gradient(circle at 20% 50%, rgba(5, 150, 105, 0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 80% 50%, rgba(249, 115, 22, 0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 20% 50%, rgba(5, 150, 105, 0.1) 0%, transparent 50%)',
              ],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              willChange: 'background',
              transform: 'translateZ(0)',
            }}
          />
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              initial={{ opacity: 1, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6,
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
              className="text-center mb-16"
              style={{
                transform: 'translateZ(0)',
                willChange: 'transform, opacity',
              }}
            >
              <motion.div
                initial={{ opacity: 1, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="inline-flex items-center gap-2 glass px-6 py-3 rounded-full text-sm font-medium text-neutral-700 mb-8"
              >
                <SparklesIcon className="w-4 h-4 text-emerald-600" />
                Premium Savings Calculator
              </motion.div>
              
              <h1 className="text-5xl lg:text-7xl font-black mb-8 leading-tight">
                <span className="text-neutral-800">Calculate Your </span>
                <span className="text-emerald-600">Savings</span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-neutral-600 max-w-4xl mx-auto leading-relaxed">
                Discover your potential savings with our expert negotiation services. 
                See exactly how much you could save on your <span className="font-semibold text-emerald-600">dream vehicle</span>.
              </p>
              
              {/* Trust Indicators matching inventory */}
              <motion.div
                className="flex justify-center items-center gap-8 mt-12"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.5 }}
                variants={{
                  initial: { opacity: 0 },
                  animate: { 
                    opacity: 1,
                    transition: { staggerChildren: 0.1 }
                  }
                }}
              >
                <motion.div
                  variants={{
                    initial: { opacity: 0, y: 20 },
                    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                  }}
                  className="flex items-center gap-3 text-neutral-600"
                >
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                  <span className="font-medium text-base">Average Savings</span>
                </motion.div>
                <motion.div
                  variants={{
                    initial: { opacity: 0, y: 20 },
                    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                  }}
                  className="flex items-center gap-3 text-neutral-600"
                >
                  <Shield className="w-5 h-5 text-orange-500" />
                  <span className="font-medium text-base">Zero Risk Guarantee</span>
                </motion.div>
                <motion.div
                  variants={{
                    initial: { opacity: 0, y: 20 },
                    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                  }}
                  className="flex items-center gap-3 text-neutral-600"
                >
                  <Zap className="w-5 h-5 text-emerald-600" />
                  <span className="font-medium text-base">Instant Results</span>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12 relative z-10">

          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Calculator Form - Scaled Down */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <motion.div
                className="glass p-6 lg:p-8 relative overflow-hidden rounded-2xl"
                whileHover={{ 
                  y: -4,
                  transition: { type: "spring", stiffness: 300, damping: 25 }
                }}
              >
                <div className="relative z-10">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="p-2 bg-emerald-600 rounded-lg">
                      <CalculatorIcon className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-neutral-800">
                      Vehicle Calculator
                    </h2>
                  </div>

                  <div className="space-y-6">
                    {/* Vehicle Price */}
                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-neutral-700">
                        Vehicle Price
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500 text-sm">$</span>
                        <input
                          type="number"
                          value={vehiclePrice}
                          onChange={(e) => setVehiclePrice(Number(e.target.value))}
                          className="w-full pl-8 pr-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 text-sm bg-white"
                        />
                      </div>
                      <input
                        type="range"
                        min="25000"
                        max="250000"
                        step="5000"
                        value={vehiclePrice}
                        onChange={(e) => setVehiclePrice(Number(e.target.value))}
                        className="w-full accent-emerald-500 h-2 rounded-full"
                      />
                      <div className="flex justify-between text-xs text-neutral-500">
                        <span>$25k</span>
                        <span>$250k</span>
                      </div>
                    </div>

                    {/* Down Payment */}
                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-neutral-700">
                        Down Payment
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500 text-sm">$</span>
                        <input
                          type="number"
                          value={downPayment}
                          onChange={(e) => setDownPayment(Number(e.target.value))}
                          className="w-full pl-8 pr-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 text-sm bg-white"
                        />
                      </div>
                      <input
                        type="range"
                        min="0"
                        max={vehiclePrice * 0.4}
                        step="1000"
                        value={downPayment}
                        onChange={(e) => setDownPayment(Number(e.target.value))}
                        className="w-full accent-emerald-500 h-2 rounded-full"
                      />
                      <div className="flex justify-between text-xs text-neutral-500">
                        <span>$0</span>
                        <span>{formatCurrency(vehiclePrice * 0.4)}</span>
                      </div>
                    </div>

                    {/* Trade-in Value */}
                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-neutral-700">
                        Trade-in Value (Optional)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500 text-sm">$</span>
                        <input
                          type="number"
                          value={tradeinValue}
                          onChange={(e) => setTradeinValue(Number(e.target.value))}
                          className="w-full pl-8 pr-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 text-sm bg-white"
                        />
                      </div>
                    </div>

                    {/* Term Selection */}
                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-neutral-700">
                        Lease/Loan Term
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {[24, 36, 48, 60].map((term) => (
                          <button
                            key={term}
                            onClick={() => setLeaseTerm(term)}
                            className={`p-3 rounded-lg border transition-all duration-200 text-sm font-medium ${
                              leaseTerm === term
                                ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                                : 'border-neutral-300 bg-white text-neutral-600 hover:border-emerald-300'
                            }`}
                          >
                            {term} Months
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Interest Rate */}
                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-neutral-700">
                        Interest Rate (%)
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          step="0.1"
                          value={interestRate}
                          onChange={(e) => setInterestRate(Number(e.target.value))}
                          className="w-full pl-4 pr-8 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 text-sm bg-white"
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-500 text-sm">%</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="12"
                        step="0.1"
                        value={interestRate}
                        onChange={(e) => setInterestRate(Number(e.target.value))}
                        className="w-full accent-emerald-500 h-2 rounded-full"
                      />
                      <div className="flex justify-between text-xs text-neutral-500">
                        <span>1%</span>
                        <span>12%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Results Section - Scaled Down */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Savings Highlight */}
              <motion.div
                className="glass p-6 lg:p-8 relative overflow-hidden rounded-2xl"
                whileHover={{ 
                  y: -4,
                  transition: { type: "spring", stiffness: 300, damping: 25 }
                }}
              >
                <div className="relative z-10">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="p-2 bg-emerald-600 rounded-lg">
                      <CurrencyDollarIcon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-neutral-800">
                      Your Potential Savings
                    </h3>
                  </div>
                  
                  <div className="text-center p-6 bg-emerald-600 rounded-xl text-white mb-6">
                    <div className="text-4xl font-bold mb-2">
                      {formatCurrency(savings.totalSavings)}
                    </div>
                    <div className="text-emerald-100 text-sm">Total Estimated Savings</div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-white rounded-lg border border-neutral-200">
                      <div className="text-lg font-bold text-emerald-600 mb-1">{formatCurrency(savings.vehicleSavings)}</div>
                      <div className="text-xs text-neutral-600">Vehicle Negotiation</div>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg border border-neutral-200">
                      <div className="text-lg font-bold text-orange-500 mb-1">{formatCurrency(savings.feesSaved)}</div>
                      <div className="text-xs text-neutral-600">Fees & Documentation</div>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg border border-neutral-200">
                      <div className="text-lg font-bold text-neutral-700 mb-1">{Math.round((savings.totalSavings / vehiclePrice) * 100)}%</div>
                      <div className="text-xs text-neutral-600">Total Discount</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Payment Comparison */}
              <motion.div
                className="glass p-6 lg:p-8 rounded-2xl"
                whileHover={{ 
                  y: -4,
                  transition: { type: "spring", stiffness: 300, damping: 25 }
                }}
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-orange-500 rounded-lg">
                    <ChartBarIcon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-800">
                    Payment Options
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 border border-emerald-200 rounded-lg bg-emerald-50">
                    <h4 className="text-lg font-bold text-emerald-700 mb-3">Lease Payment</h4>
                    <div className="text-3xl font-bold text-emerald-600 mb-1">{formatCurrency(leasePayment)}</div>
                    <div className="text-emerald-600 text-sm mb-3">per month</div>
                    <div className="text-xs text-neutral-600 space-y-1">
                      <div>• Lower monthly payments</div>
                      <div>• Latest technology</div>
                      <div>• Warranty coverage</div>
                    </div>
                  </div>

                  <div className="p-4 border border-neutral-200 rounded-lg bg-neutral-50">
                    <h4 className="text-lg font-bold text-neutral-700 mb-3">Loan Payment</h4>
                    <div className="text-3xl font-bold text-neutral-600 mb-1">{formatCurrency(loanPayment)}</div>
                    <div className="text-neutral-600 text-sm mb-3">per month</div>
                    <div className="text-xs text-neutral-600 space-y-1">
                      <div>• Build equity</div>
                      <div>• No mileage limits</div>
                      <div>• Full ownership</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Benefits Section */}
              <motion.div
                className="glass p-6 lg:p-8 rounded-2xl"
                whileHover={{ 
                  y: -4,
                  transition: { type: "spring", stiffness: 300, damping: 25 }
                }}
              >
                <h3 className="text-xl font-bold text-neutral-800 mb-6">
                  Why Choose Mint Lease?
                </h3>
                
                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-4 p-4 bg-white rounded-lg border border-neutral-200"
                    >
                      <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center text-white">
                        <div className="w-5 h-5">
                          {benefit.icon}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-neutral-800 mb-1">
                          {benefit.title}
                        </h4>
                        <p className="text-neutral-600 text-sm mb-2">
                          {benefit.description}
                        </p>
                        <div className="inline-flex items-center px-3 py-1 bg-emerald-100 rounded-full">
                          <span className="text-xs font-semibold text-emerald-700">{benefit.value}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* CTA Section */}
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <button
                  className="inline-flex items-center space-x-3 px-8 py-4 bg-emerald-600 text-white text-lg font-bold rounded-xl hover:bg-emerald-700 transition-colors duration-200"
                  onClick={() => window.location.href = '/booking'}
                >
                  <span>Start Saving Today</span>
                  <span>→</span>
                </button>
                
                <p className="mt-4 text-neutral-600 text-sm">
                  Ready to save {formatCurrency(savings.totalSavings)} on your next vehicle?
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  )
} 