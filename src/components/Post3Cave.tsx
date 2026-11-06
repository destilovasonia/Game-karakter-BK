import React, { useState } from 'react';
import { ArrowLeft, Lightbulb, CheckCircle2, AlertCircle, Sparkles, ArrowUp, ArrowDown, ShieldAlert, Check } from 'lucide-react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Post3Data } from '../types';
import { sound } from '../utils/audio';

interface Post3CaveProps {
  initialData: Post3Data;
  onComplete: (data: Post3Data) => void;
  onBackToMap: () => void;
}

interface StepItem {
  id: string;
  correctStep: number;
  label: string;
  rationale: string;
}

const STEP_DEFINITIONS: StepItem[] = [
  {
    id: 'step-refuse',
    correctStep: 1,
    label: 'Menolak dengan tegas tanpa kekerasan: "Maaf teman-teman, aku tidak setuju dan tidak mau ikut-ikutan menyebarkan ini."',
    rationale: 'Langkah pertama adalah sikap asertif diri: berani berkata "tidak" pada kejahatan agar kamu tidak menjadi pelaku perundungan.',
  },
  {
    id: 'step-support',
    correctStep: 2,
    label: 'Menemani dan mendukung korban secara privat: "Mengirim pesan hangat menanyakan keadaannya agar korban tidak merasa kesepian."',
    rationale: 'Langkah kedua adalah kepedulian cepat: korban perundungan cyber sangat membutuhkan pengingat bahwa masih ada orang yang peduli.',
  },
  {
    id: 'step-report',
    correctStep: 3,
    label: 'Melapor ke Guru BK atau orang dewasa terpercaya dengan membawa bukti tangkapan layar untuk penanganan aman.',
    rationale: 'Langkah ketiga adalah perlindungan sistemik: masalah perundungan butuh intervensi pihak berwenang agar berhenti secara tuntas dan adil.',
  },
];

