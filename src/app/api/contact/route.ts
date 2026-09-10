import { eq } from 'drizzle-orm'
import { contactFormSchema } from '@/lib/validators'
import { sendContactAdminEmail, sendContactAcknowledgment, sendWelcomeEmail } from '@/lib/email'
import { db, schema } from '@/lib/db'
import { apiError, apiSuccess } from '@/lib/api-helpers'

const rateLimit = new Map<string, number>()
const RATE_LIMIT_WINDOW = 15 * 60 * 1000

export async function POST(request: Request) {
  try {
    const body = await request.json()

    if (body.website) {
      return apiSuccess({ success: true })
    }

    const ip = request.headers.get('x-forwarded-for') || 'unknown'
    const lastSubmit = rateLimit.get(ip)
    if (lastSubmit && Date.now() - lastSubmit < RATE_LIMIT_WINDOW) {
      return apiError('Too many requests. Please try again later.', 429)
    }

    const result = contactFormSchema.safeParse(body)
    if (!result.success) {
      return apiError('Invalid input', 400)
    }

    const { name, email, subject, message } = result.data

    await db.insert(schema.contactMessages).values({
      name,
      email,
      subject,
      message,
    })

    const unreadResult = await db
      .select()
      .from(schema.contactMessages)
      .where(eq(schema.contactMessages.isRead, false))

    const emailResults = await Promise.allSettled([
      sendContactAdminEmail({ name, email, subject, message }),
      sendContactAcknowledgment({ name, email }),
      sendWelcomeEmail({ name, email }),
    ])

    emailResults.forEach((result, i) => {
      if (result.status === 'rejected') {
        console.error(`Email ${i} failed:`, result.reason)
      } else if (result.value.devMode) {
        console.log(`Email ${i}: dev mode (not sent)`)
      } else if (!result.value.success) {
        console.error(`Email ${i} failed:`, result.value.error)
      }
    })

    rateLimit.set(ip, Date.now())

    return apiSuccess({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return apiError('Internal server error', 500)
  }
}
