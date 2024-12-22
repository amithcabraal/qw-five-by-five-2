import React from 'react';
import { Sparkles } from 'lucide-react';
import { BurgerMenu } from './BurgerMenu';

interface GameHeaderProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onShare: () => void;
  onShowHowToPlay: () => void;
}

export function GameHeader({ isDarkMode, onToggleDarkMode, onShare, onShowHowToPlay }: GameHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
        <Sparkles className="text-yellow-500" />
        QuizWordz 5x5
      </h1>
      <BurgerMenu
        isDarkMode={isDarkMode}
        onToggleDarkMode={onToggleDarkMode}
        onShare={onShare}
        onShowHowToPlay={onShowHowToPlay}
      />
    </div>
  );
}