import React from 'react';
import { Cell } from './Cell.jsx';
import { PeekingKitten } from './PeekingKitten.jsx';
import { BOX_SIZE } from '../engine/constants.js';

export function Board({
  board,
  initialBoard,
  notes,
  selectedCell,
  conflicts,
  highlightConflicts = true,
  highlightMatching = true,
  onSelectCell,
  kittenEmotion,
  kittenDialogue,
  isTalking,
  onPetKitten
}) {
  if (!board || !initialBoard) return null;

  const selectedValue = selectedCell ? board[selectedCell.row][selectedCell.col] : 0;

  return (
    <div className="board-outer-wrapper">
      {/* Peeking Kitten Perched on the Top Border */}
      <PeekingKitten
        emotion={kittenEmotion}
        dialogue={kittenDialogue}
        isTalking={isTalking}
        onPet={onPetKitten}
      />

      {/* 9x9 Sudoku Board Frame */}
      <div className="sudoku-board-card">
        <div className="sudoku-grid" role="grid" aria-label="Sudoku Board">
          {board.map((rowArr, r) =>
            rowArr.map((val, c) => {
              const isInitial = initialBoard[r][c] !== 0;
              const isSelected = selectedCell?.row === r && selectedCell?.col === c;

              // Crosshair highlight
              const isSameRow = selectedCell?.row === r;
              const isSameCol = selectedCell?.col === c;
              const isSameBox = selectedCell
                ? Math.floor(r / BOX_SIZE) === Math.floor(selectedCell.row / BOX_SIZE) &&
                  Math.floor(c / BOX_SIZE) === Math.floor(selectedCell.col / BOX_SIZE)
                : false;

              const isHighlighted = isSameRow || isSameCol || isSameBox;
              const isSameNumber = highlightMatching && selectedValue !== 0 && val === selectedValue && !isSelected;
              const isConflict = highlightConflicts && conflicts.has(`${r}-${c}`);

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

      {/* Bottom Motivational Caption with Yellow Accent Rays */}
      <div className="board-bottom-caption">
        <span className="caption-ray left-ray">` ` `</span>
        <span className="caption-text">Small steps. Big wins.</span>
        <span className="caption-ray right-ray">´ ´ ´</span>
      </div>
    </div>
  );
}
