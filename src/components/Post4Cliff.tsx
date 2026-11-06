import React, { useState } from 'react';
import {
  ArrowLeft,
  Sparkles,
  Check,
  Star,
  HeartHandshake,
  Flame,
  Ear,
  ShieldCheck,
  CheckCircle2,
  Megaphone,
  Sun,
} from 'lucide-react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { STRENGTH_BADGES, Post4Data, StrengthBadge } from '../types';
import { sound } from '../utils/audio';

interface Post4CliffProps {
  initialData: Post4Data;
  playerName: string;
  onComplete: (data: Post4Data) => void;
  onBackToMap: () => void;
}

export const Post4Cliff: React.FC<Post4CliffProps> = ({
  initialData,
  playerName,
  onComplete,
  onBackToMap,
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>(initialData.selectedStrengths || []);
  const [showAffirmation, setShowAffirmation] = useState<boolean>(initialData.completed);

  const toggleStrength = (badgeId: string) => {
    if (selectedIds.includes(badgeId)) {
      sound.playClick();
      setSelectedIds(selectedIds.filter((id) => id !== badgeId));
      setShowAffirmation(false);
    } else {
      if (selectedIds.length >= 3) {
        sound.playSoftWarning();
        return;
      }
      sound.playSelect();
      const updated = [...selectedIds, badgeId];
      setSelectedIds(updated);
      if (updated.length === 3) {
        setShowAffirmation(true);
        sound.playPuzzleSnap();
        try {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.7 },
            colors: ['#A855F7', '#EC4899', '#F59E0B'],
          });
        } catch {}
      }
    }
  };

  const getBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case 'HeartHandshake':
        return <HeartHandshake className="w-5 h-5" />;
      case 'Flame':
        return <Flame className="w-5 h-5" />;
      case 'Ear':
        return <Ear className="w-5 h-5" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5" />;
      case 'CheckCircle2':
        return <CheckCircle2 className="w-5 h-5" />;
      case 'Megaphone':
        return <Megaphone className="w-5 h-5" />;
      case 'Sun':
      default:
        return <Sun className="w-5 h-5" />;
    }
  };

  const selectedBadges: StrengthBadge[] = selectedIds
    .map((id) => STRENGTH_BADGES.find((b) => b.id === id)!)
    .filter(Boolean);

  const generateAffirmation = () => {
    if (selectedBadges.length < 3) return '';
    return `“Aku, ${playerName || 'Penjelajah'}, bangga memiliki karakter ${selectedBadges[0].name}, ${selectedBadges[1].name}, dan ${selectedBadges[2].name}. Aku berharga, mampu belajar, dan siap memancarkan kebaikan bagi duniaku!”`;
  };

  const handleClaim = () => {
    sound.playSuccess();
    onComplete({
      selectedStrengths: selectedIds,
      affirmation: generateAffirmation(),
      completed: true,
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* Top Breadcrumb Nav */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => {
            sound.playClick();
            onBackToMap();
          }}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-purple-800 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Peta Ekspedisi</span>
        </button>

        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-100 text-purple-900 border border-purple-300">
          Pos 4 dari 4: Positive Self-Talk
        </span>
      </div>

      {/* Hero Station Banner */}
      <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100/70 rounded-3xl border-2 border-purple-300 p-6 sm:p-7 shadow-xs mb-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-500 text-white flex items-center justify-center shrink-0 shadow-md">
            <Star className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900">
              Tebing Apresiasi
            </h1>
            <p className="text-sm text-slate-600 mt-1 leading-relaxed">
              Di tebing yang menjulang tinggi ini tertanam batu-batu kristal kekuatan. Pilihlah <strong>3 Batu Kekuatan</strong> yang paling menggambarkan dirimu dan rakitlah mantra afirmasi positif pribadimu!
            </p>
          </div>
        </div>
      </div>

      {/* Strength Badges Selection */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <h3 className="font-display font-bold text-slate-900 text-base">
              Pilih 3 Batu Kekuatan Dirimu:
            </h3>
            <p className="text-xs text-slate-500">Klik untuk memilih atau membatalkan pilihan</p>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-800 text-xs font-bold self-start sm:self-auto">
            <span>{selectedIds.length} dari 3 Terpilih</span>
          </div>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {STRENGTH_BADGES.map((badge) => {
            const isSelected = selectedIds.includes(badge.id);

            return (
              <button
                key={badge.id}
                type="button"
                onClick={() => toggleStrength(badge.id)}
                className={`relative text-left p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3.5 ${
                  isSelected
                    ? 'border-purple-500 bg-purple-50/70 shadow-sm ring-2 ring-purple-400/40'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-xs ${
                    isSelected
                      ? `bg-gradient-to-br ${badge.gemColor} text-white`
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {getBadgeIcon(badge.iconName)}
                </div>

                <div className="flex-1 pr-4">
                  <div className="flex items-center gap-2">
                    <p className="font-display font-bold text-slate-900 text-sm">{badge.name}</p>
                    <span className="text-[10px] text-slate-400 font-medium">{badge.category}</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{badge.description}</p>
                </div>

                {isSelected && (
                  <span className="absolute top-3 right-3 w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center text-[10px] font-bold shadow-xs">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Dynamic Positive Self-Talk Affirmation Card */}
        {showAffirmation && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-purple-100/90 via-pink-50 to-purple-50 rounded-2xl border-2 border-purple-300 p-6 shadow-sm space-y-4"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-700" />
              <h4 className="font-display font-bold text-purple-950 text-base">
                Mantra Afirmasi Karaktermu:
              </h4>
            </div>

            <blockquote className="text-base sm:text-lg font-bold text-purple-950 italic leading-relaxed bg-white/80 p-4 rounded-xl border border-purple-200">
              {generateAffirmation()}
            </blockquote>

            <p className="text-xs text-purple-800 leading-relaxed">
              Ucapkan kalimat ini dalam hatimu saat kamu menghadapi hari-hari yang melelahkan. Kekuatan ini
              bukan sekadar kata-kata, melainkan benih kebaikan yang sudah ada di dalam jiwamu!
            </p>
          </motion.div>
        )}

        {/* Claim Reward */}
        {showAffirmation && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-4 pt-2"
          >
            <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 rounded-2xl p-4 text-white text-center shadow-sm">
              <p className="text-xs font-bold uppercase tracking-widest text-purple-100">Reward Terakhir!</p>
              <h3 className="font-display font-black text-xl text-white mt-0.5">
                Keping Puzzle 4: Tebing Potensi
              </h3>
              <p className="text-xs text-purple-100 mt-1">
                Lengkap sudah keempat keping puzzle! Puncak Pulau & Peti Harta Karun kini siap dibuka!
              </p>
            </div>

            <button
              type="button"
              onClick={handleClaim}
              className="w-full py-3.5 px-6 rounded-xl font-display font-bold text-base text-white bg-purple-700 hover:bg-purple-800 shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Satukan Semua Keping & Menuju Puncak Pulau</span>
              <Sparkles className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};
