import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { sendCreditApplicationNotification } from '@/lib/emailService'
import { googleSheetsService } from '@/lib/googleSheets'

// Validation schema for credit application data
const creditApplicationSchema = z.object({
  // Personal Information
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  ssn: z.string().min(9, 'Valid SSN is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  email: z.string().email('Valid email is required'),
  maritalStatus: z.string().optional(),
  dependents: z.string().optional(),
  
  // Address Information
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zipCode: z.string().min(5, 'Valid ZIP code is required'),
  residenceType: z.string().optional(),
  monthsAtAddress: z.string().optional(),
  monthlyRent: z.string().optional(),
  
  // Employment Information
  employmentStatus: z.string().min(1, 'Employment status is required'),
  employer: z.string().min(1, 'Employer is required'),
  jobTitle: z.string().min(1, 'Job title is required'),
  monthlyIncome: z.string().min(1, 'Monthly income is required'),
  yearsEmployed: z.string().min(1, 'Years employed is required'),
  employerPhone: z.string().optional(),
  
  // Employer Address
  employerAddress: z.string().optional(),
  employerCity: z.string().optional(),
  employerState: z.string().optional(),
  employerZip: z.string().optional(),
  
  // Previous Employment (optional)
  previousEmployer: z.string().optional(),
  previousJobTitle: z.string().optional(),
  previousEmploymentYears: z.string().optional(),
  
  // Co-Applicant Information (optional)
  hasCoApplicant: z.string(),
  coApplicantFirstName: z.string().optional(),
  coApplicantLastName: z.string().optional(),
  coApplicantSSN: z.string().optional(),
  coApplicantDOB: z.string().optional(),
  coApplicantPhone: z.string().optional(),
})

/**
 * POST /api/submit-credit-application
 * Handles credit application submissions, sends emails, and saves to Google Sheets
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate application data
    const validatedData = creditApplicationSchema.parse(body)
    
    // Check if required environment variables are set
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD || !process.env.NOTIFICATION_EMAIL) {
      console.error('Missing email environment variables')
      return NextResponse.json(
        { 
          success: false, 
          message: 'Email configuration error' 
        },
        { status: 500 }
      )
    }
    
    // Send email notifications
    try {
      await sendCreditApplicationNotification(validatedData)
      console.log('Credit application emails sent successfully')
    } catch (error) {
      console.error('Failed to send credit application emails:', error)
      // Continue processing even if email fails
    }

    // Also save to Google Sheets if configured
    let sheetsSaved = true
    if (process.env.GOOGLE_SHEETS_CLIENT_EMAIL && 
        process.env.GOOGLE_SHEETS_PRIVATE_KEY && 
        process.env.GOOGLE_SHEETS_SPREADSHEET_ID) {
      try {
        // Convert credit application data to a format compatible with Google Sheets
        const sheetsData = {
          firstName: validatedData.firstName,
          lastName: validatedData.lastName,
          email: validatedData.email,
          phone: validatedData.phone,
          carBrand: 'Credit Application', // Identifier
          carTrim: `${validatedData.employmentStatus || 'N/A'} - $${validatedData.monthlyIncome || '0'}/mo`,
          creditScore: 'Pending Review',
          timeline: 'Credit Application'
        }
        
        await googleSheetsService.addLead(sheetsData)
        console.log('Credit application saved to Google Sheets')
      } catch (error) {
        console.warn('Failed to save to Google Sheets:', error)
        sheetsSaved = false
      }
    }

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Credit application submitted successfully',
      data: {
        applicationId: `app_${Date.now()}`,
        applicantName: `${validatedData.firstName} ${validatedData.lastName}`,
        email: validatedData.email,
        emailSent: true,
        sheetsSaved,
        submittedAt: new Date().toISOString()
      }
    })
  } catch (error) {
    console.error('API Error in submit-credit-application:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid application data',
          errors: error.errors 
        },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error' 
      },
      { status: 500 }
    )
  }
}

/**
 * GET /api/submit-credit-application
 * Returns API endpoint status (for testing)
 */
export async function GET() {
  return NextResponse.json({
    status: 'Credit application API endpoint is working',
    timestamp: new Date().toISOString(),
    emailConfigured: !!(process.env.EMAIL_USER && process.env.EMAIL_PASSWORD),
    notificationEmail: process.env.NOTIFICATION_EMAIL || 'Not configured'
  })
} 