import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';

export function StatsModal({ isSolved, timerDisplay, difficulty, onPlayAgain }) {
  useEffect(() => {
    if (isSolved) {
      // Fire confetti burst
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // Fallback gracefully if canvas-confetti is not loaded
      }
    }
  }, [isSolved]);

  if (!isSolved) return null;

  return (
    <div className="modal-backdrop">
      <div className="victory-modal-card">
        <div className="modal-badge">🏆 Victory!</div>
        <h2 className="modal-title">Purr-fect Solve!</h2>
        <p className="modal-subtitle">
          Coach Mochi is beyond impressed with your puzzle mastery!
        </p>

        <div className="modal-stats-grid">
          <div className="modal-stat-box">
            <span className="stat-box-label">Time Taken</span>
            <span className="stat-box-val">{timerDisplay}</span>
          </div>
          <div className="modal-stat-box">
            <span className="stat-box-label">Difficulty</span>
            <span className="stat-box-val" style={{ textTransform: 'capitalize' }}>{difficulty}</span>
          </div>
        </div>

        <button
          type="button"
          className="modal-action-btn"
          onClick={onPlayAgain}
        >
          Play Another Game 🚀
        </button>
      </div>
    </div>
  );
}
