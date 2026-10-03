import React from 'react';
import { motion } from 'motion/react';
import { Flame, Zap, Trophy, Clock, Target, BookOpen, Brain, CheckCircle, Award, Star } from 'lucide-react';
import { UserProgress } from '../types';

interface ProgressViewProps {
  progress: UserProgress;
}

export const ProgressView: React.FC<ProgressViewProps> = ({ progress }) => {
  const hours = Math.floor(progress.studyTimeSeconds / 3600);
  const minutes = Math.floor((progress.studyTimeSeconds % 3600) / 60);

  const totalQuestions = progress.solvedQuestionIds.length;
  const accuracy = totalQuestions > 0 ? Math.round((progress.correctCount / totalQuestions) * 100) : 100;

  // Mock weekly study time distribution
  const weekDays = [
    { day: 'Sen', hours: 2.5, height: '65%' },
    { day: 'Sel', hours: 3.0, height: '80%' },
    { day: 'Rab', hours: 3.8, height: '95%' },
    { day: 'Kam', hours: 2.2, height: '55%' },
    { day: 'Jum', hours: 4.0, height: '100%' },
    { day: 'Sab', hours: 3.5, height: '85%' },
    { day: 'Min', hours: 2.8, height: '70%' },
  ];

  const subjectAccuracies = [
    { name: 'Matematika', acc: 86, color: 'from-rose-500 to-amber-500' },
    { name: 'Bahasa Indonesia', acc: 91, color: 'from-blue-500 to-cyan-400' },
    { name: 'Ekonomi & Akuntansi', acc: 78, color: 'from-emerald-500 to-teal-400' },
    { name: 'Sosiologi & Informatika', acc: 94, color: 'from-purple-500 to-indigo-400' },
  ];

  return (
    <div className="space-y-6 pb-28">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 mb-1">
          <span>📊 METRICS & ACHIEVEMENTS</span>
          <span className="text-slate-500">·</span>
          <span>17 DAYS TRACKER</span>
        </div>
        <h2 className="text-2xl font-black font-heading text-white tracking-tight">
          Statistik Belajar & Prestasi
        </h2>
        <p className="text-xs text-slate-300">
          Evaluasi kemajuan belajar, distribusi jam fokus harian, dan pencapaian lencana kejuaraan.
        </p>
      </div>

      {/* Top 4 Big Stat Banners */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Total Waktu</span>
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <div className="text-2xl font-black text-white font-mono-numbers">
            {hours}j {minutes}m
          </div>
          <div className="text-[10px] text-slate-500">Fokus intensif</div>
        </div>

        <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Streak Aktif</span>
            <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
          </div>
          <div className="text-2xl font-black text-amber-400 font-mono-numbers">
            {progress.streak} Hari
          </div>
          <div className="text-[10px] text-slate-500">Pertahankan konsistensi!</div>
        </div>

        <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Total Energi</span>
            <Zap className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400" />
          </div>
          <div className="text-2xl font-black text-cyan-400 font-mono-numbers">
            {progress.xp} XP
          </div>
          <div className="text-[10px] text-slate-500">Level {progress.level} Hero</div>
        </div>

        <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Rerata Akurasi</span>
            <Target className="w-3.5 h-3.5 text-rose-500" />
          </div>
          <div className="text-2xl font-black text-rose-400 font-mono-numbers">
            {accuracy}%
          </div>
          <div className="text-[10px] text-slate-500">{progress.correctCount} benar / {totalQuestions} soal</div>
        </div>
      </div>

      {/* 2 Column: Weekly Chart & Subject Accuracy */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Weekly Bar Chart */}
        <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Waktu Belajar Mingguan
            </h3>
            <span className="text-[11px] font-mono-numbers text-rose-400 font-bold">Rata-rata 3.1 Jam/Hari</span>
          </div>

          <div className="h-44 flex items-end justify-between gap-2 pt-6 px-2">
            {weekDays.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <div className="text-[10px] font-mono-numbers text-slate-400">{d.hours}j</div>
                <div className="w-full max-w-[28px] bg-slate-800 rounded-t-xl overflow-hidden h-32 flex items-end">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: d.height }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                    className="w-full bg-gradient-to-t from-rose-600 to-rose-400 rounded-t-xl"
                  />
                </div>
                <span className="text-xs font-bold text-slate-400">{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Subject Accuracy Progress Bars */}
        <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Akurasi Penguasaan per Mapel
            </h3>
            <span className="text-[11px] font-mono-numbers text-cyan-400 font-bold">Target 90%+</span>
          </div>

          <div className="space-y-3.5 pt-2">
            {subjectAccuracies.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-200">{item.name}</span>
                  <span className="font-mono-numbers text-white font-bold">{item.acc}%</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden p-0.5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.acc}%` }}
                    transition={{ duration: 1, delay: idx * 0.15 }}
                    className={`h-full rounded-full bg-gradient-to-r ${item.color}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Achievement Hall / Trophy Shelf */}
      <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Gelar & Prestasi Superhero (Achievements)</span>
            </h3>
            <p className="text-[11px] text-slate-400">Raih lencana dengan menuntaskan milestone belajar!</p>
          </div>
          <span className="text-xs font-mono-numbers text-amber-400 font-bold">
            {progress.achievements.filter((a) => a.unlocked).length} / {progress.achievements.length} Terbuka
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {progress.achievements.map((ach) => (
            <div
              key={ach.id}
              className={`p-4 rounded-2xl border transition-all flex items-start gap-3 ${
                ach.unlocked
                  ? 'bg-amber-950/30 border-amber-500/50 text-white shadow-md'
                  : 'bg-slate-800/40 border-slate-800 text-slate-400 opacity-60'
              }`}
            >
              <div className="text-2xl p-2 rounded-xl bg-slate-900 border border-slate-700 shrink-0">
                {ach.icon}
              </div>
              <div>
                <div className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
                  <span>{ach.title}</span>
                  {ach.unlocked && <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                  {ach.description}
                </div>
                <div className="mt-2 text-[10px] font-mono-numbers text-cyan-400">
                  {ach.unlocked ? 'Telah Diberikan 🏆' : `Progress: ${ach.progress}/${ach.maxProgress}`}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
