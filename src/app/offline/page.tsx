'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { WifiOff, RefreshCw, Home, Phone, Mail } from 'lucide-react'
import { PremiumBadge } from '@/components/ui/PremiumBadge'

export default function OfflinePage() {
  const [isOnline, setIsOnline] = useState(false)
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true)
      // Automatically redirect when back online
      setTimeout(() => {
        window.location.href = '/'
      }, 1000)
    }

    const handleOffline = () => {
      setIsOnline(false)
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // Check current status
    setIsOnline(navigator.onLine)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const handleRetry = async () => {
    setRetryCount(prev => prev + 1)
    
    try {
      const response = await fetch('/', { 
        method: 'HEAD',
        cache: 'no-cache'
      })
      
      if (response.ok) {
        window.location.href = '/'
      }
    } catch (error) {
      console.log('Still offline')
    }
  }

  const handleGoHome = () => {
    window.location.href = '/'
  }

  return (
    <main className="pt-20 relative min-h-screen overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-orange-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-200 rounded-full blur-3xl"></div>
      </div>

      <section className="py-20 relative overflow-hidden z-10">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <PremiumBadge icon={WifiOff}>Offline Mode</PremiumBadge>
            
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 heading-luxury text-3d-luxury text-neutral-800"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              You're Offline
            </motion.h1>
            
            <motion.p 
              className="text-lg text-neutral-600 max-w-2xl mx-auto mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              It looks like you've lost your internet connection. Don't worry - you can still browse cached content or try reconnecting.
            </motion.p>

            {/* Connection Status */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium mb-8 ${
                isOnline 
                  ? 'bg-green-100 text-green-800 border border-green-200' 
                  : 'bg-red-100 text-red-800 border border-red-200'
              }`}
            >
              <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
              <span>{isOnline ? 'Back online!' : 'No internet connection'}</span>
            </motion.div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <motion.button
              onClick={handleRetry}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group bg-emerald-600 text-white px-8 py-4 rounded-full font-medium transition-all duration-300 hover:bg-emerald-700 hover:shadow-lg flex items-center justify-center space-x-2"
              disabled={isOnline}
            >
              <RefreshCw className={`w-5 h-5 ${retryCount > 0 ? 'animate-spin' : ''}`} />
              <span>Try Again {retryCount > 0 && `(${retryCount})`}</span>
            </motion.button>

            <motion.button
              onClick={handleGoHome}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group bg-white text-emerald-600 border-2 border-emerald-600 px-8 py-4 rounded-full font-medium transition-all duration-300 hover:bg-emerald-50 flex items-center justify-center space-x-2"
            >
              <Home className="w-5 h-5" />
              <span>Go Home</span>
            </motion.button>
          </motion.div>

          {/* Cached Content Info */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="bg-white/80 backdrop-blur-sm border border-neutral-200 rounded-2xl p-8 max-w-4xl mx-auto"
          >
            <h2 className="text-2xl font-bold text-neutral-800 mb-6 text-center">
              What You Can Do Offline
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Home className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="font-semibold text-neutral-800 mb-2">Browse Cached Pages</h3>
                <p className="text-sm text-neutral-600">
                  View previously loaded pages that are stored locally
                </p>
              </div>

              <div className="text-center p-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-neutral-800 mb-2">Call Us Directly</h3>
                <p className="text-sm text-neutral-600">
                  <a href="tel:+1-555-MINT-LEASE" className="text-blue-600 hover:underline">
                    (555) MINT-LEASE
                  </a>
                </p>
              </div>

              <div className="text-center p-4 md:col-span-2 lg:col-span-1">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-neutral-800 mb-2">Email Us</h3>
                <p className="text-sm text-neutral-600">
                  <a href="mailto:info@mintlease.com" className="text-purple-600 hover:underline">
                    info@mintlease.com
                  </a>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Tips */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mt-8 text-center"
          >
            <h3 className="font-semibold text-neutral-800 mb-4">Tips to Get Back Online</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-neutral-600 max-w-4xl mx-auto">
              <div className="bg-white/60 rounded-lg p-4">
                <span className="font-medium">Check WiFi</span><br />
                Make sure you're connected to a working network
              </div>
              <div className="bg-white/60 rounded-lg p-4">
                <span className="font-medium">Toggle Airplane Mode</span><br />
                Turn it on and off to reset your connection
              </div>
              <div className="bg-white/60 rounded-lg p-4">
                <span className="font-medium">Restart Router</span><br />
                Unplug for 30 seconds and plug back in
              </div>
              <div className="bg-white/60 rounded-lg p-4">
                <span className="font-medium">Check Data Plan</span><br />
                Ensure you haven't exceeded your data limit
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
} 