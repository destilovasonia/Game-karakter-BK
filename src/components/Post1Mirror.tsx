import React, { useState } from 'react';
import { Sparkles, ArrowLeft, Heart, Shield, Check, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Post1Data } from '../types';
import { sound } from '../utils/audio';

interface Post1MirrorProps {
  initialData: Post1Data;
  onComplete: (data: Post1Data) => void;
  onBackToMap: () => void;
}

const STRENGTH_SUGGESTIONS = [
  'Pendengar yang setia saat teman butuh bercerita',
  'Kreatif dan suka mencoba hal baru yang menyenangkan',
  'Pekerja keras dan tidak mudah putus asa',
  'Punya rasa humor yang menghangatkan suasana',
  'Suka membantu tanpa pamrih',
  'Jujur dan dapat dipercaya memegang rahasia',
];

const CHALLENGE_SUGGESTIONS = [
  'Sering merasa cemas atau takut bicara di depan umum',
  'Kadang suka membandingkan diri dengan pencapaian orang lain',
  'Sulit berkata "tidak" karena takut mengecewakan orang lain',
  'Suka menunda-nunda pekerjaan sampai mepet waktu',
  'Sering overthinking saat membuat keputusan kecil',
  'Takut berbuat salah dan dihakimi orang di sekitar',
];

