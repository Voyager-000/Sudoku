import { GRID_SIZE, BOX_SIZE, CAT_EMOTIONS, MOVE_QUALITY } from './constants.js';
import { isValidPlacement } from './validator.js';

const ENCOURAGING_DIALOGUES = [
  "Spot on! Coach approves! 👍✨",
  "Nice deduction! We're making progress. 👍",
  "Great eye! That fits beautifully. 👍",
  "Mochi approves! On to the next cell! 🐱👍"
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
  let rowComplete = true;
  for (let c = 0; c < GRID_SIZE; c++) {
    if (board[row][c] === 0) {
      rowComplete = false;
      break;
    }
  }

  let colComplete = true;
  for (let r = 0; r < GRID_SIZE; r++) {
    if (board[r][col] === 0) {
      colComplete = false;
      break;
    }
  }

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
 * Evaluates the player's move in real time and maps it to one of the 15 Cat Sticker emotions!
 */
export function evaluateMove(
  currentBoard,
  solutionBoard,
  initialBoard,
  row,
  col,
  value,
  streak = 0,
  consecutiveErrors = 0
) {
  // 1. Eraser move -> SAD Droopy-eyed regret cat
  if (value === 0) {
    return {
      quality: MOVE_QUALITY.ERASE,
      emotion: CAT_EMOTIONS.SAD,
      message: "Cleared that cell... let's rethink our candidates! 🥺",
      progress: calculateProgress(currentBoard, solutionBoard, initialBoard),
      isCorrect: true,
      streak: 0,
      errors: consecutiveErrors
    };
  }

  // 2. Check correctness against mathematical solution
  const isCorrect = value === solutionBoard[row][col];
  const progress = calculateProgress(currentBoard, solutionBoard, initialBoard);

  if (!isCorrect) {
    const isDirectDuplicate = !isValidPlacement(currentBoard, row, col, value);

    // If 2+ consecutive errors -> Fountain tears crying cat
    if (consecutiveErrors >= 2) {
      return {
        quality: MOVE_QUALITY.MISTAKE,
        emotion: CAT_EMOTIONS.CRYING,
        message: "WAAAAH! The Sudoku math is not mathing right now! 😭",
        progress,
        isCorrect: false,
        streak: 0,
        errors: consecutiveErrors + 1
      };
    }

    // If 1 previous error -> Anime vein angry mark cat
    if (consecutiveErrors === 1) {
      return {
        quality: MOVE_QUALITY.MISTAKE,
        emotion: CAT_EMOTIONS.ANGRY,
        message: "That's not it chief... Don't make Mochi use 10% of his power! 💢😾",
        progress,
        isCorrect: false,
        streak: 0,
        errors: consecutiveErrors + 1
      };
    }

    // First error / direct duplicate -> Blurry Screaming shock cat
    const message = isDirectDuplicate
      ? `MEOW?! THAT'S A DUPLICATE! Check your row or column! 😱😾`
      : `Hmm, that ${value} doesn't seem quite right there. Check again! 😱`;

    return {
      quality: MOVE_QUALITY.MISTAKE,
      emotion: CAT_EMOTIONS.SHOCKED,
      message,
      progress,
      isCorrect: false,
      streak: 0,
      errors: 1
    };
  }

  // 3. Move is correct! Check milestone triggers
  const { rowComplete, colComplete, boxComplete } = checkSectorCompletion(currentBoard, row, col);
  const newStreak = streak + 1;

  // 100% Solved -> Boss Cat in Purple Heart Sunglasses!
  if (progress === 100) {
    return {
      quality: MOVE_QUALITY.BRILLIANT,
      emotion: CAT_EMOTIONS.BOSS,
      message: "TOO EASY! Sudoku Grandmaster status unlocked! Pure swag! 💜🕶️🏆",
      progress: 100,
      isCorrect: true,
      streak: newStreak,
      errors: 0
    };
  }

  // Sector completed -> Heart Vortex Ecstasy Cat!
  if (rowComplete || colComplete || boxComplete) {
    const sectorName = rowComplete ? "row" : colComplete ? "column" : "3×3 block";
    return {
      quality: MOVE_QUALITY.BRILLIANT,
      emotion: CAT_EMOTIONS.ECSTASY,
      message: `WOAH! You just cleared an entire ${sectorName}! PURE BLISS! 💖🎉`,
      progress,
      isCorrect: true,
      streak: newStreak,
      errors: 0
    };
  }

  // 5 correct moves in a row -> Sparkle Paw Heart Cat!
  if (newStreak >= 5 && newStreak % 5 === 0) {
    return {
      quality: MOVE_QUALITY.SOLID,
      emotion: CAT_EMOTIONS.LOVE,
      message: `Purrrrr! ${newStreak} in a row without a single mistake! ❤️✨`,
      progress,
      isCorrect: true,
      streak: newStreak,
      errors: 0
    };
  }

  // Over 75% completed -> Dilated Laser Focus Cat!
  if (progress >= 75) {
    return {
      quality: MOVE_QUALITY.SOLID,
      emotion: CAT_EMOTIONS.FOCUS,
      message: `Over ${progress}% complete! In the endgame now! 🎯👀`,
      progress,
      isCorrect: true,
      streak: newStreak,
      errors: 0
    };
  }

  // Standard correct move -> Thumbs-up Cat!
  return {
    quality: MOVE_QUALITY.SOLID,
    emotion: CAT_EMOTIONS.THUMBSUP,
    message: getRandomItem(ENCOURAGING_DIALOGUES),
    progress,
    isCorrect: true,
    streak: newStreak,
    errors: 0
  };
}

/**
 * Empty cell selected -> Buffering Loading Cat (or Sweatdrop on hard)
 */
export function getThinkingReaction(difficulty = 'easy') {
  if (difficulty === 'hard' || difficulty === 'expert') {
    return {
      emotion: CAT_EMOTIONS.SWEATDROP,
      message: "Sweating bullets here! Think carefully before placing! 💧"
    };
  }
  return {
    emotion: CAT_EMOTIONS.THINKING,
    message: "Loading brain cells... what number fits here? 🔄🐾"
  };
}

/**
 * Notes mode toggled -> Sleepy Study Cat with Notebook & Pencil
 */
export function getStudyReaction(notesMode) {
  return {
    emotion: CAT_EMOTIONS.STUDY,
    message: notesMode
      ? "Pencil notes mode activated! Let's do some math! ✏️📓"
      : "Notes mode off. Back to confirmed placements! 🐾"
  };
}

/**
 * Hint requested -> Leg-Hugging Puppy Cat
 */
export function getHintReaction(digit) {
  return {
    emotion: CAT_EMOTIONS.HINT,
    message: `Here's a gentle paw to guide you! ${digit} fits right here! 💡🐾`
  };
}

/**
 * Board reset / New Game -> Polite Beluga Cat
 */
export function getPoliteReaction() {
  return {
    emotion: CAT_EMOTIONS.POLITE,
    message: "Politely waiting for your grandmaster move :) 🐾"
  };
}

/**
 * Petting the cat -> Paw Heart Sparkle Cat
 */
export function getLoveReaction() {
  return {
    emotion: CAT_EMOTIONS.LOVE,
    message: "Purrrrr! Mochi loves the pets! ❤️✨"
  };
}

/**
 * Auto-Solve / Genius move -> Gojo Satoru Cat (Domain Expansion)
 */
export function getGojoReaction() {
  return {
    emotion: CAT_EMOTIONS.GOJO,
    message: "Domain Expansion: Infinite Sudoku Void! You alone are the honored one! 🤞⚡"
  };
}
