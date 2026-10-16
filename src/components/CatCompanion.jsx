import React from 'react';
import '../styles/cat.css';
import { CAT_EMOTIONS } from '../engine/constants.js';

export function CatCompanion({ emotion, dialogue, isTalking, onPet }) {
  // Render face details based on current emotion
  const renderFace = () => {
    switch (emotion) {
      case CAT_EMOTIONS.THINKING:
        return (
          <>
            {/* Thinking Eyes */}
            <circle cx="40" cy="50" r="4.5" fill="#1E293B" />
            <circle cx="64" cy="48" r="4.5" fill="#1E293B" />
            {/* Curious Eyebrows */}
            <path d="M 36 43 Q 40 40 44 43" stroke="#1E293B" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M 60 39 Q 64 36 68 40" stroke="#1E293B" strokeWidth="2" fill="none" strokeLinecap="round" />
            {/* Thinking Mouth */}
            <path d="M 50 58 Q 52 61 54 58" stroke="#1E293B" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            {/* Paw to chin */}
            <ellipse cx="66" cy="62" rx="6" ry="5" fill="#FFFBEB" stroke="#E2E8F0" strokeWidth="1.5" />
          </>
        );

      case CAT_EMOTIONS.HAPPY:
        return (
          <>
            {/* Happy Curved Eyes ^ ^ */}
            <path d="M 35 50 Q 40 43 45 50" stroke="#1E293B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M 59 50 Q 64 43 69 50" stroke="#1E293B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            {/* Rosy Cheeks */}
            <ellipse cx="33" cy="56" rx="4.5" ry="3" fill="#FDA4AF" opacity="0.75" />
            <ellipse cx="71" cy="56" rx="4.5" ry="3" fill="#FDA4AF" opacity="0.75" />
            {/* Happy Open Smile */}
            <path d="M 47 57 Q 52 64 57 57 Z" fill="#FB7185" stroke="#1E293B" strokeWidth="1.5" />
            {/* Both Paws resting happily */}
            <ellipse cx="38" cy="74" rx="6" ry="5" fill="#FFFBEB" stroke="#E2E8F0" strokeWidth="1.5" />
            <ellipse cx="66" cy="74" rx="6" ry="5" fill="#FFFBEB" stroke="#E2E8F0" strokeWidth="1.5" />
          </>
        );

      case CAT_EMOTIONS.SHOCKED:
        return (
          <>
            {/* Shocked Wide Eyes */}
            <circle cx="39" cy="48" r="7" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2" />
            <circle cx="39" cy="48" r="3" fill="#1E293B" />
            <circle cx="65" cy="48" r="7" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2" />
            <circle cx="65" cy="48" r="3" fill="#1E293B" />
            {/* Shocked O-Mouth */}
            <ellipse cx="52" cy="60" rx="3.5" ry="5" fill="#FB7185" stroke="#1E293B" strokeWidth="1.5" />
            {/* Paws to Cheeks */}
            <ellipse cx="31" cy="55" rx="5" ry="6" fill="#FFFBEB" stroke="#E2E8F0" strokeWidth="1.5" />
            <ellipse cx="73" cy="55" rx="5" ry="6" fill="#FFFBEB" stroke="#E2E8F0" strokeWidth="1.5" />
            {/* Sweat drop */}
            <path d="M 76 38 C 76 35 73 31 73 31 C 73 31 70 35 70 38 C 70 40 73 42 76 38 Z" fill="#60A5FA" />
          </>
        );

      case CAT_EMOTIONS.CHEERING:
      case CAT_EMOTIONS.CELEBRATE:
        return (
          <>
            {/* Sparkle Eyes */}
            <path d="M 40 45 L 42 49 L 46 50 L 42 51 L 40 55 L 38 51 L 34 50 L 38 49 Z" fill="#F59E0B" />
            <path d="M 64 45 L 66 49 L 70 50 L 66 51 L 64 55 L 62 51 L 58 50 L 62 49 Z" fill="#F59E0B" />
            {/* Rosy Cheeks */}
            <ellipse cx="32" cy="57" rx="4.5" ry="3" fill="#FDA4AF" opacity="0.8" />
            <ellipse cx="72" cy="57" rx="4.5" ry="3" fill="#FDA4AF" opacity="0.8" />
            {/* Big Grin */}
            <path d="M 46 56 Q 52 66 58 56 Z" fill="#FB7185" stroke="#1E293B" strokeWidth="1.8" />
            {/* Paws in the air! */}
            <ellipse cx="28" cy="40" rx="6" ry="7" fill="#FFFBEB" stroke="#E2E8F0" strokeWidth="1.5" transform="rotate(-20 28 40)" />
            <ellipse cx="76" cy="40" rx="6" ry="7" fill="#FFFBEB" stroke="#E2E8F0" strokeWidth="1.5" transform="rotate(20 76 40)" />
            {/* Party Hat */}
            <polygon points="52,10 42,32 62,32" fill="#8B5CF6" stroke="#6D28D9" strokeWidth="1.5" />
            <circle cx="52" cy="9" r="3.5" fill="#FBBF24" />
          </>
        );

      case CAT_EMOTIONS.IDLE:
      default:
        return (
          <>
            {/* Calm Round Eyes with reflections */}
            <circle cx="39" cy="49" r="4.5" fill="#1E293B" />
            <circle cx="41" cy="47.5" r="1.5" fill="#FFFFFF" />
            <circle cx="65" cy="49" r="4.5" fill="#1E293B" />
            <circle cx="67" cy="47.5" r="1.5" fill="#FFFFFF" />
            {/* Soft Blush */}
            <ellipse cx="32" cy="56" rx="4" ry="2.5" fill="#FDA4AF" opacity="0.5" />
            <ellipse cx="72" cy="56" rx="4" ry="2.5" fill="#FDA4AF" opacity="0.5" />
            {/* Cute Cat 'w' Mouth */}
            <path d="M 47 57 Q 50 60 52 57 Q 54 60 57 57" stroke="#1E293B" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            {/* Paws on ground */}
            <ellipse cx="38" cy="74" rx="6" ry="5" fill="#FFFBEB" stroke="#E2E8F0" strokeWidth="1.5" />
            <ellipse cx="66" cy="74" rx="6" ry="5" fill="#FFFBEB" stroke="#E2E8F0" strokeWidth="1.5" />
          </>
        );
    }
  };

  return (
    <div className={`cat-companion-wrapper cat-emotion-${emotion}`}>
      {/* Speech Bubble / Situational Review */}
      <div className={`cat-speech-bubble ${isTalking ? 'cat-speech-active' : ''}`}>
        <div className="cat-coach-badge">
          <span className="cat-coach-dot"></span>
          <span>Coach Mochi</span>
        </div>
        <p className="cat-speech-text">{dialogue}</p>
      </div>

      {/* Interactive Cat Mascot */}
      <div 
        className="cat-mascot-container"
        onClick={onPet}
        title="Click to pet Coach Mochi!"
        role="button"
        tabIndex={0}
      >
        <svg
          viewBox="0 0 104 90"
          className="cat-svg"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Swishing Tail */}
          <path
            d="M 22 72 Q 10 65 14 50 Q 17 40 24 45"
            stroke="#FDE68A"
            strokeWidth="7"
            strokeLinecap="round"
            fill="none"
            className="cat-tail"
          />

          {/* Ears */}
          <polygon points="30,36 34,16 48,28" fill="#FDE68A" stroke="#F59E0B" strokeWidth="1.5" />
          <polygon points="33,33 36,20 46,28" fill="#FDA4AF" />
          
          <polygon points="74,36 70,16 56,28" fill="#FDE68A" stroke="#F59E0B" strokeWidth="1.5" />
          <polygon points="71,33 68,20 58,28" fill="#FDA4AF" />

          {/* Body & Head */}
          <ellipse cx="52" cy="62" rx="28" ry="20" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1.5" />
          <circle cx="52" cy="50" r="24" fill="#FFFBEB" stroke="#F59E0B" strokeWidth="1.5" />

          {/* Whiskers */}
          <line x1="24" y1="52" x2="14" y2="50" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="24" y1="56" x2="14" y2="58" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="80" y1="52" x2="90" y2="50" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="80" y1="56" x2="90" y2="58" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" />

          {/* Nose */}
          <polygon points="50,54 54,54 52,56" fill="#FB7185" />

          {/* Dynamic Emotional Face */}
          {renderFace()}
        </svg>
      </div>
    </div>
  );
}
