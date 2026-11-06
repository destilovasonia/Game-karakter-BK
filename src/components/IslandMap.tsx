import React from 'react';
import { Lock, Check, Play, Sparkles, MapPin, ChevronRight, Award } from 'lucide-react';
import { motion } from 'motion/react';
import { UserProgress } from '../types';
import { AvatarDisplay } from './AvatarDisplay';
import { PuzzleTracker } from './PuzzleTracker';
import { sound } from '../utils/audio';

interface IslandMapProps {
  progress: UserProgress;
  onSelectStation: (station: 'post1' | 'post2' | 'post3' | 'post4' | 'treasure' | 'certificate') => void;
}

const STATIONS = [
  {
    id: 'post1',
    number: 1,
    title: 'Lembah Cermin Kejujuran',
    skill: 'Self-Awareness & Kejujuran Hati',
    description: 'Berdamai dengan kelebihan dan ketakutan yang kamu miliki tanpa rasa malu.',
    mapCoord: { top: '35%', left: '32%' },
    badgeColor: 'bg-amber-500',
    borderColor: 'border-amber-400',
    lightBg: 'bg-amber-50',
    accentText: 'text-amber-800',
  },
  {
    id: 'post2',
    number: 2,
    title: 'Jembatan Kepercayaan',
    skill: 'Empati & Kepedulian Sesama',
    description: 'Pahami kondisi emosi kawanmu yang sedang terpuruk dan berikan respon terbaik.',
    mapCoord: { top: '56%', left: '52%' },
    badgeColor: 'bg-sky-500',
    borderColor: 'border-sky-400',
    lightBg: 'bg-sky-50',
    accentText: 'text-sky-800',
  },
  {
    id: 'post3',
    number: 3,
    title: 'Gua Pemecah Dilema',
    skill: 'Problem Solving & Sikap Bijak',
    description: 'Susun langkah resolusi berani saat diajak ikut mem-bully orang di media sosial.',
    mapCoord: { top: '34%', left: '64%' },
    badgeColor: 'bg-emerald-500',
    borderColor: 'border-emerald-400',
    lightBg: 'bg-emerald-50',
    accentText: 'text-emerald-800',
  },
  {
    id: 'post4',
    number: 4,
    title: 'Tebing Apresiasi',
    skill: 'Positive Self-Talk & Potensi',
    description: 'Pilih 3 Batu Kekuatan yang mencerminkan nilaimu dan ciptakan mantra afirmasi.',
    mapCoord: { top: '60%', left: '76%' },
    badgeColor: 'bg-purple-500',
    borderColor: 'border-purple-400',
    lightBg: 'bg-purple-50',
    accentText: 'text-purple-800',
  },
  {
    id: 'treasure',
    number: 5,
    title: 'Puncak Pulau: Peti Harta Karun',
    skill: 'Rahasia Terbesar Karakter Diri',
    description: 'Satukan 4 keping puzzle dan temukan keajaiban cermin harta karun legendaris!',
    mapCoord: { top: '22%', left: '86%' },
    badgeColor: 'bg-yellow-500',
    borderColor: 'border-yellow-400',
    lightBg: 'bg-yellow-50',
    accentText: 'text-yellow-800',
  },
];

