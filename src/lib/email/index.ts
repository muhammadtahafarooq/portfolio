import { Resend } from 'resend'

function getResend() {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    throw new Error('RESEND_API_KEY environment variable is not set')
  }
  return new Resend(apiKey)
}

interface SendContactEmailProps {
  name: string
  email: string
  subject?: string
  message: string
}

export async function sendContactEmail({ name, email, subject, message }: SendContactEmailProps) {
  const contactEmail = process.env.CONTACT_EMAIL

  if (!contactEmail) {
    throw new Error('CONTACT_EMAIL environment variable is not set')
  }

  try {
    const resend = getResend()
    await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>',
      to: contactEmail,
      subject: subject || `New contact from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${subject ? `<p><strong>Subject:</strong> ${subject}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    })

    return { success: true }
  } catch (error) {
    console.error('Failed to send email:', error)
    return { success: false, error: 'Failed to send email' }
  }
}
