import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db, schema } from '@/lib/db'

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const projects = await db.select().from(schema.projects)
  return NextResponse.json(projects)
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()

    const result = await db
      .insert(schema.projects)
      .values({
        title: body.title,
        slug: body.slug,
        description: body.description || null,
        shortStatement: body.shortStatement || null,
        technologies: body.technologies || null,
        liveUrl: body.liveUrl || null,
        githubUrl: body.githubUrl || null,
        demoUrl: body.demoUrl || null,
        screenshotUrls: body.screenshotUrls || null,
        caseStudyProblem: body.caseStudyProblem || null,
        caseStudySolution: body.caseStudySolution || null,
        caseStudyResult: body.caseStudyResult || null,
        isFeatured: body.isFeatured || false,
        isVisible: body.isVisible !== false,
        sortOrder: body.sortOrder || 0,
      } as typeof schema.projects.$inferInsert)
      .returning()

    return NextResponse.json(result[0])
  } catch (error) {
    console.error('Create project error:', error)
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 })
  }
}
