# 🧩 Module 01: Core Logic Engine (Validator, Solver, Generator)

This guide documents the implementation details, mathematical concepts, and testing procedures for **Part 1** of Sudoku Open Lab.

---

## 🎯 Objectives

1. Build a fast, pure JavaScript Sudoku engine with zero external dependencies.
2. Implement:
   - **Validator**: Checks if numbers violate Sudoku rules (row, column, or 3×3 box duplicates).
   - **Solver**: Uses recursive backtracking with the **Minimum Remaining Values (MRV)** heuristic for maximum performance.
   - **Generator**: Produces random, valid Sudoku puzzles with guaranteed unique solutions for 4 difficulty levels: Easy, Medium, Hard, and Expert.

---

## 1️⃣ Validator (`src/engine/validator.js`)

Sudoku rules state that every row, column, and 3×3 subgrid must contain digits 1 through 9 with **no duplicates**.

### Exported Functions

#### `isValidPlacement(board, row, col, value)`
Determines if placing `value` at `(row, col)` violates any Sudoku constraints.
- **Row check**: Checks if `value` exists in `board[row][c]` for any `c !== col`.
- **Column check**: Checks if `value` exists in `board[r][col]` for any `r !== row`.
- **3×3 Box check**: Checks if `value` exists in the subgrid starting at:
  $$\text{startRow} = \lfloor \text{row} / 3 \rfloor \times 3$$
  $$\text{startCol} = \lfloor \text{col} / 3 \rfloor \times 3$$

#### `findConflicts(board)`
Scans the entire board and returns a list or set of coordinates `(row, col)` that currently contain invalid duplicate digits. This is used by the UI to highlight invalid cells in real time.

#### `isBoardSolved(board)`
Returns `true` if all 81 cells are filled with non-zero digits and there are zero conflicts across all rows, columns, and boxes.

---

## 2️⃣ Solver (`src/engine/solver.js`)

A standard naive backtracking algorithm tries digits 1–9 sequentially. While functional, it can be slow on difficult boards.

### Optimized MRV (Minimum Remaining Values) Backtracking
Instead of picking the next empty cell in order, we pick the cell with the **fewest possible valid candidates**.

1. Find the empty cell `(row, col)` that has the minimum number of valid candidate numbers.
2. If no empty cells remain, the puzzle is solved.
3. If an empty cell has 0 valid candidates, backtrack immediately (dead end detected early).
4. Iterate through candidate numbers:
   - Place number.
   - Recurse.
   - If recursion succeeds, return the solved board.
   - If recursion fails, reset cell to `0` and continue.

### Uniqueness Verification (`countSolutions(board, limit = 2)`)
A proper Sudoku puzzle **must have exactly one unique solution**.
- Backtracking searches for solutions, but stops searching as soon as it discovers a second solution (`count >= 2`).
- If `count === 1`, the puzzle has a unique solution.

---

## 3️⃣ Generator (`src/engine/generator.js`)

### Generation Algorithm
1. **Create an empty 9×9 board**.
2. **Fill the 3 independent diagonal 3×3 boxes**:
   - Box (0, 0), Box (3, 3), and Box (6, 6) share no rows or columns with each other.
   - They can be filled with random permutations of `[1..9]` without any conflicts.
3. **Solve the board**:
   - Run the solver with randomized candidate ordering to generate a complete, randomized 81-cell solution.
4. **Remove clues (Hole Digging)**:
   - Iterate through cell positions in a randomized order.
   - Temporarily remove the digit from cell `(r, c)`.
   - Call `countSolutions(board, 2)`:
     - If `count === 1`, the puzzle is still uniquely solvable. Keep the cell empty.
     - If `count > 1`, removing the number introduced multiple solutions! Revert the cell.
   - Stop when target clue count is reached.

### Difficulty Presets

| Difficulty | Target Clues | Empty Cells |
| :--- | :--- | :--- |
| **Easy** | 38 – 42 | 39 – 43 |
| **Medium** | 32 – 36 | 45 – 49 |
| **Hard** | 27 – 31 | 50 – 54 |
| **Expert** | 23 – 26 | 55 – 58 |

---

## 🧪 Verification & Testing

To test the engine:
```bash
npm run test
```
The test suite validates:
- [x] Board validator correctly flags row, column, and box conflicts.
- [x] Solver solves sample puzzles within < 15ms.
- [x] Generator creates puzzles that have strictly 1 solution for each difficulty tier.
