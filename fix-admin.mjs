import { createClient } from '@libsql/client/web'

const client = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
})

async function main() {
  // 1. Create password_reset_tokens table if it doesn't exist
  console.log('Creating password_reset_tokens table...')
  await client.execute(`
    CREATE TABLE IF NOT EXISTS password_reset_tokens (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      token TEXT UNIQUE NOT NULL,
      email TEXT NOT NULL,
      expires_at TEXT NOT NULL,
      used INTEGER NOT NULL DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now'))
    )
  `)
  console.log('password_reset_tokens table ready.')

  // 2. Update admin password
  const hash = '$2a$12$W6qpC9qbAOtQcR78bCnzSeFxJ7nRT3C1PfJU9Xq.72/HHObP.ZDJe'
  const result = await client.execute({
    sql: 'UPDATE admin_users SET password_hash = ? WHERE email = ?',
    args: [hash, 'muhammadtahafarooq22@gmail.com'],
  })
  console.log(`Password updated. Rows affected: ${result.rowsAffected}`)

  // 3. Verify
  const check = await client.execute({
    sql: 'SELECT id, email FROM admin_users',
    args: [],
  })
  console.log('Admin users:', check.rows)
}

main().catch(console.error)
