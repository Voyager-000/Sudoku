# 🏛️ Sudoku Open Lab — System Architecture

This document provides a comprehensive technical overview of the architecture, data models, and design patterns used in **Sudoku Open Lab**. It is written to help students and new contributors understand how the application works under the hood.

---

## 📐 Architecture Overview

Sudoku Open Lab is built with a **layered, decoupled architecture**. This means the mathematical logic of the game does not know about React, and the React UI does not implement core Sudoku algorithms directly.

```
┌────────────────────────────────────────────────────────┐
│                      User Interface                    │
│      React Components: Board, Cell, Controls, Numpad    │
└───────────────────────────▲────────────────────────────┘
                            │ React Props & State
┌───────────────────────────┴────────────────────────────┐
│                    State Management                    │
│      Custom React Hooks: useSudoku, useTimer, etc.     │
└───────────────────────────▲────────────────────────────┘
                            │ Function Calls & Data
┌───────────────────────────┴────────────────────────────┐
│                  Pure Logic Engine                     │
│      Vanilla JS: validator, solver, generator, hints   │
└────────────────────────────────────────────────────────┘
```

### Why Decouple the Engine?
1. **Easy to Unit Test**: Pure functions can be tested in Node.js / Vitest with zero browser or DOM mocking.
2. **Framework Independent**: The engine can be reused in any environment (CLI, React Native, Vue, Node.js).
3. **Beginner-Friendly**: Students can contribute to algorithms without needing deep React knowledge.

---

## 📊 Core Data Models

### 1. Board Representation
A Sudoku board is represented as a **9×9 two-dimensional array of integers** (`0` to `9`):
- `0`: Represents an empty cell.
- `1` through `9`: Confirmed digit.

```javascript
// Example: 9x9 board structure
const board = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  // ... 9 rows in total, each with 9 numbers
];
```

### 2. Cell Coordinates
Coordinates are zero-indexed:
- `row`: `0` to `8` (top to bottom)
- `col`: `0` to `8` (left to right)
- `boxIndex`: `Math.floor(row / 3) * 3 + Math.floor(col / 3)` (values `0` to `8`)

```text
3x3 Box Layout:
[0] [1] [2]
[3] [4] [5]
[6] [7] [8]
```

### 3. Pencil Marks (Notes)
Candidate notes are stored per cell as a JavaScript `Set` or boolean array of length 10:
```javascript
// Example: notes for cell at row 0, col 2
const cellNotes = new Set([1, 4, 8]); // Player marked 1, 4, and 8 as possible candidates
```

### 4. Move History (Undo / Redo)
To support infinite undo/redo, moves are pushed onto a history stack:
```javascript
const moveRecord = {
  type: 'SET_DIGIT' | 'ERASE' | 'TOGGLE_NOTE',
  row: 2,
  col: 4,
  prevValue: 0,
  newValue: 6,
  prevNotes: [1, 6],
  newNotes: []
};
```

---

## ⚙️ Module Responsibilities

| Directory | Primary Responsibility |
| :--- | :--- |
| `src/engine/constants.js` | Grid dimensions (9x9, 3x3), difficulty levels, keybindings |
| `src/engine/validator.js` | Move legality, conflict detection, completed board check |
| `src/engine/solver.js` | Backtracking algorithm, solution counter, uniqueness check |
| `src/engine/generator.js` | Full grid generation, clue removal with difficulty targets |
| `src/engine/hints.js` | Logical human solving techniques (Naked Single, Hidden Single) |
| `src/hooks/useSudoku.js` | High-level game state (board, history, selection, game status) |
| `src/hooks/useTimer.js` | Stopwatch logic, pause/resume, persistence |
| `src/hooks/useKeyboard.js`| Keyboard event listeners (arrows, 1-9, backspace, N key) |
| `src/components/` | Visual presentations, CSS Grid layouts, accessibility attributes |
| `src/styles/` | Design tokens, color system, responsive queries, subtle animations |

---

## 🧪 Testing Strategy

Every engine module in `src/engine/` is accompanied by automated unit tests:
- Tests verify edge cases (e.g. invalid digits, unsolvable boards, boards with multiple solutions).
- Benchmarks ensure generator creates unique puzzles within sub-50ms execution times.

---

## 📚 Further Reading & Module Guides

- [Module 1: Core Engine Implementation Guide](./modules/01-core-engine.md)
- [Module 2: Coach Mochi Cat Companion & Situational Reviewer](./modules/02-cat-companion.md)
- [Module 3: UI Architecture, Styling & Keyboard Controls](./modules/03-ui-and-interactions.md)
