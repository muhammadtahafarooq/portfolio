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

  const project = await db
    .select()
    .from(schema.projects)
    .where(eq(schema.projects.id, parseInt(id)))
    .limit(1)

  if (project.length === 0) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  return NextResponse.json(project[0])
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
      .update(schema.projects)
      .set({
        title: body.title,
        slug: body.slug,
        description: body.description,
        shortStatement: body.shortStatement,
        technologies: body.technologies,
        liveUrl: body.liveUrl,
        githubUrl: body.githubUrl,
        demoUrl: body.demoUrl,
        screenshotUrls: body.screenshotUrls,
        caseStudyProblem: body.caseStudyProblem,
        caseStudySolution: body.caseStudySolution,
        caseStudyResult: body.caseStudyResult,
        isFeatured: body.isFeatured,
        isVisible: body.isVisible,
        sortOrder: body.sortOrder,
        updatedAt: new Date().toISOString(),
      })
      .where(eq(schema.projects.id, parseInt(id)))
      .returning()

    return NextResponse.json(result[0])
  } catch (error) {
    console.error('Update project error:', error)
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params

  try {
    await db.delete(schema.projects).where(eq(schema.projects.id, parseInt(id)))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete project error:', error)
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 })
  }
}
