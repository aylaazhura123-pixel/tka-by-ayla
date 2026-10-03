import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Timer, CheckCircle, Flag, ChevronLeft, ChevronRight, BarChart2, Award, ArrowRight, RotateCcw } from 'lucide-react';
import { QuizQuestion, UserProgress } from '../types';
import { SAMPLE_QUESTIONS } from '../data/curriculumData';
import { sound } from '../services/soundEngine';
import confetti from 'canvas-confetti';

interface TryoutTKAViewProps {
  progress: UserProgress;
  onAddXp: (amount: number) => void;
  onRecordStudyTime: (seconds: number) => void;
}

export const TryoutTKAView: React.FC<TryoutTKAViewProps> = ({
  progress,
  onAddXp,
  onRecordStudyTime,
}) => {
  const [examStarted, setExamStarted] = useState(false);
  const [examFinished, setExamFinished] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [flagged, setFlagged] = useState<Record<number, boolean>>({});
  const [remainingTime, setRemainingTime] = useState(30 * 60); // 30 minutes

  // Pool questions (can repeat to simulate full exam paper)
  const examQuestions: QuizQuestion[] = [
    ...SAMPLE_QUESTIONS,
    ...SAMPLE_QUESTIONS.map((q, i) => ({ ...q, id: `${q.id}-clone-${i}` })),
  ].slice(0, 10);

  useEffect(() => {
    let int: number | null = null;
    if (examStarted && !examFinished) {
      int = window.setInterval(() => {
        setRemainingTime((prev) => {
          if (prev <= 1) {
            handleSubmitExam();
            return 0;
          }
          onRecordStudyTime(1);
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (int) clearInterval(int);
    };
  }, [examStarted, examFinished]);

  const handleStartExam = () => {
    sound.playWebShoot();
    sound.startMusic('battle');
    setExamStarted(true);
    setExamFinished(false);
    setAnswers({});
    setFlagged({});
    setCurrentIdx(0);
    setRemainingTime(30 * 60);
  };

  const handleSelectOption = (optIdx: number) => {
    sound.playTap();
    setAnswers((prev) => ({ ...prev, [currentIdx]: optIdx }));
  };

  const handleToggleFlag = () => {
    sound.playTap();
    setFlagged((prev) => ({ ...prev, [currentIdx]: !prev[currentIdx] }));
  };

  const handleSubmitExam = () => {
    sound.playLevelUp();
    setExamFinished(true);
    onAddXp(100);

    confetti({
      particleCount: 50,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#e11d48', '#38bdf8', '#10b981'],
    });
  };

  // Compute results
  let correctCount = 0;
  let wrongCount = 0;
  const subjectScores: Record<string, { correct: number; total: number }> = {};

  examQuestions.forEach((q, idx) => {
    const userAns = answers[idx];
    const isCorrect = userAns === q.correctIndex;
    if (isCorrect) correctCount++;
    else wrongCount++;

    if (!subjectScores[q.subject]) {
      subjectScores[q.subject] = { correct: 0, total: 0 };
    }
    subjectScores[q.subject].total++;
    if (isCorrect) subjectScores[q.subject].correct++;
  });

  const finalScore = Math.round((correctCount / examQuestions.length) * 1000);
  const accuracy = Math.round((correctCount / examQuestions.length) * 100);

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const currentQ = examQuestions[currentIdx];

  return (
    <div className="space-y-6 pb-28">
      {/* Intro Screen */}
      {!examStarted ? (
        <div className="rounded-3xl bg-slate-900 border border-slate-800 p-7 sm:p-9 text-center space-y-5 spider-glow">
          <div className="w-16 h-16 mx-auto rounded-full bg-rose-950 border border-rose-500/50 flex items-center justify-center text-3xl">
            📝
          </div>

          <div>
            <h2 className="text-2xl font-black font-heading text-white tracking-tight">
              Simulasi Tryout TKA 2026
            </h2>
            <p className="text-xs text-slate-300 max-w-md mx-auto mt-1 leading-relaxed">
              Uji ketajaman pemahamanmu dalam kondisi realistis berbatas waktu, lengkapi navigasi nomor soal, dan dapatkan analisis kekuatan/kelemahan subjek.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 max-w-md mx-auto text-xs">
            <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60">
              <div className="text-slate-400">Jumlah Soal</div>
              <div className="text-base font-bold text-white font-mono-numbers">{examQuestions.length} Butir</div>
            </div>
            <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60">
              <div className="text-slate-400">Batas Waktu</div>
              <div className="text-base font-bold text-cyan-400 font-mono-numbers">30 Menit</div>
            </div>
            <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60">
              <div className="text-slate-400">Bonus Misi</div>
              <div className="text-base font-bold text-rose-400 font-mono-numbers">+100 XP</div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleStartExam}
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-rose-600 to-rose-500 text-white font-black text-sm shadow-xl shadow-rose-950 hover:brightness-110 active:scale-95 transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <span>MULAI SIMULASI TRYOUT</span>
            <span>⚡</span>
          </button>
        </div>
      ) : !examFinished ? (
        /* Active Exam Paper Screen */
        <div className="space-y-4">
          {/* Top Sticky Status Bar */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-300">
                Soal {currentIdx + 1} dari {examQuestions.length}
              </span>
              <span className="text-slate-500">·</span>
              <span className="text-xs text-rose-400 uppercase font-semibold">
                {currentQ.subject.replace('_', ' ')}
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* Countdown */}
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-950 border border-rose-500/40 text-xs font-mono-numbers font-bold text-rose-300">
                <Timer className="w-3.5 h-3.5 text-rose-400 animate-spin" />
                <span>{formatTimer(remainingTime)}</span>
              </div>

              {/* End early */}
              <button
                type="button"
                onClick={handleSubmitExam}
                className="px-3 py-1 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs cursor-pointer"
              >
                Selesai
              </button>
            </div>
          </div>

          {/* Question & Options */}
          <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-bold text-cyan-400">PILIHAN GANDA</span>

              <button
                type="button"
                onClick={handleToggleFlag}
                className={`px-3 py-1 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-colors cursor-pointer ${
                  flagged[currentIdx]
                    ? 'bg-amber-950 border-amber-500 text-amber-300'
                    : 'bg-slate-800 border-slate-700 text-slate-400'
                }`}
              >
                <Flag className="w-3.5 h-3.5" />
                <span>{flagged[currentIdx] ? 'Ragu-ragu (Ditandai)' : 'Tandai Ragu'}</span>
              </button>
            </div>

            <p className="text-sm sm:text-base font-semibold text-white leading-relaxed">
              {currentQ.question}
            </p>

            {/* Options */}
            <div className="space-y-2.5">
              {currentQ.options.map((opt, i) => {
                const isSelected = answers[currentIdx] === i;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleSelectOption(i)}
                    className={`w-full p-3.5 rounded-2xl border text-left text-xs transition-all flex items-center gap-3 cursor-pointer ${
                      isSelected
                        ? 'bg-rose-950/80 border-rose-500 text-white spider-glow'
                        : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:border-slate-500'
                    }`}
                  >
                    <span className="w-6 h-6 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center font-bold text-xs shrink-0 text-slate-300">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="leading-relaxed">{opt}</span>
                  </button>
                );
              })}
            </div>

            {/* Prev/Next buttons */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <button
                type="button"
                disabled={currentIdx === 0}
                onClick={() => setCurrentIdx((p) => Math.max(0, p - 1))}
                className="px-4 py-2 rounded-xl bg-slate-800 disabled:opacity-40 text-xs font-bold text-slate-300 flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Sebelumnya</span>
              </button>

              <button
                type="button"
                disabled={currentIdx === examQuestions.length - 1}
                onClick={() => setCurrentIdx((p) => Math.min(examQuestions.length - 1, p + 1))}
                className="px-4 py-2 rounded-xl bg-slate-800 disabled:opacity-40 text-xs font-bold text-slate-300 flex items-center gap-1 cursor-pointer"
              >
                <span>Selanjutnya</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Question Palette Grid */}
          <div className="rounded-3xl bg-slate-900 border border-slate-800 p-4">
            <div className="text-xs font-bold text-slate-400 mb-2.5">Nomor Soal:</div>
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
              {examQuestions.map((_, i) => {
                const isAnswered = answers[i] !== undefined;
                const isFlagged = flagged[i];
                const isCurrent = currentIdx === i;

                let cls = 'bg-slate-800/60 border-slate-700 text-slate-400';
                if (isCurrent) {
                  cls = 'border-rose-400 ring-2 ring-rose-500 text-white';
                }
                if (isFlagged) {
                  cls = 'bg-amber-950 border-amber-500 text-amber-300';
                } else if (isAnswered) {
                  cls = 'bg-cyan-950 border-cyan-500 text-cyan-200';
                }

                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      sound.playTap();
                      setCurrentIdx(i);
                    }}
                    className={`h-9 rounded-xl border text-xs font-bold font-mono-numbers cursor-pointer ${cls}`}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* Results Report Screen */
        <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl spider-glow">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/40 text-xs font-bold text-emerald-400">
              <Award className="w-4 h-4" />
              <span>SIMULASI SELESAI (+100 XP)</span>
            </div>
            <h2 className="text-2xl font-black font-heading text-white">
              Laporan Analisis Hasil Tryout
            </h2>
          </div>

          {/* Top 3 Score Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700">
              <div className="text-xs text-slate-400">Skor Akhir</div>
              <div className="text-3xl font-black text-rose-400 font-mono-numbers mt-1">{finalScore}</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700">
              <div className="text-xs text-slate-400">Akurasi</div>
              <div className="text-3xl font-black text-cyan-400 font-mono-numbers mt-1">{accuracy}%</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700">
              <div className="text-xs text-slate-400">Benar</div>
              <div className="text-3xl font-black text-emerald-400 font-mono-numbers mt-1">{correctCount}</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700">
              <div className="text-xs text-slate-400">Salah</div>
              <div className="text-3xl font-black text-rose-500 font-mono-numbers mt-1">{wrongCount}</div>
            </div>
          </div>

          {/* Subject Breakdown Radar Bars */}
          <div className="rounded-2xl bg-slate-950 p-5 border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Performa Berdasarkan Mapel:
            </h4>
            {Object.entries(subjectScores).map(([sub, data]) => {
              const pct = Math.round((data.correct / data.total) * 100);
              return (
                <div key={sub} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="uppercase text-slate-200">{sub.replace('_', ' ')}</span>
                    <span className="font-mono-numbers text-rose-400">{data.correct}/{data.total} ({pct}%)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-rose-500 to-cyan-400"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Retake or return */}
          <div className="flex justify-center pt-2">
            <button
              type="button"
              onClick={handleStartExam}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-rose-600 to-rose-500 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-lg shadow-rose-950"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Coba Tryout Sekali Lagi</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
