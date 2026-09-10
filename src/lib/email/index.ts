const SITE_NAME = 'Muhammad Taha Portfolio'
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
const REPLY_TO = 'muhammadtahafarooq22@gmail.com'

function getApiKey(): string | null {
  return process.env.BREVO_API_KEY || null
}

function isDevMode(): boolean {
  return !process.env.BREVO_API_KEY || process.env.EMAIL_DEV_MODE === 'true'
}

function getFromAddress(): string {
  return process.env.BREVO_SENDER_EMAIL || REPLY_TO
}

function getFromName(): string {
  return process.env.BREVO_SENDER_NAME || SITE_NAME
}

function getContactEmail(): string {
  return process.env.CONTACT_EMAIL || REPLY_TO
}

// ---------------------------------------------------------------------------
// Base HTML wrapper
// ---------------------------------------------------------------------------

function wrapHtml(title: string, body: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <style>
    body { margin: 0; padding: 0; background: #0B0A09; font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; color: #F1EDE5; }
    .container { max-width: 560px; margin: 0 auto; padding: 48px 24px; }
    .logo { font-size: 20px; font-weight: 700; color: #D6A85F; margin-bottom: 32px; }
    h1 { font-size: 24px; font-weight: 600; margin: 0 0 16px; color: #F1EDE5; }
    p { font-size: 15px; line-height: 1.6; color: #B8B0A4; margin: 0 0 16px; }
    .label { font-size: 11px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #756E64; margin-bottom: 4px; }
    .value { font-size: 14px; color: #F1EDE5; margin-bottom: 20px; }
    .divider { border: none; border-top: 1px solid #302B25; margin: 28px 0; }
    .btn { display: inline-block; background: #D6A85F; color: #0B0A09; text-decoration: none; font-size: 13px; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; padding: 14px 28px; border-radius: 2px; }
    .footer { font-size: 12px; color: #756E64; margin-top: 32px; }
    .footer a { color: #D6A85F; text-decoration: none; }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo">${SITE_NAME}</div>
    ${body}
    <hr class="divider" />
    <div class="footer">
      <p>${SITE_NAME} &mdash; <a href="${SITE_URL}">${SITE_URL}</a></p>
      <p style="margin-top: 8px;">Reply to this email to reach Muhammad Taha directly.</p>
    </div>
  </div>
</body>
</html>`
}

// ---------------------------------------------------------------------------
// Email result type
// ---------------------------------------------------------------------------

export interface EmailResult {
  success: boolean
  error?: string
  devMode?: boolean
}

// ---------------------------------------------------------------------------
// Core send function via Brevo REST API
// ---------------------------------------------------------------------------

interface BrevoPayload {
  sender: { name: string; email: string }
  to: { email: string; name?: string }[]
  subject: string
  htmlContent: string
  replyTo?: { email: string; name?: string }
}

async function send(to: string, subject: string, html: string): Promise<EmailResult> {
  if (isDevMode()) {
    console.log('\n📧 [DEV EMAIL] Would send email:')
    console.log(`   From: ${getFromName()} <${getFromAddress()}>`)
    console.log(`   Reply-To: ${REPLY_TO}`)
    console.log(`   To: ${to}`)
    console.log(`   Subject: ${subject}`)
    console.log(`   HTML length: ${html.length} chars`)
    console.log('   ✅ Dev mode — email not actually sent\n')
    return { success: true, devMode: true }
  }

  const apiKey = getApiKey()
  if (!apiKey) {
    console.error('Email disabled: BREVO_API_KEY not set')
    return { success: false, error: 'Email service not configured' }
  }

  const payload: BrevoPayload = {
    sender: { name: getFromName(), email: getFromAddress() },
    to: [{ email: to }],
    subject,
    htmlContent: html,
    replyTo: { email: REPLY_TO, name: getFromName() },
  }

  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey,
        accept: 'application/json',
      },
      body: JSON.stringify(payload),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('Brevo API error:', response.status, data)
      return {
        success: false,
        error: data.message || `Email delivery failed (${response.status})`,
      }
    }

    return { success: true }
  } catch (err) {
    console.error('Email send exception:', err)
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Unknown email error',
    }
  }
}

// ---------------------------------------------------------------------------
// Template: Contact Form — Admin Notification
// ---------------------------------------------------------------------------

interface ContactAdminEmailProps {
  name: string
  email: string
  subject?: string
  message: string
}

export async function sendContactAdminEmail({
  name,
  email,
  subject,
  message,
}: ContactAdminEmailProps): Promise<EmailResult> {
  const adminEmail = getContactEmail()

  const body = `
    <h1>New Contact Message</h1>
    <p>Someone submitted a message through your portfolio contact form.</p>

    <div class="label">From</div>
    <div class="value">${name} &lt;${email}&gt;</div>

    ${subject ? `<div class="label">Subject</div><div class="value">${subject}</div>` : ''}

    <div class="label">Message</div>
    <div class="value" style="white-space: pre-wrap;">${message.replace(/\n/g, '<br>')}</div>

    <a href="${SITE_URL}/admin/messages" class="btn">View in Admin</a>
  `

  return send(
    adminEmail,
    subject || `New contact from ${name}`,
    wrapHtml(`New contact from ${name}`, body)
  )
}

// ---------------------------------------------------------------------------
// Template: Contact Form — Sender Acknowledgment
// ---------------------------------------------------------------------------

interface ContactAckEmailProps {
  name: string
  email: string
}

export async function sendContactAcknowledgment({
  name,
  email,
}: ContactAckEmailProps): Promise<EmailResult> {
  const body = `
    <h1>Message Received</h1>
    <p>Hi ${name},</p>
    <p>Thank you for reaching out. I've received your message and will get back to you within 24–48 hours.</p>
    <p>In the meantime, feel free to explore my work:</p>
    <a href="${SITE_URL}/projects" class="btn">View Projects</a>

    <div class="footer">
      <p>This is an automated acknowledgment. You don't need to reply to this email.</p>
    </div>
  `

  return send(email, 'Message received — Muhammad Taha', wrapHtml('Message Received', body))
}

// ---------------------------------------------------------------------------
// Template: Welcome Email (first-time contact)
// ---------------------------------------------------------------------------

interface WelcomeEmailProps {
  name: string
  email: string
}

export async function sendWelcomeEmail({ name, email }: WelcomeEmailProps): Promise<EmailResult> {
  const body = `
    <h1>Welcome, ${name}!</h1>
    <p>I'm Muhammad Taha — a Full-Stack + AI Developer building innovative digital experiences.</p>
    <p>Thanks for connecting through my portfolio. Whether you're here to explore projects, discuss a collaboration, or just say hello — I appreciate you taking the time.</p>

    <div class="label">Quick Links</div>
    <div class="value" style="margin-bottom: 8px;">
      <a href="${SITE_URL}/projects" style="color: #D6A85F; text-decoration: none;">→ View Projects</a>
    </div>
    <div class="value" style="margin-bottom: 8px;">
      <a href="${SITE_URL}/about" style="color: #D6A85F; text-decoration: none;">→ About Me</a>
    </div>
    <div class="value">
      <a href="${SITE_URL}/contact" style="color: #D6A85F; text-decoration: none;">→ Contact Again</a>
    </div>

    <div class="footer">
      <p>Find me on <a href="https://github.com/muhammadtahafarooq">GitHub</a> and <a href="https://linkedin.com/in/muhammadtaha">LinkedIn</a>.</p>
    </div>
  `

  return send(email, `Welcome — ${SITE_NAME}`, wrapHtml('Welcome', body))
}

// ---------------------------------------------------------------------------
// Template: Password Reset
// ---------------------------------------------------------------------------

interface PasswordResetEmailProps {
  email: string
  resetToken: string
}

export async function sendPasswordResetEmail({
  email,
  resetToken,
}: PasswordResetEmailProps): Promise<EmailResult> {
  const resetUrl = `${SITE_URL}/admin/reset-password?token=${resetToken}`

  const body = `
    <h1>Password Reset</h1>
    <p>You requested a password reset for your admin account.</p>
    <p>Click the button below to set a new password. This link expires in 1 hour.</p>
    <a href="${resetUrl}" class="btn">Reset Password</a>
    <p style="font-size: 13px; color: #756E64; margin-top: 16px;">
      If you didn't request this, you can safely ignore this email. Your password will remain unchanged.
    </p>
  `

  return send(email, 'Password Reset — Muhammad Taha Portfolio', wrapHtml('Password Reset', body))
}

// ---------------------------------------------------------------------------
// Template: Admin New Message Notification (compact)
// ---------------------------------------------------------------------------

interface AdminNotificationProps {
  name: string
  email: string
  messageCount: number
}

export async function sendAdminNewMessageNotification({
  name,
  email,
  messageCount,
}: AdminNotificationProps): Promise<EmailResult> {
  const adminEmail = getContactEmail()

  const body = `
    <h1>New Message Alert</h1>
    <p>You have a new unread message from <strong>${name}</strong> (${email}).</p>
    <p>Total unread messages: <strong>${messageCount}</strong></p>
    <a href="${SITE_URL}/admin/messages" class="btn">View Messages</a>
  `

  return send(adminEmail, `[${SITE_NAME}] New message from ${name}`, wrapHtml('New Message', body))
}
