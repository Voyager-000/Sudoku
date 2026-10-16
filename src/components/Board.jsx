import React from 'react';
import { Cell } from './Cell.jsx';
import { GRID_SIZE, BOX_SIZE } from '../engine/constants.js';

export function Board({
  board,
  initialBoard,
  notes,
  selectedCell,
  conflicts,
  onSelectCell
}) {
  if (!board || !initialBoard) return null;

  const selectedValue = selectedCell ? board[selectedCell.row][selectedCell.col] : 0;

  return (
    <div className="sudoku-board-card">
      <div className="sudoku-grid" role="grid" aria-label="Sudoku Board">
        {board.map((rowArr, r) =>
          rowArr.map((val, c) => {
            const isInitial = initialBoard[r][c] !== 0;
            const isSelected = selectedCell?.row === r && selectedCell?.col === c;

            // Highlight crosshair (same row, col, or 3x3 box)
            const isSameRow = selectedCell?.row === r;
            const isSameCol = selectedCell?.col === c;
            const isSameBox = selectedCell
              ? Math.floor(r / BOX_SIZE) === Math.floor(selectedCell.row / BOX_SIZE) &&
                Math.floor(c / BOX_SIZE) === Math.floor(selectedCell.col / BOX_SIZE)
              : false;

            const isHighlighted = isSameRow || isSameCol || isSameBox;
            const isSameNumber = selectedValue !== 0 && val === selectedValue && !isSelected;
            const isConflict = conflicts.has(`${r}-${c}`);

            return (
              <Cell
                key={`${r}-${c}`}
                row={r}
                col={c}
                value={val}
                notes={notes ? notes[r][c] : null}
                isInitial={isInitial}
                isSelected={isSelected}
                isHighlighted={isHighlighted}
                isSameNumber={isSameNumber}
                isConflict={isConflict}
                onSelect={onSelectCell}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
