import React from 'react';

export function SettingsModal({
  isOpen,
  onClose,
  soundEnabled,
  onToggleSound,
  autoRemoveNotes,
  onToggleAutoRemoveNotes,
  highlightConflicts,
  onToggleHighlightConflicts,
  highlightMatching,
  onToggleHighlightMatching
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop-overlay" onClick={onClose}>
      <div
        className="modal-content-card settings-modal-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Game Settings"
      >
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title-group">
            <span className="modal-header-icon">⚙️</span>
            <div>
              <h2 className="modal-title">Game Settings</h2>
              <p className="modal-subtitle">Customize gameplay behavior and audio feedback</p>
            </div>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close Settings"
          >
            ✕
          </button>
        </div>

        {/* Settings Options List */}
        <div className="settings-options-list">
          {/* Sound Synthesizer */}
          <div className="setting-row">
            <div className="setting-info">
              <span className="setting-label">Sound Effects</span>
              <span className="setting-desc">Tactile clicks, chimes, and Coach Mochi reactions</span>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={soundEnabled}
                onChange={onToggleSound}
              />
              <span className="toggle-slider" />
            </label>
          </div>

          {/* Auto-remove notes */}
          <div className="setting-row">
            <div className="setting-info">
              <span className="setting-label">Auto-Clear Pencil Notes</span>
              <span className="setting-desc">Automatically remove candidate digits from row, column, and box</span>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={autoRemoveNotes}
                onChange={onToggleAutoRemoveNotes}
              />
              <span className="toggle-slider" />
            </label>
          </div>

          {/* Highlight duplicate conflicts */}
          <div className="setting-row">
            <div className="setting-info">
              <span className="setting-label">Highlight Rule Conflicts</span>
              <span className="setting-desc">Highlight conflicting cells with soft red indicator</span>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={highlightConflicts}
                onChange={onToggleHighlightConflicts}
              />
              <span className="toggle-slider" />
            </label>
          </div>

          {/* Highlight matching numbers */}
          <div className="setting-row">
            <div className="setting-info">
              <span className="setting-label">Highlight Matching Digits</span>
              <span className="setting-desc">Highlight all instances of the currently selected number</span>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={highlightMatching}
                onChange={onToggleHighlightMatching}
              />
              <span className="toggle-slider" />
            </label>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <button
            type="button"
            className="modal-primary-btn"
            onClick={onClose}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
