import React from 'react';

export function Sidebar({ onNewGame, onOpenStickers, onOpenSettings, onOpenAbout }) {
  return (
    <aside className="app-sidebar">
      {/* Brand Header */}
      <div className="sidebar-brand">
        <div className="brand-avatar-circle">
          <svg viewBox="0 0 40 40" width="34" height="34" fill="none">
            <circle cx="20" cy="20" r="18" fill="#FDE68A" />
            <polygon points="10,14 12,6 18,12" fill="#F59E0B" />
            <polygon points="30,14 28,6 22,12" fill="#F59E0B" />
            <ellipse cx="20" cy="22" rx="12" ry="10" fill="#FFFBEB" />
            <circle cx="16" cy="20" r="2" fill="#1E293B" />
            <circle cx="24" cy="20" r="2" fill="#1E293B" />
            <polygon points="19,23 21,23 20,24.5" fill="#FB7185" />
            <path d="M 18 25 Q 20 26.5 22 25" stroke="#1E293B" strokeWidth="1" fill="none" />
          </svg>
        </div>
        <div className="brand-text-group">
          <span className="brand-title">Sudoku</span>
          <span className="brand-subtitle">Open Lab</span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="sidebar-nav">
        <button
          id="sidebar-nav-new"
          type="button"
          className="nav-item nav-item-active"
          onClick={onNewGame}
        >
          <span className="nav-icon">⊞</span>
          <span>New Game</span>
        </button>

        <button
          id="sidebar-nav-settings"
          type="button"
          className="nav-item"
          onClick={onOpenSettings}
        >
          <span className="nav-icon">⚙</span>
          <span>Settings</span>
        </button>

        <button
          id="sidebar-nav-stickers"
          type="button"
          className="nav-item"
          onClick={onOpenStickers}
        >
          <span className="nav-icon">🐱</span>
          <span>Stickers</span>
        </button>

        <button
          id="sidebar-nav-about"
          type="button"
          className="nav-item"
          onClick={onOpenAbout}
        >
          <span className="nav-icon">ℹ</span>
          <span>About</span>
        </button>

        <a
          id="sidebar-nav-github"
          href="https://github.com/Voyager-000/Sudoku"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-item nav-item-link"
          title="Open GitHub Repository (Voyager-000/Sudoku)"
        >
          <span className="nav-icon">🐙</span>
          <span>GitHub</span>
        </a>
      </nav>

      {/* Playful Handwritten Quote at bottom */}
      <div className="sidebar-footer-quote">
        <p className="quote-handwritten">
          Better puzzles.<br />
          Brighter days. 🐾
        </p>
      </div>
    </aside>
  );
}
