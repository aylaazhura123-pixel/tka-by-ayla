import React, { useState } from 'react';
import { AlertTriangle, BookOpen, RefreshCw, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';
import { UserProgress, SubjectId } from '../types';
import { SAMPLE_QUESTIONS, TOPICS } from '../data/curriculumData';
import { sound } from '../services/soundEngine';

interface ErrorBankViewProps {
  progress: UserProgress;
  onGoToTopic: (topicId: string) => void;
  onResolveError: (questionId: string) => void;
}

export const ErrorBankView: React.FC<ErrorBankViewProps> = ({
  progress,
  onGoToTopic,
  onResolveError,
}) => {
  const [selectedSubject, setSelectedSubject] = useState<SubjectId | 'all'>('all');

  const subjects = [
    { id: 'all', name: 'Semua Mapel', icon: '❌' },
    { id: 'matematika', name: 'Matematika', icon: '📐' },
    { id: 'indonesia', name: 'Bahasa Indonesia', icon: '📖' },
    { id: 'ekonomi', name: 'Ekonomi & Akuntansi', icon: '💰' },
    { id: 'sosiologi_informatika', name: 'Sosiologi & Informatika', icon: '🌐' },
  ];

  // Map errorBank items to question objects
  const errorQuestions = progress.errorBank
    .map((item) => {
      const q = SAMPLE_QUESTIONS.find((sq) => sq.id === item.questionId);
      const topic = TOPICS.find((t) => t.id === item.topicId);
      return {
        ...item,
        questionData: q,
        topicData: topic,
      };
    })
    .filter((eq) => eq.questionData !== undefined);

  const filteredErrors = errorQuestions.filter(
    (eq) => selectedSubject === 'all' || eq.subject === selectedSubject
  );

  const countBySubject = (sub: SubjectId) =>
    errorQuestions.filter((eq) => eq.subject === sub).length;

  return (
    <div className="space-y-6 pb-28">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-400 mb-1">
          <span>❌ ERROR BANK & WEAKNESS HUNT</span>
          <span className="text-slate-500">·</span>
          <span>BANK KESALAHAN PRIBADI</span>
        </div>
        <h2 className="text-2xl font-black font-heading text-white tracking-tight">
          Error Bank TKA
        </h2>
        <p className="text-xs text-slate-300">
          Setiap kesalahan adalah jembatan menuju nilai sempurna. Pelajari ulang konsep yang keliru!
        </p>
      </div>

      {/* Subject Error Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { sub: 'matematika', name: 'Matematika', icon: '📐' },
          { sub: 'indonesia', name: 'Bahasa Indonesia', icon: '📖' },
          { sub: 'ekonomi', name: 'Ekonomi', icon: '💰' },
          { sub: 'sosiologi_informatika', name: 'Sosiologi & Info', icon: '🌐' },
        ].map((item) => {
          const count = countBySubject(item.sub as SubjectId);
          return (
            <div
              key={item.sub}
              onClick={() => {
                sound.playTap();
                setSelectedSubject(item.sub as any);
              }}
              className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                selectedSubject === item.sub
                  ? 'bg-rose-950/80 border-rose-500 text-white spider-glow'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <div className="text-2xl mb-1">{item.icon}</div>
              <div className="text-xs font-bold">{item.name}</div>
              <div className="text-[11px] font-mono-numbers text-rose-400 font-bold mt-0.5">
                {count} kesalahan
              </div>
            </div>
          );
        })}
      </div>

      {/* Adaptive Recommendation Card */}
      {errorQuestions.length > 0 && (
        <div className="p-4 rounded-3xl bg-gradient-to-r from-rose-950/60 via-slate-900 to-cyan-950/40 border border-rose-500/30 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-950 border border-rose-500/40 flex items-center justify-center text-rose-400 shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">
                ⚠️ Rekomendasi Adaptif AI: Pelajari Ulang Materi Lemah
              </h4>
              <p className="text-[11px] text-slate-300">
                Kamu tercatat memiliki kesalahan pada topik {errorQuestions[0].topicData?.title || 'tertentu'}.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onGoToTopic(errorQuestions[0].topicId)}
            className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-md shadow-rose-950 whitespace-nowrap cursor-pointer"
          >
            PELAJARI LAGI TEORI 📖
          </button>
        </div>
      )}

      {/* Error Items List */}
      <div className="space-y-3">
        {filteredErrors.length === 0 ? (
          <div className="py-16 text-center rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="w-14 h-14 mx-auto rounded-full bg-emerald-950/60 border border-emerald-500/40 flex items-center justify-center text-emerald-400 text-2xl">
              ✓
            </div>
            <h3 className="text-base font-bold text-white">Error Bank Bersih!</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Tidak ada kesalahan pada kategori ini. Lanjutkan latihan soal untuk menguji kemampuanmu!
            </p>
          </div>
        ) : (
          filteredErrors.map((eq, idx) => (
            <div
              key={idx}
              className="rounded-3xl bg-slate-900/90 border border-slate-800 p-5 space-y-3"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs font-semibold">
                <span className="text-rose-400 font-bold uppercase">
                  {eq.subject.replace('_', ' ')} · {eq.topicData?.title}
                </span>
                <span className="text-[10px] text-slate-400 font-mono-numbers">
                  Salah {eq.mistakeCount}x
                </span>
              </div>

              <p className="text-xs font-bold text-white leading-relaxed">
                {eq.questionData?.question}
              </p>

              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
                <span className="text-emerald-400 font-bold block mb-1">
                  Jawaban Benar: {eq.questionData?.explanation.jawabanBenar}
                </span>
                <p className="text-[11px] text-slate-400">{eq.questionData?.explanation.caraBerpikir}</p>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => onGoToTopic(eq.topicId)}
                  className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Pelajari Konsep Ini</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    sound.playCorrect();
                    onResolveError(eq.questionId);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-emerald-400 border border-emerald-500/30 flex items-center gap-1 cursor-pointer"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Tandai Sudah Paham</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
