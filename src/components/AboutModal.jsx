import React from 'react';

export function AboutModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop-overlay" onClick={onClose}>
      <div
        className="modal-content-card about-modal-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="About Sudoku Open Lab"
      >
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title-group">
            <span className="modal-header-icon">🐱</span>
            <div>
              <h2 className="modal-title">Sudoku Open Lab</h2>
              <p className="modal-subtitle">Modern Educational Web App for Student Contributors</p>
            </div>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close About Modal"
          >
            ✕
          </button>
        </div>

        {/* Content Body */}
        <div className="about-modal-body">
          <div className="about-section">
            <h3 className="about-section-title">🎓 Student Mission</h3>
            <p className="about-text">
              Sudoku Open Lab is an open-source hands-on project designed to teach college students
              clean modular software architecture, algorithm design (MRV backtracking, constraint propagation),
              reactive UI state management, and collaborative Git contribution workflows.
            </p>
          </div>

          <div className="about-section">
            <h3 className="about-section-title">🐾 Coach Mochi & Telegram Stickers</h3>
            <p className="about-text">
              Inspired by chess bots like Magnus & Mittens, Coach Mochi perches directly on the Sudoku
              board and reacts live to your moves using 15 real Telegram cat reaction stickers. Every move,
              conflict, streak, and milestone is analyzed by the situational evaluator.
            </p>
          </div>

          <div className="about-section">
            <h3 className="about-section-title">📚 Documentation Guides</h3>
            <div className="about-links-grid">
              <div className="about-link-chip">
                <span className="chip-badge">Architecture</span>
                <span className="chip-name">docs/ARCHITECTURE.md</span>
              </div>
              <div className="about-link-chip">
                <span className="chip-badge">Core Engine</span>
                <span className="chip-name">docs/modules/01-core-engine.md</span>
              </div>
              <div className="about-link-chip">
                <span className="chip-badge">Cat Companion</span>
                <span className="chip-name">docs/modules/02-cat-companion.md</span>
              </div>
              <div className="about-link-chip">
                <span className="chip-badge">UI Guide</span>
                <span className="chip-name">docs/modules/03-ui-and-interactions.md</span>
              </div>
            </div>
          </div>

          <div className="about-section">
            <h3 className="about-section-title">🚀 How to Contribute</h3>
            <p className="about-text">
              Check out <code>CONTRIBUTING.md</code> in the repository. Fork the repository, create a
              feature branch, write clean tests with Vitest, and submit a Pull Request!
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button
            type="button"
            className="modal-primary-btn"
            onClick={onClose}
          >
            Back to Game 🎮
          </button>
        </div>
      </div>
    </div>
  );
}
