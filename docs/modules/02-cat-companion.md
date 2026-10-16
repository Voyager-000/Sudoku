# 🐾 Module 02: "Coach Mochi" Companion & Telegram Sticker System

Inspired by Chess.com's interactive coaches and bots (e.g. Magnus Carlsen, Mittens), **Coach Mochi** is a reactive companion perched directly atop the Sudoku board frame. Mochi acts as a live coach, reacting dynamically with authentic Telegram stickers, speech bubble commentary, and synthesized audio feedback as the player makes moves.

---

## 🎯 Objectives

1. Make Sudoku engaging, friendly, and psychologically rewarding.
2. Provide real-time situational awareness:
   - Celebrate streaks and completed rows/columns/boxes.
   - React in shock when an invalid duplicate move is made.
   - Cheer when the player enters the endgame (>75% completed) or solves tough cells.
   - Switch to study mode when pencil notes mode is enabled.
3. Keep the architecture modular and extensible so students can easily add new stickers, dialogue lines, and evaluation heuristics.

---

## 🐱 The 15 Authentic Telegram Cat Stickers Catalog

The companion uses 15 categorized Telegram stickers placed in `public/stickers/`:

| # | File | Sticker Character | Emotion Enum | Gameplay Trigger Condition | Dialogue Sample |
|---|---|---|---|---|---|
| 1 | `thinking.png` | Buffering Cat (Loading Spinner) | `THINKING` | Selecting an empty cell to ponder | *"Loading brain cells... what fits here? 🔄"* |
| 2 | `thumbsup.png` | Determined Thumbs-Up Cat | `THUMBSUP` | Valid correct number placement | *"Solid placement! Looking clean 👍"* |
| 3 | `shocked.png` | Screaming Shock Cat | `SHOCKED` | Duplicate rule conflict in row/col/box | *"HOLD UP! That number already exists! 😱"* |
| 4 | `ecstasy.png` | Heart Vortex Ecstasy Cat | `ECSTASY` | Completing a full row, col, or 3×3 box | *"SWEET VICTORY! Section cleared! ✨"* |
| 5 | `angry.png` | Anime Vein Mark Cat 💢 | `ANGRY` | Repeated conflict in the same cell | *"Meow?! Check the board rules carefully! 💢"* |
| 6 | `study.png` | Sleepy Cat with Notebook & Pencil | `STUDY` | Toggling Pencil Notes mode (N) | *"Pencil notes activated! Let's do math! ✏️📓"* |
| 7 | `polite.png` | Polite Beluga Smiling Cat :\] | `POLITE` | Default idle, new game start, reset | *"Politely waiting for your grandmaster move :) 🐾"* |
| 8 | `love.png` | Sparkle Paw Heart Cat | `LOVE` | 5+ move streak or clicking Coach Mochi | *"Purrr! 5 in a row! You're on fire! 💖"* |
| 9 | `sad.png` | Droopy-Eyed Remorse Cat | `SAD` | Erasing a cell or pressing Undo | *"We take that back... let's pretend that never happened 🥺"* |
| 10 | `sweatdrop.png` | Panda-Bag Sweatdrop Cat 💧 | `SWEATDROP` | Hard or Expert difficulty cell selected | *"Phew, this one is tricky. Take your time! 💧"* |
| 11 | `hint.png` | Leg-Hugging Puppy-Eyed Kitten | `HINT` | Clicking the Hint lightbulb button | *"Here's a gentle paw in the right direction! 💡"* |
| 12 | `crying.png` | Waterfall Tears Crying Cat | `CRYING` | 3+ cumulative mistakes in a session | *"It's okay! Even grandmasters make mistakes 😭"* |
| 13 | `focus.png` | Dilated Laser Focus Cat | `FOCUS` | > 75% of puzzle cells completed | *"Final stretch! Laser focus activated! 🎯"* |
| 14 | `gojo.png` | Gojo Satoru Cat 🤞⚡ | `GOJO` | Domain Expansion / Auto-solve trigger | *"Throughout heaven and earth, this Sudoku is solved 🤞⚡"* |
| 15 | `boss.png` | Heart Sunglasses Boss Cat 💜🕶️ | `BOSS` | 100% Puzzle victory & confetti burst | *"Absolute Grandmaster! Pure purr-fection! 🏆"* |

---

## 🧠 Situational Review Engine (`src/engine/evaluator.js`)

The evaluator runs on every move without mutating any board state:

```javascript
export function evaluateMove(
  currentBoard,
  solutionBoard,
  initialBoard,
  row,
  col,
  value,
  currentStreak = 0,
  consecutiveErrors = 0
) {
  // 1. Check for duplicate conflicts
  // 2. Check for completed row, column, or 3x3 block
  // 3. Check for streaks and completion percentage
  // 4. Return { quality, emotion, message }
}
```

---

## 🔊 Synthesized Audio (`src/utils/audio.js`)

Zero external audio files required! A lightweight client-side Web Audio synthesizer provides:
- **`playTap()`**: 480Hz tactile sine drop for number clicks and keypad taps.
- **`playChime()`**: C5-E5-G5 triad chord for correct moves.
- **`playError()`**: 140Hz sawtooth buzz for rule conflicts.
- **`playSectionComplete()`**: C5-E5-G5-C6 ascending arpeggio for row/box clears.
- **`playVictory()`**: Fanfare for completing the puzzle.
- **`playPurr()`**: Frequency modulation pitch sweep mimicking a cute kitten mew when petted.

---

## 💡 Good First Issues for Students

1. **Add custom cat sticker packs**: Allow players to upload or select different sticker themes in the Stickers Modal.
2. **Dialogue localization (i18n)**: Add Spanish, French, Hindi, and Japanese speech bubble translations.
3. **Sound volume slider**: Add an interactive volume slider in the Settings Modal.
