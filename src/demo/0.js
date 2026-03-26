#!/usr/bin/env node
// Demo State 0: Clean application (no data)
'use strict'

const path = require('path')
const { resolvePaths, rmFile, rmDir, ensureDir } = require('./_lib')

const { dataDir, rootDir } = resolvePaths()

console.log('🧹 Setting up Demo State 0: Clean Application')
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')

console.log('  Cleaning application-definition...')
rmFile(path.join(dataDir, 'application-definition/application-overview.md'))
rmFile(path.join(dataDir, 'application-definition/application-components.md'))
rmFile(path.join(dataDir, 'application-definition/non-functional-requirements.md'))

console.log('  Cleaning context...')
rmFile(path.join(dataDir, 'context/infrastructure-context.md'))
rmFile(path.join(dataDir, 'context/platform-context.md'))
rmFile(path.join(dataDir, 'context/development-context.md'))

console.log('  Cleaning application-architecture...')
rmFile(path.join(dataDir, 'application-architecture/architecture-diagram.md'))
rmFile(path.join(dataDir, 'application-architecture/deployment-strategy.md'))
rmDir(path.join(dataDir, 'application-architecture/components'))
ensureDir(path.join(dataDir, 'application-architecture/components'))

console.log('  Cleaning architecture-decisions...')
rmFile(path.join(dataDir, 'architecture-decisions/adr-template.md'))
rmDir(path.join(dataDir, 'architecture-decisions/adrs'))
ensureDir(path.join(dataDir, 'architecture-decisions/adrs'))

console.log('  Cleaning export-bicep and export-terraform...')
rmDir(path.join(rootDir, 'export-bicep'))
rmDir(path.join(rootDir, 'export-terraform'))

console.log('')
console.log('✅ Demo State 0 ready!')
console.log('   Your application now shows an empty state')
console.log('   Run node 1.js to populate Application Definition')
