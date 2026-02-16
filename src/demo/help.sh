#!/bin/bash
# Quick Demo Reference
# Run any of these commands from src/demo directory

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Azure Infrastructure Prompt Kit - Demo States"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Available demo states:"
echo ""
echo "  ./0.sh  🧹  Clean Application (no data)"
echo "  ./1.sh  📝  Application Definition only"
echo "  ./2.sh  🌍  + Context"
echo "  ./3.sh  🏗️   + Application Architecture"
echo "  ./4.sh  📋  + Architecture Decisions"
echo "  ./5.sh  🎉  Complete (all data)"
echo ""
echo "Current data state:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SRC_DIR="$(dirname "$SCRIPT_DIR")"
DATA_DIR="$SRC_DIR/data"

check_section() {
  local section_name=$1
  shift
  local files=("$@")
  local completed=true
  
  for file in "${files[@]}"; do
    if [ ! -f "$DATA_DIR/$file" ]; then
      completed=false
      break
    fi
  done
  
  if $completed; then
    echo "  ✓ $section_name"
  else
    echo "  ⚬ $section_name (empty)"
  fi
}

check_section "Application Definition" \
  "application-definition/application-overview.md" \
  "application-definition/application-components.md" \
  "application-definition/non-functional-requirements.md"

check_section "Context" \
  "context/infrastructure-context.md" \
  "context/platform-context.md" \
  "context/development-context.md"

check_section "Application Architecture" \
  "application-architecture/architecture-diagram.md" \
  "application-architecture/deployment-strategy.md"

# Check ADRs
adr_count=$(find "$DATA_DIR/architecture-decisions/adrs" -name "*.md" 2>/dev/null | wc -l | tr -d ' ')
if [ "$adr_count" -gt 0 ]; then
  echo "  ✓ Architecture Decisions ($adr_count ADRs)"
else
  echo "  ⚬ Architecture Decisions (empty)"
fi

# Check export
export_count=$(find "$DATA_DIR/export" -name "*.md" ! -name "README.md" 2>/dev/null | wc -l | tr -d ' ')
if [ "$export_count" -gt 0 ]; then
  echo "  ✓ Export ($export_count files)"
else
  echo "  ⚬ Export (empty)"
fi

echo ""
echo "Run './help.sh' to see this menu again"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
