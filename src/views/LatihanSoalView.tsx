import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Target, CheckCircle, XCircle, ArrowRight, RefreshCw, Sparkles, AlertTriangle, ShieldCheck, Flame } from 'lucide-react';
import { QuizQuestion, UserProgress } from '../types';
import { SAMPLE_QUESTIONS } from '../data/curriculumData';
import { sound } from '../services/soundEngine';
import { MascotSpider } from '../components/MascotSpider';
import confetti from 'canvas-confetti';

interface LatihanSoalViewProps {
  progress: UserProgress;
  onAddXp: (amount: number) => void;
  onAnswerQuestion: (questionId: string, isCorrect: boolean, topicId: string, subject: string) => void;
}

export const LatihanSoalView: React.FC<LatihanSoalViewProps> = ({
  progress,
  onAddXp,
  onAnswerQuestion,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [filterDifficulty, setFilterDifficulty] = useState<'ALL' | 'HOTS'>('ALL');
  const [mascotMood, setMascotMood] = useState<'idle' | 'correct' | 'wrong' | 'jump'>('idle');

  const questions = filterDifficulty === 'HOTS'
    ? SAMPLE_QUESTIONS.filter((q) => q.difficulty === 'HOTS')
    : SAMPLE_QUESTIONS;

  const currentQ: QuizQuestion = questions[currentIdx] || questions[0];

  const handleSelectOption = (idx: number) => {
    if (isSubmitted) return;
    sound.playTap();
    setSelectedOption(idx);
  };

  const handleSubmit = () => {
    if (selectedOption === null || isSubmitted) return;

    setIsSubmitted(true);
    const isCorrect = selectedOption === currentQ.correctIndex;

    if (isCorrect) {
      sound.playCorrect();
      setMascotMood('correct');
      onAddXp(20);
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.65 },
        colors: ['#e11d48', '#38bdf8', '#fbbf24', '#10b981'],
      });
    } else {
      sound.playWrong();
      setMascotMood('wrong');
    }

    onAnswerQuestion(currentQ.id, isCorrect, currentQ.topicId, currentQ.subject);
  };

  const handleNext = () => {
    sound.playTap();
    setIsSubmitted(false);
    setSelectedOption(null);
    setMascotMood('idle');
    setCurrentIdx((prev) => (prev + 1) % questions.length);
  };

  return (
    <div className="space-y-6 pb-28">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-400 mb-1">
            <span>🎯 QUESTION BATTLE</span>
            <span className="text-slate-500">·</span>
            <span>HOTS & ADAPTIVE QUIZ</span>
          </div>
          <h2 className="text-2xl font-black font-heading text-white tracking-tight">
            Latihan Soal & Pembahasan TKA
          </h2>
          <p className="text-xs text-slate-300">
            Eksekusi soal pilihan ganda, bedah kesalahan, dan tembak jaring laba-laba kemenangan!
          </p>
        </div>

        {/* Filter Toggle */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              sound.playTap();
              setFilterDifficulty('ALL');
              setCurrentIdx(0);
              setIsSubmitted(false);
              setSelectedOption(null);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filterDifficulty === 'ALL'
                ? 'bg-rose-950 border border-rose-500 text-white'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Semua Tingkat
          </button>
          <button
            type="button"
            onClick={() => {
              sound.playTap();
              setFilterDifficulty('HOTS');
              setCurrentIdx(0);
              setIsSubmitted(false);
              setSelectedOption(null);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 cursor-pointer ${
              filterDifficulty === 'HOTS'
                ? 'bg-purple-950 border-purple-500 text-purple-300 spider-glow'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-purple-400" />
            <span>Khusus HOTS Battle ⚡</span>
          </button>
        </div>
      </div>

      {/* Main Question Card with Mascot */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
        {/* Left 3 cols: Question & Options */}
        <div className="lg:col-span-3 rounded-3xl bg-slate-900/90 border border-slate-800 p-6 shadow-xl relative overflow-hidden flex flex-col justify-between">
          <div>
            {/* Meta header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4 text-xs font-semibold text-slate-400">
              <div className="flex items-center gap-2">
                <span className="font-mono-numbers text-rose-400 font-bold">
                  SOAL {currentIdx + 1} / {questions.length}
                </span>
                <span>·</span>
                <span className="uppercase text-slate-300 font-bold">{currentQ.subject.replace('_', ' ')}</span>
              </div>

              <span
                className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                  currentQ.difficulty === 'HOTS'
                    ? 'bg-purple-950 text-purple-300 border-purple-500/40'
                    : currentQ.difficulty === 'HARD'
                    ? 'bg-rose-950 text-rose-300 border-rose-500/40'
                    : 'bg-cyan-950 text-cyan-300 border-cyan-500/40'
                }`}
              >
                {currentQ.difficulty}
              </span>
            </div>

            {/* Question Text */}
            <p className="text-sm sm:text-base font-semibold text-white leading-relaxed mb-6">
              {currentQ.question}
            </p>

            {/* Options A-E */}
            <div className="space-y-2.5">
              {currentQ.options.map((opt, i) => {
                const isSelected = selectedOption === i;
                const isCorrectAnswer = i === currentQ.correctIndex;

                let stateClass = 'bg-slate-800/60 border-slate-700/60 text-slate-200 hover:border-slate-500';
                if (isSubmitted) {
                  if (isCorrectAnswer) {
                    stateClass = 'bg-emerald-950/70 border-emerald-500 text-emerald-200 font-bold';
                  } else if (isSelected && !isCorrectAnswer) {
                    stateClass = 'bg-rose-950/70 border-rose-500 text-rose-200 line-through';
                  } else {
                    stateClass = 'bg-slate-900/40 border-slate-800/60 text-slate-500';
                  }
                } else if (isSelected) {
                  stateClass = 'bg-rose-950/80 border-rose-500 text-white spider-glow';
                }

                return (
                  <button
                    key={i}
                    type="button"
                    disabled={isSubmitted}
                    onClick={() => handleSelectOption(i)}
                    className={`w-full p-3.5 rounded-2xl border text-left text-xs transition-all flex items-center justify-between gap-3 cursor-pointer select-none active:scale-[0.99] ${stateClass}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center font-bold text-xs shrink-0 text-slate-300">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span className="leading-relaxed">{opt}</span>
                    </div>

                    {isSubmitted && isCorrectAnswer && (
                      <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                    )}
                    {isSubmitted && isSelected && !isCorrectAnswer && (
                      <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
            {!isSubmitted ? (
              <button
                type="button"
                disabled={selectedOption === null}
                onClick={handleSubmit}
                className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-rose-600 to-rose-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold shadow-lg shadow-rose-950 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>KUNCI JAWABAN</span>
                <span>🕸️</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow-lg shadow-cyan-950 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>SOAL SELANJUTNYA</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Right 1 col: Araki Mascot Reaction Box */}
        <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-5 flex flex-col items-center justify-center text-center">
          <MascotSpider
            mood={mascotMood}
            speechText={
              isSubmitted
                ? selectedOption === currentQ.correctIndex
                  ? '🎉 BENAR SEKALI! +20 XP!'
                  : '❌ BELUM TEPAT. Tenang, pelajari pembahasannya ya!'
                : 'Pilih salah satu opsi lalu klik Kunci Jawaban!'
            }
            size="lg"
          />

          <div className="mt-4 pt-3 border-t border-slate-800 w-full text-[11px] text-slate-400">
            {isSubmitted && selectedOption !== currentQ.correctIndex && (
              <span className="text-rose-400 font-semibold block">
                Soal ini otomatis tersimpan ke Error Bank!
              </span>
            )}
            <span>Misi Soal: +20 XP per jawaban benar</span>
          </div>
        </div>
      </div>

      {/* Deep Explanation Breakdown (Only visible when submitted) */}
      <AnimatePresence>
        {isSubmitted && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl bg-slate-900 border border-slate-800 p-6 space-y-4 shadow-xl"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Bedah Pembahasan Komprehensif</span>
              </h3>
              <span className="text-xs font-bold text-emerald-400">
                {currentQ.explanation.jawabanBenar}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {/* Mengapa */}
              <div className="p-3.5 rounded-2xl bg-slate-800/50 border border-slate-700/60">
                <span className="font-bold text-cyan-400 block mb-1">🔎 MENGAPA?</span>
                <p className="text-slate-300 leading-relaxed">{currentQ.explanation.mengapa}</p>
              </div>

              {/* Konsep */}
              <div className="p-3.5 rounded-2xl bg-slate-800/50 border border-slate-700/60">
                <span className="font-bold text-rose-400 block mb-1">📚 KONSEP DASAR:</span>
                <p className="text-slate-300 leading-relaxed">{currentQ.explanation.konsep}</p>
              </div>

              {/* Cara Berpikir */}
              <div className="p-3.5 rounded-2xl bg-slate-800/50 border border-slate-700/60">
                <span className="font-bold text-indigo-400 block mb-1">🧠 CARA BERPIKIR:</span>
                <p className="text-slate-300 leading-relaxed">{currentQ.explanation.caraBerpikir}</p>
              </div>

              {/* Kesalahan Umum */}
              <div className="p-3.5 rounded-2xl bg-rose-950/20 border border-rose-500/20">
                <span className="font-bold text-rose-400 block mb-1">⚠️ KESALAHAN UMUM / JEBAKAN:</span>
                <p className="text-slate-300 leading-relaxed">{currentQ.explanation.kesalahanUmum}</p>
              </div>
            </div>

            {/* Smart Trick */}
            <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30 text-xs">
              <span className="font-bold text-amber-300 block mb-1">💡 TRIK CEPAT / SMART SOLUTION:</span>
              <p className="text-amber-100/90 leading-relaxed">{currentQ.explanation.trik}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
