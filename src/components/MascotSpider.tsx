import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { sound } from '../services/soundEngine';

export type MascotMood = 'idle' | 'swing' | 'jump' | 'shoot_web' | 'correct' | 'wrong' | 'resting' | 'celebrate';

interface MascotSpiderProps {
  mood?: MascotMood;
  speechText?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  className?: string;
  onClick?: () => void;
}

export const MascotSpider: React.FC<MascotSpiderProps> = ({
  mood = 'idle',
  speechText,
  size = 'md',
  className = '',
  onClick,
}) => {
  const [localMood, setLocalMood] = useState<MascotMood>(mood);
  const [internalQuote, setInternalQuote] = useState<string | null>(speechText || null);
  const [showWebEffect, setShowWebEffect] = useState(false);

  const quotes = [
    "Hai Ila! 🕷️ Siap taklukkan TKA hari ini?",
    "Fokus! Satu langkah kecil hari ini, skor impian menanti!",
    "Ingat: Pahami konsepnya, lalu blurting tanpa intip buku!",
    "Jaring laba-laba terkuat dirajut dari konsistensi tiap hari!",
    "Kamu hebat, Ila! Jangan biarkan soal HOTS bikin gentar!"
  ];

  const handleMascotClick = () => {
    sound.playWebShoot();
    setLocalMood('jump');
    setShowWebEffect(true);

    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setInternalQuote(randomQuote);

    if (navigator.vibrate) {
      navigator.vibrate(30);
    }

    if (onClick) onClick();

    setTimeout(() => {
      setShowWebEffect(false);
      setLocalMood(mood);
    }, 1200);
  };

  const activeMood = localMood !== mood ? localMood : mood;

  // Sizing map
  const sizeMap = {
    sm: { w: 64, h: 64 },
    md: { w: 96, h: 96 },
    lg: { w: 140, h: 140 },
    hero: { w: 190, h: 190 },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`relative inline-flex flex-col items-center select-none ${className}`}>
      {/* Speech Bubble */}
      <AnimatePresence>
        {(speechText || internalQuote) && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="mb-2 max-w-xs px-3.5 py-1.5 rounded-2xl bg-slate-900/90 border border-rose-500/40 text-slate-100 text-xs font-medium text-center shadow-lg shadow-rose-950/40 backdrop-blur-md relative z-20 pointer-events-none"
          >
            <span>{speechText || internalQuote}</span>
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-900/90 border-r border-b border-rose-500/40 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spider Web Filament for Swing Mood */}
      {activeMood === 'swing' && (
        <motion.div
          animate={{ scaleY: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
          className="absolute -top-16 left-1/2 -translate-x-1/2 w-0.5 h-16 bg-gradient-to-b from-transparent via-cyan-400/80 to-white shadow-[0_0_8px_#38bdf8]"
        />
      )}

      {/* Interactive Web Blast Particles */}
      <AnimatePresence>
        {showWebEffect && (
          <motion.div
            initial={{ opacity: 0, scale: 0.2 }}
            animate={{ opacity: 1, scale: 1.5 }}
            exit={{ opacity: 0, scale: 2 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 pointer-events-none flex items-center justify-center z-30"
          >
            <svg viewBox="0 0 100 100" className="w-28 h-28 text-cyan-300 drop-shadow-[0_0_12px_rgba(56,189,248,0.9)]">
              <circle cx="50" cy="50" r="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
              <circle cx="50" cy="50" r="32" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
              <path d="M 50 10 L 50 90 M 10 50 L 90 50 M 20 20 L 80 80 M 80 20 L 20 80" stroke="currentColor" strokeWidth="1" />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Original Mascot Character SVG */}
      <motion.button
        type="button"
        onClick={handleMascotClick}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.92 }}
        animate={
          activeMood === 'jump'
            ? { y: [-15, -28, 0], rotate: [-6, 6, 0] }
            : activeMood === 'swing'
            ? { rotate: [-10, 10, -10], y: [0, 4, 0] }
            : activeMood === 'correct'
            ? { rotate: [0, -12, 12, 0], scale: [1, 1.15, 1] }
            : activeMood === 'wrong'
            ? { x: [-4, 4, -4, 4, 0] }
            : activeMood === 'resting'
            ? { y: [0, 3, 0] }
            : { y: [0, -6, 0] }
        }
        transition={{
          repeat: activeMood === 'idle' || activeMood === 'swing' || activeMood === 'resting' ? Infinity : 0,
          duration: activeMood === 'swing' ? 2.5 : activeMood === 'resting' ? 3 : 2,
          ease: 'easeInOut'
        }}
        className="relative cursor-pointer focus:outline-none group focus-visible:ring-2 focus-visible:ring-rose-500 rounded-full"
        title="Klik Araki untuk semangat!"
      >
        <svg
          width={currentSize.w}
          height={currentSize.h}
          viewBox="0 0 120 120"
          className="drop-shadow-[0_8px_20px_rgba(225,29,72,0.45)] group-hover:drop-shadow-[0_8px_30px_rgba(2,132,199,0.7)] transition-all"
        >
          <defs>
            <linearGradient id="suitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f43f5e" />
              <stop offset="50%" stopColor="#e11d48" />
              <stop offset="100%" stopColor="#9f1239" />
            </linearGradient>

            <linearGradient id="darkArmor" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#090d16" />
            </linearGradient>

            <linearGradient id="glowElectric" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>

            <filter id="neonEyes">
              <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Web lines behind head */}
          <path d="M 60 20 L 60 100 M 20 60 L 100 60 M 32 32 L 88 88 M 88 32 L 32 88" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2" />
          <polygon points="60,35 78,47 78,73 60,85 42,73 42,47" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />

          {/* Body and Limbs */}
          {activeMood === 'resting' ? (
            // Sitting position with coffee mug
            <g>
              <ellipse cx="60" cy="98" rx="26" ry="12" fill="url(#darkArmor)" stroke="#e11d48" strokeWidth="2" />
              <rect x="74" y="86" width="14" height="18" rx="3" fill="#f8fafc" stroke="#0284c7" strokeWidth="2" />
              <path d="M 88 90 C 93 90, 93 100, 88 100" fill="none" stroke="#0284c7" strokeWidth="2" />
              {/* Coffee steam */}
              <path d="M 81 82 Q 83 76 80 72" fill="none" stroke="#e2e8f0" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
            </g>
          ) : (
            // Agile superhero pose limbs
            <g>
              <ellipse cx="60" cy="94" rx="20" ry="14" fill="url(#darkArmor)" stroke="#e11d48" strokeWidth="2" />
              {/* Electric blue harness stripes */}
              <path d="M 52 86 L 68 86 M 50 94 L 70 94" stroke="url(#glowElectric)" strokeWidth="2" strokeLinecap="round" />
            </g>
          )}

          {/* Superhero Head */}
          <circle cx="60" cy="54" r="32" fill="url(#suitGrad)" stroke="#111827" strokeWidth="2.5" />

          {/* Spider Silk Mask Pattern */}
          <g opacity="0.45" stroke="#ffffff" strokeWidth="1.2">
            <path d="M 60 22 L 60 86" />
            <path d="M 28 54 L 92 54" />
            <path d="M 37 31 L 83 77" />
            <path d="M 83 31 L 37 77" />
            <ellipse cx="60" cy="54" rx="14" ry="14" fill="none" />
            <ellipse cx="60" cy="54" rx="24" ry="24" fill="none" />
          </g>

          {/* Mask Emblem on Forehead */}
          <polygon points="60,26 65,34 60,37 55,34" fill="#0284c7" stroke="#ffffff" strokeWidth="0.8" />

          {/* Expressive Mask Eyes */}
          {activeMood === 'correct' ? (
            // Joyful squint eyes (thumbs up celebratory)
            <g filter="url(#neonEyes)">
              <path d="M 38 52 Q 48 42 54 52" fill="none" stroke="#ffffff" strokeWidth="4.5" strokeLinecap="round" />
              <path d="M 82 52 Q 72 42 66 52" fill="none" stroke="#ffffff" strokeWidth="4.5" strokeLinecap="round" />
            </g>
          ) : activeMood === 'wrong' ? (
            // Sad / thoughtful disappointed eyes
            <g filter="url(#neonEyes)">
              <path d="M 36 56 Q 47 62 55 54" fill="#ffffff" stroke="#090d16" strokeWidth="2" />
              <path d="M 84 56 Q 73 62 65 54" fill="#ffffff" stroke="#090d16" strokeWidth="2" />
              {/* Cute little tear drop */}
              <circle cx="40" cy="67" r="2.5" fill="#38bdf8" />
            </g>
          ) : (
            // Classic Large Heroic Arachno Eyes
            <g filter="url(#neonEyes)">
              {/* Left Eye */}
              <path
                d="M 36 50 C 37 40, 50 42, 55 55 C 50 63, 37 59, 36 50 Z"
                fill="#ffffff"
                stroke="#0f172a"
                strokeWidth="2.5"
              />
              <path d="M 40 47 C 43 43, 49 44, 52 52" fill="none" stroke="#38bdf8" strokeWidth="1.5" />

              {/* Right Eye */}
              <path
                d="M 84 50 C 83 40, 70 42, 65 55 C 70 63, 83 59, 84 50 Z"
                fill="#ffffff"
                stroke="#0f172a"
                strokeWidth="2.5"
              />
              <path d="M 80 47 C 77 43, 71 44, 68 52" fill="none" stroke="#38bdf8" strokeWidth="1.5" />
            </g>
          )}

          {/* Web Shooter Wristlets (when shooting web) */}
          {(activeMood === 'shoot_web' || showWebEffect) && (
            <g>
              <circle cx="15" cy="85" r="7" fill="#0284c7" stroke="#ffffff" strokeWidth="2" />
              <path d="M 15 85 L 0 70" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
            </g>
          )}
        </svg>

        {/* Small floating badge */}
        <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-rose-600 to-cyan-500 rounded-full p-1 text-[9px] font-bold text-white shadow-md">
          {activeMood === 'correct' ? '🎉' : activeMood === 'wrong' ? '💪' : activeMood === 'resting' ? '☕' : '⚡'}
        </div>
      </motion.button>
    </div>
  );
};
