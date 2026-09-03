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
  const item = await db
    .select()
    .from(schema.socialLinks)
    .where(eq(schema.socialLinks.id, parseInt(id)))
    .limit(1)

  if (item.length === 0) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  return NextResponse.json(item[0])
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params

  try {
    const body = await request.json()

    const result = await db
      .update(schema.socialLinks)
      .set({
        platform: body.platform,
        url: body.url,
        isVisible: body.isVisible,
        sortOrder: body.sortOrder,
      })
      .where(eq(schema.socialLinks.id, parseInt(id)))
      .returning()

    return NextResponse.json(result[0])
  } catch (error) {
    console.error('Update social link error:', error)
    return NextResponse.json({ error: 'Failed to update social link' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params

  try {
    await db.delete(schema.socialLinks).where(eq(schema.socialLinks.id, parseInt(id)))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete social link error:', error)
    return NextResponse.json({ error: 'Failed to delete social link' }, { status: 500 })
  }
}
