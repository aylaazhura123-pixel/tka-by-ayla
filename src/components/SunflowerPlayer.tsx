import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Disc,
  Sparkles,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Music2,
  Settings,
  Upload,
  Link2,
  Check,
  HelpCircle,
  X,
  Radio,
  Sliders,
  Flame,
  Zap,
} from 'lucide-react';
import { sound } from '../services/soundEngine';

export interface MusicTrackConfig {
  type: 'youtube' | 'local_file' | 'procedural';
  youtubeId: string;
  youtubeUrl: string;
  title: string;
  artist: string;
  subtitle: string;
  localAudioUrl?: string;
  localFileName?: string;
}

const DEFAULT_TRACK: MusicTrackConfig = {
  type: 'youtube',
  youtubeId: 'ApXoWvfEYVU',
  youtubeUrl: 'https://youtu.be/ApXoWvfEYVU?si=K61fBabL5wNBVTO0',
  title: 'Sunflower',
  artist: 'Post Malone & Swae Lee',
  subtitle: 'Spider-Man: Into the Spider-Verse OST',
};

const PRESET_TRACKS: Array<MusicTrackConfig & { desc: string; icon: string }> = [
  {
    type: 'youtube',
    youtubeId: 'ApXoWvfEYVU',
    youtubeUrl: 'https://youtu.be/ApXoWvfEYVU?si=K61fBabL5wNBVTO0',
    title: 'Sunflower',
    artist: 'Post Malone & Swae Lee',
    subtitle: 'Spider-Man: Into the Spider-Verse',
    desc: 'Lagu wajib superhero laba-laba! Vibe santai, ceria, dan bikin semangat belajar.',
    icon: '🌻',
  },
  {
    type: 'youtube',
    youtubeId: 'OqLp4Vw7e-Q',
    youtubeUrl: 'https://youtu.be/OqLp4Vw7e-Q',
    title: "What's Up Danger",
    artist: 'Blackway & Black Caviar',
    subtitle: 'Spider-Verse Leap of Faith Scene',
    desc: 'Adrenalin tinggi saat mengerjakan soal HOTS dan tryout TKA yang menantang!',
    icon: '⚡',
  },
  {
    type: 'youtube',
    youtubeId: 'f3T9mB6hKek',
    youtubeUrl: 'https://youtu.be/f3T9mB6hKek',
    title: 'Spider-Man 2099 Theme',
    artist: 'Daniel Pemberton',
    subtitle: 'Across the Spider-Verse',
    desc: 'Cyberpunk synthwave intensif untuk fokus maksimal tanpa gangguan.',
    icon: '🕷️',
  },
  {
    type: 'youtube',
    youtubeId: 'jfKfPfyJRdk',
    youtubeUrl: 'https://www.youtube.com/watch?v=jfKfPfyJRdk',
    title: 'Lofi Girl — Study Beats',
    artist: 'Lofi Girl Records',
    subtitle: 'Relaxing Instrumental Chillhop',
    desc: 'Irama instrumen santai yang membuat otak tenang saat membaca teori dan rangkuman.',
    icon: '🎧',
  },
  {
    type: 'procedural',
    youtubeId: '',
    youtubeUrl: '',
    title: 'Procedural Superhero Synth',
    artist: 'Spider-Web Audio Engine',
    subtitle: 'Offline Lo-Fi Synthesizer',
    desc: 'Musik procedural Web Audio sintetis tanpa kuota internet (hemat kuota & ringan).',
    icon: '🎹',
  },
];

const STORAGE_MUSIC_KEY = 'tka_spider_music_config_v2';

