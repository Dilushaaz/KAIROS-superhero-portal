/**
 * KAIROS Cinematic Soundtrack & Audio Service
 * Synthesizes an epic, royal, heroic orchestral-electronic soundtrack and
 * subtle command-center interface sound effects via native Web Audio API.
 * 100% original, royalty-free, 0MB external audio downloads, instant start.
 */

let audioCtx = null;
let bgMusicNodes = null;
let isMusicPlaying = false;

const STORAGE_KEY = 'kairos_audio_enabled';

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

export function isSoundEnabled() {
  if (typeof window === 'undefined') return true;
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved === null ? true : saved === 'true';
}

export function toggleSound() {
  const current = isSoundEnabled();
  const next = !current;
  localStorage.setItem(STORAGE_KEY, String(next));

  if (next) {
    getAudioContext();
    startCinematicTheme();
    playClickSound();
  } else {
    stopCinematicTheme();
  }
  return next;
}

export function setSoundEnabled(enabled) {
  localStorage.setItem(STORAGE_KEY, String(enabled));
  if (enabled) {
    startCinematicTheme();
  } else {
    stopCinematicTheme();
  }
  return enabled;
}

export function playClickSound() {
  if (!isSoundEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1050, now);
    osc.frequency.exponentialRampToValueAtTime(1550, now + 0.04);

    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.05);
  } catch {
    // ignore
  }
}

export function playMessageSound() {
  if (!isSoundEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(587.33, now);
    gain1.gain.setValueAtTime(0.05, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.09);

    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(880, now + 0.07);
    gain2.gain.setValueAtTime(0.06, now + 0.07);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.07);
    osc2.stop(now + 0.18);
  } catch {
    // ignore
  }
}

export function playDispatchSound() {
  if (!isSoundEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const notes = [440, 554.37, 659.25, 880];

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
    // ignore
  }
}

/**
 * AAA Heroic Orchestral-Synthesizer Soundtrack
 * Emotion: Royal, heroic, mysterious, powerful, suspenseful.
 * Progression: D minor -> Bb major -> C major -> D minor
 * Rich detuned analog pads, deep resonant drone, slow breathing LFO, and periodic cinematic impact pulses.
 */
export function startCinematicTheme() {
  if (!isSoundEnabled() || isMusicPlaying) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
    masterGain.gain.exponentialRampToValueAtTime(0.065, ctx.currentTime + 3.5); // Smooth 3.5s fade-in
    masterGain.connect(ctx.destination);

    // 1. Deep Royal Bass Drone (D1: 36.71 Hz + D2: 73.42 Hz)
    const droneOsc1 = ctx.createOscillator();
    droneOsc1.type = 'sawtooth';
    droneOsc1.frequency.setValueAtTime(36.71, ctx.currentTime);

    const droneOsc2 = ctx.createOscillator();
    droneOsc2.type = 'triangle';
    droneOsc2.frequency.setValueAtTime(73.42, ctx.currentTime);
    droneOsc2.detune.setValueAtTime(4, ctx.currentTime);

    const droneFilter = ctx.createBiquadFilter();
    droneFilter.type = 'lowpass';
    droneFilter.frequency.setValueAtTime(110, ctx.currentTime);

    const droneGain = ctx.createGain();
    droneGain.gain.setValueAtTime(0.65, ctx.currentTime);

    droneOsc1.connect(droneFilter);
    droneOsc2.connect(droneFilter);
    droneFilter.connect(droneGain);
    droneGain.connect(masterGain);

    droneOsc1.start();
    droneOsc2.start();

    // 2. Swelling Orchestral Chord Layers (Dm9: D3, A3, F4, C5, E5)
    const chordFrequencies = [146.83, 220.00, 349.23, 523.25, 659.25];
    const padOscs = [];

    const padFilter = ctx.createBiquadFilter();
    padFilter.type = 'lowpass';
    padFilter.frequency.setValueAtTime(420, ctx.currentTime);
    padFilter.Q.setValueAtTime(2.2, ctx.currentTime);

    // Slow atmospheric breathing LFO filter modulation
    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.12, ctx.currentTime); // 0.12 Hz slow royal wave

    const lfoGain = ctx.createGain();
    lfoGain.gain.setValueAtTime(200, ctx.currentTime);

    lfo.connect(lfoGain);
    lfoGain.connect(padFilter.frequency);
    lfo.start();

    chordFrequencies.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.detune.setValueAtTime((idx % 2 === 0 ? 6 : -7), ctx.currentTime);

      const oscGain = ctx.createGain();
      oscGain.gain.setValueAtTime(0.12, ctx.currentTime);

      osc.connect(padFilter);
      osc.start();
      padOscs.push(osc);
    });

    padFilter.connect(masterGain);

    // 3. Periodic Cinematic Sub Impact Pulse (every 6 seconds)
    let impactInterval = setInterval(() => {
      if (!isMusicPlaying || !ctx) return;
      try {
        const impactNow = ctx.currentTime;
        const impactOsc = ctx.createOscillator();
        const impactGain = ctx.createGain();

        impactOsc.type = 'sine';
        impactOsc.frequency.setValueAtTime(95, impactNow);
        impactOsc.frequency.exponentialRampToValueAtTime(32, impactNow + 0.35);

        impactGain.gain.setValueAtTime(0.4, impactNow);
        impactGain.gain.exponentialRampToValueAtTime(0.001, impactNow + 1.2);

        impactOsc.connect(impactGain);
        impactGain.connect(masterGain);

        impactOsc.start(impactNow);
        impactOsc.stop(impactNow + 1.25);
      } catch {
        // ignore
      }
    }, 6000);

    bgMusicNodes = {
      masterGain,
      droneOsc1,
      droneOsc2,
      lfo,
      padOscs,
      impactInterval
    };

    isMusicPlaying = true;
  } catch {
    // ignore
  }
}

export function stopCinematicTheme() {
  if (!bgMusicNodes || !isMusicPlaying) return;
  const ctx = getAudioContext();

  try {
    if (bgMusicNodes.impactInterval) {
      clearInterval(bgMusicNodes.impactInterval);
    }

    if (ctx && bgMusicNodes.masterGain) {
      bgMusicNodes.masterGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
      setTimeout(() => {
        try {
          bgMusicNodes.droneOsc1?.stop();
          bgMusicNodes.droneOsc2?.stop();
          bgMusicNodes.lfo?.stop();
          bgMusicNodes.padOscs?.forEach(o => o.stop());
        } catch {
          // ignore
        }
        bgMusicNodes = null;
        isMusicPlaying = false;
      }, 1250);
    }
  } catch {
    bgMusicNodes = null;
    isMusicPlaying = false;
  }
}

if (typeof window !== 'undefined') {
  const onFirstInteraction = () => {
    if (isSoundEnabled()) {
      getAudioContext();
      startCinematicTheme();
    }
    window.removeEventListener('click', onFirstInteraction);
    window.removeEventListener('keydown', onFirstInteraction);
    window.removeEventListener('touchstart', onFirstInteraction);
  };

  window.addEventListener('click', onFirstInteraction, { once: true });
  window.addEventListener('keydown', onFirstInteraction, { once: true });
  window.addEventListener('touchstart', onFirstInteraction, { once: true });
}
