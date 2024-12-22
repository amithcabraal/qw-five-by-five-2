import React, { useState } from 'react';
import { Grid } from './components/Grid';
import { GameHeader } from './components/GameHeader';
import { GameInfo } from './components/GameInfo';
import { GameTools } from './components/GameTools';
import { ResultScreen } from './components/ResultScreen';
import { HowToPlayModal } from './components/HowToPlayModal';
import { useGameState } from './hooks/useGameState';
import { useTimer } from './hooks/useTimer';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true';
    }
    return false;
  });
  const [showHowToPlay, setShowHowToPlay] = useState(false);

  const {
    letters,
    selectedIndices,
    solvedIndices,
    solvedWords,
    currentSet,
    showResult,
    hintIndex,
    isError,
    isGiveUp,
    remainingWords,
    handleLetterClick,
    handleHint,
    handleSolve,
    handleShuffle,
    handlePlayAgain,
    handleShare,
    handleGiveUp,
  } = useGameState();

  const {
    timer,
    seconds,
    isPaused,
    togglePause,
    resetTimer
  } = useTimer({ showResult });

  const handleGamePlayAgain = () => {
    handlePlayAgain();
    resetTimer();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-4 transition-colors duration-300">
      <div className="max-w-lg mx-auto">
        <GameHeader
          isDarkMode={isDarkMode}
          onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
          onShare={handleShare}
          onShowHowToPlay={() => setShowHowToPlay(true)}
        />

        <GameInfo
          theme={currentSet.theme}
          timer={timer}
          isPaused={isPaused}
          onTogglePause={togglePause}
          selectedLetters={selectedIndices.map(i => letters[i])}
        />

        <GameTools 
          onHint={handleHint}
          onSolve={handleSolve}
          onShuffle={handleShuffle}
          onGiveUp={handleGiveUp}
        />

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 mt-4">
          {!isPaused ? (
            <Grid
              letters={letters}
              selectedIndices={selectedIndices}
              solvedIndices={solvedIndices}
              isError={isError}
              hintIndex={hintIndex}
              onLetterClick={handleLetterClick}
            />
          ) : (
            <div className="h-[360px] flex items-center justify-center">
              <p className="text-xl text-gray-500 dark:text-gray-400 font-medium">Game Paused</p>
            </div>
          )}
        </div>

        {showResult && (
          <ResultScreen
            theme={currentSet.theme}
            solvedWords={solvedWords}
            remainingWords={remainingWords}
            timeTaken={seconds}
            onPlayAgain={handleGamePlayAgain}
            onShare={handleShare}
            isDarkMode={isDarkMode}
            isGiveUp={isGiveUp}
          />
        )}

        <HowToPlayModal
          isOpen={showHowToPlay}
          onClose={() => setShowHowToPlay(false)}
        />
      </div>
    </div>
  );
}