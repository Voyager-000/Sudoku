# Sudoku Open Lab — Modular Development Plan

Tailored specifically for [Voyager-000/Sudoku](https://github.com/Voyager-000/Sudoku) using **React + Vite + Modern Vanilla CSS**.

---

## 🏛️ Project Architecture & Directory Structure

```text
sudoku/
├── public/
│   ├── favicon.svg
│   └── cat/                 # Vector/SVG cat emotion assets
├── src/
│   ├── assets/              # Icons, sounds
│   ├── engine/              # Pure logic & algorithms (Framework-agnostic)
│   │   ├── constants.js     # Grid dimensions, difficulty presets
│   │   ├── validator.js     # Row, column, 3x3 box & conflict checks
│   │   ├── solver.js        # Backtracking solver with MRV heuristic
│   │   ├── generator.js     # Board generator & unique solution hole-digger
│   │   ├── evaluator.js     # Situational review & move quality evaluator
│   │   └── hints.js         # Logical deduction hints (Naked single, etc.)
│   ├── hooks/               # Custom React hooks
│   │   ├── useSudoku.js     # Game state, board data, history stack
│   │   ├── useCatEmotion.js # Cat state machine & speech bubble reactions
│   │   ├── useTimer.js      # Game timer & pause/resume
│   │   └── useKeyboard.js   # Numpad & arrow key navigation
│   ├── components/
│   │   ├── Header.jsx       # Title, difficulty selector, GitHub link
│   │   ├── Board.jsx        # 9x9 Grid layout with 3x3 box borders
│   │   ├── Cell.jsx         # Single cell with value & 3x3 pencil marks
│   │   ├── CatCompanion.jsx # Animated reactive Cat (emotions, dialogue box)
│   │   ├── Controls.jsx     # Undo, Erase, Notes toggle, Hint, New Game
│   │   ├── Numpad.jsx       # 1-9 touch & click keypad with remaining counts
│   │   ├── StatsModal.jsx   # Victory modal with confetti & game stats
│   │   └── Timer.jsx        # Elapsed time display
│   ├── styles/
│   │   ├── index.css        # Design tokens, modern periwinkle palette, typography
│   │   ├── board.css        # Grid styles, crosshairs, animations
│   │   ├── cat.css          # Cat companion, dialogue bubble, emotion animations
│   │   └── controls.css     # Buttons, keypad, modern cards
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

### 🔹 Part 5: "Mochi the Cat" Companion & Situational Reviewer
> **Goal**: Create an interactive animated companion inspired by Chess.com bots that monitors the game situation, reacts dynamically to good/bad moves, and offers live review commentary.

1. **Situational Review Engine (`src/engine/evaluator.js`)**:
   - Evaluates player moves against constraints and the puzzle solution.
   - Categorizes moves into:
     - 🌟 **Brilliant / Key Move**: Finding a single candidate cell or completing a tricky sector.
     - 👍 **Solid Move**: Valid, correct placement that advances completion.
     - ⚠️ **Oops / Inaccuracy**: Duplicate number or placement violating row/col/box rules.
     - 🐾 **Milestone**: Completed row, column, or 3×3 block.
   - Game review evaluation: Calculates % completed and streak.
2. **Cat State Machine (`useCatEmotion.js`)**:
   - Emotional states: `idle`, `thinking`, `happy`, `shocked`, `cheering`, `celebrating`.
   - Dynamic contextual dialogue pool (encouraging, witty, and educational).
3. **`<CatCompanion />` UI Component**:
   - Expressive vector/SVG animated cat companion perched beside controls.
   - Responsive speech bubble with live situational commentary.
   - Interactive: clicking/hovering Mochi prompts playful reactions.

---

### 🔹 Part 6: Smart Hints, Audio, Victory Modal & Open-Source Polish
> **Goal**: Tiered educational hints, tactile audio, confetti celebration, and contributor readiness.

1. **Smart Tiered Hints (`hints.js`)**:
   - **Naked Single** & **Hidden Single** step-by-step guidance.
   - Companion explains the exact logic instead of just spoiling the answer.
2. **Audio & Celebration**:
   - Confetti burst on win with cat wearing a victory party hat.
   - Subtle tactile Web Audio clicks (with toggle to mute).
   - `<StatsModal />` with time taken, difficulty, accuracy, and personal records.
3. **Open-Source Readiness (Sudoku Open Lab)**:
   - Well-documented code with JSDoc comments to make it effortless for students to pick up issues.

---

## 🚀 Recommended Next Step

We can proceed step-by-step starting with **Part 1**:
1. Scaffold the Vite + React app inside `d:\Aman\SUDOKU`.
2. Implement and test the pure mathematical engine (`validator.js`, `solver.js`, `generator.js`).
