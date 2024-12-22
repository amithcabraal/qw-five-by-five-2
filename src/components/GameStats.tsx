import React from 'react';
import { Play, Pause } from 'lucide-react';

interface GameStatsProps {
  timer: string;
  currentSetIndex: number;
  totalSets: number;
  isPaused: boolean;
  onTogglePause: () => void;
}

export function GameStats({ 
  timer, 
  currentSetIndex, 
  totalSets, 
  isPaused, 
  onTogglePause 
}: GameStatsProps) {
  return (
    <div className="flex items-center justify-center gap-4">
      <div className="flex items-center gap-4">
        <p className="text-xl font-mono dark:text-white">
          {timer}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Set {currentSetIndex + 1} of {totalSets}
        </p>
      </div>
      <button
        onClick={onTogglePause}
        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        aria-label={isPaused ? 'Resume' : 'Pause'}
      >
        {isPaused ? (
          <Play size={20} className="dark:text-white" />
        ) : (
          <Pause size={20} className="dark:text-white" />
        )}
      </button>
    </div>
  );
}