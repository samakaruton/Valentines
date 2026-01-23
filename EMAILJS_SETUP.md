# EmailJS Setup Guide

To enable email notifications, you need to set up an EmailJS account and configure the service.

## Steps to Set Up EmailJS:

1. **Create an EmailJS Account**
   - Go to https://www.emailjs.com/
   - Sign up for a free account

2. **Create an Email Service**
   - In the EmailJS dashboard, go to "Email Services"
   - Click "Add New Service"
   - Choose your email provider (Gmail, Outlook, etc.)
   - Follow the setup instructions

3. **Create an Email Template**
   - Go to "Email Templates" in the dashboard
   - Click "Create New Template"
   - Use this template structure:
     ```
     Subject: {{subject}}
     
     To: {{to_name}} <{{to_email}}>
     
     {{message}}
     ```
   - **IMPORTANT**: In the "To" field, make sure you use `{{to_email}}` or `{{user_email}}` variable
   - The "To" field should NOT be a static email address - it must use a template variable
   - Save the template and note the Template ID

4. **Enable Dynamic Recipients in Service Settings**
   - Go back to "Email Services"
   - Click on your service to edit it
   - Look for "Allow Dynamic Recipients" or similar setting
   - **Enable this option** - this is required to send emails to different recipients
   - Save the service settings

5. **Get Your Public Key**
   - Go to "Account" → "General"
   - Copy your Public Key

6. **Update the Code**
   - Open `src/App.tsx`
   - Find the `useEffect` hook and replace `YOUR_PUBLIC_KEY` with your actual public key
   - Find the `triggerFireworks` function and replace:
     - `YOUR_SERVICE_ID` with your Email Service ID
     - `YOUR_TEMPLATE_ID` with your Email Template ID

## Troubleshooting

### Error: "The recipients address is corrupted" (422 Error)

This error occurs when:
1. **Dynamic recipients not enabled**: Make sure "Allow Dynamic Recipients" is enabled in your EmailJS service settings
2. **Template "To" field is wrong**: The "To" field in your template must use a variable like `{{to_email}}` or `{{user_email}}`, NOT a static email address
3. **Parameter name mismatch**: Make sure the parameter name in your code matches the variable name in your template

**Fix Steps:**
1. Go to EmailJS Dashboard → Email Services → Edit your service
2. Enable "Allow Dynamic Recipients" option
3. Go to Email Templates → Edit your template
4. In the "To" field, use: `{{to_email}}` or `{{user_email}}`
5. Save both the service and template

## Alternative: Using mailto (No Setup Required)

If you don't want to set up EmailJS, the code will automatically fall back to opening the user's default email client with a mailto link when EmailJS is not configured.

## Example Configuration:

```typescript
// In useEffect:
emailjs.init({
  publicKey: 'abc123xyz', // Your actual public key
})

// In triggerFireworks:
const serviceId = 'service_abc123' // Your service ID
const templateId = 'template_xyz789' // Your template ID
```
