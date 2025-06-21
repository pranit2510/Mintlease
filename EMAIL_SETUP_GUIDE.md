# Email Notifications Setup Guide for Credit Applications

This guide will help you set up email notifications for your Mint Lease credit application form.

## 📧 **Gmail Setup (Recommended)**

### Step 1: Enable 2-Factor Authentication
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Under "Signing in to Google", click **"2-Step Verification"**
3. Follow the setup process to enable 2FA

### Step 2: Generate App Password
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Under "Signing in to Google", click **"App passwords"**
3. Select app: **"Mail"**
4. Select device: **"Other (custom name)"**
5. Enter name: **"Mint Lease Website"**
6. Click **"Generate"**
7. **Copy the 16-character password** (you'll need this for EMAIL_PASSWORD)

### Step 3: Update Environment Variables

Add these to your `.env.local` file:

```env
# Email Configuration for Credit Application Notifications
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASSWORD=your-16-character-app-password
NOTIFICATION_EMAIL=your-business-email@gmail.com
```

**Replace with your actual values:**
- `EMAIL_USER`: Your Gmail address
- `EMAIL_PASSWORD`: The 16-character app password from Step 2
- `NOTIFICATION_EMAIL`: Where you want to receive credit application emails

## 🔧 **Alternative Email Providers**

### For Outlook/Hotmail:
```env
EMAIL_USER=your-email@outlook.com
EMAIL_PASSWORD=your-password
NOTIFICATION_EMAIL=your-business-email@outlook.com
```

### For Yahoo:
```env
EMAIL_USER=your-email@yahoo.com
EMAIL_PASSWORD=your-app-password
NOTIFICATION_EMAIL=your-business-email@yahoo.com
```

### For Custom SMTP:
Update `src/lib/emailService.ts`:
```typescript
this.transporter = nodemailer.createTransporter({
  host: 'your-smtp-server.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
})
```

## 🧪 **Testing the Setup**

### Step 1: Test API Endpoint
```bash
curl http://localhost:3000/api/submit-credit-application
```

Should return:
```json
{
  "status": "Credit application API endpoint is working",
  "emailConfigured": true,
  "notificationEmail": "your-email@gmail.com"
}
```

### Step 2: Test Form Submission
1. Go to `http://localhost:3000/credit-application`
2. Fill out the multi-step form completely
3. Submit the application
4. Check your email for two messages:
   - **Business notification** (detailed application data)
   - **Applicant confirmation** (sent to the applicant)

## 📬 **What You'll Receive**

### Business Notification Email:
- **Subject**: 🚗 New Credit Application - [Name]
- **Content**: Beautifully formatted HTML email with:
  - Complete personal information
  - Address and residence details
  - Employment information
  - Co-applicant details (if applicable)
  - Recommended next steps

### Applicant Confirmation Email:
- **Subject**: Credit Application Received - Mint Lease
- **Content**: Professional confirmation with next steps

## 🎨 **Email Features**

✅ **Professional HTML Design** - Matches your brand colors
✅ **Mobile Responsive** - Looks great on all devices
✅ **Complete Data Capture** - All form fields included
✅ **Security Conscious** - SSN partially masked
✅ **Action Items** - Clear next steps for follow-up
✅ **Dual Notifications** - Business and applicant emails
✅ **Google Sheets Integration** - Also saves to spreadsheet

## 🔒 **Security Best Practices**

1. **Never commit `.env.local`** to version control
2. **Use App Passwords** instead of main account passwords
3. **Regularly rotate email passwords**
4. **Monitor email account for suspicious activity**
5. **Use dedicated business email** for notifications

## 🚨 **Troubleshooting**

### "Email configuration error"
- Check that all three email environment variables are set
- Verify EMAIL_USER and EMAIL_PASSWORD are correct
- Restart your development server after adding variables

### "Authentication failed"
- For Gmail: Make sure you're using an App Password, not your regular password
- For Gmail: Ensure 2-Factor Authentication is enabled
- Check if email provider requires "Less secure app access"

### "Connection timeout"
- Check your internet connection
- Verify SMTP settings for your email provider
- Try a different email service

### No emails received
- Check spam/junk folder
- Verify NOTIFICATION_EMAIL is correct
- Check server logs for error messages
- Test with a simple email service first

## 📊 **Email Analytics**

Consider adding:
- **Email tracking** - Know when emails are opened
- **Click tracking** - Track engagement with links
- **A/B testing** - Test different email templates
- **Integration with CRM** - Automatically create leads

## 🚀 **Production Deployment**

For production (Vercel, Netlify, etc.):

1. **Add environment variables** to your hosting platform
2. **Test email functionality** in staging environment
3. **Monitor email delivery** rates
4. **Set up email monitoring** (bounce/complaint handling)

## 📞 **Support**

If you need help:
1. Check the server console for error messages
2. Verify all environment variables are set correctly
3. Test with a simple email first
4. Check your email provider's documentation

## 🎯 **Next Steps**

Once email notifications are working:
- Set up automated follow-up sequences
- Integrate with your CRM system
- Add SMS notifications for urgent applications
- Create email templates for different application statuses
- Set up automated credit score checks

## ✅ **Verification Checklist**

- [ ] Gmail 2FA enabled
- [ ] App password generated
- [ ] Environment variables added to `.env.local`
- [ ] Development server restarted
- [ ] API endpoint test successful
- [ ] Credit application form submitted
- [ ] Business notification email received
- [ ] Applicant confirmation email received
- [ ] Email formatting looks professional
- [ ] All form data captured correctly 