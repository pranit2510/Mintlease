import nodemailer from 'nodemailer'

// Type for credit application form data (matches API validation schema)
interface CreditApplicationFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  ssn: string
  address: string
  city: string
  state: string
  zipCode: string
  employmentStatus: string
  employer: string
  jobTitle: string
  monthlyIncome: string
  yearsEmployed: string
  hasCoApplicant: string
  coApplicantFirstName?: string
  coApplicantLastName?: string
  maritalStatus?: string
  dependents?: string
  residenceType?: string
  monthsAtAddress?: string
  monthlyRent?: string
  employerPhone?: string
  employerAddress?: string
  employerCity?: string
  employerState?: string
  employerZip?: string
  previousEmployer?: string
  previousJobTitle?: string
  previousEmploymentYears?: string
  coApplicantSSN?: string
  coApplicantDOB?: string
  coApplicantPhone?: string
}

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
})

/**
 * Sends a credit application notification email to the business
 */
export async function sendCreditApplicationNotification(applicationData: CreditApplicationFormData): Promise<void> {
  const {
    firstName,
    lastName,
    email,
    phone,
    dateOfBirth,
    ssn,
    address,
    city,
    state,
    zipCode,
    employmentStatus,
    employer,
    jobTitle,
    monthlyIncome,
    yearsEmployed,
    hasCoApplicant,
    coApplicantFirstName,
    coApplicantLastName,
  } = applicationData

  // Business notification email
  const businessEmailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Credit Application - Mint Lease</title>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f8f9fa; }
        .container { max-width: 700px; margin: 0 auto; background-color: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
        .header { background: linear-gradient(135deg, #047857 0%, #059669 100%); color: white; padding: 30px; text-align: center; }
        .header h1 { margin: 0; font-size: 28px; font-weight: 700; }
        .header p { margin: 10px 0 0 0; font-size: 16px; opacity: 0.9; }
        .content { padding: 40px 30px; }
        .section { margin-bottom: 30px; }
        .section h2 { color: #047857; font-size: 20px; margin-bottom: 15px; padding-bottom: 8px; border-bottom: 2px solid #e5e7eb; }
        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px; }
        .info-item { background-color: #f9fafb; padding: 15px; border-radius: 8px; border-left: 4px solid #047857; }
        .info-label { font-weight: 600; color: #374151; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; }
        .info-value { color: #111827; font-size: 16px; margin-top: 4px; }
        .highlight { background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 20px; border-radius: 10px; border: 1px solid #f59e0b; margin: 20px 0; }
        .highlight h3 { color: #92400e; margin: 0 0 10px 0; font-size: 18px; }
        .footer { background-color: #f9fafb; padding: 25px; text-align: center; border-top: 1px solid #e5e7eb; }
        .footer p { margin: 0; color: #6b7280; font-size: 14px; }
        .urgent { color: #dc2626; font-weight: 600; }
        @media (max-width: 600px) {
          .info-grid { grid-template-columns: 1fr; }
          .content { padding: 20px; }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🚗 New Credit Application</h1>
          <p>Mint Lease Premium Auto Brokerage</p>
        </div>
        
        <div class="content">
          <div class="highlight">
            <h3>⚡ Priority Application Received</h3>
            <p><strong>Applicant:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Monthly Income:</strong> $${monthlyIncome}</p>
          </div>

          <div class="section">
            <h2>👤 Personal Information</h2>
            <div class="info-grid">
              <div class="info-item">
                <div class="info-label">Full Name</div>
                <div class="info-value">${firstName} ${lastName}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Date of Birth</div>
                <div class="info-value">${dateOfBirth}</div>
              </div>
              <div class="info-item">
                <div class="info-label">SSN</div>
                <div class="info-value">${ssn}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Phone</div>
                <div class="info-value">${phone}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Email</div>
                <div class="info-value">${email}</div>
              </div>
            </div>
          </div>

          <div class="section">
            <h2>🏠 Address Information</h2>
            <div class="info-grid">
              <div class="info-item">
                <div class="info-label">Address</div>
                <div class="info-value">${address}</div>
              </div>
              <div class="info-item">
                <div class="info-label">City, State ZIP</div>
                <div class="info-value">${city}, ${state} ${zipCode}</div>
              </div>
            </div>
          </div>

          <div class="section">
            <h2>💼 Employment Information</h2>
            <div class="info-grid">
              <div class="info-item">
                <div class="info-label">Employment Status</div>
                <div class="info-value">${employmentStatus}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Employer</div>
                <div class="info-value">${employer}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Job Title</div>
                <div class="info-value">${jobTitle}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Monthly Income</div>
                <div class="info-value urgent">$${monthlyIncome}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Years Employed</div>
                <div class="info-value">${yearsEmployed}</div>
              </div>
            </div>
          </div>

          ${hasCoApplicant === 'yes' ? `
          <div class="section">
            <h2>👥 Co-Applicant Information</h2>
            <div class="info-grid">
              <div class="info-item">
                <div class="info-label">Co-Applicant Name</div>
                <div class="info-value">${coApplicantFirstName || 'N/A'} ${coApplicantLastName || 'N/A'}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Co-Applicant SSN</div>
                <div class="info-value">${applicationData.coApplicantSSN || 'N/A'}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Co-Applicant DOB</div>
                <div class="info-value">${applicationData.coApplicantDOB || 'N/A'}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Co-Applicant Phone</div>
                <div class="info-value">${applicationData.coApplicantPhone || 'N/A'}</div>
              </div>
            </div>
          </div>
          ` : ''}
        </div>

        <div class="footer">
          <p>This credit application was submitted through your Mint Lease website.</p>
          <p>Please review and respond promptly to maintain excellent customer service.</p>
        </div>
      </div>
    </body>
    </html>
  `

  // Send business notification
  await transporter.sendMail({
    from: `"Mint Lease" <${process.env.EMAIL_USER}>`,
    to: process.env.NOTIFICATION_EMAIL,
    subject: `🚗 New Credit Application - ${firstName} ${lastName} ($${monthlyIncome}/mo)`,
    html: businessEmailHtml,
  })

  // Send confirmation email to applicant
  const applicantEmailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Credit Application Received - Mint Lease</title>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f8f9fa; }
        .container { max-width: 600px; margin: 0 auto; background-color: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
        .header { background: linear-gradient(135deg, #047857 0%, #059669 100%); color: white; padding: 30px; text-align: center; }
        .header h1 { margin: 0; font-size: 28px; font-weight: 700; }
        .header p { margin: 10px 0 0 0; font-size: 16px; opacity: 0.9; }
        .content { padding: 40px 30px; }
        .success-banner { background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%); padding: 25px; border-radius: 10px; text-align: center; margin-bottom: 30px; border: 1px solid #047857; }
        .success-banner h2 { color: #047857; margin: 0 0 10px 0; font-size: 24px; }
        .success-banner p { color: #065f46; margin: 0; font-size: 16px; }
        .next-steps { background-color: #f9fafb; padding: 25px; border-radius: 10px; margin: 25px 0; }
        .next-steps h3 { color: #047857; margin: 0 0 15px 0; font-size: 20px; }
        .next-steps ul { margin: 0; padding-left: 20px; }
        .next-steps li { margin-bottom: 8px; color: #374151; }
        .contact-info { background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 20px; border-radius: 10px; margin: 20px 0; text-align: center; }
        .contact-info h3 { color: #92400e; margin: 0 0 10px 0; }
        .contact-info p { color: #92400e; margin: 5px 0; font-weight: 500; }
        .footer { background-color: #f9fafb; padding: 25px; text-align: center; border-top: 1px solid #e5e7eb; }
        .footer p { margin: 0; color: #6b7280; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>✅ Application Received!</h1>
          <p>Mint Lease Premium Auto Brokerage</p>
        </div>
        
        <div class="content">
          <div class="success-banner">
            <h2>Thank You, ${firstName}!</h2>
            <p>Your credit application has been successfully submitted and is now under review.</p>
          </div>

          <p>Dear ${firstName},</p>
          
          <p>We have received your credit application and our finance team is now reviewing your information. We appreciate your interest in working with Mint Lease for your automotive financing needs.</p>

          <div class="next-steps">
            <h3>📋 What Happens Next?</h3>
            <ul>
              <li><strong>Review Process:</strong> Our team will review your application within 24-48 hours</li>
              <li><strong>Credit Check:</strong> We'll run a soft credit inquiry to assess your eligibility</li>
              <li><strong>Verification:</strong> We may contact you or your employer to verify information</li>
              <li><strong>Decision:</strong> You'll receive our decision via email or phone call</li>
              <li><strong>Next Steps:</strong> If approved, we'll discuss vehicle options and terms</li>
            </ul>
          </div>

          <div class="contact-info">
            <h3>📞 Questions? We're Here to Help!</h3>
            <p>Email: mintleaseus@gmail.com</p>
            <p>Phone: Available in your dashboard</p>
            <p>Response Time: Within 4 hours during business hours</p>
          </div>

          <p>We understand that securing the right financing is crucial for your vehicle purchase. Our team is committed to finding the best solution for your needs.</p>
          
          <p>Thank you for choosing Mint Lease. We look forward to helping you drive away in your dream vehicle!</p>
          
          <p>Best regards,<br>
          <strong>The Mint Lease Finance Team</strong><br>
          Premium Auto Brokerage</p>
        </div>

        <div class="footer">
          <p>This is an automated confirmation. Please do not reply to this email.</p>
          <p>For questions, please contact us at mintleaseus@gmail.com</p>
        </div>
      </div>
    </body>
    </html>
  `

  // Send confirmation to applicant
  await transporter.sendMail({
    from: `"Mint Lease" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: '✅ Credit Application Received - Mint Lease',
    html: applicantEmailHtml,
  })
}

/**
 * Sends a simple notification email (for testing)
 */
export async function sendTestEmail(): Promise<void> {
  await transporter.sendMail({
    from: `"Mint Lease" <${process.env.EMAIL_USER}>`,
    to: process.env.NOTIFICATION_EMAIL,
    subject: 'Test Email - Mint Lease',
    html: '<h1>Test email from Mint Lease</h1><p>Email service is working correctly!</p>',
  })
} 