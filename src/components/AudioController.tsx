import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, Music, Disc3, ShieldAlert, Sparkles, X } from 'lucide-react';
import { sound } from '../services/soundEngine';

interface AudioControllerProps {
  unlocked: boolean;
  onUnlock: () => void;
}

export const AudioController: React.FC<AudioControllerProps> = ({ unlocked, onUnlock }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(sound.isPlaying());
  const [musicVol, setMusicVol] = useState(sound.musicVolume);
  const [sfxVol, setSfxVol] = useState(sound.sfxVolume);
  const [muted, setMuted] = useState(sound.isMuted);
  const [currentMode, setCurrentMode] = useState(sound.currentMode);

  const handleToggleMusic = () => {
    sound.unlock();
    const playing = sound.toggleMusic();
    setIsPlaying(playing);
    sound.playTap();
  };

  const handleModeChange = (mode: 'focus' | 'battle' | 'hots' | 'victory') => {
    setCurrentMode(mode);
    sound.currentMode = mode;
    sound.unlock();
    sound.startMusic(mode);
    setIsPlaying(true);
    sound.playTap();
  };

  const handleMuteToggle = () => {
    const nextMute = !muted;
    setMuted(nextMute);
    sound.setMute(nextMute);
  };

  const handleMusicVol = (v: number) => {
    setMusicVol(v);
    sound.setMusicVolume(v);
  };

  const handleSfxVol = (v: number) => {
    setSfxVol(v);
    sound.setSfxVolume(v);
  };

  return (
    <>
      {/* Initial Activation Banner if not unlocked */}
      {!unlocked && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-sm rounded-3xl bg-slate-900 border border-rose-500/40 p-6 text-center spider-glow relative overflow-hidden"
          >
            {/* Background spider web decorative line */}
            <div className="absolute -top-12 -right-12 w-36 h-36 bg-rose-600/10 rounded-full blur-xl pointer-events-none" />

            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-rose-500 to-cyan-500 flex items-center justify-center text-3xl shadow-lg shadow-rose-900/50">
              🎧
            </div>

            <h3 className="text-xl font-black font-heading text-white mb-2 tracking-wide">
              READY FOR MISSION?
            </h3>
            <p className="text-xs text-slate-300 mb-6 leading-relaxed">
              Aktifkan sistem audio superhero untuk menikmati musik latar sinematik, efek jaring laba-laba, dan alarm misi interaktif!
            </p>

            <div className="space-y-3">
              <button
                type="button"
                onClick={() => {
                  sound.unlock();
                  sound.startMusic('focus');
                  setIsPlaying(true);
                  onUnlock();
                }}
                className="w-full py-3 px-5 rounded-2xl bg-gradient-to-r from-rose-600 to-rose-500 text-white text-sm font-bold shadow-lg shadow-rose-950 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>AKTIFKAN SOUND & MUSIK</span>
                <span>🔊</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  sound.unlock();
                  onUnlock();
                }}
                className="w-full py-2.5 px-4 rounded-xl text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                Lanjut Tanpa Musik (Mode Hening)
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Floating Sound Toggle Button */}
      <div className="fixed top-3 right-3 z-40 flex items-center gap-2">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className={`h-9 px-3 rounded-full flex items-center gap-2 text-xs font-semibold backdrop-blur-md transition-all cursor-pointer ${
            isPlaying && !muted
              ? 'bg-rose-950/80 border border-rose-500/60 text-rose-300 shadow-[0_0_12px_rgba(225,29,72,0.4)]'
              : 'bg-slate-900/80 border border-slate-700 text-slate-400 hover:text-white'
          }`}
          title="Pengaturan Musik & Suara"
        >
          <Music className={`w-3.5 h-3.5 ${isPlaying && !muted ? 'animate-spin' : ''}`} />
          <span className="hidden sm:inline">{isPlaying && !muted ? 'Sound ON' : 'Sound'}</span>
          {muted ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Audio Settings Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="w-full max-w-md rounded-3xl bg-slate-900 border border-slate-800 p-6 text-slate-100 shadow-2xl relative"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-rose-950 border border-rose-500/40 flex items-center justify-center text-rose-400">
                    <Disc3 className="w-4 h-4 animate-spin" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white">Sistem Musik & Suara</h3>
                    <p className="text-[11px] text-slate-400">Superhero Cinematic Audio Engine</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Music Mode Switcher */}
              <div className="mt-4">
                <label className="text-xs font-semibold text-slate-300 block mb-2">Tema Musik Latar:</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'sunflower', name: '🌻 Sunflower Mode', desc: 'Spider-Verse OST Chills' },
                    { id: 'focus', name: '🎧 Focus Mode', desc: 'Ambient lo-fi hangat' },
                    { id: 'battle', name: '⚡ Battle Mode', desc: 'Ritmik heroik cepat' },
                    { id: 'hots', name: '🔥 HOTS Mode', desc: 'Ketegangan sinematik' },
                    { id: 'victory', name: '🏆 Victory Mode', desc: 'Fanfare kemenangan' },
                  ].map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => handleModeChange(m.id as any)}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        currentMode === m.id
                          ? 'bg-rose-950/60 border-rose-500 text-white spider-glow'
                          : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:border-slate-500'
                      }`}
                    >
                      <div className="text-xs font-bold">{m.name}</div>
                      <div className="text-[10px] text-slate-400">{m.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Controls */}
              <div className="mt-5 space-y-4">
                {/* Music Volume */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-slate-300">Volume Musik</span>
                    <span className="font-mono-numbers text-rose-400">{Math.round(musicVol * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={musicVol}
                    onChange={(e) => handleMusicVol(parseFloat(e.target.value))}
                    className="w-full accent-rose-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                  />
                </div>

                {/* SFX Volume */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-slate-300">Volume Sound Effect (SFX)</span>
                    <span className="font-mono-numbers text-cyan-400">{Math.round(sfxVol * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={sfxVol}
                    onChange={(e) => handleSfxVol(parseFloat(e.target.value))}
                    className="w-full accent-cyan-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleMuteToggle}
                  className={`px-3 py-2 rounded-xl text-xs font-medium border flex items-center gap-1.5 cursor-pointer ${
                    muted
                      ? 'bg-rose-950/80 border-rose-500 text-rose-300'
                      : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                  }`}
                >
                  {muted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                  <span>{muted ? 'Unmute' : 'Mute Semua'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleToggleMusic}
                  className={`px-4 py-2 rounded-xl text-xs font-bold text-white transition-all cursor-pointer flex items-center gap-1.5 ${
                    isPlaying
                      ? 'bg-rose-600 hover:bg-rose-500 shadow-md shadow-rose-900/50'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                  }`}
                >
                  <Music className="w-3.5 h-3.5" />
                  <span>{isPlaying ? 'Pause Musik' : 'Mainkan Musik'}</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
