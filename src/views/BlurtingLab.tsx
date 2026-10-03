import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Brain, EyeOff, Eye, CheckCircle, AlertCircle, RefreshCw, BookmarkPlus, Sparkles, HelpCircle, Trophy } from 'lucide-react';
import { Topic, UserProgress } from '../types';
import { TOPICS } from '../data/curriculumData';
import { sound } from '../services/soundEngine';
import confetti from 'canvas-confetti';

interface BlurtingLabProps {
  initialTopicId?: string;
  progress: UserProgress;
  onAddXp: (amount: number) => void;
  onSaveToNotebook: (topicId: string, title: string, text: string) => void;
  onMarkTopicMastered: (topicId: string) => void;
}

export const BlurtingLab: React.FC<BlurtingLabProps> = ({
  initialTopicId,
  progress,
  onAddXp,
  onSaveToNotebook,
  onMarkTopicMastered,
}) => {
  const [selectedTopicId, setSelectedTopicId] = useState<string>(
    initialTopicId || TOPICS[0].id
  );
  const [isBookClosed, setIsBookClosed] = useState(false);
  const [blurtingText, setBlurtingText] = useState('');
  const [hasEvaluated, setHasEvaluated] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const selectedTopic = TOPICS.find((t) => t.id === selectedTopicId) || TOPICS[0];

  const handleSelectTopic = (id: string) => {
    sound.playTap();
    setSelectedTopicId(id);
    setIsBookClosed(false);
    setBlurtingText('');
    setHasEvaluated(false);
    setCurrentStep(1);
  };

  const handleToggleCloseBook = () => {
    sound.playWebShoot();
    setIsBookClosed(!isBookClosed);
    if (!isBookClosed) {
      setCurrentStep(3); // Start writing
    }
  };

  const evaluateBlurting = () => {
    sound.playCorrect();
    setHasEvaluated(true);
    setCurrentStep(4); // Compare

    onAddXp(20);
    onMarkTopicMastered(selectedTopic.id);

    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.7 },
      colors: ['#38bdf8', '#e11d48', '#10b981'],
    });
  };

  // Concept matching algorithm
  const textLower = blurtingText.toLowerCase();
  const evaluationResults = selectedTopic.blurtingKeyPoints.map((point) => {
    // Break into words and check density
    const words = point.toLowerCase().split(/\s+/).filter((w) => w.length > 3);
    const matchCount = words.filter((w) => textLower.includes(w)).length;
    const ratio = words.length > 0 ? matchCount / words.length : 0;

    let status: 'mastered' | 'partial' | 'missed' = 'missed';
    if (ratio >= 0.45 || (words.length <= 2 && matchCount >= 1)) {
      status = 'mastered';
    } else if (ratio > 0.15 || matchCount >= 1) {
      status = 'partial';
    }

    return { point, status };
  });

  const masteredPoints = evaluationResults.filter((r) => r.status === 'mastered');
  const partialPoints = evaluationResults.filter((r) => r.status === 'partial');
  const missedPoints = evaluationResults.filter((r) => r.status === 'missed');

  return (
    <div className="space-y-6 pb-28">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 mb-1">
          <span>🧠 ACTIVE RECALL LABORATORY</span>
          <span className="text-slate-500">·</span>
          <span>BLURTING METHOD</span>
        </div>
        <h2 className="text-2xl font-black font-heading text-white tracking-tight">
          Laboratorium Blurting TKA
        </h2>
        <p className="text-xs text-slate-300 leading-relaxed max-w-2xl mt-0.5">
          "Blurting adalah metode belajar dengan menutup materi kemudian menuliskan atau menjelaskan semua hal yang masih kamu ingat tanpa melihat buku."
        </p>
      </div>

      {/* 8-Step Flow Horizontal Carousel */}
      <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-4">
        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5">
          Alur 8 Langkah Active Recall:
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {[
            { step: 1, title: '📖 Baca & Pahami' },
            { step: 2, title: '🙈 Tutup Materi' },
            { step: 3, title: '🧠 Tulis Ingatan' },
            { step: 4, title: '🔎 Bandingkan' },
            { step: 5, title: '❌ Tandai Lupa' },
            { step: 6, title: '🔁 Pelajari Ulang' },
            { step: 7, title: '🙈 Tutup Lagi' },
            { step: 8, title: '✍️ Blurting Kedua' },
          ].map((s) => (
            <div
              key={s.step}
              className={`px-3 py-1.5 rounded-xl border text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 shrink-0 ${
                currentStep === s.step
                  ? 'bg-rose-950/80 border-rose-500 text-rose-300 spider-glow'
                  : 'bg-slate-800/40 border-slate-700/60 text-slate-400'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-slate-700 flex items-center justify-center text-[10px] font-bold">
                {s.step}
              </span>
              <span>{s.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Select Topic Dropdown/Chips */}
      <div>
        <label className="text-xs font-bold text-slate-400 block mb-2">
          Pilih Bab Materi untuk Blurting:
        </label>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {TOPICS.map((top) => (
            <button
              key={top.id}
              type="button"
              onClick={() => handleSelectTopic(top.id)}
              className={`px-3.5 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedTopicId === top.id
                  ? 'bg-cyan-950/80 border border-cyan-400 text-cyan-200 spider-glow'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {top.title}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Blurting Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Left: Material Sheet (Can be closed/opened) */}
        <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-5 flex flex-col justify-between relative overflow-hidden">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div>
                <span className="text-[10px] font-bold uppercase text-cyan-400">Lembar Teori Acuan</span>
                <h3 className="text-base font-bold text-white line-clamp-1">{selectedTopic.title}</h3>
              </div>

              <button
                type="button"
                onClick={handleToggleCloseBook}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 cursor-pointer ${
                  isBookClosed
                    ? 'bg-rose-950 border-rose-500 text-rose-300'
                    : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                }`}
              >
                {isBookClosed ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                <span>{isBookClosed ? 'Buka Materi 👁️' : 'Tutup Materi 🙈'}</span>
              </button>
            </div>

            {/* Content or Hidden Overlay */}
            {isBookClosed ? (
              <div className="py-16 text-center space-y-3">
                <div className="w-16 h-16 mx-auto rounded-full bg-rose-950/80 border border-rose-500/40 flex items-center justify-center text-3xl">
                  🙈
                </div>
                <h4 className="text-sm font-bold text-white">Materi Sedang Ditutup!</h4>
                <p className="text-xs text-slate-300 max-w-xs mx-auto">
                  Jangan curang! Tuliskan semua definisi, rumus, sifat, dan contoh yang kamu ingat di area sebelah kanan.
                </p>
                <div className="inline-block px-3 py-1 rounded-full bg-slate-800 text-[11px] text-cyan-400 font-semibold">
                  Mode Active Recall Aktif ⚡
                </div>
              </div>
            ) : (
              <div className="space-y-4 max-h-[420px] overflow-y-auto pr-1">
                <div className="p-3 rounded-2xl bg-slate-800/40 text-xs text-slate-300 leading-relaxed">
                  <span className="font-bold text-white block mb-1">Pengertian:</span>
                  {selectedTopic.pengertian}
                </div>

                <div className="p-3 rounded-2xl bg-slate-800/40 text-xs text-slate-300">
                  <span className="font-bold text-rose-400 block mb-1.5">Poin Wajib yang Harus Diingat:</span>
                  <ul className="space-y-1">
                    {selectedTopic.blurtingKeyPoints.map((pt, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-rose-400">•</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {selectedTopic.rumusDanSifat && (
                  <div className="p-3 rounded-2xl bg-rose-950/20 border border-rose-500/20 text-xs text-slate-300">
                    <span className="font-bold text-white block mb-1">Rumus Penting:</span>
                    {selectedTopic.rumusDanSifat.map((rf, i) => (
                      <div key={i} className="font-mono-numbers text-cyan-300 font-bold mb-1">
                        {rf.formula}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-slate-800/80 text-[11px] text-slate-400">
            Target: Hafal & tuliskan minimal 70% dari poin inti sebelum cek hasil.
          </div>
        </div>

        {/* Right: Active Recall Typing Sandbox */}
        <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
              <div>
                <span className="text-[10px] font-bold uppercase text-rose-400">Area Mengetik Bebas</span>
                <h3 className="text-base font-bold text-white">Tulis Semua yang Kamu Ingat</h3>
              </div>
              <span className="text-xs font-mono-numbers text-slate-400">
                {blurtingText.trim().split(/\s+/).filter(Boolean).length} kata
              </span>
            </div>

            <textarea
              rows={12}
              value={blurtingText}
              onChange={(e) => setBlurtingText(e.target.value)}
              placeholder="Contoh: Bilangan real terdiri dari rasional dan irasional. Sifat komutatif a+b=b+a. Bentuk akar sekawan dirasionalkan dengan mengalikan sekawan..."
              className="w-full p-4 rounded-2xl bg-slate-950/90 border border-slate-800 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-rose-500/80 transition-colors resize-none leading-relaxed font-sans"
            />
          </div>

          <div className="mt-4 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setBlurtingText('')}
              className="px-3 py-2 rounded-xl text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Reset Teks
            </button>

            <button
              type="button"
              disabled={blurtingText.trim().length < 10}
              onClick={evaluateBlurting}
              className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-rose-600 to-rose-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-bold shadow-lg shadow-rose-950 hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>CEK HASIL BLURTING (+20 XP)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Evaluation Feedback Panel */}
      <AnimatePresence>
        {hasEvaluated && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl bg-slate-900 border border-slate-800 p-6 shadow-2xl space-y-5"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                  <CheckCircle className="w-4 h-4" />
                  <span>ANALISIS ACTIVE RECALL SELESAI</span>
                </div>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  Laporan Penguasaan Konsep
                </h3>
              </div>

              {/* Save to Notebook action */}
              <button
                type="button"
                onClick={() => {
                  sound.playTap();
                  onSaveToNotebook(selectedTopic.id, `Blurting: ${selectedTopic.title}`, blurtingText);
                }}
                className="px-3.5 py-2 rounded-xl bg-amber-950/40 border border-amber-500/40 text-amber-300 text-xs font-bold hover:bg-amber-900/60 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <BookmarkPlus className="w-4 h-4" />
                <span>Simpan Hasil ke Digital Notebook</span>
              </button>
            </div>

            {/* 3 Categories: Mastered, Partial, Needs Review */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* 🟢 Sudah Dikuasai */}
              <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-emerald-400">
                  <span>🟢 Sudah Dikuasai</span>
                  <span className="font-mono-numbers">{masteredPoints.length} Poin</span>
                </div>
                {masteredPoints.length > 0 ? (
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {masteredPoints.map((m, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-emerald-400">✓</span>
                        <span>{m.point}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-[11px] text-slate-400 italic">Belum ada poin yang tercakup lengkap.</p>
                )}
              </div>

              {/* 🟡 Hampir Dikuasai */}
              <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/40 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-amber-400">
                  <span>🟡 Hampir Dikuasai</span>
                  <span className="font-mono-numbers">{partialPoints.length} Poin</span>
                </div>
                {partialPoints.length > 0 ? (
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {partialPoints.map((p, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-amber-400">~</span>
                        <span>{p.point}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-[11px] text-slate-400 italic">Semua poin teridentifikasi jelas.</p>
                )}
              </div>

              {/* 🔴 Perlu Dipelajari Lagi */}
              <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-500/40 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-rose-400">
                  <span>🔴 Perlu Dipelajari Lagi</span>
                  <span className="font-mono-numbers">{missedPoints.length} Poin</span>
                </div>
                {missedPoints.length > 0 ? (
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {missedPoints.map((ms, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-rose-400">✗</span>
                        <span>{ms.point}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-[11px] text-emerald-400 font-semibold">Luar biasa! Tidak ada yang terlewat.</p>
                )}
              </div>
            </div>

            {/* Next Step Guidance */}
            <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 text-xs flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-slate-300">
                Langkah selanjutnya: Baca ulang bagian yang terlewat (merah), lalu lakukan <b>Blurting Putaran ke-2</b>!
              </span>
              <button
                type="button"
                onClick={() => {
                  sound.playTap();
                  setIsBookClosed(false);
                  setHasEvaluated(false);
                  setCurrentStep(6);
                }}
                className="px-3.5 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-bold transition-colors shrink-0 cursor-pointer"
              >
                Pelajari Ulang Poin Merah 🔁
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
