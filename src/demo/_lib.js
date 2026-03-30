'use strict'

const path = require('path')
const fs = require('fs')

/**
 * Resolves the key directories for demo operations.
 * Uses AIH_DATA_ROOT env var when set (npm package mode),
 * falling back to paths relative to this script (dev mode).
 */
function resolvePaths() {
  const dataDir = process.env.AIH_DATA_ROOT
    ? path.join(process.env.AIH_DATA_ROOT, 'infra')
    : path.join(__dirname, '..', 'infra')

  const rootDir = process.env.AIH_DATA_ROOT
    ? process.env.AIH_DATA_ROOT
    : path.join(__dirname, '..', '..')

  const backupDir = path.join(__dirname, 'data-backup')

  return { dataDir, rootDir, backupDir }
}

function rmFile(p) {
  try { fs.rmSync(p) } catch { /* ignore if not present */ }
}

function rmDir(p) {
  try { fs.rmSync(p, { recursive: true, force: true }) } catch { /* ignore */ }
}

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true })
}

function copyFile(src, dest) {
  ensureDir(path.dirname(dest))
  fs.copyFileSync(src, dest)
}

function copyDir(src, dest) {
  fs.cpSync(src, dest, { recursive: true })
}

/**
 * Wipes all generated demo data from the user's data and export directories.
 */
function clean(dataDir, rootDir) {
  rmFile(path.join(dataDir, 'application-definition/application-overview.md'))
  rmFile(path.join(dataDir, 'application-definition/application-components.md'))
  rmFile(path.join(dataDir, 'application-definition/non-functional-requirements.md'))

  rmFile(path.join(dataDir, 'context/infrastructure-context.md'))
  rmFile(path.join(dataDir, 'context/platform-context.md'))
  rmFile(path.join(dataDir, 'context/development-context.md'))

  rmFile(path.join(dataDir, 'application-architecture/architecture-diagram.md'))
  rmFile(path.join(dataDir, 'application-architecture/deployment-strategy.md'))
  rmDir(path.join(dataDir, 'application-architecture/components'))
  ensureDir(path.join(dataDir, 'application-architecture/components'))

  rmFile(path.join(dataDir, 'architecture-decisions/adr-template.md'))
  rmDir(path.join(dataDir, 'architecture-decisions/adrs'))
  ensureDir(path.join(dataDir, 'architecture-decisions/adrs'))

  rmDir(path.join(dataDir, 'bicep'))
  rmDir(path.join(dataDir, 'tf'))
}

module.exports = { resolvePaths, clean, rmFile, rmDir, ensureDir, copyFile, copyDir }
