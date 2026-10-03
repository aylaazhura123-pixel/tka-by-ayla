import React from 'react';
import { motion } from 'motion/react';
import { Lock, CheckCircle2, Star, Trophy, Sparkles, ChevronRight } from 'lucide-react';
import { UserProgress } from '../types';
import { sound } from '../services/soundEngine';

interface MissionMapViewProps {
  progress: UserProgress;
  onSelectTab: (tab: string, topicId?: string) => void;
}

export const MissionMapView: React.FC<MissionMapViewProps> = ({ progress, onSelectTab }) => {
  const mapNodes = [
    {
      id: 'node-start',
      level: 1,
      title: 'START: Induction Mission',
      subtitle: 'Pengenalan Sistem & Blueprint TKA',
      icon: '🕷️',
      unlocked: true,
      completed: true,
      stars: 3,
      targetTab: 'home',
    },
    {
      id: 'node-basic',
      level: 2,
      title: '📚 Basic Foundation',
      subtitle: 'Bilangan Real, Kaidah Serapan & Ekonomi Dasar',
      icon: '📖',
      unlocked: true,
      completed: progress.completedTopicIds.length >= 2,
      stars: progress.completedTopicIds.length >= 2 ? 3 : 1,
      targetTab: 'materi',
    },
    {
      id: 'node-concept',
      level: 3,
      title: '🧠 Concept Master (Active Recall)',
      subtitle: 'Blurting Method & Pemetaan Persamaan Aljabar',
      icon: '🧠',
      unlocked: progress.completedTopicIds.length >= 2,
      completed: progress.completedBlurtingIds.length >= 2,
      stars: progress.completedBlurtingIds.length >= 2 ? 3 : 0,
      targetTab: 'blurting',
    },
    {
      id: 'node-practice',
      level: 4,
      title: '🎯 Tactical Practice',
      subtitle: 'Latihan Eksekusi Soal Cepat & Akurasi',
      icon: '🎯',
      unlocked: progress.completedBlurtingIds.length >= 1,
      completed: progress.solvedQuestionIds.length >= 5,
      stars: progress.solvedQuestionIds.length >= 5 ? 3 : 1,
      targetTab: 'latihan',
    },
    {
      id: 'node-hots',
      level: 5,
      title: '🔥 HOTS High-Stakes Battle',
      subtitle: 'Penalaran Kompleks SPLTV & Teori Konflik',
      icon: '⚡',
      unlocked: progress.solvedQuestionIds.length >= 3,
      completed: progress.solvedQuestionIds.length >= 10,
      stars: progress.solvedQuestionIds.length >= 10 ? 3 : 0,
      targetTab: 'latihan',
    },
    {
      id: 'node-timed',
      level: 6,
      title: '⏱️ Timed Battle Mission',
      subtitle: 'Simulasi Waktu Nyata 2 Jam Ujian',
      icon: '⏱️',
      unlocked: progress.currentDay >= 8,
      completed: progress.currentDay >= 14,
      stars: progress.currentDay >= 14 ? 3 : 0,
      targetTab: 'timer',
    },
    {
      id: 'node-final',
      level: 7,
      title: '🏆 FINAL MASTER TKA 2026',
      subtitle: 'Puncak Misi Penguasaan Sempurna 17 Hari',
      icon: '👑',
      unlocked: progress.currentDay >= 16,
      completed: progress.currentDay >= 17,
      stars: progress.currentDay >= 17 ? 3 : 0,
      targetTab: 'tryout',
    },
  ];

  return (
    <div className="space-y-6 pb-28">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 mb-1">
          <span>🗺️ GAME PROGRESSION MAP</span>
          <span className="text-slate-500">·</span>
          <span>17 DAYS EXPEDITION</span>
        </div>
        <h2 className="text-2xl font-black font-heading text-white tracking-tight">
          Peta Misi Superhero TKA
        </h2>
        <p className="text-xs text-slate-300">
          Setiap simpul mewakili tahapan evolusi pemahamanmu menuju skor maksimal.
        </p>
      </div>

      {/* Spider Web Roadmap Tree */}
      <div className="max-w-xl mx-auto relative py-6">
        {/* Central Vertical Spider Silk Strand */}
        <div className="absolute top-8 bottom-8 left-1/2 -translate-x-1/2 w-1 bg-gradient-to-b from-rose-500 via-cyan-400 to-amber-400 rounded-full shadow-[0_0_12px_rgba(225,29,72,0.6)]" />

        <div className="space-y-10 relative z-10">
          {mapNodes.map((node, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={node.id}
                className={`flex items-center gap-4 ${isEven ? 'flex-row' : 'flex-row-reverse'}`}
              >
                {/* Node Card */}
                <div
                  onClick={() => {
                    if (node.unlocked) {
                      sound.playTap();
                      onSelectTab(node.targetTab);
                    }
                  }}
                  className={`w-1/2 p-4 rounded-3xl border transition-all cursor-pointer relative select-none ${
                    node.completed
                      ? 'bg-slate-900/90 border-emerald-500/50 shadow-lg shadow-emerald-950/30'
                      : node.unlocked
                      ? 'bg-slate-900/90 border-rose-500/60 spider-glow'
                      : 'bg-slate-900/40 border-slate-800 opacity-60 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400">
                      STAGE {node.level}
                    </span>

                    {/* Star ratings */}
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3].map((s) => (
                        <Star
                          key={s}
                          className={`w-3 h-3 ${
                            s <= node.stars
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-slate-700'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <h3 className="text-xs sm:text-sm font-bold text-white mb-0.5">{node.title}</h3>
                  <p className="text-[10px] text-slate-400 line-clamp-2">{node.subtitle}</p>

                  <div className="mt-2.5 pt-2 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-[10px] font-semibold text-cyan-400">
                      {node.completed ? 'Selesai ✓' : node.unlocked ? 'Tersedia ⚡' : 'Terkunci 🔒'}
                    </span>
                    {node.unlocked && <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
                  </div>
                </div>

                {/* Center Node Emblem */}
                <div className="w-12 h-12 rounded-full bg-slate-900 border-2 border-slate-700 flex items-center justify-center shrink-0 z-20 shadow-md">
                  {node.completed ? (
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-lg">
                      {node.icon}
                    </div>
                  ) : node.unlocked ? (
                    <div className="w-10 h-10 rounded-full bg-rose-500/20 border border-rose-400 flex items-center justify-center text-lg animate-pulse">
                      {node.icon}
                    </div>
                  ) : (
                    <Lock className="w-4 h-4 text-slate-600" />
                  )}
                </div>

                {/* Empty half for staggered balance */}
                <div className="w-1/2" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
