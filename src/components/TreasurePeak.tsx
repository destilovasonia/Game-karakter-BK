import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Camera, CameraOff, Award, ArrowLeft, Heart, Lock, KeyRound } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { UserProgress } from '../types';
import { AvatarDisplay } from './AvatarDisplay';
import { sound } from '../utils/audio';

interface TreasurePeakProps {
  progress: UserProgress;
  onOpenCertificate: () => void;
  onBackToMap: () => void;
}

export const TreasurePeak: React.FC<TreasurePeakProps> = ({
  progress,
  onOpenCertificate,
  onBackToMap,
}) => {
  const [chestOpened, setChestOpened] = useState<boolean>(progress.completedDate !== null);
  const [isOpening, setIsOpening] = useState<boolean>(false);
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const treasureChestImage = '/src/assets/images/treasure_chest_glow_1793954679336.jpg';
  const mirrorFrameImage = '/src/assets/images/magic_mirror_frame_1793954678939.jpg';

  // Confetti celebration function
  const triggerCelebration = () => {
    try {
      const count = 200;
      const defaults = { origin: { y: 0.7 } };

      const fire = (particleRatio: number, opts: confetti.Options) => {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio),
        });
      };

      fire(0.25, { spread: 26, startVelocity: 55, colors: ['#F59E0B', '#FBBF24', '#FFFFFF'] });
      fire(0.2, { spread: 60, colors: ['#10B981', '#3B82F6', '#EC4899'] });
      fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
      fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
      fire(0.1, { spread: 120, startVelocity: 45 });
    } catch {}
  };

  const handleOpenChest = () => {
    if (isOpening || chestOpened) return;
    setIsOpening(true);
    sound.playChestUnlock();

    setTimeout(() => {
      setChestOpened(true);
      setIsOpening(false);
      triggerCelebration();
    }, 1400);
  };

  // Webcam Management
  const startCamera = async () => {
    try {
      setCameraError(null);
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setCameraError('Kamera tidak didukung pada peramban ini. Menampilkan cermin ilustrasi.');
        return;
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 640 } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCameraActive(true);
      sound.playSuccess();
    } catch (err) {
      console.warn('Camera access denied or unavailable', err);
      setCameraError('Izin kamera tidak diberikan atau perangkat kamera tidak ditemukan.');
      setCameraActive(false);
      sound.playSoftWarning();
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  };

  // Attach video stream when cameraActive becomes true
  useEffect(() => {
    if (cameraActive && streamRef.current && videoRef.current) {
      videoRef.current.srcObject = streamRef.current;
    }
  }, [cameraActive]);

  // Clean up camera on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      {/* Top Breadcrumb Nav */}
      <div className="flex items-center justify-between mb-2">
        <button
          onClick={() => {
            sound.playClick();
            stopCamera();
            onBackToMap();
          }}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-amber-800 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Peta Ekspedisi</span>
        </button>

        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
          Puncak Pulau Karakter: Puncak Ekspedisi
        </span>
      </div>

      <AnimatePresence mode="wait">
        {!chestOpened ? (
          <motion.div
            key="closed-state"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-3xl border-2 border-amber-300 p-6 sm:p-8 shadow-md text-center space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold">
              <KeyRound className="w-4 h-4 text-amber-700" />
              <span>4 Keping Puzzle Kunci Telah Lengkap!</span>
            </div>

            <h1 className="font-display font-black text-3xl sm:text-4xl text-slate-900">
              Gembok Peti Harta Karun Siap Dibuka
            </h1>

            <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
              Selamat, <strong>{progress.playerName}</strong>! Kamu telah melewati Lembah Cermin, Jembatan
              Kepercayaan, Gua Dilema, dan Tebing Apresiasi. Satukan keempat keping puzzle dan buka peti harta
              karun legendaris ini sekarang!
            </p>

            {/* Locked Chest Representation */}
            <div className="relative max-w-sm mx-auto aspect-square rounded-3xl overflow-hidden border-4 border-amber-400 bg-amber-950/20 shadow-xl flex items-center justify-center p-6">
              <img
                src={treasureChestImage}
                alt="Peti Harta Karun Terkunci"
                referrerPolicy="no-referrer"
                className={`w-full h-full object-cover rounded-2xl transition-all duration-700 ${
                  isOpening ? 'scale-110 filter brightness-125' : ''
                }`}
              />

              {!isOpening ? (
                <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-xs flex flex-col items-center justify-center p-4 text-white">
                  <div className="w-16 h-16 rounded-2xl bg-amber-500 text-white flex items-center justify-center mb-3 shadow-lg ring-4 ring-amber-300/60">
                    <Lock className="w-8 h-8" />
                  </div>
                  <p className="font-display font-bold text-lg text-amber-300">Peti Tersegel Mantra Kuno</p>
                  <p className="text-xs text-slate-200 mt-1">4 Keping Puzzle Karakter Siap Melepas Kunci</p>
                </div>
              ) : (
                <div className="absolute inset-0 bg-amber-500/30 backdrop-blur-xs flex flex-col items-center justify-center text-white">
                  <motion.div
                    animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                    className="w-16 h-16 rounded-full bg-amber-400 text-amber-950 flex items-center justify-center shadow-2xl"
                  >
                    <Sparkles className="w-8 h-8" />
                  </motion.div>
                  <p className="font-display font-bold text-lg text-white mt-3">Membuka Segel Emas...</p>
                </div>
              )}
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleOpenChest}
                disabled={isOpening}
                className="w-full sm:w-auto px-10 py-4 rounded-2xl font-display font-extrabold text-lg text-white bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 shadow-xl transition-all cursor-pointer glow-gold"
              >
                {isOpening ? 'Membuka Peti...' : '✨ Buka Peti Harta Karun Sekarang!'}
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="opened-twist-state"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl border-2 border-amber-400 p-6 sm:p-8 shadow-xl space-y-8"
          >
            {/* The Big Twist Headline */}
            <div className="text-center space-y-2">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 10, stiffness: 100 }}
                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-500 text-white flex items-center justify-center mx-auto shadow-md"
              >
                <Sparkles className="w-9 h-9" />
              </motion.div>

              <p className="text-xs font-bold text-amber-700 tracking-widest uppercase">
                Rahasia Terbesar Terkuak!
              </p>
              <h2
                className="font-display font-black text-2xl sm:text-4xl text-slate-900 tracking-tight leading-tight"
                style={{ textWrap: 'balance' }}
              >
                &ldquo;Harta Karun Terbesar di Dunia... <br />
                <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent">
                  Bukanlah Emas, Melainkan DIRIMU SENDIRI!&rdquo;
                </span>
              </h2>
            </div>

            {/* The Magic Mirror (Cermin Ajaib) */}
            <div className="relative max-w-md mx-auto">
              <div className="bg-gradient-to-b from-amber-200 via-amber-100 to-amber-200 p-3 sm:p-4 rounded-3xl border-4 border-amber-400 shadow-2xl">
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-900 border-2 border-amber-500/80 shadow-inner flex items-center justify-center">
                  {cameraActive ? (
                    <div className="relative w-full h-full">
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-full h-full object-cover -scale-x-100"
                      />
                      {/* Magical mirror golden vignette & starlight overlay */}
                      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-amber-950/70 via-transparent to-amber-900/30" />
                      <div className="absolute bottom-3 inset-x-3 text-center pointer-events-none">
                        <span className="inline-block px-3 py-1 rounded-full bg-amber-500/90 text-white font-display font-bold text-xs shadow-md">
                          Permata Asli: {progress.playerName}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="relative w-full h-full">
                      <img
                        src={mirrorFrameImage}
                        alt="Cermin Ajaib Karakter"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      {/* Avatar Overlay inside cartoon mirror */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-slate-900/40 backdrop-blur-xs text-center">
                        <motion.div
                          animate={{ scale: [1, 1.05, 1], y: [-2, 2, -2] }}
                          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                          className="relative"
                        >
                          <AvatarDisplay avatarId={progress.avatarId} size="lg" className="shadow-2xl ring-4 ring-amber-300" />
                          <span className="absolute -bottom-2 inset-x-0 text-center">
                            <span className="text-[10px] font-bold bg-amber-500 text-white px-2 py-0.5 rounded-full shadow-xs whitespace-nowrap">
                              {progress.playerName}
                            </span>
                          </span>
                        </motion.div>
                        <p className="font-display font-bold text-white text-sm sm:text-base mt-5 drop-shadow-md">
                          Cermin Jiwa Penjelajah
                        </p>
                        <p className="text-xs text-amber-200 max-w-[200px] mt-1 drop-shadow">
                          Sosok berani, penuh empati, dan berharga di mata dunia.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Camera Mode Toggles */}
                <div className="flex items-center justify-center gap-2 mt-3">
                  {!cameraActive ? (
                    <button
                      type="button"
                      onClick={startCamera}
                      className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-amber-300 text-xs font-semibold flex items-center gap-1.5 shadow-xs cursor-pointer transition-colors"
                    >
                      <Camera className="w-3.5 h-3.5 text-amber-600" />
                      <span>Buka Cermin Kamera (Webcam)</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={stopCamera}
                      className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-amber-300 text-xs font-semibold flex items-center gap-1.5 shadow-xs cursor-pointer transition-colors"
                    >
                      <CameraOff className="w-3.5 h-3.5 text-slate-500" />
                      <span>Kembali ke Cermin Kartun</span>
                    </button>
                  )}
                </div>

                {cameraError && (
                  <p className="text-[11px] text-amber-900 text-center mt-2 px-2">
                    {cameraError}
                  </p>
                )}
              </div>
            </div>

            {/* Moral & Psychological Guidance Counseling Letter */}
            <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100/60 rounded-2xl border border-amber-300 p-6 sm:p-7 text-slate-800 space-y-3 leading-relaxed">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-amber-700 fill-amber-500" />
                <h3 className="font-display font-bold text-base sm:text-lg text-amber-950">
                  Refleksi Mendalam dari Guru BK:
                </h3>
              </div>
              <p className="text-sm sm:text-base">
                Sepanjang perjalanan ini, kamu mencari peti emas di puncak gunung. Namun tahukah kamu?
                Setiap kali kamu <strong>berani mengakui kelemahanmu</strong> di Lembah Cermin,{' '}
                <strong>memilih mendengarkan kawan yang terluka</strong> di Jembatan Kepercayaan,{' '}
                <strong>berani berkata tidak pada perundungan</strong> di Gua Dilema, dan{' '}
                <strong>menghargai potensi dirimu</strong> di Tebing Apresiasi... kamu sedang memoles permata
                sejati yang ada di dalam hatimu.
              </p>
              <p className="text-sm sm:text-base font-semibold text-amber-900 italic">
                &ldquo;Kamu unik, berharga, dan memiliki potensi luar biasa. Jangan biarkan siapapun—termasuk
                keraguan di dalam kepalamu sendiri—meredupkan cahaya kebaikanmu!&rdquo;
              </p>
            </div>

            {/* CTA to Certificate */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  stopCamera();
                  onBackToMap();
                }}
                className="py-3.5 px-6 rounded-xl font-display font-semibold text-sm text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer text-center"
              >
                Lihat Peta Ekspedisi
              </button>

              <button
                type="button"
                onClick={() => {
                  sound.playSuccess();
                  stopCamera();
                  onOpenCertificate();
                }}
                className="flex-1 py-4 px-6 rounded-xl font-display font-bold text-base text-white bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 shadow-lg hover:shadow-xl active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2 glow-gold"
              >
                <Award className="w-5 h-5" />
                <span>Buka Piagam & Sertifikat Penjelajah Karakter</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