export const SunflowerPlayer: React.FC = () => {
  const [track, setTrack] = useState<MusicTrackConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_MUSIC_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return DEFAULT_TRACK;
  });

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  // Form states in modal
  const [inputUrl, setInputUrl] = useState(track.youtubeUrl || '');
  const [inputTitle, setInputTitle] = useState(track.title);
  const [inputArtist, setInputArtist] = useState(track.artist);
  const [urlError, setUrlError] = useState('');
  const [successToast, setSuccessToast] = useState('');

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const localAudioRef = useRef<HTMLAudioElement>(null);

  // Listen to external custom events (e.g. from Navbar or SettingsModal)
  useEffect(() => {
    const handleOpenModal = () => {
      setIsSettingsOpen(true);
    };
    window.addEventListener('open-music-modal', handleOpenModal);
    return () => window.removeEventListener('open-music-modal', handleOpenModal);
  }, []);

  // Save track config to localStorage
  const saveTrack = (newTrack: MusicTrackConfig) => {
    setTrack(newTrack);
    try {
      localStorage.setItem(STORAGE_MUSIC_KEY, JSON.stringify(newTrack));
    } catch {
      // ignore
    }
  };

  // Helper to extract YouTube Video ID from any URL or string
  const extractYouTubeId = (urlOrId: string): string | null => {
    const clean = urlOrId.trim();
    if (!clean) return null;

    // Check if it's already an 11-char ID
    if (/^[a-zA-Z0-9_-]{11}$/.test(clean)) {
      return clean;
    }

    // Match youtu.be/ID
    const shortMatch = clean.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
    if (shortMatch && shortMatch[1]) return shortMatch[1];

    // Match youtube.com/watch?v=ID or embed/ID or v/ID
    const longMatch = clean.match(/(?:v=|embed\/|v\/|watch\?v=|&v=)([a-zA-Z0-9_-]{11})/);
    if (longMatch && longMatch[1]) return longMatch[1];

    return null;
  };

  const handleApplyYouTubeUrl = () => {
    setUrlError('');
    const videoId = extractYouTubeId(inputUrl);

    if (!videoId) {
      setUrlError('Format link YouTube tidak valid. Gunakan format seperti: https://youtu.be/ApXoWvfEYVU atau https://www.youtube.com/watch?v=...');
      sound.playWrong();
      return;
    }

    const newTrack: MusicTrackConfig = {
      type: 'youtube',
      youtubeId: videoId,
      youtubeUrl: inputUrl.trim(),
      title: inputTitle.trim() || 'Lagu YouTube Kustom',
      artist: inputArtist.trim() || 'Pilihan Ila',
      subtitle: 'Audio Latar Belakang YouTube',
    };

    saveTrack(newTrack);
    sound.playCorrect();
    setSuccessToast(`Musik berhasil diubah ke YouTube: ${newTrack.title}!`);
    setTimeout(() => setSuccessToast(''), 3500);

    // Auto play new track
    setIsPlaying(true);
    setTimeout(() => {
      sendYouTubeCommand('playVideo');
      sendYouTubeCommand('unMute');
      sendYouTubeVolume(volume);
    }, 500);
  };

  const handleSelectPreset = (p: typeof PRESET_TRACKS[0]) => {
    saveTrack({
      type: p.type,
      youtubeId: p.youtubeId,
      youtubeUrl: p.youtubeUrl,
      title: p.title,
      artist: p.artist,
      subtitle: p.subtitle,
    });
    setInputUrl(p.youtubeUrl);
    setInputTitle(p.title);
    setInputArtist(p.artist);
    setUrlError('');

    sound.playTap();
    setSuccessToast(`Musik diganti ke: ${p.title}! 🎵`);
    setTimeout(() => setSuccessToast(''), 3000);

    if (p.type === 'procedural') {
      if (localAudioRef.current) localAudioRef.current.pause();
      sound.unlock();
      sound.startMusic('sunflower');
      setIsPlaying(true);
    } else {
      sound.stopMusic();
      setIsPlaying(true);
      setTimeout(() => {
        sendYouTubeCommand('playVideo');
        sendYouTubeCommand('unMute');
        sendYouTubeVolume(volume);
      }, 500);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const audioUrl = URL.createObjectURL(file);
    const fileName = file.name.replace(/\.[^/.]+$/, '');

    const newTrack: MusicTrackConfig = {
      type: 'local_file',
      youtubeId: '',
      youtubeUrl: '',
      title: fileName,
      artist: 'File Audio Saya',
      subtitle: 'Diputar dari perangkat lokal',
      localAudioUrl: audioUrl,
      localFileName: file.name,
    };

    saveTrack(newTrack);
    sound.playCorrect();
    setSuccessToast(`File "${file.name}" berhasil dimuat! 🎵`);
    setTimeout(() => setSuccessToast(''), 3500);

    // Play local audio
    setIsPlaying(true);
    setTimeout(() => {
      if (localAudioRef.current) {
        localAudioRef.current.volume = volume;
        localAudioRef.current.play().catch(() => {});
      }
    }, 200);
  };

  // YouTube IFrame postMessage helpers
  const sendYouTubeCommand = (func: string, args: string | number = '') => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      const msg = JSON.stringify({
        event: 'command',
        func,
        args: args ? [args] : [],
      });
      iframeRef.current.contentWindow.postMessage(msg, '*');
    }
  };

  const sendYouTubeVolume = (vol: number) => {
    const vol100 = Math.round(vol * 100);
    sendYouTubeCommand('setVolume', vol100);
  };

  const handleTogglePlay = () => {
    sound.playTap();
    const nextPlay = !isPlaying;
    setIsPlaying(nextPlay);

    if (track.type === 'procedural') {
      if (nextPlay) {
        sound.unlock();
        sound.startMusic('sunflower');
      } else {
        sound.stopMusic();
      }
    } else if (track.type === 'local_file') {
      if (localAudioRef.current) {
        if (nextPlay) {
          localAudioRef.current.play().catch(() => {});
        } else {
          localAudioRef.current.pause();
        }
      }
    } else {
      // YouTube
      if (nextPlay) {
        sendYouTubeCommand('playVideo');
        sendYouTubeCommand('unMute');
        sendYouTubeVolume(volume);
      } else {
        sendYouTubeCommand('pauseVideo');
      }
    }
  };

  const handleToggleMute = () => {
    sound.playTap();
    const nextMute = !isMuted;
    setIsMuted(nextMute);

    if (track.type === 'procedural') {
      sound.setMute(nextMute);
    } else if (track.type === 'local_file') {
      if (localAudioRef.current) {
        localAudioRef.current.muted = nextMute;
      }
    } else {
      sendYouTubeCommand(nextMute ? 'mute' : 'unMute');
    }
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    if (track.type === 'procedural') {
      sound.setMusicVolume(newVol);
    } else if (track.type === 'local_file') {
      if (localAudioRef.current) {
        localAudioRef.current.volume = newVol;
      }
    } else {
      sendYouTubeVolume(newVol);
    }
  };

  return (
    <>
      {/* HTML5 Audio for uploaded files */}
      {track.type === 'local_file' && track.localAudioUrl && (
        <audio
          ref={localAudioRef}
          src={track.localAudioUrl}
          loop
          onEnded={() => {
            if (localAudioRef.current) localAudioRef.current.play();
          }}
        />
      )}

      {/* Floating Music Player Dock at Bottom Left */}
      <div className="fixed bottom-20 left-3 sm:left-5 z-40 max-w-[calc(100vw-1.5rem)] sm:max-w-sm">
        {/* Collapsible Video Clip (if YouTube) */}
        {track.type === 'youtube' && track.youtubeId && (
          <div className={`transition-all duration-300 ${isExpanded ? 'block mb-2' : 'hidden'}`}>
            <div className="rounded-2xl overflow-hidden border border-rose-500/50 shadow-2xl bg-black relative">
              <button
                type="button"
                onClick={() => setIsExpanded(false)}
                className="absolute top-2 right-2 z-10 w-6 h-6 rounded-full bg-black/70 text-white flex items-center justify-center text-xs hover:bg-rose-600 transition-colors"
                title="Tutup Preview Video"
              >
                ✕
              </button>
              <iframe
                ref={iframeRef}
                width="280"
                height="160"
                src={`https://www.youtube.com/embed/${track.youtubeId}?enablejsapi=1&version=3&playerapiid=ytplayer&loop=1&playlist=${track.youtubeId}&origin=${encodeURIComponent(
                  window.location.origin
                )}`}
                title={track.title}
                allow="autoplay; encrypted-media"
                className="w-full h-full"
              />
            </div>
          </div>
        )}

        {/* Floating Music Pill Widget */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="rounded-2xl bg-slate-900/95 border border-rose-500/50 p-2.5 shadow-2xl backdrop-blur-md spider-glow flex items-center gap-2.5 sm:gap-3 select-none"
        >
          {/* Animated Vinyl Icon */}
          <button
            type="button"
            onClick={handleTogglePlay}
            className="relative w-10 h-10 rounded-full bg-gradient-to-tr from-amber-400 via-rose-500 to-cyan-400 p-0.5 shrink-0 cursor-pointer shadow-md shadow-rose-950/60 active:scale-95 transition-transform"
            title={isPlaying ? `Jeda Musik (${track.title})` : `Putar Musik (${track.title})`}
          >
            <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center">
              <Disc
                className={`w-5 h-5 ${track.title.toLowerCase().includes('sunflower') ? 'text-amber-300' : 'text-rose-400'} ${
                  isPlaying ? 'animate-spin' : ''
                }`}
                style={{ animationDuration: '3s' }}
              />
            </div>
            {isPlaying && (
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border border-slate-900 animate-ping" />
            )}
          </button>

          {/* Track Details */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1 truncate">
                <span>{track.title.toLowerCase().includes('sunflower') ? '🌻 SUNFLOWER' : '🎵 MUSIK LATAR'}</span>
                <span className="text-slate-500">·</span>
                <span className="text-cyan-400 font-normal truncate">{track.subtitle || 'Audio TKA'}</span>
              </span>
            </div>

            <div className="text-xs font-bold text-white truncate max-w-[140px] sm:max-w-[170px]">
              {track.title}
              <span className="text-[10px] font-normal text-slate-400 ml-1.5">— {track.artist}</span>
            </div>

            {/* Equalizer Visualizer Bars */}
            <div className="flex items-end gap-0.5 h-2 mt-1">
              {[40, 90, 60, 100, 75, 45, 80, 50, 95, 30].map((h, i) => (
                <span
                  key={i}
                  className="w-1 bg-gradient-to-t from-rose-500 to-amber-400 rounded-full transition-all duration-300"
                  style={{
                    height: isPlaying ? `${h}%` : '20%',
                    opacity: isPlaying ? 0.9 : 0.3,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Action Controls */}
          <div className="flex items-center gap-1 shrink-0">
            {/* Play/Pause Button */}
            <button
              type="button"
              onClick={handleTogglePlay}
              className="p-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white shadow-md cursor-pointer transition-all active:scale-90"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            </button>

            {/* Mute Button */}
            <button
              type="button"
              onClick={handleToggleMute}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white cursor-pointer transition-colors"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>

            {/* Toggle Video Preview Button (if YouTube) */}
            {track.type === 'youtube' && (
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="hidden sm:inline-flex p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white cursor-pointer transition-colors"
                title={isExpanded ? 'Tutup Video' : 'Lihat Video YouTube'}
              >
                {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
              </button>
            )}

            {/* Change Music Button (Opens Full Music Studio Modal) */}
            <button
              type="button"
              onClick={() => {
                sound.playTap();
                setIsSettingsOpen(true);
              }}
              className="px-2 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/20 to-rose-500/20 hover:from-amber-500/30 hover:to-rose-500/30 border border-amber-500/40 text-amber-300 text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-all shadow-[0_0_10px_rgba(245,158,11,0.2)]"
              title="Ganti Musik Latar Belakang (Sunflower / YouTube / MP3)"
            >
              <Music2 className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden xs:inline">Ganti Lagu</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* FULL MUSIC STUDIO & HOW-TO-CHANGE MODAL */}
      <AnimatePresence>
        {isSettingsOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="w-full max-w-xl rounded-3xl bg-slate-900 border border-rose-500/50 p-5 sm:p-6 text-slate-100 shadow-2xl relative my-auto max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-rose-600 flex items-center justify-center text-xl shadow-lg shadow-rose-950/60">
                    🎧
                  </div>
                  <div>
                    <h3 className="font-heading font-black text-base sm:text-lg text-white tracking-wide">
                      Ganti Suara Latar Belakang
                    </h3>
                    <p className="text-xs text-slate-400">
                      Pilih lagu favorit, tempel link YouTube apa pun, atau upload MP3 sendiri!
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsSettingsOpen(false)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Success Toast */}
              {successToast && (
                <div className="mt-3 p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs flex items-center gap-2 animate-bounce">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{successToast}</span>
                </div>
              )}

              {/* STEP-BY-STEP TUTORIAL / HOW TO CHANGE */}
              <div className="mt-4 rounded-2xl bg-gradient-to-r from-rose-950/40 via-purple-950/30 to-slate-900 border border-rose-500/30 p-3.5">
                <div className="flex items-center justify-between cursor-pointer" onClick={() => setShowGuide(!showGuide)}>
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                    <HelpCircle className="w-4 h-4 text-amber-400" />
                    <span>CARA UBAH SUARA LATAR BELAKANG JADI YANG DIINGINKAN:</span>
                  </div>
                  <button type="button" className="text-xs text-slate-400 hover:text-white">
                    {showGuide ? 'Sembunyikan' : 'Buka Panduan'}
                  </button>
                </div>

                {(showGuide || true) && (
                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-[11px] text-slate-300 pt-2 border-t border-slate-800/80">
                    <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                      <div className="font-bold text-rose-400 mb-1 flex items-center gap-1">
                        <span className="w-4 h-4 rounded-full bg-rose-500/20 text-rose-300 flex items-center justify-center text-[10px]">1</span>
                        <span>Pilih Preset Lagu</span>
                      </div>
                      <p className="text-slate-400 leading-relaxed">
                        Klik salah satu tombol lagu siap pakai di bawah, misalnya <b>🌻 Sunflower (Spider-Verse)</b>!
                      </p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                      <div className="font-bold text-cyan-400 mb-1 flex items-center gap-1">
                        <span className="w-4 h-4 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center text-[10px]">2</span>
                        <span>Tempel Link YouTube</span>
                      </div>
                      <p className="text-slate-400 leading-relaxed">
                        Salin link video/lagu apa pun dari YouTube (misal: <code>https://youtu.be/...</code>) lalu klik <b>Terapkan</b>.
                      </p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                      <div className="font-bold text-emerald-400 mb-1 flex items-center gap-1">
                        <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-[10px]">3</span>
                        <span>Upload File Audio</span>
                      </div>
                      <p className="text-slate-400 leading-relaxed">
                        Pilih file MP3/WAV langsung dari penyimpanan ponsel atau laptopmu untuk diputar tanpa kuota!
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* CURRENTLY PLAYING CARD */}
              <div className="mt-4 p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-950/80 border border-rose-500/40 flex items-center justify-center text-lg">
                    {track.type === 'youtube' ? '🎥' : track.type === 'local_file' ? '📁' : '🎹'}
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider">Sedang Dipilih:</div>
                    <div className="text-sm font-bold text-white">{track.title}</div>
                    <div className="text-xs text-rose-400">{track.artist}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleTogglePlay}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      isPlaying
                        ? 'bg-rose-600 text-white shadow-lg shadow-rose-900/50'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                    }`}
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                    <span>{isPlaying ? 'Pause' : 'Putar'}</span>
                  </button>
                </div>
              </div>

              {/* OPTION A: PRESET POPULER */}
              <div className="mt-5">
                <label className="text-xs font-bold text-slate-300 block mb-2 flex items-center justify-between">
                  <span>🌟 1. PILIH LAGU PRESET SPIDER-MAN & FOKUS:</span>
                  <span className="text-[10px] text-slate-400 font-normal">Klik untuk langsung memutar</span>
                </label>

                <div className="space-y-2">
                  {PRESET_TRACKS.map((p) => {
                    const isSelected =
                      (p.type === 'youtube' && track.youtubeId === p.youtubeId) ||
                      (p.type === 'procedural' && track.type === 'procedural');

                    return (
                      <div
                        key={p.title}
                        onClick={() => handleSelectPreset(p)}
                        className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                          isSelected
                            ? 'bg-rose-950/60 border-rose-500 shadow-[0_0_15px_rgba(225,29,72,0.3)]'
                            : 'bg-slate-950/50 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-lg shrink-0">
                            {p.icon}
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs font-bold text-white flex items-center gap-2">
                              <span>{p.title}</span>
                              <span className="text-[10px] text-slate-400 font-normal truncate">— {p.artist}</span>
                              {isSelected && (
                                <span className="px-1.5 py-0.2 rounded bg-rose-500 text-white text-[9px] font-bold">
                                  AKTIF
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-slate-400 truncate">{p.desc}</div>
                          </div>
                        </div>

                        <div className="shrink-0">
                          <button
                            type="button"
                            className={`p-2 rounded-xl text-xs font-bold flex items-center justify-center ${
                              isSelected ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                            }`}
                          >
                            <Play className="w-3 h-3 fill-current" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* OPTION B: TEMPEL LINK YOUTUBE SENDIRI */}
              <div className="mt-5 pt-4 border-t border-slate-800">
                <label className="text-xs font-bold text-slate-300 block mb-2 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Link2 className="w-3.5 h-3.5 text-rose-400" />
                    <span>2. ATAU TEMPEL LINK YOUTUBE LAGU APA SAJA:</span>
                  </span>
                  <span className="text-[10px] text-cyan-400">Semua Link YouTube Didukung</span>
                </label>

                <div className="space-y-2.5">
                  <div>
                    <input
                      type="text"
                      value={inputUrl}
                      onChange={(e) => setInputUrl(e.target.value)}
                      placeholder="Contoh: https://youtu.be/ApXoWvfEYVU atau https://www.youtube.com/watch?v=..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={inputTitle}
                      onChange={(e) => setInputTitle(e.target.value)}
                      placeholder="Judul Lagu (opsional)"
                      className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
                    />
                    <input
                      type="text"
                      value={inputArtist}
                      onChange={(e) => setInputArtist(e.target.value)}
                      placeholder="Penyanyi / Artis (opsional)"
                      className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
                    />
                  </div>

                  {urlError && (
                    <p className="text-rose-400 text-[11px] leading-relaxed bg-rose-950/40 p-2 rounded-lg border border-rose-500/30">
                      {urlError}
                    </p>
                  )}

                  <button
                    type="button"
                    onClick={handleApplyYouTubeUrl}
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-rose-600 to-rose-500 text-white text-xs font-bold hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-rose-950"
                  >
                    <span>Terapkan & Putar Link YouTube Ini</span>
                    <Sparkles className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* OPTION C: UPLOAD FILE AUDIO SENDIRI */}
              <div className="mt-5 pt-4 border-t border-slate-800">
                <label className="text-xs font-bold text-slate-300 block mb-2 flex items-center gap-1.5">
                  <Upload className="w-3.5 h-3.5 text-cyan-400" />
                  <span>3. ATAU UPLOAD FILE AUDIO MP3 DARI HP / LAPTOP:</span>
                </label>

                <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-dashed border-slate-700 hover:border-cyan-500/50 transition-colors text-center">
                  <input
                    type="file"
                    accept="audio/*"
                    onChange={handleFileUpload}
                    id="audio-file-input"
                    className="hidden"
                  />
                  <label
                    htmlFor="audio-file-input"
                    className="flex flex-col items-center justify-center gap-1 cursor-pointer py-1"
                  >
                    <Upload className="w-5 h-5 text-cyan-400 mb-0.5" />
                    <span className="text-xs font-bold text-white">Klik untuk Memilih File Audio</span>
                    <span className="text-[10px] text-slate-400">Mendukung MP3, WAV, M4A, OGG dari penyimpanan perangkatmu</span>
                  </label>
                </div>
              </div>

              {/* VOLUME & SFX CONTROLS */}
              <div className="mt-5 pt-4 border-t border-slate-800 space-y-3">
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-slate-300 font-semibold">Volume Musik Latar:</span>
                    <span className="font-mono text-rose-400 font-bold">{Math.round(volume * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={volume}
                    onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                    className="w-full accent-rose-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                  />
                </div>
              </div>

              {/* FOOTER ACTIONS */}
              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleToggleMute}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold border flex items-center gap-1.5 cursor-pointer ${
                    isMuted
                      ? 'bg-rose-950/80 border-rose-500 text-rose-300'
                      : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                  }`}
                >
                  {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                  <span>{isMuted ? 'Batal Mute' : 'Mute Musik'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsSettingsOpen(false)}
                  className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold cursor-pointer transition-colors"
                >
                  Selesai
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
