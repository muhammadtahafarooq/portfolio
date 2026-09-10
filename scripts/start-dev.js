const { spawn } = require('child_process')
const path = require('path')

const projectDir = path.resolve(__dirname, '..')

const child = spawn('node', [
  'node_modules/next/dist/bin/next',
  'dev',
  '-p', '3000'
], {
  cwd: projectDir,
  stdio: 'pipe',
  shell: false
})

child.stdout.on('data', (data) => {
  const msg = data.toString()
  console.log('[OUT]', msg)
})

child.stderr.on('data', (data) => {
  const msg = data.toString()
  console.log('[ERR]', msg)
})

child.on('close', (code) => {
  console.log('Process exited with code:', code)
})

// Keep alive
process.on('SIGINT', () => { child.kill(); process.exit() })
