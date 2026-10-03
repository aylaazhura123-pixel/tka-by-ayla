import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Volume2, Music, User, RotateCcw, Save, ShieldAlert, Sparkles } from 'lucide-react';
import { UserProgress } from '../types';
import { sound } from '../services/soundEngine';

interface SettingsModalProps {
  progress: UserProgress;
  isOpen: boolean;
  onClose: () => void;
  onUpdateProfile: (name: string, targetMajor: string) => void;
  onResetProgress: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  progress,
  isOpen,
  onClose,
  onUpdateProfile,
  onResetProgress,
}) => {
  const [name, setName] = useState(progress.name);
  const [targetMajor, setTargetMajor] = useState(progress.targetMajor);

  if (!isOpen) return null;

  const handleSave = () => {
    sound.playCorrect();
    onUpdateProfile(name, targetMajor);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 15 }}
        className="w-full max-w-md rounded-3xl bg-slate-900 border border-slate-800 p-6 text-slate-100 shadow-2xl space-y-5"
      >
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-rose-950 border border-rose-500/40 flex items-center justify-center text-rose-400">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">Profil & Preferensi Superhero</h3>
              <p className="text-[11px] text-slate-400">TKA 17 Days — Mastery Mission</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Profile Inputs */}
        <div className="space-y-3 text-xs">
          <div>
            <label className="text-slate-300 font-semibold block mb-1">Nama Panggilan Siswa:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ila"
              className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-medium focus:outline-none focus:border-rose-500"
            />
          </div>

          <div>
            <label className="text-slate-300 font-semibold block mb-1">Target Jurusan & Kampus Impian:</label>
            <input
              type="text"
              value={targetMajor}
              onChange={(e) => setTargetMajor(e.target.value)}
              placeholder="Kedokteran UI / STEI ITB / Manajemen UGM"
              className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-medium focus:outline-none focus:border-rose-500"
            />
          </div>
        </div>

        {/* Background Music Shortcut */}
        <div className="p-3 rounded-2xl bg-amber-950/30 border border-amber-500/30 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center text-base">
              🎵
            </div>
            <div>
              <div className="text-xs font-bold text-white">Suara & Musik Latar</div>
              <div className="text-[10px] text-amber-300">Sunflower, YouTube, atau MP3</div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              onClose();
              window.dispatchEvent(new CustomEvent('open-music-modal'));
            }}
            className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs cursor-pointer shadow-md transition-all active:scale-95"
          >
            Ubah Musik
          </button>
        </div>

        {/* System & Reset Options */}
        <div className="pt-3 border-t border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">Penyimpanan Data Lokal:</span>
            <span className="text-emerald-400 font-bold">LocalStorage Aktif ✓</span>
          </div>

          <button
            type="button"
            onClick={() => {
              if (confirm('Yakin ingin mereset seluruh progres belajar ke hari ke-1?')) {
                onResetProgress();
                onClose();
              }
            }}
            className="w-full py-2 px-3 rounded-xl border border-rose-500/30 text-rose-400 hover:bg-rose-950/40 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Progres Ujian & Streak</span>
          </button>
        </div>

        {/* Save button */}
        <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
          >
            Tutup
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-md shadow-rose-950 cursor-pointer flex items-center gap-1.5"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Simpan Profil</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
