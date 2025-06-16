'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react'

/**
 * Footer Component with Contact Information
 * Features: Contact details, quick links, social proof
 */
interface FooterProps {
  className?: string
}

export const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  // Fix hydration issues by detecting client-side mounting
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const contactInfo = [
    {
      icon: <Phone className="w-5 h-5" />,
      title: "Call Us",
      value: "+1 (516) 549-1999",
      href: "tel:+15165491999"
    },
    {
      icon: <Mail className="w-5 h-5" />,
      title: "Email Us", 
      value: "sales@mintleaseus.com",
      href: "mailto:sales@mintleaseus.com"
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      title: "Service Area",
      value: "East Coast",
      href: "#"
    },
    {
      icon: <MessageCircle className="w-5 h-5" />,
      title: "Live Chat",
      value: "Available 9AM-9PM",
      href: "#"
    }
  ]

  const quickLinks = [
    { label: "How It Works", href: "#how-it-works" },
    { label: "Inventory", href: "/inventory" },
    { label: "Calculator", href: "/calculator" },
    { label: "Get Quote", href: "/lead" },
    { label: "Get a Quote", href: "/lead" }
  ]

  return (
    <footer id="contact" className="bg-gradient-to-br from-neutral-900 to-neutral-800 text-white py-16">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <motion.div
              initial={isMounted ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              suppressHydrationWarning
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-emerald rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-2xl">M</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Mint Lease</h3>
                  <p className="text-neutral-400">Premium Auto Brokerage</p>
                </div>
              </div>
              
              <p className="text-neutral-300 mb-6 max-w-md">
                We help you find and negotiate the best deals on luxury vehicles. 
                Save thousands with our expert auto brokerage service.
              </p>
              
              <div className="flex items-center gap-4 text-sm text-neutral-400">
                <span>⭐ 5.0 Rating</span>
                <span>•</span>
                <span>2,500+ Happy Customers</span>
                <span>•</span>
                <span>$15M+ Saved</span>
              </div>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div>
            <motion.div
              initial={isMounted ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              suppressHydrationWarning
            >
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-neutral-300 hover:text-primary-emerald transition-colors"
                      onClick={(e) => {
                        if (link.href.startsWith('#')) {
                          e.preventDefault()
                          const element = document.querySelector(link.href)
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth' })
                          }
                        }
                      }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Contact Info */}
          <div>
            <motion.div
              initial={isMounted ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              suppressHydrationWarning
            >
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
              <div className="space-y-4">
                {contactInfo.map((contact, index) => (
                  <a
                    key={index}
                    href={contact.href}
                    className="flex items-center gap-3 text-neutral-300 hover:text-primary-emerald transition-colors group"
                  >
                    <div className="w-8 h-8 bg-neutral-800 rounded-lg flex items-center justify-center text-primary-emerald group-hover:bg-primary-emerald group-hover:text-white transition-all">
                      {contact.icon}
                    </div>
                    <div>
                      <div className="text-xs text-neutral-500">{contact.title}</div>
                      <div className="text-sm font-medium">{contact.value}</div>
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-neutral-400">
            <div>
              © 2024 Mint Lease. All rights reserved.
            </div>
            <div className="flex items-center gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-primary-emerald transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary-emerald transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-primary-emerald transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 