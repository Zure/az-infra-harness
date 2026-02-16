#!/bin/bash
# Demo State 3: Application Definition + Context + Application Architecture
# Shows first three sections completed

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DATA_DIR="$(dirname "$SCRIPT_DIR")/data"
BACKUP_DIR="$SCRIPT_DIR/data-backup"

echo "🏗️  Setting up Demo State 3: + Application Architecture"
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

# Restore application-architecture
echo "  Restoring Application Architecture..."
cp "$BACKUP_DIR/application-architecture/architecture-diagram.md" "$DATA_DIR/application-architecture/"
cp "$BACKUP_DIR/application-architecture/deployment-strategy.md" "$DATA_DIR/application-architecture/"
cp -r "$BACKUP_DIR/application-architecture/components" "$DATA_DIR/application-architecture/"

echo ""
echo "✅ Demo State 3 ready!"
echo "   ✓ Application Definition completed"
echo "   ✓ Context completed"
echo "   ✓ Application Architecture completed"
echo "   ⚬ Architecture Decisions (empty)"
echo "   ⚬ Export (empty)"
echo ""
echo "   Run 4.sh to add Architecture Decisions data"
