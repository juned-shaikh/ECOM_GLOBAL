# Contact Form Alternatives to EmailJS

Here are several other ways to handle contact form submissions for your website:

## 1. Netlify Forms (Recommended - FREE)

Since you're using Netlify, this is the easiest option:

### Setup:
1. Add `netlify` attribute to your form
2. Add a hidden input with `name="form-name"`
3. Set form method to POST

### Implementation:
Update your contact component to include a static HTML form for Netlify:

```html
<!-- Add this form alongside your Angular reactive form -->
<form name="contact" netlify netlify-honeypot="bot-field" hidden>
  <input type="text" name="name" />
  <input type="email" name="email" />
  <input type="tel" name="phone" />
  <input type="text" name="company" />
  <textarea name="message"></textarea>
</form>
```

### Service Method:
```typescript
submitToNetlify(formData: ContactForm): Observable<ContactSubmissionResponse> {
  const formBody = new FormData();
  formBody.append('form-name', 'contact');
  formBody.append('name', formData.name);
  formBody.append('email', formData.email);
  formBody.append('phone', formData.phone || '');
  formBody.append('company', formData.company || '');
  formBody.append('message', formData.message);

  return from(fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(formBody as any).toString()
  })).pipe(
    map(() => ({
      success: true,
      message: 'Thank you for your message! We will get back to you within 24 hours.'
    })),
    catchError(() => of({
      success: false,
      message: 'Sorry, there was an error sending your message. Please try again.'
    }))
  );
}
```

## 2. Formspree (FREE tier available)

Simple form backend service:

### Setup:
1. Go to [Formspree.io](https://formspree.io)
2. Create account and get your form endpoint
3. Update your service

### Service Method:
```typescript
private readonly FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';

submitToFormspree(formData: ContactForm): Observable<ContactSubmissionResponse> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  return this.http.post(this.FORMSPREE_ENDPOINT, formData, { headers }).pipe(
    map(() => ({
      success: true,
      message: 'Thank you for your message! We will get back to you within 24 hours.'
    })),
    catchError(() => of({
      success: false,
      message: 'Sorry, there was an error sending your message. Please try again.'
    }))
  );
}
```

## 3. Web3Forms (FREE)

No registration required:

### Service Method:
```typescript
submitToWeb3Forms(formData: ContactForm): Observable<ContactSubmissionResponse> {
  const formData3 = new FormData();
  formData3.append('access_key', 'YOUR_ACCESS_KEY'); // Get from web3forms.com
  formData3.append('name', formData.name);
  formData3.append('email', formData.email);
  formData3.append('phone', formData.phone || '');
  formData3.append('company', formData.company || '');
  formData3.append('message', formData.message);

  return this.http.post<any>('https://api.web3forms.com/submit', formData3).pipe(
    map((response) => ({
      success: response.success,
      message: response.success 
        ? 'Thank you for your message! We will get back to you within 24 hours.'
        : 'Sorry, there was an error sending your message. Please try again.'
    })),
    catchError(() => of({
      success: false,
      message: 'Sorry, there was an error sending your message. Please try again.'
    }))
  );
}
```

## 4. Simple Backend API (Node.js/Express)

Create your own backend:

### Backend (server.js):
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
      from: email,
      to: 'info@ecomglobaltech.com',
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
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(3000);
```

## 5. Firebase Functions (Google Cloud)

Serverless solution:

### Setup:
```bash
npm install -g firebase-tools
firebase init functions
```

### Function:
```javascript
const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

exports.sendContactEmail = functions.https.onRequest(async (req, res) => {
  // CORS
  res.set('Access-Control-Allow-Origin', '*');
  
  if (req.method === 'OPTIONS') {
    res.set('Access-Control-Allow-Methods', 'POST');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.status(204).send('');
    return;
  }

  try {
    const { name, email, phone, company, message } = req.body;
    
    // Configure your email transporter
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: functions.config().email.user,
        pass: functions.config().email.pass
      }
    });

    await transporter.sendMail({
      from: email,
      to: 'info@ecomglobaltech.com',
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
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
```

## Recommendation

For your use case, I recommend **Netlify Forms** because:
- ✅ FREE (100 submissions/month)
- ✅ No external dependencies
- ✅ Built into your hosting platform
- ✅ Automatic spam protection
- ✅ Form submissions appear in Netlify dashboard
- ✅ Can set up email notifications

Would you like me to implement the Netlify Forms solution for you?