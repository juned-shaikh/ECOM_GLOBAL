# Complete EmailJS Setup Guide

## Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## Step 2: Create Email Service
1. Go to **Email Services** in your EmailJS dashboard
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions
5. **Copy the Service ID** (e.g., `service_abc123`)

## Step 3: Create Email Template
1. Go to **Email Templates**
2. Click **Create New Template**
3. Use this template content:

### Subject:
```
New Contact Form Submission from {{from_name}}
```

### Body:
```
You have received a new contact form submission:

Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
Company: {{company}}

Message:
{{message}}

---
This email was sent from your website contact form.
Reply to: {{reply_to}}
```

4. **Copy the Template ID** (e.g., `template_xyz789`)

## Step 4: Get Public Key
1. Go to **Account** → **General**
2. **Copy your Public Key** (e.g., `user_abcdef123`)

## Step 5: Update Environment Files
Replace the placeholder values in your environment files:

### src/environments/environment.ts
```typescript
export const environment = {
  production: false,
  emailjs: {
    serviceId: 'service_abc123',        // Your actual Service ID
    templateId: 'template_xyz789',      // Your actual Template ID  
    publicKey: 'user_abcdef123',        // Your actual Public Key
    recipientEmail: 'info@ecomglobaltech.com'
  }
};
```

### src/environments/environment.prod.ts
```typescript
export const environment = {
  production: true,
  emailjs: {
    serviceId: 'service_abc123',        // Same values as development
    templateId: 'template_xyz789',      
    publicKey: 'user_abcdef123',        
    recipientEmail: 'info@ecomglobaltech.com'
  }
};
```

## Step 6: Test the Setup
1. Update your environment files with real values
2. Build and deploy your application
3. Test the contact form
4. Check your email inbox for submissions

## Troubleshooting
- **Not receiving emails?** Check your spam folder
- **EmailJS errors?** Verify all IDs are correct
- **Template issues?** Make sure template variables match exactly
- **Service issues?** Ensure your email service is properly connected

## Alternative: Use Formspree
If EmailJS doesn't work, you can use Formspree:
1. Go to [https://formspree.io/](https://formspree.io/)
2. Create a free account
3. Create a new form
4. Copy the form endpoint
5. Update the contact service to use `submitToFormspree()`