# 🎯 Good First Issues & Student Contribution Roadmap

Welcome to **Sudoku Open Lab**! This project was built specifically for students and first-time open-source contributors. If you are looking to:
- Learn how modern React & Vite applications are structured
- Understand how to find bugs and trace state flow
- Practice Git branching, conventional commits, and Pull Requests
- Learn algorithm heuristics (MRV backtracking, constraint propagation)

...you are in the right place! 🚀

---

## 🧭 How to Pick and Work on an Issue

1. **Browse the issues below** and pick one that interests you.
2. **Check the GitHub Issues page** at [Voyager-000/Sudoku Issues](https://github.com/Voyager-000/Sudoku/issues) to make sure someone else hasn't already claimed it. If not, open an issue or leave a comment saying *"I'd like to work on this!"*.
3. **Fork and create a descriptive branch**:
   ```bash
   git checkout -b fix/timer-tab-visibility    # for bugs
   git checkout -b feat/keyboard-shortcuts    # for features
   ```
4. **Follow the Acceptance Criteria** specified for the issue.
5. **Run test & build checks**:
   ```bash
   npm test       # Must pass all unit tests
   npm run build  # Must build cleanly with Vite
   ```
6. **Submit a Pull Request** with a friendly description following [CONTRIBUTING.md](./CONTRIBUTING.md).

---

## 🏷️ Issue Index by Category

| ID | Title | Category | Difficulty | Recommended For |
| :--- | :--- | :--- | :--- | :--- |
| [BUG-01](#bug-01-timer-continues-running-when-browser-tab-is-inactive) | Pause Timer When Browser Tab is Inactive | Bug / Lifecycle | 🟢 Beginner | Web APIs, React Hooks |
| [BUG-02](#bug-02-settings-reset-to-defaults-on-page-refresh) | Persist User Settings in `localStorage` | Bug / State | 🟢 Beginner | Web Storage, React State |
| [BUG-03](#bug-03-escape-key-does-not-dismiss-open-modals) | Dismiss Active Modals with `Escape` Key | Bug / UX | 🟢 Beginner | Event Listeners, Accessibility |
| [BUG-04](#bug-04-timer-pause-button-and-board-privacy-blur) | Timer Pause Button with Board Blur Overlay | Feature / UI | 🟡 Intermediate | CSS Filters, Game Timers |
| [FEAT-05](#feat-05-keyboard-shortcut-cheat-sheet-modal) | Keyboard Shortcuts Cheat Sheet Modal (`?` Key) | Feature / UI | 🟢 Beginner | Modal Component, Keyboard |
| [FEAT-06](#feat-06-sound-effects-volume-slider-in-settings) | Volume Slider & Master Audio Level Control | Feature / Audio | 🟡 Intermediate | Web Audio API, Sliders |
| [FEAT-07](#feat-07-alternate-color-theme-palettes) | Custom Color Themes (Neon, Paper, Cyberpunk) | Feature / CSS | 🟢 Beginner | CSS Variables, Design Tokens |
| [FEAT-08](#feat-08-mobile-touch-haptic-feedback) | Mobile Touch Haptic Vibration Feedback | Feature / Mobile | 🟢 Beginner | Vibration API, Touch events |
| [ALGO-09](#algo-09-human-style-hint-naked-single-deduction) | Human Deductive Hint: "Naked Single" | Algorithm / Math | 🟡 Intermediate | Sudoku Logic, Pure JS |
| [ALGO-10](#algo-10-human-style-hint-hidden-single-deduction) | Human Deductive Hint: "Hidden Single" | Algorithm / Math | 🔴 Advanced | Sets, Constraint Search |
| [ALGO-11](#algo-11-puzzle-difficulty-scoring-heuristic) | Algorithmic Puzzle Difficulty Scorer | Algorithm / Math | 🔴 Advanced | Heuristic Evaluation |
| [TEST-12](#test-12-expand-engine-unit-tests-with-edge-cases) | Expand Engine Test Suite with Edge Cases | Testing / QA | 🟢 Beginner | Vitest, Unit Testing |
| [TEST-13](#test-13-test-undo-history-and-notes-invariants) | Unit Tests for Undo History & Note Auto-Clear | Testing / QA | 🟡 Intermediate | State Machine Testing |

---

## 🐛 Category A: Starter Bug Fixes & Lifecycle Improvements

### BUG-01: Timer Continues Running When Browser Tab is Inactive
- **Difficulty**: 🟢 Beginner
- **Labels**: `bug`, `good first issue`, `lifecycle`
- **Problem**: When a player switches to another browser tab or minimizes the browser window, the solve timer keeps ticking upward. When they return 20 minutes later, their solve time is unfairly inflated.
- **Where to look**: [`src/hooks/useTimer.js`](file:///d:/Aman/SUDOKU/src/hooks/useTimer.js)
- **Concept to learn**: The browser `Page Visibility API` (`document.addEventListener('visibilitychange')` and `document.hidden`).
- **Acceptance Criteria**:
  - [ ] Automatically pause the timer when `document.hidden === true`.
  - [ ] Automatically resume the timer when `document.hidden === false` (only if the game was not previously manually paused or won).
  - [ ] Clean up the event listener in the `useEffect` return function to prevent memory leaks.
- **Branch & Commit**:
  ```bash
  git checkout -b fix/timer-tab-visibility
  git commit -m "fix(timer): pause timer when browser tab is hidden"
  ```

---

### BUG-02: Settings Reset to Defaults on Page Refresh
- **Difficulty**: 🟢 Beginner
- **Labels**: `bug`, `good first issue`, `state`
- **Problem**: When a user turns sound effects off, or changes the "Auto-remove Notes" setting, their choices are lost if the page reloads.
- **Where to look**: [`src/App.jsx`](file:///d:/Aman/SUDOKU/src/App.jsx) (state `settings`) and [`src/components/SettingsModal.jsx`](file:///d:/Aman/SUDOKU/src/components/SettingsModal.jsx).
- **Concept to learn**: Reading and writing JSON to browser `localStorage` with fallback defaults.
- **Acceptance Criteria**:
  - [ ] Initialize `settings` state by reading from `localStorage.getItem('sudoku_settings')`.
  - [ ] When settings change, persist the updated settings object to `localStorage`.
  - [ ] Wrap JSON parsing in `try/catch` so corrupted storage fails safely to defaults.
- **Branch & Commit**:
  ```bash
  git checkout -b fix/persist-settings-localstorage
  git commit -m "fix(settings): persist user preferences in localStorage"
  ```

---

### BUG-03: Escape Key Does Not Dismiss Open Modals
- **Difficulty**: 🟢 Beginner
- **Labels**: `bug`, `good first issue`, `accessibility`
- **Problem**: In desktop apps, users instinctively press the `Escape` key (`Esc`) to close popups and dialogs. Currently, clicking the "✕" button or clicking the backdrop works, but pressing `Esc` does nothing.
- **Where to look**: [`src/hooks/useKeyboard.js`](file:///d:/Aman/SUDOKU/src/hooks/useKeyboard.js) and [`src/App.jsx`](file:///d:/Aman/SUDOKU/src/App.jsx).
- **Concept to learn**: Modal focus traps, global `keydown` event handling, and conditional modal closing.
- **Acceptance Criteria**:
  - [ ] Pressing `Escape` closes any currently open modal (`SettingsModal`, `StickersModal`, `AboutModal`, `StatsModal`).
  - [ ] Does not trigger unwanted board navigation or cell clearing when closing a modal.
- **Branch & Commit**:
  ```bash
  git checkout -b fix/esc-key-modal-dismiss
  git commit -m "fix(ui): close active modals when Escape key is pressed"
  ```

---

### BUG-04: Timer Pause Button and Board Privacy Blur
- **Difficulty**: 🟡 Intermediate
- **Labels**: `enhancement`, `good first issue`, `ui`
- **Problem**: Players cannot pause the game to take a phone call. If we add a pause button, players could pause the timer and continue solving the puzzle visually.
- **Where to look**: [`src/components/TopBar.jsx`](file:///d:/Aman/SUDOKU/src/components/TopBar.jsx), [`src/components/Board.jsx`](file:///d:/Aman/SUDOKU/src/components/Board.jsx), [`src/styles/index.css`](file:///d:/Aman/SUDOKU/src/styles/index.css).
- **Concept to learn**: CSS `backdrop-filter: blur()`, game state overlays, timer start/stop toggling.
- **Acceptance Criteria**:
  - [ ] Add a `⏸ Pause` / `▶ Resume` toggle button next to the timer in `TopBar.jsx`.
  - [ ] When paused, apply a CSS blur class to the 9×9 board (`filter: blur(10px)`) and render a centered overlay card: *"Game Paused — Click or press Space to resume"*.
  - [ ] Keypad and board cell clicks must be disabled while paused.
- **Branch & Commit**:
  ```bash
  git checkout -b feat/pause-timer-board-blur
  git commit -m "feat(game): add pause toggle with board blur overlay"
  ```

---

## 🎨 Category B: UI & UX Enhancements

### FEAT-05: Keyboard Shortcut Cheat Sheet Modal (`?` Key)
- **Difficulty**: 🟢 Beginner
- **Labels**: `feature`, `good first issue`, `ui`
- **Problem**: Sudoku Open Lab has extensive keyboard navigation (`WASD`, `Arrows`, `HJKL`, `1–9`, `Backspace`, `N`, `Ctrl+Z`), but users have no in-game way to discover them!
- **Where to look**: [`src/components/Sidebar.jsx`](file:///d:/Aman/SUDOKU/src/components/Sidebar.jsx), [`src/App.jsx`](file:///d:/Aman/SUDOKU/src/App.jsx).
- **Concept to learn**: Creating a new React modal component, styling keyboard badge keys (`<kbd>Ctrl</kbd> + <kbd>Z</kbd>`).
- **Acceptance Criteria**:
  - [ ] Create `src/components/ShortcutsModal.jsx` displaying a clean table of all shortcuts.
  - [ ] Add a button in the Sidebar navigation and bind the `?` (`Shift + /`) key to open it.
- **Branch & Commit**:
  ```bash
  git checkout -b feat/shortcuts-modal
  git commit -m "feat(ui): add keyboard shortcuts guide modal"
  ```

---

### FEAT-06: Sound Effects Volume Slider in Settings
- **Difficulty**: 🟡 Intermediate
- **Labels**: `feature`, `good first issue`, `audio`
- **Problem**: Currently sound is either 100% on or completely muted. Users wearing headphones might want soft, subtle sound effects.
- **Where to look**: [`src/utils/audio.js`](file:///d:/Aman/SUDOKU/src/utils/audio.js), [`src/components/SettingsModal.jsx`](file:///d:/Aman/SUDOKU/src/components/SettingsModal.jsx).
- **Concept to learn**: Web Audio API `GainNode.gain.value`, range input binding in React.
- **Acceptance Criteria**:
  - [ ] Add a Master Volume slider (`0%` to `100%`, step `5%`) in `SettingsModal.jsx`.
  - [ ] Pass the volume factor to `soundEngine` so all synthesized chimes scale proportionally.
- **Branch & Commit**:
  ```bash
  git checkout -b feat/audio-volume-slider
  git commit -m "feat(audio): add master volume slider in settings"
  ```

---

### FEAT-07: Alternate Color Theme Palettes
- **Difficulty**: 🟢 Beginner
- **Labels**: `feature`, `good first issue`, `css`
- **Problem**: The dark theme looks great, but some users prefer high-contrast light mode or alternative aesthetics (e.g. Cyberpunk Neon, Classic Newspaper Paper/Ink).
- **Where to look**: [`src/styles/index.css`](file:///d:/Aman/SUDOKU/src/styles/index.css), [`src/components/SettingsModal.jsx`](file:///d:/Aman/SUDOKU/src/components/SettingsModal.jsx).
- **Concept to learn**: CSS custom properties (`--bg-primary`, `--cell-bg`, `--accent-primary`) and body theme classes.
- **Acceptance Criteria**:
  - [ ] Add a "Theme" selector in `SettingsModal.jsx` with at least 2 themes: "Midnight Cat (Default)" and "Newspaper Classic" or "Neon Cyberpunk".
  - [ ] Apply theme class to `document.documentElement` or `#root`.
- **Branch & Commit**:
  ```bash
  git checkout -b feat/color-themes
  git commit -m "feat(styling): add color theme selector in settings"
  ```

---

### FEAT-08: Mobile Touch Haptic Feedback
- **Difficulty**: 🟢 Beginner
- **Labels**: `enhancement`, `good first issue`, `mobile`
- **Problem**: On smartphones and tablets, physical buttons have tactile feedback, but tapping glass can feel sluggish without haptic confirmation.
- **Where to look**: [`src/components/Controls.jsx`](file:///d:/Aman/SUDOKU/src/components/Controls.jsx), [`src/components/Cell.jsx`](file:///d:/Aman/SUDOKU/src/components/Cell.jsx).
- **Concept to learn**: Browser `navigator.vibrate()` API with safety checks.
- **Acceptance Criteria**:
  - [ ] Trigger a gentle 10ms–15ms vibration (`navigator.vibrate(12)`) on valid cell input or keypad tap on supported mobile devices.
  - [ ] Wrap in `if ('vibrate' in navigator)` so non-supporting desktop browsers do not throw errors.
- **Branch & Commit**:
  ```bash
  git checkout -b feat/mobile-haptics
  git commit -m "feat(mobile): add haptic vibration feedback on tap"
  ```

---

## 🧮 Category C: Algorithm & Heuristics (Computer Science)

### ALGO-09: Human Deductive Hint: "Naked Single"
- **Difficulty**: 🟡 Intermediate
- **Labels**: `algorithm`, `good first issue`, `engine`
- **Problem**: The current hint button simply looks up the solved puzzle and fills in the correct number. Real Sudoku players want hints that explain *how* to find the number through logical deduction!
- **Where to look**: Create `src/engine/hints.js`, referencing [`src/engine/validator.js`](file:///d:/Aman/SUDOKU/src/engine/validator.js).
- **Concept to learn**: Candidate elimination; a *Naked Single* is an empty cell where 8 digits are already present in its row, column, or 3×3 box, leaving only 1 possible number.
- **Acceptance Criteria**:
  - [ ] Write a pure function `findNakedSingle(board)` that scans for any cell with exactly 1 valid candidate.
  - [ ] Return `{ row, col, digit, technique: 'Naked Single', explanation: 'Row 3 already contains [1,2,3...], leaving only 4 possible.' }`.
  - [ ] Write at least 3 unit tests in `src/engine/__tests__/hints.test.js`.
- **Branch & Commit**:
  ```bash
  git checkout -b algo/naked-single-hint
  git commit -m "feat(engine): implement Naked Single logical hint detection"
  ```

---

### ALGO-10: Human Deductive Hint: "Hidden Single"
- **Difficulty**: 🔴 Advanced
- **Labels**: `algorithm`, `engine`
- **Problem**: In many Sudoku situations, a cell has multiple candidates (e.g. 2, 7), but the digit `7` cannot fit anywhere else in that entire 3×3 box. Therefore, that cell must be `7` (a *Hidden Single*).
- **Where to look**: `src/engine/hints.js`.
- **Concept to learn**: Inverted candidate indexing (mapping digits to candidate cell coordinates per box/row/col).
- **Acceptance Criteria**:
  - [ ] Write `findHiddenSingle(board)` scanning rows, cols, and boxes.
  - [ ] Return `{ row, col, digit, houseType: 'box' | 'row' | 'col', explanation: '...' }`.
  - [ ] Include automated test cases.
- **Branch & Commit**:
  ```bash
  git checkout -b algo/hidden-single-hint
  git commit -m "feat(engine): implement Hidden Single logical hint detection"
  ```

---

### ALGO-11: Puzzle Difficulty Scoring Heuristic
- **Difficulty**: 🔴 Advanced
- **Labels**: `algorithm`, `engine`
- **Problem**: Currently, difficulty is determined merely by how many clues are removed (e.g. 35 clues for Easy, 28 for Hard). But a 30-clue puzzle solved with simple singles is easier than a 32-clue puzzle requiring advanced deduction!
- **Where to look**: [`src/engine/generator.js`](file:///d:/Aman/SUDOKU/src/engine/generator.js), [`src/engine/solver.js`](file:///d:/Aman/SUDOKU/src/engine/solver.js).
- **Concept to learn**: Heuristic evaluation functions; simulating human solving steps to grade true cognitive difficulty.
- **Acceptance Criteria**:
  - [ ] Implement `calculatePuzzleDifficulty(board)` returning `{ score, difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert' }`.
  - [ ] Add unit tests verifying consistency across generated puzzles.
- **Branch & Commit**:
  ```bash
  git checkout -b algo/difficulty-scoring-heuristic
  git commit -m "feat(engine): add human-solving difficulty scoring heuristic"
  ```

---

## 🧪 Category D: Automated Testing & QA

### TEST-12: Expand Engine Test Suite with Edge Cases
- **Difficulty**: 🟢 Beginner
- **Labels**: `testing`, `good first issue`, `vitest`
- **Problem**: We need rock-solid test coverage for our pure JavaScript engine to ensure future student PRs never introduce silent algorithmic regressions.
- **Where to look**: [`src/engine/__tests__/engine.test.js`](file:///d:/Aman/SUDOKU/src/engine/__tests__/engine.test.js).
- **Concept to learn**: Vitest / Jest `describe`, `it`, `expect`, testing negative edge cases.
- **Acceptance Criteria**:
  - [ ] Add test for `isValidMove` with coordinates outside `0..8`.
  - [ ] Add test for `isBoardComplete` with a 9x9 board filled with illegal duplicate numbers.
  - [ ] Add test verifying `countSolutions` correctly returns `0` for an unsolveable puzzle.
- **Branch & Commit**:
  ```bash
  git checkout -b test/engine-edge-cases
  git commit -m "test(engine): add edge case validation tests for engine modules"
  ```

---

### TEST-13: Unit Tests for Undo History and Note Auto-Clear Invariants
- **Difficulty**: 🟡 Intermediate
- **Labels**: `testing`, `good first issue`, `vitest`
- **Problem**: When a user inputs a confirmed digit, existing candidate notes in that cell and its row/column are cleared. If they press `Undo`, those candidate notes must be cleanly restored.
- **Where to look**: Create `src/engine/__tests__/history.test.js`.
- **Concept to learn**: State transition testing, pure history stack replay.
- **Acceptance Criteria**:
  - [ ] Create a test that verifies undoing a move restores the previous board cell value and candidate set.
  - [ ] Ensure `npm test` runs all tests in <2 seconds.
- **Branch & Commit**:
  ```bash
  git checkout -b test/undo-history-invariants
  git commit -m "test(history): verify undo/redo restoration of candidate pencil marks"
  ```

---

## 💡 Have an Idea for a New Feature or Found a Bug?

We love new ideas! If you want to add something that isn't listed here:
1. Open a new issue at [Voyager-000/Sudoku Issues](https://github.com/Voyager-000/Sudoku/issues).
2. Describe your idea and how you plan to implement it.
3. Once a maintainer approves, submit your PR!

Happy coding, and have fun building! 🐾🧩
