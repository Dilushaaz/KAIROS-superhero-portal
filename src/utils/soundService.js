/**
 * KAIROS Futuristic Web Audio Service
 * Synthesizes subtle command-center interface sound effects via Web Audio API.
 * Pure native Web Audio: zero external audio files, zero extra dependencies.
 */

let audioCtx = null;

const STORAGE_KEY = 'kairos_audio_enabled';

// Initialize or resume AudioContext safely after user gesture
function getAudioContext() {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Checks if sound effects are currently enabled.
 * Defaults to true if unset.
 */
export function isSoundEnabled() {
  if (typeof window === 'undefined') return true;
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved === null ? true : saved === 'true';
}

/**
 * Toggles sound effects on/off and persists the preference.
 */
export function toggleSound() {
  const current = isSoundEnabled();
  const next = !current;
  localStorage.setItem(STORAGE_KEY, String(next));
  if (next) {
    getAudioContext();
    playClickSound();
  }
  return next;
}

/**
 * Sets explicit sound state.
 */
export function setSoundEnabled(enabled) {
  localStorage.setItem(STORAGE_KEY, String(enabled));
  return enabled;
}

/**
 * 1. Interface/button interaction sound:
 * Crisp, subtle high-tech chirp/blip (~1000Hz, quick envelope, gain 0.06).
 */
export function playClickSound() {
  if (!isSoundEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(950, now);
    osc.frequency.exponentialRampToValueAtTime(1400, now + 0.04);

    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.05);
  } catch {
    // Gracefully ignore audio errors
  }
}

/**
 * 2. Incoming KAIROS chat message sound:
 * Soft two-tone cyber chime (587Hz -> 880Hz, gain 0.07).
 */
export function playMessageSound() {
  if (!isSoundEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;

    // Tone 1
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(587.33, now); // D5
    gain1.gain.setValueAtTime(0.05, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.09);

    // Tone 2 (harmonizing second ping)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(880, now + 0.07); // A5
    gain2.gain.setValueAtTime(0.06, now + 0.07);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.07);
    osc2.stop(now + 0.18);
  } catch {
    // Gracefully ignore audio errors
  }
}

/**
 * 3. Successful priority signal dispatch sound:
 * Triumphant harmonic power-up chord (440Hz -> 659.25Hz -> 880Hz with resonant decay, gain 0.09).
 */
export function playDispatchSound() {
  if (!isSoundEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const notes = [440, 554.37, 659.25, 880]; // A4, C#5, E5, A5

    notes.forEach((freq, idx) => {
      const startTime = now + idx * 0.06;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.08, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.45);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.45);
    });
  } catch {
    // Gracefully ignore audio errors
  }
}
