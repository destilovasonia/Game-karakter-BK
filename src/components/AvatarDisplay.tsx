import React from 'react';

interface AvatarDisplayProps {
  avatarId: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const AvatarDisplay: React.FC<AvatarDisplayProps> = ({ avatarId, size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32',
  }[size];

  switch (avatarId) {
    case 'captain':
      return (
        <div className={`relative rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center p-1.5 shadow-md ${sizeClasses} ${className}`}>
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow">
            {/* Captain's Tricorn / Hat */}
            <path d="M15 42 Q50 20 85 42 Q70 25 50 22 Q30 25 15 42 Z" fill="#1E293B" />
            <path d="M22 38 Q50 24 78 38" stroke="#F59E0B" strokeWidth="3" fill="none" />
            <circle cx="50" cy="30" r="5" fill="#F59E0B" />
            {/* Face */}
            <circle cx="50" cy="58" r="24" fill="#FED7AA" />
            {/* Hair */}
            <path d="M26 52 Q24 64 30 70" stroke="#78350F" strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M74 52 Q76 64 70 70" stroke="#78350F" strokeWidth="4" strokeLinecap="round" fill="none" />
            {/* Eyes */}
            <circle cx="42" cy="54" r="3" fill="#1E293B" />
            <circle cx="58" cy="54" r="3" fill="#1E293B" />
            <circle cx="43" cy="53" r="1" fill="#FFFFFF" />
            <circle cx="59" cy="53" r="1" fill="#FFFFFF" />
            {/* Friendly Captain Mustache & Smile */}
            <path d="M38 64 Q50 60 50 64 Q50 60 62 64" stroke="#78350F" strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d="M44 68 Q50 72 56 68" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            {/* Gold Compass Emblem Collar */}
            <path d="M36 80 L50 88 L64 80" fill="#1E293B" />
            <circle cx="50" cy="85" r="3.5" fill="#FBBF24" />
          </svg>
        </div>
      );

    case 'scout':
      return (
        <div className={`relative rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center p-1.5 shadow-md ${sizeClasses} ${className}`}>
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow">
            {/* Adventurer Safari Hat */}
            <ellipse cx="50" cy="40" rx="36" ry="12" fill="#78350F" />
            <path d="M28 38 C28 20 72 20 72 38 Z" fill="#92400E" />
            <rect x="29" y="34" width="42" height="4" fill="#047857" rx="2" />
            <path d="M68 34 Q76 22 72 16" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" fill="none" />
            {/* Face */}
            <circle cx="50" cy="58" r="24" fill="#FFEDD5" />
            {/* Freckles */}
            <circle cx="38" cy="58" r="1" fill="#B45309" />
            <circle cx="40" cy="60" r="1" fill="#B45309" />
            <circle cx="60" cy="60" r="1" fill="#B45309" />
            <circle cx="62" cy="58" r="1" fill="#B45309" />
            {/* Eyes - spirited look */}
            <circle cx="41" cy="52" r="3.2" fill="#064E3B" />
            <circle cx="59" cy="52" r="3.2" fill="#064E3B" />
            <circle cx="42" cy="51" r="1" fill="#FFFFFF" />
            <circle cx="60" cy="51" r="1" fill="#FFFFFF" />
            {/* Smile */}
            <path d="M43 65 Q50 71 57 65" stroke="#9A3412" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            {/* Explorer Scarf */}
            <path d="M32 78 Q50 86 68 78 L50 94 Z" fill="#047857" />
            <circle cx="50" cy="85" r="3" fill="#FCD34D" />
          </svg>
        </div>
      );

    case 'navigator':
      return (
        <div className={`relative rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center p-1.5 shadow-md ${sizeClasses} ${className}`}>
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow">
            {/* Cheerful Red Sailor Bandana */}
            <path d="M24 38 C26 22 74 22 76 38 Q50 32 24 38 Z" fill="#DC2626" />
            <circle cx="36" cy="30" r="2" fill="#FFFFFF" />
            <circle cx="50" cy="27" r="2" fill="#FFFFFF" />
            <circle cx="64" cy="30" r="2" fill="#FFFFFF" />
            <path d="M72 38 Q82 44 80 52" stroke="#DC2626" strokeWidth="5" strokeLinecap="round" fill="none" />
            {/* Face */}
            <circle cx="50" cy="58" r="24" fill="#FED7AA" />
            {/* Cheerful Winking Eyes */}
            <path d="M36 53 Q42 48 45 53" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" fill="none" />
            <circle cx="59" cy="52" r="3.5" fill="#1E293B" />
            <circle cx="60" cy="51" r="1.2" fill="#FFFFFF" />
            {/* Rosy Cheeks */}
            <circle cx="36" cy="61" r="4" fill="#FCA5A5" opacity="0.6" />
            <circle cx="64" cy="61" r="4" fill="#FCA5A5" opacity="0.6" />
            {/* Big Open Laughing Smile */}
            <path d="M42 63 Q50 74 58 63 Z" fill="#991B1B" />
            <path d="M44 64 Q50 67 56 64" fill="#FFFFFF" />
            {/* Sailor Striped Collar */}
            <path d="M30 80 Q50 88 70 80" stroke="#0284C7" strokeWidth="6" strokeLinecap="round" fill="none" />
            <path d="M34 82 Q50 90 66 82" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" fill="none" />
          </svg>
        </div>
      );

    case 'seeker':
    default:
      return (
        <div className={`relative rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-700 flex items-center justify-center p-1.5 shadow-md ${sizeClasses} ${className}`}>
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow">
            {/* Aviator / Steampunk Goggles on Head */}
            <circle cx="38" cy="32" r="10" stroke="#D97706" strokeWidth="3" fill="#38BDF8" opacity="0.85" />
            <circle cx="62" cy="32" r="10" stroke="#D97706" strokeWidth="3" fill="#38BDF8" opacity="0.85" />
            <line x1="48" y1="32" x2="52" y2="32" stroke="#B45309" strokeWidth="4" />
            <path d="M18 32 L28 32 M72 32 L82 32" stroke="#78350F" strokeWidth="3" />
            {/* Hair */}
            <path d="M26 44 Q50 36 74 44 Q78 60 74 68 Q50 56 26 68 Z" fill="#4B5563" />
            {/* Face */}
            <circle cx="50" cy="60" r="22" fill="#FDE68A" />
            {/* Thoughtful kind eyes with spectacles */}
            <circle cx="42" cy="58" r="3" fill="#312E81" />
            <circle cx="58" cy="58" r="3" fill="#312E81" />
            <circle cx="43" cy="57" r="1" fill="#FFFFFF" />
            <circle cx="59" cy="57" r="1" fill="#FFFFFF" />
            {/* Mindful gentle smile */}
            <path d="M44 69 Q50 74 56 69" stroke="#92400E" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            {/* Explorer High Collar with Star Pin */}
            <path d="M34 82 L50 88 L66 82" stroke="#4338CA" strokeWidth="6" strokeLinecap="round" fill="none" />
            <polygon points="50,83 52,87 56,87 53,89 54,93 50,91 46,93 47,89 44,87 48,87" fill="#FBBF24" />
          </svg>
        </div>
      );
  }
};
