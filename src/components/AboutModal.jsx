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
          {/* GitHub Repository Card Prominently at Top */}
          <div className="about-section">
            <h3 className="about-section-title">🐙 Official GitHub Repository</h3>
            <a
              href="https://github.com/Voyager-000/Sudoku"
              target="_blank"
              rel="noopener noreferrer"
              className="about-github-link-card"
              title="Open Voyager-000/Sudoku on GitHub"
            >
              <div className="github-card-left">
                <svg className="github-logo-icon" width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
                <div className="github-card-info">
                  <span className="github-repo-title">Voyager-000 / Sudoku</span>
                  <span className="github-repo-url">https://github.com/Voyager-000/Sudoku</span>
                </div>
              </div>
              <span className="github-link-arrow">↗ Open</span>
            </a>
          </div>

          <div className="about-section">
            <h3 className="about-section-title">🎓 Student Mission</h3>
            <p className="about-text">
              Sudoku Open Lab is an educational open-source project designed to teach college students
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

export default AboutModal;
