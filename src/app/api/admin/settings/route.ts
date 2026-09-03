import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db, schema } from '@/lib/db'
import { eq } from 'drizzle-orm'

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const settings = await db.select().from(schema.siteSettings).limit(1)
  return NextResponse.json(settings[0] || null)
}

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()

    // Upsert: update if exists, insert if not
    const existing = await db.select().from(schema.siteSettings).limit(1)

    if (existing.length > 0) {
      const result = await db
        .update(schema.siteSettings)
        .set({
          siteTitle: body.siteTitle,
          siteDescription: body.siteDescription,
          analyticsEnabled: body.analyticsEnabled,
          animationIntensity: body.animationIntensity,
          threeDEnabled: body.threeDEnabled,
        })
        .where(eq(schema.siteSettings.id, 1))
        .returning()

      return NextResponse.json(result[0])
    } else {
      const result = await db
        .insert(schema.siteSettings)
        .values({
          id: 1,
          siteTitle: body.siteTitle,
          siteDescription: body.siteDescription,
          analyticsEnabled: body.analyticsEnabled,
          animationIntensity: body.animationIntensity,
          threeDEnabled: body.threeDEnabled,
        } as typeof schema.siteSettings.$inferInsert)
        .returning()

      return NextResponse.json(result[0])
    }
  } catch (error) {
    console.error('Update settings error:', error)
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 })
  }
}
