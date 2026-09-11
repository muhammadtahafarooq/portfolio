import { createClient } from '@libsql/client'

const url = process.env.TURSO_DATABASE_URL
const authToken = process.env.TURSO_AUTH_TOKEN
const client = createClient({ url, authToken })

const tables = [
  'profile', 'about', 'skills', 'technologies', 'projects',
  'experience', 'education', 'certifications', 'achievements',
  'resume', 'social_links', 'contact_messages', 'homepage_content',
  'site_settings', 'admin_users'
]

async function main() {
  for (const t of tables) {
    try {
      const r = await client.execute(`SELECT * FROM ${t} LIMIT 1`)
      const cols = r.columns || []
      console.log(`${t}: ${cols.join(', ')}`)
    } catch (e) {
      console.log(`${t}: ERROR ${e.message}`)
    }
  }
}

main()
