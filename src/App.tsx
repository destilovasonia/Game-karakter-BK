import { useState, useEffect } from 'react';
import { UserProgress, Post1Data, Post2Data, Post3Data, Post4Data } from './types';
import { Header } from './components/Header';
import { LandingPage } from './components/LandingPage';
import { IslandMap } from './components/IslandMap';
import { Post1Mirror } from './components/Post1Mirror';
import { Post2Bridge } from './components/Post2Bridge';
import { Post3Cave } from './components/Post3Cave';
import { Post4Cliff } from './components/Post4Cliff';
import { TreasurePeak } from './components/TreasurePeak';
import { CertificateView } from './components/CertificateView';
import { sound } from './utils/audio';

const STORAGE_KEY = 'pulau_karakter_progress_v1';

const DEFAULT_STATE: UserProgress = {
  playerName: '',
  avatarId: 'captain',
  currentScreen: 'landing',
  unlockedLevel: 1,
  puzzlePieces: [false, false, false, false],
  post1: {
    strength: '',
    challenge: '',
    reflectionCompleted: false,
  },
  post2: {
    selectedChoice: null,
    passed: false,
  },
  post3: {
    stepOrder: [],
    passed: false,
  },
  post4: {
    selectedStrengths: [],
    affirmation: '',
    completed: false,
  },
  completedDate: null,
};

export default function App() {
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {}
    return DEFAULT_STATE;
  });

  // Save to localStorage on changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {}
  }, [progress]);

  const handleStartAdventure = (name: string, avatarId: string) => {
    setProgress((prev) => ({
      ...prev,
      playerName: name,
      avatarId: avatarId,
      currentScreen: 'map',
    }));
  };

  const handleNavigateTo = (
    screen: 'landing' | 'map' | 'post1' | 'post2' | 'post3' | 'post4' | 'treasure' | 'certificate'
  ) => {
    setProgress((prev) => ({ ...prev, currentScreen: screen }));
  };

  const handleCompletePost1 = (data: Post1Data) => {
    setProgress((prev) => {
      const nextPieces: [boolean, boolean, boolean, boolean] = [
        true,
        prev.puzzlePieces[1],
        prev.puzzlePieces[2],
        prev.puzzlePieces[3],
      ];
      return {
        ...prev,
        post1: data,
        puzzlePieces: nextPieces,
        unlockedLevel: Math.max(prev.unlockedLevel, 2),
        currentScreen: 'map',
      };
    });
  };

  const handleCompletePost2 = (data: Post2Data) => {
    setProgress((prev) => {
      const nextPieces: [boolean, boolean, boolean, boolean] = [
        prev.puzzlePieces[0],
        true,
        prev.puzzlePieces[2],
        prev.puzzlePieces[3],
      ];
      return {
        ...prev,
        post2: data,
        puzzlePieces: nextPieces,
        unlockedLevel: Math.max(prev.unlockedLevel, 3),
        currentScreen: 'map',
      };
    });
  };

  const handleCompletePost3 = (data: Post3Data) => {
    setProgress((prev) => {
      const nextPieces: [boolean, boolean, boolean, boolean] = [
        prev.puzzlePieces[0],
        prev.puzzlePieces[1],
        true,
        prev.puzzlePieces[3],
      ];
      return {
        ...prev,
        post3: data,
        puzzlePieces: nextPieces,
        unlockedLevel: Math.max(prev.unlockedLevel, 4),
        currentScreen: 'map',
      };
    });
  };

  const handleCompletePost4 = (data: Post4Data) => {
    setProgress((prev) => {
      const nextPieces: [boolean, boolean, boolean, boolean] = [
        prev.puzzlePieces[0],
        prev.puzzlePieces[1],
        prev.puzzlePieces[2],
        true,
      ];
      return {
        ...prev,
        post4: data,
        puzzlePieces: nextPieces,
        unlockedLevel: 5,
        currentScreen: 'treasure', // Directly celebrate at treasure peak!
      };
    });
  };

  const handleOpenCertificate = () => {
    const today = new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    setProgress((prev) => ({
      ...prev,
      completedDate: prev.completedDate || today,
      currentScreen: 'certificate',
    }));
  };

  const handleReset = () => {
    if (window.confirm('Apakah kamu yakin ingin memulai ulang ekspedisi dari awal?')) {
      sound.playClick();
      localStorage.removeItem(STORAGE_KEY);
      setProgress(DEFAULT_STATE);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFFDF8] via-[#FAF5E9] to-[#FFF9EE] text-slate-800 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Bar Navigation */}
      <Header
        progress={progress}
        onNavigateToMap={() => handleNavigateTo('map')}
        onReset={handleReset}
        onViewCertificate={handleOpenCertificate}
      />

      {/* Main Interactive Stage */}
      <main className="flex-1">
        {progress.currentScreen === 'landing' && (
          <LandingPage
            onStart={handleStartAdventure}
            initialName={progress.playerName}
            initialAvatar={progress.avatarId}
          />
        )}

        {progress.currentScreen === 'map' && (
          <IslandMap
            progress={progress}
            onSelectStation={(st) => handleNavigateTo(st)}
          />
        )}

        {progress.currentScreen === 'post1' && (
          <Post1Mirror
            initialData={progress.post1}
            onComplete={handleCompletePost1}
            onBackToMap={() => handleNavigateTo('map')}
          />
        )}

        {progress.currentScreen === 'post2' && (
          <Post2Bridge
            initialData={progress.post2}
            onComplete={handleCompletePost2}
            onBackToMap={() => handleNavigateTo('map')}
          />
        )}

        {progress.currentScreen === 'post3' && (
          <Post3Cave
            initialData={progress.post3}
            onComplete={handleCompletePost3}
            onBackToMap={() => handleNavigateTo('map')}
          />
        )}

        {progress.currentScreen === 'post4' && (
          <Post4Cliff
            initialData={progress.post4}
            playerName={progress.playerName}
            onComplete={handleCompletePost4}
            onBackToMap={() => handleNavigateTo('map')}
          />
        )}

        {progress.currentScreen === 'treasure' && (
          <TreasurePeak
            progress={progress}
            onOpenCertificate={handleOpenCertificate}
            onBackToMap={() => handleNavigateTo('map')}
          />
        )}

        {progress.currentScreen === 'certificate' && (
          <CertificateView
            progress={progress}
            onReset={handleReset}
            onBackToMap={() => handleNavigateTo('map')}
          />
        )}
      </main>

      {/* Quiet Footer */}
      <footer className="mt-auto py-6 px-4 text-center border-t border-amber-200/60 text-xs text-slate-500 bg-white/50 backdrop-blur-xs no-print">
        <p className="font-medium">
          Ekspedisi Harta Karun: Rahasia Pulau Karakter · Bimbingan dan Konseling (BK) Edukatif
        </p>
        <p className="text-[11px] text-slate-400 mt-1">
          Dirancang untuk menumbuhkan kesadaran diri, empati, pemecahan masalah bijak, dan apresiasi potensi remaja.
        </p>
      </footer>
    </div>
  );
}
