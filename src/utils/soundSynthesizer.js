// Web Audio API Synthesizer - Subtle, polished, copyright-free sound design

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.muted = false;
    this.lastPlayed = {}; // Debounce tracking to prevent repeated fires
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  setMuted(muted) {
    this.muted = Boolean(muted);
  }

  isMuted() {
    return this.muted;
  }

  // Throttle helper to prevent React re-renders or rapid double-events from replaying
  shouldPlay(soundKey, throttleMs = 350) {
    if (this.muted) return false;
    const now = Date.now();
    const lastTime = this.lastPlayed[soundKey] || 0;
    if (now - lastTime < throttleMs) {
      return false;
    }
    this.lastPlayed[soundKey] = now;
    return true;
  }

  // Helper to create a warm low-pass filter chain for softer tones
  createFilteredGain(initialVolume = 0.08, cutoffFreq = 1200) {
    this.init();
    if (!this.ctx) return null;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(cutoffFreq, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(initialVolume, this.ctx.currentTime);

    filter.connect(gain);
    gain.connect(this.ctx.destination);

    return { filter, gain };
  }

  // No-op for standard UI click/hover to keep audio quiet and unobtrusive
  playClick() {
    // Intentionally silent: removed robotic/unnecessary clicks on navigation
  }

  playBlockPlace() {
    // Intentionally silent: removed sounds on card moves and UI drags
  }

  // 1. Correct Answer: gentle, warm harmonic chime
  playCorrect() {
    if (!this.shouldPlay('correct', 400)) return;
    this.init();
    if (!this.ctx) return;

    const chain = this.createFilteredGain(0.09, 1400);
    if (!chain) return;

    const now = this.ctx.currentTime;
    const notes = [
      { freq: 523.25, time: 0, dur: 0.22 },   // C5
      { freq: 659.25, time: 0.08, dur: 0.35 }  // E5
    ];

    notes.forEach(({ freq, time, dur }) => {
      const osc = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + time);

      noteGain.gain.setValueAtTime(0.001, now + time);
      noteGain.gain.linearRampToValueAtTime(0.08, now + time + 0.02);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + time + dur);

      osc.connect(noteGain);
      noteGain.connect(chain.filter);

      osc.start(now + time);
      osc.stop(now + time + dur + 0.05);
    });
  }

  // 2. Incorrect Answer: muted, soft low-frequency warning (no harsh buzzer)
  playIncorrect() {
    if (!this.shouldPlay('incorrect', 400)) return;
    this.init();
    if (!this.ctx) return;

    const chain = this.createFilteredGain(0.08, 600);
    if (!chain) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(85, now + 0.22);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.1, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.24);

    osc.connect(gain);
    gain.connect(chain.filter);

    osc.start(now);
    osc.stop(now + 0.26);
  }

  // 3. Clue Found: delicate, ascending discovery chime
  playClueFound() {
    if (!this.shouldPlay('clue', 500)) return;
    this.init();
    if (!this.ctx) return;

    const chain = this.createFilteredGain(0.08, 1600);
    if (!chain) return;

    const now = this.ctx.currentTime;
    // Elegant triad: A4 -> C#5 -> E5
    const notes = [
      { freq: 440.00, time: 0, dur: 0.25 },
      { freq: 554.37, time: 0.09, dur: 0.28 },
      { freq: 659.25, time: 0.18, dur: 0.42 }
    ];

    notes.forEach(({ freq, time, dur }) => {
      const osc = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + time);

      noteGain.gain.setValueAtTime(0.001, now + time);
      noteGain.gain.linearRampToValueAtTime(0.07, now + time + 0.02);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + time + dur);

      osc.connect(noteGain);
      noteGain.connect(chain.filter);

      osc.start(now + time);
      osc.stop(now + time + dur + 0.05);
    });
  }

  // 4. Level Completed: pleasant 3-note confirmation
  playLevelComplete() {
    if (!this.shouldPlay('level_complete', 600)) return;
    this.init();
    if (!this.ctx) return;

    const chain = this.createFilteredGain(0.09, 1500);
    if (!chain) return;

    const now = this.ctx.currentTime;
    const chords = [
      { freq: 523.25, time: 0, dur: 0.2 },    // C5
      { freq: 659.25, time: 0.1, dur: 0.25 }, // E5
      { freq: 783.99, time: 0.2, dur: 0.5 }   // G5
    ];

    chords.forEach(({ freq, time, dur }) => {
      const osc = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + time);

      noteGain.gain.setValueAtTime(0.001, now + time);
      noteGain.gain.linearRampToValueAtTime(0.07, now + time + 0.02);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + time + dur);

      osc.connect(noteGain);
      noteGain.connect(chain.filter);

      osc.start(now + time);
      osc.stop(now + time + dur + 0.05);
    });
  }

  // 5. Final Victory: soft, celebratory melodic resolution
  playVictory() {
    if (!this.shouldPlay('victory', 1500)) return;
    this.init();
    if (!this.ctx) return;

    const chain = this.createFilteredGain(0.1, 1600);
    if (!chain) return;

    const now = this.ctx.currentTime;
    const victoryNotes = [
      { freq: 523.25, time: 0, dur: 0.18 },    // C5
      { freq: 659.25, time: 0.16, dur: 0.2 },  // E5
      { freq: 783.99, time: 0.32, dur: 0.3 },  // G5
      { freq: 1046.50, time: 0.55, dur: 0.6 }  // C6
    ];

    victoryNotes.forEach(({ freq, time, dur }) => {
      const osc = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + time);

      noteGain.gain.setValueAtTime(0.001, now + time);
      noteGain.gain.linearRampToValueAtTime(0.09, now + time + 0.03);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + time + dur);

      osc.connect(noteGain);
      noteGain.connect(chain.filter);

      osc.start(now + time);
      osc.stop(now + time + dur + 0.05);
    });
  }
}

export const sound = new SoundEngine();
