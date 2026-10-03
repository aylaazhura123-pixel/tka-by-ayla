import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gamepad2, Layers, RotateCcw, Trophy, Sparkles, CheckCircle2, Star, Zap, Volume2, Shield, ArrowRight } from 'lucide-react';
import { sound } from '../services/soundEngine';
import { TOPICS } from '../data/curriculumData';
import { MascotSpider } from '../components/MascotSpider';
import confetti from 'canvas-confetti';

interface MemoryCard {
  id: number;
  pairId: number;
  type: 'concept' | 'match';
  text: string;
  isFlipped: boolean;
  isMatched: boolean;
  subject: string;
}

const MEMORY_PAIRS = [
  {
    id: 1,
    concept: 'Opportunity Cost (Biaya Peluang)',
    match: 'Nilai dari 1 alternatif TERBAIK yang dikorbankan',
    subject: 'Ekonomi',
  },
  {
    id: 2,
    concept: 'Kombinasi (nCr)',
    match: 'Pemilihan tanpa jabatan (urutan tidak diperhatikan)',
    subject: 'Matematika',
  },
  {
    id: 3,
    concept: 'Sosiologi Non-Etis',
    match: 'Bebas nilai moral / tidak menghakimi baik-buruk fakta',
    subject: 'Sosiologi',
  },
  {
    id: 4,
    concept: 'Refleksi terhadap Sumbu-X',
    match: 'Koordinat titik berubah menjadi (x, -y)',
    subject: 'Matematika',
  },
  {
    id: 5,
    concept: 'Invers Pecahan (ax+b)/(cx+d)',
    match: 'Rumus cepat invers: (-dx + b) / (cx - a)',
    subject: 'Matematika',
  },
  {
    id: 6,
    concept: 'Arbitrase Konflik',
    match: 'Penengah menjatuhkan putusan FINAL & WAJIB dipatuhi',
    subject: 'Sosiologi',
  },
  {
    id: 7,
    concept: 'Persamaan Dasar Akuntansi',
    match: 'Aset (Harta) = Liabilitas (Utang) + Ekuitas (Modal)',
    subject: 'Ekonomi',
  },
  {
    id: 8,
    concept: 'Kaidah Serapan Akhiran -tion',
    match: 'Diserap menjadi akhiran baku -si (standardisasi)',
    subject: 'Bahasa Indonesia',
  },
];

interface SpiderMemoryGameViewProps {
  onAddXp: (amount: number) => void;
}

