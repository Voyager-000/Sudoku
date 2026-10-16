import React from 'react';

export function TopBar({
  difficulty,
  timerDisplay,
  filledCount,
  totalCells,
  hintsRemaining,
  onChangeDifficulty,
  onUseHint
}) {
  const difficulties = [
    { id: 'easy', label: 'Easy' },
    { id: 'medium', label: 'Medium' },
    { id: 'hard', label: 'Hard' }
  ];

  return (
    <div className="top-stats-bar">
      {/* Left: Segmented Difficulty Selector */}
      <div className="difficulty-segmented-group">
        <span className="diff-label">Difficulty</span>
        <div className="segmented-pill-container">
          {difficulties.map(d => (
            <button
              key={d.id}
              type="button"
              className={`segmented-pill-btn ${difficulty === d.id ? 'pill-active' : ''}`}
              onClick={() => onChangeDifficulty(d.id)}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      {/* Right: Stats Counter Badges */}
      <div className="top-stats-badges">
        {/* Time Pill */}
        <div className="stat-pill-badge">
          <svg className="stat-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <div className="stat-pill-content">
            <span className="stat-pill-value">{timerDisplay}</span>
            <span className="stat-pill-label">Time</span>
          </div>
        </div>

        {/* Filled Counter Pill */}
        <div className="stat-pill-badge">
          <svg className="stat-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          <div className="stat-pill-content">
            <span className="stat-pill-value">{filledCount} / {totalCells}</span>
            <span className="stat-pill-label">Filled</span>
          </div>
        </div>

        {/* Hints Remaining Pill */}
        <button
          type="button"
          className="stat-pill-badge stat-pill-interactive"
          onClick={onUseHint}
          title="Click to get a smart hint!"
          aria-label="Use Hint"
        >
          <svg className="stat-icon hint-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2a6 6 0 0 0-6 6c0 2.22 1.2 4.16 3 5.2V17a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-3.8c1.8-1.04 3-2.98 3-5.2a6 6 0 0 0-6-6Z" />
            <path d="M9 21h6" />
          </svg>
          <div className="stat-pill-content">
            <span className="stat-pill-value">{hintsRemaining}</span>
            <span className="stat-pill-label">Hints</span>
          </div>
        </button>
      </div>
    </div>
  );
}
