import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Bookmark, Star, Edit3, Highlighter, ZoomIn, ZoomOut, List, Plus, Trash2, Pin, Sparkles, Save, X } from 'lucide-react';
import { NotebookNote, UserProgress } from '../types';
import { sound } from '../services/soundEngine';

interface DigitalNotebookProps {
  progress: UserProgress;
  onUpdateNotes: (notes: NotebookNote[]) => void;
  onAddXp: (amount: number) => void;
}

export const DigitalNotebook: React.FC<DigitalNotebookProps> = ({
  progress,
  onUpdateNotes,
  onAddXp,
}) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [activeHighlighter, setActiveHighlighter] = useState<'yellow' | 'pink' | 'cyan' | 'green'>('yellow');
  const [showIndexModal, setShowIndexModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Editable fields for custom notes
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editSticky, setEditSticky] = useState('');

  // Default initial notes if empty
  const notes: NotebookNote[] = progress.notebookNotes.length > 0 ? progress.notebookNotes : [
    {
      id: 'note-1',
      topicId: 'mat-bilangan-real',
      title: 'MATEMATIKA — BILANGAN REAL & AKAR',
      subject: 'matematika',
      content: '📌 PENGERTIAN:\nHimpunan ℝ mencakup semua angka kontinu rasional & irasional.\n\n💡 KATA KUNCI:\n• Rasional: a/b (desimal berulang/berhenti)\n• Irasional: √2, π, e (tak berulang tak hingga)\n\n✏️ IDENTITAS KUADRAT AKAR:\n√( (a+b) ± 2√(ab) ) = √a ± √b\nSyarat mutlak: a ≥ b ≥ 0!\n\n⚠️ HATI-HATI JEBAKAN:\n√(x² + y²) TIDAK BOLEH dipecah jadi x + y!',
      keyPoints: ['Rasional vs Irasional', 'Eksponen pecahan a^(m/n)', 'Bentuk sekawan rasionalisasi penyebut'],
      stickyNote: 'Tips: Jumlah di DEPAN, Kali di DALAM akar!',
      stickers: ['📌', '⭐', '🕷️'],
      highlightColor: 'yellow',
      updatedAt: '2026-10-03',
      isBookmarked: true,
      isFavorite: true,
    },
    {
      id: 'note-2',
      topicId: 'eko-dasar-pasar',
      title: 'EKONOMI — BIAYA PELUANG & PASAR',
      subject: 'ekonomi',
      content: '📌 SCARCITY & OPPORTUNITY COST:\nBiaya peluang = HANYA 1 nilai alternatif TERBAIK yang dikorbankan, BUKAN total akumulasi semua tawaran!\n\n⚖️ KESEIMBANGAN PASAR:\nTitik Ekuilibrium: Qd = Qs dan Pd = Ps.\n\n📊 PENGARUH PAJAK (t):\nPenawaran bergeser ke atas: Ps\' = Ps + t\nHarga konsumen naik, kuantitas turun.',
      keyPoints: ['Opportunity Cost', 'Hukum Permintaan & Penawaran', 'Pajak dan Subsidi Pasar'],
      stickyNote: 'Pajak menaikkan harga pasar tapi menurunkan jumlah transaksi!',
      stickers: ['💰', '💡', '⚡'],
      highlightColor: 'pink',
      updatedAt: '2026-10-03',
      isBookmarked: false,
      isFavorite: true,
    }
  ];

  const currentNote = notes[currentPageIndex] || notes[0];

  const handlePrevPage = () => {
    if (currentPageIndex > 0) {
      sound.playTap();
      setCurrentPageIndex(currentPageIndex - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPageIndex < notes.length - 1) {
      sound.playTap();
      setCurrentPageIndex(currentPageIndex + 1);
    }
  };

  const toggleBookmark = () => {
    sound.playTap();
    const updated = notes.map((n, idx) =>
      idx === currentPageIndex ? { ...n, isBookmarked: !n.isBookmarked } : n
    );
    onUpdateNotes(updated);
  };

  const toggleFavorite = () => {
    sound.playTap();
    const updated = notes.map((n, idx) =>
      idx === currentPageIndex ? { ...n, isFavorite: !n.isFavorite } : n
    );
    onUpdateNotes(updated);
  };

  const startEdit = () => {
    sound.playTap();
    setEditTitle(currentNote.title);
    setEditContent(currentNote.content);
    setEditSticky(currentNote.stickyNote || '');
    setIsEditing(true);
  };

  const saveEdit = () => {
    sound.playCorrect();
    const updated = notes.map((n, idx) =>
      idx === currentPageIndex
        ? {
            ...n,
            title: editTitle,
            content: editContent,
            stickyNote: editSticky,
            highlightColor: activeHighlighter,
            updatedAt: new Date().toISOString().split('T')[0],
          }
        : n
    );
    onUpdateNotes(updated);
    setIsEditing(false);
    onAddXp(10);
  };

  const createNewPage = () => {
    sound.playTap();
    const newNote: NotebookNote = {
      id: `custom-note-${Date.now()}`,
      title: 'CATATAN BARU — TKA 2026',
      subject: 'matematika',
      content: '📌 Tulis ringkasan rumus atau materi di sini...',
      keyPoints: ['Konsep A', 'Konsep B'],
      stickyNote: 'Catatan penting!',
      stickers: ['📌', '💡'],
      highlightColor: activeHighlighter,
      updatedAt: new Date().toISOString().split('T')[0],
      isBookmarked: false,
      isFavorite: false,
    };
    const updated = [...notes, newNote];
    onUpdateNotes(updated);
    setCurrentPageIndex(updated.length - 1);
  };

  return (
    <div className="space-y-6 pb-28">
      {/* Header & Tooling Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 mb-1">
            <span>📓 DIGITAL NOTEBOOK ESTETIK</span>
            <span className="text-slate-500">·</span>
            <span>GRID PAPER & DOODLES</span>
          </div>
          <h2 className="text-2xl font-black font-heading text-white tracking-tight">
            My Study Notebook
          </h2>
          <p className="text-xs text-slate-300">
            Catatan visual bergaya buku tulis fisik dengan grid, highlighter, dan sticky notes.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {/* Highlighter Color Picker */}
          <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl">
            {(['yellow', 'pink', 'cyan', 'green'] as const).map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => {
                  sound.playTap();
                  setActiveHighlighter(color);
                }}
                className={`w-5 h-5 rounded-full transition-transform cursor-pointer ${
                  color === 'yellow'
                    ? 'bg-amber-300'
                    : color === 'pink'
                    ? 'bg-rose-400'
                    : color === 'cyan'
                    ? 'bg-cyan-300'
                    : 'bg-emerald-400'
                } ${activeHighlighter === color ? 'scale-125 ring-2 ring-white' : 'opacity-60'}`}
                title={`Highlighter ${color}`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => setShowIndexModal(true)}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white cursor-pointer"
            title="Daftar Halaman (Index)"
          >
            <List className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => setIsZoomed(!isZoomed)}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white cursor-pointer"
            title={isZoomed ? 'Zoom Out' : 'Zoom In'}
          >
            {isZoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
          </button>

          <button
            type="button"
            onClick={createNewPage}
            className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1 shadow-md cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah Halaman</span>
          </button>
        </div>
      </div>

      {/* Main Physical Notebook Paper Container */}
      <div className="flex justify-center">
        <motion.div
          animate={{ scale: isZoomed ? 1.05 : 1 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-2xl rounded-3xl bg-notebook-grid shadow-[0_20px_50px_rgba(0,0,0,0.6)] border-4 border-[#e2d9cc] text-slate-800 p-6 sm:p-9 relative overflow-hidden select-text min-h-[580px] flex flex-col justify-between"
        >
          {/* Notebook Left Margin Line (Red Rule) */}
          <div className="absolute top-0 bottom-0 left-10 sm:left-14 w-0.5 bg-rose-400/40 pointer-events-none" />

          {/* Top Paper Header Bar */}
          <div>
            <div className="flex items-center justify-between pl-6 sm:pl-10 pb-3 border-b border-slate-300/80 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold tracking-wider text-slate-500 uppercase font-mono-numbers">
                  PAGE {(currentPageIndex + 1).toString().padStart(2, '0')} / {notes.length.toString().padStart(2, '0')}
                </span>
                <span className="text-slate-400">·</span>
                <span className="text-[11px] text-slate-500 font-mono-numbers">{currentNote.updatedAt}</span>
              </div>

              {/* Bookmark & Favorite buttons */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={toggleFavorite}
                  className={`p-1 text-slate-400 hover:text-amber-500 cursor-pointer ${
                    currentNote.isFavorite ? 'text-amber-500 fill-amber-500' : ''
                  }`}
                  title="Favorit"
                >
                  <Star className={`w-4 h-4 ${currentNote.isFavorite ? 'fill-amber-500 text-amber-500' : ''}`} />
                </button>

                <button
                  type="button"
                  onClick={toggleBookmark}
                  className={`p-1 text-slate-400 hover:text-rose-500 cursor-pointer ${
                    currentNote.isBookmarked ? 'text-rose-600 fill-rose-600' : ''
                  }`}
                  title="Bookmark"
                >
                  <Bookmark className={`w-4 h-4 ${currentNote.isBookmarked ? 'fill-rose-600 text-rose-600' : ''}`} />
                </button>

                <button
                  type="button"
                  onClick={startEdit}
                  className="p-1 text-slate-400 hover:text-slate-800 cursor-pointer"
                  title="Edit Catatan"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Handwritten Title & Stickers */}
            <div className="pl-6 sm:pl-10 mb-4">
              <div className="flex items-center gap-2 mb-1">
                {currentNote.stickers.map((stk, i) => (
                  <span key={i} className="text-lg">{stk}</span>
                ))}
              </div>

              <h1 className="font-handwriting text-2xl sm:text-3xl font-black text-slate-900 tracking-wide leading-tight">
                {currentNote.title}
              </h1>

              {/* Aesthetic Highlighter Strip */}
              <div
                className={`h-1.5 w-3/4 rounded-full mt-1 ${
                  currentNote.highlightColor === 'yellow'
                    ? 'bg-amber-300/80'
                    : currentNote.highlightColor === 'pink'
                    ? 'bg-rose-300/80'
                    : currentNote.highlightColor === 'cyan'
                    ? 'bg-cyan-300/80'
                    : 'bg-emerald-300/80'
                }`}
              />
            </div>

            {/* Content Body */}
            <div className="pl-6 sm:pl-10 space-y-4">
              <div className="text-xs sm:text-sm text-slate-800 leading-relaxed font-sans whitespace-pre-line">
                {currentNote.content}
              </div>

              {/* Key Concept Bullets */}
              {currentNote.keyPoints && currentNote.keyPoints.length > 0 && (
                <div className="p-3 rounded-2xl bg-white/70 border border-slate-300/70 shadow-xs">
                  <div className="text-xs font-bold text-slate-900 mb-1">📌 Poin Penting:</div>
                  <ul className="space-y-0.5 text-xs text-slate-700">
                    {currentNote.keyPoints.map((kp, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="text-rose-500 font-bold">✓</span>
                        <span>{kp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Pinned Sticky Note */}
              {currentNote.stickyNote && (
                <div className="relative inline-block mt-3 max-w-sm">
                  <div className="p-3 rounded-xl bg-amber-100 border border-amber-300 shadow-md rotate-[-1.5deg] text-slate-800 text-xs font-handwriting text-base font-bold">
                    {/* Thumbtack pin */}
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-rose-500 border-2 border-white shadow-sm" />
                    <span>{currentNote.stickyNote}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Page Navigation Controls */}
          <div className="mt-8 pt-4 border-t border-slate-300/80 flex items-center justify-between pl-6 sm:pl-10">
            <button
              type="button"
              disabled={currentPageIndex === 0}
              onClick={handlePrevPage}
              className="px-3 py-1.5 rounded-xl bg-white/80 border border-slate-300 text-xs font-bold text-slate-700 disabled:opacity-40 hover:bg-white transition-all flex items-center gap-1 cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>← Sebelumnya</span>
            </button>

            <span className="text-xs font-bold font-handwriting text-slate-600 text-lg">
              ~ Ila's Study Journey ~
            </span>

            <button
              type="button"
              disabled={currentPageIndex === notes.length - 1}
              onClick={handleNextPage}
              className="px-3 py-1.5 rounded-xl bg-white/80 border border-slate-300 text-xs font-bold text-slate-700 disabled:opacity-40 hover:bg-white transition-all flex items-center gap-1 cursor-pointer"
            >
              <span>Selanjutnya →</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Edit Note Modal */}
      <AnimatePresence>
        {isEditing && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-lg rounded-3xl bg-slate-900 border border-slate-800 p-6 text-slate-100 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 className="font-bold text-sm text-white">Edit Catatan Notebook</h3>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Judul Halaman:</label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Isi Catatan:</label>
                <textarea
                  rows={8}
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white resize-none"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Catatan Tempel (Sticky Note):</label>
                <input
                  type="text"
                  value={editSticky}
                  onChange={(e) => setEditSticky(e.target.value)}
                  placeholder="Catatan pengingat singkat..."
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={saveEdit}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Simpan Catatan (+10 XP)</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Index Modal */}
      <AnimatePresence>
        {showIndexModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md rounded-3xl bg-slate-900 border border-slate-800 p-6 text-slate-100 shadow-2xl"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                <h3 className="font-bold text-sm text-white">Daftar Isi Catatan Notebook</h3>
                <button
                  type="button"
                  onClick={() => setShowIndexModal(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2 max-h-72 overflow-y-auto">
                {notes.map((n, idx) => (
                  <div
                    key={n.id}
                    onClick={() => {
                      sound.playTap();
                      setCurrentPageIndex(idx);
                      setShowIndexModal(false);
                    }}
                    className={`p-3 rounded-2xl border text-left cursor-pointer transition-colors flex items-center justify-between ${
                      currentPageIndex === idx
                        ? 'bg-rose-950/80 border-rose-500 text-white'
                        : 'bg-slate-800/40 border-slate-800 text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold line-clamp-1">{n.title}</div>
                      <div className="text-[10px] text-slate-400">Halaman {idx + 1} · {n.updatedAt}</div>
                    </div>
                    {n.isFavorite && <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
