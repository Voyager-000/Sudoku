# Sudoku Open Lab 🧩🐾

[![Live Demo](https://img.shields.io/badge/Live%20Demo-openlabsudoku.vercel.app-5468FF?style=for-the-badge&logo=vercel)](https://openlabsudoku.vercel.app/)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg?style=for-the-badge)](https://www.gnu.org/licenses/gpl-3.0)
[![Good First Issues](https://img.shields.io/badge/Good%20First%20Issues-13%20Available-brightgreen?style=for-the-badge)](GOOD_FIRST_ISSUES.md)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vitest](https://img.shields.io/badge/Tests-Passing-10B981?style=for-the-badge&logo=vitest&logoColor=white)](https://vitest.dev/)

> **An open-source interactive Sudoku web app with "Coach Mochi" — a reactive kitten companion featuring 15 authentic Telegram stickers and synthesized audio feedback.**
> Designed for college students and first-time contributors to learn clean modular software architecture, algorithm design, reactive UI state management, and collaborative Git contribution workflows.

🎮 **[Play Live Now: openlabsudoku.vercel.app](https://openlabsudoku.vercel.app/)**  
🐙 **[GitHub Repository: Voyager-000/Sudoku](https://github.com/Voyager-000/Sudoku)**  
🎯 **[Student Contribution Roadmap: GOOD_FIRST_ISSUES.md](GOOD_FIRST_ISSUES.md)**

---

## ✨ Features

- **🎮 9×9 Interactive Sudoku Grid**:
  - Electric blue 3×3 subgrid borders with accessible high-contrast dark theme.
  - Smart crosshair illumination (row, column, 3×3 box highlighting).
  - Matching numbers highlight across the entire board.
  - Soft red indicator on duplicate rule violations.
- **🐾 Coach Mochi — Reactive Kitten Companion**:
  - Perched atop the board with real-time situational awareness and speech bubble commentary.
  - Powered by **15 authentic Telegram cat reaction stickers** (Buffering Cat, Screaming Shock Cat, Thumbs-Up, Ecstasy, Study, Polite, Gojo Satoru, Boss Cat, etc.).
  - Evaluates streaks, completed sections, candidate pencil notes, and endgame progress.
  - Click Coach Mochi to pet him for an authentic purr / mew!
- **🔊 Synthesized Web Audio Engine**:
  - Zero external audio files required! Pure client-side Web Audio synthesis.
  - Tactile clicks for keypad inputs, harmonic chord chimes for correct moves, low-frequency warning buzz for conflicts, section-clear arpeggios, and victory fanfare.
- **🔢 3×3 Keypad & Symmetrical Action Controls**:
  - Quick difficulty selector: **Easy**, **Medium**, and **Hard**.
  - 1–9 digit keypad with remaining number counts.
  - **Undo** move history support (`Ctrl + Z`).
  - **Pencil Notes** candidate mode toggle (press `N`).
  - Auto-clearing candidate notes when a confirmed number is placed.
  - **Erase** and **Reset** controls.
- **⌨️ Comprehensive Desktop Keyboard Navigation**:
  - `Arrow Keys` / `WASD` / `HJKL` to navigate the grid.
  - Number keys `1–9` to input digits or toggle pencil candidates.
  - `Backspace` / `Delete` to erase cells.
  - `N` to toggle pencil mode, `Ctrl + Z` to undo.
- **🪟 Interactive Modal System**:
  - **Telegram Stickers Gallery**: Browse all 15 active stickers with character themes, mood labels, and exact gameplay triggers.
  - **Game Settings**: Toggle sound effects, auto-clearing pencil notes, conflict highlights, and matching digits.
  - **About Dialog**: Student mission overview, documentation links, and direct access to the GitHub repository.
  - **Victory Celebration**: Automatic confetti fireworks and solve time tracking.

---

## 🏛️ Modular Architecture

The project enforces strict separation of concerns to facilitate educational contributions:

```text
src/
├── engine/              # PURE JAVASCRIPT logic (Zero React / UI dependencies)
│   ├── constants.js     # Grid dimensions, difficulties, 15 cat emotions
│   ├── validator.js     # Row, column, 3x3 box rules, conflict detection
│   ├── solver.js        # MRV Backtracking solver with constraint propagation
│   ├── generator.js     # Unique-solution hole-digging puzzle generator
│   ├── evaluator.js     # Situational move analysis & companion reactions
│   ├── stickers.js      # Telegram cat stickers catalog
│   └── __tests__/       # Vitest unit test suite (14 passing tests)
│
├── hooks/               # REACT STATE & LOGIC
│   ├── useSudoku.js     # Game state, notes, undo history, auto-clear
│   ├── useCatEmotion.js # Companion state machine & speech dialogue
│   ├── useTimer.js      # Elapsed solve timer
│   └── useKeyboard.js   # Keyboard events & shortcut bindings
│
├── components/          # REUSABLE UI COMPONENTS
│   ├── Board.jsx        # 9x9 grid container & Coach Mochi perch
│   ├── Cell.jsx         # Individual cell with notes & conflict styling
│   ├── PeekingKitten.jsx# Dynamic mascot sticker & animated speech bubble
│   ├── Controls.jsx     # Difficulty bar, 3x3 keypad & action grid
│   ├── TopBar.jsx       # Stats pills (Time, Filled, Hints)
│   ├── Sidebar.jsx      # Navigation, settings, stickers, and GitHub links
│   ├── StickersModal.jsx# Interactive 15 Telegram stickers gallery
│   ├── SettingsModal.jsx# Audio and visual preference toggles
│   ├── AboutModal.jsx   # Student contributor guide & links
│   └── StatsModal.jsx   # Victory confetti & solve statistics
│
└── utils/
    └── audio.js         # Web Audio API synthesizer
```

---

## 🚀 Quick Start for Contributors

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [Git](https://git-scm.com/)

### Installation & Local Setup

```bash
# 1. Clone the repository
git clone https://github.com/Voyager-000/Sudoku.git
cd Sudoku

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Visit `http://localhost:5173/` in your browser.

### Running Unit Tests

```bash
npm test
```

### Building for Production

```bash
npm run build
```

---

## 📚 Documentation for Students

Comprehensive guides are available in this repository:
- 🎯 **[Student Contribution Roadmap & Issues](GOOD_FIRST_ISSUES.md)**
- 📐 [System Architecture Guide](docs/ARCHITECTURE.md)
- 🧩 [Module 01: Core Engine & Solver Algorithm](docs/modules/01-core-engine.md)
- 🐾 [Module 02: Coach Mochi & Telegram Stickers](docs/modules/02-cat-companion.md)
- ⌨️ [Module 03: UI System & Keyboard Interactions](docs/modules/03-ui-and-interactions.md)
- 🤝 [Contribution Guidelines & Git Workflow](CONTRIBUTING.md)

---

## 🤝 How to Contribute

1. Browse **[GOOD_FIRST_ISSUES.md](GOOD_FIRST_ISSUES.md)** to find a beginner-friendly bug or feature.
2. Fork the repository on GitHub: [Voyager-000/Sudoku](https://github.com/Voyager-000/Sudoku).
3. Create a new descriptive branch (`git checkout -b fix/timer-tab-visibility`).
4. Write clean, tested code and verify with `npm test` and `npm run build`.
5. Commit your changes following conventional commit style (`git commit -m "fix(timer): pause timer when browser tab is hidden"`).
6. Push to your fork (`git push origin fix/timer-tab-visibility`) and submit a Pull Request!

---

## 📄 License & Attribution

- **Source Code**: Licensed under the **[GNU General Public License v3.0 (GPLv3)](LICENSE)**. This ensures that Sudoku Open Lab and any derivative software remain free and open-source forever for educational communities.
- **Kitten Mascot Stickers**: Third-party Telegram cat sticker graphics included in `public/stickers/` are for non-commercial educational and parody purposes. All copyrights remain with their original creators.