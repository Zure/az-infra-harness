#!/bin/bash
# Demo State 0: Clean application (no data)
# This removes all data files to show an empty application state

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DATA_DIR="$(dirname "$SCRIPT_DIR")/data"

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

# Clean export data (keep structure and READMEs)
echo "  Cleaning export..."
find "$DATA_DIR/export" -type f -name "*.md" ! -name "README.md" -delete 2>/dev/null || true

echo ""
echo "✅ Demo State 0 ready!"
echo "   Your application now shows an empty state"
echo "   Run 1.sh to populate Application Definition"
