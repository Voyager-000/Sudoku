import React from 'react';
import { STICKER_CATALOG } from '../engine/stickers.js';

export function StickersModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content-card stickers-modal-card" onClick={e => e.stopPropagation()}>
        <div className="modal-header-row">
          <div className="modal-header-title">
            <span className="modal-icon">🐱</span>
            <h3>Telegram Reaction Stickers (15 Active)</h3>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Close">✕</button>
        </div>

        <p className="modal-description">
          Coach Mochi reacts live to your Sudoku moves using these 15 authentic Telegram cat stickers:
        </p>

        <div className="sticker-slots-grid-scroll">
          {STICKER_CATALOG.map((slot, index) => (
            <div key={slot.id} className="sticker-slot-card">
              <div className="sticker-preview-box">
                <img
                  src={slot.file}
                  alt={slot.name}
                  className="sticker-preview-img"
                  loading="lazy"
                />
              </div>
              <div className="sticker-slot-info">
                <div className="slot-title-row">
                  <span className="slot-number">#{index + 1}</span>
                  <span className="slot-name">{slot.name}</span>
                </div>
                <span className="slot-mood">{slot.mood}</span>
                <span className="slot-desc">Trigger: {slot.trigger}</span>
              </div>
            </div>
          ))}
        </div>

        <button type="button" className="modal-action-btn" onClick={onClose}>
          Back to Sudoku! 🚀
        </button>
      </div>
    </div>
  );
}
