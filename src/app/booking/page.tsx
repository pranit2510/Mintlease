'use client'

import React from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { motion } from 'framer-motion'
import { CalendarDaysIcon, CreditCardIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'

/**
 * Booking Page - $499 Consultation Deposit
 * Features: Stripe integration, consultation scheduling, trust elements
 */
export default function BookingPage() {
  const handleBookConsultation = () => {
    // TODO: Integrate with Stripe for payment processing
    console.log('Book consultation clicked')
  }

  const benefits = [
    {
      icon: <ShieldCheckIcon className="w-6 h-6" />,
      title: "100% Refundable",
      description: "Full refund if we don&apos;t save you money or you&apos;re not satisfied"
    },
    {
      icon: <CalendarDaysIcon className="w-6 h-6" />,
      title: "Flexible Scheduling",
      description: "Book at your convenience - evenings and weekends available"
    },
    {
      icon: <CreditCardIcon className="w-6 h-6" />,
      title: "Secure Payment",
      description: "Bank-level security with Stripe payment processing"
    }
  ]

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
              Book Your <span className="gradient-text">Consultation</span>
            </h1>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Secure your spot with a fully refundable $499 deposit. Our experts will help you find 
              and negotiate the best deal on your dream vehicle.
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Booking Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass luxury-card p-8"
            >
              <h2 className="text-2xl font-bold text-neutral-800 mb-8">
                Schedule Your Consultation
              </h2>

              <div className="space-y-6">
                {/* Deposit Amount */}
                <div className="text-center p-6 bg-gradient-emerald rounded-xl text-white">
                  <div className="text-4xl font-bold mb-2">$499</div>
                  <div className="text-emerald-100">Fully Refundable Deposit</div>
                </div>

                {/* Contact Form */}
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="First Name"
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-emerald focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-emerald focus:border-transparent"
                    />
                  </div>
                  
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-emerald focus:border-transparent"
                  />
                  
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-emerald focus:border-transparent"
                  />
                  
                  <select className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-emerald focus:border-transparent">
                    <option>Preferred Vehicle Type</option>
                    <option>Luxury Sedan</option>
                    <option>SUV</option>
                    <option>Sports Car</option>
                    <option>Electric Vehicle</option>
                    <option>Other</option>
                  </select>
                  
                  <textarea
                    placeholder="Tell us about your dream vehicle and any specific requirements..."
                    rows={4}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-emerald focus:border-transparent resize-none"
                  />
                </div>

                {/* Payment Button */}
                <button
                  onClick={handleBookConsultation}
                  className="w-full bg-gradient-emerald text-white py-4 px-6 rounded-lg font-semibold text-lg hover:shadow-glow hover:scale-105 transition-all duration-300"
                >
                  Secure My Consultation - $499
                </button>

                <p className="text-center text-sm text-neutral-600">
                  Secure payment powered by Stripe • SSL encrypted
                </p>
              </div>
            </motion.div>

            {/* Benefits & Process */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-8"  
            >
              {/* Benefits */}
              <div className="glass luxury-card p-8">
                <h3 className="text-xl font-bold text-neutral-800 mb-6">
                  Why Choose Mint Lease?
                </h3>
                
                <div className="space-y-6">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-emerald/10 to-primary-emerald-light/10 rounded-xl flex items-center justify-center text-primary-emerald">
                        {benefit.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-neutral-800 mb-1">
                          {benefit.title}
                        </h4>
                        <p className="text-neutral-600 text-sm">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* What Happens Next */}
              <div className="glass luxury-card p-8">
                <h3 className="text-xl font-bold text-neutral-800 mb-6">
                  What Happens Next?
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary-emerald text-white rounded-full flex items-center justify-center text-sm font-bold">
                      1
                    </div>
                    <span className="text-neutral-700">We&apos;ll call you within 24 hours</span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary-emerald text-white rounded-full flex items-center justify-center text-sm font-bold">
                      2
                    </div>
                    <span className="text-neutral-700">Schedule your consultation</span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary-emerald text-white rounded-full flex items-center justify-center text-sm font-bold">
                      3
                    </div>
                    <span className="text-neutral-700">Start finding your perfect vehicle</span>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="text-center p-6 glass rounded-xl">
                <div className="text-sm text-neutral-600 mb-2">Trusted by 2,500+ customers</div>
                <div className="text-2xl font-bold text-emerald-600">$15M+</div>
                <div className="text-sm text-neutral-600">Total Customer Savings</div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  )
} 