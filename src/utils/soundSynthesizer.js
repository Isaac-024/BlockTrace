// Web Audio API Synthesizer - 100% original, copyright-free sound design

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.muted = false;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setMuted(muted) {
    this.muted = muted;
  }

  isMuted() {
    return this.muted;
  }

  // Play crisp cyber-voxel click
  playClick() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(650, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(320, this.ctx.currentTime + 0.04);

    gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.04);
  }

  // Play voxel block placement tap
  playBlockPlace() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(220, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(90, this.ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.08);
  }

  // Clue Discovered - magical ascending mystery chime
  playClueFound() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const notes = [440, 554.37, 659.25, 880]; // A4, C#5, E5, A5
    notes.forEach((freq, index) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + index * 0.08);

      gain.gain.setValueAtTime(0, this.ctx.currentTime + index * 0.08);
      gain.gain.linearRampToValueAtTime(0.12, this.ctx.currentTime + index * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + index * 0.08 + 0.3);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(this.ctx.currentTime + index * 0.08);
      osc.stop(this.ctx.currentTime + index * 0.08 + 0.35);
    });
  }

  // Success / Correct Answer
  playCorrect() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const chords = [523.25, 659.25, 783.99]; // C5, E5, G5
    chords.forEach((freq) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.09, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.4);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.4);
    });
  }

  // Incorrect Answer / Error Buzz
  playIncorrect() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(140, this.ctx.currentTime);
    osc.frequency.setValueAtTime(110, this.ctx.currentTime + 0.12);

    gain.gain.setValueAtTime(0.14, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.28);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.28);
  }

  // Level Complete fanfare
  playLevelComplete() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const sequence = [
      { freq: 440, time: 0 },
      { freq: 554, time: 0.1 },
      { freq: 659, time: 0.2 },
      { freq: 880, time: 0.3 },
      { freq: 1108, time: 0.45 },
    ];

    sequence.forEach(({ freq, time }) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + time);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime + time);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + time + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(this.ctx.currentTime + time);
      osc.stop(this.ctx.currentTime + time + 0.3);
    });
  }

  // Victory celebration song
  playVictory() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const victoryNotes = [
      { freq: 523.25, time: 0, dur: 0.15 },
      { freq: 523.25, time: 0.18, dur: 0.15 },
      { freq: 523.25, time: 0.36, dur: 0.15 },
      { freq: 659.25, time: 0.54, dur: 0.3 },
      { freq: 783.99, time: 0.9, dur: 0.5 },
      { freq: 1046.50, time: 1.45, dur: 0.8 },
    ];

    victoryNotes.forEach(({ freq, time, dur }) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + time);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime + time);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + time + dur);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(this.ctx.currentTime + time);
      osc.stop(this.ctx.currentTime + time + dur + 0.05);
    });
  }
}

export const sound = new SoundEngine();
