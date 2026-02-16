# Demo Scripts

This directory contains shell scripts to quickly set up different demo states of the application by managing the data folder contents.

## Quick Start

Run any script to set the application to that demo state:

```bash
cd src/demo
./0.sh   # Clean state (no data)
./1.sh   # Application Definition only
./2.sh   # + Context
./3.sh   # + Application Architecture
./4.sh   # + Architecture Decisions
./5.sh   # Complete (all data)
```

## Demo States

### 0.sh - Clean Application
- **Purpose**: Show empty application state
- **Data**: None
- **Use case**: Demonstrate what a new user sees when first starting

### 1.sh - Application Definition
- **Purpose**: First step of workflow completed
- **Data**: Application overview, non-functional requirements, components
- **Use case**: Show how the first planning boxes get filled

### 2.sh - Application Definition + Context
- **Purpose**: Two sections completed
- **Data**: Previous + infrastructure, platform, and development context
- **Use case**: Demonstrate context gathering phase

### 3.sh - + Application Architecture
- **Purpose**: Three sections completed
- **Data**: Previous + architecture diagram, deployment strategy, component details
- **Use case**: Show architecture visualization and component breakdown

### 4.sh - + Architecture Decisions
- **Purpose**: All workflow sections completed (ready for export)
- **Data**: Previous + ADRs (Architecture Decision Records)
- **Use case**: Demonstrate complete workflow before export

### 5.sh - Complete Workflow
- **Purpose**: Fully completed application with export artifacts
- **Data**: All sections + export configurations, prompts, and instructions
- **Use case**: Show end-to-end completed workflow

## How It Works

### Data Backup
All current data is backed up in `data-backup/` directory when you first create these scripts. This backup is used to restore data for each demo state.

### Script Behavior
- Each script (1-5) starts by running `0.sh` to clean all data
- Then it selectively restores data up to that step
- Data from later steps is always removed to ensure clean state

### Example Flow
```bash
# Start clean
./0.sh

# Add application definition
./1.sh

# Go back to clean state
./0.sh

# Jump directly to state 4 (skipping 1-3)
./4.sh
```

## File Structure

```
src/demo/
├── 0.sh            # Clean state script
├── 1.sh            # State 1 script
├── 2.sh            # State 2 script
├── 3.sh            # State 3 script
├── 4.sh            # State 4 script
├── 5.sh            # State 5 script
├── README.md       # This file
└── data-backup/    # Backup of all data
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
