# 🎨 Module 03: Modern UI, Grid System & Companion Layout

This guide documents the UI structure, styling tokens, responsive layout, and interaction model implemented in **Sudoku Open Lab**.

---

## 🎯 Objectives

1. Implement the market-standard Sudoku layout with elevated contemporary aesthetics:
   - Deep indigo/periwinkle branding (`#5D5FEF`, `#6366F1`) matching modern puzzle apps.
   - Distinct 3×3 subgrid borders with accessible contrast.
   - Smart crosshairs: soft lavender row/column illumination and matching number highlights.
2. Integrate **Coach Mochi the Cat** perched directly above the controls card with real-time situational commentary.
3. Support full touch, mouse, and desktop keyboard navigation (`Arrows`/`WASD`, `1–9`, `Backspace`, `N` for notes, `Ctrl+Z` for undo).

---

## 📐 Layout Architecture

The app is built around a split two-column flex container (`.game-layout`):

```text
┌─────────────────────────────────────────────────────────────────┐
│ Header: Logo "SuDoKu OPEN LAB"  ·  GitHub Repo Link             │
├───────────────────────────────┬─────────────────────────────────┤
│                               │ 🐾 Coach Mochi Speech Bubble    │
│                               │    & Animated SVG Mascot        │
│                               ├─────────────────────────────────┤
│   9×9 Sudoku Board            │ 🎮 Controls: New Game, Solve,   │
│   · 3×3 Subgrid Borders       │    Undo, Timer & Difficulty     │
│   · Crosshair Highlighting    ├─────────────────────────────────┤
│   · Confirmed / Notes Modes   │ 🔢 3×3 Keypad (1–9 with counts) │
│                               │    & Erase / Notes Mode Toggles │
└───────────────────────────────┴─────────────────────────────────┘
```

On mobile screens (< 860px), the layout automatically transitions to a clean single-column stacked view with touch-optimized target sizes.

---

## 🎨 Color System Tokens

Defined in `src/styles/index.css`:

| CSS Variable | Value | Purpose |
| :--- | :--- | :--- |
| `--primary` | `#5D5FEF` | Brand color, buttons, selected cell background |
| `--primary-hover` | `#4F46E5` | Interactive hover state for buttons |
| `--primary-light` | `#EEF2FF` | Soft periwinkle tint for timer card, numpad buttons |
| `--cell-highlight` | `#EEF2FF` | Crosshair row, column, and 3×3 box background |
| `--cell-same` | `#DBEAFE` | Highlighting cells matching the selected number |
| `--cell-conflict` | `#FEE2E2` | Subtle red alert background on rule violations |
| `--border-dark` | `#334155` | 3×3 subgrid outer and sector division borders |

---

## ⌨️ Keyboard Controls (`useKeyboard.js`)

| Key(s) | Action |
| :--- | :--- |
| `↑` `↓` `←` `→` or `W` `A` `S` `D` | Navigate the grid focus |
| `1` through `9` | Place digit (or toggle note in Notes mode) |
| `Backspace` or `Delete` | Erase selected cell |
| `N` | Toggle between Confirmed number mode and Pencil Notes mode |
| `Ctrl + Z` / `Cmd + Z` | Undo last placement |

---

## 🚀 How Students Can Contribute to Module 03

1. **Themes & Dark Mode**: Add a dark theme toggle by extending CSS variables in `src/styles/index.css`.
2. **Audio Effects**: Add subtle tactile click sounds using the Web Audio API on button clicks and digit placements.
3. **Custom Mascot Outfits**: Add hats, glasses, or seasonal outfits to Coach Mochi in `CatCompanion.jsx`.
