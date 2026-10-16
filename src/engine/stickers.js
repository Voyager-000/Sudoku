import { CAT_EMOTIONS } from './constants.js';

/**
 * Returns the sticker image asset URL for a given cat emotion.
 * If user drops custom images (.png / .webp) into public/stickers/,
 * they can easily be hooked up here.
 */
export function getStickerUrl(emotion) {
  switch (emotion) {
    case CAT_EMOTIONS.THINKING:
      return '/stickers/thinking.svg';
    case CAT_EMOTIONS.HAPPY:
      return '/stickers/happy.svg';
    case CAT_EMOTIONS.SHOCKED:
      return '/stickers/shocked.svg';
    case CAT_EMOTIONS.CHEERING:
    case CAT_EMOTIONS.CELEBRATE:
      return '/stickers/celebrate.svg';
    case CAT_EMOTIONS.IDLE:
    default:
      return '/stickers/idle.svg';
  }
}
