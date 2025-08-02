# Quick Formspree Setup (5 minutes)

## Step 1: Create Formspree Account
1. Go to [https://formspree.io/](https://formspree.io/)
2. Sign up with your email
3. Verify your email address

## Step 2: Create New Form
1. Click "New Form"
2. Enter form name: "Contact Form"
3. Copy the form endpoint (looks like: `https://formspree.io/f/xpznvqko`)

## Step 3: Update Contact Component
Replace the service call in your contact component:

```typescript
// Change from:
this.contactService.submitContactForm(formData).subscribe({

// To:
this.contactService.submitToFormspree(formData).subscribe({
```

## Step 4: Update Contact Service
Update the Formspree endpoint in your contact service:

```typescript
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID'; // Replace with your actual endpoint
```

## That's it! 
Your contact form will now send emails to info@ecomglobaltech.com

## Benefits of Formspree:
- ✅ No complex setup
- ✅ Spam protection included
- ✅ Works immediately
- ✅ Free tier available
- ✅ Reliable delivery