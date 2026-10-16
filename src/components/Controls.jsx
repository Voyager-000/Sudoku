import React from 'react';

export function Controls({
  filledCount,
  totalCells,
  selectedDigit,
  notesMode,
  canUndo,
  onInputDigit,
  onToggleNotes,
  onUndo,
  onErase,
  onReset,
  onNewGame
}) {
  const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const progressPercent = Math.min(100, Math.round((filledCount / totalCells) * 100));

  return (
    <div className="right-panel-card">
      {/* 3x3 Keypad (1 to 9) */}
      <div className="dark-keypad-grid">
        {digits.map(num => (
          <button
            key={num}
            type="button"
            className={`keypad-digit-btn ${selectedDigit === num ? 'keypad-digit-active' : ''}`}
            onClick={() => onInputDigit(num)}
            aria-label={`Digit ${num}`}
          >
            {num}
          </button>
        ))}
      </div>

      {/* Action Grid: Undo, Notes, Erase, Reset */}
      <div className="keypad-actions-grid">
        {/* Undo Button */}
        <button
          type="button"
          className="action-pill-btn undo-pill-btn"
          onClick={onUndo}
          disabled={!canUndo}
          title="Undo previous move (Ctrl+Z)"
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 7v6h6" />
            <path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" />
          </svg>
          <span>Undo</span>
        </button>

        {/* Notes (Pencil Mode) Toggle Button */}
        <button
          type="button"
          className={`action-pill-btn notes-pill-btn ${notesMode ? 'notes-pill-active' : ''}`}
          onClick={onToggleNotes}
          title="Toggle pencil notes mode (N)"
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
          </svg>
          <span>{notesMode ? 'Notes: ON' : 'Notes: OFF'}</span>
        </button>

        {/* Erase Button */}
        <button
          type="button"
          className="action-pill-btn erase-pill-btn"
          onClick={onErase}
          title="Erase cell value (Backspace / Del)"
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          </svg>
          <span>Erase</span>
        </button>

        {/* Reset Button */}
        <button
          type="button"
          className="action-pill-btn reset-pill-btn"
          onClick={onReset}
          title="Reset board to initial clues"
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
            <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
            <path d="M16 21h5v-5" />
          </svg>
          <span>Reset</span>
        </button>
      </div>

      {/* Prominent "New Game" Button with Play Icon */}
      <button
        type="button"
        className="new-game-play-btn"
        onClick={onNewGame}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <polygon points="5 3 19 12 5 21 5 3" />
        </svg>
        <span>New Game</span>
      </button>

      {/* Your Progress Section */}
      <div className="progress-section-card">
        <div className="progress-header">
          <span className="progress-title">Your Progress</span>
          <span className="progress-fraction">{filledCount} / {totalCells}</span>
        </div>
        <div className="progress-bar-track">
          <div
            className="progress-bar-fill"
            style={{ width: `${progressPercent}%` }}
          />
          <span className="progress-star-icon">⭐</span>
        </div>
      </div>

      {/* Tip Box with Paw Watermark */}
      <div className="tip-box-card">
        <div className="tip-icon-wrapper">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FBBF24" strokeWidth="2">
            <path d="M12 2a6 6 0 0 0-6 6c0 2.22 1.2 4.16 3 5.2V17a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-3.8c1.8-1.04 3-2.98 3-5.2a6 6 0 0 0-6-6Z" />
            <path d="M9 21h6" />
          </svg>
        </div>
        <div className="tip-content">
          <h4 className="tip-title">Tip</h4>
          <p className="tip-description">
            Use number keys (1–9) or click keypad to fill cells. Toggle Notes (N) to pencil in candidates!
          </p>
        </div>
        <div className="paw-watermark">🐾</div>
      </div>
    </div>
  );
}