export const Post3Cave: React.FC<Post3CaveProps> = ({
  initialData,
  onComplete,
  onBackToMap,
}) => {
  // Start shuffled or with initialData
  const [items, setItems] = useState<StepItem[]>(() => {
    if (initialData.stepOrder && initialData.stepOrder.length === 3) {
      return initialData.stepOrder.map((id) => STEP_DEFINITIONS.find((s) => s.id === id)!);
    }
    // Default initial order (shuffled intentionally so user solves it)
    return [STEP_DEFINITIONS[1], STEP_DEFINITIONS[2], STEP_DEFINITIONS[0]];
  });

  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string } | null>(
    initialData.passed
      ? {
          isCorrect: true,
          message:
            'Urutan resolusimu sempurna! Kamu telah menunjukkan kualitas seorang Upstander sejati!',
        }
      : null
  );
  const [passed, setPassed] = useState<boolean>(initialData.passed);

  const moveUp = (index: number) => {
    if (index === 0) return;
    sound.playSelect();
    const next = [...items];
    const temp = next[index - 1];
    next[index - 1] = next[index];
    next[index] = temp;
    setItems(next);
    setFeedback(null);
  };

  const moveDown = (index: number) => {
    if (index === items.length - 1) return;
    sound.playSelect();
    const next = [...items];
    const temp = next[index + 1];
    next[index + 1] = next[index];
    next[index] = temp;
    setItems(next);
    setFeedback(null);
  };

  const handleVerify = () => {
    const isCorrect =
      items[0].id === 'step-refuse' &&
      items[1].id === 'step-support' &&
      items[2].id === 'step-report';

    if (isCorrect) {
      sound.playPuzzleSnap();
      setPassed(true);
      setFeedback({
        isCorrect: true,
        message:
          'Luar biasa! Urutan tindakanmu sangat bijak dan matang. Kamu berani bersikap asertif, memberikan empati kepada korban, dan meminta bantuan pihak sekolah secara bertanggung jawab.',
      });
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#10B981', '#059669', '#34D399'],
        });
      } catch {}
    } else {
      sound.playSoftWarning();
      setPassed(false);
      setFeedback({
        isCorrect: false,
        message:
          'Urutan masih belum tepat. Ingat prinsip resolusi konflik yang bijak: Mulailah dari sikap tegas pribadimu menolak ajakan negatif, lalu berikan perlindungan emosional kepada korban, dan selesaikan dengan melapor kepada Guru BK.',
      });
    }
  };

  const handleClaim = () => {
    sound.playSuccess();
    onComplete({
      stepOrder: items.map((i) => i.id),
      passed: true,
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
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-emerald-800 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Peta Ekspedisi</span>
        </button>

        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300">
          Pos 3 dari 4: Problem Solving
        </span>
      </div>

      {/* Hero Station Banner */}
      <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-emerald-100/70 rounded-3xl border-2 border-emerald-300 p-6 sm:p-7 shadow-xs mb-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-md">
            <Lightbulb className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900">
              Gua Pemecah Dilema
            </h1>
            <p className="text-sm text-slate-600 mt-1 leading-relaxed">
              Di dalam gua kristal ini, kegelapan hanya bisa diusir dengan kejernihan berpikir dan keteguhan
              moral. Susunlah langkah-langkah resolusi bijak untuk menjadi seorang <strong>Upstander</strong>!
            </p>
          </div>
        </div>
      </div>

      {/* Dilemma Challenge Box */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <ShieldAlert className="w-4 h-4 text-amber-700" />
            <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
              Tantangan Dilema Moral
            </span>
          </div>
          <p className="text-sm sm:text-base font-semibold text-slate-800 leading-relaxed">
            &ldquo;Kamu diajak oleh teman-teman tongkronganmu untuk ikut meramaikan dan menyebarkan foto aib serta
            mem-bully seseorang di grup obrolan media sosial. Mereka memaksamu dengan berkata: &apos;Kalau nggak ikut,
            berarti kamu bukan kawan sejati!&apos;&rdquo;
          </p>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-display font-bold text-slate-900 text-sm sm:text-base">
              Susun 3 Langkah Resolusi yang Bijak (Urutkan Langkah 1 ke Langkah 3):
            </h3>
            <span className="text-xs text-slate-500">Gunakan tombol panah</span>
          </div>

          <div className="space-y-3">
            {items.map((item, idx) => {
              const stepNumber = idx + 1;
              return (
                <div
                  key={item.id}
                  className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-4 flex items-center justify-between gap-3 transition-all hover:border-slate-300"
                >
                  <div className="flex items-start gap-3 flex-1">
                    <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-display font-black text-sm flex items-center justify-center shrink-0 mt-0.5">
                      {stepNumber}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-0.5">
                        Langkah {stepNumber}
                      </p>
                      <p className="text-sm font-medium text-slate-800 leading-relaxed">
                        {item.label}
                      </p>
                    </div>
                  </div>

                  {/* Reorder Buttons */}
                  <div className="flex flex-col gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => moveUp(idx)}
                      disabled={idx === 0}
                      aria-label="Pindahkan langkah ke atas"
                      className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                        idx === 0
                          ? 'border-slate-200 text-slate-300 cursor-not-allowed bg-slate-100'
                          : 'border-slate-200 text-slate-700 bg-white hover:bg-slate-100 hover:text-emerald-700'
                      }`}
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveDown(idx)}
                      disabled={idx === items.length - 1}
                      aria-label="Pindahkan langkah ke bawah"
                      className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                        idx === items.length - 1
                          ? 'border-slate-200 text-slate-300 cursor-not-allowed bg-slate-100'
                          : 'border-slate-200 text-slate-700 bg-white hover:bg-slate-100 hover:text-emerald-700'
                      }`}
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Feedback Alert */}
        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-2xl p-5 border ${
              feedback.isCorrect
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                : 'bg-amber-50 border-amber-300 text-amber-950'
            }`}
          >
            <div className="flex items-start gap-3">
              {feedback.isCorrect ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              )}
              <div>
                <p className="font-display font-bold text-sm mb-1">
                  {feedback.isCorrect ? 'Resolusi Tepat & Teruji!' : 'Perlu Penyesuaian Urutan (Tips BK)'}
                </p>
                <p className="text-xs sm:text-sm leading-relaxed">{feedback.message}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Action Button */}
        {!passed ? (
          <button
            type="button"
            onClick={handleVerify}
            className="w-full py-3.5 px-6 rounded-xl font-display font-bold text-base text-white bg-emerald-600 hover:bg-emerald-700 shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Uji Urutan Resolusi Bijak</span>
            <Check className="w-4 h-4 stroke-[3]" />
          </button>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-4 pt-2"
          >
            <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 rounded-2xl p-4 text-white text-center shadow-sm">
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-100">Reward Diperoleh!</p>
              <h3 className="font-display font-black text-xl text-white mt-0.5">
                Keping Puzzle 3: Gua Kebijakan
              </h3>
              <p className="text-xs text-emerald-100 mt-1">
                Kamu membuktikan keberanian moral sebagai pelindung, bukan sekadar penonton pasif!
              </p>
            </div>

            <button
              type="button"
              onClick={handleClaim}
              className="w-full py-3.5 px-6 rounded-xl font-display font-bold text-base text-white bg-emerald-700 hover:bg-emerald-800 shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Simpan Keping & Lanjut ke Peta</span>
              <Sparkles className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};
