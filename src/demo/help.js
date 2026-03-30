#!/usr/bin/env node
// Quick Demo Reference — shows available states and current data status
'use strict'

const path = require('path')
const fs = require('fs')
const { resolvePaths } = require('./_lib')

const { dataDir, rootDir } = resolvePaths()

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
console.log('  Az Infra Harness - Demo States')
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
console.log('')
console.log('Available demo states:')
console.log('')
console.log('  node 0.js  🧹  Clean Application (no data)')
console.log('  node 1.js  📝  Application Definition only')
console.log('  node 2.js  🌍  + Context')
console.log('  node 3.js  🏗️   + Application Architecture')
console.log('  node 4.js  📋  + Architecture Decisions')
console.log('  node 5.js  🎉  Complete (all data)')
console.log('')
console.log('Current data state:')
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')

function fileExists(p) {
  try { fs.accessSync(p); return true } catch { return false }
}

function dirHasFiles(dir, ext) {
  try {
    return fs.readdirSync(dir).some(f => f.endsWith(ext) && f !== 'README.md')
  } catch { return false }
}

function checkSection(name, files) {
  const ok = files.every(f => fileExists(path.join(dataDir, f)))
  console.log(ok ? `  ✓ ${name}` : `  ⚬ ${name} (empty)`)
}

checkSection('Application Definition', [
  'application-definition/application-overview.md',
  'application-definition/application-components.md',
])

checkSection('Context', [
  'context/infrastructure-context.md',
  'context/platform-context.md',
])

checkSection('Application Architecture', [
  'application-architecture/architecture-diagram.md',
])

const adrCount = (() => {
  try {
    return fs.readdirSync(path.join(dataDir, 'architecture-decisions/adrs'))
      .filter(f => f.endsWith('.md')).length
  } catch { return 0 }
})()
console.log(adrCount > 0 ? `  ✓ Architecture Decisions (${adrCount} ADRs)` : '  ⚬ Architecture Decisions (empty)')

const hasBicep = fileExists(path.join(dataDir, 'bicep'))
const hasTerraform = fileExists(path.join(dataDir, 'tf'))
const exportTools = [hasBicep && 'Bicep', hasTerraform && 'Terraform'].filter(Boolean).join(', ')
console.log(exportTools ? `  ✓ Export (${exportTools})` : '  ⚬ Export (empty)')

console.log('')
console.log("Run 'node help.js' to see this menu again")
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
