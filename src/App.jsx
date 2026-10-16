import React from 'react';
import { Header } from './components/Header.jsx';
import { Board } from './components/Board.jsx';
import { CatCompanion } from './components/CatCompanion.jsx';
import { Controls } from './components/Controls.jsx';
import { Numpad } from './components/Numpad.jsx';
import { StatsModal } from './components/StatsModal.jsx';

import { useSudoku } from './hooks/useSudoku.js';
import { useTimer } from './hooks/useTimer.js';
import { useKeyboard } from './hooks/useKeyboard.js';
import { useCatEmotion } from './hooks/useCatEmotion.js';

import './styles/index.css';
import './styles/board.css';
import './styles/controls.css';
import './styles/cat.css';

export function App() {
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
    canUndo,
    remainingCounts,
    startNewGame,
    selectCell,
    inputDigit,
    eraseCell,
    undo,
    solveGame,
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

  const handleNewGame = (diff) => {
    resetTimer();
    startNewGame(diff);
  };

  return (
    <div className="app-container">
      <Header />

      <main className="main-content">
        <div className="game-layout">
          {/* Sudoku 9x9 Grid */}
          <div className="board-section">
            <Board
              board={currentBoard}
              initialBoard={initialBoard}
              notes={notes}
              selectedCell={selectedCell}
              conflicts={conflicts}
              onSelectCell={handleCellSelect}
            />
          </div>

          {/* Interactive Companion & Control Sidebar */}
          <div className="sidebar-section">
            {/* Mochi the Cat Companion & Live Situational Review */}
            <CatCompanion
              emotion={emotion}
              dialogue={dialogue}
              isTalking={isTalking}
              onPet={petCat}
            />

            {/* Game Controls & Timer (Market Standard Layout) */}
            <Controls
              difficulty={difficulty}
              timerDisplay={formattedTime}
              canUndo={canUndo}
              onNewGame={handleNewGame}
              onSolve={solveGame}
              onUndo={undo}
            />

            {/* Touch/Click Keypad */}
            <Numpad
              remainingCounts={remainingCounts}
              notesMode={notesMode}
              onInputDigit={inputDigit}
              onErase={eraseCell}
              onToggleNotesMode={() => setNotesMode(prev => !prev)}
            />
          </div>
        </div>
      </main>

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
