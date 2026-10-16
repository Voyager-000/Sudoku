# 🎨 Module 03: Modern UI, Grid System & Companion Layout

This guide documents the 3-column desktop layout, dark theme design system, keyboard controls, and modal architecture implemented in **Sudoku Open Lab**.

---

## 📐 Layout Architecture (3 Columns)

```text
┌──────────────┬──────────────────────────────┬───────────────────────────────┐
│ Left Sidebar │ Center Board Section         │ Right Control Panel           │
├──────────────┼──────────────────────────────┼───────────────────────────────┤
│ 🐱 Brand     │ 🔘 Difficulty Selector       │ ⏱️ Stats (Time, Filled, Hints) │
│              │    [Easy] [Medium] [Hard]    │                               │
│ ⊞ New Game   │ 🐾 Coach Mochi & Bubble      │ 🔢 3×3 Keypad (1 to 9)        │
│              │    (Peeking on top border)   │                               │
│ ⚙ Settings   │ ┌──────────────────────────┐ │ 🎮 Action Grid (2×2):         │
│              │ │   9×9 Sudoku Board Frame │ │    [↶ Undo]   [✏️ Notes:ON/OFF]│
│ 🐱 Stickers  │ │   · Electric Blue Box 3x3│ │    [🗑️ Erase]  [🔄 Reset]      │
│              │ │   · Glowing Active Cell  │ │                               │
│ ℹ About      │ │   · Duplicate Conflicts  │ │ ▶ [New Game] Primary Action │
│              │ │   · Pencil Notes (3×3)   │ │                               │
│ 🐾 Quote     │ └──────────────────────────┘ │ 📊 Your Progress Bar & Star   │
│              │ 💡 "Small steps. Big wins."  │ 💡 Helpful Strategy Tip Card  │
└──────────────┴──────────────────────────────┴───────────────────────────────┘
```

---

## 🎨 Color Tokens & Aesthetics

Defined in `src/styles/index.css`:

| CSS Variable | Value | Description |
|---|---|---|
| `--bg-app` | `#0B101D` | Deep midnight space background |
| `--bg-panel` | `#12192A` | Floating card background for right panel & modals |
| `--bg-cell` | `#0D1527` | Sudoku grid cell resting color |
| `--border-subgrid` | `#2563EB` | Vibrant electric blue 3×3 box dividing borders |
| `--primary` | `#5468FF` | Royal indigo for active buttons and selections |
| `--primary-glow` | `rgba(84, 104, 255, 0.35)` | Neon shadow glow for buttons and cards |
| `--accent-pink` | `#F43F5E` | Soft rose border for Erase button |
| `--font-main` | `'Plus Jakarta Sans'` | Crisp modern geometric sans-serif |
| `--font-handwritten`| `'Caveat', cursive` | Playful hand-crafted footer quotes |

---

## ⌨️ Desktop Keyboard Shortcuts (`useKeyboard.js`)

| Key(s) | Action |
|---|---|
| `Arrow Keys` / `WASD` / `HJKL` | Move grid selection smoothly across 81 cells |
| `1` – `9` / Number pad | Input confirmed number or toggle pencil candidate |
| `Backspace` / `Delete` | Erase confirmed digit or notes in cell |
| `N` | Toggle Pencil Notes mode (switches Coach Mochi to Study cat ✏️) |
| `Ctrl + Z` / `Cmd + Z` | Undo last move (switches Coach Mochi to Sad cat 🥺) |

---

## 🪟 Modals System

All modals are centralized with `.modal-backdrop` and `.modal-content-card`:
1. **Stickers Modal (`StickersModal.jsx`)**: Displays the 15 authentic Telegram stickers, descriptions, and emotional triggers.
2. **Settings Modal (`SettingsModal.jsx`)**: Toggles audio synthesizer, auto-clearing pencil marks, duplicate conflict highlights, and matching digits.
3. **About Modal (`AboutModal.jsx`)**: Explains project mission, architecture guides, and links to `CONTRIBUTING.md`.
4. **Victory Modal (`StatsModal.jsx`)**: Fires celebratory confetti and displays completion time and stats.
