import React from 'react';
import { Compass, Volume2, VolumeX, RotateCcw, Map, Award } from 'lucide-react';
import { UserProgress } from '../types';
import { AvatarDisplay } from './AvatarDisplay';
import { sound } from '../utils/audio';

interface HeaderProps {
  progress: UserProgress;
  onNavigateToMap: () => void;
  onReset: () => void;
  onViewCertificate?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  progress,
  onNavigateToMap,
  onReset,
  onViewCertificate,
}) => {
  const [isMuted, setIsMuted] = React.useState(!sound.enabled);

  const toggleSound = () => {
    const nextState = sound.toggleMute();
    setIsMuted(!nextState);
    if (nextState) sound.playClick();
  };

  const collectedCount = progress.puzzlePieces.filter(Boolean).length;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-200/80 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-xs">
            <Compass className="w-5 h-5 animate-spin [animation-duration:15s]" />
          </div>
          <button
            onClick={() => {
              if (progress.currentScreen !== 'landing') {
                sound.playClick();
                onNavigateToMap();
              }
            }}
            className="text-left font-display font-extrabold text-lg sm:text-xl text-slate-900 tracking-tight whitespace-nowrap hover:text-amber-700 transition-colors cursor-pointer"
          >
            Pulau Karakter
          </button>
        </div>

        {/* Zone 2: Navigation Links / Mission Status */}
        {progress.currentScreen !== 'landing' ? (
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <button
              onClick={() => {
                sound.playClick();
                onNavigateToMap();
              }}
              className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 ${
                progress.currentScreen === 'map' ? 'text-amber-700 font-semibold' : 'hover:text-slate-900'
              }`}
            >
              <Map className="w-4 h-4" />
              <span>Peta Ekspedisi</span>
            </button>

            <div className="flex items-center gap-2 text-xs text-slate-500 whitespace-nowrap shrink-0">
              <span>Pos {Math.min(progress.unlockedLevel, 4)} / 4</span>
              <span aria-hidden="true">·</span>
              <span className="font-semibold text-amber-700">{collectedCount}/4 Keping Puzzle</span>
            </div>

            {progress.puzzlePieces.every(Boolean) && onViewCertificate && (
              <button
                onClick={() => {
                  sound.playClick();
                  onViewCertificate();
                }}
                className="flex items-center gap-1.5 text-amber-700 hover:text-amber-800 transition-colors whitespace-nowrap shrink-0 font-medium"
              >
                <Award className="w-4 h-4" />
                <span>Piagam Penjelajah</span>
              </button>
            )}
          </nav>
        ) : (
          <div className="hidden md:flex items-center gap-2 text-xs text-slate-500 whitespace-nowrap shrink-0">
            <span>Bimbingan & Konseling</span>
            <span aria-hidden="true">·</span>
            <span>Eksplorasi Potensi & Empati Diri</span>
          </div>
        )}

        {/* Zone 3: Actions (Sound & Explorer Profile) */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={toggleSound}
            title={isMuted ? 'Nyalakan Suara' : 'Matikan Suara'}
            className="w-9 h-9 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
            aria-label={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-amber-600" />}
          </button>

          {progress.currentScreen !== 'landing' && (
            <div className="flex items-center gap-2 pl-1 border-l border-slate-200">
              <AvatarDisplay avatarId={progress.avatarId} size="sm" />
              <div className="hidden sm:block text-left">
                <p className="text-xs font-semibold text-slate-800 truncate max-w-[120px]">{progress.playerName || 'Penjelajah'}</p>
                <p className="text-[10px] text-amber-700">Level {progress.unlockedLevel}</p>
              </div>

              <button
                onClick={onReset}
                title="Mulai Ulang Petualangan"
                className="p-1.5 text-slate-400 hover:text-red-600 transition-colors rounded-md hover:bg-slate-100 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
