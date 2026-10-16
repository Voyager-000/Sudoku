import React from 'react';
import { getStickerUrl } from '../engine/stickers.js';
import { CAT_EMOTIONS } from '../engine/constants.js';

export function StickersModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const stickerSlots = [
    { id: CAT_EMOTIONS.IDLE, label: 'Default / Idle', desc: 'When waiting for moves' },
    { id: CAT_EMOTIONS.THINKING, label: 'Thinking', desc: 'Selecting an empty cell' },
    { id: CAT_EMOTIONS.HAPPY, label: 'Happy / Purring', desc: 'Correct number placed' },
    { id: CAT_EMOTIONS.SHOCKED, label: 'Shocked / Confused', desc: 'Duplicate or rule conflict' },
    { id: CAT_EMOTIONS.CELEBRATE, label: 'Victory Celebration', desc: 'Completing the puzzle' }
  ];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="stickers-modal-card" onClick={e => e.stopPropagation()}>
        <div className="modal-header-row">
          <div className="modal-header-title">
            <span className="modal-icon">🐱</span>
            <h3>Telegram Kitten Stickers</h3>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose}>✕</button>
        </div>

        <p className="modal-description">
          Send your kitten reaction stickers from Telegram in the chat anytime! We will instantly hook them up into these reaction slots:
        </p>

        <div className="sticker-slots-grid">
          {stickerSlots.map(slot => (
            <div key={slot.id} className="sticker-slot-card">
              <div className="sticker-preview-box">
                <img
                  src={getStickerUrl(slot.id)}
                  alt={slot.label}
                  className="sticker-preview-img"
                />
              </div>
              <div className="sticker-slot-info">
                <span className="slot-name">{slot.label}</span>
                <span className="slot-desc">{slot.desc}</span>
              </div>
            </div>
          ))}
        </div>

        <button type="button" className="modal-action-btn" onClick={onClose}>
          Ready for Stickers! 🚀
        </button>
      </div>
    </div>
  );
}
