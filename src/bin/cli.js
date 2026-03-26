#!/usr/bin/env node
'use strict'

const path = require('path')
const { spawn } = require('child_process')
const fs = require('fs')

const args = process.argv.slice(2)
const isInit = args[0] === 'init'

if (isInit) {
  runInit(args.slice(1))
} else {
  runServer(args)
}

// ---------------------------------------------------------------------------
// Server mode
// ---------------------------------------------------------------------------

function runServer(args) {
  let port = 3000
  let dataDir = null

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--port' && args[i + 1]) {
      port = parseInt(args[i + 1], 10)
      i++
    } else if (args[i] === '--data-dir' && args[i + 1]) {
      dataDir = path.resolve(args[i + 1])
      i++
    } else if (args[i].startsWith('--port=')) {
      port = parseInt(args[i].split('=')[1], 10)
    } else if (args[i].startsWith('--data-dir=')) {
      dataDir = path.resolve(args[i].split('=').slice(1).join('='))
    }
  }

  // The user's project directory — where data/, export-bicep/, export-terraform/ should live
  const userDir = dataDir ?? process.cwd()

  // The Next.js standalone server lives next to this CLI script
  const appDir = path.join(__dirname, '..')
  const standaloneServer = path.join(appDir, '.next', 'standalone', 'server.js')

  if (!fs.existsSync(standaloneServer)) {
    console.error('❌  Could not find the Next.js server.')
    console.error('   This is likely a packaging issue. Please report it at:')
    console.error('   https://github.com/zure/az-infra-harness/issues')
    process.exit(1)
  }

  const env = {
    ...process.env,
    PORT: String(port),
    // Tell the Next.js app where to find user data
    AIH_DATA_ROOT: userDir,
    // Tell the Next.js app where the standalone runtime lives (demo/ scripts live here)
    AIH_APP_DIR: path.join(appDir, '.next', 'standalone'),
    // Required for standalone server to find static files
    NODE_ENV: 'production',
  }

  console.log(`🚀  Az Infra Harness`)
  console.log(`    Starting on http://localhost:${port}`)
  console.log(`    Reading data from: ${userDir}`)
  console.log()

  const server = spawn(process.execPath, [standaloneServer], {
    env,
    cwd: appDir,
    stdio: 'inherit',
  })

  server.on('error', (err) => {
    console.error('Failed to start server:', err)
    process.exit(1)
  })

  server.on('exit', (code) => {
    process.exit(code ?? 0)
  })

  process.on('SIGINT', () => server.kill('SIGINT'))
  process.on('SIGTERM', () => server.kill('SIGTERM'))
}

// ---------------------------------------------------------------------------
// Init mode — scaffold coding agent integrations
// ---------------------------------------------------------------------------

async function runInit(args) {
  let agent = null

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--agent' && args[i + 1]) {
      agent = args[i + 1].toLowerCase()
      i++
    } else if (args[i].startsWith('--agent=')) {
      agent = args[i].split('=')[1].toLowerCase()
    }
  }

  const supportedAgents = ['claude', 'opencode', 'copilot']

  if (!agent) {
    console.log('🔧  Az Infra Harness — Init')
    console.log()
    console.log('This will add slash commands and skill definitions for your coding agent.')
    console.log()
    console.log('Usage:')
    console.log('  npx az-infra-harness init --agent <agent>')
    console.log()
    console.log('Supported agents:')
    supportedAgents.forEach(a => console.log(`  - ${a}`))
    console.log()
    process.exit(0)
  }

  if (!supportedAgents.includes(agent)) {
    console.error(`❌  Unknown agent "${agent}". Supported: ${supportedAgents.join(', ')}`)
    process.exit(1)
  }

  const appDir = path.join(__dirname, '..')
  const targetDir = process.cwd()

  console.log(`🔧  Installing Az Infra Harness for ${agent}`)
  console.log(`    Target: ${targetDir}`)
  console.log()

  const agentConfig = {
    claude: {
      sourceDir: path.join(appDir, '.claude'),
      targetDir: path.join(targetDir, '.claude'),
      label: 'Claude Code',
    },
    opencode: {
      sourceDir: path.join(appDir, '.opencode'),
      targetDir: path.join(targetDir, '.opencode'),
      label: 'OpenCode',
    },
    copilot: {
      sourceDir: path.join(appDir, '.github'),
      targetDir: path.join(targetDir, '.github'),
      label: 'GitHub Copilot',
    },
  }

  const config = agentConfig[agent]

  // Also copy the skills directory
  const skillsSource = path.join(appDir, 'skills')
  const skillsTarget = path.join(targetDir, 'skills')

  try {
    await copyDirectory(config.sourceDir, config.targetDir)
    console.log(`✅  Installed ${config.label} commands → ${path.relative(targetDir, config.targetDir)}`)

    await copyDirectory(skillsSource, skillsTarget)
    console.log(`✅  Installed skill definitions → skills/`)

    console.log()
    console.log('🎉  Done! Open your coding agent in this directory and try:')
    console.log('    /application-overview')
  } catch (err) {
    console.error('❌  Error during init:', err.message)
    process.exit(1)
  }
}

async function copyDirectory(src, dest) {
  if (!fs.existsSync(src)) {
    throw new Error(`Source directory not found: ${src}`)
  }

  fs.mkdirSync(dest, { recursive: true })
  const entries = fs.readdirSync(src, { withFileTypes: true })

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)

    if (entry.isDirectory()) {
      await copyDirectory(srcPath, destPath)
    } else {
      if (fs.existsSync(destPath)) {
        console.log(`  ⏭  Skipping (already exists): ${path.relative(process.cwd(), destPath)}`)
      } else {
        fs.copyFileSync(srcPath, destPath)
      }
    }
  }
}
