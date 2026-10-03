/**
 * TKA 17 DAYS - Procedural Web Audio Sound Engine
 * Synthesizes background superhero cinematic lo-fi/heroic music and tactile SFX.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private musicGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private isMusicPlaying = false;
  private musicInterval: number | null = null;
  private activeVoices: OscillatorNode[] = [];
  
  public musicVolume = 0.4;
  public sfxVolume = 0.7;
  public isMuted = false;
  public currentMode: 'sunflower' | 'focus' | 'battle' | 'hots' | 'victory' = 'sunflower';

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      this.musicGain = this.ctx.createGain();
      this.sfxGain = this.ctx.createGain();

      this.musicGain.gain.setValueAtTime(this.isMuted ? 0 : this.musicVolume, this.ctx.currentTime);
      this.sfxGain.gain.setValueAtTime(this.isMuted ? 0 : this.sfxVolume, this.ctx.currentTime);

      this.musicGain.connect(this.ctx.destination);
      this.sfxGain.connect(this.ctx.destination);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public async unlock() {
    this.initContext();
    if (this.ctx && this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }
  }

  public setMute(muted: boolean) {
    this.isMuted = muted;
    if (this.musicGain && this.ctx) {
      this.musicGain.gain.setValueAtTime(muted ? 0 : this.musicVolume, this.ctx.currentTime);
    }
    if (this.sfxGain && this.ctx) {
      this.sfxGain.gain.setValueAtTime(muted ? 0 : this.sfxVolume, this.ctx.currentTime);
    }
  }

  public setMusicVolume(val: number) {
    this.musicVolume = Math.max(0, Math.min(1, val));
    if (this.musicGain && this.ctx && !this.isMuted) {
      this.musicGain.gain.setValueAtTime(this.musicVolume, this.ctx.currentTime);
    }
  }

  public setSfxVolume(val: number) {
    this.sfxVolume = Math.max(0, Math.min(1, val));
    if (this.sfxGain && this.ctx && !this.isMuted) {
      this.sfxGain.gain.setValueAtTime(this.sfxVolume, this.ctx.currentTime);
    }
  }

  // Tactile click / tap sound
  public playTap() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(480, t);
      osc.frequency.exponentialRampToValueAtTime(120, t + 0.04);

      gain.gain.setValueAtTime(0.25 * this.sfxVolume, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(t);
      osc.stop(t + 0.045);
    } catch {
      // Audio fallback silent
    }
  }

  // Spider web shoot swoosh
  public playWebShoot() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    try {
      const t = this.ctx.currentTime;
      // White noise burst with pitch sweep
      const bufferSize = this.ctx.sampleRate * 0.15;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(2200, t);
      filter.frequency.exponentialRampToValueAtTime(450, t + 0.14);
      filter.Q.setValueAtTime(4, t);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.4 * this.sfxVolume, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.14);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.sfxGain);

      noise.start(t);
      noise.stop(t + 0.15);

      // Add high-pitch zip oscillator
      const zip = this.ctx.createOscillator();
      const zipGain = this.ctx.createGain();
      zip.type = 'sine';
      zip.frequency.setValueAtTime(800, t);
      zip.frequency.exponentialRampToValueAtTime(1900, t + 0.08);

      zipGain.gain.setValueAtTime(0.18 * this.sfxVolume, t);
      zipGain.gain.exponentialRampToValueAtTime(0.001, t + 0.09);

      zip.connect(zipGain);
      zipGain.connect(this.sfxGain);

      zip.start(t);
      zip.stop(t + 0.09);
    } catch {
      // audio error fallback
    }
  }

  // Correct answer chime / fanfare
  public playCorrect() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    try {
      const t = this.ctx.currentTime;
      // C5, E5, G5, C6 triumphant arpeggio
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        const start = t + idx * 0.07;
        const dur = 0.35;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.3 * this.sfxVolume, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + dur);

        osc.connect(gain);
        gain.connect(this.sfxGain!);

        osc.start(start);
        osc.stop(start + dur);
      });
    } catch {
      // silent
    }
  }

  // Wrong answer soft thump
  public playWrong() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    try {
      const t = this.ctx.currentTime;
      [220, 185].forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        const start = t + idx * 0.12;

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.2 * this.sfxVolume, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.18);

        osc.connect(gain);
        gain.connect(this.sfxGain!);

        osc.start(start);
        osc.stop(start + 0.19);
      });
    } catch {
      // silent
    }
  }

  // XP Sparkle
  public playXp() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    try {
      const t = this.ctx.currentTime;
      const freqs = [659.25, 830.61, 987.77, 1318.51, 1661.22];
      freqs.forEach((f, i) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        const st = t + i * 0.05;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, st);

        gain.gain.setValueAtTime(0.22 * this.sfxVolume, st);
        gain.gain.exponentialRampToValueAtTime(0.001, st + 0.25);

        osc.connect(gain);
        gain.connect(this.sfxGain!);

        osc.start(st);
        osc.stop(st + 0.25);
      });
    } catch {
      // silent
    }
  }

  // Level Up celebration
  public playLevelUp() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    try {
      const t = this.ctx.currentTime;
      // Majestic chord succession: F -> G -> C
      const chords = [
        { freqs: [349.23, 440, 523.25], start: 0, dur: 0.25 },
        { freqs: [392, 493.88, 587.33], start: 0.25, dur: 0.28 },
        { freqs: [523.25, 659.25, 783.99, 1046.50], start: 0.54, dur: 0.8 },
      ];

      chords.forEach(c => {
        c.freqs.forEach(freq => {
          const osc = this.ctx!.createOscillator();
          const gain = this.ctx!.createGain();
          const st = t + c.start;

          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, st);

          gain.gain.setValueAtTime(0.25 * this.sfxVolume, st);
          gain.gain.exponentialRampToValueAtTime(0.001, st + c.dur);

          osc.connect(gain);
          gain.connect(this.sfxGain!);

          osc.start(st);
          osc.stop(st + c.dur);
        });
      });
    } catch {
      // silent
    }
  }

  // Timer alert: 10 min short bell
  public playBellShort() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, t);
      osc.frequency.exponentialRampToValueAtTime(1760, t + 0.1);

      gain.gain.setValueAtTime(0.4 * this.sfxVolume, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.8);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(t);
      osc.stop(t + 0.85);
    } catch {
      // silent
    }
  }

  // Timer alert: 5 min & 1 min warning bell
  public playBellWarning() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    try {
      const t = this.ctx.currentTime;
      [880, 1174.66].forEach((f, i) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        const st = t + i * 0.18;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, st);

        gain.gain.setValueAtTime(0.4 * this.sfxVolume, st);
        gain.gain.exponentialRampToValueAtTime(0.001, st + 0.6);

        osc.connect(gain);
        gain.connect(this.sfxGain!);

        osc.start(st);
        osc.stop(st + 0.65);
      });
    } catch {
      // silent
    }
  }

  // Countdown tick (10, 9, 8...)
  public playCountdownTick() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(980, t);

      gain.gain.setValueAtTime(0.35 * this.sfxVolume, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(t);
      osc.stop(t + 0.09);
    } catch {
      // silent
    }
  }

  // Mission Complete alarm & victory anthem
  public playMissionCompleteAlarm() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    try {
      const t = this.ctx.currentTime;
      // Superhero heroic anthem motifs: C4 -> G4 -> C5 -> E5 -> G5
      const notes = [
        { f: 261.63, start: 0, dur: 0.25 },
        { f: 392.00, start: 0.25, dur: 0.25 },
        { f: 523.25, start: 0.50, dur: 0.35 },
        { f: 659.25, start: 0.85, dur: 0.35 },
        { f: 783.99, start: 1.20, dur: 1.0 },
      ];

      notes.forEach(n => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        const st = t + n.start;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(n.f, st);

        gain.gain.setValueAtTime(0.4 * this.sfxVolume, st);
        gain.gain.exponentialRampToValueAtTime(0.001, st + n.dur);

        osc.connect(gain);
        gain.connect(this.sfxGain!);

        osc.start(st);
        osc.stop(st + n.dur);
      });
    } catch {
      // silent
    }
  }

  // Background Music Generator (Sunflower Theme / Superhero Cinematic Synth / Lo-Fi / Battle / Victory)
  public startMusic(mode: 'sunflower' | 'focus' | 'battle' | 'hots' | 'victory' = 'sunflower') {
    this.currentMode = mode;
    this.initContext();
    if (!this.ctx || !this.musicGain) return;

    this.stopMusic();
    this.isMusicPlaying = true;

    // Pattern loops according to mode
    let step = 0;
    
    // Sunflower (Post Malone & Swae Lee): Key of D major
    // Chords: D maj (D-F#-A) -> G maj (G-B-D) -> Em (E-G-B) -> A maj (A-C#-E)
    const sunflowerChords = [
      [146.83, 220.00, 293.66, 369.99], // D maj7
      [196.00, 246.94, 293.66, 392.00], // G maj
      [164.81, 196.00, 246.94, 329.63], // E min7
      [220.00, 277.18, 329.63, 440.00], // A maj
    ];

    // Sunflower iconic hook melody: "Needless to say I keep in check... You're a sunflower"
    const sunflowerLeadNotes = [
      369.99, 392.00, 440.00, 440.00, 369.99, 293.66, 329.63, 369.99, // F#4, G4, A4, A4, F#4, D4, E4, F#4
      440.00, 392.00, 369.99, 329.63, 293.66, 329.63, 369.99, 293.66, // A4, G4, F#4, E4, D4, E4, F#4, D4
      369.99, 369.99, 369.99, 329.63, 293.66, 293.66, 329.63, 369.99, // "Needless to say I keep in check"
      440.00, 440.00, 392.00, 369.99, 329.63, 293.66, 329.63, 293.66, // "She was a bad bad nevertheless"
    ];

    // Mode specific chord progressions & root frequencies
    const focusChords = [
      [130.81, 196.00, 261.63, 329.63], // C maj9
      [110.00, 164.81, 220.00, 261.63], // A min7
      [87.31, 130.81, 174.61, 220.00],  // F maj7
      [98.00, 146.83, 196.00, 246.94],  // G sus4
    ];

    const battleArps = [
      130.81, 164.81, 196.00, 246.94, 261.63, 196.00, 164.81, 196.00,
      110.00, 130.81, 164.81, 220.00, 246.94, 164.81, 130.81, 164.81,
    ];

    const hotsMelody = [
      220.00, 246.94, 261.63, 329.63, 392.00, 329.63, 261.63, 246.94
    ];

    const victoryChords = [
      [261.63, 329.63, 392.00, 523.25],
      [293.66, 369.99, 440.00, 587.33],
      [329.63, 392.00, 493.88, 659.25],
      [392.00, 493.88, 587.33, 783.99],
    ];

    const playLoop = () => {
      if (!this.isMusicPlaying || !this.ctx || !this.musicGain) return;
      const t = this.ctx.currentTime;

      if (this.currentMode === 'sunflower') {
        // Sunflower warm chilled rhythm & electric piano chords + melodic bell
        const chordIdx = Math.floor(step / 4) % sunflowerChords.length;
        const freqs = sunflowerChords[chordIdx];

        // Play chord pad
        freqs.forEach((freq, i) => {
          const osc = this.ctx!.createOscillator();
          const gain = this.ctx!.createGain();
          const filter = this.ctx!.createBiquadFilter();

          osc.type = i === 0 ? 'sine' : 'triangle';
          osc.frequency.setValueAtTime(freq, t);

          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(1100, t);

          const dur = 1.4;
          gain.gain.setValueAtTime(0.001, t);
          gain.gain.linearRampToValueAtTime(0.14 * this.musicVolume, t + 0.15);
          gain.gain.linearRampToValueAtTime(0.001, t + dur);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(this.musicGain!);

          osc.start(t);
          osc.stop(t + dur);
          this.activeVoices.push(osc);
        });

        // Play iconic Sunflower lead hook note
        const leadFreq = sunflowerLeadNotes[step % sunflowerLeadNotes.length];
        const leadOsc = this.ctx.createOscillator();
        const leadGain = this.ctx.createGain();
        leadOsc.type = 'sine';
        leadOsc.frequency.setValueAtTime(leadFreq, t + 0.05);

        leadGain.gain.setValueAtTime(0.001, t + 0.05);
        leadGain.gain.linearRampToValueAtTime(0.16 * this.musicVolume, t + 0.12);
        leadGain.gain.exponentialRampToValueAtTime(0.001, t + 0.55);

        leadOsc.connect(leadGain);
        leadGain.connect(this.musicGain);

        leadOsc.start(t + 0.05);
        leadOsc.stop(t + 0.58);
        this.activeVoices.push(leadOsc);

      } else if (this.currentMode === 'focus') {
        // Warm ambient superhero drone pad
        const chordIndex = Math.floor(step / 4) % focusChords.length;
        const freqs = focusChords[chordIndex];

        freqs.forEach((freq, i) => {
          const osc = this.ctx!.createOscillator();
          const gain = this.ctx!.createGain();
          const filter = this.ctx!.createBiquadFilter();

          osc.type = i === 0 ? 'sine' : 'triangle';
          osc.frequency.setValueAtTime(freq, t);

          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(800 + Math.sin(step) * 200, t);

          const dur = 1.95;
          gain.gain.setValueAtTime(0.001, t);
          gain.gain.linearRampToValueAtTime(0.12 * this.musicVolume, t + 0.4);
          gain.gain.linearRampToValueAtTime(0.001, t + dur);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(this.musicGain!);

          osc.start(t);
          osc.stop(t + dur);
          this.activeVoices.push(osc);
        });

      } else if (this.currentMode === 'battle') {
        // Driving heroic 16th note synth pulse
        const freq = battleArps[step % battleArps.length];
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, t);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1400, t);
        filter.frequency.exponentialRampToValueAtTime(300, t + 0.22);

        gain.gain.setValueAtTime(0.15 * this.musicVolume, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.musicGain);

        osc.start(t);
        osc.stop(t + 0.24);
        this.activeVoices.push(osc);

      } else if (this.currentMode === 'hots') {
        // Dramatic heroic tension
        const freq = hotsMelody[step % hotsMelody.length];
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'square';
        osc.frequency.setValueAtTime(freq, t);

        gain.gain.setValueAtTime(0.12 * this.musicVolume, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);

        osc.connect(gain);
        gain.connect(this.musicGain);

        osc.start(t);
        osc.stop(t + 0.36);
        this.activeVoices.push(osc);

      } else if (this.currentMode === 'victory') {
        // Uplifting fanfare loop
        const chord = victoryChords[step % victoryChords.length];
        chord.forEach(f => {
          const osc = this.ctx!.createOscillator();
          const gain = this.ctx!.createGain();

          osc.type = 'triangle';
          osc.frequency.setValueAtTime(f, t);

          gain.gain.setValueAtTime(0.14 * this.musicVolume, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.7);

          osc.connect(gain);
          gain.connect(this.musicGain!);

          osc.start(t);
          osc.stop(t + 0.72);
          this.activeVoices.push(osc);
        });
      }

      step++;
      // Clean up dead oscillator references
      if (this.activeVoices.length > 30) {
        this.activeVoices = this.activeVoices.slice(-15);
      }
    };

    const intervalTime = this.currentMode === 'focus' ? 1800 : (this.currentMode === 'battle' ? 240 : (this.currentMode === 'hots' ? 360 : 750));
    playLoop();
    this.musicInterval = window.setInterval(playLoop, intervalTime);
  }

  public stopMusic() {
    this.isMusicPlaying = false;
    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
    this.activeVoices.forEach(osc => {
      try { osc.stop(); } catch { /* silent */ }
    });
    this.activeVoices = [];
  }

  public toggleMusic(enable?: boolean) {
    const shouldPlay = enable !== undefined ? enable : !this.isMusicPlaying;
    if (shouldPlay) {
      this.startMusic(this.currentMode);
    } else {
      this.stopMusic();
    }
    return this.isMusicPlaying;
  }

  public isPlaying(): boolean {
    return this.isMusicPlaying;
  }
}

export const sound = new SoundEngine();
