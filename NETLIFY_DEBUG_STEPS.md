# Netlify Forms Debug Steps

## If Form Still Doesn't Work After Deploy:

### 1. Check Browser Network Tab
1. Open your live site
2. Press F12 (Developer Tools)
3. Go to **Network** tab
4. Submit the contact form
5. Look for a POST request to `/`
6. Check the response:
   - **200 OK**: Form submitted successfully
   - **404 Not Found**: Form not detected by Netlify
   - **405 Method Not Allowed**: Wrong submission method

### 2. Check Netlify Build Logs
1. Go to Netlify Dashboard
2. Click on your site
3. Go to **Deploys**
4. Click on the latest deploy
5. Look for messages like:
   ```
   Forms detected in HTML files:
   - contact
   ```

### 3. Check Form in Netlify Dashboard
1. Netlify Dashboard → Your Site
2. Go to **Forms** section
3. You should see "contact" form listed
4. If not listed, the form wasn't detected during build

### 4. Manual Form Test
Try submitting directly to Netlify:
```bash
curl -X POST https://your-site.netlify.app/ \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "form-name=contact&name=Test&email=test@example.com&message=Test message"
```

## Common Solutions:

### Solution 1: Add Static HTML Form
Create `public/contact-static.html`:
```html
<!DOCTYPE html>
<html>
<body>
    <form name="contact" netlify netlify-honeypot="bot-field" hidden>
        <input type="hidden" name="form-name" value="contact" />
        <input type="text" name="name" />
        <input type="email" name="email" />
        <input type="text" name="countryCode" />
        <input type="tel" name="phone" />
        <input type="text" name="company" />
        <textarea name="message"></textarea>
        <p style="display: none;">
            <label>Don't fill this out: <input name="bot-field" /></label>
        </p>
    </form>
</body>
</html>
```

### Solution 2: Use Netlify Functions
Create `netlify/functions/submit-form.js`:
```javascript
exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const data = JSON.parse(event.body);
    
    // Here you can:
    // 1. Send email using nodemailer
    // 2. Save to database
    // 3. Send to external service
    
    console.log('Form submission:', data);
    
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true, 
        message: 'Form submitted successfully' 
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        success: false, 
        message: 'Server error' 
      })
    };
  }
};
```

Then update your service:
```typescript
submitToNetlify(formData: ContactForm): Observable<ContactSubmissionResponse> {
  return from(
    fetch('/.netlify/functions/submit-form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
  ).pipe(
    map(() => ({
      success: true,
      message: 'Thank you for your message! We will get back to you within 24 hours.'
    })),
    catchError((error) => {
      console.error('Form submission failed:', error);
      return of({
        success: false,
        message: 'Sorry, there was an error sending your message. Please try again.'
      });
    })
  );
}
```

## If All Else Fails:
Switch to EmailJS or Formspree - they're more reliable for Angular SPAs!