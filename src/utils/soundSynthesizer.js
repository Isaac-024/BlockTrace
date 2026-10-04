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

  // 5. Final Victory: celebratory melodic resolution
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

  // 6. Original Voxel Blast / TNT-style Sound Effect: short fuse crackle -> deep punch -> rumbling tail
  playVoxelBlast() {
    if (!this.shouldPlay('voxel_blast', 800)) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;

    // A) Short Fuse / Build-up crackle (0.0s - 0.08s)
    try {
      const bufferSize = Math.floor(this.ctx.sampleRate * 0.08);
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.5));
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;

      const fuseFilter = this.ctx.createBiquadFilter();
      fuseFilter.type = 'bandpass';
      fuseFilter.frequency.setValueAtTime(600, now);
      fuseFilter.frequency.exponentialRampToValueAtTime(2400, now + 0.07);
      fuseFilter.Q.setValueAtTime(3, now);

      const fuseGain = this.ctx.createGain();
      fuseGain.gain.setValueAtTime(0.001, now);
      fuseGain.gain.linearRampToValueAtTime(0.08, now + 0.04);
      fuseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);

      whiteNoise.connect(fuseFilter);
      fuseFilter.connect(fuseGain);
      fuseGain.connect(this.ctx.destination);

      whiteNoise.start(now);
      whiteNoise.stop(now + 0.09);
    } catch (e) {
      // Audio buffer fallback safe
    }

    // B) Deep Impact & Noise Burst (starts at now + 0.07s)
    const impactTime = now + 0.07;

    // Sub-bass punch oscillator (deep pitch drop 130Hz -> 30Hz)
    const subOsc = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();
    subOsc.type = 'triangle';
    subOsc.frequency.setValueAtTime(135, impactTime);
    subOsc.frequency.exponentialRampToValueAtTime(28, impactTime + 0.38);

    subGain.gain.setValueAtTime(0.001, impactTime);
    subGain.gain.linearRampToValueAtTime(0.14, impactTime + 0.02);
    subGain.gain.exponentialRampToValueAtTime(0.0001, impactTime + 0.42);

    subOsc.connect(subGain);
    subGain.connect(this.ctx.destination);

    subOsc.start(impactTime);
    subOsc.stop(impactTime + 0.45);

    // Explosive blast noise body (lowpass filtered noise)
    try {
      const blastLen = Math.floor(this.ctx.sampleRate * 0.55);
      const blastBuffer = this.ctx.createBuffer(1, blastLen, this.ctx.sampleRate);
      const blastData = blastBuffer.getChannelData(0);
      for (let i = 0; i < blastLen; i++) {
        blastData[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / blastLen, 1.8);
      }

      const blastSource = this.ctx.createBufferSource();
      blastSource.buffer = blastBuffer;

      const blastFilter = this.ctx.createBiquadFilter();
      blastFilter.type = 'lowpass';
      blastFilter.frequency.setValueAtTime(1800, impactTime);
      blastFilter.frequency.exponentialRampToValueAtTime(120, impactTime + 0.45);

      const blastGain = this.ctx.createGain();
      blastGain.gain.setValueAtTime(0.001, impactTime);
      blastGain.gain.linearRampToValueAtTime(0.12, impactTime + 0.015);
      blastGain.gain.exponentialRampToValueAtTime(0.0001, impactTime + 0.55);

      blastSource.connect(blastFilter);
      blastFilter.connect(blastGain);
      blastGain.connect(this.ctx.destination);

      blastSource.start(impactTime);
      blastSource.stop(impactTime + 0.58);
    } catch (e) {
      // Audio buffer fallback safe
    }
  }
}

export const sound = new SoundEngine();
