import * as schema from './schema'

let _db: any = null

async function createDb(): Promise<any> {
  const [{ createClient }, { drizzle }] = await Promise.all([
    import('@libsql/client'),
    import('drizzle-orm/libsql'),
  ])
  const url = process.env.TURSO_DATABASE_URL
  if (!url) {
    throw new Error('TURSO_DATABASE_URL is not set')
  }
  const client = createClient({
    url,
    authToken: process.env.TURSO_AUTH_TOKEN,
  })
  return drizzle(client, { schema })
}

export async function getDb(): Promise<any> {
  if (!_db) {
    _db = await createDb()
  }
  return _db
}

export { schema }
