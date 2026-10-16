import { CAT_EMOTIONS } from './constants.js';

export const STICKER_CATALOG = [
  { id: CAT_EMOTIONS.THINKING, name: 'Buffering Cat', file: '/stickers/thinking.png', mood: 'Thinking / Pondering', trigger: 'Selecting an empty cell' },
  { id: CAT_EMOTIONS.THUMBSUP, name: 'Thumbs-Up Cat', file: '/stickers/thumbsup.png', mood: 'Approval / Solid Move', trigger: 'Valid, correct number placement' },
  { id: CAT_EMOTIONS.SHOCKED, name: 'Screaming Shock Cat', file: '/stickers/shocked.png', mood: 'Conflict / Shock', trigger: 'Duplicate number in row, col, or box' },
  { id: CAT_EMOTIONS.ECSTASY, name: 'Heart Vortex Ecstasy Cat', file: '/stickers/ecstasy.png', mood: 'Triumph / Big Milestone', trigger: 'Completing a row, col, or 3x3 block' },
  { id: CAT_EMOTIONS.ANGRY, name: 'Angry Anime Mark Cat', file: '/stickers/angry.png', mood: 'Frustrated / Warning', trigger: 'Repeated mistake in the same cell' },
  { id: CAT_EMOTIONS.STUDY, name: 'Sleepy Study Cat', file: '/stickers/study.png', mood: 'Notes / Homework Mode', trigger: 'Toggling Pencil Notes mode' },
  { id: CAT_EMOTIONS.POLITE, name: 'Polite Beluga Cat', file: '/stickers/polite.png', mood: 'Polite / Default Idle', trigger: 'New game started or board reset' },
  { id: CAT_EMOTIONS.LOVE, name: 'Sparkle Paw Heart Cat', file: '/stickers/love.png', mood: 'Affection / 5-Move Streak', trigger: 'Petting kitten or 5-move streak' },
  { id: CAT_EMOTIONS.SAD, name: 'Droopy-Eyed Regret Cat', file: '/stickers/sad.png', mood: 'Regret / Undo', trigger: 'Clicking Undo or clearing cell' },
  { id: CAT_EMOTIONS.SWEATDROP, name: 'Panda-Bag Sweatdrop Cat', file: '/stickers/sweatdrop.png', mood: 'Anxious / High Tension', trigger: 'Hard/Expert difficulty started' },
  { id: CAT_EMOTIONS.HINT, name: 'Leg-Hugging Puppy Cat', file: '/stickers/hint.png', mood: 'Hint / Assistance', trigger: 'Clicking the Hint button' },
  { id: CAT_EMOTIONS.CRYING, name: 'Waterfall Tears Crying Cat', file: '/stickers/crying.png', mood: 'Overwhelmed / 3 Mistakes', trigger: 'Accumulating 3 or more errors' },
  { id: CAT_EMOTIONS.FOCUS, name: 'Dilated Laser Focus Cat', file: '/stickers/focus.png', mood: 'Laser Focus / Endgame', trigger: 'Over 75% of board completed' },
  { id: CAT_EMOTIONS.GOJO, name: 'Gojo Satoru Cat', file: '/stickers/gojo.png', mood: 'Domain Expansion / Genius', trigger: 'Brilliant deduction or Auto-Solve' },
  { id: CAT_EMOTIONS.BOSS, name: 'Heart Sunglasses Boss Cat', file: '/stickers/boss.png', mood: 'Victory / Grandmaster', trigger: '100% Puzzle Solved (Victory)' }
];

/**
 * Returns the sticker image asset URL for a given cat emotion.
 * Falls back to polite.png if unknown.
 */
export function getStickerUrl(emotion) {
  const found = STICKER_CATALOG.find(s => s.id === emotion);
  return found ? found.file : '/stickers/polite.png';
}
