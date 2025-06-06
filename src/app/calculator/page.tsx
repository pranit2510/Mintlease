'use client'

import React, { useState } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { motion } from 'framer-motion'
import { CalculatorIcon, CurrencyDollarIcon, ChartBarIcon, CheckCircleIcon } from '@heroicons/react/24/outline'

/**
 * Calculator Page - Savings & Financing Calculator
 * Features: Lease vs buy calculator, savings estimator, financing options
 */
export default function CalculatorPage() {
  const [vehiclePrice, setVehiclePrice] = useState(50000)
  const [downPayment, setDownPayment] = useState(5000)
  const [leaseTerm, setLeaseTerm] = useState(36)
  const [interestRate, setInterestRate] = useState(3.5)

  // Calculate lease payment
  const calculateLeasePayment = () => {
    const monthlyRate = interestRate / 100 / 12
    const residualValue = vehiclePrice * 0.6 // Assuming 60% residual
    const depreciation = (vehiclePrice - residualValue) / leaseTerm
    const finance = (vehiclePrice + residualValue) * monthlyRate
    return Math.round(depreciation + finance)
  }

  // Calculate loan payment
  const calculateLoanPayment = () => {
    const principal = vehiclePrice - downPayment
    const monthlyRate = interestRate / 100 / 12
    const payment = principal * (monthlyRate * Math.pow(1 + monthlyRate, leaseTerm)) / (Math.pow(1 + monthlyRate, leaseTerm) - 1)
    return Math.round(payment)
  }

  // Calculate savings with Mint Lease
  const calculateSavings = () => {
    const standardPrice = vehiclePrice
    const negotiatedPrice = vehiclePrice * 0.92 // 8% average savings
    return Math.round(standardPrice - negotiatedPrice)
  }

  const leasePayment = calculateLeasePayment()
  const loanPayment = calculateLoanPayment()
  const savings = calculateSavings()

  return (
    <>
      <Header />
      
      <main className="pt-32 min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
        <div className="container mx-auto px-4 py-12">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-neutral-800 mb-6">
              Savings <span className="gradient-text">Calculator</span>
            </h1>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Calculate your potential savings and explore financing options. 
              See how much you could save with our expert negotiation services.
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Calculator Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass luxury-card p-8"
            >
              <div className="flex items-center space-x-3 mb-8">
                <CalculatorIcon className="w-8 h-8 text-primary-emerald" />
                <h2 className="text-2xl font-bold text-neutral-800">
                  Vehicle Calculator
                </h2>
              </div>

              <div className="space-y-6">
                {/* Vehicle Price */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Vehicle Price
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500">$</span>
                    <input
                      type="number"
                      value={vehiclePrice}
                      onChange={(e) => setVehiclePrice(Number(e.target.value))}
                      className="w-full pl-8 pr-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-emerald focus:border-transparent"
                    />
                  </div>
                  <input
                    type="range"
                    min="20000"
                    max="200000"
                    step="5000"
                    value={vehiclePrice}
                    onChange={(e) => setVehiclePrice(Number(e.target.value))}
                    className="w-full mt-2 accent-primary-emerald"
                  />
                </div>

                {/* Down Payment */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Down Payment
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500">$</span>
                    <input
                      type="number"
                      value={downPayment}
                      onChange={(e) => setDownPayment(Number(e.target.value))}
                      className="w-full pl-8 pr-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-emerald focus:border-transparent"
                    />
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={vehiclePrice * 0.3}
                    step="1000"
                    value={downPayment}
                    onChange={(e) => setDownPayment(Number(e.target.value))}
                    className="w-full mt-2 accent-primary-emerald"
                  />
                </div>

                {/* Lease Term */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Term (Months)
                  </label>
                  <select
                    value={leaseTerm}
                    onChange={(e) => setLeaseTerm(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-emerald focus:border-transparent"
                  >
                    <option value={24}>24 Months</option>
                    <option value={36}>36 Months</option>
                    <option value={48}>48 Months</option>
                    <option value={60}>60 Months</option>
                  </select>
                </div>

                {/* Interest Rate */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Interest Rate (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-emerald focus:border-transparent"
                  />
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full mt-2 accent-primary-emerald"
                  />
                </div>
              </div>
            </motion.div>

            {/* Results */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-8"
            >
              {/* Savings Summary */}
              <div className="glass luxury-card p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <CurrencyDollarIcon className="w-8 h-8 text-primary-emerald" />
                  <h3 className="text-xl font-bold text-neutral-800">
                    Your Potential Savings
                  </h3>
                </div>
                
                <div className="text-center p-6 bg-gradient-emerald rounded-xl text-white mb-6">
                  <div className="text-4xl font-bold mb-2">${savings.toLocaleString()}</div>
                  <div className="text-emerald-100">Average Savings with Mint Lease</div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-neutral-100 rounded-lg">
                    <div className="text-sm text-neutral-600">Standard Price</div>
                    <div className="text-xl font-bold text-neutral-800">
                      ${vehiclePrice.toLocaleString()}
                    </div>
                  </div>
                  <div className="text-center p-4 bg-primary-emerald/10 rounded-lg">
                    <div className="text-sm text-primary-emerald">Our Price</div>
                    <div className="text-xl font-bold text-primary-emerald">
                      ${(vehiclePrice - savings).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Comparison */}
              <div className="glass luxury-card p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <ChartBarIcon className="w-8 h-8 text-primary-emerald" />
                  <h3 className="text-xl font-bold text-neutral-800">
                    Payment Options
                  </h3>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-neutral-100 rounded-lg">
                    <div>
                      <div className="font-semibold text-neutral-800">Lease Payment</div>
                      <div className="text-sm text-neutral-600">{leaseTerm} months</div>
                    </div>
                    <div className="text-2xl font-bold text-neutral-800">
                      ${leasePayment}/mo
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-4 bg-neutral-100 rounded-lg">
                    <div>
                      <div className="font-semibold text-neutral-800">Finance Payment</div>
                      <div className="text-sm text-neutral-600">{leaseTerm} months</div>
                    </div>
                    <div className="text-2xl font-bold text-neutral-800">
                      ${loanPayment}/mo
                    </div>
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div className="glass luxury-card p-8">
                <h3 className="text-xl font-bold text-neutral-800 mb-6">
                  Why Use Our Service?
                </h3>
                
                <div className="space-y-4">
                  {[
                    'Expert negotiation saves you thousands',
                    'Access to dealer-only pricing',
                    'No hidden fees or markups',
                    'Financing rate optimization',
                    'Complete paperwork handling'
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircleIcon className="w-5 h-5 text-primary-emerald" />
                      <span className="text-neutral-700">{benefit}</span>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => window.location.href = '/booking'}
                  className="w-full mt-6 bg-gradient-emerald text-white py-3 px-6 rounded-lg font-semibold hover:shadow-glow hover:scale-105 transition-all duration-300"
                >
                  Book Your Consultation
                </button>
              </div>
            </motion.div>
          </div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-16 text-center"
          >
            <div className="glass luxury-card p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-neutral-800 mb-4">
                Ready to Save on Your Next Vehicle?
              </h3>
              <p className="text-neutral-600 mb-6">
                These calculations are estimates. Actual savings and payments may vary based on 
                your credit score, chosen vehicle, and current market conditions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => window.location.href = '/booking'}
                  className="bg-gradient-emerald text-white px-8 py-3 rounded-lg font-semibold hover:shadow-glow hover:scale-105 transition-all duration-300"
                >
                  Get Started - $499
                </button>
                <button 
                  onClick={() => window.location.href = '/inventory'}
                  className="bg-white text-primary-emerald px-8 py-3 rounded-lg font-semibold border-2 border-primary-emerald hover:bg-primary-emerald hover:text-white transition-all duration-300"
                >
                  Browse Inventory
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </>
  )
} 