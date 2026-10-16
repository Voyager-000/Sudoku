import { useEffect } from 'react';
import { GRID_SIZE } from '../engine/constants.js';

export function useKeyboard({
  selectedCell,
  selectCell,
  inputDigit,
  eraseCell,
  undo,
  toggleNotesMode
}) {
  useEffect(() => {
    function handleKeyDown(e) {
      // Don't intercept if user is typing in an input field
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;

      const { key, ctrlKey, metaKey } = e;

      // Undo shortcut: Ctrl+Z or Cmd+Z
      if ((ctrlKey || metaKey) && key.toLowerCase() === 'z') {
        e.preventDefault();
        undo();
        return;
      }

      // Notes mode shortcut: 'n' or 'N'
      if (key.toLowerCase() === 'n' && toggleNotesMode) {
        e.preventDefault();
        toggleNotesMode();
        return;
      }

      // Digits 1 to 9
      if (/^[1-9]$/.test(key)) {
        e.preventDefault();
        inputDigit(parseInt(key, 10));
        return;
      }

      // Clear/Erase: Backspace, Delete, 0
      if (key === 'Backspace' || key === 'Delete' || key === '0') {
        e.preventDefault();
        eraseCell();
        return;
      }

      // Arrow navigation
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 's', 'a', 'd'].includes(key)) {
        e.preventDefault();
        const currentRow = selectedCell ? selectedCell.row : 0;
        const currentCol = selectedCell ? selectedCell.col : 0;

        let nextRow = currentRow;
        let nextCol = currentCol;

        if (key === 'ArrowUp' || key.toLowerCase() === 'w') {
          nextRow = (currentRow - 1 + GRID_SIZE) % GRID_SIZE;
        } else if (key === 'ArrowDown' || key.toLowerCase() === 's') {
          nextRow = (currentRow + 1) % GRID_SIZE;
        } else if (key === 'ArrowLeft' || key.toLowerCase() === 'a') {
          nextCol = (currentCol - 1 + GRID_SIZE) % GRID_SIZE;
        } else if (key === 'ArrowRight' || key.toLowerCase() === 'd') {
          nextCol = (currentCol + 1) % GRID_SIZE;
        }

        selectCell(nextRow, nextCol);
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedCell, selectCell, inputDigit, eraseCell, undo, toggleNotesMode]);
}
