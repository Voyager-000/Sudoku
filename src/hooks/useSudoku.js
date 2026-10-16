import { useState, useEffect, useCallback } from 'react';
import { generatePuzzle } from '../engine/generator.js';
import { getConflicts, isBoardSolved, cloneBoard } from '../engine/validator.js';
import { evaluateMove } from '../engine/evaluator.js';
import { GRID_SIZE, TOTAL_CELLS, CAT_EMOTIONS } from '../engine/constants.js';
import { sound } from '../utils/audio.js';

export function useSudoku(onMoveEvaluated, options = {}) {
  const { autoRemoveNotes = true } = options;
  const [difficulty, setDifficulty] = useState('easy');
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
  const [hintsRemaining, setHintsRemaining] = useState(3);
  const [streak, setStreak] = useState(0);
  const [consecutiveErrors, setConsecutiveErrors] = useState(0);
  const [isSolved, setIsSolved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize a new game
  const startNewGame = useCallback((diff = difficulty) => {
    setIsLoading(true);
    setDifficulty(diff);
    setTimeout(() => {
      const puzzle = generatePuzzle(diff);
      setInitialBoard(puzzle.initialBoard);
      setSolutionBoard(puzzle.solutionBoard);
      setCurrentBoard(cloneBoard(puzzle.initialBoard));
      setSelectedCell(null);
      setNotes(Array.from({ length: GRID_SIZE }, () => Array.from({ length: GRID_SIZE }, () => new Set())));
      setConflicts(new Set());
      setHistory([]);
      setStreak(0);
      setConsecutiveErrors(0);
      setHintsRemaining(3);
      setIsSolved(false);
      setIsLoading(false);
    }, 10);
  }, [difficulty]);

  useEffect(() => {
    startNewGame('easy');
  }, []);

  const selectCell = useCallback((row, col) => {
    setSelectedCell({ row, col });
  }, []);

  const inputDigit = useCallback((digit) => {
    if (!selectedCell || !currentBoard || !initialBoard || isSolved) return;
    const { row, col } = selectedCell;

    if (initialBoard[row][col] !== 0) return;

    if (notesMode) {
      sound.playTap();
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

    const prevVal = currentBoard[row][col];
    if (prevVal === digit) return;

    const newBoard = cloneBoard(currentBoard);
    newBoard[row][col] = digit;

    setHistory(prev => [...prev, { row, col, prevVal, newVal: digit }]);
    setCurrentBoard(newBoard);

    // Auto clear notes for this cell and optionally from same row, column, and box
    setNotes(prevNotes => {
      const boxStartRow = Math.floor(row / 3) * 3;
      const boxStartCol = Math.floor(col / 3) * 3;
      return prevNotes.map((rArr, rIdx) =>
        rArr.map((cellSet, cIdx) => {
          if (rIdx === row && cIdx === col) {
            return new Set();
          }
          if (autoRemoveNotes) {
            const inSameRow = rIdx === row;
            const inSameCol = cIdx === col;
            const inSameBox =
              rIdx >= boxStartRow && rIdx < boxStartRow + 3 &&
              cIdx >= boxStartCol && cIdx < boxStartCol + 3;
            if ((inSameRow || inSameCol || inSameBox) && cellSet.has(digit)) {
              const updated = new Set(cellSet);
              updated.delete(digit);
              return updated;
            }
          }
          return cellSet;
        })
      );
    });

    const updatedConflicts = getConflicts(newBoard);
    setConflicts(updatedConflicts);

    const isCorrect = solutionBoard ? digit === solutionBoard[row][col] : true;
    if (isCorrect) {
      setStreak(s => s + 1);
      setConsecutiveErrors(0);
    } else {
      setStreak(0);
      setConsecutiveErrors(e => e + 1);
      sound.playError();
    }

    if (onMoveEvaluated && solutionBoard) {
      const review = evaluateMove(
        newBoard,
        solutionBoard,
        initialBoard,
        row,
        col,
        digit,
        streak,
        consecutiveErrors
      );
      if (isCorrect) {
        if (review.emotion === CAT_EMOTIONS.ECSTASY) {
          sound.playSectionComplete();
        } else {
          sound.playChime();
        }
      }
      onMoveEvaluated(review);
    } else if (isCorrect) {
      sound.playChime();
    }

    if (isBoardSolved(newBoard)) {
      setIsSolved(true);
      sound.playVictory();
    }
  }, [selectedCell, currentBoard, initialBoard, solutionBoard, isSolved, notesMode, streak, consecutiveErrors, autoRemoveNotes, onMoveEvaluated]);

  const eraseCell = useCallback(() => {
    if (!selectedCell || !currentBoard || !initialBoard || isSolved) return;
    const { row, col } = selectedCell;

    if (initialBoard[row][col] !== 0) return;

    const prevVal = currentBoard[row][col];
    if (prevVal === 0 && notes[row][col].size === 0) return;

    const newBoard = cloneBoard(currentBoard);
    newBoard[row][col] = 0;

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

  const resetGame = useCallback(() => {
    if (!initialBoard) return;
    setCurrentBoard(cloneBoard(initialBoard));
    setSelectedCell(null);
    setConflicts(new Set());
    setNotes(Array.from({ length: GRID_SIZE }, () => Array.from({ length: GRID_SIZE }, () => new Set())));
    setHistory([]);
    setStreak(0);
    setConsecutiveErrors(0);
  }, [initialBoard]);

  const useHint = useCallback((onHintCallback) => {
    if (hintsRemaining <= 0 || !currentBoard || !solutionBoard || isSolved) return;

    let target = null;
    if (selectedCell && currentBoard[selectedCell.row][selectedCell.col] !== solutionBoard[selectedCell.row][selectedCell.col]) {
      target = selectedCell;
    } else {
      for (let r = 0; r < GRID_SIZE; r++) {
        for (let c = 0; c < GRID_SIZE; c++) {
          if (currentBoard[r][c] !== solutionBoard[r][c]) {
            target = { row: r, col: c };
            break;
          }
        }
        if (target) break;
      }
    }

    if (!target) return;

    const correctDigit = solutionBoard[target.row][target.col];
    const newBoard = cloneBoard(currentBoard);
    newBoard[target.row][target.col] = correctDigit;

    setCurrentBoard(newBoard);
    setSelectedCell(target);
    setHintsRemaining(prev => Math.max(0, prev - 1));
    setConflicts(getConflicts(newBoard));

    if (onHintCallback) {
      onHintCallback(correctDigit);
    }

    if (isBoardSolved(newBoard)) {
      setIsSolved(true);
    }
  }, [hintsRemaining, currentBoard, solutionBoard, selectedCell, isSolved]);

  const undo = useCallback((onUndoCallback) => {
    if (history.length === 0 || !currentBoard || isSolved) return;

    const lastMove = history[history.length - 1];
    const newBoard = cloneBoard(currentBoard);
    newBoard[lastMove.row][lastMove.col] = lastMove.prevVal;

    setHistory(prev => prev.slice(0, -1));
    setCurrentBoard(newBoard);
    setConflicts(getConflicts(newBoard));
    setSelectedCell({ row: lastMove.row, col: lastMove.col });

    if (onUndoCallback) {
      onUndoCallback();
    }
  }, [history, currentBoard, isSolved]);

  const solveGame = useCallback((onSolveCallback) => {
    if (!solutionBoard) return;
    setCurrentBoard(cloneBoard(solutionBoard));
    setConflicts(new Set());
    setIsSolved(true);

    if (onSolveCallback) {
      onSolveCallback();
    }
  }, [solutionBoard]);

  const getFilledCount = useCallback(() => {
    if (!currentBoard) return 0;
    let filled = 0;
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        if (currentBoard[r][c] !== 0) filled++;
      }
    }
    return filled;
  }, [currentBoard]);

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
    hintsRemaining,
    streak,
    consecutiveErrors,
    filledCount: getFilledCount(),
    totalCells: TOTAL_CELLS,
    canUndo: history.length > 0,
    remainingCounts: getRemainingCounts(),
    startNewGame,
    selectCell,
    inputDigit,
    eraseCell,
    resetGame,
    useHint,
    undo,
    solveGame,
    setNotesMode
  };
}
