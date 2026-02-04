# Chinese New Year Hidden Object Game

A festive web-based hidden object game built with React, TypeScript, and the Internet Computer platform. Find hidden objects across 3 Chinese New Year themed levels while your progress is securely stored on-chain.

## Architecture

### Frontend
- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS with custom Chinese New Year theme (red & gold palette)
- **UI Components**: shadcn/ui (Radix primitives)
- **State Management**: React Query for server state, React hooks for local state
- **Routing**: Simple screen-based navigation (no router library needed)

### Backend
- **Platform**: Internet Computer (Motoko canister)
- **Storage**: Stable storage with Principal-keyed user data
- **Authentication**: Internet Identity (decentralized identity)

### Data Flow
1. **Authentication**: User signs in with Internet Identity → receives unique Principal ID
2. **Profile Setup**: First-time users provide display name → stored in canister
3. **Load Progress**: Frontend fetches user's level completion status from canister
4. **Gameplay**: User finds hidden objects in 2D scenes (5 per level)
5. **Save Progress**: On level completion, frontend calls canister to mark level completed
6. **Cache Management**: React Query invalidates cache after updates for instant UI refresh

## Game Features

### Levels
- **Level 1**: Find 5 Red Envelopes (Angpao) 🧧
- **Level 2**: Find 5 Gold Coins 🪙
- **Level 3**: Find 5 Mochi 🍡

### Gameplay
- Click on hidden objects to mark them as found
- Visual feedback (highlight + animation) on successful finds
- Sound effects with mute toggle
- Progress counter (X/5) and remaining items list
- Completion persists across sessions

## Local Development

### Prerequisites
- Node.js 18+ and pnpm
- DFX (Internet Computer SDK): `sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)"`

### Setup & Run

1. **Install dependencies**:
   ```bash
   cd frontend
   pnpm install
   ```

2. **Start local Internet Computer replica**:
   ```bash
   dfx start --clean --background
   ```

3. **Deploy backend canister**:
   ```bash
   dfx deploy backend
   ```

4. **Generate TypeScript bindings**:
   ```bash
   dfx generate backend
   ```

5. **Start frontend dev server**:
   ```bash
   pnpm start
   ```

6. **Open browser**: Navigate to `http://localhost:3000`

### Quick Start (All-in-one)
