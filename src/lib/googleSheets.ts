import { google } from 'googleapis'

export interface LeadFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  carBrand: string
  carTrim: string
  creditScore: string
  timeline: string
  timestamp?: string
}

/**
 * Google Sheets Service for Mint Lease Lead Management
 * Handles form data submission to Google Sheets with proper error handling
 */
export class GoogleSheetsService {
  private sheets
  private spreadsheetId: string

  constructor() {
    // Initialize Google Sheets API
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })

    this.sheets = google.sheets({ version: 'v4', auth })
    this.spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID || ''
  }

  /**
   * Initialize Google Sheets with headers if not exists
   */
  async initializeSheet(): Promise<void> {
    try {
      const headers = [
        'Timestamp',
        'First Name',
        'Last Name',
        'Email',
        'Phone',
        'Car Brand',
        'Car Trim',
        'Credit Score',
        'Timeline',
        'Status'
      ]

      // Check if sheet exists and has headers
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: 'Sheet1!A1:J1',
      })

      // If no data or headers don't match, add headers
      if (!response.data.values || response.data.values.length === 0) {
        await this.sheets.spreadsheets.values.update({
          spreadsheetId: this.spreadsheetId,
          range: 'Sheet1!A1:J1',
          valueInputOption: 'RAW',
          requestBody: {
            values: [headers],
          },
        })
      }
    } catch (error) {
      console.error('Error initializing Google Sheets:', error)
      throw new Error('Failed to initialize Google Sheets')
    }
  }

  /**
   * Add lead data to Google Sheets
   */
  async addLead(leadData: LeadFormData): Promise<boolean> {
    try {
      // Ensure sheet is initialized
      await this.initializeSheet()

      const timestamp = new Date().toLocaleString('en-US', {
        timeZone: 'America/New_York',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })

      const row = [
        timestamp,
        leadData.firstName,
        leadData.lastName,
        leadData.email,
        leadData.phone,
        leadData.carBrand || 'Not specified',
        leadData.carTrim || 'Not specified',
        leadData.creditScore || 'Not specified',
        leadData.timeline || 'Not specified',
        'New Lead'
      ]

      await this.sheets.spreadsheets.values.append({
        spreadsheetId: this.spreadsheetId,
        range: 'Sheet1!A:J',
        valueInputOption: 'RAW',
        insertDataOption: 'INSERT_ROWS',
        requestBody: {
          values: [row],
        },
      })

      console.log('Successfully added lead to Google Sheets:', leadData.email)
      return true
    } catch (error) {
      console.error('Error adding lead to Google Sheets:', error)
      return false
    }
  }

  /**
   * Get all leads from Google Sheets
   */
  async getLeads(): Promise<LeadFormData[]> {
    try {
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: 'Sheet1!A2:J', // Skip headers
      })

      const rows = response.data.values || []
      
      return rows.map((row) => ({
        timestamp: row[0] || '',
        firstName: row[1] || '',
        lastName: row[2] || '',
        email: row[3] || '',
        phone: row[4] || '',
        carBrand: row[5] || '',
        carTrim: row[6] || '',
        creditScore: row[7] || '',
        timeline: row[8] || '',
      }))
    } catch (error) {
      console.error('Error fetching leads from Google Sheets:', error)
      return []
    }
  }
}

// Export singleton instance
export const googleSheetsService = new GoogleSheetsService() 