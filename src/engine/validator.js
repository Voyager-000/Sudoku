import { GRID_SIZE, BOX_SIZE } from './constants.js';

/**
 * Creates a blank 9x9 Sudoku board filled with 0s.
 * @returns {number[][]} 9x9 2D array of zeros
 */
export function createEmptyBoard() {
  return Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(0));
}

/**
 * Deep clones a 9x9 board.
 * @param {number[][]} board 
 * @returns {number[][]}
 */
export function cloneBoard(board) {
  return board.map(row => [...row]);
}

/**
 * Calculates which 3x3 box index (0-8) a given cell belongs to.
 * @param {number} row (0-8)
 * @param {number} col (0-8)
 * @returns {number} Box index (0-8)
 */
export function getBoxIndex(row, col) {
  return Math.floor(row / BOX_SIZE) * BOX_SIZE + Math.floor(col / BOX_SIZE);
}

/**
 * Checks whether placing `value` at `(row, col)` violates row, column, or 3x3 box rules.
 * @param {number[][]} board - The 9x9 board
 * @param {number} row - Target row index (0-8)
 * @param {number} col - Target column index (0-8)
 * @param {number} value - Digit to validate (1-9)
 * @returns {boolean} True if the placement is legally valid
 */
export function isValidPlacement(board, row, col, value) {
  if (value < 1 || value > 9) return false;

  // 1. Check Row
  for (let c = 0; c < GRID_SIZE; c++) {
    if (c !== col && board[row][c] === value) {
      return false;
    }
  }

  // 2. Check Column
  for (let r = 0; r < GRID_SIZE; r++) {
    if (r !== row && board[r][col] === value) {
      return false;
    }
  }

  // 3. Check 3x3 Subgrid
  const startRow = Math.floor(row / BOX_SIZE) * BOX_SIZE;
  const startCol = Math.floor(col / BOX_SIZE) * BOX_SIZE;

  for (let r = 0; r < BOX_SIZE; r++) {
    for (let c = 0; c < BOX_SIZE; c++) {
      const curRow = startRow + r;
      const curCol = startCol + c;
      if ((curRow !== row || curCol !== col) && board[curRow][curCol] === value) {
        return false;
      }
    }
  }

  return true;
}

/**
 * Scans the entire board and identifies all cells that participate in conflicts (duplicates).
 * Useful for UI error highlighting and validation.
 * @param {number[][]} board 
 * @returns {Set<string>} Set of coordinate keys in "row-col" format with conflicts
 */
export function getConflicts(board) {
  const conflicts = new Set();

  // Helper to register conflicting duplicate cells
  function checkUnit(cells) {
    const seen = new Map();
    for (const { row, col, val } of cells) {
      if (val === 0) continue;
      if (seen.has(val)) {
        conflicts.add(`${row}-${col}`);
        conflicts.add(seen.get(val));
      } else {
        seen.set(val, `${row}-${col}`);
      }
    }
  }

  // Check rows
  for (let r = 0; r < GRID_SIZE; r++) {
    const rowCells = [];
    for (let c = 0; c < GRID_SIZE; c++) {
      rowCells.push({ row: r, col: c, val: board[r][c] });
    }
    checkUnit(rowCells);
  }

  // Check columns
  for (let c = 0; c < GRID_SIZE; c++) {
    const colCells = [];
    for (let r = 0; r < GRID_SIZE; r++) {
      colCells.push({ row: r, col: c, val: board[r][c] });
    }
    checkUnit(colCells);
  }

  // Check 3x3 boxes
  for (let boxRow = 0; boxRow < 3; boxRow++) {
    for (let boxCol = 0; boxCol < 3; boxCol++) {
      const boxCells = [];
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
          const row = boxRow * 3 + r;
          const col = boxCol * 3 + c;
          boxCells.push({ row, col, val: board[row][col] });
        }
      }
      checkUnit(boxCells);
    }
  }

  return conflicts;
}

/**
 * Returns true if the board is completely filled and has zero rule conflicts.
 * @param {number[][]} board 
 * @returns {boolean}
 */
export function isBoardSolved(board) {
  // Check if every cell is non-zero
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      if (board[r][c] === 0) return false;
    }
  }

  // Check that there are no duplicate conflicts
  return getConflicts(board).size === 0;
}
