import React, { useState } from 'react';
import { DIFFICULTIES } from '../engine/constants.js';

export function Controls({
  difficulty,
  timerDisplay,
  canUndo,
  onNewGame,
  onSolve,
  onUndo
}) {
  const [showDiffMenu, setShowDiffMenu] = useState(false);

  const handleSelectDifficulty = (diffKey) => {
    setShowDiffMenu(false);
    onNewGame(diffKey);
  };

  return (
    <div className="game-controls-container">
      {/* Top Action Buttons */}
      <div className="controls-buttons-row">
        <div className="new-game-dropdown-wrapper">
          <button
            type="button"
            className="control-btn btn-primary"
            onClick={() => setShowDiffMenu(prev => !prev)}
          >
            New Game
            <span className="dropdown-arrow">▾</span>
          </button>

          {showDiffMenu && (
            <div className="difficulty-menu">
              {Object.values(DIFFICULTIES).map(diff => (
                <button
                  key={diff.id}
                  type="button"
                  className={`diff-option-btn ${difficulty === diff.id ? 'diff-option-active' : ''}`}
                  onClick={() => handleSelectDifficulty(diff.id)}
                >
                  <span className="diff-name">{diff.name}</span>
                  <span className="diff-clues">{diff.clues} clues</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          type="button"
          className="control-btn btn-primary"
          onClick={onSolve}
          title="Auto-solve puzzle"
        >
          Solve
        </button>

        <button
          type="button"
          className="control-btn btn-secondary"
          onClick={onUndo}
          disabled={!canUndo}
          title="Undo last move (Ctrl+Z)"
        >
          Undo
        </button>
      </div>

      {/* Timer & Difficulty Card (matching reference screenshot) */}
      <div className="stats-card">
        <div className="stats-timer-section">
          <span className="stats-label">Time</span>
          <span className="stats-timer-value">{timerDisplay}</span>
        </div>
        <div className="stats-difficulty-pill">
          {DIFFICULTIES[difficulty?.toUpperCase()]?.name || 'Medium'}
        </div>
      </div>
    </div>
  );
}
