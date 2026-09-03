import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db, schema } from '@/lib/db'

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const links = await db.select().from(schema.socialLinks)
  return NextResponse.json(links)
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()

    const result = await db
      .insert(schema.socialLinks)
      .values({
        platform: body.platform,
        url: body.url,
        isVisible: body.isVisible !== false,
        sortOrder: body.sortOrder || 0,
      } as typeof schema.socialLinks.$inferInsert)
      .returning()

    return NextResponse.json(result[0])
  } catch (error) {
    console.error('Create social link error:', error)
    return NextResponse.json({ error: 'Failed to create social link' }, { status: 500 })
  }
}
