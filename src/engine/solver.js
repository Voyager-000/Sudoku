import { GRID_SIZE } from './constants.js';
import { cloneBoard, isValidPlacement } from './validator.js';

/**
 * Returns an array of valid numbers [1..9] that can legally be placed in (row, col).
 * @param {number[][]} board 
 * @param {number} row 
 * @param {number} col 
 * @returns {number[]} Array of valid digits
 */
export function getCandidates(board, row, col) {
  if (board[row][col] !== 0) return [];
  const candidates = [];
  for (let num = 1; num <= 9; num++) {
    if (isValidPlacement(board, row, col, num)) {
      candidates.push(num);
    }
  }
  return candidates;
}

/**
 * Finds the empty cell with the Minimum Remaining Values (MRV heuristic).
 * This significantly optimizes backtracking by failing early.
 * @param {number[][]} board 
 * @returns {{ row: number, col: number, candidates: number[] } | null}
 */
export function findMRVCell(board) {
  let bestCell = null;
  let minCandidatesCount = 10;

  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      if (board[r][c] === 0) {
        const candidates = getCandidates(board, r, c);
        
        // Immediate failure: an empty cell with zero valid moves
        if (candidates.length === 0) {
          return { row: r, col: c, candidates: [] };
        }

        if (candidates.length < minCandidatesCount) {
          minCandidatesCount = candidates.length;
          bestCell = { row: r, col: c, candidates };
          
          // Optimal: only 1 candidate, cannot get better than this
          if (minCandidatesCount === 1) return bestCell;
        }
      }
    }
  }

  return bestCell;
}

/**
 * Backtracking solver using MRV heuristic.
 * @param {number[][]} board - Board to solve
 * @param {boolean} [randomize=false] - Randomize candidate exploration order for generation
 * @returns {{ solved: boolean, board: number[][] | null }}
 */
export function solveSudoku(board, randomize = false) {
  const workingBoard = cloneBoard(board);

  function backtrack() {
    const nextCell = findMRVCell(workingBoard);
    
    // Base case: No empty cells left, puzzle is solved
    if (!nextCell) return true;
    
    // Dead end: Cell has 0 candidates
    if (nextCell.candidates.length === 0) return false;

    let candidates = nextCell.candidates;
    if (randomize) {
      candidates = [...candidates].sort(() => Math.random() - 0.5);
    }

    const { row, col } = nextCell;
    for (const val of candidates) {
      workingBoard[row][col] = val;
      if (backtrack()) return true;
      workingBoard[row][col] = 0;
    }

    return false;
  }

  const success = backtrack();
  return {
    solved: success,
    board: success ? workingBoard : null
  };
}

/**
 * Counts the number of distinct solutions for a board, stopping once `limit` is reached.
 * Used during puzzle generation to guarantee uniqueness (`count === 1`).
 * @param {number[][]} board 
 * @param {number} [limit=2] - Maximum solutions to search for before stopping
 * @returns {number} Number of solutions found (0, 1, or limit)
 */
export function countSolutions(board, limit = 2) {
  const workingBoard = cloneBoard(board);
  let count = 0;

  function backtrack() {
    const nextCell = findMRVCell(workingBoard);
    if (!nextCell) {
      count++;
      return count >= limit;
    }
    if (nextCell.candidates.length === 0) return false;

    const { row, col, candidates } = nextCell;
    for (const val of candidates) {
      workingBoard[row][col] = val;
      const reachedLimit = backtrack();
      workingBoard[row][col] = 0;
      if (reachedLimit) return true;
    }
    return false;
  }

  backtrack();
  return count;
}
