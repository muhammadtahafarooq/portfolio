import { requireAuth, apiError, apiSuccess } from '@/lib/api-helpers'

export async function GET() {
  const { session, error } = await requireAuth()
  if (error) return error

  const token = process.env.GITHUB_TOKEN
  const username = process.env.GITHUB_USERNAME

  if (!token || !username) {
    return apiError('GitHub not configured', 500)
  }

  try {
    const res = await fetch(`https://api.github.com/user/repos?sort=updated&per_page=30`, {
      headers: {
        Authorization: `token ${token}`,
        Accept: 'application/vnd.github.v3+json',
      },
    })

    if (!res.ok) {
      return apiError('Failed to fetch repos from GitHub', 502)
    }

    const repos = await res.json()
    return apiSuccess({ repos })
  } catch (err) {
    console.error('GitHub repos error:', err)
    return apiError('Failed to fetch repos', 500)
  }
}
