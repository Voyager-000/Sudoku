import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar.jsx';
import { TopBar } from './components/TopBar.jsx';
import { Board } from './components/Board.jsx';
import { Controls } from './components/Controls.jsx';
import { StickersModal } from './components/StickersModal.jsx';
import { StatsModal } from './components/StatsModal.jsx';

import { useSudoku } from './hooks/useSudoku.js';
import { useTimer } from './hooks/useTimer.js';
import { useKeyboard } from './hooks/useKeyboard.js';
import { useCatEmotion } from './hooks/useCatEmotion.js';

import './styles/index.css';
import './styles/board.css';
import './styles/controls.css';

export function App() {
  const [isStickersModalOpen, setIsStickersModalOpen] = useState(false);

  const {
    emotion,
    dialogue,
    isTalking,
    triggerReaction,
    onSelectEmptyCell,
    petCat
  } = useCatEmotion();

  const {
    difficulty,
    initialBoard,
    currentBoard,
    selectedCell,
    conflicts,
    notes,
    notesMode,
    isSolved,
    isLoading,
    hintsRemaining,
    filledCount,
    totalCells,
    startNewGame,
    selectCell,
    inputDigit,
    eraseCell,
    resetGame,
    useHint,
    undo,
    setNotesMode
  } = useSudoku(triggerReaction);

  const { formattedTime, resetTimer } = useTimer(!isSolved && !isLoading);

  // Keyboard navigation & inputs
  useKeyboard({
    selectedCell,
    selectCell,
    inputDigit,
    eraseCell,
    undo,
    toggleNotesMode: () => setNotesMode(prev => !prev)
  });

  const handleCellSelect = (r, c) => {
    selectCell(r, c);
    if (currentBoard && currentBoard[r][c] === 0) {
      onSelectEmptyCell();
    }
  };

  const handleNewGame = (diff = difficulty) => {
    resetTimer();
    startNewGame(diff);
  };

  const selectedDigit = selectedCell && currentBoard
    ? currentBoard[selectedCell.row][selectedCell.col]
    : null;

  return (
    <div className="app-container">
      {/* 1. Left Sidebar */}
      <Sidebar
        onNewGame={() => handleNewGame(difficulty)}
        onOpenStickers={() => setIsStickersModalOpen(true)}
        onOpenSettings={() => alert("Settings: Dark Theme (Default) active! Sound and animations enabled.")}
        onOpenAbout={() => alert("Sudoku Open Lab — Community-driven open-source project designed for students to learn web development, algorithms, and Git!")}
      />

      {/* 2. Main Center Viewport */}
      <main className="main-content-viewport">
        {/* Top Stats Bar */}
        <TopBar
          difficulty={difficulty}
          timerDisplay={formattedTime}
          filledCount={filledCount}
          totalCells={totalCells}
          hintsRemaining={hintsRemaining}
          onChangeDifficulty={(newDiff) => handleNewGame(newDiff)}
          onUseHint={useHint}
        />

        {/* Center Game Play Area: Board + Right Controls Panel */}
        <div className="game-play-area">
          {/* Sudoku Board with Peeking Kitten */}
          <Board
            board={currentBoard}
            initialBoard={initialBoard}
            notes={notes}
            selectedCell={selectedCell}
            conflicts={conflicts}
            onSelectCell={handleCellSelect}
            kittenEmotion={emotion}
            kittenDialogue={dialogue}
            isTalking={isTalking}
            onPetKitten={petCat}
          />

          {/* Right Control & Keypad Panel */}
          <Controls
            filledCount={filledCount}
            totalCells={totalCells}
            selectedDigit={selectedDigit}
            onInputDigit={inputDigit}
            onErase={eraseCell}
            onReset={resetGame}
            onNewGame={() => handleNewGame(difficulty)}
          />
        </div>
      </main>

      {/* Telegram Stickers Management Modal */}
      <StickersModal
        isOpen={isStickersModalOpen}
        onClose={() => setIsStickersModalOpen(false)}
      />

      {/* Victory Celebration Modal */}
      <StatsModal
        isSolved={isSolved}
        timerDisplay={formattedTime}
        difficulty={difficulty}
        onPlayAgain={() => handleNewGame(difficulty)}
      />
    </div>
  );
}

export default App;
