# Sudoku Open Lab — Modular Development Plan

Tailored specifically for [Voyager-000/Sudoku](https://github.com/Voyager-000/Sudoku) using **React + Vite + Modern Vanilla CSS**.

---

## 🏛️ Project Architecture & Directory Structure

```text
sudoku/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/              # Icons, audio effects
│   ├── engine/              # Pure logic & algorithms (Framework-agnostic)
│   │   ├── constants.js     # Grid dimensions, difficulty presets
│   │   ├── validator.js     # Row, column, 3x3 box & conflict checks
│   │   ├── solver.js        # Backtracking solver with MRV heuristic
│   │   ├── generator.js     # Board generator & unique solution hole-digger
│   │   └── hints.js         # Logical deduction hints (Naked single, etc.)
│   ├── hooks/               # Custom React hooks
│   │   ├── useSudoku.js     # Game state, board data, history stack
│   │   ├── useTimer.js      # Game timer & pause/resume
│   │   └── useKeyboard.js   # Numpad & arrow key navigation
│   ├── components/
│   │   ├── Header.jsx       # Title, difficulty selector, theme toggle
│   │   ├── Board.jsx        # 9x9 Grid layout with 3x3 box borders
│   │   ├── Cell.jsx         # Single cell with value & 3x3 pencil marks
│   │   ├── Controls.jsx     # Undo, Erase, Notes toggle, Hint, New Game
│   │   ├── Numpad.jsx       # 1-9 touch & click keypad with remaining counts
│   │   ├── StatsModal.jsx   # Victory modal with confetti & game stats
│   │   └── Timer.jsx        # Elapsed time display
│   ├── styles/
│   │   ├── index.css        # Design tokens, CSS variables, typography
│   │   ├── board.css        # Grid styles, crosshairs, animations
│   │   └── controls.css     # Buttons, keypad, glassmorphic panels
│   ├── App.jsx              # Main application shell
│   └── main.jsx             # React DOM entry
├── package.json
└── vite.config.js
```

---

## 📦 Multi-Part Implementation Roadmap

We will implement this in **6 manageable, sequential parts**. After each part, we can verify functionality before moving on.

---

### 🔹 Part 1: Project Setup & Core Logic Engine
> **Goal**: Scaffold the React + Vite project and build pure, unit-testable Sudoku algorithms.

1. **Vite Scaffolding**:
   - Initialize Vite with React in `d:\Aman\SUDOKU`.
   - Setup clean folder structure (`src/engine/`, `src/components/`, `src/styles/`).
2. **Core Engine Modules**:
   - **`validator.js`**:
     - `isValidMove(board, row, col, value)`
     - `getAllConflicts(board)`: Returns coordinates of any conflicting duplicate numbers.
     - `isBoardComplete(board)`: Verifies if the 81 cells are correctly filled.
   - **`solver.js`**:
     - Optimized backtracking solver using MRV (Minimum Remaining Values heuristic).
     - `countSolutions(board, limit = 2)`: Ensures puzzle uniqueness.
   - **`generator.js`**:
     - Full valid board generation (randomized diagonal 3x3 boxes + solver).
     - Clue removal algorithm tuned to difficulties:
       - **Easy**: 38–42 clues.
       - **Medium**: 32–36 clues.
       - **Hard**: 27–31 clues.
       - **Expert**: 23–26 clues.
3. **Verification**:
   - Run console benchmark / tests to confirm generator produces solvable, unique boards.

---

### 🔹 Part 2: Visual Foundation & 9×9 Interactive Grid
> **Goal**: Deliver a modern, high-contrast, beautiful grid with selection and highlight systems.

1. **Design System & Aesthetics (`index.css`)**:
   - Curated color palette: Dark theme (slate/navy background, electric blue accents, soft amber highlights) + Light theme toggle.
   - Distinct 3×3 subgrid borders for effortless visual navigation.
2. **Grid Components**:
   - `<Board />`: 9x9 CSS Grid with responsive sizing (perfect square aspect ratio on mobile & desktop).
   - `<Cell />`:
     - Displays confirmed number or candidate pencil notes.
     - Visual states: Given clue (bold, immutable) vs User entry (accent color).
3. **Smart Visual Highlighting**:
   - **Crosshair highlight**: Soft tint across the active cell's row, column, and 3x3 box.
   - **Matching number highlight**: Clicking any cell with digit '5' highlights all other '5's across the grid.
   - **Conflict highlight**: Subtle red glow on duplicate digits.

---

### 🔹 Part 3: Inputs, Controls & Game State Hook
> **Goal**: Wire user interaction, numpad, keyboard navigation, and move validation.

1. **`useSudoku` Game Hook**:
   - State: `initialBoard`, `currentBoard`, `selectedCell: { row, col }`, `difficulty`.
   - Actions: `selectCell(r, c)`, `inputDigit(num)`, `eraseCell()`.
2. **Desktop Keyboard Controls (`useKeyboard`)**:
   - Arrow keys (`↑`, `↓`, `←`, `→`) / `WASD` to navigate cells.
   - Digits `1–9` to enter values.
   - `Backspace` / `Delete` to clear.
   - `N` key to toggle Notes/Pencil mode.
3. **Touch/Click Keypad (`<Numpad />`)**:
   - Numbers 1 to 9 with badge showing remaining count of each digit.
   - Quick action buttons: **Erase**, **Undo**, **New Game**.

---

### 🔹 Part 4: Pencil Marks (Notes Mode) & Quality of Life
> **Goal**: Add draft candidate notes, undo/redo history, timer, and state persistence.

1. **Pencil Marks / Notes Engine**:
   - Cell contains a miniature 3×3 grid for digits 1–9.
   - Entering a number in Notes mode toggles the candidate on/off.
   - **Auto-cleaning notes**: When a digit is confirmed in a cell, automatically erase that digit from notes in its row, column, and box.
2. **History Management (Undo / Redo)**:
   - Move stack tracking both digit placements and notes edits.
   - Undo/Redo button and shortcuts (`Ctrl+Z`, `Ctrl+Y`).
3. **Game Timer & Auto-Save**:
   - Real-time elapsed timer with Pause/Resume overlay.
   - `localStorage` persistence: Game state, timer, and difficulty auto-save so refreshing never loses progress.

---

### 🔹 Part 5: Smart Hint System & Logical Explanations
> **Goal**: Build educational, tiered hints that help players learn techniques rather than just filling answers.

1. **Hint Deduction Engine (`hints.js`)**:
   - **Naked Single**: A cell where only one number is legally possible.
   - **Hidden Single**: A number that can only fit in one specific cell within a row, col, or box.
2. **Tiered Hint Flow**:
   - Step 1: Spotlight the cell that has a logical next step.
   - Step 2: Display educational explanation text (e.g., *"In row 4, '7' can only go in this box"*).
   - Step 3 (Optional): Fill the cell for the player.
3. **Mistakes Tracker**:
   - Option for 3-strikes challenge or Relaxed/Zen mode.

---

### 🔹 Part 6: Animations, Sound, Victory Modal & Open-Source Polish
> **Goal**: Final presentation polish, victory celebration, and contributor readiness.

1. **Victory Experience**:
   - Win detection triggering canvas confetti celebration.
   - `<StatsModal />`: Time taken, difficulty, hints used, and personal best records.
2. **Micro-interactions & Audio**:
   - Pop animations when placing numbers and completed row/col flash effect.
   - Web Audio API subtle tactile click sounds (with mute toggle).
3. **Open-Source Readiness (Sudoku Open Lab)**:
   - Well-structured `CONTRIBUTING.md`.
   - Clean, documented code with JSDoc comments to make it effortless for students to pick up issues.

---

## 🚀 Recommended Next Step

We can proceed step-by-step starting with **Part 1**:
1. Scaffold the Vite + React app inside `d:\Aman\SUDOKU`.
2. Implement and test the pure mathematical engine (`validator.js`, `solver.js`, `generator.js`).
