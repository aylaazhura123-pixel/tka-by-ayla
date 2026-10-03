import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, RotateCcw, SkipForward, Bell, Coffee, Sparkles, CheckCircle2, Shield, Settings2 } from 'lucide-react';
import { sound } from '../services/soundEngine';
import { MascotSpider } from '../components/MascotSpider';
import confetti from 'canvas-confetti';

interface Phase {
  name: string;
  durationSec: number;
  icon: string;
  type: 'teori' | 'blurting' | 'break' | 'latihan' | 'pembahasan' | 'review';
}

const DEFAULT_PHASES: Phase[] = [
  { name: 'SESI 1 — TEORI', durationSec: 25 * 60, icon: '📖', type: 'teori' },
  { name: 'SESI 2 — BLURTING', durationSec: 15 * 60, icon: '🧠', type: 'blurting' },
  { name: 'SESI 3 — SMART BREAK', durationSec: 5 * 60, icon: '☕', type: 'break' },
  { name: 'SESI 4 — LATIHAN SOAL', durationSec: 40 * 60, icon: '🎯', type: 'latihan' },
  { name: 'SESI 5 — PEMBAHASAN', durationSec: 20 * 60, icon: '🔎', type: 'pembahasan' },
  { name: 'SESI 6 — REVIEW KESALAHAN', durationSec: 15 * 60, icon: '🧠', type: 'review' },
];

interface TimerMissionViewProps {
  onAddXp: (amount: number) => void;
  onRecordStudyTime: (seconds: number) => void;
}

