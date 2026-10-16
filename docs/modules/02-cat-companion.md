# 🐾 Module: "Mochi the Cat" Companion & Situational Reviewer

Inspired by Chess.com's coaches and interactive bots (e.g. Magnus Carlsen, Mittens), **Mochi the Cat** is an animated interactive companion perched beside the Sudoku board. Mochi acts as a live coach, reacting dynamically with changing expressions, body animations, and contextual speech bubble commentary as the player makes moves.

---

## 🎯 Objectives

1. Make Sudoku engaging, friendly, and psychologically rewarding.
2. Provide real-time situational awareness:
   - Celebrate streaks and completed rows/columns/boxes.
   - Warn gently when an invalid duplicate move is made.
   - Cheer when the player enters the endgame or solves tough cells.
3. Keep the logic modular and extensible so students can easily add new dialogue lines, cat skins, or reaction triggers.

---

## 🎭 Cat Emotional States

Mochi has a finite state machine (`useCatEmotion.js`) with the following core emotions:

| State | Trigger | Animation / Visual | Example Dialogue |
| :--- | :--- | :--- | :--- |
| `idle` | Waiting for user interaction | Tail swishing, relaxed eyes, occasional slow blink | *"Ready when you are! Let's solve this! 🐾"* |
| `thinking` | Player selects an empty cell | Tilted head, curious eyes, paw on chin | *"Hmm, what numbers are missing here?"* |
| `happy` | Valid placement advancing the board | Big smile, ears perked up, happy tail bounce | *"Purr-fect move! Looking solid."* |
| `shocked` | Invalid duplicate digit placed | Wide eyes, bristled whiskers, paws to face | *"Meow?! Check that column—it's a duplicate! 😾"* |
| `cheering` | Completed a row, column, or 3×3 box | Both paws raised, sparkles, happy jump | *"Woah! You just cleared an entire 3×3 box! ⭐"* |
| `endgame` | Puzzle is > 75% completed | Determined headband / focused eyes | *"Almost there! The final stretch! 🚀"* |
| `celebrate` | Puzzle solved / Victory | Party hat, confetti, happy victory dance | *"WE WON! You're a true Sudoku Grandmaster! 🏆"* |

---

## 🧠 Situational Review Engine (`src/engine/evaluator.js`)

The evaluator runs when the player places or erases a number:

### `evaluateMove(currentBoard, solutionBoard, row, col, value)`
Returns an evaluation report object:
```javascript
{
  quality: 'BRILLIANT' | 'SOLID' | 'MISTAKE' | 'ERASE',
  completedSector: 'ROW' | 'COL' | 'BOX' | null,
  progressPercentage: 62.5, // % of board filled correctly
  streak: 5,                // consecutive correct moves
  message: "Brilliant! Only a 7 could fit in that box!",
  emotion: 'happy' | 'cheering' | 'shocked' | 'idle'
}
```

---

## 🖼️ Telegram Sticker Integration

The companion mascot is designed to support custom Telegram sticker packs:
- Stickers are stored in `public/stickers/`:
  - `idle.svg` / `idle.webp` / `idle.png`
  - `thinking.svg` / `thinking.webp` / `thinking.png`
  - `happy.svg` / `happy.webp` / `happy.png`
  - `shocked.svg` / `shocked.webp` / `shocked.png`
  - `celebrate.svg` / `celebrate.webp` / `celebrate.png`
- The `src/engine/stickers.js` resolver dynamically maps each emotional state to the appropriate sticker image.
- Contributors can easily drop custom WebP or PNG stickers into `public/stickers/` to customize the mascot!

### Student Contribution Ideas
Students can easily contribute by:
1. Adding new situational dialogue lines in `src/engine/catDialogues.js`.
2. Designing alternate companion skins (e.g., Shiba Inu, Wizard Owl, Robot).
3. Adding voice soundbites (meows, purrs, celebratory fanfare) via the Web Audio API.
