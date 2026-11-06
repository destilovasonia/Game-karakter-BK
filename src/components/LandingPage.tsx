import React, { useState } from 'react';
import { Compass, Sparkles, ArrowRight, Shield, Heart, Lightbulb, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { AVATARS } from '../types';
import { AvatarDisplay } from './AvatarDisplay';
import { sound } from '../utils/audio';

interface LandingPageProps {
  onStart: (name: string, avatarId: string) => void;
  initialName?: string;
  initialAvatar?: string;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStart,
  initialName = '',
  initialAvatar = 'captain',
}) => {
  const [name, setName] = useState(initialName);
  const [selectedAvatar, setSelectedAvatar] = useState(initialAvatar);
  const [errorMsg, setErrorMsg] = useState('');

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      sound.playSoftWarning();
      setErrorMsg('Tuliskan nama panggilan penjelajahmu terlebih dahulu ya!');
      return;
    }
    sound.playSuccess();
    onStart(name.trim(), selectedAvatar);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-between py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto w-full">
        {/* Hero Header */}
        <div className="text-center mb-8 sm:mb-10">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs sm:text-sm font-semibold mb-4 shadow-xs"
          >
            <Compass className="w-4 h-4 text-amber-700 animate-spin [animation-duration:12s]" />
            <span>Ekspedisi Bimbingan & Konseling Interaktif</span>
          </motion.div>

          <motion.h1
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight max-w-3xl mx-auto"
            style={{ textWrap: 'balance' }}
          >
            Ekspedisi Harta Karun: <br />
            <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent">
              Rahasia Pulau Karakter
            </span>
          </motion.h1>

          <motion.p
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-3 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-medium"
            style={{ textWrap: 'balance' }}
          >
            Jelajahi 4 pos tantangan pulau misterius untuk mengumpulkan keping puzzle karakter dan membuka peti emas legendaris!
          </motion.p>
        </div>

        {/* Story Intro Card (BK Narrative) */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="relative bg-gradient-to-br from-amber-100/90 via-orange-50 to-amber-50 rounded-3xl border-2 border-amber-300 p-6 sm:p-8 shadow-sm mb-8 overflow-hidden"
        >
          <div className="absolute top-0 right-0 -mt-6 -mr-6 w-32 h-32 bg-amber-300/30 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-md">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-display font-bold text-lg sm:text-xl text-slate-900 mb-1">
                Pesan Rahasia dari Guru BK & Penjaga Pulau
              </h2>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                &ldquo;Halo Penjelajah Muda! Konon di puncak tertinggi Pulau Karakter, tersimpan sebuah Peti Harta Karun yang tak ternilai harganya. Namun gerbangnya terkunci rapat oleh 4 gembok rahasia. Untuk membukanya, kamu tidak membutuhkan pedang atau peta kuno, melainkan <strong>kejujuran mengenali diri</strong>, <strong>empati pada sesama</strong>, dan <strong>keberanian bersikap bijak</strong>. Apakah kamu siap membuktikan kehebatanmu?&rdquo;
              </p>
            </div>
          </div>
        </motion.div>

        {/* Character Creation Form */}
        <motion.form
          onSubmit={handleStart}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm"
        >
          {/* Step 1: Name Input */}
          <div className="mb-6">
            <label htmlFor="playerName" className="block font-display font-bold text-slate-800 text-base mb-2">
              1. Siapa Nama Panggilanmu, Penjelajah? <span className="text-amber-600">*</span>
            </label>
            <div className="relative">
              <input
                id="playerName"
                type="text"
                maxLength={25}
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errorMsg) setErrorMsg('');
                }}
                placeholder="Contoh: Radit, Alya, Bima..."
                className="w-full px-4 py-3.5 rounded-xl border-2 border-slate-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-100 outline-none transition-all text-slate-900 placeholder:text-slate-400 font-medium text-base"
              />
              <span className="absolute right-3.5 top-3.5 text-xs text-slate-400">
                {name.length}/25
              </span>
            </div>
            {errorMsg && (
              <p className="mt-2 text-sm text-red-600 font-medium flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                {errorMsg}
              </p>
            )}
          </div>

          {/* Step 2: Avatar Selection */}
          <div className="mb-8">
            <label className="block font-display font-bold text-slate-800 text-base mb-2">
              2. Pilih Avatar Karakter Ekspedisimu:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {AVATARS.map((av) => {
                const isSelected = selectedAvatar === av.id;
                return (
                  <button
                    key={av.id}
                    type="button"
                    onClick={() => {
                      sound.playSelect();
                      setSelectedAvatar(av.id);
                    }}
                    className={`relative p-4 rounded-2xl border-2 text-left transition-all duration-200 cursor-pointer flex flex-col items-center sm:items-start ${
                      isSelected
                        ? 'border-amber-500 bg-amber-50/60 ring-2 ring-amber-400/40 shadow-sm'
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60'
                    }`}
                  >
                    {isSelected && (
                      <span className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px] font-bold shadow-xs">
                        ✓
                      </span>
                    )}
                    <AvatarDisplay avatarId={av.id} size="md" className="mb-3" />
                    <p className="font-display font-bold text-slate-900 text-sm">{av.name}</p>
                    <p className="text-[11px] font-semibold text-amber-700 mb-1">{av.title}</p>
                    <p className="text-[11px] text-slate-500 line-clamp-2">{av.description}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
            <div className="text-xs text-slate-500 flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Ruang aman refleksi diri tanpa penilaian menghakimi</span>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-display font-bold text-base text-white bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 shadow-md hover:shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 cursor-pointer glow-gold"
            >
              <span>Mulai Petualangan</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </motion.form>

        {/* 4 Island Stations Teaser */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-white/80 rounded-2xl border border-slate-200/80 p-3.5 text-center">
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto mb-2">
              <Sparkles className="w-4 h-4" />
            </div>
            <p className="text-xs font-bold text-slate-800">Pos 1: Cermin Kejujuran</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Kenali kelebihan & insecurity</p>
          </div>

          <div className="bg-white/80 rounded-2xl border border-slate-200/80 p-3.5 text-center">
            <div className="w-8 h-8 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center mx-auto mb-2">
              <Heart className="w-4 h-4" />
            </div>
            <p className="text-xs font-bold text-slate-800">Pos 2: Jembatan Empati</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Komunikasi & peduli kawan</p>
          </div>

          <div className="bg-white/80 rounded-2xl border border-slate-200/80 p-3.5 text-center">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-2">
              <Lightbulb className="w-4 h-4" />
            </div>
            <p className="text-xs font-bold text-slate-800">Pos 3: Gua Dilema</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Berani tolak cyberbullying</p>
          </div>

          <div className="bg-white/80 rounded-2xl border border-slate-200/80 p-3.5 text-center">
            <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center mx-auto mb-2">
              <Star className="w-4 h-4" />
            </div>
            <p className="text-xs font-bold text-slate-800">Pos 4: Tebing Apresiasi</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Temukan 3 batu kekuatan diri</p>
          </div>
        </div>
      </div>
    </div>
  );
};
