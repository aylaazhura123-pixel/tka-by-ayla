import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { X, Play, Pause, RotateCcw, Shield, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { sound } from '../services/soundEngine';

interface FocusModeViewProps {
  onClose: () => void;
  onRecordStudyTime: (sec: number) => void;
}

export const FocusModeView: React.FC<FocusModeViewProps> = ({ onClose, onRecordStudyTime }) => {
  const [seconds, setSeconds] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(true);
  const [sessionTitle, setSessionTitle] = useState('Deep Focus: Penguasaan Konsep TKA');

  useEffect(() => {
    sound.startMusic('focus');
    let int: number | null = null;
    if (isRunning) {
      int = window.setInterval(() => {
        setSeconds((prev) => {
          if (prev <= 1) {
            sound.playMissionCompleteAlarm();
            setIsRunning(false);
            return 0;
          }
          onRecordStudyTime(1);
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (int) clearInterval(int);
    };
  }, [isRunning]);

  const format = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#07090e] text-slate-100 flex flex-col justify-between p-6 sm:p-10 select-none">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-cyan-400 font-bold">
          <Shield className="w-3.5 h-3.5" />
          <span>🎯 FOCUS MODE ON</span>
        </div>

        <button
          type="button"
          onClick={() => {
            sound.playTap();
            onClose();
          }}
          className="p-2 rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white cursor-pointer transition-colors"
          title="Keluar dari Focus Mode"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Center Giant Focus Timer */}
      <div className="text-center space-y-6 max-w-xl mx-auto">
        <div className="text-sm font-semibold text-rose-400 uppercase tracking-widest">
          {sessionTitle}
        </div>

        <div className="text-7xl sm:text-9xl font-black font-mono-numbers text-white tracking-widest drop-shadow-[0_0_35px_rgba(225,29,72,0.4)]">
          {format(seconds)}
        </div>

        <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
          Tutup aplikasi lain, fokus pada active recall atau penyelesaian soal. Kamu sedang dalam zona superhero!
        </p>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 pt-4">
          <button
            type="button"
            onClick={() => {
              sound.playTap();
              setSeconds(25 * 60);
            }}
            className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white cursor-pointer"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={() => {
              sound.playTap();
              setIsRunning(!isRunning);
            }}
            className="w-16 h-16 rounded-3xl bg-gradient-to-r from-rose-600 to-rose-500 text-white flex items-center justify-center shadow-2xl shadow-rose-950 hover:brightness-110 active:scale-95 cursor-pointer"
          >
            {isRunning ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 ml-0.5" />}
          </button>
        </div>
      </div>

      {/* Bottom status */}
      <div className="text-center text-[11px] text-slate-500">
        Musik Ambient Focus sedang diputar · Tekan tombol silang di kanan atas untuk kembali
      </div>
    </div>
  );
};
