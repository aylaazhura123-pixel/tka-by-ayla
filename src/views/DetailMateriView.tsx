import React, { useState } from 'react';
import { ArrowLeft, Brain, BookMarked, CheckCircle2, AlertTriangle, Lightbulb, Sparkles, HelpCircle, Layers, BookmarkPlus, ChevronRight } from 'lucide-react';
import { Topic, UserProgress } from '../types';
import { sound } from '../services/soundEngine';
import confetti from 'canvas-confetti';

interface DetailMateriViewProps {
  topic: Topic;
  progress: UserProgress;
  onBack: () => void;
  onGoToBlurting: (topicId: string) => void;
  onGoToNotebook: (topicId: string) => void;
  onToggleCompleteTopic: (topicId: string) => void;
  onToggleNeedReview: (topicId: string) => void;
}

export const DetailMateriView: React.FC<DetailMateriViewProps> = ({
  topic,
  progress,
  onBack,
  onGoToBlurting,
  onGoToNotebook,
  onToggleCompleteTopic,
  onToggleNeedReview,
}) => {
  const [flippedCardId, setFlippedCardId] = useState<string | null>(null);
  const isCompleted = progress.completedTopicIds.includes(topic.id);
  const isNeedReview = progress.needReviewTopicIds.includes(topic.id);

  const handleCardFlip = (id: string) => {
    sound.playTap();
    setFlippedCardId(flippedCardId === id ? null : id);
  };

  const handleComplete = () => {
    sound.playXp();
    onToggleCompleteTopic(topic.id);
    if (!isCompleted) {
      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#e11d48', '#38bdf8', '#10b981'],
      });
    }
  };

  return (
    <div className="space-y-6 pb-28">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => {
            sound.playTap();
            onBack();
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Daftar</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Need Review Button */}
          <button
            type="button"
            onClick={() => {
              sound.playTap();
              onToggleNeedReview(topic.id);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center gap-1.5 ${
              isNeedReview
                ? 'bg-rose-950 border-rose-500 text-rose-300'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-rose-400'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>{isNeedReview ? 'In Review List' : 'Tandai Need Review'}</span>
          </button>

          {/* Complete Button */}
          <button
            type="button"
            onClick={handleComplete}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              isCompleted
                ? 'bg-emerald-950 border border-emerald-500/50 text-emerald-300'
                : 'bg-rose-600 hover:bg-rose-500 text-white shadow-md shadow-rose-950'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{isCompleted ? 'Sudah Dikuasai (+15 XP)' : 'Tandai Selesai (+15 XP)'}</span>
          </button>
        </div>
      </div>

      {/* Main Title Hero Banner */}
      <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-rose-950/30 border border-slate-800 p-6 relative overflow-hidden spider-glow">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-rose-400 mb-2">
          <span className="uppercase font-bold tracking-wide">
            {topic.subject.replace('_', ' ')}
          </span>
          <span>·</span>
          <span>HARI KE-{topic.day.toString().padStart(2, '0')}</span>
          <span>·</span>
          <span className="text-cyan-400 font-mono-numbers">Estimasi {topic.estimatedMinutes} Menit</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black font-heading text-white tracking-tight">
          {topic.title}
        </h1>

        <p className="text-sm text-slate-300 mt-3 leading-relaxed max-w-3xl">
          {topic.pengertian}
        </p>

        {/* Action Shortcuts */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => onGoToBlurting(topic.id)}
            className="px-4 py-2 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow-md shadow-cyan-950 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Brain className="w-4 h-4" />
            <span>Mulai Blurting Lab Sekarang</span>
          </button>

          <button
            type="button"
            onClick={() => onGoToNotebook(topic.id)}
            className="px-4 py-2 rounded-2xl bg-slate-800 hover:bg-slate-700 text-amber-200 text-xs font-bold border border-amber-500/30 transition-all flex items-center gap-2 cursor-pointer"
          >
            <BookMarked className="w-4 h-4 text-amber-400" />
            <span>Buka di Digital Notebook</span>
          </button>
        </div>
      </div>

      {/* 1. Tujuan Mempelajari Materi */}
      <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-2 flex items-center gap-1.5">
          <span>🎯 Tujuan Mempelajari Materi</span>
        </h3>
        <p className="text-xs text-slate-200 leading-relaxed">
          {topic.tujuan}
        </p>
      </div>

      {/* 2. Konsep Utama (Key Concepts) */}
      <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-rose-400 mb-3 flex items-center gap-1.5">
          <span>💡 Konsep Utama & Fondasi</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {topic.konsepUtama.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-slate-800/50 border border-slate-700/60"
            >
              <div className="text-xs font-bold text-white mb-1">{item.term}</div>
              <div className="text-[11px] text-slate-300 leading-relaxed">{item.explanation}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Penjelasan Sederhana & Mendalam */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Sederhana */}
        <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-5">
          <div className="flex items-center gap-2 mb-2 text-xs font-bold text-amber-400">
            <Lightbulb className="w-4 h-4" />
            <span>Penjelasan Sederhana (Analogi Cepat)</span>
          </div>
          <p className="text-xs text-slate-200 leading-relaxed">
            {topic.penjelasanSederhana}
          </p>
        </div>

        {/* Mendalam */}
        <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-5">
          <div className="flex items-center gap-2 mb-2 text-xs font-bold text-cyan-400">
            <Sparkles className="w-4 h-4" />
            <span>Penjelasan Mendalam & Kritis TKA</span>
          </div>
          <p className="text-xs text-slate-200 leading-relaxed">
            {topic.penjelasanMendalam}
          </p>
        </div>
      </div>

      {/* 4. Rumus & Sifat Penting (Jika Ada) */}
      {topic.rumusDanSifat && topic.rumusDanSifat.length > 0 && (
        <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-rose-400 mb-3 flex items-center gap-1.5">
            <span>📐 Rumus, Sifat & Kaidah Matematis</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {topic.rumusDanSifat.map((rf, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-rose-950/20 border border-rose-500/30"
              >
                <div className="text-xs font-bold text-white mb-1">{rf.name}</div>
                <div className="p-2 rounded-xl bg-slate-950 font-mono-numbers text-xs font-bold text-cyan-300 border border-slate-800 overflow-x-auto">
                  {rf.formula}
                </div>
                <div className="text-[10px] text-slate-400 mt-1.5">{rf.note}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. Langkah Pengerjaan & Contoh Nyata */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Langkah */}
        <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
            Langkah Pengerjaan Soal (Step by Step)
          </h3>
          <ol className="space-y-2">
            {topic.langkahPengerjaan.map((step, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                <span className="w-5 h-5 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] font-bold text-rose-400 shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Contoh Nyata */}
        <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">
            Aplikasi Kontekstual Dunia Nyata
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            {topic.contohNyata}
          </p>
        </div>
      </div>

      {/* 6. Contoh Soal TKA & Pembahasan Rinci */}
      <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-5">
        <div className="flex items-center justify-between mb-3 pb-3 border-b border-slate-800">
          <h3 className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4" />
            <span>Contoh Soal TKA Standar & Pembahasan</span>
          </h3>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/30">
            HOTS Preview
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 mb-4">
          <p className="text-xs font-semibold text-white leading-relaxed mb-3">
            {topic.contohSoal.question}
          </p>
          <div className="space-y-1.5">
            {topic.contohSoal.options.map((opt, i) => (
              <div
                key={i}
                className={`p-2 rounded-xl text-xs flex items-center gap-2 ${
                  i === topic.contohSoal.correctIndex
                    ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 font-bold'
                    : 'bg-slate-900/60 text-slate-300'
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-bold shrink-0">
                  {String.fromCharCode(65 + i)}
                </span>
                <span>{opt}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pembahasan & Smart Trick */}
        <div className="space-y-2.5">
          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs">
            <span className="font-bold text-cyan-400 block mb-1">🔎 Pembahasan Mendalam:</span>
            <p className="text-slate-300 leading-relaxed">{topic.contohSoal.explanation}</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-amber-950/30 border border-amber-500/30 text-xs">
            <span className="font-bold text-amber-300 block mb-1">⚡ Trik Cepat / Smart Solution:</span>
            <p className="text-amber-100/90 leading-relaxed">{topic.contohSoal.smartTrick}</p>
          </div>
        </div>
      </div>

      {/* 7. Jebakan Umum (Common Traps) & Tips Mengingat */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Kesalahan Umum */}
        <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-rose-400 mb-3 flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4" />
            <span>Jebakan Umum Soal (Hindari Ini!)</span>
          </h3>
          <div className="space-y-2.5">
            {topic.kesalahanUmum.map((trap, idx) => (
              <div key={idx} className="p-3 rounded-2xl bg-rose-950/20 border border-rose-500/20 text-xs">
                <div className="font-bold text-rose-300 mb-0.5">⚠️ {trap.trap}</div>
                <div className="text-slate-300 text-[11px]">{trap.correction}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tips Mengingat & Hubungan Materi */}
        <div className="space-y-4">
          <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
              💡 Tips Mengingat / Jembatan Keledai
            </h3>
            <p className="text-xs text-amber-200/95 font-medium leading-relaxed">
              {topic.tipsMengingat}
            </p>
          </div>

          <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-1.5">
              🔗 Kaitan dengan Materi Lain
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {topic.hubunganMateri}
            </p>
          </div>
        </div>
      </div>

      {/* 8. Interactive Flashcards */}
      <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-5">
        <div className="flex items-center justify-between mb-3 pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Interactive Active Recall Flashcards</span>
            </h3>
            <p className="text-[11px] text-slate-400">Klik kartu untuk membalik dan menguji ingatanmu!</p>
          </div>
          <span className="text-xs font-mono-numbers text-slate-400">{topic.flashcards.length} Kartu</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {topic.flashcards.map((fc) => {
            const isFlipped = flippedCardId === fc.id;
            return (
              <div
                key={fc.id}
                onClick={() => handleCardFlip(fc.id)}
                className={`p-4 rounded-2xl border text-center transition-all cursor-pointer min-h-[130px] flex flex-col items-center justify-center select-none active:scale-95 ${
                  isFlipped
                    ? 'bg-cyan-950/80 border-cyan-400 text-white spider-glow'
                    : 'bg-slate-800/80 border-slate-700 hover:border-slate-500 text-slate-200'
                }`}
              >
                <div className="text-[10px] uppercase font-bold tracking-wider mb-1 text-slate-400">
                  {isFlipped ? 'Jawaban / Konsep' : 'Pertanyaan (Klik Balik)'}
                </div>
                <div className="text-xs font-semibold leading-relaxed">
                  {isFlipped ? fc.back : fc.front}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 9. Blurting Key Points & Quick Recap */}
      <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-rose-400 mb-3 flex items-center gap-2">
          <Brain className="w-4 h-4" />
          <span>Poin Kunci Blurting Lab (Wajib Diingat Saat Tutup Buku)</span>
        </h3>
        <div className="space-y-2 mb-5">
          {topic.blurtingKeyPoints.map((pt, i) => (
            <div key={i} className="flex items-center gap-2.5 text-xs text-slate-300">
              <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0" />
              <span>{pt}</span>
            </div>
          ))}
        </div>

        <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-950/50 via-slate-900 to-cyan-950/40 border border-rose-500/30 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <h4 className="text-xs font-bold text-white">Siap Menguji Pemahaman dengan Blurting?</h4>
            <p className="text-[11px] text-slate-300">Tutup materi sekarang dan tuliskan apa yang kamu ingat.</p>
          </div>
          <button
            type="button"
            onClick={() => onGoToBlurting(topic.id)}
            className="px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow-md shadow-cyan-950 flex items-center gap-2 cursor-pointer whitespace-nowrap"
          >
            <span>Buka Blurting Lab</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
