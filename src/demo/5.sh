#!/bin/bash
# Demo State 5: Complete workflow
# Shows all sections completed with all data

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DATA_DIR="$(dirname "$SCRIPT_DIR")/data"
BACKUP_DIR="$SCRIPT_DIR/data-backup"
# ROOT_DIR is parent of src/
ROOT_DIR="$(dirname "$(dirname "$SCRIPT_DIR")")"

echo "🎉 Setting up Demo State 5: Complete Workflow"
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

# Restore architecture-decisions
echo "  Restoring Architecture Decisions..."
cp "$BACKUP_DIR/architecture-decisions/adr-template.md" "$DATA_DIR/architecture-decisions/"
cp -r "$BACKUP_DIR/architecture-decisions/adrs" "$DATA_DIR/architecture-decisions/"

# Create export folders in root
echo "  Creating export-bicep and export-terraform folders..."
cp -r "$BACKUP_DIR/export-bicep" "$ROOT_DIR/"
cp -r "$BACKUP_DIR/export-terraform" "$ROOT_DIR/"

echo ""
echo "✅ Demo State 5 ready!"
echo "   ✓ Application Definition completed"
echo "   ✓ Context completed"
echo "   ✓ Application Architecture completed"
echo "   ✓ Architecture Decisions completed"
echo "   ✓ Export completed (export-bicep/, export-terraform/)"
echo ""
echo "   🎊 Full workflow demonstration ready!"
echo "   Run 0.sh to reset to clean state"
