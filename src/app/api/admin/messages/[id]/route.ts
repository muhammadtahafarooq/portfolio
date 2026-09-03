import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db, schema } from '@/lib/db'
import { eq } from 'drizzle-orm'

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params

  try {
    // Mark as read
    await db
      .update(schema.contactMessages)
      .set({ isRead: true })
      .where(eq(schema.contactMessages.id, parseInt(id)))

    const message = await db
      .select()
      .from(schema.contactMessages)
      .where(eq(schema.contactMessages.id, parseInt(id)))
      .limit(1)

    if (message.length === 0) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    return NextResponse.json(message[0])
  } catch (error) {
    console.error('Get message error:', error)
    return NextResponse.json({ error: 'Failed to get message' }, { status: 500 })
  }
}
