#!/usr/bin/env node
'use strict'

const path = require('path')
const { spawn } = require('child_process')
const fs = require('fs')

// ---------------------------------------------------------------------------
// ANSI color helpers
// ---------------------------------------------------------------------------

const C = {
  reset:     '\x1b[0m',
  bold:      '\x1b[1m',
  dim:       '\x1b[2m',
  cyan:      '\x1b[36m',
  blue:      '\x1b[34m',
  blueBold:  '\x1b[1;34m',
  brightBlue:'\x1b[94m',
  green:     '\x1b[32m',
  yellow:    '\x1b[33m',
  white:     '\x1b[37m',
  brightWhite:'\x1b[97m',
}

// Skip colors if not a TTY
const useColor = process.stdout.isTTY
const c = (code, text) => useColor ? `${code}${text}${C.reset}` : text

// ---------------------------------------------------------------------------
// Banner
// ---------------------------------------------------------------------------

// ASCII art generated with figlet -f smslant "AZ Infra Harness"
const ASCII_ART = [
  '   ___ ____    ____     ___           __ __                        ',
  '  / _ /_  /   /  _/__  / _/______ _  / // /__ ________  ___ ___ ___',
  ' / __ |/ /_  _/ // _ \\/ _/ __/ _ `/ / _  / _ `/ __/ _ \\/ -_|_-<(_-<',
  '/_/ |_/___/ /___/_//_/_//_/  \\_,_/ /_//_/\\_,_/_/ /_//_/\\__/___/___/',
]

function printBanner(version) {
  const art = ASCII_ART.map(line => c(C.brightBlue, line)).join('\n')
  console.log()
  console.log(art)
  console.log()
  if (version) {
    console.log(`  ${c(C.dim, `v${version}`)}`)
    console.log()
  }
}

function getVersion() {
  try {
    const pkgPath = path.join(__dirname, '..', 'package.json')
    return JSON.parse(fs.readFileSync(pkgPath, 'utf8')).version
  } catch {
    return null
  }
}

// ---------------------------------------------------------------------------
// Spinner
// ---------------------------------------------------------------------------

const SPINNER_FRAMES = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']

function createSpinner(label) {
  if (!useColor || !process.stdout.isTTY) {
    process.stdout.write(`  ${label}...\n`)
    return { stop: () => {} }
  }
  let i = 0
  const interval = setInterval(() => {
    process.stdout.write(`\r  ${c(C.cyan, SPINNER_FRAMES[i++ % SPINNER_FRAMES.length])} ${label}`)
  }, 80)
  return {
    stop(successMsg) {
      clearInterval(interval)
      if (successMsg) {
        process.stdout.write(`\r  ${c(C.green, '✓')} ${successMsg}\n`)
      } else {
        process.stdout.write('\r\x1b[K')
      }
    }
  }
}

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

  // The user's project directory — where infra/ (including infra/bicep/, infra/tf/) should live
  const userDir = dataDir ?? process.cwd()

  // The Next.js standalone server lives next to this CLI script
  const appDir = path.join(__dirname, '..')
  const standaloneServer = path.join(appDir, '.next', 'standalone', 'server.js')

  if (!fs.existsSync(standaloneServer)) {
    printBanner(getVersion())
    console.error(`  ${c(C.yellow, '✗')} Could not find the Next.js server.`)
    console.error(`    This is likely a packaging issue. Please report it at:`)
    console.error(`    ${c(C.cyan, 'https://github.com/zure/az-infra-harness/issues')}`)
    console.error()
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

  printBanner(getVersion())

  const spinner = createSpinner('Starting server')

  const server = spawn(process.execPath, [standaloneServer], {
    env,
    cwd: appDir,
    stdio: ['inherit', 'pipe', 'pipe'],
  })

  let ready = false

  function onReady() {
    if (ready) return
    ready = true
    spinner.stop(`Ready  ${c(C.brightWhite + C.bold, `http://localhost:${port}`)}`)
    console.log()
    console.log(`  ${c(C.dim, `Data  ${userDir}`)}`)
    console.log()
    console.log(`  ${c(C.dim, 'Press Ctrl+C to stop')}`)
    console.log()
  }

  // Next.js standalone server emits a "Listening" or "ready" line when up
  server.stdout.on('data', (data) => {
    const text = data.toString()
    if (!ready && /listen|ready|started/i.test(text)) {
      onReady()
    }
  })

  // Show server errors but suppress routine startup noise
  server.stderr.on('data', (data) => {
    const text = data.toString()
    // Suppress known Next.js startup lines
    if (/next\.js|turbopack|compil|✓|▲|\- Local:|\- Network:/i.test(text)) return
    if (!ready) onReady()
    process.stderr.write(data)
  })

  // Fallback: show ready after 5s if no signal received
  const readyTimeout = setTimeout(onReady, 5000)
  readyTimeout.unref()

  server.on('error', (err) => {
    spinner.stop()
    console.error(`  ${c(C.yellow, '✗')} Failed to start server: ${err.message}`)
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

  printBanner(getVersion())

  if (!agent) {
    console.log('  This will add slash commands and skill definitions for your coding agent.')
    console.log()
    console.log(`  ${c(C.bold, 'Usage:')}`)
    console.log(`    npx az-infra-harness init --agent <agent>`)
    console.log()
    console.log(`  ${c(C.bold, 'Supported agents:')}`)
    supportedAgents.forEach(a => console.log(`    ${c(C.cyan, '◆')} ${a}`))
    console.log()
    process.exit(0)
  }

  if (!supportedAgents.includes(agent)) {
    console.error(`  ${c(C.yellow, '✗')} Unknown agent "${agent}". Supported: ${supportedAgents.join(', ')}`)
    process.exit(1)
  }

  const appDir = path.join(__dirname, '..')
  const targetDir = process.cwd()

  console.log(`  Installing for ${c(C.bold, agent)}`)
  console.log(`  ${c(C.dim, `Target: ${targetDir}`)}`)
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
    console.log(`  ${c(C.green, '✓')} Installed ${config.label} commands  ${c(C.dim, path.relative(targetDir, config.targetDir))}`)

    await copyDirectory(skillsSource, skillsTarget)
    console.log(`  ${c(C.green, '✓')} Installed skill definitions  ${c(C.dim, 'skills/')}`)

    console.log()
    console.log(`  ${c(C.green, '✓')} Done! Open your coding agent in this directory and try:`)
    console.log(`    ${c(C.cyan, '/application-overview')}`)
    console.log()
  } catch (err) {
    console.error(`  ${c(C.yellow, '✗')} Error during init: ${err.message}`)
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
        console.log(`  ${c(C.dim, `⏭  Skipping (exists): ${path.relative(process.cwd(), destPath)}`)}`)
      } else {
        fs.copyFileSync(srcPath, destPath)
      }
    }
  }
}
