/**
 * Sudoku Game Constants & Configuration Presets
 */

export const GRID_SIZE = 9;
export const BOX_SIZE = 3;
export const TOTAL_CELLS = 81;

export const DIFFICULTIES = {
  EASY: {
    id: 'easy',
    name: 'Easy',
    clues: 40,
    minClues: 38,
    maxClues: 42
  },
  MEDIUM: {
    id: 'medium',
    name: 'Medium',
    clues: 34,
    minClues: 32,
    maxClues: 36
  },
  HARD: {
    id: 'hard',
    name: 'Hard',
    clues: 28,
    minClues: 26,
    maxClues: 30
  },
  EXPERT: {
    id: 'expert',
    name: 'Expert',
    clues: 24,
    minClues: 22,
    maxClues: 25
  }
};

export const CAT_EMOTIONS = {
  IDLE: 'idle',
  THINKING: 'thinking',
  HAPPY: 'happy',
  SHOCKED: 'shocked',
  CHEERING: 'cheering',
  CELEBRATE: 'celebrate'
};

export const MOVE_QUALITY = {
  BRILLIANT: 'BRILLIANT',
  SOLID: 'SOLID',
  MISTAKE: 'MISTAKE',
  ERASE: 'ERASE'
};
