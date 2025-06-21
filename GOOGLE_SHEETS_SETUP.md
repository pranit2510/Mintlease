# Google Sheets Integration Setup Guide

This guide will help you set up Google Sheets integration to automatically save contact form submissions from your Mint Lease website.

## Step 1: Create a Google Sheets Document

1. Go to [Google Sheets](https://sheets.google.com)
2. Click "Blank" to create a new spreadsheet
3. Name it "Mint Lease Leads" or similar
4. Copy the spreadsheet ID from the URL (e.g., `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`)

## Step 2: Set Up Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select an existing one
3. Enable the Google Sheets API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google Sheets API"
   - Click on it and press "Enable"

## Step 3: Create a Service Account

1. In Google Cloud Console, go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "Service Account"
3. Enter a name (e.g., "mint-lease-sheets")
4. Click "Create and Continue"
5. Skip the optional steps and click "Done"

## Step 4: Generate Service Account Key

1. Click on the service account you just created
2. Go to the "Keys" tab
3. Click "Add Key" > "Create New Key"
4. Choose "JSON" format
5. Download the JSON file and keep it secure

## Step 5: Share Google Sheets with Service Account

1. Open your Google Sheets document
2. Click the "Share" button
3. Add the service account email (found in the JSON file as `client_email`)
4. Give it "Editor" permissions
5. Click "Send"

## Step 6: Set Up Environment Variables

1. Create a `.env.local` file in your project root
2. Add the following variables from your JSON file:

```env
GOOGLE_SHEETS_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEETS_SPREADSHEET_ID=your-spreadsheet-id-here
```

**Important Notes:**
- Replace `your-service-account@your-project.iam.gserviceaccount.com` with the `client_email` from your JSON file
- Replace `YOUR_PRIVATE_KEY_HERE` with the `private_key` from your JSON file (keep the quotes and newlines)
- Replace `your-spreadsheet-id-here` with your actual spreadsheet ID

## Step 7: Test the Integration

1. Restart your development server:
   ```bash
   npm run dev
   ```

2. Go to your lead form at `http://localhost:3000/lead`

3. Fill out and submit the form

4. Check your Google Sheets document - you should see a new row with the form data

## Expected Google Sheets Format

The integration will automatically create headers and organize data as follows:

| Timestamp | First Name | Last Name | Email | Phone | Car Brand | Car Trim | Credit Score | Timeline | Status |
|-----------|------------|-----------|--------|--------|-----------|----------|--------------|----------|---------|
| 1/15/2025 2:30:15 PM | John | Doe | john@email.com | (555) 123-4567 | BMW | X5 | Excellent | ASAP | New Lead |

## Troubleshooting

### Common Issues:

1. **"Server configuration error"**
   - Check that all environment variables are set correctly
   - Ensure the private key includes newline characters (`\n`)

2. **"Permission denied"**
   - Make sure you shared the spreadsheet with the service account email
   - Verify the service account has "Editor" permissions

3. **"Spreadsheet not found"**
   - Double-check the spreadsheet ID in your environment variables
   - Ensure the spreadsheet exists and is accessible

4. **"Invalid credentials"**
   - Verify the client email and private key are correct
   - Make sure the private key is wrapped in quotes

### Testing API Endpoint

You can test the API endpoint directly:

```bash
curl -X GET http://localhost:3000/api/submit-lead
```

Should return:
```json
{
  "status": "API endpoint is working",
  "timestamp": "2025-01-15T19:30:15.123Z"
}
```

## Security Best Practices

1. **Never commit `.env.local` to version control**
2. **Keep your service account JSON file secure**
3. **Use environment variables for all sensitive data**
4. **Regularly rotate service account keys**
5. **Monitor access logs in Google Cloud Console**

## Production Deployment

For production deployment (Vercel, Netlify, etc.):

1. Add the environment variables to your hosting platform
2. For the private key, copy it exactly as it appears in the JSON file
3. Some platforms may require escaping newlines differently
4. Test the form submission in production

## Features Included

✅ **Automatic Headers**: Creates column headers automatically
✅ **Timestamp**: Adds submission timestamp
✅ **Data Validation**: Validates form data before saving
✅ **Error Handling**: Graceful error handling and user feedback
✅ **Loading States**: Shows loading spinner during submission
✅ **Success Messages**: Confirms successful submission
✅ **Credit Score Filtering**: Only accepts Good/Excellent credit scores

## Next Steps

Consider adding:
- Email notifications when new leads are submitted
- Lead scoring and categorization
- CRM integration (HubSpot, Salesforce)
- Analytics tracking
- A/B testing for form optimization

## Support

If you encounter issues:
1. Check the browser console for errors
2. Review the server logs
3. Verify all environment variables are set
4. Test with a simple form submission first 