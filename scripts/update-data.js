const { createClient } = require('@libsql/client')
const client = createClient({ url: 'file:./local.db' })

async function run() {
  // 1. Update profile - email, location
  await client.execute({
    sql: `UPDATE profile SET email = ?, location = ? WHERE id = 1`,
    args: ['muhammadtahafarooq22@gmail.com', 'Multan, Pakistan']
  })
  console.log('Profile updated')

  // 2. Update project order: 1=Aurora, 2=Portfolio, 3=Student Mgmt, 4=BookNest
  await client.execute({ sql: `UPDATE projects SET sort_order = 1 WHERE slug = 'aurora-jewels-ecommerce'`, args: [] })
  await client.execute({ sql: `UPDATE projects SET sort_order = 2 WHERE slug = 'muhammad-taha-3d-portfolio'`, args: [] })
  await client.execute({ sql: `UPDATE projects SET sort_order = 3 WHERE slug = 'student-management-system'`, args: [] })
  await client.execute({ sql: `UPDATE projects SET sort_order = 4 WHERE slug = 'booknest-online-bookstore'`, args: [] })
  await client.execute({ sql: `UPDATE projects SET sort_order = 5 WHERE slug = 'indias-biggest-ai-quiz'`, args: [] })
  console.log('Project order updated')

  // 3. Update AI Quiz date to 2026
  await client.execute({ sql: `UPDATE certifications SET date = '2026-01' WHERE name = 'Indias Biggest AI Quiz'`, args: [] })
  await client.execute({ sql: `UPDATE achievements SET date = '2026-01' WHERE title = 'Indias Biggest AI Quiz Organizer'`, args: [] })
  console.log('AI Quiz date updated to 2026')

  // 4. Update experience - role date to 2026
  await client.execute({ sql: `UPDATE experience SET start_date = '2026-01' WHERE role = 'CS Student & Developer'`, args: [] })
  await client.execute({ sql: `UPDATE experience SET start_date = '2026-01', end_date = '2026-12', is_current = 0 WHERE role = 'Full-Stack Developer'`, args: [] })
  console.log('Experience dates updated')

  // 5. Update social links - GitHub, WhatsApp, Email
  await client.execute({ sql: `DELETE FROM social_links`, args: [] })
  await client.execute({
    sql: `INSERT INTO social_links (id, platform, url, is_visible, sort_order) VALUES (?, ?, ?, ?, ?)`,
    args: [1, 'Email', 'mailto:muhammadtahafarooq22@gmail.com', 1, 1]
  })
  await client.execute({
    sql: `INSERT INTO social_links (id, platform, url, is_visible, sort_order) VALUES (?, ?, ?, ?, ?)`,
    args: [2, 'GitHub', 'https://github.com/muhammadtahafarooq', 1, 2]
  })
  await client.execute({
    sql: `INSERT INTO social_links (id, platform, url, is_visible, sort_order) VALUES (?, ?, ?, ?, ?)`,
    args: [3, 'WhatsApp', 'https://wa.me/923348010708', 1, 3]
  })
  await client.execute({
    sql: `INSERT INTO social_links (id, platform, url, is_visible, sort_order) VALUES (?, ?, ?, ?, ?)`,
    args: [4, 'Location', 'https://maps.google.com/?q=Multan,Pakistan', 1, 4]
  })
  console.log('Social links updated')

  // 6. Update featured project IDs
  await client.execute({
    sql: `UPDATE homepage_content SET featured_project_ids = '[1, 2, 3, 4]' WHERE id = 1`,
    args: []
  })
  console.log('Homepage featured projects updated')

  // Verify
  const projects = await client.execute('SELECT id, title, slug, sort_order FROM projects ORDER BY sort_order')
  console.log('\nProjects:')
  projects.rows.forEach(r => console.log(`  ${r.sort_order}. ${r.title} (${r.slug})`))

  const socials = await client.execute('SELECT platform, url FROM social_links ORDER BY sort_order')
  console.log('\nSocial Links:')
  socials.rows.forEach(r => console.log(`  ${r.platform}: ${r.url}`))

  const exp = await client.execute('SELECT role, start_date, end_date, is_current FROM experience')
  console.log('\nExperience:')
  exp.rows.forEach(r => console.log(`  ${r.role}: ${r.start_date} - ${r.end_date || 'Present'} (current: ${r.is_current})`))
}

run().catch(console.error)
