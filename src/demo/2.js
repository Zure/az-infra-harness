#!/usr/bin/env node
// Demo State 2: Application Definition + Context populated
'use strict'

const path = require('path')
const { resolvePaths, clean, copyFile } = require('./_lib')

const { dataDir, rootDir, backupDir } = resolvePaths()

console.log('🌍 Setting up Demo State 2: Application Definition + Context')
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')

console.log('  Cleaning all data...')
clean(dataDir, rootDir)

console.log('  Restoring Application Definition...')
copyFile(path.join(backupDir, 'application-definition/application-overview.md'), path.join(dataDir, 'application-definition/application-overview.md'))
copyFile(path.join(backupDir, 'application-definition/application-components.md'), path.join(dataDir, 'application-definition/application-components.md'))
copyFile(path.join(backupDir, 'application-definition/non-functional-requirements.md'), path.join(dataDir, 'application-definition/non-functional-requirements.md'))

console.log('  Restoring Context...')
copyFile(path.join(backupDir, 'context/infrastructure-context.md'), path.join(dataDir, 'context/infrastructure-context.md'))
copyFile(path.join(backupDir, 'context/platform-context.md'), path.join(dataDir, 'context/platform-context.md'))
copyFile(path.join(backupDir, 'context/development-context.md'), path.join(dataDir, 'context/development-context.md'))

console.log('')
console.log('✅ Demo State 2 ready!')
console.log('   ✓ Application Definition completed')
console.log('   ✓ Context completed')
console.log('   ⚬ Application Architecture (empty)')
console.log('   ⚬ Architecture Decisions (empty)')
console.log('   ⚬ Export (empty)')
console.log('')
console.log('   Run node 3.js to add Application Architecture data')
