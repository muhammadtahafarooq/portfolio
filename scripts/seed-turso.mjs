import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { createHash } from 'crypto'

const __dirname = dirname(fileURLToPath(import.meta.url))
const url = process.env.TURSO_DATABASE_URL
const authToken = process.env.TURSO_AUTH_TOKEN
const httpsUrl = url.replace('libsql://', 'https://')

async function execute(sql, args = []) {
  const resp = await fetch(`${httpsUrl}/v2/pipeline`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      requests: [{
        type: 'execute',
        stmt: { sql, args: args.map((a, i) => ({ type: 'text', value: String(a) })) }
      }],
    }),
  })
  const data = await resp.json()
  if (data.results?.[0]?.error) {
    throw new Error(data.results[0].error.message)
  }
  return data.results?.[0]
}

// Generate bcrypt-compatible hash using node's built-in
// bcrypt $2a$12$ rounds = 12
const BCRYPT_HASH = '$2a$12$noX.KcDh/X302gD3PxgfXeGYWf/ef6B8tRimrM9HOR69TImtsHWdu'

async function main() {
  const email = 'muhammadtahafarooq22@gmail.com'
  const password = 'T6a6ha6$$'
  const hash = BCRYPT_HASH

  console.log(`Using pre-computed hash: ${hash.substring(0, 20)}...`)

  // Check if admin already exists
  const existing = await execute(
    'SELECT id FROM admin_users WHERE email = ?',
    [email]
  )
  
  if (existing?.rows?.length > 0) {
    console.log('Admin user already exists, updating password...')
    await execute(
      'UPDATE admin_users SET password_hash = ? WHERE email = ?',
      [hash, email]
    )
    console.log('Password updated.')
  } else {
    console.log('Creating admin user...')
    await execute(
      'INSERT INTO admin_users (email, password_hash) VALUES (?, ?)',
      [email, hash]
    )
    console.log('Admin user created.')
  }

  // Also seed profile
  console.log('Seeding profile...')
  try {
    await execute(
      `INSERT OR IGNORE INTO profile (id, name, title, short_bio, email, phone, location) VALUES (1, 'Muhammad Taha', 'Full-Stack + AI Developer', 'Building intelligent, scalable, and beautiful web experiences.', 'muhammadtahafarooq22@gmail.com', '+92 334 8010708', 'Multan, Pakistan')`
    )
    console.log('Profile seeded.')
  } catch (e) {
    console.log('Profile seed skipped:', e.message)
  }

  // Seed about
  console.log('Seeding about...')
  try {
    await execute(
      `INSERT OR IGNORE INTO about (id, biography) VALUES (1, 'Passionate full-stack developer and AI enthusiast from Pakistan. Currently pursuing BS Computer Science at NUML with a CGPA of 3.43. I specialize in building end-to-end web applications with modern technologies like Next.js, React, TypeScript, and Python. My focus is on creating AI-powered solutions that solve real-world problems while maintaining clean, scalable code architecture.')`
    )
    console.log('About seeded.')
  } catch (e) {
    console.log('About seed skipped:', e.message)
  }

  // Seed social links
  console.log('Seeding social links...')
  const links = [
    ['GitHub', 'https://github.com/muhammadtahafarooq', 0],
    ['LinkedIn', 'https://linkedin.com/in/muhammadtaha', 1],
    ['WhatsApp', 'https://wa.me/923348010708', 2],
  ]
  for (const [platform, linkUrl, order] of links) {
    try {
      await execute(
        `INSERT OR IGNORE INTO social_links (platform, url, is_visible, sort_order) VALUES (?, ?, 1, ?)`,
        [platform, linkUrl, order]
      )
    } catch (e) {}
  }
  console.log('Social links seeded.')

  console.log('\nDone!')
}

main()
