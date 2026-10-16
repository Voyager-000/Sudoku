import { GRID_SIZE, BOX_SIZE, CAT_EMOTIONS, MOVE_QUALITY } from './constants.js';
import { isValidPlacement } from './validator.js';

const ENCOURAGING_DIALOGUES = [
  "Purr-fect move! Looking sharp! 🐾",
  "Nice deduction! We're making progress.",
  "Spot on! Keep the momentum going! ✨",
  "Great eye! That fits beautifully.",
  "Mochi approves! On to the next cell! 🐱"
];

const THINKING_DIALOGUES = [
  "Hmm, let's scan the row and column...",
  "What numbers can go here? Check the candidates!",
  "Take your time, master puzzler.",
  "Mochi is watching intently... 🐾"
];

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Checks if the row, column, or 3x3 box containing (row, col) is completely filled and valid.
 * @param {number[][]} board 
 * @param {number} row 
 * @param {number} col 
 * @returns {{ rowComplete: boolean, colComplete: boolean, boxComplete: boolean }}
 */
export function checkSectorCompletion(board, row, col) {
  // Check row
  let rowComplete = true;
  for (let c = 0; c < GRID_SIZE; c++) {
    if (board[row][c] === 0) {
      rowComplete = false;
      break;
    }
  }

  // Check column
  let colComplete = true;
  for (let r = 0; r < GRID_SIZE; r++) {
    if (board[r][col] === 0) {
      colComplete = false;
      break;
    }
  }

  // Check box
  let boxComplete = true;
  const startRow = Math.floor(row / BOX_SIZE) * BOX_SIZE;
  const startCol = Math.floor(col / BOX_SIZE) * BOX_SIZE;
  for (let r = 0; r < BOX_SIZE; r++) {
    for (let c = 0; c < BOX_SIZE; c++) {
      if (board[startRow + r][startCol + c] === 0) {
        boxComplete = false;
        break;
      }
    }
    if (!boxComplete) break;
  }

  return { rowComplete, colComplete, boxComplete };
}

/**
 * Calculates current progress percentage of player cells (excluding given clues).
 * @param {number[][]} currentBoard 
 * @param {number[][]} solutionBoard 
 * @param {number[][]} initialBoard 
 * @returns {number} Percentage (0 - 100)
 */
export function calculateProgress(currentBoard, solutionBoard, initialBoard) {
  let playerTotal = 0;
  let playerCorrect = 0;

  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      if (initialBoard[r][c] === 0) {
        playerTotal++;
        if (currentBoard[r][c] === solutionBoard[r][c]) {
          playerCorrect++;
        }
      }
    }
  }

  return playerTotal > 0 ? Math.round((playerCorrect / playerTotal) * 100) : 0;
}

/**
 * Evaluates the player's move in real time and produces a situational review report
 * for Mochi the Cat companion.
 * 
 * @param {number[][]} currentBoard - Board after the move
 * @param {number[][]} solutionBoard - The full solved board
 * @param {number[][]} initialBoard - The puzzle starting clues
 * @param {number} row - Placed cell row
 * @param {number} col - Placed cell col
 * @param {number} value - Digit placed (0 for erased)
 * @returns {object} Evaluation report with emotion, message, and move quality
 */
export function evaluateMove(currentBoard, solutionBoard, initialBoard, row, col, value) {
  // 1. Eraser move
  if (value === 0) {
    return {
      quality: MOVE_QUALITY.ERASE,
      emotion: CAT_EMOTIONS.THINKING,
      message: "Cleared that cell. Let's rethink our candidates! 🐾",
      progress: calculateProgress(currentBoard, solutionBoard, initialBoard),
      isCorrect: true
    };
  }

  // 2. Check correctness against mathematical solution
  const isCorrect = value === solutionBoard[row][col];
  const progress = calculateProgress(currentBoard, solutionBoard, initialBoard);

  if (!isCorrect) {
    const isDirectDuplicate = !isValidPlacement(currentBoard, row, col, value);
    const message = isDirectDuplicate
      ? `Meow?! That ${value} duplicates another one in the sector! 😾`
      : `Hmm, that ${value} doesn't seem quite right there. Check again!`;

    return {
      quality: MOVE_QUALITY.MISTAKE,
      emotion: CAT_EMOTIONS.SHOCKED,
      message,
      progress,
      isCorrect: false
    };
  }

  // 3. Move is correct! Check for sector completions
  const { rowComplete, colComplete, boxComplete } = checkSectorCompletion(currentBoard, row, col);

  if (progress === 100) {
    return {
      quality: MOVE_QUALITY.BRILLIANT,
      emotion: CAT_EMOTIONS.CELEBRATE,
      message: "WE DID IT! 🏆 Purr-fect game! You're a true Sudoku Grandmaster!",
      progress: 100,
      isCorrect: true
    };
  }

  if (rowComplete || colComplete || boxComplete) {
    const sectorName = rowComplete ? "row" : colComplete ? "column" : "3×3 box";
    return {
      quality: MOVE_QUALITY.BRILLIANT,
      emotion: CAT_EMOTIONS.CHEERING,
      message: `Woah! You just completed that entire ${sectorName}! ⭐`,
      progress,
      isCorrect: true
    };
  }

  if (progress >= 75) {
    return {
      quality: MOVE_QUALITY.SOLID,
      emotion: CAT_EMOTIONS.HAPPY,
      message: `Over ${progress}% complete! The finish line is right here! 🚀`,
      progress,
      isCorrect: true
    };
  }

  return {
    quality: MOVE_QUALITY.SOLID,
    emotion: CAT_EMOTIONS.HAPPY,
    message: getRandomItem(ENCOURAGING_DIALOGUES),
    progress,
    isCorrect: true
  };
}

/**
 * Returns a dialogue when selecting an empty cell.
 */
export function getThinkingDialogue() {
  return getRandomItem(THINKING_DIALOGUES);
}
