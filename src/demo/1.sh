#!/bin/bash
# Demo State 1: Application Definition populated
# Shows only Application Definition section completed

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DATA_DIR="$(dirname "$SCRIPT_DIR")/data"
BACKUP_DIR="$SCRIPT_DIR/data-backup"

echo "📝 Setting up Demo State 1: Application Definition"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# First clean everything
echo "  Cleaning all data..."
"$SCRIPT_DIR/0.sh" > /dev/null 2>&1

# Restore only application-definition
echo "  Restoring Application Definition..."
cp "$BACKUP_DIR/application-definition/application-overview.md" "$DATA_DIR/application-definition/"
cp "$BACKUP_DIR/application-definition/application-components.md" "$DATA_DIR/application-definition/"
cp "$BACKUP_DIR/application-definition/non-functional-requirements.md" "$DATA_DIR/application-definition/"

echo ""
echo "✅ Demo State 1 ready!"
echo "   ✓ Application Definition completed"
echo "   ⚬ Context (empty)"
echo "   ⚬ Application Architecture (empty)"
echo "   ⚬ Architecture Decisions (empty)"
echo "   ⚬ Export (empty)"
echo ""
echo "   Run 2.sh to add Context data"
