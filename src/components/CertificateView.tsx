import React, { useRef, useState } from 'react';
import {
  Download,
  Printer,
  Copy,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Compass,
  Check,
  Star,
  MapPin,
} from 'lucide-react';
import html2canvas from 'html2canvas';
import { UserProgress, STRENGTH_BADGES, AVATARS } from '../types';
import { AvatarDisplay } from './AvatarDisplay';
import { sound } from '../utils/audio';

interface CertificateViewProps {
  progress: UserProgress;
  onReset: () => void;
  onBackToMap: () => void;
}

export const CertificateView: React.FC<CertificateViewProps> = ({
  progress,
  onReset,
  onBackToMap,
}) => {
  const certificateRef = useRef<HTMLDivElement | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [copied, setCopied] = useState(false);

  const selectedBadges = progress.post4.selectedStrengths
    .map((id) => STRENGTH_BADGES.find((b) => b.id === id)!)
    .filter(Boolean);

  const currentAvatar = AVATARS.find((a) => a.id === progress.avatarId) || AVATARS[0];

  const currentDate =
    progress.completedDate ||
    new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

  const handleDownloadImage = async () => {
    if (!certificateRef.current || isDownloading) return;
    try {
      setIsDownloading(true);
      sound.playClick();

      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#FFFFFF',
      });

      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = `Sertifikat_Pulau_Karakter_${progress.playerName.replace(/\s+/g, '_')}.png`;
      link.click();
      sound.playSuccess();
    } catch (err) {
      console.error('Failed to generate certificate image', err);
      sound.playSoftWarning();
    } finally {
      setIsDownloading(false);
    }
  };

  const handlePrint = () => {
    sound.playClick();
    window.print();
  };

  const handleCopySummary = () => {
    sound.playClick();
    const strengthsText = selectedBadges.map((b) => b.name).join(', ');
    const text = `📜 *PIAGAM PENJELAJAH PULAU KARAKTER*\n` +
      `Nama Penjelajah: ${progress.playerName}\n` +
      `Gelar: Penjelajah Teladan Karakter Diri\n` +
      `3 Batu Kekuatan: ${strengthsText}\n` +
      `Kelebihan yang Disyukuri: ${progress.post1.strength}\n` +
      `Tantangan yang Dihadapi: ${progress.post1.challenge}\n` +
      `Mantra Afirmasi: "${progress.post4.affirmation}"\n` +
      `"Harta karun terbesar di dunia bukanlah emas atau intan permata, melainkan dirimu sendiri!"`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      {/* Action Bar Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print">
        <div>
          <button
            onClick={() => {
              sound.playClick();
              onBackToMap();
            }}
            className="text-xs sm:text-sm font-semibold text-slate-600 hover:text-amber-800 transition-colors cursor-pointer"
          >
            ← Kembali ke Peta Ekspedisi
          </button>
          <h1 className="font-display font-black text-2xl text-slate-900 mt-1">
            Piagam Kelulusan Ekspedisi
          </h1>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleDownloadImage}
            disabled={isDownloading}
            className="px-4 py-2.5 rounded-xl font-display font-bold text-xs sm:text-sm text-white bg-amber-600 hover:bg-amber-700 shadow-sm transition-all flex items-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>{isDownloading ? 'Menyimpan...' : 'Unduh PNG'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-3.5 py-2.5 rounded-xl font-display font-bold text-xs sm:text-sm text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 shadow-xs transition-all flex items-center gap-2 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak / PDF</span>
          </button>

          <button
            onClick={handleCopySummary}
            className="px-3.5 py-2.5 rounded-xl font-display font-bold text-xs sm:text-sm text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 shadow-xs transition-all flex items-center gap-2 cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Tersalin!' : 'Salin Teks'}</span>
          </button>

          <button
            onClick={onReset}
            className="px-3.5 py-2.5 rounded-xl font-display font-bold text-xs sm:text-sm text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 transition-all flex items-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Mulai Ulang</span>
          </button>
        </div>
      </div>

      {/* The Official Certificate (Printable & Exportable Element) */}
      <div
        id="printable-certificate"
        ref={certificateRef}
        className="relative bg-gradient-to-b from-[#FFFDF9] via-[#FAF6ED] to-[#FFFDF9] p-6 sm:p-10 rounded-3xl border-8 border-double border-amber-600/90 shadow-2xl text-slate-900 overflow-hidden"
      >
        {/* Subtle decorative parchment corner ornaments */}
        <div className="absolute top-3 left-3 w-12 h-12 border-t-2 border-l-2 border-amber-700/60 pointer-events-none" />
        <div className="absolute top-3 right-3 w-12 h-12 border-t-2 border-r-2 border-amber-700/60 pointer-events-none" />
        <div className="absolute bottom-3 left-3 w-12 h-12 border-b-2 border-l-2 border-amber-700/60 pointer-events-none" />
        <div className="absolute bottom-3 right-3 w-12 h-12 border-b-2 border-r-2 border-amber-700/60 pointer-events-none" />

        {/* Header Institution */}
        <div className="text-center pb-6 border-b-2 border-amber-300/80">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/80 text-amber-900 border border-amber-300 text-[11px] font-bold tracking-wider uppercase mb-2">
            <Compass className="w-3.5 h-3.5 text-amber-700" />
            <span>Badan Ekspedisi Bimbingan & Konseling Pulau Karakter</span>
          </div>

          <h2 className="font-display font-black text-2xl sm:text-4xl text-amber-900 tracking-tight uppercase">
            Piagam Penjelajah Karakter
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
            Nomor Pengukuhan: BK-EXP/{new Date().getFullYear()}/04
          </p>
        </div>

        {/* Certificate Recipient */}
        <div className="text-center py-6 sm:py-8 space-y-3">
          <p className="text-xs sm:text-sm text-slate-600 font-medium italic">
            Dengan penuh rasa bangga dan apresiasi, piagam kehormatan ini dianugerahkan kepada:
          </p>

          <div className="flex flex-col items-center justify-center gap-2">
            <AvatarDisplay avatarId={progress.avatarId} size="md" className="shadow-md" />
            <h3 className="font-display font-black text-2xl sm:text-4xl text-slate-900 underline decoration-amber-400 decoration-wavy underline-offset-8">
              {progress.playerName}
            </h3>
            <p className="text-xs sm:text-sm font-bold text-amber-800 bg-amber-100/60 px-3 py-1 rounded-full border border-amber-200 mt-1">
              Gelar: Penjelajah Teladan Karakter Diri ({currentAvatar.title})
            </p>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 max-w-xl mx-auto leading-relaxed pt-2">
            Telah berhasil menuntaskan seluruh pos rintangan di Pulau Karakter, membuktikan kejujuran hati,
            kepekaan empati, keberanian moral menghadapi perundungan, serta pengenalan potensi diri yang mendalam.
          </p>
        </div>

        {/* Character Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4 border-y border-amber-200/90 text-left">
          {/* Box 1: 3 Strength Badges */}
          <div className="bg-white/80 rounded-2xl border border-amber-200 p-4 shadow-2xs">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-4 h-4 text-amber-600 fill-amber-500" />
              <p className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                3 Batu Kekuatan yang Dimiliki
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedBadges.map((badge) => (
                <div
                  key={badge.id}
                  className="px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-300 text-slate-800 text-xs font-semibold flex items-center gap-1.5"
                >
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span>{badge.name}</span>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-slate-500 mt-2 italic">
              &ldquo;Kekuatan ini adalah kompas pribadimu dalam menjalani kehidupan.&rdquo;
            </p>
          </div>

          {/* Box 2: Honest Reflection */}
          <div className="bg-white/80 rounded-2xl border border-amber-200 p-4 shadow-2xs">
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <p className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Refleksi Cermin Kejujuran
              </p>
            </div>
            <p className="text-xs text-slate-700">
              <strong className="text-slate-900">Kelebihan:</strong> {progress.post1.strength || 'Pribadi yang ramah dan setia kawan'}
            </p>
            <p className="text-xs text-slate-700 mt-1">
              <strong className="text-slate-900">Tantangan Diri:</strong> {progress.post1.challenge || 'Berani mengatasi rasa cemas'}
            </p>
          </div>
        </div>

        {/* Affirmation Quote */}
        {progress.post4.affirmation && (
          <div className="my-5 p-4 rounded-2xl bg-amber-100/60 border border-amber-300/80 text-center">
            <p className="text-[11px] font-bold text-amber-900 uppercase tracking-wider mb-1">
              Mantra Afirmasi Pribadi
            </p>
            <p className="text-xs sm:text-sm font-semibold text-slate-800 italic">
              {progress.post4.affirmation}
            </p>
          </div>
        )}

        {/* Footer: Signatures & Golden Official Seal */}
        <div className="pt-6 flex items-end justify-between gap-4">
          <div className="text-left">
            <p className="text-[11px] text-slate-500">Ditetapkan di:</p>
            <p className="text-xs font-bold text-slate-800 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-amber-700" /> Puncak Pulau Karakter
            </p>
            <p className="text-[11px] text-slate-600 mt-0.5">{currentDate}</p>
          </div>

          {/* Golden Seal Badge */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-dashed border-amber-600 bg-gradient-to-br from-amber-400 via-yellow-400 to-amber-500 text-amber-950 flex flex-col items-center justify-center p-1 shadow-md rotate-[-8deg]">
              <Sparkles className="w-5 h-5 text-amber-950" />
              <span className="text-[8px] sm:text-[9px] font-black uppercase text-center tracking-tighter leading-none mt-0.5">
                SELESAI & SAH
              </span>
              <span className="text-[7px] sm:text-[8px] font-bold">BK KONSULTASI</span>
            </div>
          </div>

          <div className="text-right">
            <p className="text-[11px] text-slate-500">Konselor Pendamping:</p>
            <p className="text-xs sm:text-sm font-bold text-slate-800 mt-4 border-b border-slate-400 pb-0.5 inline-block">
              Tim Bimbingan & Konseling
            </p>
            <p className="text-[10px] text-slate-500">Pemberdayaan Karakter Remaja</p>
          </div>
        </div>
      </div>
    </div>
  );
};
