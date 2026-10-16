import React from 'react';
import { getStickerUrl } from '../engine/stickers.js';

export function PeekingKitten({ emotion, dialogue, isTalking, onPet }) {
  const stickerUrl = getStickerUrl(emotion);

  return (
    <div className="peeking-kitten-container">
      {/* 1. Kitten Peeking on the Left */}
      <div
        className="kitten-perch-body"
        onClick={onPet}
        title="Coach Mochi: Click to pet me! 🐾"
        role="button"
        tabIndex={0}
      >
        <img
          src={stickerUrl}
          alt={`Coach Mochi - ${emotion}`}
          className="kitten-sticker-img"
        />
      </div>

      {/* 2. Speech Bubble on the Right */}
      <div className={`kitten-bubble ${isTalking ? 'bubble-talking' : ''}`}>
        <span className="bubble-text">{dialogue || "Thinking..."}</span>
      </div>
    </div>
  );
}
