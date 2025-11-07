# EmailJS Setup Guide for Contact Form

## Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (allows 200 emails/month)

## Step 2: Create Email Service
1. In EmailJS dashboard, click "Add New Service"
2. Choose your email provider (Gmail recommended)
3. Connect your email account (shariarhosain131529@gmail.com)
4. Note down the **Service ID** (e.g., `service_abc123`)

## Step 3: Create Email Template
1. Go to "Email Templates" in EmailJS dashboard
2. Click "Create New Template"
3. Use this template content:

```
Subject: New Portfolio Contact Message

From: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
This message was sent through your portfolio contact form.
```

4. Note down the **Template ID** (e.g., `template_xyz789`)

## Step 4: Get Public Key
1. Go to "Account" → "General" in EmailJS dashboard
2. Copy the **Public Key** (e.g., `user_abc123xyz`)

## Step 5: Configure Environment Variables
1. Create a `.env` file in your project root
2. Add your credentials:

```env
REACT_APP_EMAILJS_SERVICE_ID=your_actual_service_id
REACT_APP_EMAILJS_TEMPLATE_ID=your_actual_template_id
REACT_APP_EMAILJS_PUBLIC_KEY=your_actual_public_key
```

## Step 6: Test the Form
1. Start your development server: `npm start`
2. Go to the contact section
3. Fill out and submit the form
4. Check your email inbox for the message

## Troubleshooting
- Make sure your `.env` file is in the project root
- Restart the development server after adding environment variables
- Check browser console for any error messages
- Verify your EmailJS template has the correct variable names

## Security Notes
- Never commit your actual credentials to version control
- The `.env` file should be added to `.gitignore`
- EmailJS public key is safe to use in frontend code