export const TimerMissionView: React.FC<TimerMissionViewProps> = ({
  onAddXp,
  onRecordStudyTime,
}) => {
  const [phases, setPhases] = useState<Phase[]>(DEFAULT_PHASES);
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [remainingSec, setRemainingSec] = useState(phases[0].durationSec);
  const [isRunning, setIsRunning] = useState(false);
  const [showSmartBreak, setShowSmartBreak] = useState(false);
  const [showCustomModal, setShowCustomModal] = useState(false);

  // Custom durations in minutes
  const [customTeori, setCustomTeori] = useState(25);
  const [customBlurting, setCustomBlurting] = useState(15);
  const [customBreak, setCustomBreak] = useState(5);
  const [customLatihan, setCustomLatihan] = useState(40);
  const [customReview, setCustomReview] = useState(20);

  const currentPhase = phases[currentPhaseIndex];
  const progressRatio = 1 - remainingSec / currentPhase.durationSec;

  // Real-time ticking effect
  useEffect(() => {
    let interval: number | null = null;
    if (isRunning) {
      interval = window.setInterval(() => {
        setRemainingSec((prev) => {
          if (prev <= 1) {
            handlePhaseComplete();
            return 0;
          }

          // Audio alarms trigger
          const next = prev - 1;
          if (next === 600) {
            // 10 minutes left
            sound.playBellShort();
          } else if (next === 300) {
            // 5 minutes left
            sound.playBellWarning();
          } else if (next === 60) {
            // 1 minute left
            sound.playBellWarning();
          } else if (next <= 10 && next >= 1) {
            // 10-second countdown
            sound.playCountdownTick();
          }

          onRecordStudyTime(1);
          return next;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, currentPhaseIndex]);

  const handlePhaseComplete = () => {
    sound.playMissionCompleteAlarm();
    if (navigator.vibrate) {
      navigator.vibrate([100, 50, 200, 50, 300]);
    }

    confetti({
      particleCount: 45,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#e11d48', '#38bdf8', '#fbbf24'],
    });

    onAddXp(25);

    // If entering break phase, display smart break screen
    if (currentPhase.type === 'break' || phases[(currentPhaseIndex + 1) % phases.length].type === 'break') {
      setShowSmartBreak(true);
    }

    if (currentPhaseIndex < phases.length - 1) {
      const nextIdx = currentPhaseIndex + 1;
      setCurrentPhaseIndex(nextIdx);
      setRemainingSec(phases[nextIdx].durationSec);
    } else {
      setIsRunning(false);
    }
  };

  const toggleTimer = () => {
    sound.playTap();
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    sound.playTap();
    setIsRunning(false);
    setRemainingSec(currentPhase.durationSec);
  };

  const handleSkip = () => {
    sound.playTap();
    if (currentPhaseIndex < phases.length - 1) {
      const nextIdx = currentPhaseIndex + 1;
      setCurrentPhaseIndex(nextIdx);
      setRemainingSec(phases[nextIdx].durationSec);
    }
  };

  const applyPreset = (mode: 'quick' | 'normal' | 'deep' | 'full') => {
    sound.playTap();
    setIsRunning(false);
    let newPhases: Phase[] = [];

    if (mode === 'quick') {
      newPhases = [
        { name: 'QUICK STUDY — TEORI', durationSec: 10 * 60, icon: '📖', type: 'teori' },
        { name: 'QUICK STUDY — BLURTING', durationSec: 5 * 60, icon: '🧠', type: 'blurting' },
      ];
    } else if (mode === 'normal') {
      newPhases = [
        { name: 'NORMAL — TEORI', durationSec: 25 * 60, icon: '📖', type: 'teori' },
        { name: 'NORMAL — REST', durationSec: 5 * 60, icon: '☕', type: 'break' },
      ];
    } else if (mode === 'deep') {
      newPhases = [
        { name: 'DEEP STUDY — TEORI & BLURTING', durationSec: 50 * 60, icon: '🔥', type: 'teori' },
        { name: 'DEEP REST', durationSec: 10 * 60, icon: '☕', type: 'break' },
      ];
    } else {
      newPhases = DEFAULT_PHASES;
    }

    setPhases(newPhases);
    setCurrentPhaseIndex(0);
    setRemainingSec(newPhases[0].durationSec);
  };

  const saveCustomTimer = () => {
    sound.playTap();
    const customList: Phase[] = [
      { name: 'KUSTOM: TEORI', durationSec: customTeori * 60, icon: '📖', type: 'teori' },
      { name: 'KUSTOM: BLURTING', durationSec: customBlurting * 60, icon: '🧠', type: 'blurting' },
      { name: 'KUSTOM: BREAK', durationSec: customBreak * 60, icon: '☕', type: 'break' },
      { name: 'KUSTOM: LATIHAN', durationSec: customLatihan * 60, icon: '🎯', type: 'latihan' },
      { name: 'KUSTOM: REVIEW', durationSec: customReview * 60, icon: '🧠', type: 'review' },
    ];
    setPhases(customList);
    setCurrentPhaseIndex(0);
    setRemainingSec(customList[0].durationSec);
    setShowCustomModal(false);
  };

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6 pb-28">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-400 mb-1">
            <span>⏱️ MULTI-SESSION MISSION TIMER</span>
            <span className="text-slate-500">·</span>
            <span>AUDIO ALARM SYSTEM</span>
          </div>
          <h2 className="text-2xl font-black font-heading text-white tracking-tight">
            Timer Sesi Belajar Bertahap
          </h2>
          <p className="text-xs text-slate-300">
            Peringatan audio otomatis pada 10 menit, 5 menit, 1 menit, dan hitungan mundur 10 detik.
          </p>
        </div>

        {/* Preset Selector */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            type="button"
            onClick={() => applyPreset('quick')}
            className="px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300 hover:text-white cursor-pointer"
          >
            ⚡ Quick (15m)
          </button>
          <button
            type="button"
            onClick={() => applyPreset('normal')}
            className="px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300 hover:text-white cursor-pointer"
          >
            📚 Normal (25m)
          </button>
          <button
            type="button"
            onClick={() => applyPreset('deep')}
            className="px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300 hover:text-white cursor-pointer"
          >
            🔥 Deep (50m)
          </button>
          <button
            type="button"
            onClick={() => applyPreset('full')}
            className="px-2.5 py-1.5 rounded-xl bg-rose-950 border border-rose-500 text-xs font-bold text-white cursor-pointer"
          >
            🏆 Full (120m)
          </button>
          <button
            type="button"
            onClick={() => setShowCustomModal(true)}
            className="p-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white cursor-pointer"
            title="Custom Timer"
          >
            <Settings2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Big Circular Timer Display */}
      <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-8 shadow-2xl relative overflow-hidden flex flex-col items-center justify-center spider-glow">
        {/* Background glow circle */}
        <div className="absolute inset-0 bg-radial from-rose-600/10 via-transparent to-transparent pointer-events-none" />

        {/* Phase Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-xs font-bold text-cyan-300 mb-6">
          <span>{currentPhase.icon}</span>
          <span>{currentPhase.name}</span>
        </div>

        {/* Giant Timer Number */}
        <div className="relative my-2">
          <div className="text-6xl sm:text-8xl font-black font-mono-numbers text-white tracking-wider drop-shadow-[0_0_20px_rgba(225,29,72,0.5)]">
            {formatTime(remainingSec)}
          </div>
        </div>

        {/* Linear Progress Bar */}
        <div className="w-full max-w-md mt-6 space-y-1.5">
          <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden p-0.5 border border-slate-700">
            <motion.div
              animate={{ width: `${Math.round(progressRatio * 100)}%` }}
              transition={{ duration: 0.5 }}
              className="h-full rounded-full bg-gradient-to-r from-rose-600 via-rose-500 to-cyan-400 shadow-[0_0_12px_rgba(225,29,72,0.8)]"
            />
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono-numbers">
            <span>Sesi {currentPhaseIndex + 1} dari {phases.length}</span>
            <span>{Math.round(progressRatio * 100)}% Berjalan</span>
          </div>
        </div>

        {/* Controls: Play/Pause, Reset, Skip */}
        <div className="mt-8 flex items-center gap-4">
          <button
            type="button"
            onClick={handleReset}
            className="p-3 rounded-2xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
            title="Reset Sesi"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={toggleTimer}
            className="w-16 h-16 rounded-3xl bg-gradient-to-br from-rose-600 to-rose-500 text-white flex items-center justify-center shadow-xl shadow-rose-950 hover:brightness-110 active:scale-90 transition-all cursor-pointer"
          >
            {isRunning ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 ml-0.5" />}
          </button>

          <button
            type="button"
            onClick={handleSkip}
            className="p-3 rounded-2xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
            title="Lewati ke Sesi Berikutnya"
          >
            <SkipForward className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Phase Timeline Chain */}
      <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
          Rangkaian Sesi Bertahap:
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {phases.map((ph, idx) => {
            const isDone = idx < currentPhaseIndex;
            const isCurrent = idx === currentPhaseIndex;
            return (
              <div
                key={idx}
                onClick={() => {
                  sound.playTap();
                  setCurrentPhaseIndex(idx);
                  setRemainingSec(ph.durationSec);
                }}
                className={`p-3 rounded-2xl border text-left cursor-pointer transition-all ${
                  isCurrent
                    ? 'bg-rose-950/80 border-rose-500 text-white spider-glow'
                    : isDone
                    ? 'bg-emerald-950/30 border-emerald-500/40 text-slate-300'
                    : 'bg-slate-800/40 border-slate-800 text-slate-400 hover:border-slate-600'
                }`}
              >
                <div className="text-lg mb-1">{ph.icon}</div>
                <div className="text-xs font-bold truncate">{ph.name}</div>
                <div className="text-[10px] font-mono-numbers mt-0.5">
                  {Math.round(ph.durationSec / 60)} Menit
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Smart Break Screen Modal */}
      <AnimatePresence>
        {showSmartBreak && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-md rounded-3xl bg-slate-900 border border-cyan-500/40 p-6 text-center shadow-2xl spider-glow relative"
            >
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-3xl">
                ☕
              </div>

              <h3 className="text-xl font-black font-heading text-white mb-1">
                SMART REST BREAK
              </h3>
              <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                "Jangan dipaksakan. Istirahat sejenak 5 menit, regangkan mata, minum air putih bersama Araki!"
              </p>

              <div className="flex justify-center mb-6">
                <MascotSpider mood="resting" speechText="Santai dulu sejenak, Ila!" size="lg" />
              </div>

              <button
                type="button"
                onClick={() => {
                  sound.playTap();
                  setShowSmartBreak(false);
                }}
                className="w-full py-3 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-lg shadow-cyan-950 cursor-pointer"
              >
                Lanjutkan Misi Belajar ⚡
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Custom Timer Config Modal */}
      <AnimatePresence>
        {showCustomModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-sm rounded-3xl bg-slate-900 border border-slate-800 p-6 text-slate-100 shadow-2xl space-y-4"
            >
              <h3 className="font-bold text-sm text-white">Atur Custom Timer</h3>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="text-slate-400 block mb-1">Durasi Teori (menit):</label>
                  <input
                    type="number"
                    value={customTeori}
                    onChange={(e) => setCustomTeori(parseInt(e.target.value) || 1)}
                    className="w-full p-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Durasi Blurting (menit):</label>
                  <input
                    type="number"
                    value={customBlurting}
                    onChange={(e) => setCustomBlurting(parseInt(e.target.value) || 1)}
                    className="w-full p-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Durasi Break (menit):</label>
                  <input
                    type="number"
                    value={customBreak}
                    onChange={(e) => setCustomBreak(parseInt(e.target.value) || 1)}
                    className="w-full p-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Durasi Latihan (menit):</label>
                  <input
                    type="number"
                    value={customLatihan}
                    onChange={(e) => setCustomLatihan(parseInt(e.target.value) || 1)}
                    className="w-full p-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Durasi Review (menit):</label>
                  <input
                    type="number"
                    value={customReview}
                    onChange={(e) => setCustomReview(parseInt(e.target.value) || 1)}
                    className="w-full p-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowCustomModal(false)}
                  className="px-3 py-1.5 rounded-xl text-xs text-slate-400 hover:text-white"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={saveCustomTimer}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold cursor-pointer"
                >
                  Simpan Timer
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
