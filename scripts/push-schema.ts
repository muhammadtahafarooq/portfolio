import { createClient } from '@libsql/client'
import { readFileSync } from 'fs'
import { resolve } from 'path'

const url = process.env.TURSO_DATABASE_URL
const authToken = process.env.TURSO_AUTH_TOKEN

if (!url || !authToken) {
  console.error('Missing TURSO_DATABASE_URL or TURSO_AUTH_TOKEN')
  process.exit(1)
}

const client = createClient({ url, authToken })

async function main() {
  console.log(`Connecting to ${url}...`)

  const schemaPath = resolve(__dirname, '..', 'database', 'schema.sql')
  const schema = readFileSync(schemaPath, 'utf-8')

  const statements = schema
    .split(';')
    .map((s) => s.trim())
    .filter((s) => s.length > 0 && !s.startsWith('--'))

  let success = 0
  let errors = 0

  for (const stmt of statements) {
    try {
      await client.execute(stmt + ';')
      success++
    } catch (e: any) {
      if (e.message?.includes('already exists')) {
        success++
      } else {
        console.error(`Error: ${e.message}`)
        console.error(`Statement: ${stmt.substring(0, 100)}...`)
        errors++
      }
    }
  }

  console.log(`\nDone: ${success} succeeded, ${errors} failed`)
  process.exit(errors > 0 ? 1 : 0)
}

main()