export const SpiderMemoryGameView: React.FC<SpiderMemoryGameViewProps> = ({ onAddXp }) => {
  const [activeTab, setActiveTab] = useState<'game' | 'flashcards'>('game');

  // Game state
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matchesCount, setMatchesCount] = useState(0);
  const [gameTimer, setGameTimer] = useState(0);
  const [isGameActive, setIsGameActive] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  // Flashcards state
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [masteredCards, setMasteredCards] = useState<Record<string, boolean>>({});

  // Flatten all flashcards from all topics
  const allFlashcards = TOPICS.flatMap((topic) =>
    topic.flashcards.map((fc) => ({
      ...fc,
      subject: topic.subject,
      topicTitle: topic.title,
    }))
  );

  const filteredFlashcards = selectedSubject === 'all'
    ? allFlashcards
    : allFlashcards.filter((fc) => fc.subject === selectedSubject);

  const initGame = () => {
    sound.playWebShoot();
    // Select 6 random pairs
    const shuffledPairs = [...MEMORY_PAIRS].sort(() => 0.5 - Math.random()).slice(0, 6);
    const cardList: MemoryCard[] = [];

    shuffledPairs.forEach((pair, idx) => {
      cardList.push({
        id: idx * 2,
        pairId: pair.id,
        type: 'concept',
        text: pair.concept,
        isFlipped: false,
        isMatched: false,
        subject: pair.subject,
      });
      cardList.push({
        id: idx * 2 + 1,
        pairId: pair.id,
        type: 'match',
        text: pair.match,
        isFlipped: false,
        isMatched: false,
        subject: pair.subject,
      });
    });

    // Shuffle the card deck
    setCards(cardList.sort(() => 0.5 - Math.random()));
    setFlippedCards([]);
    setMoves(0);
    setMatchesCount(0);
    setGameTimer(0);
    setIsGameActive(true);
    setGameWon(false);
  };

  useEffect(() => {
    initGame();
  }, []);

  // Timer loop
  useEffect(() => {
    let int: number | null = null;
    if (isGameActive && !gameWon) {
      int = window.setInterval(() => {
        setGameTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (int) clearInterval(int);
    };
  }, [isGameActive, gameWon]);

  const handleCardClick = (index: number) => {
    if (!isGameActive || flippedCards.length === 2) return;
    const card = cards[index];
    if (card.isFlipped || card.isMatched) return;

    sound.playTap();
    const newFlipped = [...flippedCards, index];
    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      const firstCard = newCards[newFlipped[0]];
      const secondCard = newCards[newFlipped[1]];

      if (firstCard.pairId === secondCard.pairId) {
        // Matched!
        sound.playCorrect();
        newCards[newFlipped[0]].isMatched = true;
        newCards[newFlipped[1]].isMatched = true;
        setCards(newCards);
        setFlippedCards([]);
        setMatchesCount((c) => {
          const nextCount = c + 1;
          if (nextCount === cards.length / 2) {
            handleGameWin();
          }
          return nextCount;
        });
      } else {
        // Not matched, flip back after 800ms
        sound.playWrong();
        setTimeout(() => {
          newCards[newFlipped[0]].isFlipped = false;
          newCards[newFlipped[1]].isFlipped = false;
          setCards(newCards);
          setFlippedCards([]);
        }, 900);
      }
    }
  };

  const handleGameWin = () => {
    sound.playLevelUp();
    setGameWon(true);
    setIsGameActive(false);
    onAddXp(50);

    confetti({
      particleCount: 60,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#e11d48', '#38bdf8', '#fbbf24', '#10b981'],
    });
  };

  const toggleMastery = (cardId: string) => {
    sound.playCorrect();
    setMasteredCards((prev) => ({ ...prev, [cardId]: !prev[cardId] }));
    onAddXp(5);
  };

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6 pb-28">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 mb-1">
            <span>🎮 EDU-GAME & FLASHCARDS HUB</span>
            <span className="text-slate-500">·</span>
            <span>ACTIVE RECALL TKA</span>
          </div>
          <h2 className="text-2xl font-black font-heading text-white tracking-tight">
            Game Mengingat Materi & Kartu Pintar
          </h2>
          <p className="text-xs text-slate-300">
            Kuasai rumus dan konsep TKA melalui permainan kartu memori superhero dan dek flashcard interaktif.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 p-1 rounded-2xl bg-slate-900 border border-slate-800">
          <button
            type="button"
            onClick={() => {
              sound.playTap();
              setActiveTab('game');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'game'
                ? 'bg-rose-600 text-white shadow-md shadow-rose-950 spider-glow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Gamepad2 className="w-3.5 h-3.5" />
            <span>Spider Memory Game</span>
          </button>

          <button
            type="button"
            onClick={() => {
              sound.playTap();
              setActiveTab('flashcards');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'flashcards'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-950 blue-glow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Dek Kartu Pintar ({allFlashcards.length})</span>
          </button>
        </div>
      </div>

      {/* GAME MODE TAB */}
      {activeTab === 'game' && (
        <div className="space-y-5">
          {/* Game Stats Bar */}
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-4 text-xs font-bold">
              <div className="flex items-center gap-1.5 text-slate-300">
                <span>⏱️ Waktu:</span>
                <span className="font-mono-numbers text-rose-400 text-sm">{formatTimer(gameTimer)}</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <span>🎯 Langkah:</span>
                <span className="font-mono-numbers text-cyan-400 text-sm">{moves}</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <span>✨ Pasangan Cocok:</span>
                <span className="font-mono-numbers text-emerald-400 text-sm">
                  {matchesCount} / {cards.length / 2}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={initGame}
              className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Acak Ulang Kartu</span>
            </button>
          </div>

          {/* Victory Modal Overlay */}
          <AnimatePresence>
            {gameWon && (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 via-rose-950/60 to-cyan-950/50 border border-rose-500 p-6 text-center shadow-2xl spider-glow relative"
              >
                <div className="text-4xl mb-2">🏆</div>
                <h3 className="text-xl font-black font-heading text-white">
                  MISI GAME SELESAI! +50 XP
                </h3>
                <p className="text-xs text-slate-300 max-w-sm mx-auto mt-1 mb-4">
                  Luar biasa Ila! Kamu berhasil mencocokkan seluruh konsep dan rumus TKA dalam {moves} langkah ({formatTimer(gameTimer)}).
                </p>

                <button
                  type="button"
                  onClick={initGame}
                  className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-rose-600 to-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-950 cursor-pointer"
                >
                  Mainkan Babak Berikutnya ⚡
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Grid of Memory Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {cards.map((card, idx) => {
              const isShowing = card.isFlipped || card.isMatched;
              return (
                <motion.div
                  key={card.id}
                  whileHover={{ scale: card.isMatched ? 1 : 1.02 }}
                  whileTap={{ scale: card.isMatched ? 1 : 0.96 }}
                  onClick={() => handleCardClick(idx)}
                  className={`h-36 sm:h-40 rounded-3xl p-4 border text-center flex flex-col items-center justify-center select-none cursor-pointer transition-all duration-300 relative overflow-hidden ${
                    card.isMatched
                      ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-200'
                      : isShowing
                      ? 'bg-slate-900 border-rose-500 text-white spider-glow'
                      : 'bg-slate-900/90 border-slate-800 hover:border-slate-600 text-slate-500'
                  }`}
                >
                  {isShowing ? (
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 block">
                        {card.subject} · {card.type === 'concept' ? '📌 KONSEP' : '💡 PENJELASAN'}
                      </span>
                      <p className="text-xs font-bold leading-relaxed text-slate-100">
                        {card.text}
                      </p>
                      {card.isMatched && (
                        <span className="inline-block text-[10px] font-bold text-emerald-400 mt-1">
                          ✓ Cocok!
                        </span>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-1">
                      <span className="text-3xl">🕸️</span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Klik Buka
                      </span>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* FLASHCARDS DECK TAB */}
      {activeTab === 'flashcards' && (
        <div className="space-y-6">
          {/* Subject Filter Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {[
              { id: 'all', name: 'Semua Kartu' },
              { id: 'matematika', name: 'Matematika' },
              { id: 'indonesia', name: 'Bahasa Indonesia' },
              { id: 'ekonomi', name: 'Ekonomi & Akuntansi' },
              { id: 'sosiologi_informatika', name: 'Sosiologi' },
            ].map((sub) => (
              <button
                key={sub.id}
                type="button"
                onClick={() => {
                  sound.playTap();
                  setSelectedSubject(sub.id);
                  setActiveCardIndex(0);
                  setIsCardFlipped(false);
                }}
                className={`px-3.5 py-1.5 rounded-2xl text-xs font-bold whitespace-nowrap cursor-pointer transition-all ${
                  selectedSubject === sub.id
                    ? 'bg-cyan-950 border border-cyan-400 text-cyan-200 spider-glow'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {sub.name}
              </button>
            ))}
          </div>

          {/* Big Interactive Flip Flashcard */}
          {filteredFlashcards.length > 0 ? (
            <div className="max-w-xl mx-auto space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-400 px-2 font-mono-numbers">
                <span>
                  KARTU {activeCardIndex + 1} DARI {filteredFlashcards.length}
                </span>
                <span>
                  {masteredCards[filteredFlashcards[activeCardIndex].id] ? (
                    <span className="text-emerald-400 font-bold">✓ Sudah Dikuasai</span>
                  ) : (
                    'Klik kartu untuk membalik'
                  )}
                </span>
              </div>

              {/* The Flip Card */}
              <div
                onClick={() => {
                  sound.playTap();
                  setIsCardFlipped(!isCardFlipped);
                }}
                className={`w-full min-h-[260px] rounded-3xl p-8 border cursor-pointer select-none flex flex-col items-center justify-center text-center transition-all duration-300 shadow-2xl ${
                  isCardFlipped
                    ? 'bg-gradient-to-br from-cyan-950/80 via-slate-900 to-slate-950 border-cyan-400 text-white spider-glow'
                    : 'bg-gradient-to-br from-slate-900 via-slate-900/90 to-rose-950/40 border-rose-500/50 text-slate-100'
                }`}
              >
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 mb-2">
                  {filteredFlashcards[activeCardIndex].topicTitle} · {isCardFlipped ? '💡 KUNCI JAWABAN' : '❓ PERTANYAAN'}
                </span>

                <h3 className="text-base sm:text-lg font-bold leading-relaxed max-w-md">
                  {isCardFlipped
                    ? filteredFlashcards[activeCardIndex].back
                    : filteredFlashcards[activeCardIndex].front}
                </h3>

                <span className="text-[10px] text-slate-400 mt-4 block">
                  (Ketuk di mana saja untuk membalik)
                </span>
              </div>

              {/* Flashcard Nav & Mastery buttons */}
              <div className="flex items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  disabled={activeCardIndex === 0}
                  onClick={() => {
                    sound.playTap();
                    setActiveCardIndex((p) => p - 1);
                    setIsCardFlipped(false);
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 disabled:opacity-40 text-xs font-bold text-slate-300 hover:text-white cursor-pointer"
                >
                  ← Kartu Sebelumnya
                </button>

                <button
                  type="button"
                  onClick={() => toggleMastery(filteredFlashcards[activeCardIndex].id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer flex items-center gap-1.5 ${
                    masteredCards[filteredFlashcards[activeCardIndex].id]
                      ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                      : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-emerald-400'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>
                    {masteredCards[filteredFlashcards[activeCardIndex].id]
                      ? 'Sudah Dikuasai (+5 XP)'
                      : 'Tandai Sudah Paham'}
                  </span>
                </button>

                <button
                  type="button"
                  disabled={activeCardIndex === filteredFlashcards.length - 1}
                  onClick={() => {
                    sound.playTap();
                    setActiveCardIndex((p) => p + 1);
                    setIsCardFlipped(false);
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 disabled:opacity-40 text-xs font-bold text-slate-300 hover:text-white cursor-pointer"
                >
                  Kartu Berikutnya →
                </button>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-slate-400">Tidak ada kartu pada filter ini.</div>
          )}
        </div>
      )}
    </div>
  );
};
