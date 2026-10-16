import { GRID_SIZE, BOX_SIZE, DIFFICULTIES } from './constants.js';
import { createEmptyBoard, cloneBoard } from './validator.js';
import { solveSudoku, countSolutions } from './solver.js';

/**
 * Shuffles an array in place using Fisher-Yates algorithm.
 * @param {any[]} array 
 * @returns {any[]}
 */
function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Fills the 3 independent diagonal 3x3 boxes with random permutations of 1..9.
 * Because these 3 boxes share no rows or columns, filling them is conflict-free.
 * @param {number[][]} board 
 */
function fillDiagonalBoxes(board) {
  for (let box = 0; box < GRID_SIZE; box += BOX_SIZE) {
    const nums = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    let index = 0;
    for (let r = 0; r < BOX_SIZE; r++) {
      for (let c = 0; c < BOX_SIZE; c++) {
        board[box + r][box + c] = nums[index++];
      }
    }
  }
}

/**
 * Generates a complete, randomly populated valid 9x9 Sudoku board.
 * @returns {number[][]}
 */
export function generateFullBoard() {
  const board = createEmptyBoard();
  fillDiagonalBoxes(board);
  const result = solveSudoku(board, true);
  if (!result.solved) {
    // Highly unlikely fallback: restart if randomization hit an edge case
    return generateFullBoard();
  }
  return result.board;
}

/**
 * Generates a playable Sudoku puzzle with guaranteed unique solution.
 * @param {string|object} difficulty - 'easy' | 'medium' | 'hard' | 'expert' or DIFFICULTY object
 * @returns {{ initialBoard: number[][], solutionBoard: number[][], difficulty: string, clueCount: number }}
 */
export function generatePuzzle(difficulty = 'medium') {
  const diffConfig = typeof difficulty === 'string'
    ? DIFFICULTIES[difficulty.toUpperCase()] || DIFFICULTIES.MEDIUM
    : difficulty;

  const targetClues = diffConfig.clues;
  const fullBoard = generateFullBoard();
  const puzzle = cloneBoard(fullBoard);

  // Generate list of all 81 cell positions and randomize order
  const positions = [];
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      positions.push({ row: r, col: c });
    }
  }
  const shuffledPositions = shuffle(positions);

  let currentClues = 81;

  for (const { row, col } of shuffledPositions) {
    if (currentClues <= targetClues) break;

    const backup = puzzle[row][col];
    puzzle[row][col] = 0;

    // Check if the puzzle still has exactly 1 unique solution
    if (countSolutions(puzzle, 2) === 1) {
      currentClues--;
    } else {
      // Revert if removing this digit caused ambiguous solutions
      puzzle[row][col] = backup;
    }
  }

  return {
    initialBoard: puzzle,
    solutionBoard: fullBoard,
    difficulty: diffConfig.id,
    clueCount: currentClues
  };
}
