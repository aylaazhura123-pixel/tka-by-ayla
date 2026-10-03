import React, { useState } from 'react';
import { Home, BookOpen, Brain, Target, Map, BarChart3, BookMarked, Timer, FileQuestion, Bot, AlertTriangle, Trophy, MoreHorizontal, Gamepad2 } from 'lucide-react';
import { sound } from '../services/soundEngine';

interface BottomNavProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  errorBankCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onSelectTab, errorBankCount }) => {
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const mainTabs = [
    { id: 'home', label: 'Beranda', icon: Home },
    { id: 'materi', label: 'Materi', icon: BookOpen },
    { id: 'blurting', label: 'Blurting', icon: Brain },
    { id: 'latihan', label: 'Latihan', icon: Target },
    { id: 'map', label: 'Peta', icon: Map },
    { id: 'progress', label: 'Progres', icon: BarChart3 },
  ];

  const moreTabs = [
    { id: 'game', label: 'Game & Flashcards', icon: Gamepad2, badge: 'HOT' },
    { id: 'ai_tutor', label: 'AI Tutor ChatGPT', icon: Bot, badge: 'AI' },
    { id: 'notebook', label: 'Notebook Estetik', icon: BookMarked, badge: 'New' },
    { id: 'timer', label: 'Timer Misi & Alarm', icon: Timer, badge: '' },
    { id: 'tryout', label: 'Simulasi Tryout', icon: FileQuestion, badge: 'TKA' },
    { id: 'error_bank', label: 'Error Bank', icon: AlertTriangle, count: errorBankCount },
    { id: 'achievements', label: 'Prestasi & Gelar', icon: Trophy, badge: '' },
  ];

  const handleTabClick = (tabId: string) => {
    sound.playTap();
    onSelectTab(tabId);
    setShowMoreMenu(false);
  };

  return (
    <>
      {/* Extended Menu Sheet */}
      {showMoreMenu && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={() => setShowMoreMenu(false)}
        >
          <div
            className="absolute bottom-20 left-4 right-4 max-w-md mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-4 shadow-2xl animate-in slide-in-from-bottom-5 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 px-2 mb-3">
              <span className="text-xs font-bold text-slate-300">Menu Tambahan Superhero</span>
              <span className="text-[11px] text-rose-400 font-semibold">TKA 2026</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {moreTabs.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleTabClick(item.id)}
                    className={`flex items-center gap-2.5 p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                      isActive
                        ? 'bg-rose-950/80 border-rose-500/80 text-white spider-glow'
                        : 'bg-slate-800/70 border-slate-800 text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-rose-400" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold truncate text-slate-100">{item.label}</div>
                      {item.count !== undefined && item.count > 0 ? (
                        <div className="text-[10px] text-rose-400 font-bold">{item.count} kesalahan</div>
                      ) : item.badge ? (
                        <div className="text-[9px] text-cyan-400 font-semibold">{item.badge}</div>
                      ) : (
                        <div className="text-[10px] text-slate-500">Buka menu</div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Fixed Bottom Tab Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#0b0d14]/95 backdrop-blur-md border-t border-slate-800/80 pb-safe">
        <div className="max-w-md mx-auto grid grid-cols-7 items-center h-16 px-1">
          {mainTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleTabClick(tab.id)}
                className={`flex flex-col items-center justify-center h-full relative cursor-pointer group active:scale-90 transition-transform ${
                  isActive ? 'text-rose-400 font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <div
                  className={`p-1.5 rounded-xl transition-all ${
                    isActive
                      ? 'bg-rose-950/90 text-rose-400 border border-rose-500/40 spider-glow scale-110'
                      : 'group-hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[10px] tracking-tight mt-0.5 truncate max-w-full px-0.5">
                  {tab.label}
                </span>

                {/* Active indicator dot */}
                {isActive && (
                  <span className="absolute bottom-1 w-1 h-1 rounded-full bg-rose-500 shadow-[0_0_6px_#f43f5e]" />
                )}
              </button>
            );
          })}

          {/* More menu trigger */}
          <button
            type="button"
            onClick={() => {
              sound.playTap();
              setShowMoreMenu(!showMoreMenu);
            }}
            className={`flex flex-col items-center justify-center h-full relative cursor-pointer active:scale-90 transition-transform ${
              showMoreMenu || moreTabs.some((t) => t.id === activeTab)
                ? 'text-cyan-400 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <div
              className={`p-1.5 rounded-xl transition-all ${
                showMoreMenu || moreTabs.some((t) => t.id === activeTab)
                  ? 'bg-cyan-950/80 text-cyan-400 border border-cyan-500/40 blue-glow scale-110'
                  : 'hover:bg-slate-800/50'
              }`}
            >
              <MoreHorizontal className="w-4 h-4" />
            </div>
            <span className="text-[10px] tracking-tight mt-0.5">Lainnya</span>

            {errorBankCount > 0 && (
              <span className="absolute top-2 right-3 w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_5px_#f43f5e]" />
            )}
          </button>
        </div>
      </nav>
    </>
  );
};
