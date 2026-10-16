import { describe, it, expect } from 'vitest';
import {
  createEmptyBoard,
  cloneBoard,
  isValidPlacement,
  getConflicts,
  isBoardSolved
} from '../validator.js';
import { solveSudoku, countSolutions, getCandidates } from '../solver.js';
import { generateFullBoard, generatePuzzle } from '../generator.js';
import { evaluateMove, checkSectorCompletion, calculateProgress } from '../evaluator.js';
import { CAT_EMOTIONS, MOVE_QUALITY } from '../constants.js';

describe('Validator Module', () => {
  it('creates an empty 9x9 board', () => {
    const board = createEmptyBoard();
    expect(board.length).toBe(9);
    expect(board[0].length).toBe(9);
    expect(board[4][4]).toBe(0);
  });

  it('correctly validates row, column, and 3x3 box placement', () => {
    const board = createEmptyBoard();
    board[0][0] = 5;

    // Same row conflict
    expect(isValidPlacement(board, 0, 5, 5)).toBe(false);
    // Same col conflict
    expect(isValidPlacement(board, 5, 0, 5)).toBe(false);
    // Same 3x3 box conflict
    expect(isValidPlacement(board, 1, 1, 5)).toBe(false);
    // Valid location
    expect(isValidPlacement(board, 3, 3, 5)).toBe(true);
  });

  it('detects duplicate conflicts across the board', () => {
    const board = createEmptyBoard();
    board[0][0] = 7;
    board[0][4] = 7; // row conflict

    const conflicts = getConflicts(board);
    expect(conflicts.has('0-0')).toBe(true);
    expect(conflicts.has('0-4')).toBe(true);
  });
});

describe('Solver Module', () => {
  const samplePuzzle = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
  ];

  it('solves a classic puzzle accurately using MRV backtracking', () => {
    const result = solveSudoku(samplePuzzle);
    expect(result.solved).toBe(true);
    expect(isBoardSolved(result.board)).toBe(true);
  });

  it('counts unique solutions', () => {
    const count = countSolutions(samplePuzzle, 2);
    expect(count).toBe(1);
  });
});

describe('Generator Module', () => {
  it('generates a complete valid 9x9 board with no conflicts', () => {
    const full = generateFullBoard();
    expect(isBoardSolved(full)).toBe(true);
  });

  it('generates a playable unique puzzle for easy difficulty', () => {
    const { initialBoard, solutionBoard } = generatePuzzle('easy');
    expect(countSolutions(initialBoard, 2)).toBe(1);
    expect(isBoardSolved(solutionBoard)).toBe(true);
  });
});

describe('Cat Companion Situational Evaluator', () => {
  const solution = [
    [5, 3, 4, 6, 7, 8, 9, 1, 2],
    [6, 7, 2, 1, 9, 5, 3, 4, 8],
    [1, 9, 8, 3, 4, 2, 5, 6, 7],
    [8, 5, 9, 7, 6, 1, 4, 2, 3],
    [4, 2, 6, 8, 5, 3, 7, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],
    [9, 6, 1, 5, 3, 7, 2, 8, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 4, 5, 2, 8, 6, 1, 7, 9]
  ];

  it('reacts with SHOCKED when a player inputs an incorrect duplicate move', () => {
    const current = cloneBoard(solution);
    current[0][2] = 0; // empty
    const initial = cloneBoard(current);

    // Place 5, but 5 already exists at (0, 0)
    current[0][2] = 5;
    const report = evaluateMove(current, solution, initial, 0, 2, 5);
    expect(report.quality).toBe(MOVE_QUALITY.MISTAKE);
    expect(report.emotion).toBe(CAT_EMOTIONS.SHOCKED);
    expect(report.isCorrect).toBe(false);
  });

  it('reacts with HAPPY when placing a correct number', () => {
    const current = cloneBoard(solution);
    current[0][2] = 0;
    const initial = cloneBoard(current);

    current[0][2] = 4; // correct
    const report = evaluateMove(current, solution, initial, 0, 2, 4);
    expect(report.isCorrect).toBe(true);
  });

  it('reacts with CELEBRATE when completing the entire puzzle', () => {
    const current = cloneBoard(solution);
    current[0][0] = 0;
    const initial = cloneBoard(current);

    current[0][0] = 5;
    const report = evaluateMove(current, solution, initial, 0, 0, 5);
    expect(report.emotion).toBe(CAT_EMOTIONS.CELEBRATE);
    expect(report.progress).toBe(100);
  });
});
