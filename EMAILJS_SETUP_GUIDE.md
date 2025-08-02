# EmailJS Setup Guide for Contact Form

This guide will help you configure EmailJS to receive contact form submissions at info@ecomglobaltech.com.

## Step 1: Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account (allows 200 emails/month)
3. Verify your email address

## Step 2: Add Email Service

1. In your EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider:
   - **Gmail** (recommended for business)
   - **Outlook/Hotmail**
   - **Yahoo**
   - Or use **SMTP** for custom email servers

4. For Gmail:
   - Click **Connect Account**
   - Sign in with your Gmail account (info@ecomglobaltech.com)
   - Grant permissions
   - Your Service ID will be generated (e.g., `service_abc123`)

## Step 3: Create Email Template

1. Go to **Email Templates**
2. Click **Create New Template**
3. Use this template content:

**Subject:** New Contact Form Submission from {{from_name}}

**Body:**
```
You have received a new contact form submission:

Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
Company: {{company}}

Message:
{{message}}

---
This message was sent from your website contact form.
Reply directly to this email to respond to {{from_name}}.
```

4. Set template variables:
   - `from_name`
   - `from_email` 
   - `phone`
   - `company`
   - `message`
   - `to_email`
   - `reply_to`

5. Save the template and note the Template ID (e.g., `template_xyz789`)

## Step 4: Get Your Public Key

1. Go to **Account** → **General**
2. Find your **Public Key** (e.g., `user_abcdefghijk123`)

## Step 5: Update Environment Files

Replace the placeholder values in your environment files:

**src/environments/environment.ts:**
```typescript
export const environment = {
  production: false,
  emailjs: {
    serviceId: 'service_abc123',           // Your actual Service ID
    templateId: 'template_xyz789',         // Your actual Template ID  
    publicKey: 'user_abcdefghijk123',      // Your actual Public Key
    recipientEmail: 'info@ecomglobaltech.com'
  }
};
```

**src/environments/environment.prod.ts:**
```typescript
export const environment = {
  production: true,
  emailjs: {
    serviceId: 'service_abc123',           // Same values as development
    templateId: 'template_xyz789',         
    publicKey: 'user_abcdefghijk123',      
    recipientEmail: 'info@ecomglobaltech.com'
  }
};
```

## Step 6: Test the Configuration

1. Build and serve your application
2. Fill out the contact form on your website
3. Check your inbox at info@ecomglobaltech.com
4. You should receive an email with the form submission

## Troubleshooting

### Common Issues:

1. **EmailJS not loading:**
   - Check that the EmailJS script is included in index.html
   - Verify internet connection

2. **Email not sending:**
   - Check browser console for errors
   - Verify all IDs are correct (no typos)
   - Ensure email service is properly connected

3. **Emails going to spam:**
   - Add your domain to EmailJS whitelist
   - Check spam folder initially
   - Consider using a custom domain email

### Testing in Development:

The service includes fallback behavior - if EmailJS isn't configured, it will show a mock success message. Once properly configured, real emails will be sent.

## Security Notes

- Your Public Key is safe to expose in client-side code
- Never expose your Private Key
- EmailJS handles the actual email sending securely
- Consider rate limiting for production use

## Alternative: Backend API

If you prefer a backend solution, the service includes a `submitContactFormToBackend()` method that you can implement with your own API endpoint.