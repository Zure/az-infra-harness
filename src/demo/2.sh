#!/bin/bash
# Demo State 2: Application Definition + Context populated
# Shows first two sections completed

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DATA_DIR="$(dirname "$SCRIPT_DIR")/data"
BACKUP_DIR="$SCRIPT_DIR/data-backup"

echo "🌍 Setting up Demo State 2: Application Definition + Context"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# First clean everything
echo "  Cleaning all data..."
"$SCRIPT_DIR/0.sh" > /dev/null 2>&1

# Restore application-definition
echo "  Restoring Application Definition..."
cp "$BACKUP_DIR/application-definition/application-overview.md" "$DATA_DIR/application-definition/"
cp "$BACKUP_DIR/application-definition/application-components.md" "$DATA_DIR/application-definition/"
cp "$BACKUP_DIR/application-definition/non-functional-requirements.md" "$DATA_DIR/application-definition/"

# Restore context
echo "  Restoring Context..."
cp "$BACKUP_DIR/context/infrastructure-context.md" "$DATA_DIR/context/"
cp "$BACKUP_DIR/context/platform-context.md" "$DATA_DIR/context/"
cp "$BACKUP_DIR/context/development-context.md" "$DATA_DIR/context/"

echo ""
echo "✅ Demo State 2 ready!"
echo "   ✓ Application Definition completed"
echo "   ✓ Context completed"
echo "   ⚬ Application Architecture (empty)"
echo "   ⚬ Architecture Decisions (empty)"
echo "   ⚬ Export (empty)"
echo ""
echo "   Run 3.sh to add Application Architecture data"
