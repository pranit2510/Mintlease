/**
 * ===== MINT LEASE TYPESCRIPT DEFINITIONS =====
 * Comprehensive type definitions for the luxury auto brokerage platform
 */

// ===== CORE TYPES =====

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  phone: string
  dateOfBirth?: Date
  driversLicense?: string
  creditScore?: number
  isVerified: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Address {
  street: string
  city: string
  state: string
  zipCode: string
  country: string
}

// ===== VEHICLE TYPES =====

export interface Vehicle {
  id: string
  make: string
  model: string
  year: number
  trim: string
  bodyStyle: string
  color: string
  mileage: number
  vin: string
  msrp: number
  ourPrice: number
  monthlyLeasePayment: number
  monthlyFinancePayment: number
  downPayment: number
  residualValue: number
  moneyFactor: number
  features: string[]
  images: VehicleImage[]
  isAvailable: boolean
  stockNumber: string
  location: string
  deliveryTimeframe: string
  fuelType: 'gasoline' | 'hybrid' | 'electric' | 'diesel'
  transmission: 'manual' | 'automatic' | 'cvt'
  drivetrain: 'fwd' | 'rwd' | 'awd' | '4wd'
  mpgCity: number
  mpgHighway: number
  seatingCapacity: number
  category: VehicleCategory
  badge?: DealBadge
  viewCount: number
  savedCount: number
  createdAt: Date
  updatedAt: Date
}

export interface VehicleImage {
  id: string
  url: string
  alt: string
  order: number
  type: 'exterior' | 'interior' | 'engine' | 'wheels' | 'other'
}

export type VehicleCategory = 
  | 'sedan'
  | 'suv'
  | 'coupe'
  | 'convertible'
  | 'hatchback'
  | 'wagon'
  | 'truck'
  | 'van'
  | 'luxury'
  | 'sports'
  | 'electric'

export type DealBadge = 
  | 'hot-deal'
  | 'new-arrival' 
  | 'limited-time'
  | 'best-value'
  | 'almost-gone'
  | 'exclusive'

// ===== DEAL & BOOKING TYPES =====

export interface Deal {
  id: string
  vehicle: Vehicle
  dealType: 'lease' | 'finance' | 'cash'
  monthlyPayment: number
  downPayment: number
  totalCost: number
  termMonths: number
  mileageAllowance?: number
  incentives: Incentive[]
  isActive: boolean
  expiresAt?: Date
  createdAt: Date
  updatedAt: Date
}

export interface Incentive {
  id: string
  type: 'rebate' | 'low-apr' | 'loyalty' | 'military' | 'student' | 'trade-in'
  name: string
  description: string
  value: number
  isPercentage: boolean
  requirements: string[]
  expiresAt?: Date
}

export interface Booking {
  id: string
  user: User
  vehicle: Vehicle
  deal: Deal
  status: BookingStatus
  depositAmount: number
  depositPaidAt?: Date
  deliveryAddress: Address
  deliveryDate?: Date
  deliveryTimeSlot?: string
  specialRequests?: string
  totalAmount: number
  paymentMethod: string
  stripePaymentIntentId?: string
  createdAt: Date
  updatedAt: Date
}

export type BookingStatus = 
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'ready-for-delivery'
  | 'delivered'
  | 'cancelled'
  | 'refunded'

// ===== CALCULATOR TYPES =====

export interface LeaseCalculation {
  monthlyPayment: number
  totalCost: number
  downPayment: number
  residualValue: number
  acquisitionFee: number
  dispositionFee: number
  termMonths: number
  mileageAllowance: number
  excessMileageFee: number
}

export interface FinanceCalculation {
  monthlyPayment: number
  totalCost: number
  totalInterest: number
  downPayment: number
  loanAmount: number
  apr: number
  termMonths: number
}

export interface TradeInEstimate {
  vehicleMake: string
  vehicleModel: string
  vehicleYear: number
  mileage: number
  condition: 'excellent' | 'good' | 'fair' | 'poor'
  estimatedValue: number
  confidenceScore: number
  marketComparisons: TradeInComparison[]
}

export interface TradeInComparison {
  source: string
  estimatedValue: number
  lastUpdated: Date
}

// ===== FORM TYPES =====

export interface LeadForm {
  firstName: string
  lastName: string
  email: string
  phone: string
  vehicleInterest?: string
  preferredContactMethod: 'phone' | 'email' | 'text'
  bestTimeToContact: string
  message?: string
  source: string
  utmParams?: Record<string, string>
}

export interface CreditApplication {
  // Personal Information
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: Date
  ssn: string
  driversLicense: string
  
  // Address Information
  currentAddress: Address
  previousAddress?: Address
  residencyType: 'own' | 'rent' | 'family' | 'other'
  monthlyHousingPayment: number
  yearsAtAddress: number
  
  // Employment Information
  employmentStatus: 'employed' | 'self-employed' | 'retired' | 'student' | 'unemployed'
  employerName: string
  jobTitle: string
  monthlyIncome: number
  yearsEmployed: number
  employerPhone: string
  
