import React from 'react';
import { motion } from 'motion/react';
import { Flame, Zap, Trophy, BookOpen, Target, CheckCircle2, Circle, ArrowRight, Play, Sparkles, Brain, Clock, ShieldCheck } from 'lucide-react';
import { UserProgress, DailyTask } from '../types';
import { DAILY_SCHEDULE, TOPICS } from '../data/curriculumData';
import { MascotSpider } from '../components/MascotSpider';
import { sound } from '../services/soundEngine';
import confetti from 'canvas-confetti';

interface HomeDashboardProps {
  progress: UserProgress;
  onUpdateTasks: (tasks: DailyTask[]) => void;
  onSelectTab: (tab: string, topicId?: string) => void;
  onAddXp: (amount: number) => void;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  progress,
  onUpdateTasks,
  onSelectTab,
  onAddXp,
}) => {
  const completedTasksCount = progress.dailyTasks.filter((t) => t.completed).length;
  const progressPercent = Math.round((progress.currentDay / 17) * 100);
  const accuracy = progress.solvedQuestionIds.length > 0
    ? Math.round((progress.correctCount / progress.solvedQuestionIds.length) * 100)
    : 100;

  const handleToggleTask = (taskId: string) => {
    sound.playTap();
    const task = progress.dailyTasks.find((t) => t.id === taskId);
    if (!task) return;

    const isNowCompleted = !task.completed;
    const updated = progress.dailyTasks.map((t) =>
      t.id === taskId ? { ...t, completed: isNowCompleted } : t
    );

    onUpdateTasks(updated);

    if (isNowCompleted) {
      sound.playXp();
      onAddXp(task.xp);
      confetti({
        particleCount: 25,
        spread: 45,
        origin: { y: 0.8 },
        colors: ['#e11d48', '#38bdf8', '#fbbf24'],
      });
    }
  };

  const todaysTopic = TOPICS.find((t) => t.day === progress.currentDay) || TOPICS[0];

  return (
    <div className="space-y-6 pb-24">
      {/* Top Hero Banner */}
      <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-[#13111C] to-rose-950/40 border border-rose-500/30 p-5 sm:p-7 overflow-hidden spider-glow">
        {/* Spider Web Background Aesthetic Accent */}
        <div className="absolute -top-10 -right-10 w-44 h-44 bg-rose-600/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-cyan-500/10 rounded-full blur-xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left flex-1">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-rose-400">
              <span>🕷️ TKA.2026</span>
              <span className="text-slate-500">·</span>
              <span className="text-cyan-400">MASTERY MISSION</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black font-heading tracking-tight text-white">
              Hai, {progress.name}! 👋
            </h1>
            <p className="text-sm text-slate-300 max-w-md">
              "17 Hari. Satu Misi. Kuasai TKA." Siap taklukkan target belajarmu hari ini?
            </p>

            {/* Day Progress Meter */}
            <div className="pt-2 max-w-sm">
              <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
                <span className="text-slate-300 font-bold">DAY {progress.currentDay.toString().padStart(2, '0')} / 17</span>
                <span className="font-mono-numbers text-rose-400 font-bold">{progressPercent}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700/60">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="h-full rounded-full bg-gradient-to-r from-rose-600 via-rose-500 to-cyan-400 shadow-[0_0_10px_rgba(225,29,72,0.8)]"
                />
              </div>
            </div>
          </div>

          {/* Araki Mascot Interactive Display */}
          <div className="shrink-0 flex flex-col items-center">
            <MascotSpider
              mood={completedTasksCount === 5 ? 'celebrate' : 'idle'}
              speechText={
                completedTasksCount === 5
                  ? 'Misi hari ini tuntas, Ila! Hebat! 🎉'
                  : 'Klik aku untuk semangat!'
              }
              size="lg"
            />
          </div>
        </div>

        {/* Quick Launch CTA Bar */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Materi Hari Ini:</span>
            <span className="font-bold text-white">{todaysTopic.title}</span>
          </div>

          <button
            type="button"
            onClick={() => onSelectTab('detail_materi', todaysTopic.id)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-rose-500 text-white text-xs font-bold shadow-md shadow-rose-950 hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span>Buka Materi Teori</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 6 Key Metrics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-950/60 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
            <Flame className="w-4 h-4 fill-amber-400" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400 font-medium">Daily Streak</div>
            <div className="text-base font-bold text-white font-mono-numbers">{progress.streak} Hari</div>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-cyan-950/60 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0">
            <Zap className="w-4 h-4 fill-cyan-400" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400 font-medium">Total Energi</div>
            <div className="text-base font-bold text-white font-mono-numbers">{progress.xp} XP</div>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-rose-950/60 border border-rose-500/40 flex items-center justify-center text-rose-400 shrink-0">
            <Trophy className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400 font-medium">Level Gelar</div>
            <div className="text-base font-bold text-white font-mono-numbers">Lvl {progress.level}</div>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-950/60 border border-indigo-500/40 flex items-center justify-center text-indigo-400 shrink-0">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400 font-medium">Materi Selesai</div>
            <div className="text-base font-bold text-white font-mono-numbers">{progress.completedTopicIds.length} Bab</div>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-950/60 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
            <Target className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400 font-medium">Soal Dijawab</div>
            <div className="text-base font-bold text-white font-mono-numbers">{progress.solvedQuestionIds.length} Soal</div>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-purple-950/60 border border-purple-500/40 flex items-center justify-center text-purple-400 shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400 font-medium">Akurasi</div>
            <div className="text-base font-bold text-white font-mono-numbers">{accuracy}%</div>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Today's Mission vs Daily Schedule */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* TODAY'S MISSION CHECKLIST */}
        <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-5 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3 pb-3 border-b border-slate-800">
              <div>
                <h3 className="font-heading font-black text-base text-white flex items-center gap-2">
                  <span>🎯 TODAY'S MISSION</span>
                </h3>
                <p className="text-[11px] text-slate-400">Selesaikan misi untuk mendapatkan tambahan XP!</p>
              </div>
              <div className="text-xs font-bold px-2.5 py-1 rounded-full bg-rose-950 text-rose-300 border border-rose-500/30">
                {completedTasksCount} / {progress.dailyTasks.length} selesai
              </div>
            </div>

            <div className="space-y-2 mt-4">
              {progress.dailyTasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => handleToggleTask(task.id)}
                  className={`flex items-center justify-between p-3 rounded-2xl border transition-all cursor-pointer select-none active:scale-[0.98] ${
                    task.completed
                      ? 'bg-emerald-950/30 border-emerald-500/40 text-slate-200'
                      : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:border-slate-500'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {task.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 fill-emerald-950 shrink-0" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-500 shrink-0" />
                    )}
                    <span className={`text-xs font-medium ${task.completed ? 'line-through text-slate-400' : ''}`}>
                      {task.title}
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-cyan-400 shrink-0">
                    +{task.xp} XP
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-400">Mau langsung latihan aktif?</span>
            <button
              type="button"
              onClick={() => onSelectTab('blurting', todaysTopic.id)}
              className="px-3.5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow-md shadow-cyan-950 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Brain className="w-3.5 h-3.5" />
              <span>Mulai Blurting Lab</span>
            </button>
          </div>
        </div>

        {/* DAILY STUDY PLAN */}
        <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-5 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3 pb-3 border-b border-slate-800">
              <div>
                <h3 className="font-heading font-black text-base text-white flex items-center gap-2">
                  <span>⏱️ DAILY STUDY PLAN</span>
                </h3>
                <p className="text-[11px] text-slate-400">Jadwal intensif rekomendasi terstruktur</p>
              </div>
              <span className="text-xs font-mono-numbers text-cyan-400 font-semibold">2 Jam Penuh</span>
            </div>

            <div className="space-y-2 mt-3">
              {DAILY_SCHEDULE.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-800/40 border border-slate-800 hover:border-slate-700 transition-colors"
                >
                  <div className="text-xs font-mono-numbers font-bold text-rose-400 w-12 shrink-0 pt-0.5">
                    {item.time}
                  </div>
                  <div className="text-base shrink-0 pt-0.5">{item.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-slate-100">{item.title}</h4>
                      {item.durationMin > 0 && (
                        <span className="text-[10px] text-slate-400">{item.durationMin}m</span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 leading-tight mt-0.5 truncate">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Late helper banner */}
          <div className="mt-4 p-3 rounded-2xl bg-rose-950/30 border border-rose-500/30 flex items-center justify-between gap-2">
            <div className="text-[11px] text-rose-300">
              <span className="font-bold">Terlambat mulai?</span> Tenang, kita lanjut dari sesi terakhir!
            </div>
            <button
              type="button"
              onClick={() => onSelectTab('timer')}
              className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-[11px] font-bold shadow-md cursor-pointer whitespace-nowrap"
            >
              Lanjutkan Misi
            </button>
          </div>
        </div>
      </div>

      {/* Quick Access Grid (Notebook, Error Bank, HOTS, Map, Game, AI Tutor) */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
          Akses Cepat Fitur Utama & Mini Game
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <button
            type="button"
            onClick={() => onSelectTab('game')}
            className="p-3.5 rounded-2xl bg-gradient-to-br from-amber-950/40 via-rose-950/30 to-slate-900 border border-amber-500/40 text-left hover:border-amber-400 transition-all cursor-pointer group active:scale-95 spider-glow"
          >
            <div className="text-2xl mb-1.5 group-hover:scale-110 transition-transform">🎮</div>
            <div className="text-xs font-bold text-white">Memory Game</div>
            <div className="text-[10px] text-amber-300 mt-0.5">Tebak & cocokkan kartu konsep</div>
          </button>

          <button
            type="button"
            onClick={() => onSelectTab('ai_tutor')}
            className="p-3.5 rounded-2xl bg-gradient-to-br from-cyan-950/40 via-slate-900 to-slate-900 border border-cyan-500/40 text-left hover:border-cyan-400 transition-all cursor-pointer group active:scale-95 blue-glow"
          >
            <div className="text-2xl mb-1.5 group-hover:scale-110 transition-transform">🤖</div>
            <div className="text-xs font-bold text-white">AI Tutor ChatGPT</div>
            <div className="text-[10px] text-cyan-300 mt-0.5">Tanya materi & pecahkan soal</div>
          </button>

          <button
            type="button"
            onClick={() => onSelectTab('notebook')}
            className="p-3.5 rounded-2xl bg-gradient-to-br from-[#fdfbf7]/10 to-amber-950/20 border border-amber-500/30 text-left hover:border-amber-400 transition-all cursor-pointer group active:scale-95"
          >
            <div className="text-2xl mb-1.5 group-hover:scale-110 transition-transform">📓</div>
            <div className="text-xs font-bold text-white">Digital Notebook</div>
            <div className="text-[10px] text-amber-300/80 mt-0.5">Catatan fisik estetik kotak-kotak</div>
          </button>

          <button
            type="button"
            onClick={() => onSelectTab('latihan')}
            className="p-3.5 rounded-2xl bg-gradient-to-br from-rose-950/30 to-red-900/10 border border-rose-500/30 text-left hover:border-rose-400 transition-all cursor-pointer group active:scale-95"
          >
            <div className="text-2xl mb-1.5 group-hover:scale-110 transition-transform">⚡</div>
            <div className="text-xs font-bold text-white">HOTS Battle</div>
            <div className="text-[10px] text-rose-300/80 mt-0.5">Latihan soal dengan animasi jaring</div>
          </button>

          <button
            type="button"
            onClick={() => onSelectTab('error_bank')}
            className="p-3.5 rounded-2xl bg-gradient-to-br from-purple-950/30 to-slate-900 border border-purple-500/30 text-left hover:border-purple-400 transition-all cursor-pointer group active:scale-95"
          >
            <div className="text-2xl mb-1.5 group-hover:scale-110 transition-transform">❌</div>
            <div className="text-xs font-bold text-white">Error Bank</div>
            <div className="text-[10px] text-purple-300/80 mt-0.5">{progress.errorBank.length} soal tersimpan</div>
          </button>

          <button
            type="button"
            onClick={() => onSelectTab('map')}
            className="p-3.5 rounded-2xl bg-gradient-to-br from-cyan-950/30 to-sky-900/10 border border-cyan-500/30 text-left hover:border-cyan-400 transition-all cursor-pointer group active:scale-95"
          >
            <div className="text-2xl mb-1.5 group-hover:scale-110 transition-transform">🗺️</div>
            <div className="text-xs font-bold text-white">Mission Map</div>
            <div className="text-[10px] text-cyan-300/80 mt-0.5">Game road map 17 hari</div>
          </button>
        </div>
      </div>
    </div>
  );
};
