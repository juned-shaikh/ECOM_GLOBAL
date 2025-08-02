# Email Setup Guide for Contact Form

## Option 1: EmailJS Setup (Recommended - No Backend Required)

EmailJS allows you to send emails directly from your frontend application without needing a backend server.

### Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### Step 2: Add Email Service
1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, Yahoo, etc.)
4. Follow the setup instructions for your provider
5. Note down your **Service ID**

### Step 3: Create Email Template
1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template structure:

```
Subject: New Contact Form Submission from {{from_name}}

Hello,

You have received a new contact form submission from your website:

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

4. Save the template and note down your **Template ID**

### Step 4: Get Public Key
1. Go to "Account" > "General"
2. Find your **Public Key**

### Step 5: Update Configuration
Replace the placeholder values in `src/app/services/contact.service.ts`:

```typescript
private readonly SERVICE_ID = 'your_actual_service_id';
private readonly TEMPLATE_ID = 'your_actual_template_id';
private readonly PUBLIC_KEY = 'your_actual_public_key';
```

Also update the recipient email:
```typescript
to_email: 'your-actual-email@example.com', // Replace with your email
```

### Step 6: Test the Form
1. Run your application: `ng serve`
2. Navigate to the contact page
3. Fill out and submit the form
4. Check your email inbox

---

## Option 2: Backend API Setup (Advanced)

If you prefer a backend solution, here are some options:

### A. Node.js/Express Backend
Create a simple Express server with nodemailer:

```javascript
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-app-password'
  }
});

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, company, message } = req.body;
    
    await transporter.sendMail({
      from: 'your-email@gmail.com',
      to: 'your-email@gmail.com',
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Company:</strong> ${company || 'Not provided'}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    });
    
    res.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to send email' });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

### B. Serverless Functions (Netlify/Vercel)
You can also use serverless functions for email handling.

---

## Option 3: Third-Party Form Services

### Formspree
1. Go to [https://formspree.io/](https://formspree.io/)
2. Create an account and get a form endpoint
3. Update the contact service to POST to the Formspree endpoint

### Netlify Forms
If hosting on Netlify, you can use their built-in form handling.

---

## Security Considerations

1. **Rate Limiting**: Implement rate limiting to prevent spam
2. **Validation**: Always validate form data on both client and server
3. **CAPTCHA**: Consider adding reCAPTCHA for additional security
4. **Email Sanitization**: Sanitize email content to prevent injection attacks

---

## Testing

1. Test with valid email addresses
2. Test with invalid data to ensure validation works
3. Test error scenarios (network issues, invalid configuration)
4. Test on different devices and browsers

---

## Troubleshooting

### Common Issues:
1. **EmailJS not working**: Check your service ID, template ID, and public key
2. **Emails not received**: Check spam folder, verify email service configuration
3. **CORS errors**: Ensure your domain is added to EmailJS allowed origins
4. **Template errors**: Verify template variable names match your code

### Debug Steps:
1. Check browser console for errors
2. Verify EmailJS dashboard for failed sends
3. Test with a simple template first
4. Ensure all configuration values are correct