import React from 'react';
import { Sparkles, Check, Lock } from 'lucide-react';
import { motion } from 'motion/react';

interface PuzzleTrackerProps {
  puzzlePieces: [boolean, boolean, boolean, boolean];
  unlockedLevel: number;
  className?: string;
}

const PUZZLE_INFO = [
  { id: 1, name: 'Cermin Diri', subtitle: 'Self-Awareness', color: 'from-amber-400 to-amber-600' },
  { id: 2, name: 'Jembatan Hati', subtitle: 'Empati & Peduli', color: 'from-sky-400 to-blue-600' },
  { id: 3, name: 'Gua Kebijakan', subtitle: 'Problem Solving', color: 'from-emerald-400 to-teal-600' },
  { id: 4, name: 'Tebing Potensi', subtitle: 'Kekuatan Diri', color: 'from-purple-400 to-pink-600' },
];

export const PuzzleTracker: React.FC<PuzzleTrackerProps> = ({
  puzzlePieces,
  className = '',
}) => {
  const collected = puzzlePieces.filter(Boolean).length;
  const percentage = Math.round((collected / 4) * 100);

  return (
    <div className={`bg-white rounded-2xl border border-amber-200/80 p-4 sm:p-5 shadow-xs ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-slate-800 text-sm sm:text-base">Kunci Keping Karakter</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 border border-amber-300">
              {collected}/4 Keping
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Kumpulkan keempat keping puzzle untuk membuka gembok Peti Harta Karun di Puncak Pulau!
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full sm:w-44 shrink-0">
          <div className="flex justify-between items-center text-[11px] text-slate-500 mb-1">
            <span>Kemajuan Misi</span>
            <span className="font-bold text-amber-700">{percentage}%</span>
          </div>
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden p-0.5 border border-slate-200">
            <motion.div
              className="h-full bg-gradient-to-r from-amber-500 via-orange-400 to-yellow-400 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
        </div>
      </div>

      {/* The 4 Puzzle Pieces Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
        {PUZZLE_INFO.map((item, idx) => {
          const isCollected = puzzlePieces[idx];

          return (
            <div
              key={item.id}
              className={`relative overflow-hidden rounded-xl border p-3 flex flex-col justify-between transition-all duration-300 ${
                isCollected
                  ? 'bg-amber-50/70 border-amber-300 shadow-xs'
                  : 'bg-slate-50/70 border-slate-200 opacity-75'
              }`}
            >
              {isCollected && (
                <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-amber-300/40 to-transparent pointer-events-none rounded-bl-full" />
              )}

              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-slate-400">Keping {item.id}</span>
                {isCollected ? (
                  <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </span>
                ) : (
                  <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-400 flex items-center justify-center">
                    <Lock className="w-3 h-3" />
                  </span>
                )}
              </div>

              {/* Puzzle icon graphic */}
              <div className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-xs ${
                    isCollected
                      ? `bg-gradient-to-br ${item.color} shadow-amber-300/50`
                      : 'bg-slate-300 text-slate-400'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <p className={`text-xs font-bold truncate ${isCollected ? 'text-slate-800' : 'text-slate-500'}`}>
                    {item.name}
                  </p>
                  <p className="text-[10px] text-slate-400 truncate">{item.subtitle}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
