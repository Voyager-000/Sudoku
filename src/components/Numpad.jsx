import React from 'react';

export function Numpad({
  remainingCounts,
  notesMode,
  onInputDigit,
  onErase,
  onToggleNotesMode
}) {
  const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className="numpad-container">
      <div className="numpad-grid">
        {digits.map(num => {
          const remaining = remainingCounts ? remainingCounts[num] : 0;
          const isComplete = remaining === 0;

          return (
            <button
              key={num}
              type="button"
              className={`numpad-btn ${isComplete ? 'numpad-btn-completed' : ''}`}
              onClick={() => onInputDigit(num)}
              title={`${num} (${remaining} remaining)`}
              aria-label={`Enter ${num}, ${remaining} remaining`}
            >
              <span className="numpad-digit">{num}</span>
              {remaining > 0 ? (
                <span className="numpad-count">{remaining}</span>
              ) : (
                <span className="numpad-check">✓</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Auxiliary Action Row: Eraser & Pencil Notes Toggle */}
      <div className="numpad-actions-row">
        <button
          type="button"
          className="numpad-action-btn erase-btn"
          onClick={onErase}
          title="Erase cell (Backspace)"
          aria-label="Erase cell"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21" />
            <path d="M22 21H7" />
            <path d="m5 11 9 9" />
          </svg>
          <span className="action-label">Erase</span>
        </button>

        <button
          type="button"
          className={`numpad-action-btn notes-btn ${notesMode ? 'notes-active' : ''}`}
          onClick={onToggleNotesMode}
          title="Toggle Pencil Notes (N)"
          aria-label="Toggle Pencil Notes"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
            <path d="m15 5 4 4" />
          </svg>
          <span className="action-label">{notesMode ? 'Notes ON' : 'Notes'}</span>
        </button>
      </div>
    </div>
  );
}
