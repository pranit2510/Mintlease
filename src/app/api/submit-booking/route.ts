import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { GoogleSheetsService } from '@/lib/googleSheets'

const BookingSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"), 
  email: z.string().email("Valid email is required"),
  phone: z.string().min(1, "Phone number is required"),
  vehicleType: z.string().optional(),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  message: z.string().optional()
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('Received booking data:', body)
    
    // Validate the form data
    const validatedData = BookingSchema.parse(body)
    
    // Create Google Sheets service instance
    const sheetsService = new GoogleSheetsService()
    
    // Prepare data for Google Sheets (adapt to LeadFormData structure)
    const bookingData = {
      firstName: validatedData.firstName,
      lastName: validatedData.lastName,
      email: validatedData.email,
      phone: validatedData.phone,
      carBrand: validatedData.vehicleType || 'Booking Consultation',
      carTrim: validatedData.budget || 'Not specified',
      creditScore: 'Booking Request',
      timeline: validatedData.timeline || 'Not specified'
    }
    
    // Save to Google Sheets
    const success = await sheetsService.addLead(bookingData)
    
    if (!success) {
      throw new Error('Failed to save to Google Sheets')
    }
    
    console.log('Booking data saved successfully')
    
    return NextResponse.json({ 
      success: true, 
      message: 'Booking consultation request submitted successfully!' 
    })
    
  } catch (error) {
    console.error('Error processing booking:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: 'Invalid form data', errors: error.errors },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { success: false, message: 'Failed to submit booking consultation request' },
      { status: 500 }
    )
  }
} 