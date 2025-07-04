'use client'

import React, { useState, useRef, useCallback, useReducer } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { PremiumBadge } from '@/components/ui/PremiumBadge'
import { motion, useInView, useMotionValue, useSpring, useReducedMotion, useTransform } from 'framer-motion'
import { ArrowRight, ArrowLeft, Award, CreditCard, CheckCircle, User, Users, Building, Phone, MapPin } from 'lucide-react'
import { animationVariants } from '@/lib/utils'

/**
 * Credit Application Page - Multi-step Premium Application
 * Features: Luxury design matching homepage exactly, warm cream theme, emerald-orange gradients
 */

// Form state reducer
type FormAction = 
  | { type: 'UPDATE_FIELD'; field: string; value: string }
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'RESET' }

interface FormState {
  currentStep: number
  data: {
    // Personal Information
    firstName: string
    lastName: string
    dateOfBirth: string
    ssn: string
    phone: string
    email: string
    maritalStatus: string
    dependents: string
    creditScore: string
    
    // Address Information
    address: string
    city: string
    state: string
    zipCode: string
    residenceType: string
    monthsAtAddress: string
    monthlyRent: string
    
    // Employment Information
    employmentStatus: string
    employer: string
    jobTitle: string
    monthlyIncome: string
    yearsEmployed: string
    employerPhone: string
    
    // Employer Address
    employerAddress: string
    employerCity: string
    employerState: string
    employerZip: string
    
    // Previous Employment (if applicable)
    previousEmployer: string
    previousJobTitle: string
    previousEmploymentYears: string
    
    // Co-Applicant Information
    hasCoApplicant: string
    coApplicantFirstName: string
    coApplicantLastName: string
    coApplicantSSN: string
    coApplicantDOB: string
    coApplicantPhone: string
  }
}

const initialState: FormState = {
  currentStep: 1,
  data: {
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    ssn: '',
    phone: '',
    email: '',
    maritalStatus: '',
    dependents: '',
    creditScore: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    residenceType: '',
    monthsAtAddress: '',
    monthlyRent: '',
    employmentStatus: '',
    employer: '',
    jobTitle: '',
    monthlyIncome: '',
    yearsEmployed: '',
    employerPhone: '',
    employerAddress: '',
    employerCity: '',
    employerState: '',
    employerZip: '',
    previousEmployer: '',
    previousJobTitle: '',
    previousEmploymentYears: '',
    hasCoApplicant: '',
    coApplicantFirstName: '',
    coApplicantLastName: '',
    coApplicantSSN: '',
    coApplicantDOB: '',
    coApplicantPhone: ''
  }
}

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return {
        ...state,
        data: {
          ...state.data,
          [action.field]: action.value
        }
      }
    case 'NEXT_STEP':
      return {
        ...state,
        currentStep: Math.min(state.currentStep + 1, 4)
      }
    case 'PREV_STEP':
      return {
        ...state,
        currentStep: Math.max(state.currentStep - 1, 1)
      }
    case 'RESET':
      return initialState
    default:
      return state
  }
}

