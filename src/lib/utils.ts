import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utility function to merge Tailwind CSS classes with proper conflict resolution
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats currency values for display
 */
export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

/**
 * Formats numbers with proper thousand separators
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num)
}

/**
 * Calculates monthly lease payment
 */
export function calculateLeasePayment(
  msrp: number,
  residualValue: number,
  moneyFactor: number,
  termMonths: number,
  downPayment: number = 0
): number {
  const depreciationCost = (msrp - residualValue - downPayment) / termMonths
  const financeCost = (msrp + residualValue) * moneyFactor
  return depreciationCost + financeCost
}

/**
 * Calculates monthly finance payment
 */
export function calculateFinancePayment(
  principal: number,
  annualRate: number,
  termMonths: number,
  downPayment: number = 0
): number {
  const loanAmount = principal - downPayment
  const monthlyRate = annualRate / 100 / 12
  
  if (monthlyRate === 0) return loanAmount / termMonths
  
  const payment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, termMonths)) /
    (Math.pow(1 + monthlyRate, termMonths) - 1)
  
  return payment
}

/**
 * Debounce function for performance optimization
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Throttle function for performance optimization
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

/**
 * Animation variants for Framer Motion
 */
export const animationVariants = {
  // Fade animations
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }
  },

  // Slide animations
  slideUp: {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -60 },
    transition: { duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }
  },

  slideDown: {
    initial: { opacity: 0, y: -60 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 60 },
    transition: { duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }
  },

  slideLeft: {
    initial: { opacity: 0, x: 60 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -60 },
    transition: { duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }
  },

  slideRight: {
    initial: { opacity: 0, x: -60 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 60 },
    transition: { duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }
  },

  // Scale animations
  scaleIn: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
    transition: { duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }
  },

  // Stagger container
  staggerContainer: {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  },

  // Card hover effect
  cardHover: {
    hover: {
      y: -8,
      scale: 1.02,
      boxShadow: "0 35px 60px -12px rgba(0, 0, 0, 0.35)",
      transition: { duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }
    }
  },

  // Button animations
  buttonPress: {
    whileTap: { scale: 0.95 },
    whileHover: { scale: 1.05 },
    transition: { type: "spring", stiffness: 400, damping: 17 }
  }
}

/**
 * GSAP animation configurations
 */
export const gsapConfigs = {
  // Easing functions
  ease: {
    luxury: "power2.out",
    smooth: "power1.inOut",
    bounce: "back.out(1.7)",
    elastic: "elastic.out(1, 0.3)"
  },
  
  // Duration presets
  duration: {
    fast: 0.3,
    medium: 0.5,
    slow: 0.8,
    extraSlow: 1.2
  },
  
  // Scroll trigger defaults
  scrollTrigger: {
    start: "top 80%",
    end: "bottom 20%",
    toggleActions: "play none none reverse"
  }
}

/**
 * Intersection Observer hook utility
 */
export function createIntersectionObserver(
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit = {}
): IntersectionObserver {
  const defaultOptions: IntersectionObserverInit = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
    ...options
  }
  
  return new IntersectionObserver(callback, defaultOptions)
}

/**
 * Generates random ID for components
 */
export function generateId(prefix: string = 'mint'): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Validates email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validates phone number format
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''))
}

/**
 * Formats phone number for display
 */
export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '')
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3]
  }
  return phone
}

/**
 * Converts string to slug format
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-')
    .trim()
}

/**
 * Truncates text with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.substr(0, maxLength) + '...'
}

/**
 * Checks if device is mobile
 */
export function isMobile(): boolean {
  if (typeof window === 'undefined') return false
  return window.innerWidth < 768
}

/**
 * Gets viewport dimensions
 */
export function getViewportSize(): { width: number; height: number } {
  if (typeof window === 'undefined') return { width: 0, height: 0 }
  return {
    width: window.innerWidth,
    height: window.innerHeight
  }
}

/**
 * Smooth scroll to element
 */
export function scrollToElement(elementId: string, offset: number = 0): void {
  const element = document.getElementById(elementId)
  if (element) {
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - offset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }
} 