import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar.jsx';
import { TopBar } from './components/TopBar.jsx';
import { Board } from './components/Board.jsx';
import { Controls } from './components/Controls.jsx';
import { StickersModal } from './components/StickersModal.jsx';
import { SettingsModal } from './components/SettingsModal.jsx';
import { AboutModal } from './components/AboutModal.jsx';
import { StatsModal } from './components/StatsModal.jsx';

import { useSudoku } from './hooks/useSudoku.js';
import { useTimer } from './hooks/useTimer.js';
import { useKeyboard } from './hooks/useKeyboard.js';
import { useCatEmotion } from './hooks/useCatEmotion.js';
import { sound } from './utils/audio.js';

import './styles/index.css';
import './styles/board.css';
import './styles/controls.css';

export function App() {
  // Modal states
  const [isStickersModalOpen, setIsStickersModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);

  // Settings states
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [autoRemoveNotes, setAutoRemoveNotes] = useState(true);
  const [highlightConflicts, setHighlightConflicts] = useState(true);
  const [highlightMatching, setHighlightMatching] = useState(true);

  const {
    emotion,
    dialogue,
    isTalking,
    triggerReaction,
    onSelectEmptyCell,
    onToggleNotes,
    onHintGiven,
    onResetGame,
    petCat,
    onGojoSolve,
    onUndoMove
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
    canUndo,
    startNewGame,
    selectCell,
    inputDigit,
    eraseCell,
    resetGame,
    useHint,
    undo,
    solveGame,
    setNotesMode
  } = useSudoku(triggerReaction, { autoRemoveNotes });

  const { formattedTime, resetTimer } = useTimer(!isSolved && !isLoading);

  const handleToggleSound = () => {
    setSoundEnabled(prev => {
      const next = !prev;
      sound.setEnabled(next);
      return next;
    });
  };

  const handleToggleNotes = () => {
    setNotesMode(prev => {
      const next = !prev;
      onToggleNotes(next);
      return next;
    });
  };

  // Keyboard navigation & inputs
  useKeyboard({
    selectedCell,
    selectCell,
    inputDigit,
    eraseCell,
    undo: () => undo(onUndoMove),
    toggleNotesMode: handleToggleNotes
  });

  const handleCellSelect = (r, c) => {
    selectCell(r, c);
    if (currentBoard && currentBoard[r][c] === 0) {
      onSelectEmptyCell(difficulty);
    }
  };

  const handleNewGame = (diff = difficulty) => {
    resetTimer();
    startNewGame(diff);
  };

  const handleReset = () => {
    resetGame();
    onResetGame();
  };

  const handleUseHint = () => {
    useHint(onHintGiven);
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
        onOpenSettings={() => setIsSettingsModalOpen(true)}
        onOpenAbout={() => setIsAboutModalOpen(true)}
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
          onUseHint={handleUseHint}
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
            highlightConflicts={highlightConflicts}
            highlightMatching={highlightMatching}
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
            notesMode={notesMode}
            canUndo={canUndo}
            onInputDigit={inputDigit}
            onToggleNotes={handleToggleNotes}
            onUndo={() => undo(onUndoMove)}
            onErase={eraseCell}
            onReset={handleReset}
            onNewGame={() => handleNewGame(difficulty)}
          />
        </div>
      </main>

      {/* Telegram Stickers Management Modal */}
      <StickersModal
        isOpen={isStickersModalOpen}
        onClose={() => setIsStickersModalOpen(false)}
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        autoRemoveNotes={autoRemoveNotes}
        onToggleAutoRemoveNotes={() => setAutoRemoveNotes(prev => !prev)}
        highlightConflicts={highlightConflicts}
        onToggleHighlightConflicts={() => setHighlightConflicts(prev => !prev)}
        highlightMatching={highlightMatching}
        onToggleHighlightMatching={() => setHighlightMatching(prev => !prev)}
      />

      {/* About Modal */}
      <AboutModal
        isOpen={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
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
