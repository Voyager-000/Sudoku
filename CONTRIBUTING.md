# Contributing to Sudoku Open Lab 🧩

[![Live Demo](https://img.shields.io/badge/Live%20Demo-openlabsudoku.vercel.app-5468FF?style=flat-square&logo=vercel)](https://openlabsudoku.vercel.app/)
[![Repository](https://img.shields.io/badge/GitHub-Voyager--000%2FSudoku-181717?style=flat-square&logo=github)](https://github.com/Voyager-000/Sudoku)

Welcome to **Sudoku Open Lab**! This project is designed specifically for students and first-time open-source contributors to gain hands-on experience in modern web development, Git workflows, clean architecture, and algorithmic problem solving.

🎮 **Live Web App**: [https://openlabsudoku.vercel.app/](https://openlabsudoku.vercel.app/)  
🐙 **GitHub Repo**: [https://github.com/Voyager-000/Sudoku](https://github.com/Voyager-000/Sudoku)

Whether you're fixing a typo, adding a new Sudoku solving technique, polishing animations, or improving mobile accessibility, your contributions are warmly welcomed!

---

## 🧭 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Project Architecture](#project-architecture)
- [Development Setup](#development-setup)
- [Step-by-Step Contribution Workflow](#step-by-step-contribution-workflow)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Submitting a Pull Request](#submitting-a-pull-request)
- [Need Help?](#need-help)

---

## 🤝 Code of Conduct

We are committed to providing a friendly, supportive, and harassment-free experience for everyone. Please be respectful, welcoming, and encouraging to fellow learners and contributors.

---

## 💡 How Can I Contribute?

The easiest way to get started is by checking out our curated **[🎯 Good First Issues & Student Roadmap](GOOD_FIRST_ISSUES.md)**! It contains a curated list of beginner-friendly bugs, UI polish tasks, algorithm puzzles, and unit test challenges complete with:
- The exact files to inspect
- Key concepts to learn
- Acceptance criteria
- Suggested git branch and commit commands

You can also look for GitHub issues labeled with:
- `good first issue`: Accessible tasks tailored for beginners (e.g., adding a shortcut, styling tweak, extra unit tests).
- `documentation`: Improving guides, adding code comments, or writing tutorials for new contributors.
- `algorithm`: Working on Sudoku puzzle generation, hint heuristics, and backtracking solvers.
- `ui/ux`: Enhancing game interactions, accessibility (ARIA), animations, and responsive mobile layouts.

---

## 🏛️ Project Architecture

To keep the codebase maintainable and beginner-friendly, the project is strictly separated into three layers:

```text
src/
├── engine/        # PURE JAVASCRIPT logic (Zero React dependencies)
│                  # Contains validator, solver, generator, hints
├── hooks/         # Custom React hooks managing game state, timers, keyboard
├── components/    # Modular React UI components (Board, Cell, Controls, Numpad)
└── styles/        # Clean Vanilla CSS design system (tokens, themes, animations)
```

> 📌 **Rule of Thumb**: Pure game logic (e.g., checking if a move is legal) should always live in `src/engine/` so it can be tested independently of the user interface.

Detailed documentation is available in [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md).

---

## 🛠️ Development Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or higher recommended)
- [Git](https://git-scm.com/)
- A code editor (such as VS Code)

### Getting Started

1. **Fork the repository** on GitHub.
2. **Clone your fork** to your local machine:
   ```bash
   git clone https://github.com/<your-username>/Sudoku.git
   cd Sudoku
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Start the development server**:
   ```bash
   npm run dev
   ```
5. Open your browser and navigate to `http://localhost:5173`.

---

## 🔄 Step-by-Step Contribution Workflow

1. **Keep your fork in sync**:
   ```bash
   git remote add upstream https://github.com/Voyager-000/Sudoku.git
   git fetch upstream
   git checkout main
   git merge upstream/main
   ```

2. **Create a descriptive feature branch**:
   ```bash
   # Use descriptive branch prefixes like feature/ or fix/
   git checkout -b feature/naked-single-hint
   ```

3. **Write clean, documented code**:
   - Add JSDoc comments to functions explaining parameters and return values.
   - Keep functions focused on a single responsibility.
   - Do not commit generated build files (`dist/`) or `node_modules/`.

4. **Test your changes**:
   - Run verification tests to ensure existing game logic remains unbroken:
     ```bash
     npm test
     ```
   - Verify visually in the browser across both desktop and mobile viewports.

---

## 📝 Commit Message Guidelines

We follow standard conventional commit prefixes:

- `feat:` A new feature for the user (e.g., `feat: add timer pause overlay`)
- `fix:` A bug fix (e.g., `fix: correct 3x3 box conflict detection`)
- `docs:` Documentation changes only (e.g., `docs: add solver algorithm explanation`)
- `style:` Formatting or CSS improvements with no logic changes
- `refactor:` Code restructuring without changing behavior
- `test:` Adding or updating tests

*Example*:
```bash
git commit -m "feat(engine): add minimum remaining values heuristic to solver"
```

---

## 🚀 Submitting a Pull Request

1. Push your branch to your GitHub fork:
   ```bash
   git push -u origin feature/your-feature-name
   ```
2. Navigate to your fork on GitHub and click **Compare & pull request**.
3. Fill out the PR description:
   - What does this PR do?
   - Which issue does it resolve? (e.g., `Fixes #12`)
   - How was it tested? Include screenshots or screen recordings for UI changes.
4. Submit the PR for review! A maintainer will review your work and provide constructive feedback.

---

## 💬 Need Help?

If you ever get stuck or have questions:
- Open a GitHub Discussion or comment directly on the issue you are working on.
- Check out the module-specific guides in the [`docs/`](./docs/) directory.
- Remember: there are no silly questions in open source! Happy coding! 🚀
