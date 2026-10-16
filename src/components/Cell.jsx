import React from 'react';

export function Cell({
  row,
  col,
  value,
  notes,
  isInitial,
  isSelected,
  isHighlighted,
  isSameNumber,
  isConflict,
  onSelect
}) {
  const isRightBoxBorder = col === 2 || col === 5;
  const isBottomBoxBorder = row === 2 || row === 5;

  let classNames = ['sudoku-cell'];
  if (isRightBoxBorder) classNames.push('box-border-right');
  if (isBottomBoxBorder) classNames.push('box-border-bottom');
  if (isInitial) classNames.push('cell-initial');
  if (!isInitial && value !== 0) classNames.push('cell-user');
  if (isSelected) classNames.push('cell-selected');
  else if (isSameNumber) classNames.push('cell-same-number');
  else if (isHighlighted) classNames.push('cell-highlighted');
  if (isConflict) classNames.push('cell-conflict');

  // Render 3x3 pencil notes if cell has no confirmed value
  const renderNotes = () => {
    if (value !== 0 || !notes || notes.size === 0) return null;
    return (
      <div className="cell-notes-grid">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
          <span key={num} className={`note-num ${notes.has(num) ? 'note-visible' : ''}`}>
            {notes.has(num) ? num : ''}
          </span>
        ))}
      </div>
    );
  };

  return (
    <button
      type="button"
      className={classNames.join(' ')}
      onClick={() => onSelect(row, col)}
      aria-label={`Cell at row ${row + 1}, column ${col + 1}, value ${value === 0 ? 'empty' : value}`}
    >
      {value !== 0 ? (
        <span className="cell-digit">{value}</span>
      ) : (
        renderNotes()
      )}
    </button>
  );
}