export const IslandMap: React.FC<IslandMapProps> = ({ progress, onSelectStation }) => {
  const mapImagePath = '/src/assets/images/island_adventure_map_1793954679883.jpg';

  const handleStationClick = (stationId: string, stationNumber: number) => {
    const isUnlocked = stationNumber <= progress.unlockedLevel;
    if (!isUnlocked) {
      sound.playSoftWarning();
      return;
    }
    sound.playClick();
    onSelectStation(stationId as 'post1' | 'post2' | 'post3' | 'post4' | 'treasure');
  };

  const allCompleted = progress.puzzlePieces.every(Boolean);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      {/* Top Puzzle Tracker */}
      <PuzzleTracker
        puzzlePieces={progress.puzzlePieces}
        unlockedLevel={progress.unlockedLevel}
      />

      {/* Explorer Welcome Strip */}
      <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-amber-500/10 border border-amber-200/80 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <AvatarDisplay avatarId={progress.avatarId} size="sm" />
          <div>
            <h2 className="font-display font-bold text-slate-900 text-sm sm:text-base">
              Posisi Terakhir: {progress.playerName}
            </h2>
            <p className="text-xs text-slate-600">
              {progress.unlockedLevel > 4
                ? 'Semua pos selesai! Puncak Peti Harta Karun telah terbuka!'
                : `Lanjutkan ke Pos ${progress.unlockedLevel}: ${
                    STATIONS[progress.unlockedLevel - 1]?.title
                  }`}
            </p>
          </div>
        </div>

        {allCompleted && (
          <button
            onClick={() => {
              sound.playClick();
              onSelectStation('certificate');
            }}
            className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-display font-bold text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-all cursor-pointer whitespace-nowrap"
          >
            <Award className="w-4 h-4" />
            <span>Lihat Piagam Penjelajah</span>
          </button>
        )}
      </div>

      {/* The Visual Island Map Canvas */}
      <div className="relative rounded-3xl overflow-hidden border-4 border-amber-300 shadow-md bg-sky-200">
        <div className="relative w-full aspect-[16/9] min-h-[320px] sm:min-h-[460px]">
          <img
            src={mapImagePath}
            alt="Peta Petualangan Pulau Karakter"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />

          {/* Map Title Plaque */}
          <div className="absolute top-3 left-3 sm:top-5 sm:left-5 bg-white/95 backdrop-blur-md px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl border border-amber-300 shadow-sm pointer-events-none">
            <p className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">Peta Ekspedisi</p>
            <h3 className="font-display font-extrabold text-xs sm:text-base text-slate-900">Pulau Karakter</h3>
          </div>

          {/* Interactive Map Pins on Image */}
          {STATIONS.map((st) => {
            const isCompleted =
              st.number < progress.unlockedLevel || (st.number === 5 && allCompleted && progress.completedDate !== null);
            const isCurrent = st.number === progress.unlockedLevel;
            const isLocked = st.number > progress.unlockedLevel;

            return (
              <div
                key={st.id}
                style={{ top: st.mapCoord.top, left: st.mapCoord.left }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group"
              >
                <button
                  type="button"
                  onClick={() => handleStationClick(st.id, st.number)}
                  disabled={isLocked}
                  aria-label={`${st.title} ${isLocked ? 'Terkunci' : isCompleted ? 'Selesai' : 'Aktif'}`}
                  className={`relative p-1 rounded-full transition-transform duration-300 cursor-pointer ${
                    isLocked ? 'cursor-not-allowed opacity-80' : 'hover:scale-125'
                  }`}
                >
                  {/* Avatar miniature marker hovering on current station */}
                  {isCurrent && (
                    <motion.div
                      animate={{ y: [-4, 4, -4] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute -top-11 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center pointer-events-none"
                    >
                      <div className="bg-amber-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-md whitespace-nowrap mb-0.5">
                        Pos Kamu!
                      </div>
                      <div className="w-8 h-8 rounded-full border-2 border-white shadow-md overflow-hidden bg-amber-100 flex items-center justify-center">
                        <AvatarDisplay avatarId={progress.avatarId} size="sm" className="w-full h-full" />
                      </div>
                    </motion.div>
                  )}

                  {/* Pin Circle */}
                  <div
                    className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-white border-2 border-white shadow-lg transition-all ${
                      isCompleted
                        ? 'bg-emerald-600'
                        : isCurrent
                        ? `${st.badgeColor} ring-4 ring-amber-300/80 animate-pulse`
                        : 'bg-slate-500'
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-5 h-5 stroke-[3]" />
                    ) : isCurrent ? (
                      <Play className="w-4 h-4 fill-white ml-0.5" />
                    ) : (
                      <Lock className="w-4 h-4 text-slate-200" />
                    )}
                  </div>
                </button>

                {/* Hover Tooltip / Station Label */}
                <div className="hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-slate-900/95 text-white text-xs rounded-xl p-2.5 shadow-xl pointer-events-none z-30 backdrop-blur-xs text-center">
                  <p className="font-bold text-amber-300">{st.title}</p>
                  <p className="text-[10px] text-slate-300 mt-0.5">{st.skill}</p>
                  <p className="text-[10px] mt-1 font-semibold text-emerald-400">
                    {isCompleted ? '✓ Telah Dituntaskan' : isCurrent ? '▶ Klik untuk Masuk' : '🔒 Belum Terbuka'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Station List Cards for Clear Navigation */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-bold text-slate-900 text-base sm:text-lg">
            Daftar Pos Ekspedisi Karakter
          </h3>
          <span className="text-xs text-slate-500">Selesaikan pos secara berurutan</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {STATIONS.map((st) => {
            const isCompleted =
              st.number < progress.unlockedLevel ||
              (st.number === 5 && allCompleted && progress.completedDate !== null);
            const isCurrent = st.number === progress.unlockedLevel;
            const isLocked = st.number > progress.unlockedLevel;

            return (
              <div
                key={st.id}
                className={`relative rounded-2xl border p-4 flex flex-col justify-between transition-all duration-200 ${
                  isCurrent
                    ? 'bg-amber-50/90 border-amber-400 shadow-sm ring-1 ring-amber-300'
                    : isCompleted
                    ? 'bg-white border-slate-200 hover:border-slate-300'
                    : 'bg-slate-50/70 border-slate-200/80 opacity-70'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-500">Pos {st.number}</span>
                    {isCompleted ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        <Check className="w-3 h-3 stroke-[3]" /> Selesai
                      </span>
                    ) : isCurrent ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300 animate-pulse">
                        <Play className="w-2.5 h-2.5 fill-current" /> Pos Aktif
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                        <Lock className="w-3 h-3" /> Terkunci
                      </span>
                    )}
                  </div>

                  <h4 className="font-display font-bold text-slate-900 text-sm sm:text-base leading-snug">
                    {st.title}
                  </h4>
                  <p className="text-xs font-semibold text-amber-700 mt-0.5 mb-1.5">{st.skill}</p>
                  <p className="text-xs text-slate-600 leading-relaxed">{st.description}</p>
                </div>

                <div className="pt-4 mt-2 border-t border-slate-100/80">
                  <button
                    type="button"
                    onClick={() => handleStationClick(st.id, st.number)}
                    disabled={isLocked}
                    className={`w-full py-2.5 px-3 rounded-xl font-display font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      isCurrent
                        ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-xs'
                        : isCompleted
                        ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    {isCompleted ? (
                      <>
                        <span>Buka Ulang Pos {st.number}</span>
                        <ChevronRight className="w-4 h-4" />
                      </>
                    ) : isCurrent ? (
                      <>
                        <span>Masuk Tantangan</span>
                        <Play className="w-3.5 h-3.5 fill-current" />
                      </>
                    ) : (
                      <>
                        <Lock className="w-3.5 h-3.5" />
                        <span>Selesaikan Pos Sebelumnya</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
