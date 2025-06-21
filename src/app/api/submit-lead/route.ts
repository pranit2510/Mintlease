import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { GoogleSheetsService } from '@/lib/googleSheets'

const LeadSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"), 
  email: z.string().email("Valid email is required"),
  phone: z.string().min(1, "Phone number is required"),
  carBrand: z.string().optional(),
  carTrim: z.string().optional(),
  creditScore: z.string().optional(),
  timeline: z.string().optional()
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('Received lead data:', body)
    
    // Validate the form data
    const validatedData = LeadSchema.parse(body)
    
    // Create Google Sheets service instance
    const sheetsService = new GoogleSheetsService()
    
    // Prepare data for Google Sheets
    const leadData = {
      firstName: validatedData.firstName,
      lastName: validatedData.lastName,
      email: validatedData.email,
      phone: validatedData.phone,
      carBrand: validatedData.carBrand || '',
      carTrim: validatedData.carTrim || '',
      creditScore: validatedData.creditScore || '',
      timeline: validatedData.timeline || ''
    }
    
    // Save to Google Sheets
    const success = await sheetsService.addLead(leadData)
    
    if (!success) {
      throw new Error('Failed to save to Google Sheets')
    }
    
    console.log('Lead data saved successfully')
    
    return NextResponse.json({ 
      success: true, 
      message: 'Lead submitted successfully!' 
    })
    
  } catch (error) {
    console.error('Error processing lead:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: 'Invalid form data', errors: error.errors },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { success: false, message: 'Failed to submit lead' },
      { status: 500 }
    )
  }
} 