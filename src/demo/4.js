#!/usr/bin/env node
// Demo State 4: All sections except Export
'use strict'

const path = require('path')
const { resolvePaths, clean, copyFile, copyDir } = require('./_lib')

const { dataDir, rootDir, backupDir } = resolvePaths()

console.log('📋 Setting up Demo State 4: + Architecture Decisions')
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

console.log('  Restoring Application Architecture...')
copyFile(path.join(backupDir, 'application-architecture/architecture-diagram.md'), path.join(dataDir, 'application-architecture/architecture-diagram.md'))
copyFile(path.join(backupDir, 'application-architecture/deployment-strategy.md'), path.join(dataDir, 'application-architecture/deployment-strategy.md'))
copyDir(path.join(backupDir, 'application-architecture/components'), path.join(dataDir, 'application-architecture/components'))

console.log('  Restoring Architecture Decisions...')
copyFile(path.join(backupDir, 'architecture-decisions/adr-template.md'), path.join(dataDir, 'architecture-decisions/adr-template.md'))
copyDir(path.join(backupDir, 'architecture-decisions/adrs'), path.join(dataDir, 'architecture-decisions/adrs'))

console.log('')
console.log('✅ Demo State 4 ready!')
console.log('   ✓ Application Definition completed')
console.log('   ✓ Context completed')
console.log('   ✓ Application Architecture completed')
console.log('   ✓ Architecture Decisions completed')
console.log('   ⚬ Export (empty)')
console.log('')
console.log('   Run node 5.js to add Export data (full completion)')
