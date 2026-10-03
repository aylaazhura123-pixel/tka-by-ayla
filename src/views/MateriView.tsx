import React, { useState } from 'react';
import { Search, BookOpen, ChevronRight, CheckCircle, Clock, Zap, Sparkles } from 'lucide-react';
import { Topic, SubjectId, UserProgress } from '../types';
import { TOPICS } from '../data/curriculumData';
import { sound } from '../services/soundEngine';

interface MateriViewProps {
  progress: UserProgress;
  onSelectTopic: (topicId: string) => void;
  onSelectTab: (tab: string, topicId?: string) => void;
}

export const MateriView: React.FC<MateriViewProps> = ({
  progress,
  onSelectTopic,
  onSelectTab,
}) => {
  const [activeSubject, setActiveSubject] = useState<SubjectId | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const subjects = [
    { id: 'all', name: 'Semua Bab', icon: '🕷️' },
    { id: 'matematika', name: 'Matematika', icon: '📐' },
    { id: 'indonesia', name: 'Bahasa Indonesia', icon: '📖' },
    { id: 'ekonomi', name: 'Ekonomi & Akuntansi', icon: '💰' },
    { id: 'sosiologi_informatika', name: 'Sosiologi & Informatika', icon: '🌐' },
  ];

  const filteredTopics = TOPICS.filter((t) => {
    const matchSubject = activeSubject === 'all' || t.subject === activeSubject;
    const matchSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.kataKunci.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase())) ||
      t.pengertian.toLowerCase().includes(searchQuery.toLowerCase());
    return matchSubject && matchSearch;
  });

  return (
    <div className="space-y-6 pb-24">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-400 mb-1">
            <span>📚 MODUL TEORI LENGKAP</span>
            <span className="text-slate-500">·</span>
            <span className="text-cyan-400">FASE 1: THEORY MASTER</span>
          </div>
          <h2 className="text-2xl font-black font-heading tracking-tight text-white">
            Pusat Kurikulum TKA 2026
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Materi lengkap tanpa celah, disusun dari konsep dasar hingga penalaran tinggi (HOTS).
          </p>
        </div>

        {/* Global Search Bar */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari materi, rumus, kata kunci..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-rose-500/80 transition-colors"
          />
        </div>
      </div>

      {/* Subject Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {subjects.map((sub) => {
          const isActive = activeSubject === sub.id;
          return (
            <button
              key={sub.id}
              type="button"
              onClick={() => {
                sound.playTap();
                setActiveSubject(sub.id as any);
              }}
              className={`px-3.5 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                isActive
                  ? 'bg-rose-950/80 border border-rose-500 text-white spider-glow'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <span>{sub.icon}</span>
              <span>{sub.name}</span>
            </button>
          );
        })}
      </div>

      {/* Topics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTopics.map((topic) => {
          const isCompleted = progress.completedTopicIds.includes(topic.id);
          const isNeedReview = progress.needReviewTopicIds.includes(topic.id);

          return (
            <div
              key={topic.id}
              onClick={() => {
                sound.playTap();
                onSelectTopic(topic.id);
              }}
              className="rounded-3xl bg-slate-900/90 border border-slate-800 p-5 hover:border-rose-500/50 transition-all cursor-pointer group relative overflow-hidden flex flex-col justify-between"
            >
              {/* Top Accent Strip */}
              <div
                className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${
                  topic.subject === 'matematika'
                    ? 'from-rose-500 to-amber-500'
                    : topic.subject === 'indonesia'
                    ? 'from-blue-500 to-cyan-400'
                    : topic.subject === 'ekonomi'
                    ? 'from-emerald-500 to-teal-400'
                    : 'from-purple-500 to-indigo-400'
                }`}
              />

              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-400">
                    <span className="uppercase text-rose-400 font-bold">{topic.subject.replace('_', ' ')}</span>
                    <span>·</span>
                    <span>HARI {topic.day.toString().padStart(2, '0')}</span>
                    <span>·</span>
                    <span className="font-mono-numbers">{topic.estimatedMinutes} Menit</span>
                  </div>

                  {isCompleted ? (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Selesai</span>
                    </span>
                  ) : isNeedReview ? (
                    <span className="text-[10px] font-bold text-rose-400 bg-rose-950/80 px-2 py-0.5 rounded-full border border-rose-500/40">
                      Need Review 🔴
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded-full border border-cyan-500/30">
                      {topic.level}
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-rose-400 transition-colors line-clamp-1">
                  {topic.title}
                </h3>

                <p className="text-xs text-slate-300 line-clamp-2 mt-2 leading-relaxed">
                  {topic.pengertian}
                </p>

                {/* Keywords Chips */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {topic.kataKunci.slice(0, 4).map((kw, i) => (
                    <span
                      key={i}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 font-medium"
                    >
                      #{kw}
                    </span>
                  ))}
                  {topic.kataKunci.length > 4 && (
                    <span className="text-[10px] text-slate-500">+{topic.kataKunci.length - 4}</span>
                  )}
                </div>
              </div>

              {/* Bottom Card Actions */}
              <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-medium">
                  {topic.flashcards.length} Flashcard · {topic.blurtingKeyPoints.length} Poin Blurting
                </span>
                <span className="text-xs font-bold text-rose-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Pelajari</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
