# Demo Scripts

This directory contains Node.js scripts to quickly set up different demo states of the application by managing the data folder contents. Using Node.js makes them cross-platform (Windows, macOS, Linux).

## Quick Start

Run any script to set the application to that demo state:

```bash
cd src/demo
node 0.js   # Clean state (no data)
node 1.js   # Application Definition only
node 2.js   # + Context
node 3.js   # + Application Architecture
node 4.js   # + Architecture Decisions
node 5.js   # Complete (all data)
```

## Demo States

### 0.js - Clean Application
- **Purpose**: Show empty application state
- **Data**: None
- **Use case**: Demonstrate what a new user sees when first starting

### 1.js - Application Definition
- **Purpose**: First step of workflow completed
- **Data**: Application overview, non-functional requirements, components
- **Use case**: Show how the first planning boxes get filled

### 2.js - Application Definition + Context
- **Purpose**: Two sections completed
- **Data**: Previous + infrastructure, platform, and development context
- **Use case**: Demonstrate context gathering phase

### 3.js - + Application Architecture
- **Purpose**: Three sections completed
- **Data**: Previous + architecture diagram, deployment strategy, component details
- **Use case**: Show architecture visualization and component breakdown

### 4.js - + Architecture Decisions
- **Purpose**: All workflow sections completed (ready for export)
- **Data**: Previous + ADRs (Architecture Decision Records)
- **Use case**: Demonstrate complete workflow before export

### 5.js - Complete Workflow
- **Purpose**: Fully completed application with export artifacts
- **Data**: All sections + export configurations, prompts, and instructions
- **Use case**: Show end-to-end completed workflow

## How It Works

### Data Backup
All demo data is stored in `data-backup/` and is used to restore each demo state.

### Script Behavior
- Each script (1-5) starts by cleaning all data, then selectively restores up to that step
- Scripts are idempotent — safe to run multiple times

### Example Flow
```bash
# Start clean
node 0.js

# Add application definition
node 1.js

# Go back to clean state
node 0.js

# Jump directly to state 4 (skipping 1-3)
node 4.js
```

## File Structure

```
src/demo/
├── _lib.js         # Shared helpers (path resolution, file ops)
├── 0.js            # Clean state script
├── 1.js            # State 1 script
├── 2.js            # State 2 script
├── 3.js            # State 3 script
├── 4.js            # State 4 script
├── 5.js            # State 5 script
├── help.js         # Show current state and available commands
├── README.md       # This file
└── data-backup/    # Backup of all demo data
    ├── application-definition/
    ├── context/
    ├── application-architecture/
    ├── architecture-decisions/
    └── export/
```

## Notes

- Scripts are idempotent - run them multiple times safely
- Each script gives visual feedback about what it's doing
- Refresh your browser after running a script to see changes
- Scripts preserve README.md files and directory structure

