import { useState, useEffect, useCallback } from 'react';
import { generatePuzzle } from '../engine/generator.js';
import { getConflicts, isBoardSolved, cloneBoard } from '../engine/validator.js';
import { evaluateMove } from '../engine/evaluator.js';
import { GRID_SIZE } from '../engine/constants.js';

export function useSudoku(onMoveEvaluated) {
  const [difficulty, setDifficulty] = useState('medium');
  const [initialBoard, setInitialBoard] = useState(null);
  const [solutionBoard, setSolutionBoard] = useState(null);
  const [currentBoard, setCurrentBoard] = useState(null);
  const [selectedCell, setSelectedCell] = useState(null);
  const [notes, setNotes] = useState(() => 
    Array.from({ length: GRID_SIZE }, () => Array.from({ length: GRID_SIZE }, () => new Set()))
  );
  const [notesMode, setNotesMode] = useState(false);
  const [conflicts, setConflicts] = useState(new Set());
  const [history, setHistory] = useState([]);
  const [isSolved, setIsSolved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize a new game
  const startNewGame = useCallback((diff = difficulty) => {
    setIsLoading(true);
    setDifficulty(diff);
    // Timeout gives browser tick to render loading if needed
    setTimeout(() => {
      const puzzle = generatePuzzle(diff);
      setInitialBoard(puzzle.initialBoard);
      setSolutionBoard(puzzle.solutionBoard);
      setCurrentBoard(cloneBoard(puzzle.initialBoard));
      setSelectedCell(null);
      setNotes(Array.from({ length: GRID_SIZE }, () => Array.from({ length: GRID_SIZE }, () => new Set())));
      setConflicts(new Set());
      setHistory([]);
      setIsSolved(false);
      setIsLoading(false);
    }, 10);
  }, [difficulty]);

  useEffect(() => {
    startNewGame('medium');
  }, []);

  // Select a cell
  const selectCell = useCallback((row, col) => {
    setSelectedCell({ row, col });
  }, []);

  // Enter a digit into the selected cell
  const inputDigit = useCallback((digit) => {
    if (!selectedCell || !currentBoard || !initialBoard || isSolved) return;
    const { row, col } = selectedCell;

    // Cannot modify initial puzzle clues
    if (initialBoard[row][col] !== 0) return;

    if (notesMode) {
      // Toggle note
      setNotes(prevNotes => {
        const newNotes = prevNotes.map((r, rIdx) => 
          r.map((cellSet, cIdx) => {
            if (rIdx === row && cIdx === col) {
              const updated = new Set(cellSet);
              if (updated.has(digit)) updated.delete(digit);
              else updated.add(digit);
              return updated;
            }
            return cellSet;
          })
        );
        return newNotes;
      });
      return;
    }

    // Regular digit placement
    const prevVal = currentBoard[row][col];
    if (prevVal === digit) return; // No change

    const newBoard = cloneBoard(currentBoard);
    newBoard[row][col] = digit;

    // Record history for Undo
    setHistory(prev => [...prev, { row, col, prevVal, newVal: digit }]);
    setCurrentBoard(newBoard);

    // Update rule conflicts
    const updatedConflicts = getConflicts(newBoard);
    setConflicts(updatedConflicts);

    // Evaluate move for Cat Companion review
    if (onMoveEvaluated && solutionBoard) {
      const review = evaluateMove(newBoard, solutionBoard, initialBoard, row, col, digit);
      onMoveEvaluated(review);
    }

    // Check if entire puzzle is solved
    if (isBoardSolved(newBoard)) {
      setIsSolved(true);
    }
  }, [selectedCell, currentBoard, initialBoard, solutionBoard, isSolved, notesMode, onMoveEvaluated]);

  // Erase value in selected cell
  const eraseCell = useCallback(() => {
    if (!selectedCell || !currentBoard || !initialBoard || isSolved) return;
    const { row, col } = selectedCell;

    // Cannot erase initial clues
    if (initialBoard[row][col] !== 0) return;

    const prevVal = currentBoard[row][col];
    if (prevVal === 0 && notes[row][col].size === 0) return;

    const newBoard = cloneBoard(currentBoard);
    newBoard[row][col] = 0;

    // Clear notes for this cell as well
    setNotes(prevNotes => 
      prevNotes.map((r, rIdx) => 
        r.map((cellSet, cIdx) => (rIdx === row && cIdx === col ? new Set() : cellSet))
      )
    );

    setHistory(prev => [...prev, { row, col, prevVal, newVal: 0 }]);
    setCurrentBoard(newBoard);
    setConflicts(getConflicts(newBoard));

    if (onMoveEvaluated && solutionBoard) {
      const review = evaluateMove(newBoard, solutionBoard, initialBoard, row, col, 0);
      onMoveEvaluated(review);
    }
  }, [selectedCell, currentBoard, initialBoard, solutionBoard, isSolved, notes, onMoveEvaluated]);

  // Undo last move
  const undo = useCallback(() => {
    if (history.length === 0 || !currentBoard || isSolved) return;

    const lastMove = history[history.length - 1];
    const newBoard = cloneBoard(currentBoard);
    newBoard[lastMove.row][lastMove.col] = lastMove.prevVal;

    setHistory(prev => prev.slice(0, -1));
    setCurrentBoard(newBoard);
    setConflicts(getConflicts(newBoard));
    setSelectedCell({ row: lastMove.row, col: lastMove.col });
  }, [history, currentBoard, isSolved]);

  // Auto-solve puzzle (for instant review/showcase)
  const solveGame = useCallback(() => {
    if (!solutionBoard) return;
    setCurrentBoard(cloneBoard(solutionBoard));
    setConflicts(new Set());
    setIsSolved(true);
    if (onMoveEvaluated) {
      onMoveEvaluated({
        emotion: 'celebrate',
        message: "Behold! The complete solution revealed! 🐾✨",
        progress: 100,
        isCorrect: true
      });
    }
  }, [solutionBoard, onMoveEvaluated]);

  // Count remaining placements needed for digits 1-9
  const getRemainingCounts = useCallback(() => {
    const counts = { 1: 9, 2: 9, 3: 9, 4: 9, 5: 9, 6: 9, 7: 9, 8: 9, 9: 9 };
    if (!currentBoard) return counts;

    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        const val = currentBoard[r][c];
        if (val >= 1 && val <= 9) {
          counts[val] = Math.max(0, counts[val] - 1);
        }
      }
    }
    return counts;
  }, [currentBoard]);

  return {
    difficulty,
    initialBoard,
    currentBoard,
    solutionBoard,
    selectedCell,
    conflicts,
    notes,
    notesMode,
    isSolved,
    isLoading,
    canUndo: history.length > 0,
    remainingCounts: getRemainingCounts(),
    startNewGame,
    selectCell,
    inputDigit,
    eraseCell,
    undo,
    solveGame,
    setNotesMode
  };
}
