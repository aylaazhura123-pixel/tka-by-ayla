import React from 'react';
import { Flame, Zap, Shield, Sparkles, BookOpen, Music } from 'lucide-react';
import { UserProgress } from '../types';

interface NavbarProps {
  progress: UserProgress;
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onOpenSettings: () => void;
  onToggleFocus: () => void;
  isFocusMode: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  progress,
  activeTab,
  onSelectTab,
  onOpenSettings,
  onToggleFocus,
  isFocusMode,
}) => {
  return (
    <header className="sticky top-0 z-30 w-full bg-[#0b0d14]/90 backdrop-blur-md border-b border-slate-800/80 px-4 py-2.5 transition-all">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
        {/* Zone 1: Wordmark & Logo */}
        <div className="flex items-center gap-2.5 cursor-pointer shrink-0" onClick={() => onSelectTab('home')}>
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-rose-600 via-rose-500 to-cyan-500 p-0.5 shadow-[0_0_15px_rgba(225,29,72,0.4)] flex items-center justify-center">
            <span className="text-sm">🕷️</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-heading font-black text-sm tracking-tight text-white">TKA 17 DAYS</span>
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-rose-950 text-rose-300 border border-rose-500/40">2026</span>
            </div>
          </div>
        </div>

        {/* Zone 2: Navigation Links (Desktop) / Metrics */}
        <div className="flex items-center gap-3">
          {/* Day Indicator */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-xs">
            <span className="text-slate-400">Day</span>
            <span className="font-mono-numbers font-bold text-rose-400">
              {progress.currentDay.toString().padStart(2, '0')}
            </span>
            <span className="text-slate-500">/ 17</span>
          </div>

          {/* Streak */}
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-950/40 border border-amber-500/30 text-xs text-amber-300">
            <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-500 animate-pulse" />
            <span className="font-mono-numbers font-bold">{progress.streak}</span>
          </div>

          {/* XP */}
          <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-xs text-cyan-300">
            <Zap className="w-3.5 h-3.5 fill-cyan-400 text-cyan-500" />
            <span className="font-mono-numbers font-bold">{progress.xp} XP</span>
          </div>
        </div>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Quick Change Music Button */}
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent('open-music-modal'))}
            className="px-2.5 py-1.5 rounded-xl text-xs font-semibold border bg-slate-900 border-amber-500/40 text-amber-300 hover:bg-amber-950/40 hover:border-amber-400 transition-all cursor-pointer flex items-center gap-1.5 shadow-[0_0_8px_rgba(245,158,11,0.2)]"
            title="Ganti Suara / Lagu Latar (Sunflower / YouTube / MP3)"
          >
            <Music className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span className="hidden sm:inline">Ganti Musik</span>
          </button>

          {/* Focus Mode button */}
          <button
            type="button"
            onClick={onToggleFocus}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1 ${
              isFocusMode
                ? 'bg-cyan-950/80 border-cyan-400 text-cyan-300 spider-glow'
                : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
            title="Focus Mode"
          >
            <Shield className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden md:inline">{isFocusMode ? 'Focus ON' : 'Focus'}</span>
          </button>

          {/* Profile / Settings */}
          <button
            type="button"
            onClick={onOpenSettings}
            className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-xs font-bold text-rose-400 hover:border-rose-500/50 transition-colors cursor-pointer"
            title="Profil & Pengaturan"
          >
            IL
          </button>
        </div>
      </div>
    </header>
  );
};
