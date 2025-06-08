'use client'

import React, { useState, useRef, useCallback, useEffect } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { PageBackground, SectionBackground } from '@/components/layout/GlobalBackground'
import { PremiumBadge } from '@/components/ui/PremiumBadge'
import { motion, useAnimation, useInView, useMotionValue, useSpring, AnimatePresence, useReducedMotion, useTransform } from 'framer-motion'
import { gsap } from 'gsap'
import { animationVariants } from '@/lib/utils'
import { 
  CalculatorIcon, 
  CurrencyDollarIcon, 
  ChartBarIcon, 
  CheckCircleIcon, 
  SparklesIcon, 
  TrophyIcon, 
  ShieldCheckIcon, 
  ArrowTrendingUpIcon,
  ClockIcon,
  StarIcon,
  BuildingStorefrontIcon,
  UserGroupIcon,
  DocumentTextIcon,
  PrinterIcon
} from '@heroicons/react/24/outline'
import { TrendingUp, Shield, Zap, Award, Users, Globe } from 'lucide-react'

/**
 * Vehicle Finance/Lease Calculator - Comprehensive Comparison Tool
 * Features: Finance vs Lease comparison, Credit score integration, Mint Lease advantages
 */
export default function CalculatorPage() {
  const containerRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const calculatorRef = useRef<HTMLDivElement>(null)
  const comparisonRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.3 })
  const shouldReduceMotion = useReducedMotion()
  const controls = useAnimation()

  // Interactive mouse tracking for premium effects - 120fps optimized
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const [isHovering, setIsHovering] = useState(false)

  // Ultra-smooth spring animations for 120fps
  const springMouseX = useSpring(mouseX, { 
    stiffness: shouldReduceMotion ? 100 : 400, 
    damping: shouldReduceMotion ? 40 : 25, 
    mass: 0.1,
    restSpeed: 0.1,
    restDelta: 0.01
  })
  const springMouseY = useSpring(mouseY, { 
    stiffness: shouldReduceMotion ? 100 : 400, 
    damping: shouldReduceMotion ? 40 : 25, 
    mass: 0.1,
    restSpeed: 0.1,
    restDelta: 0.01
  })

  // Enhanced parallax transforms
  const backgroundX = useTransform(springMouseX, [-100, 100], [-20, 20])
  const backgroundY = useTransform(springMouseY, [-100, 100], [-10, 10])
  const accentX = useTransform(springMouseX, [-100, 100], [-5, 5])
  const accentY = useTransform(springMouseY, [-100, 100], [-8, 8])

  // Interactive depth layers
  const [interactiveIntensity, setInteractiveIntensity] = useState(1)

  // Calculator state
  const [vehiclePrice, setVehiclePrice] = useState(65000)
  const [downPayment, setDownPayment] = useState(8000)
  const [tradeinValue, setTradeinValue] = useState(0)
  const [creditScore, setCreditScore] = useState('excellent')
  const [financeTermMonths, setFinanceTermMonths] = useState(60)
  const [leaseTermMonths, setLeaseTermMonths] = useState(36)
  const [mileageAllowance, setMileageAllowance] = useState(12000)
  const [showComparison, setShowComparison] = useState(true)
  const [scrollY, setScrollY] = useState(0)

  // Credit score mapping to interest rates (Updated for 2024 market)
  const creditScoreRates = {
    'excellent': { min: 6.5, max: 8.5, label: 'Excellent (750+)' },
    'good': { min: 8.5, max: 11.5, label: 'Good (700-749)' },
    'fair': { min: 11.5, max: 16.5, label: 'Fair (650-699)' },
    'poor': { min: 16.5, max: 23, label: 'Poor (<650)' }
  }

  // GSAP entrance animations - matching Hero component
  useEffect(() => {
    if (isInView) {
      controls.start('animate')
    }
  }, [isInView, controls])

  useEffect(() => {
    // Enhanced GSAP Timeline for advanced animations - matching Hero style
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
    // Calculator with bounce effect
    .fromTo(calculatorRef.current,
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
    // Comparison cards with stagger effect
    .fromTo(comparisonRef.current?.children || [],
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

  // Get interest rate based on credit score
  const getInterestRate = () => {
    const rates = creditScoreRates[creditScore as keyof typeof creditScoreRates]
    return (rates.min + rates.max) / 2 // Use average rate
  }

  // Enhanced calculations with validation
  const calculateFinancePayment = () => {
    const principal = Math.max(0, vehiclePrice - downPayment - tradeinValue)
    if (principal <= 0) return 0
    
    const monthlyRate = getInterestRate() / 100 / 12
    if (monthlyRate === 0) return Math.round(principal / financeTermMonths)
    
    // Standard loan payment formula: P * [r(1+r)^n] / [(1+r)^n - 1]
    const payment = principal * (monthlyRate * Math.pow(1 + monthlyRate, financeTermMonths)) / (Math.pow(1 + monthlyRate, financeTermMonths) - 1)
    return Math.round(payment)
  }

  const calculateLeasePayment = () => {
    // Convert APR to money factor (APR ÷ 2400)
    const moneyFactor = getInterestRate() / 2400
    const residualValue = vehiclePrice * 0.58 // Premium vehicle residual (58% for luxury vehicles)
    const adjustedCapCost = Math.max(0, vehiclePrice - downPayment - tradeinValue)
    
    if (adjustedCapCost <= residualValue) return 0 // Can't lease if cap cost is too low
    
    // Depreciation: (Adjusted Cap Cost - Residual Value) ÷ Term
    const depreciation = (adjustedCapCost - residualValue) / leaseTermMonths
    
    // Finance charge: (Adjusted Cap Cost + Residual Value) × Money Factor
    const financeCharge = (adjustedCapCost + residualValue) * moneyFactor
    
    return Math.round(Math.max(0, depreciation + financeCharge))
  }

  const calculateTotalCosts = () => {
    const financePayment = calculateFinancePayment()
    const leasePayment = calculateLeasePayment()
    
    // Total cost = all monthly payments + down payment (not double-counted)
    const totalFinanceCost = (financePayment * financeTermMonths) + downPayment
    const totalLeaseCost = (leasePayment * leaseTermMonths) + downPayment
    
    // Interest is total payments minus the principal amount financed
    const principalFinanced = vehiclePrice - downPayment - tradeinValue
    const totalInterestPaid = (financePayment * financeTermMonths) - principalFinanced
    
    return {
      financePayment,
      leasePayment,
      totalFinanceCost,
      totalLeaseCost,
      totalInterestPaid,
      equityAfterTerm: vehiclePrice * 0.65, // Estimated equity after finance term
      principalFinanced
    }
  }

  const calculateDealershipVsMintLease = () => {
    const costs = calculateTotalCosts()
    const dealershipRate = getInterestRate()
    const mintLeaseRate = dealershipRate - 0.5 // 0.5% better rates (more realistic)
    
    // Calculate with better rates
    const principal = vehiclePrice - downPayment - tradeinValue
    const monthlyRate = mintLeaseRate / 100 / 12
    
    // Finance with Mint Lease
    const mintFinancePayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, financeTermMonths)) / (Math.pow(1 + monthlyRate, financeTermMonths) - 1)
    
    // Lease with Mint Lease (using proper money factor)
    const residualValue = vehiclePrice * 0.58
    const adjustedCapCost = vehiclePrice - downPayment - tradeinValue
    const moneyFactor = mintLeaseRate / 2400 // Convert APR to money factor
    const depreciation = (adjustedCapCost - residualValue) / leaseTermMonths
    const financeCharge = (adjustedCapCost + residualValue) * moneyFactor
    const mintLeasePayment = depreciation + financeCharge
    
    const dealershipTotalFinance = costs.financePayment * financeTermMonths
    const mintLeaseTotalFinance = Math.round(mintFinancePayment) * financeTermMonths
    const dealershipTotalLease = costs.leasePayment * leaseTermMonths
    const mintLeaseTotalLease = Math.round(mintLeasePayment) * leaseTermMonths
    
    return {
      dealership: {
        financePayment: costs.financePayment,
        leasePayment: costs.leasePayment,
        totalFinance: dealershipTotalFinance,
        totalLease: dealershipTotalLease
      },
      mintLease: {
        financePayment: Math.round(mintFinancePayment),
        leasePayment: Math.round(mintLeasePayment),
        totalFinance: mintLeaseTotalFinance,
        totalLease: mintLeaseTotalLease
      },
      savings: {
        monthlyFinance: costs.financePayment - Math.round(mintFinancePayment),
        monthlyLease: costs.leasePayment - Math.round(mintLeasePayment),
        totalFinance: dealershipTotalFinance - mintLeaseTotalFinance,
        totalLease: dealershipTotalLease - mintLeaseTotalLease
      }
    }
  }

  const costs = calculateTotalCosts()
  const comparison = calculateDealershipVsMintLease()

  // Enhanced mouse interaction handlers - matching Hero component
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return
    
    const rect = containerRef.current.getBoundingClientRect()
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    const x = (e.clientX - rect.left - centerX) / centerX
    const y = (e.clientY - rect.top - centerY) / centerY
    
    mouseX.set(x * 100)
    mouseY.set(y * 100)
    
    // Adjust interactive intensity based on distance from center
    const distance = Math.sqrt(x * x + y * y)
    setInteractiveIntensity(Math.min(1 + distance * 0.5, 2))
  }, [mouseX, mouseY])

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false)
    mouseX.set(0)
    mouseY.set(0)
    setInteractiveIntensity(1)
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

  const formatPercentage = (amount: number) => {
    return `${amount.toFixed(1)}%`
  }

  const benefits = [
    {
      icon: <TrophyIcon className="w-7 h-7" />,
      title: "Expert Negotiation",
      description: "Our certified negotiators save you thousands",
      value: "11% Average Savings",
      stat: "$3,200+ Avg"
    },
    {
      icon: <ShieldCheckIcon className="w-7 h-7" />,
      title: "Zero Risk Guarantee",
      description: "100% refundable if we don't save you money",
      value: "Risk-Free Service",
      stat: "100% Guarantee"
    },
    {
      icon: <ArrowTrendingUpIcon className="w-7 h-7" />,
      title: "Market Intelligence",
      description: "Access to wholesale pricing and incentives",
      value: "Insider Access",
      stat: "Wholesale Prices"
    }
  ]

  const keyFeatures = [
    {
      title: "2,500+ Happy Customers",
      icon: <Users className="w-5 h-5" />
    },
    {
      title: "5-Star Average Rating",
      icon: <StarIcon className="w-5 h-5" />
    },
    {
      title: "No Hidden Fees",
      icon: <CheckCircleIcon className="w-5 h-5" />
    },
    {
      title: "Professional Service",
      icon: <Award className="w-5 h-5" />
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
      
      <main 
        ref={containerRef}
        className="pt-20 relative min-h-screen overflow-hidden"
        style={{ 
          backgroundColor: '#FEF7ED',
          overflowX: 'hidden',
          maxWidth: '100vw',
          position: 'relative'
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* 120fps Optimized Luxury Background - matching Hero */}
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
          />
          
          {/* Subtle accent glow - Optimized */}
          <motion.div 
            className="absolute top-0 right-0 w-[60%] h-[60%] bg-gradient-radial from-amber-50/25 to-transparent blur-3xl"
            style={{
              x: accentX,
              y: accentY,
              opacity: useTransform(
                useMotionValue(isHovering ? 1 : 0.7), 
                [0, 1], 
                [0.2, 0.3]
              ),
              willChange: 'transform, opacity',
              transform: 'translate3d(0,0,0)', // Force GPU layer
            }}
          />
          
          {/* Minimal ambient light - Simplified */}
          <motion.div 
            className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-gradient-radial from-orange-100/15 to-transparent blur-3xl"
            style={{
              x: useTransform(springMouseX, [-100, 100], [-3, 3]),
              y: useTransform(springMouseY, [-100, 100], [-5, 5]),
              willChange: 'transform',
              transform: 'translate3d(0,0,0)', // Force GPU layer
            }}
          />
        </div>
        
        {/* Page Header */}
        <section className="py-20 relative overflow-hidden z-10">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <motion.div
              className="text-center space-y-6"
              initial="initial"
              animate={controls}
              variants={animationVariants.luxuryStagger}
            >
              <motion.div
                variants={animationVariants.premiumSlideUp}
              >
                <PremiumBadge icon={CalculatorIcon}>
                  Vehicle Finance/Lease Calculator
                </PremiumBadge>
              </motion.div>
              
              <motion.h1 
                ref={titleRef}
                className="text-4xl lg:text-6xl font-bold tracking-tight leading-tight"
                style={{
                  background: 'linear-gradient(135deg, #000000 0%, #1f2937 50%, #059669 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
                variants={animationVariants.premiumSlideUp}
              >
                Finance vs 
                <span className="block bg-gradient-to-r from-emerald-600 to-orange-500 bg-clip-text text-transparent">
                  Lease Calculator
                </span>
              </motion.h1>
              
              <motion.p 
                ref={subtitleRef}
                className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto"
                variants={animationVariants.premiumSlideUp}
              >
                Compare financing and leasing options with our comprehensive calculator. 
                See exactly how much you can save choosing <span className="font-semibold" style={{ color: '#059669' }}>Mint Lease</span> over traditional dealerships.
              </motion.p>
              
              {/* Trust Indicators */}
              <motion.div
                className="flex flex-wrap justify-center items-center gap-6 mt-12"
                variants={animationVariants.premiumStagger}
              >
                {keyFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    variants={animationVariants.saasCardEntrance}
                    className="flex items-center gap-3 text-gray-600"
                  >
                    <div style={{ color: '#059669' }}>{feature.icon}</div>
                    <span className="font-medium text-base">{feature.title}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8 relative z-10">
          <motion.div 
            className="max-w-6xl mx-auto"
            initial="initial"
            animate={controls}
            variants={animationVariants.luxuryStagger}
          >
            
                         {/* Vehicle Input Section */}
             <motion.div
               ref={calculatorRef}
               variants={animationVariants.saasCardEntrance}
               className="mb-8"
             >
                             <div 
                 className="p-6 rounded-2xl shadow-lg border border-white/20 backdrop-blur-sm"
                 style={{ 
                   backgroundColor: '#FEFCFA',
                   boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)'
                 }}
               >
                 <div className="flex items-center space-x-3 mb-6">
                   <div className="p-2 rounded-lg" style={{ backgroundColor: '#059669' }}>
                     <CalculatorIcon className="w-5 h-5 text-white" />
                   </div>
                   <h2 className="text-xl font-bold text-neutral-800">
                     Vehicle Details
                   </h2>
                 </div>
 
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Vehicle Price */}
                  <div className="space-y-4">
                    <label className="block text-sm font-semibold text-neutral-700">
                      Vehicle Price
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-500 text-sm font-medium">$</span>
                      <input
                        type="number"
                        value={vehiclePrice}
                        onChange={(e) => setVehiclePrice(Number(e.target.value))}
                        className="w-full pl-10 pr-4 py-4 border-2 border-neutral-200 rounded-xl focus:outline-none focus:border-emerald-500 transition-all duration-200 text-base bg-white"
                      />
                    </div>
                    <input
                      type="range"
                      min="10000"
                      max="150000"
                      step="5000"
                      value={vehiclePrice}
                      onChange={(e) => setVehiclePrice(Number(e.target.value))}
                      className="w-full h-3 rounded-full appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, #059669 0%, #059669 ${((vehiclePrice - 10000) / (150000 - 10000)) * 100}%, #e2e8f0 ${((vehiclePrice - 10000) / (150000 - 10000)) * 100}%, #e2e8f0 100%)`
                      }}
                    />
                    <div className="flex justify-between text-xs text-neutral-500 font-medium">
                      <span>$10K</span>
                      <span>$150K</span>
                    </div>
                  </div>

                  {/* Down Payment */}
                  <div className="space-y-4">
                    <label className="block text-sm font-semibold text-neutral-700">
                      Down Payment
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-500 text-sm font-medium">$</span>
                      <input
                        type="number"
                        value={downPayment}
                        onChange={(e) => setDownPayment(Number(e.target.value))}
                        className="w-full pl-10 pr-4 py-4 border-2 border-neutral-200 rounded-xl focus:outline-none focus:border-emerald-500 transition-all duration-200 text-base bg-white"
                      />
                    </div>
                    <input
                      type="range"
                      min="0"
                      max={vehiclePrice * 0.5}
                      step="1000"
                      value={downPayment}
                      onChange={(e) => setDownPayment(Number(e.target.value))}
                      className="w-full h-3 rounded-full appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, #059669 0%, #059669 ${(downPayment / (vehiclePrice * 0.5)) * 100}%, #e2e8f0 ${(downPayment / (vehiclePrice * 0.5)) * 100}%, #e2e8f0 100%)`
                      }}
                    />
                    <div className="flex justify-between text-xs text-neutral-500 font-medium">
                      <span>$0</span>
                      <span>{formatCurrency(vehiclePrice * 0.5)}</span>
                    </div>
                  </div>

                  {/* Trade-in Value */}
                  <div className="space-y-4">
                    <label className="block text-sm font-semibold text-neutral-700">
                      Trade-in Value (Optional)
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-500 text-sm font-medium">$</span>
                      <input
                        type="number"
                        value={tradeinValue}
                        onChange={(e) => setTradeinValue(Number(e.target.value))}
                        className="w-full pl-10 pr-4 py-4 border-2 border-neutral-200 rounded-xl focus:outline-none focus:border-emerald-500 transition-all duration-200 text-base bg-white"
                      />
                    </div>
                  </div>

                  {/* Credit Score */}
                  <div className="space-y-4">
                    <label className="block text-sm font-semibold text-neutral-700">
                      Credit Score Range
                    </label>
                    <select
                      value={creditScore}
                      onChange={(e) => setCreditScore(e.target.value)}
                      className="w-full px-4 py-4 border-2 border-neutral-200 rounded-xl focus:outline-none focus:border-emerald-500 transition-all duration-200 text-base bg-white appearance-none"
                    >
                      {Object.entries(creditScoreRates).map(([key, rate]) => (
                        <option key={key} value={key}>
                          {rate.label} ({formatPercentage(rate.min)}-{formatPercentage(rate.max)} APR)
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Finance Term */}
                  <div className="space-y-4">
                    <label className="block text-sm font-semibold text-neutral-700">
                      Finance Term
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {[36, 48, 60, 72].map((term) => (
                        <button
                          key={term}
                          onClick={() => setFinanceTermMonths(term)}
                          className={`p-3 rounded-xl border-2 transition-all duration-200 text-sm font-semibold ${
                            financeTermMonths === term
                              ? 'border-emerald-500 text-white'
                              : 'border-neutral-200 bg-white text-neutral-600 hover:border-emerald-300'
                          }`}
                          style={financeTermMonths === term ? { backgroundColor: '#059669' } : {}}
                        >
                          {term} Mo
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Lease Term */}
                  <div className="space-y-4">
                    <label className="block text-sm font-semibold text-neutral-700">
                      Lease Term
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {[24, 36, 48].map((term) => (
                        <button
                          key={term}
                          onClick={() => setLeaseTermMonths(term)}
                          className={`p-3 rounded-xl border-2 transition-all duration-200 text-sm font-semibold ${
                            leaseTermMonths === term
                              ? 'border-emerald-500 text-white'
                              : 'border-neutral-200 bg-white text-neutral-600 hover:border-emerald-300'
                          }`}
                          style={leaseTermMonths === term ? { backgroundColor: '#059669' } : {}}
                        >
                          {term} Mo
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

                         {/* Finance vs Lease Comparison */}
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6, delay: 0.2 }}
               className="mb-8"
             >
                             <h2 className="text-2xl font-bold text-neutral-800 text-center mb-6">
                 Finance vs Lease Comparison
               </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Finance Option */}
                                 <div 
                   className="p-6 rounded-2xl shadow-lg border border-white/20 backdrop-blur-sm"
                   style={{ 
                     backgroundColor: '#FEFCFA',
                     boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)'
                   }}
                 >
                   <div className="flex items-center space-x-3 mb-4">
                     <div className="p-2 rounded-lg" style={{ backgroundColor: '#059669' }}>
                       <CurrencyDollarIcon className="w-5 h-5 text-white" />
                     </div>
                    <div>
                                             <h3 className="text-lg font-bold text-neutral-800">Finance Option</h3>
                       <p className="text-sm text-neutral-600">Own your vehicle</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                                         <div className="text-center p-4 rounded-xl" style={{ backgroundColor: '#059669' }}>
                       <div className="text-3xl font-bold text-white mb-1">
                         {formatCurrency(costs.financePayment)}
                       </div>
                       <div className="text-emerald-100 text-sm">Monthly Payment</div>
                     </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-white rounded-xl border border-neutral-200">
                        <div className="text-lg font-bold text-neutral-800 mb-1">
                          {formatCurrency(costs.totalInterestPaid)}
                        </div>
                        <div className="text-xs text-neutral-600">Total Interest</div>
                      </div>
                      <div className="text-center p-4 bg-white rounded-xl border border-neutral-200">
                        <div className="text-lg font-bold text-neutral-800 mb-1">
                          {formatCurrency(costs.totalFinanceCost)}
                        </div>
                        <div className="text-xs text-neutral-600">Total Cost</div>
                      </div>
                      <div className="text-center p-4 bg-white rounded-xl border border-neutral-200">
                        <div className="text-lg font-bold" style={{ color: '#059669' }} >
                          {formatCurrency(costs.equityAfterTerm)}
                        </div>
                        <div className="text-xs text-neutral-600">Vehicle Equity</div>
                      </div>
                      <div className="text-center p-4 bg-white rounded-xl border border-neutral-200">
                        <div className="text-lg font-bold" style={{ color: '#059669' }}>
                          {financeTermMonths}
                        </div>
                        <div className="text-xs text-neutral-600">Months</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-3 text-sm">
                        <CheckCircleIcon className="w-4 h-4" style={{ color: '#059669' }} />
                        <span>Build equity over time</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <CheckCircleIcon className="w-4 h-4" style={{ color: '#059669' }} />
                        <span>No mileage restrictions</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <CheckCircleIcon className="w-4 h-4" style={{ color: '#059669' }} />
                        <span>Full ownership benefits</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Lease Option */}
                                 <div 
                   className="p-6 rounded-2xl shadow-lg border border-white/20 backdrop-blur-sm"
                   style={{ 
                     backgroundColor: '#FEFCFA',
                     boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)'
                   }}
                 >
                   <div className="flex items-center space-x-3 mb-4">
                     <div className="p-2 rounded-lg" style={{ backgroundColor: '#EA580C' }}>
                       <ClockIcon className="w-5 h-5 text-white" />
                     </div>
                     <div>
                       <h3 className="text-lg font-bold text-neutral-800">Lease Option</h3>
                       <p className="text-sm text-neutral-600">Lower monthly payments</p>
                     </div>
                   </div>

                  <div className="space-y-6">
                                         <div className="text-center p-4 rounded-xl" style={{ backgroundColor: '#EA580C' }}>
                       <div className="text-3xl font-bold text-white mb-1">
                         {formatCurrency(costs.leasePayment)}
                       </div>
                       <div className="text-orange-100 text-sm">Monthly Payment</div>
                     </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-white rounded-xl border border-neutral-200">
                        <div className="text-lg font-bold text-neutral-800 mb-1">
                          {formatCurrency(costs.totalLeaseCost)}
                        </div>
                        <div className="text-xs text-neutral-600">Total Lease Cost</div>
                      </div>
                      <div className="text-center p-4 bg-white rounded-xl border border-neutral-200">
                        <div className="text-lg font-bold text-neutral-800 mb-1">
                          {mileageAllowance.toLocaleString()}
                        </div>
                        <div className="text-xs text-neutral-600">Miles/Year</div>
                      </div>
                      <div className="text-center p-4 bg-white rounded-xl border border-neutral-200">
                        <div className="text-lg font-bold" style={{ color: '#EA580C' }}>
                          Latest
                        </div>
                        <div className="text-xs text-neutral-600">Technology</div>
                      </div>
                      <div className="text-center p-4 bg-white rounded-xl border border-neutral-200">
                        <div className="text-lg font-bold" style={{ color: '#EA580C' }}>
                          {leaseTermMonths}
                        </div>
                        <div className="text-xs text-neutral-600">Months</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-3 text-sm">
                        <CheckCircleIcon className="w-4 h-4" style={{ color: '#EA580C' }} />
                        <span>Lower monthly payments</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <CheckCircleIcon className="w-4 h-4" style={{ color: '#EA580C' }} />
                        <span>Always under warranty</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <CheckCircleIcon className="w-4 h-4" style={{ color: '#EA580C' }} />
                        <span>Upgrade every few years</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

                         {/* Dealership vs Mint Lease Comparison */}
             <motion.div
               ref={comparisonRef}
               variants={animationVariants.luxuryFadeIn}
               className="mb-8"
             >
                               <div className="text-center mb-6">
                   <h2 className="text-2xl font-bold text-neutral-800 mb-3">
                     Dealership vs Mint Lease
                   </h2>
                   <p className="text-lg text-neutral-600">
                     See how much you save with our expert negotiation services
                   </p>
                 </div>

              {/* Savings Highlight */}
              <div className="text-center mb-8">
                <motion.div
                  className="inline-block p-8 rounded-3xl shadow-lg border border-white/20 backdrop-blur-sm"
                  style={{ 
                    backgroundColor: '#059669',
                    boxShadow: '0 8px 32px rgba(5, 150, 105, 0.2)'
                  }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                                     <div className="text-4xl font-bold text-white mb-2">
                     {formatCurrency(Math.max(comparison.savings.totalFinance, comparison.savings.totalLease))}
                   </div>
                   <div className="text-emerald-100 text-base">
                     Total Savings with Mint Lease
                   </div>
                   <div className="text-emerald-200 text-sm mt-1">
                     Average savings across finance and lease options
                   </div>
                </motion.div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Dealership Pricing */}
                <div 
                  className="p-8 rounded-3xl shadow-lg border border-neutral-300"
                  style={{ 
                    backgroundColor: '#F8F9FA',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06)'
                  }}
                >
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="p-3 rounded-xl bg-neutral-500">
                      <BuildingStorefrontIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-neutral-800">Traditional Dealership</h3>
                      <p className="text-sm text-neutral-600">Standard market rates</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-white rounded-xl border border-neutral-200">
                      <span className="font-medium text-neutral-700">Finance Payment</span>
                      <span className="font-bold text-neutral-800">
                        {formatCurrency(comparison.dealership.financePayment)}/mo
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-white rounded-xl border border-neutral-200">
                      <span className="font-medium text-neutral-700">Lease Payment</span>
                      <span className="font-bold text-neutral-800">
                        {formatCurrency(comparison.dealership.leasePayment)}/mo
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-white rounded-xl border border-neutral-200">
                      <span className="font-medium text-neutral-700">Total Finance Cost</span>
                      <span className="font-bold text-neutral-800">
                        {formatCurrency(comparison.dealership.totalFinance)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-white rounded-xl border border-neutral-200">
                      <span className="font-medium text-neutral-700">Total Lease Cost</span>
                      <span className="font-bold text-neutral-800">
                        {formatCurrency(comparison.dealership.totalLease)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Mint Lease Pricing */}
                <div 
                  className="p-8 rounded-3xl shadow-lg border border-emerald-200"
                  style={{ 
                    backgroundColor: '#FEFCFA',
                    boxShadow: '0 8px 32px rgba(5, 150, 105, 0.1)'
                  }}
                >
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="p-3 rounded-xl" style={{ backgroundColor: '#059669' }}>
                      <TrophyIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-neutral-800">Mint Lease</h3>
                      <p className="text-sm text-emerald-600">5% better rates guaranteed</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-white rounded-xl border border-emerald-200">
                      <span className="font-medium text-neutral-700">Finance Payment</span>
                      <div className="text-right">
                        <span className="font-bold" style={{ color: '#059669' }}>
                          {formatCurrency(comparison.mintLease.financePayment)}/mo
                        </span>
                        <div className="text-xs text-emerald-600">
                          Save {formatCurrency(comparison.savings.monthlyFinance)}/mo
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-white rounded-xl border border-emerald-200">
                      <span className="font-medium text-neutral-700">Lease Payment</span>
                      <div className="text-right">
                        <span className="font-bold" style={{ color: '#059669' }}>
                          {formatCurrency(comparison.mintLease.leasePayment)}/mo
                        </span>
                        <div className="text-xs text-emerald-600">
                          Save {formatCurrency(comparison.savings.monthlyLease)}/mo
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-white rounded-xl border border-emerald-200">
                      <span className="font-medium text-neutral-700">Total Finance Cost</span>
                      <div className="text-right">
                        <span className="font-bold" style={{ color: '#059669' }}>
                          {formatCurrency(comparison.mintLease.totalFinance)}
                        </span>
                        <div className="text-xs text-emerald-600">
                          Save {formatCurrency(comparison.savings.totalFinance)}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-white rounded-xl border border-emerald-200">
                      <span className="font-medium text-neutral-700">Total Lease Cost</span>
                      <div className="text-right">
                        <span className="font-bold" style={{ color: '#059669' }}>
                          {formatCurrency(comparison.mintLease.totalLease)}
                        </span>
                        <div className="text-xs text-emerald-600">
                          Save {formatCurrency(comparison.savings.totalLease)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

                         {/* Benefits Section */}
             <motion.div
               variants={animationVariants.premiumStagger}
               className="mb-8"
             >
                             <h2 className="text-2xl font-bold text-neutral-800 text-center mb-6">
                 Why Choose Mint Lease?
               </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    variants={animationVariants.saasCardEntrance}
                    className="p-6 rounded-2xl shadow-lg border border-white/20 backdrop-blur-sm text-center"
                    style={{ 
                      backgroundColor: '#FEFCFA',
                      boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)'
                    }}
                    whileHover={{ 
                      y: -4,
                      scale: 1.02,
                      transition: { type: "spring", stiffness: 300, damping: 25 }
                    }}
                  >
                     <div className="w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#059669' }}>
                       <div className="text-white">
                         {benefit.icon}
                       </div>
                     </div>
                     <h3 className="text-lg font-bold text-neutral-800 mb-2">
                       {benefit.title}
                     </h3>
                    <p className="text-neutral-600 mb-4">
                      {benefit.description}
                    </p>
                    <div className="inline-flex items-center px-4 py-2 rounded-full" style={{ backgroundColor: '#059669', color: 'white' }}>
                      <span className="text-sm font-semibold">{benefit.stat}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CTA Section */}
            <motion.div
              variants={animationVariants.luxuryFadeIn}
              className="text-center mb-12"
            >
                             <div 
                 className="p-8 rounded-2xl shadow-lg border border-white/20 backdrop-blur-sm"
                 style={{ 
                   backgroundColor: '#FEFCFA',
                   boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)'
                 }}
               >
                                 <h2 className="text-2xl font-bold text-neutral-800 mb-3">
                   Ready to Start Saving?
                 </h2>
                 <p className="text-lg text-neutral-600 mb-6">
                   Book a consultation and let our experts negotiate the best deal for you
                 </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <motion.button
                    className="px-8 py-4 rounded-xl text-white text-lg font-bold shadow-lg"
                    style={{ backgroundColor: '#059669' }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.location.href = '/booking'}
                  >
                    Book Consultation
                  </motion.button>
                  
                  <motion.button
                    className="px-8 py-4 border-2 border-neutral-300 text-neutral-700 text-lg font-bold rounded-xl bg-white hover:border-emerald-500 transition-colors duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.print()}
                  >
                    <div className="flex items-center gap-2">
                      <PrinterIcon className="w-5 h-5" />
                      Print Results
                    </div>
                  </motion.button>
                </div>
                
                <p className="mt-6 text-neutral-600 text-sm">
                  Potential savings: <span className="font-bold" style={{ color: '#059669' }}>
                    {formatCurrency(Math.max(comparison.savings.totalFinance, comparison.savings.totalLease))}
                  </span> • No risk guarantee • Professional service
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>
      
      <div style={{ backgroundColor: '#FEF7ED' }}>
        <Footer />
      </div>
    </>
  )
} 