export const Post1Mirror: React.FC<Post1MirrorProps> = ({
  initialData,
  onComplete,
  onBackToMap,
}) => {
  const [strength, setStrength] = useState(initialData.strength || '');
  const [challenge, setChallenge] = useState(initialData.challenge || '');
  const [showValidationCard, setShowValidationCard] = useState(initialData.reflectionCompleted);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!strength.trim()) {
      sound.playSoftWarning();
      setErrorMsg('Tolong pilih atau tuliskan satu kelebihan terbesar yang kamu syukuri ya!');
      return;
    }
    if (!challenge.trim()) {
      sound.playSoftWarning();
      setErrorMsg('Tolong pilih atau tuliskan satu tantangan atau insecurity yang sedang kamu hadapi ya!');
      return;
    }

    setErrorMsg('');
    sound.playPuzzleSnap();
    setShowValidationCard(true);

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#F59E0B', '#10B981', '#3B82F6'],
      });
    } catch {}
  };

  const handleClaimPiece = () => {
    sound.playSuccess();
    onComplete({
      strength: strength.trim(),
      challenge: challenge.trim(),
      reflectionCompleted: true,
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
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-amber-800 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Peta Ekspedisi</span>
        </button>

        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
          Pos 1 dari 4: Self-Awareness
        </span>
      </div>

      {/* Hero Station Banner */}
      <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100/70 rounded-3xl border-2 border-amber-300 p-6 sm:p-7 shadow-xs mb-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-md">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900">
              Lembah Cermin Kejujuran
            </h1>
            <p className="text-sm text-slate-600 mt-1 leading-relaxed">
              Air dan kristal di lembah ini memiliki sihir kuno: mereka hanya memantulkan kebenaran hati.
              Keberanian sejati seorang penjelajah berawal dari kerelaan mengenali kelebihan tanpa sombong,
              dan mengakui kelemahan tanpa membenci diri sendiri.
            </p>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!showValidationCard ? (
          <motion.form
            key="reflection-form"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-7"
          >
            {/* Field 1: Strength */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Star className="w-3.5 h-3.5 fill-current" />
                </div>
                <label className="font-display font-bold text-slate-900 text-base">
                  1. Satu Kelebihan Terbesarmu yang Kamu Syukuri <span className="text-amber-600">*</span>
                </label>
              </div>
              <p className="text-xs text-slate-500 mb-3">
                Klik salah satu inspirasi di bawah ini atau ketikkan sendiri dengan bahasamu:
              </p>

              {/* Suggestions chips */}
              <div className="flex flex-wrap gap-2 mb-3">
                {STRENGTH_SUGGESTIONS.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      sound.playSelect();
                      setStrength(item);
                      if (errorMsg) setErrorMsg('');
                    }}
                    className={`text-xs px-3 py-1.5 rounded-lg border text-left transition-all cursor-pointer ${
                      strength === item
                        ? 'bg-emerald-50 border-emerald-400 text-emerald-900 font-semibold shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    + {item}
                  </button>
                ))}
              </div>

              <textarea
                rows={2}
                value={strength}
                onChange={(e) => {
                  setStrength(e.target.value);
                  if (errorMsg) setErrorMsg('');
                }}
                placeholder="Tuliskan kelebihanmu di sini..."
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-100 outline-none text-slate-800 text-sm font-medium transition-all"
              />
            </div>

            {/* Field 2: Challenge / Insecurity */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center">
                  <Heart className="w-3.5 h-3.5 fill-current" />
                </div>
                <label className="font-display font-bold text-slate-900 text-base">
                  2. Satu Tantangan / Insecurity yang Sedang Kamu Hadapi <span className="text-amber-600">*</span>
                </label>
              </div>
              <p className="text-xs text-slate-500 mb-3">
                Jangan takut mengakuinya. Lembah ini aman dan tidak ada orang yang sempurna:
              </p>

              {/* Suggestions chips */}
              <div className="flex flex-wrap gap-2 mb-3">
                {CHALLENGE_SUGGESTIONS.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      sound.playSelect();
                      setChallenge(item);
                      if (errorMsg) setErrorMsg('');
                    }}
                    className={`text-xs px-3 py-1.5 rounded-lg border text-left transition-all cursor-pointer ${
                      challenge === item
                        ? 'bg-rose-50 border-rose-400 text-rose-900 font-semibold shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    + {item}
                  </button>
                ))}
              </div>

              <textarea
                rows={2}
                value={challenge}
                onChange={(e) => {
                  setChallenge(e.target.value);
                  if (errorMsg) setErrorMsg('');
                }}
                placeholder="Tuliskan tantangan atau hal yang membuatmu ragu di sini..."
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-100 outline-none text-slate-800 text-sm font-medium transition-all"
              />
            </div>

            {errorMsg && (
              <p className="text-xs text-red-600 font-medium flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                {errorMsg}
              </p>
            )}

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl font-display font-bold text-base text-white bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Hadapkan Diri ke Cermin Kejujuran</span>
                <Sparkles className="w-4 h-4" />
              </button>
            </div>
          </motion.form>
        ) : (
          <motion.div
            key="validation-result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl border-2 border-emerald-300 p-6 sm:p-8 shadow-md space-y-6"
          >
            {/* Appreciation Plaque */}
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3 shadow-inner">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>
              <h2 className="font-display font-black text-2xl text-slate-900 mb-1">
                Langkah Seorang Pemberani!
              </h2>
              <p className="text-xs text-emerald-700 font-bold uppercase tracking-wider">
                Refleksi Karakter Berhasil Diselesaikan
              </p>
            </div>

            {/* BK Warm Empathetic Feedback */}
            <div className="bg-amber-50 rounded-2xl border border-amber-200 p-5 text-slate-700 text-sm leading-relaxed">
              <p className="font-bold text-amber-900 mb-1 flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-amber-700" />
                Apresiasi dari Guru BK:
              </p>
              &ldquo;Mengakui kelemahan dan mensyukuri kelebihan adalah langkah pertama seorang pemberani. Mengetahui kelemahan bukan berarti kamu rapuh, melainkan bukti bahwa kamu berani jujur pada diri sendiri dan siap bertumbuh menjadi pribadi yang lebih tangguh.&rdquo;
            </div>

            {/* Reflection Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4">
                <p className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">
                  Kelebihan yang Kamu Syukuri
                </p>
                <p className="text-sm font-semibold text-slate-800 italic">&ldquo;{strength}&rdquo;</p>
              </div>

              <div className="bg-rose-50/70 border border-rose-200 rounded-xl p-4">
                <p className="text-xs font-bold text-rose-800 uppercase tracking-wider mb-1">
                  Tantangan yang Dihadapi
                </p>
                <p className="text-sm font-semibold text-slate-800 italic">&ldquo;{challenge}&rdquo;</p>
              </div>
            </div>

            {/* Reward Box */}
            <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 rounded-2xl p-4 text-white text-center shadow-sm">
              <p className="text-xs font-bold uppercase tracking-widest text-amber-100">Reward Diperoleh!</p>
              <h3 className="font-display font-black text-xl text-white mt-0.5">
                Keping Puzzle 1: Cermin Diri
              </h3>
              <p className="text-xs text-amber-100 mt-1">
                Kunci pertama untuk membuka gembok Peti Harta Karun telah kamu kantongi!
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowValidationCard(false)}
                className="py-3 px-4 rounded-xl font-display font-semibold text-sm text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer text-center"
              >
                Ubah Jawaban Refleksi
              </button>

              <button
                type="button"
                onClick={handleClaimPiece}
                className="flex-1 py-3 px-6 rounded-xl font-display font-bold text-base text-white bg-emerald-600 hover:bg-emerald-700 shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Simpan Keping & Lanjut ke Peta</span>
                <Sparkles className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