  // Financial Information
  otherIncome: number
  monthlyExpenses: number
  existingAutoLoan: boolean
  autoLoanPayment?: number
  creditCardDebt: number
  
  // References
  references: PersonalReference[]
  
  // Vehicle Preference
  vehicleOfInterest?: string
  maxMonthlyPayment: number
  downPaymentAmount: number
  
  // Documents
  documents: UploadedDocument[]
  
  // Consent
  consentToCheck: boolean
  consentToContact: boolean
  
  status: ApplicationStatus
  submittedAt: Date
}

export interface PersonalReference {
  name: string
  relationship: string
  phone: string
  yearsKnown: number
}

export interface UploadedDocument {
  id: string
  type: 'drivers-license' | 'pay-stub' | 'bank-statement' | 'insurance' | 'other'
  fileName: string
  fileUrl: string
  uploadedAt: Date
}

export type ApplicationStatus = 
  | 'draft'
  | 'submitted'
  | 'under-review'
  | 'approved'
  | 'conditionally-approved'
  | 'denied'
  | 'expired'

// ===== FILTER & SEARCH TYPES =====

export interface VehicleFilters {
  make?: string[]
  model?: string[]
  yearRange?: [number, number]
  priceRange?: [number, number]
  paymentRange?: [number, number]
  mileageRange?: [number, number]
  bodyStyle?: string[]
  fuelType?: string[]
  transmission?: string[]
  features?: string[]
  colors?: string[]
  category?: VehicleCategory[]
  sortBy?: 'price-low' | 'price-high' | 'payment-low' | 'payment-high' | 'newest' | 'mileage' | 'popular'
}

export interface SearchResult<T> {
  items: T[]
  totalCount: number
  page: number
  pageSize: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

// ===== API TYPES =====

export interface ApiResponse<T = any> {
  data: T
  success: boolean
  message?: string
  errors?: string[]
  pagination?: {
    page: number
    pageSize: number
    totalCount: number
    totalPages: number
  }
}

export interface ApiError {
  code: string
  message: string
  details?: Record<string, any>
}

// ===== ANALYTICS & TRACKING TYPES =====

export interface PageView {
  page: string
  timestamp: Date
  userId?: string
  sessionId: string
  referrer?: string
  userAgent: string
  device: 'mobile' | 'tablet' | 'desktop'
}

export interface Event {
  name: string
  category: string
  properties: Record<string, any>
  timestamp: Date
  userId?: string
  sessionId: string
}

export interface ConversionFunnel {
  step: string
  count: number
  percentage: number
  dropOffRate: number
}

// ===== NOTIFICATION TYPES =====

export interface Notification {
  id: string
  userId: string
  type: NotificationType
  title: string
  message: string
  isRead: boolean
  actionUrl?: string
  createdAt: Date
}

export type NotificationType = 
  | 'booking-confirmed'
  | 'vehicle-available'
  | 'price-drop'
  | 'delivery-scheduled'
  | 'payment-reminder'
  | 'document-required'
  | 'application-status'
  | 'promotion'

// ===== COMPONENT PROPS TYPES =====

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'luxury'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  loading?: boolean
  disabled?: boolean
  fullWidth?: boolean
  children: React.ReactNode
  onClick?: () => void
  className?: string
  type?: 'button' | 'submit' | 'reset'
}

export interface CardProps {
  variant?: 'default' | 'luxury' | 'glass' | 'floating'
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'luxury'
  hover?: boolean
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  children: React.ReactNode
  showCloseButton?: boolean
  closeOnOverlayClick?: boolean
  className?: string
}

// ===== UTILITY TYPES =====

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export type RequiredKeys<T, K extends keyof T> = T & Required<Pick<T, K>>

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

export type Without<T, K> = Pick<T, Exclude<keyof T, K>>

export type XOR<T, U> = (T | U) extends object 
  ? (Without<T, keyof U> & U) | (Without<U, keyof T> & T) 
  : T | U

// ===== ENVIRONMENT TYPES =====

export interface Config {
  apiUrl: string
  stripePublishableKey: string
  googleMapsApiKey: string
  cloudinaryCloudName: string
  sentryDsn: string
  environment: 'development' | 'staging' | 'production'
  features: {
    creditApplication: boolean
    realTimeChat: boolean
    voiceAgent: boolean
    testimonials: boolean
    referralProgram: boolean
  }
}

// ===== GLOBAL STATE TYPES =====

export interface AppState {
  user: User | null
  isAuthenticated: boolean
  vehicles: Vehicle[]
  favorites: string[]
  bookings: Booking[]
  notifications: Notification[]
  filters: VehicleFilters
  searchResults: SearchResult<Vehicle>
  isLoading: boolean
  error: string | null
}

export interface UIState {
  theme: 'light' | 'dark' | 'auto'
  sidebarOpen: boolean
  modalStack: string[]
  toasts: Toast[]
  pageLoading: boolean
}

export interface Toast {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message?: string
  duration?: number
  actions?: ToastAction[]
}

export interface ToastAction {
  label: string
  onClick: () => void
  variant?: 'default' | 'destructive'
} 