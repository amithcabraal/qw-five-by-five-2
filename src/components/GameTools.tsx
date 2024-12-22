import React from 'react';
import { Lightbulb, Wand2, Shuffle, Flag } from 'lucide-react';

interface GameToolsProps {
  onHint: () => void;
  onSolve: () => void;
  onShuffle: () => void;
  onGiveUp: () => void;
}

export function GameTools({ onHint, onSolve, onShuffle, onGiveUp }: GameToolsProps) {
  return (
    <div className="flex justify-center gap-2 mt-4 flex-wrap">
      <button
        onClick={onHint}
        className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
      >
        <Lightbulb size={20} />
        Hint
      </button>
      <button
        onClick={onSolve}
        className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
      >
        <Wand2 size={20} />
        Solve
      </button>
      <button
        onClick={onShuffle}
        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        <Shuffle size={20} />
        Shuffle
      </button>
      <button
        onClick={onGiveUp}
        className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
      >
        <Flag size={20} />
        Give Up
      </button>
    </div>
  );
}