import React, { useState } from 'react';
import { ArrowLeft, Heart, CheckCircle2, AlertCircle, Sparkles, MessageCircle, Info } from 'lucide-react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Post2Data } from '../types';
import { sound } from '../utils/audio';

interface Post2BridgeProps {
  initialData: Post2Data;
  onComplete: (data: Post2Data) => void;
  onBackToMap: () => void;
}

interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
  feedback: string;
}

const OPTIONS: Option[] = [
  {
    id: 'A',
    text: 'Mengabaikannya dan pura-pura tidak melihat agar dia punya ruang privasi penuh.',
    isCorrect: false,
    feedback:
      'Memberikan ruang pribadi memang baik, tetapi membiarkan teman yang sedang murung sendirian tanpa sapaan ramah bisa membuatnya merasa semakin terasing dan tidak dipedulikan. Coba pikirkan respon yang menunjukkan kepedulian lembut tanpa memaksa!',
  },
  {
    id: 'B',
    text: 'Menyapanya dengan tenang, duduk di dekatnya, dan menawarkan telinga jika ia butuh teman bicara tanpa memaksanya langsung bercerita.',
    isCorrect: true,
    feedback:
      'Luar biasa! Inilah intisari empati sejati. Terkadang seseorang tidak membutuhkan solusi instan atau nasihat panjang, melainkan kehadiran tulus yang membuatnya merasa aman dan tidak sendirian di dunia ini.',
  },
  {
    id: 'C',
    text: 'Mengejek atau memaksanya tersenyum di depan umum agar suasana canggung mencair.',
    isCorrect: false,
    feedback:
      'Maksud hati mungkin ingin menghibur, tetapi bercanda saat seseorang sedang rapuh bisa melukai perasaannya dan membuatnya merasa masalahnya disepelekan. Empati dimulai dari menghormati suasana hati teman kita.',
  },
];

export const Post2Bridge: React.FC<Post2BridgeProps> = ({
  initialData,
  onComplete,
  onBackToMap,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(initialData.selectedChoice);
  const [feedbackState, setFeedbackState] = useState<Option | null>(
    initialData.selectedChoice
      ? OPTIONS.find((o) => o.id === initialData.selectedChoice) || null
      : null
  );
  const [passed, setPassed] = useState<boolean>(initialData.passed);

  const handleSelect = (option: Option) => {
    setSelectedOption(option.id);
    setFeedbackState(option);

    if (option.isCorrect) {
      sound.playPuzzleSnap();
      setPassed(true);
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#0284C7', '#38BDF8', '#F59E0B'],
        });
      } catch {}
    } else {
      sound.playSoftWarning();
      setPassed(false);
    }
  };

  const handleClaim = () => {
    sound.playSuccess();
    onComplete({
      selectedChoice: selectedOption,
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
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-sky-800 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Peta Ekspedisi</span>
        </button>

        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-sky-100 text-sky-900 border border-sky-300">
          Pos 2 dari 4: Empati & Komunikasi
        </span>
      </div>

      {/* Hero Station Banner */}
      <div className="bg-gradient-to-br from-sky-50 via-cyan-50 to-sky-100/70 rounded-3xl border-2 border-sky-300 p-6 sm:p-7 shadow-xs mb-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-sky-500 text-white flex items-center justify-center shrink-0 shadow-md">
            <Heart className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900">
              Jembatan Kepercayaan
            </h1>
            <p className="text-sm text-slate-600 mt-1 leading-relaxed">
              Jembatan gantung ini terbuat dari kayu persahabatan yang hanya bisa dilintasi oleh penjelajah
              yang memiliki kepekaan rasa (empati). Pilihlah respon terbaik untuk menyeberangi jembatan!
            </p>
          </div>
        </div>
      </div>

      {/* Scenario Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <MessageCircle className="w-4 h-4 text-sky-600" />
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Skenario Dilema di Sekolah
            </span>
          </div>
          <p className="text-sm sm:text-base font-semibold text-slate-800 leading-relaxed">
            &ldquo;Saat jam istirahat, kamu melihat salah satu teman sekelasmu duduk sendirian di sudut lorong
            dengan tatapan murung. Biasanya ia ceria dan suka mengobrol, tapi hari ini ia menarik diri dan tidak
            ikut makan siang bersama teman-teman yang lain. Apa respon terbaikmu?&rdquo;
          </p>
        </div>

        {/* Options List */}
        <div className="space-y-3">
          <p className="font-display font-bold text-slate-900 text-sm">
            Pilihlah salah satu opsi respon di bawah ini:
          </p>

          {OPTIONS.map((opt) => {
            const isSelected = selectedOption === opt.id;
            let borderStyle = 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50/50';

            if (isSelected) {
              if (opt.isCorrect) {
                borderStyle = 'border-emerald-500 bg-emerald-50/70 ring-2 ring-emerald-400/40';
              } else {
                borderStyle = 'border-rose-400 bg-rose-50/70 ring-2 ring-rose-400/40';
              }
            }

            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleSelect(opt)}
                className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3.5 ${borderStyle}`}
              >
                <div
                  className={`w-8 h-8 rounded-xl font-display font-black text-sm flex items-center justify-center shrink-0 ${
                    isSelected
                      ? opt.isCorrect
                        ? 'bg-emerald-600 text-white'
                        : 'bg-rose-600 text-white'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {opt.id}
                </div>
                <div className="flex-1">
                  <p className="text-sm sm:text-base text-slate-800 font-medium leading-relaxed">
                    {opt.text}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Feedback Section */}
        {feedbackState && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-2xl p-5 border ${
              feedbackState.isCorrect
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                : 'bg-amber-50 border-amber-300 text-amber-950'
            }`}
          >
            <div className="flex items-start gap-3">
              {feedbackState.isCorrect ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              )}
              <div>
                <p className="font-display font-bold text-sm mb-1">
                  {feedbackState.isCorrect
                    ? 'Pilihan Sangat Tepat! (Empati Tinggi)'
                    : 'Mari Refleksikan Kembali (Catatan BK)'}
                </p>
                <p className="text-xs sm:text-sm leading-relaxed">{feedbackState.feedback}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Success Action Reward Box */}
        {passed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-4 pt-2"
          >
            <div className="bg-gradient-to-r from-sky-500 via-blue-500 to-sky-600 rounded-2xl p-4 text-white text-center shadow-sm">
              <p className="text-xs font-bold uppercase tracking-widest text-sky-100">Reward Diperoleh!</p>
              <h3 className="font-display font-black text-xl text-white mt-0.5">
                Keping Puzzle 2: Jembatan Hati
              </h3>
              <p className="text-xs text-sky-100 mt-1">
                Jembatan Kepercayaan berhasil kamu seberangi dengan empati dan hati yang hangat!
              </p>
            </div>

            <button
              type="button"
              onClick={handleClaim}
              className="w-full py-3.5 px-6 rounded-xl font-display font-bold text-base text-white bg-emerald-600 hover:bg-emerald-700 shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
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
