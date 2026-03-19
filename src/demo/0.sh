#!/bin/bash
# Demo State 0: Clean application (no data)
# This removes all data files to show an empty application state

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DATA_DIR="$(dirname "$SCRIPT_DIR")/data"
# ROOT_DIR is parent of src/
ROOT_DIR="$(dirname "$(dirname "$SCRIPT_DIR")")"

echo "🧹 Setting up Demo State 0: Clean Application"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Remove all markdown files from application-definition (keep README)
echo "  Cleaning application-definition..."
rm -f "$DATA_DIR/application-definition/application-overview.md"
rm -f "$DATA_DIR/application-definition/application-components.md"
rm -f "$DATA_DIR/application-definition/non-functional-requirements.md"

# Remove all markdown files from context (keep README)
echo "  Cleaning context..."
rm -f "$DATA_DIR/context/infrastructure-context.md"
rm -f "$DATA_DIR/context/platform-context.md"
rm -f "$DATA_DIR/context/development-context.md"

# Remove all component JSON files and architecture markdown files
echo "  Cleaning application-architecture..."
rm -f "$DATA_DIR/application-architecture/architecture-diagram.md"
rm -f "$DATA_DIR/application-architecture/deployment-strategy.md"
rm -rf "$DATA_DIR/application-architecture/components"
mkdir -p "$DATA_DIR/application-architecture/components"

# Remove all ADRs including template
echo "  Cleaning architecture-decisions..."
rm -f "$DATA_DIR/architecture-decisions/adr-template.md"
rm -rf "$DATA_DIR/architecture-decisions/adrs"
mkdir -p "$DATA_DIR/architecture-decisions/adrs"

# Remove export folders in root
echo "  Cleaning export-bicep and export-terraform..."
rm -rf "$ROOT_DIR/export-bicep"
rm -rf "$ROOT_DIR/export-terraform"

echo ""
echo "✅ Demo State 0 ready!"
echo "   Your application now shows an empty state"
echo "   Run 1.sh to populate Application Definition"
