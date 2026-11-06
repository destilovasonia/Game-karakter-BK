export interface Avatar {
  id: string;
  name: string;
  title: string;
  description: string;
  color: string;
  badgeBg: string;
  iconName: string;
}

export interface Post1Data {
  strength: string;
  challenge: string;
  reflectionCompleted: boolean;
}

export interface Post2Data {
  selectedChoice: string | null;
  passed: boolean;
}

export interface Post3Data {
  stepOrder: string[];
  passed: boolean;
}

export interface StrengthBadge {
  id: string;
  name: string;
  category: string;
  description: string;
  gemColor: string;
  textColor: string;
  bgColor: string;
  borderColor: string;
  iconName: string;
}

export interface Post4Data {
  selectedStrengths: string[];
  affirmation: string;
  completed: boolean;
}

export interface UserProgress {
  playerName: string;
  avatarId: string;
  currentScreen: 'landing' | 'map' | 'post1' | 'post2' | 'post3' | 'post4' | 'treasure' | 'certificate';
  unlockedLevel: number; // 1: Post 1 available, 2: Post 2, 3: Post 3, 4: Post 4, 5: Treasure Chest
  puzzlePieces: [boolean, boolean, boolean, boolean];
  post1: Post1Data;
  post2: Post2Data;
  post3: Post3Data;
  post4: Post4Data;
  completedDate: string | null;
}

export const AVATARS: Avatar[] = [
  {
    id: 'captain',
    name: 'Kapten Bijak',
    title: 'Pemimpin yang Berempati',
    description: 'Selalu mendengarkan awak kapal sebelum mengambil keputusan.',
    color: 'from-amber-500 to-amber-700',
    badgeBg: 'bg-amber-100 text-amber-800 border-amber-300',
    iconName: 'Compass',
  },
  {
    id: 'scout',
    name: 'Penjelajah Tangguh',
    title: 'Pemberani & Pantang Menyerah',
    description: 'Melihat setiap rintangan sebagai kesempatan untuk bertumbuh.',
    color: 'from-emerald-500 to-teal-700',
    badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    iconName: 'Footprints',
  },
  {
    id: 'navigator',
    name: 'Navigator Ceria',
    title: 'Penebar Semangat Positif',
    description: 'Menemukan jalan keluar dengan senyuman dan hati terbuka.',
    color: 'from-sky-500 to-blue-700',
    badgeBg: 'bg-sky-100 text-sky-800 border-sky-300',
    iconName: 'MapPin',
  },
  {
    id: 'seeker',
    name: 'Penyelam Teliti',
    title: 'Pengamat Hati & Pikiran',
    description: 'Mampu menyelami makna terdalam di balik setiap perasaan.',
    color: 'from-indigo-500 to-purple-700',
    badgeBg: 'bg-indigo-100 text-indigo-800 border-indigo-300',
    iconName: 'Sparkles',
  },
];

export const STRENGTH_BADGES: StrengthBadge[] = [
  {
    id: 'loyal',
    name: 'Setia Kawan',
    category: 'Relasi',
    description: 'Selalu hadir saat teman membutuhkan, menjaga rahasia, dan dapat diandalkan.',
    gemColor: 'from-emerald-400 to-teal-600',
    textColor: 'text-emerald-800',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-300',
    iconName: 'HeartHandshake',
  },
  {
    id: 'hardworker',
    name: 'Pekerja Keras',
    category: 'Ketekunan',
    description: 'Bersungguh-sungguh dalam menuntaskan tugas dan bertanggung jawab penuh.',
    gemColor: 'from-amber-400 to-orange-600',
    textColor: 'text-amber-800',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-300',
    iconName: 'Flame',
  },
  {
    id: 'listener',
    name: 'Pendengar yang Baik',
    category: 'Empati',
    description: 'Mendengarkan tanpa memotong, memahami perasaan orang lain dengan hangat.',
    gemColor: 'from-cyan-400 to-blue-600',
    textColor: 'text-cyan-800',
    bgColor: 'bg-cyan-50',
    borderColor: 'border-cyan-300',
    iconName: 'Ear',
  },
  {
    id: 'creative',
    name: 'Kreatif & Imajinatif',
    category: 'Eksplorasi',
    description: 'Punya ide unik di luar kebiasaan dan gemar mencari solusi baru yang seru.',
    gemColor: 'from-purple-400 to-pink-600',
    textColor: 'text-purple-800',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-300',
    iconName: 'Sparkles',
  },
  {
    id: 'resilient',
    name: 'Tangguh Hadapi Cobaan',
    category: 'Resiliensi',
    description: 'Mampu bangkit kembali saat terjatuh dan belajar dari setiap kesalahan.',
    gemColor: 'from-rose-400 to-red-600',
    textColor: 'text-rose-800',
    bgColor: 'bg-rose-50',
    borderColor: 'border-rose-300',
    iconName: 'ShieldCheck',
  },
  {
    id: 'honest',
    name: 'Jujur & Tulus',
    category: 'Integritas',
    description: 'Mengutamakan kebenaran, berkata apa adanya dengan kesantunan budi pekerti.',
    gemColor: 'from-blue-400 to-indigo-600',
    textColor: 'text-blue-800',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-300',
    iconName: 'CheckCircle2',
  },
  {
    id: 'courageous',
    name: 'Berani Bersuara',
    category: 'Keberanian Moral',
    description: 'Berani membela yang benar dan menghentikan ketidakadilan di sekitarnya.',
    gemColor: 'from-yellow-400 to-amber-600',
    textColor: 'text-yellow-900',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-300',
    iconName: 'Megaphone',
  },
  {
    id: 'generous',
    name: 'Murah Hati & Pemaaf',
    category: 'Kebajikan',
    description: 'Tidak memendam dendam, mudah memaafkan dan senang berbagi kebaikan.',
    gemColor: 'from-fuchsia-400 to-rose-500',
    textColor: 'text-fuchsia-900',
    bgColor: 'bg-fuchsia-50',
    borderColor: 'border-fuchsia-300',
    iconName: 'Sun',
  },
];
