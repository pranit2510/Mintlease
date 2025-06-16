'use client'

import React, { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { 
  CurrencyDollarIcon, 
  CalculatorIcon, 
  ChartBarIcon,
  CheckCircleIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline'
import { Header } from '@/components/layout/Header'

// Calculator card data
const calculatorCards = [
  {
    id: 'lease',
    title: 'Lease Calculator',
    description: 'Calculate monthly lease payments with down payment options',
    icon: <CalculatorIcon className="w-7 h-7" />,
    bgColor: '#10B981', // emerald-500
    features: ['Monthly Payment', 'Down Payment', 'Lease Terms', 'Residual Value']
  },
  {
    id: 'finance',
    title: 'Finance Calculator', 
    description: 'Determine loan payments and total interest costs',
    icon: <CurrencyDollarIcon className="w-7 h-7" />,
    bgColor: '#F59E0B', // amber-500
    features: ['Loan Amount', 'Interest Rate', 'Term Length', 'Monthly Payment']
  },
  {
    id: 'comparison',
    title: 'Lease vs Buy',
    description: 'Compare total costs of leasing versus purchasing',
    icon: <ChartBarIcon className="w-7 h-7" />,
    bgColor: '#EF4444', // red-500
    features: ['Cost Analysis', 'Equity Building', 'Flexibility', 'Total Ownership']
  }
]

// Trust indicators matching leads page
const trustIndicators = [
  "2500+ Happy Customers",
  "5 star Average rating", 
  "No Hidden Fees",
  "Professional Service"
]

// Lease Calculator Component
const LeaseCalculator = () => {
  const [vehiclePrice, setVehiclePrice] = useState('')
  const [downPayment, setDownPayment] = useState('')
  const [leaseTerm, setLeaseTerm] = useState('36')
  const [residualValue, setResidualValue] = useState('60')
  const [interestRate, setInterestRate] = useState('3.5')
  const [result, setResult] = useState<any>(null)

  const calculateLease = () => {
    const price = parseFloat(vehiclePrice)
    const down = parseFloat(downPayment) || 0
    const term = parseInt(leaseTerm)
    const residual = parseFloat(residualValue) / 100
    const rate = parseFloat(interestRate) / 100 / 12

    if (!price || price <= 0) return

    const residualAmount = price * residual
    const depreciationAmount = price - residualAmount - down
    const monthlyDepreciation = depreciationAmount / term
    const monthlyFinanceCharge = (price + residualAmount) * rate
    const monthlyPayment = monthlyDepreciation + monthlyFinanceCharge

    const totalPayments = monthlyPayment * term
    const totalCost = totalPayments + down

    setResult({
      monthlyPayment: monthlyPayment.toFixed(2),
      totalPayments: totalPayments.toFixed(2),
      totalCost: totalCost.toFixed(2),
      residualAmount: residualAmount.toFixed(2)
    })
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Vehicle Price ($)
          </label>
          <input
            type="number"
            value={vehiclePrice}
            onChange={(e) => setVehiclePrice(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            placeholder="35000"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Down Payment ($)
          </label>
          <input
            type="number"
            value={downPayment}
            onChange={(e) => setDownPayment(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            placeholder="3000"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Lease Term (months)
          </label>
          <select
            value={leaseTerm}
            onChange={(e) => setLeaseTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option value="24">24 months</option>
            <option value="36">36 months</option>
            <option value="48">48 months</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Residual Value (%)
          </label>
          <input
            type="number"
            value={residualValue}
            onChange={(e) => setResidualValue(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            placeholder="60"
          />
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Interest Rate (%)
          </label>
          <input
            type="number"
            step="0.1"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            placeholder="3.5"
          />
        </div>
      </div>

      <button
        onClick={calculateLease}
        className="w-full bg-emerald-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
      >
        Calculate Lease Payment
      </button>

      {result && (
        <div className="bg-emerald-50 p-6 rounded-lg border border-emerald-200">
          <h3 className="text-lg font-semibold text-emerald-800 mb-4">Lease Calculation Results</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-emerald-600">Monthly Payment</p>
              <p className="text-2xl font-bold text-emerald-800">${result.monthlyPayment}</p>
            </div>
            <div>
              <p className="text-sm text-emerald-600">Total Payments</p>
              <p className="text-xl font-semibold text-emerald-800">${result.totalPayments}</p>
            </div>
            <div>
              <p className="text-sm text-emerald-600">Total Cost</p>
              <p className="text-xl font-semibold text-emerald-800">${result.totalCost}</p>
            </div>
            <div>
              <p className="text-sm text-emerald-600">Residual Value</p>
              <p className="text-xl font-semibold text-emerald-800">${result.residualAmount}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Finance Calculator Component
const FinanceCalculator = () => {
  const [loanAmount, setLoanAmount] = useState('')
  const [interestRate, setInterestRate] = useState('5.5')
  const [loanTerm, setLoanTerm] = useState('60')
  const [downPayment, setDownPayment] = useState('')
  const [result, setResult] = useState<any>(null)

  const calculateFinance = () => {
    const principal = parseFloat(loanAmount) - (parseFloat(downPayment) || 0)
    const rate = parseFloat(interestRate) / 100 / 12
    const term = parseInt(loanTerm)

    if (!principal || principal <= 0) return

    const monthlyPayment = (principal * rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1)
    const totalPayments = monthlyPayment * term
    const totalInterest = totalPayments - principal
    const totalCost = totalPayments + (parseFloat(downPayment) || 0)

    setResult({
      monthlyPayment: monthlyPayment.toFixed(2),
      totalPayments: totalPayments.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      totalCost: totalCost.toFixed(2)
    })
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Vehicle Price ($)
          </label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            placeholder="35000"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Down Payment ($)
          </label>
          <input
            type="number"
            value={downPayment}
            onChange={(e) => setDownPayment(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            placeholder="5000"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Loan Term (months)
          </label>
          <select
            value={loanTerm}
            onChange={(e) => setLoanTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          >
            <option value="36">36 months</option>
            <option value="48">48 months</option>
            <option value="60">60 months</option>
            <option value="72">72 months</option>
            <option value="84">84 months</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Interest Rate (%)
          </label>
          <input
            type="number"
            step="0.1"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            placeholder="5.5"
          />
        </div>
      </div>

      <button
        onClick={calculateFinance}
        className="w-full bg-amber-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-amber-700 transition-colors"
      >
        Calculate Loan Payment
      </button>

      {result && (
        <div className="bg-amber-50 p-6 rounded-lg border border-amber-200">
          <h3 className="text-lg font-semibold text-amber-800 mb-4">Loan Calculation Results</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-amber-600">Monthly Payment</p>
              <p className="text-2xl font-bold text-amber-800">${result.monthlyPayment}</p>
            </div>
            <div>
              <p className="text-sm text-amber-600">Total Payments</p>
              <p className="text-xl font-semibold text-amber-800">${result.totalPayments}</p>
            </div>
            <div>
              <p className="text-sm text-amber-600">Total Interest</p>
              <p className="text-xl font-semibold text-amber-800">${result.totalInterest}</p>
            </div>
            <div>
              <p className="text-sm text-amber-600">Total Cost</p>
              <p className="text-xl font-semibold text-amber-800">${result.totalCost}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Comparison Calculator Component
const ComparisonCalculator = () => {
  const [vehiclePrice, setVehiclePrice] = useState('')
  const [leaseDown, setLeaseDown] = useState('')
  const [buyDown, setBuyDown] = useState('')
  const [leaseTerm, setLeaseTerm] = useState('36')
  const [buyTerm, setBuyTerm] = useState('60')
  const [leaseRate, setLeaseRate] = useState('3.5')
  const [buyRate, setBuyRate] = useState('5.5')
  const [result, setResult] = useState<any>(null)

  const calculateComparison = () => {
    const price = parseFloat(vehiclePrice)
    if (!price || price <= 0) return

    // Lease calculation
    const leaseDownAmt = parseFloat(leaseDown) || 0
    const residual = price * 0.6 // 60% residual
    const leaseDepreciation = (price - residual - leaseDownAmt) / parseInt(leaseTerm)
    const leaseFinanceCharge = (price + residual) * (parseFloat(leaseRate) / 100 / 12)
    const leaseMonthly = leaseDepreciation + leaseFinanceCharge
    const leaseTotalCost = (leaseMonthly * parseInt(leaseTerm)) + leaseDownAmt

    // Buy calculation
    const buyDownAmt = parseFloat(buyDown) || 0
    const loanAmount = price - buyDownAmt
    const buyMonthlyRate = parseFloat(buyRate) / 100 / 12
    const buyTermMonths = parseInt(buyTerm)
    const buyMonthly = (loanAmount * buyMonthlyRate * Math.pow(1 + buyMonthlyRate, buyTermMonths)) / 
                      (Math.pow(1 + buyMonthlyRate, buyTermMonths) - 1)
    const buyTotalPayments = buyMonthly * buyTermMonths
    const buyTotalCost = buyTotalPayments + buyDownAmt

    setResult({
      lease: {
        monthly: leaseMonthly.toFixed(2),
        total: leaseTotalCost.toFixed(2),
        residual: residual.toFixed(2)
      },
      buy: {
        monthly: buyMonthly.toFixed(2),
        total: buyTotalCost.toFixed(2),
        equity: price.toFixed(2)
      },
      savings: (buyTotalCost - leaseTotalCost).toFixed(2)
    })
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Lease Section */}
        <div className="bg-emerald-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-emerald-800 mb-4">Lease Option</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vehicle Price ($)
              </label>
              <input
                type="number"
                value={vehiclePrice}
                onChange={(e) => setVehiclePrice(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="35000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Down Payment ($)
              </label>
              <input
                type="number"
                value={leaseDown}
                onChange={(e) => setLeaseDown(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="3000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Term (months)
              </label>
              <select
                value={leaseTerm}
                onChange={(e) => setLeaseTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="24">24 months</option>
                <option value="36">36 months</option>
                <option value="48">48 months</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Interest Rate (%)
              </label>
              <input
                type="number"
                step="0.1"
                value={leaseRate}
                onChange={(e) => setLeaseRate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="3.5"
              />
            </div>
          </div>
        </div>

        {/* Buy Section */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-800 mb-4">Buy Option</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vehicle Price ($)
              </label>
              <input
                type="number"
                value={vehiclePrice}
                onChange={(e) => setVehiclePrice(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="35000"
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Down Payment ($)
              </label>
              <input
                type="number"
                value={buyDown}
                onChange={(e) => setBuyDown(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="5000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Term (months)
              </label>
              <select
                value={buyTerm}
                onChange={(e) => setBuyTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="36">36 months</option>
                <option value="48">48 months</option>
                <option value="60">60 months</option>
                <option value="72">72 months</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Interest Rate (%)
              </label>
              <input
                type="number"
                step="0.1"
                value={buyRate}
                onChange={(e) => setBuyRate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="5.5"
              />
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={calculateComparison}
        className="w-full bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 transition-colors"
      >
        Compare Lease vs Buy
      </button>

      {result && (
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Comparison Results</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-emerald-100 p-4 rounded-lg">
              <h4 className="font-semibold text-emerald-800 mb-2">Lease</h4>
              <p className="text-sm text-emerald-600">Monthly Payment: <span className="font-bold">${result.lease.monthly}</span></p>
              <p className="text-sm text-emerald-600">Total Cost: <span className="font-bold">${result.lease.total}</span></p>
              <p className="text-sm text-emerald-600">Residual Value: <span className="font-bold">${result.lease.residual}</span></p>
            </div>
            <div className="bg-blue-100 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Buy</h4>
              <p className="text-sm text-blue-600">Monthly Payment: <span className="font-bold">${result.buy.monthly}</span></p>
              <p className="text-sm text-blue-600">Total Cost: <span className="font-bold">${result.buy.total}</span></p>
              <p className="text-sm text-blue-600">Vehicle Equity: <span className="font-bold">${result.buy.equity}</span></p>
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-lg font-semibold">
              {parseFloat(result.savings) > 0 ? 
                `Leasing saves you $${Math.abs(parseFloat(result.savings)).toFixed(2)}` : 
                `Buying saves you $${Math.abs(parseFloat(result.savings)).toFixed(2)}`
              }
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default function CalculatorPage() {
  const [selectedCalculator, setSelectedCalculator] = useState<string | null>(null)
  const containerRef = useRef<HTMLElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.3 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1
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

  const renderCalculator = () => {
    switch (selectedCalculator) {
      case 'lease':
        return <LeaseCalculator />
      case 'finance':
        return <FinanceCalculator />
      case 'comparison':
        return <ComparisonCalculator />
      default:
        return null
    }
  }

  return (
    <>
      {/* Navigation Header */}
      <Header />
      
      <motion.main
        ref={containerRef}
        className="min-h-screen pt-32 pb-16 relative"
        style={{ backgroundColor: '#FEF7ED' }}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        suppressHydrationWarning
      >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-orange-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-200/25 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          variants={itemVariants}
          suppressHydrationWarning
        >
          <motion.h1 
            className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-6 heading-luxury text-neutral-800"
            variants={itemVariants}
            suppressHydrationWarning
          >
            Auto Finance
            <span className="block bg-gradient-to-r from-emerald-600 via-emerald-500 to-orange-500 bg-clip-text text-transparent">
              Calculators
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-base sm:text-lg lg:text-xl text-neutral-600 max-w-3xl mx-auto mb-6 sm:mb-8 leading-relaxed"
            variants={itemVariants}
            suppressHydrationWarning
          >
            Make informed decisions with our comprehensive suite of automotive financial calculators. 
            Compare options and find the perfect financing solution for your next vehicle.
          </motion.p>

          {/* Trust Indicators */}
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-8 sm:mb-12"
            variants={itemVariants}
            suppressHydrationWarning
          >
            {trustIndicators.map((indicator, index) => (
              <motion.div
                key={index}
                className="bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-neutral-700 border border-white/40"
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
                transition={{ duration: 0.2 }}
                suppressHydrationWarning
              >
                {indicator}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Calculator Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16"
          variants={containerVariants}
          suppressHydrationWarning
        >
          {calculatorCards.map((card, index) => (
            <motion.div
              key={card.id}
              className="bg-[#FEFCFA] rounded-[16px] p-4 sm:p-6 border border-white/40 shadow-[0_4px_20px_rgba(139,69,19,0.08)] group cursor-pointer"
              variants={itemVariants}
              whileHover={{ 
                y: -8,
                scale: 1.02,
                boxShadow: "0 8px 32px rgba(139,69,19,0.12)"
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedCalculator(card.id)}
              suppressHydrationWarning
            >
              {/* Icon */}
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300"
                style={{ backgroundColor: card.bgColor }}
              >
                {card.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-neutral-800 mb-3">
                {card.title}
              </h3>
              
              <p className="text-neutral-600 mb-4 leading-relaxed">
                {card.description}
              </p>

              {/* Features */}
              <div className="space-y-2">
                {card.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center text-sm text-neutral-600">
                    <CheckCircleIcon className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0" />
                    {feature}
                  </div>
                ))}
              </div>

              {/* CTA */}
              <motion.div 
                className="mt-6 flex items-center text-emerald-600 font-semibold group-hover:text-emerald-700"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
                suppressHydrationWarning
              >
                <span>Calculate Now</span>
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="ml-2"
                  suppressHydrationWarning
                >
                  →
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Info Section */}
        <motion.div 
          className="bg-gradient-to-r from-emerald-50 to-orange-50 rounded-2xl p-6 sm:p-8 lg:p-12 text-center"
          variants={itemVariants}
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.3 }}
          suppressHydrationWarning
        >
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <InformationCircleIcon className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-neutral-800 mb-4">
            Need Help Choosing?
          </h3>
          
          <p className="text-base sm:text-lg text-neutral-600 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Our finance experts can help you understand your options and find the best 
            financing solution for your specific situation.
          </p>
          
          <motion.button
            className="bg-emerald-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-all duration-300 hover:bg-emerald-700 hover:shadow-xl"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            suppressHydrationWarning
          >
            Speak with an Expert
          </motion.button>
        </motion.div>

        {/* Calculator Modal/Content */}
        {selectedCalculator && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9997] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCalculator(null)}
            suppressHydrationWarning
          >
            <motion.div
              className="bg-white rounded-2xl p-6 sm:p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              suppressHydrationWarning
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-neutral-800">
                  {calculatorCards.find(c => c.id === selectedCalculator)?.title}
                </h2>
                <button
                  onClick={() => setSelectedCalculator(null)}
                  className="text-neutral-500 hover:text-neutral-700 text-2xl"
                >
                  ×
                </button>
              </div>
              
              {renderCalculator()}
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.main>
    </>
  )
} 