export default function CreditApplicationPage() {
  const containerRef = useRef<HTMLElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.1 }) // Changed to trigger more easily
  const shouldReduceMotion = useReducedMotion()

  const [formState, dispatch] = useReducer(formReducer, initialState)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

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
  const bottomLayerX = useTransform(springMouseX, [-100, 100], [-3, 3])
  const bottomLayerY = useTransform(springMouseY, [-100, 100], [-5, 5])

  // Client-side mounting detection
  React.useEffect(() => {
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

  const updateField = (field: string, value: string) => {
    dispatch({ type: 'UPDATE_FIELD', field, value })
  }

  const nextStep = () => {
    // Prevent moving to next step if on Step 1 and credit score is below 700
    if (formState.currentStep === 1) {
      const isBelowMinimum = formState.data.creditScore === 'Fair' || formState.data.creditScore === 'Poor'
      if (isBelowMinimum) {
        return // Do nothing if credit score is below minimum
      }
    }
    
    dispatch({ type: 'NEXT_STEP' })
  }

  const prevStep = () => {
    dispatch({ type: 'PREV_STEP' })
  }

  // Helper function to check if credit score is below minimum
  const isCreditScoreBelowMinimum = () => {
    return formState.data.creditScore === 'Fair' || formState.data.creditScore === 'Poor'
  }

  const handleSubmit = async () => {
    // Prevent submission if credit score is below 700
    const isBelowMinimum = formState.data.creditScore === 'Fair' || formState.data.creditScore === 'Poor'
    if (isBelowMinimum) {
      return // Do nothing if credit score is below minimum
    }

    // Validate required fields before submission
    if (!formState.data.firstName || !formState.data.lastName || !formState.data.email) {
      alert('Please fill in all required fields (First Name, Last Name, Email)')
      return
    }

    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/submit-credit-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState.data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Failed to submit application')
      }

      // Track successful credit application submission with valid data
      if (typeof window !== 'undefined') {
        // Facebook Pixel tracking
        if ((window as any).fbq) {
          (window as any).fbq('track', 'Lead', {
            content_name: 'Credit Application',
            value: 0,
            currency: 'USD'
          })
        }
        
        // Signals Gateway tracking with validated data
        if ((window as any).cbq) {
          (window as any).cbq('track', 'Lead', {
            email: formState.data.email,
            first_name: formState.data.firstName,
            last_name: formState.data.lastName,
            phone: formState.data.phone,
            content_name: 'Credit Application'
          })
        }
      }

      console.log('Credit application submitted successfully:', result)
      setShowSuccess(true)
    } catch (error) {
      console.error('Credit application error:', error)
      // You might want to show an error message to the user here
      alert('Failed to submit application. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Step configuration with homepage colors
  const steps = [
    {
      id: 1,
      title: "Personal Info",
      icon: <User className="w-5 h-5" />,
      color: "text-emerald-600",
      bgColor: "bg-emerald-600"
    },
    {
      id: 2,
      title: "Address & Residence",
      icon: <MapPin className="w-5 h-5" />,
      color: "text-amber-600",
      bgColor: "bg-amber-600"
    },
    {
      id: 3,
      title: "Employment",
      icon: <Building className="w-5 h-5" />,
      color: "text-orange-500",
      bgColor: "bg-orange-500"
    },
    {
      id: 4,
      title: "Co-Applicant",
      icon: <Users className="w-5 h-5" />,
      color: "text-emerald-600",
      bgColor: "bg-emerald-600"
    }
  ]

  if (showSuccess) {
    return (
      <>
        <Header />
        <main 
          className="min-h-screen flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: '#FEF7ED' }}
          suppressHydrationWarning
        >
          {/* Homepage-style background */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-orange-50/30 via-amber-50/20 to-emerald-50/10"
              style={isMounted ? {
                x: backgroundX,
                y: backgroundY,
                willChange: 'transform',
              } : {}}
            />
            <motion.div 
              className="absolute top-0 right-0 w-[60%] h-[60%] bg-gradient-radial from-amber-50/25 to-transparent blur-3xl"
              style={isMounted ? {
                x: accentX,
                y: accentY,
                willChange: 'transform',
              } : {}}
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
              Application Submitted!
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-lg text-neutral-600 mb-8"
            >
              Thank you for choosing Mint Lease. Your credit application has been successfully submitted.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
            >
              <div className="bg-emerald-50 rounded-[16px] p-6 border border-emerald-100">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <Award className="w-5 h-5 text-emerald-600" />
                  <span className="font-semibold text-neutral-900">Pre-approval</span>
                </div>
                <p className="text-neutral-600 text-sm">
                  Decision within <strong className="text-emerald-600">24 hours</strong>
                </p>
              </div>
              
              <div className="bg-amber-50 rounded-[16px] p-6 border border-amber-100">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <Phone className="w-5 h-5 text-amber-600" />
                  <span className="font-semibold text-neutral-900">Next Steps</span>
                </div>
                <p className="text-neutral-600 text-sm">
                  Our specialist will <strong className="text-amber-600">call you</strong>
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
        className="pt-20 relative min-h-screen overflow-hidden"
        style={{ backgroundColor: '#FEF7ED' }}
        onMouseMove={handleMouseMove}
        suppressHydrationWarning
      >
        {/* Homepage-style background with mouse tracking */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-orange-50/30 via-amber-50/20 to-emerald-50/10"
            style={isMounted ? {
              x: backgroundX,
              y: backgroundY,
              willChange: 'transform',
            } : {}}
          />
          <motion.div 
            className="absolute top-0 right-0 w-[60%] h-[60%] bg-gradient-radial from-amber-50/25 to-transparent blur-3xl"
            style={isMounted ? {
              x: accentX,
              y: accentY,
              willChange: 'transform',
            } : {}}
          />
          <motion.div 
            className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-gradient-radial from-orange-100/15 to-transparent blur-3xl"
            style={isMounted ? {
              x: bottomLayerX,
              y: bottomLayerY,
              willChange: 'transform',
            } : {}}
          />
        </div>

        {/* Page Header */}
        <section className="py-20 relative overflow-hidden z-10">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="text-center space-y-6" suppressHydrationWarning>
              {isMounted ? (
                <motion.div
                  className="text-center space-y-6"
                  initial="initial"
                  animate={isInView ? "visible" : "initial"}
                  variants={animationVariants.luxuryStagger}
                >
                  <motion.div
                    variants={animationVariants.premiumSlideUp}
                  >
                    <PremiumBadge icon={CreditCard}>
                      Credit Application
                    </PremiumBadge>
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
                  Credit
                  <span className="block" style={{
                    background: 'linear-gradient(135deg, #059669 0%, #10b981 30%, #f97316 70%, #ea580c 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>
                    Application
                  </span>
                </motion.h1>
                
                  <motion.p 
                    variants={animationVariants.premiumSlideUp}
                    className="text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed"
                  >
                    Secure your luxury vehicle financing with our streamlined credit application process.
                  </motion.p>
                </motion.div>
              ) : (
                <>
                  <div>
                    <PremiumBadge icon={CreditCard}>
                      Credit Application
                    </PremiumBadge>
                  </div>
                
                <h1 
                  className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-6"
                  style={{
                    background: 'linear-gradient(135deg, #000000 0%, #1f2937 50%, #059669 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Credit
                  <span className="block" style={{
                    background: 'linear-gradient(135deg, #059669 0%, #10b981 30%, #f97316 70%, #ea580c 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>
                    Application
                  </span>
                </h1>
                
                  <p className="text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed">
                    Secure your luxury vehicle financing with our streamlined credit application process.
                  </p>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="pb-20 relative z-10">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            {/* Progress Steps */}
            <div className="mb-12" suppressHydrationWarning>
              {isMounted ? (
                <motion.div
                  initial="initial"
                  animate={isInView ? "visible" : "initial"}
                  variants={animationVariants.luxuryStagger}
                  className="mb-12"
                >
                <div className="flex items-center justify-center max-w-full mx-auto px-4 overflow-x-auto">
                  <div className="flex items-center min-w-max">
                    {steps.map((step, index) => (
                      <div key={step.id} className="flex items-center">
                        <motion.div
                          className={`w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 flex-shrink-0
                                     ${formState.currentStep >= step.id 
                                       ? `${step.bgColor} border-transparent text-white shadow-[0_4px_12px_-2px_rgba(5,150,105,0.3)]` 
                                       : 'bg-white border-neutral-300 text-neutral-400'}`}
                          whileHover={{ scale: 1.05 }}
                        >
                          <span className="text-sm sm:text-sm md:text-base">{step.icon}</span>
                        </motion.div>
                        
                        {index < steps.length - 1 && (
                          <div className={`w-10 sm:w-12 md:w-16 h-1 mx-1.5 sm:mx-2 rounded-full transition-all duration-300 flex-shrink-0
                                         ${formState.currentStep > step.id ? 'bg-emerald-600' : 'bg-neutral-200'}`} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="text-center mt-4 sm:mt-6 px-4">
                  <h3 className="text-lg sm:text-xl font-bold text-neutral-900">
                    {steps[formState.currentStep - 1]?.title}
                  </h3>
                  <p className="text-sm sm:text-base text-neutral-600 mt-1">
                    Step {formState.currentStep} of {steps.length}
                  </p>
                </div>
              </motion.div>
              ) : (
                <>
                <div className="flex items-center justify-center max-w-full mx-auto px-4 overflow-x-auto">
                  <div className="flex items-center min-w-max">
                    {steps.map((step, index) => (
                      <div key={step.id} className="flex items-center">
                        <div
                          className={`w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 flex-shrink-0
                                     ${formState.currentStep >= step.id 
                                       ? `${step.bgColor} border-transparent text-white shadow-[0_4px_12px_-2px_rgba(5,150,105,0.3)]` 
                                       : 'bg-white border-neutral-300 text-neutral-400'}`}
                        >
                          <span className="text-sm sm:text-sm md:text-base">{step.icon}</span>
                        </div>
                        
                        {index < steps.length - 1 && (
                          <div className={`w-10 sm:w-12 md:w-16 h-1 mx-1.5 sm:mx-2 rounded-full transition-all duration-300 flex-shrink-0
                                         ${formState.currentStep > step.id ? 'bg-emerald-600' : 'bg-neutral-200'}`} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="text-center mt-4 sm:mt-6 px-4">
                  <h3 className="text-lg sm:text-xl font-bold text-neutral-900">
                    {steps[formState.currentStep - 1]?.title}
                  </h3>
                  <p className="text-sm sm:text-base text-neutral-600 mt-1">
                    Step {formState.currentStep} of {steps.length}
                  </p>
                </div>
                </>
              )}
            </div>

          {/* Form Content */}
          <motion.div
            variants={animationVariants.premiumSlideUp}
            className="bg-[#FEFCFA] rounded-[20px] p-4 sm:p-6 md:p-8 border border-white/40
                       shadow-[0_8px_32px_rgba(139,69,19,0.12),0_16px_64px_rgba(139,69,19,0.06)]"
            suppressHydrationWarning
          >
            <div>
            {/* Step 1: Personal Information */}
            {formState.currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
                suppressHydrationWarning
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-neutral-700 text-sm font-medium mb-2">First Name</label>
                    <input 
                      type="text" 
                      name="firstName"
                      value={formState.data.firstName}
                      onChange={(e) => updateField('firstName', e.target.value)}
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
                      name="lastName"
                      value={formState.data.lastName}
                      onChange={(e) => updateField('lastName', e.target.value)}
                      className="w-full px-4 py-3 rounded-[12px] bg-white border border-neutral-200
                               text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-500
                               focus:border-emerald-500 transition-all duration-300"
                      placeholder="Enter last name"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-neutral-700 text-sm font-medium mb-2">Date of Birth</label>
                    <input
                      type="date"
                      value={formState.data.dateOfBirth}
                      onChange={(e) => updateField('dateOfBirth', e.target.value)}
                      className="w-full px-4 py-3 rounded-[12px] bg-white border border-neutral-200
                               text-neutral-900 focus:outline-none focus:ring-2 focus:ring-emerald-500
                               focus:border-emerald-500 transition-all duration-300"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-700 text-sm font-medium mb-2">Social Security Number</label>
                    <input
                      type="text"
                      value={formState.data.ssn}
                      onChange={(e) => updateField('ssn', e.target.value)}
                      className="w-full px-4 py-3 rounded-[12px] bg-white border border-neutral-200
                               text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-500
                               focus:border-emerald-500 transition-all duration-300"
                      placeholder="XXX-XX-XXXX"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-neutral-700 text-sm font-medium mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formState.data.phone}
                      onChange={(e) => updateField('phone', e.target.value)}
                      className="w-full px-4 py-3 rounded-[12px] bg-white border border-neutral-200
                               text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-500
                               focus:border-emerald-500 transition-all duration-300"
                      placeholder="(555) 123-4567"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-700 text-sm font-medium mb-2">Email Address</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formState.data.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      className="w-full px-4 py-3 rounded-[12px] bg-white border border-neutral-200
                               text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-500
                               focus:border-emerald-500 transition-all duration-300"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-neutral-700 text-sm font-medium mb-2">Marital Status</label>
                    <select
                      value={formState.data.maritalStatus}
                      onChange={(e) => updateField('maritalStatus', e.target.value)}
                      className="w-full px-4 py-3 rounded-[12px] bg-white border border-neutral-200
                               text-neutral-900 focus:outline-none focus:ring-2 focus:ring-emerald-500
                               focus:border-emerald-500 transition-all duration-300"
                      required
                    >
                      <option value="">Select Status</option>
                      <option value="single">Single</option>
                      <option value="married">Married</option>
                      <option value="divorced">Divorced</option>
                      <option value="widowed">Widowed</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-neutral-700 text-sm font-medium mb-2">Number of Dependents</label>
                    <select
                      value={formState.data.dependents}
                      onChange={(e) => updateField('dependents', e.target.value)}
                      className="w-full px-4 py-3 rounded-[12px] bg-white border border-neutral-200
                               text-neutral-900 focus:outline-none focus:ring-2 focus:ring-emerald-500
                               focus:border-emerald-500 transition-all duration-300"
                      required
                    >
                      <option value="">Select Number</option>
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4+">4+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-neutral-700 text-sm font-medium mb-2">Credit Score Range *</label>
                  <select
                    value={formState.data.creditScore}
                    onChange={(e) => updateField('creditScore', e.target.value)}
                    className="w-full px-4 py-3 rounded-[12px] bg-white border border-neutral-200
                             text-neutral-900 focus:outline-none focus:ring-2 focus:ring-emerald-500
                             focus:border-emerald-500 transition-all duration-300"
                    required
                  >
                    <option value="">Select Credit Score Range</option>
                    <option value="Excellent">Excellent (750+)</option>
                    <option value="Good">Good (700-749)</option>
                    <option value="Fair">Fair (650-699)</option>
                    <option value="Poor">Poor (Below 650)</option>
                  </select>
                  
                  {/* Credit Score Warning Message - Below the dropdown */}
                  {isCreditScoreBelowMinimum() && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-3 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-3"
                    >
                      <p className="leading-relaxed">
                        We appreciate your interest in Mint Lease. At this time, we work with clients who have a credit score of 700 or above to ensure the best financing options and rates. We encourage you to work on improving your credit score and apply again in the future.
                      </p>
                      <p className="mt-2 font-medium">
                        Thank you for understanding, and we wish you the best on your credit journey.
                      </p>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Step 2: Address */}
            {formState.currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
                suppressHydrationWarning
              >
                <div>
                  <label className="block text-neutral-700 text-sm font-medium mb-2">Street Address</label>
                  <input
                    type="text"
                    value={formState.data.address}
                    onChange={(e) => updateField('address', e.target.value)}
                    className="w-full px-4 py-3 rounded-[12px] bg-white border border-neutral-200
                             text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-500
                             focus:border-emerald-500 transition-all duration-300"
                    placeholder="123 Main Street"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-neutral-700 text-sm font-medium mb-2">City</label>
                    <input
                      type="text"
                      value={formState.data.city}
                      onChange={(e) => updateField('city', e.target.value)}
                      className="w-full px-4 py-3 rounded-[12px] bg-white border border-neutral-200
                               text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-500
                               focus:border-emerald-500 transition-all duration-300"
                      placeholder="City"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-700 text-sm font-medium mb-2">State</label>
                    <select
                      value={formState.data.state}
                      onChange={(e) => updateField('state', e.target.value)}
                      className="w-full px-4 py-3 rounded-[12px] bg-white border border-neutral-200
                               text-neutral-900 focus:outline-none focus:ring-2 focus:ring-emerald-500
                               focus:border-emerald-500 transition-all duration-300"
                      required
                    >
                      <option value="">Select State</option>
                      <option value="CA">California</option>
                      <option value="NY">New York</option>
                      <option value="TX">Texas</option>
                      <option value="FL">Florida</option>
                      {/* Add more states as needed */}
                    </select>
                  </div>
                  <div>
                    <label className="block text-neutral-700 text-sm font-medium mb-2">ZIP Code</label>
                    <input
                      type="text"
                      value={formState.data.zipCode}
                      onChange={(e) => updateField('zipCode', e.target.value)}
                      className="w-full px-4 py-3 rounded-[12px] bg-white border border-neutral-200
                               text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-500
                               focus:border-emerald-500 transition-all duration-300"
                      placeholder="12345"
                      required
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Employment */}
            {formState.currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
                suppressHydrationWarning
              >
                <div>
                  <label className="block text-neutral-700 text-sm font-medium mb-2">Employment Status</label>
                  <select
                    value={formState.data.employmentStatus}
                    onChange={(e) => updateField('employmentStatus', e.target.value)}
                    className="w-full px-4 py-3 rounded-[12px] bg-white border border-neutral-200
                             text-neutral-900 focus:outline-none focus:ring-2 focus:ring-emerald-500
                             focus:border-emerald-500 transition-all duration-300"
                    required
                  >
                    <option value="">Select Status</option>
                    <option value="employed">Employed</option>
                    <option value="self-employed">Self-Employed</option>
                    <option value="retired">Retired</option>
                    <option value="unemployed">Unemployed</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-neutral-700 text-sm font-medium mb-2">Employer Name</label>
                    <input 
                      type="text"
                      value={formState.data.employer}
                      onChange={(e) => updateField('employer', e.target.value)}
                      className="w-full px-4 py-3 rounded-[12px] bg-white border border-neutral-200
                               text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-500
                               focus:border-emerald-500 transition-all duration-300"
                      placeholder="Company Name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-700 text-sm font-medium mb-2">Job Title</label>
                    <input
                      type="text"
                      value={formState.data.jobTitle}
                      onChange={(e) => updateField('jobTitle', e.target.value)}
                      className="w-full px-4 py-3 rounded-[12px] bg-white border border-neutral-200
                               text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-500
                               focus:border-emerald-500 transition-all duration-300"
                      placeholder="Your Position"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-neutral-700 text-sm font-medium mb-2">Monthly Income</label>
                    <input
                      type="number"
                      value={formState.data.monthlyIncome}
                      onChange={(e) => updateField('monthlyIncome', e.target.value)}
                      className="w-full px-4 py-3 rounded-[12px] bg-white border border-neutral-200
                               text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-500
                               focus:border-emerald-500 transition-all duration-300"
                      placeholder="5000"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-700 text-sm font-medium mb-2">Years Employed</label>
                    <input
                      type="number"
                      value={formState.data.yearsEmployed}
                      onChange={(e) => updateField('yearsEmployed', e.target.value)}
                      className="w-full px-4 py-3 rounded-[12px] bg-white border border-neutral-200
                               text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-500
                               focus:border-emerald-500 transition-all duration-300"
                      placeholder="2"
                      required
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Co-Applicant Information */}
            {formState.currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
                suppressHydrationWarning
              >
                <div>
                  <label className="block text-neutral-700 text-sm font-medium mb-2">Do you have a Co-Applicant?</label>
                  <select
                    value={formState.data.hasCoApplicant}
                    onChange={(e) => updateField('hasCoApplicant', e.target.value)}
                    className="w-full px-4 py-3 rounded-[12px] bg-white border border-neutral-200
                             text-neutral-900 focus:outline-none focus:ring-2 focus:ring-emerald-500
                             focus:border-emerald-500 transition-all duration-300"
                  >
                    <option value="">Select Option</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
                
                {formState.data.hasCoApplicant === 'yes' && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-neutral-700 text-sm font-medium mb-2">Co-Applicant First Name</label>
                        <input
                          type="text"
                          value={formState.data.coApplicantFirstName}
                          onChange={(e) => updateField('coApplicantFirstName', e.target.value)}
                          className="w-full px-4 py-3 rounded-[12px] bg-white border border-neutral-200
                                   text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-500
                                   focus:border-emerald-500 transition-all duration-300"
                          placeholder="First Name"
                        />
                      </div>
                      <div>
                        <label className="block text-neutral-700 text-sm font-medium mb-2">Co-Applicant Last Name</label>
                        <input
                          type="text"
                          value={formState.data.coApplicantLastName}
                          onChange={(e) => updateField('coApplicantLastName', e.target.value)}
                          className="w-full px-4 py-3 rounded-[12px] bg-white border border-neutral-200
                                   text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-500
                                   focus:border-emerald-500 transition-all duration-300"
                          placeholder="Last Name"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-neutral-700 text-sm font-medium mb-2">Co-Applicant SSN</label>
                        <input
                          type="text"
                          value={formState.data.coApplicantSSN}
                          onChange={(e) => updateField('coApplicantSSN', e.target.value)}
                          className="w-full px-4 py-3 rounded-[12px] bg-white border border-neutral-200
                                   text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-500
                                   focus:border-emerald-500 transition-all duration-300"
                          placeholder="XXX-XX-XXXX"
                        />
                      </div>
                      <div>
                        <label className="block text-neutral-700 text-sm font-medium mb-2">Co-Applicant Phone</label>
                        <input
                          type="tel"
                          value={formState.data.coApplicantPhone}
                          onChange={(e) => updateField('coApplicantPhone', e.target.value)}
                          className="w-full px-4 py-3 rounded-[12px] bg-white border border-neutral-200
                                   text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-500
                                   focus:border-emerald-500 transition-all duration-300"
                          placeholder="(555) 123-4567"
                        />
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            )}



            {/* Navigation Buttons */}
            </div>
            <div className="flex justify-between pt-8 mt-8 border-t border-neutral-200">
              <motion.button
                onClick={prevStep}
                disabled={formState.currentStep === 1}
                whileHover={{ scale: formState.currentStep === 1 ? 1 : 1.02, y: formState.currentStep === 1 ? 0 : -2 }}
                whileTap={{ scale: formState.currentStep === 1 ? 1 : 0.98 }}
                className="flex items-center px-6 py-3 text-neutral-600 bg-white border border-neutral-300 rounded-full
                         hover:bg-neutral-50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                suppressHydrationWarning
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </motion.button>

              {formState.currentStep < 4 ? (
                <motion.button
                  onClick={nextStep}
                  disabled={isCreditScoreBelowMinimum()}
                  whileHover={!isCreditScoreBelowMinimum() ? { 
                    scale: shouldReduceMotion ? 1 : 1.02, 
                    y: shouldReduceMotion ? 0 : -3 
                  } : {}}
                  whileTap={!isCreditScoreBelowMinimum() ? { 
                    scale: shouldReduceMotion ? 1 : 0.98,
                    y: 0
                  } : {}}
                  transition={{ 
                    type: "spring",
                    stiffness: 400,
                    damping: 25,
                    mass: 0.1
                  }}
                  className={`flex items-center border-0 rounded-full px-8 py-3 font-medium 
                           transition-all duration-300 group ${
                             isCreditScoreBelowMinimum() 
                               ? 'bg-neutral-300 text-neutral-500 cursor-not-allowed' 
                               : 'bg-emerald-600 text-white'
                           }`}
                  suppressHydrationWarning
                  style={{
                    background: isCreditScoreBelowMinimum() 
                      ? '#d1d5db' 
                      : 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                    boxShadow: isCreditScoreBelowMinimum() 
                      ? 'none' 
                      : '0 8px 20px -4px rgba(5, 150, 105, 0.3)',
                  }}
                  onMouseEnter={(e) => {
                    if (!isCreditScoreBelowMinimum()) {
                      e.currentTarget.style.background = 'linear-gradient(135deg, #059669 0%, #10b981 30%, #f97316 70%, #ea580c 100%)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isCreditScoreBelowMinimum()) {
                      e.currentTarget.style.background = 'linear-gradient(135deg, #059669 0%, #047857 100%)'
                    }
                  }}
                >
                  Next Step
                  <ArrowRight className={`ml-2 h-4 w-4 transition-transform duration-200 ${
                    !isCreditScoreBelowMinimum() ? 'group-hover:translate-x-1' : ''
                  }`} />
                </motion.button>
              ) : (
                <motion.button
                  onClick={handleSubmit}
                  disabled={isSubmitting || isCreditScoreBelowMinimum()}
                  whileHover={!isSubmitting && !isCreditScoreBelowMinimum() ? { 
                    scale: shouldReduceMotion ? 1 : 1.02, 
                    y: shouldReduceMotion ? 0 : -3 
                  } : {}}
                  whileTap={!isSubmitting && !isCreditScoreBelowMinimum() ? { 
                    scale: shouldReduceMotion ? 1 : 0.98,
                    y: 0
                  } : {}}
                  transition={{ 
                    type: "spring",
                    stiffness: 400,
                    damping: 25,
                    mass: 0.1
                  }}
                  className={`flex items-center border-0 rounded-full px-8 py-3 font-medium 
                           transition-all duration-300 group ${
                             isSubmitting || isCreditScoreBelowMinimum()
                               ? 'bg-neutral-300 text-neutral-500 cursor-not-allowed' 
                               : 'bg-emerald-600 text-white'
                           }`}
                  suppressHydrationWarning
                  style={{
                    background: (isSubmitting || isCreditScoreBelowMinimum()) 
                      ? '#d1d5db' 
                      : 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                    boxShadow: (isSubmitting || isCreditScoreBelowMinimum()) 
                      ? 'none' 
                      : '0 8px 20px -4px rgba(5, 150, 105, 0.3)',
                  }}
                  onMouseEnter={(e) => {
                    if (!isSubmitting && !isCreditScoreBelowMinimum()) {
                      e.currentTarget.style.background = 'linear-gradient(135deg, #059669 0%, #10b981 30%, #f97316 70%, #ea580c 100%)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSubmitting && !isCreditScoreBelowMinimum()) {
                      e.currentTarget.style.background = 'linear-gradient(135deg, #059669 0%, #047857 100%)'
                    }
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Application
                      <CheckCircle className="ml-2 h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                    </>
                  )}
                </motion.button>
              )}
            </div>
          </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  )
} 