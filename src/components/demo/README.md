# Demo Mode UI

A hidden demo mode that allows quick switching between different data states for demonstration and testing purposes.

## Activation

Press **`Ctrl + Shift + D`** anywhere in the application to toggle the demo control panel.

Press **`ESC`** to close the panel.

## Features

### Context-Aware Controls

The demo panel adapts based on the current page:

- **Application Definition page**: Shows options to clear or fill this section
- **Context page**: Shows options for clean, with App Definition, or filled
- **Architecture page**: Shows options for clean, with Context, or filled
- **Decisions page**: Shows options for clean, with Architecture, or filled
- **Export page**: Shows options for clean, with ADRs, or complete
- **Other pages**: Shows all 6 demo states (0-5)

### Visual Feedback

- Current state is highlighted with a blue border and checkmark
- Loading overlay appears while applying changes
- Page automatically refreshes after state change to show new data

## Implementation Details

### Components

**`src/components/demo/DemoControl.tsx`**
- Client-side React component
- Keyboard shortcut listener
- Floating modal in top-right corner
- Context-aware button configuration

### API Routes

**`src/app/api/demo/state/route.ts`**
- `GET /api/demo/state` - Detects and returns current demo state (0-5)
- `POST /api/demo/state` - Executes shell script to set new state

### Shell Scripts

Uses existing scripts in `src/demo/`:
- `0.sh` - Clean state
- `1.sh` - Application Definition
- `2.sh` - + Context
- `3.sh` - + Application Architecture
- `4.sh` - + Architecture Decisions
- `5.sh` - Complete

## How It Works

1. User presses `Ctrl+Shift+D`
2. Component fetches current state from API
3. Shows context-aware buttons based on current page
4. User clicks a state button
5. API executes corresponding shell script
6. Page reloads to show updated data

## State Detection

The API automatically detects the current state by checking for key files:

- **State 0**: No data files exist
- **State 1**: Application Definition files exist
- **State 2**: + Context files exist
- **State 3**: + Architecture files exist
- **State 4**: + ADR files exist
- **State 5**: + Export files exist

## Security Considerations

- Only available in development/demo environments
- Consider adding environment variable check for production
- API routes execute shell scripts - ensure proper validation

## Future Enhancements

- Add environment variable to disable in production
- Add confirmation dialog for destructive actions (state 0)
- Add toast notifications for success/error states
- Add animation when state changes
- Add ability to preview state without reloading
