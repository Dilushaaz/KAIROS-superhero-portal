/**
 * KAIROS Cinematic Soundtrack & Dynamic Audio Service
 * Synthesizes a royal, heroic, mysterious orchestral-electronic score and
 * high-fidelity command-center sound effects via native Web Audio API.
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
    audioCtx.resume().catch(() => {
      // Handled silently if browser policy blocks initial resume
    });
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

/**
 * Soft futuristic button click
 */
export function playClickSound() {
  if (!isSoundEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx || ctx.state === 'suspended') return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1150, now);
    osc.frequency.exponentialRampToValueAtTime(1650, now + 0.04);

    gain.gain.setValueAtTime(0.05, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.05);
  } catch {
    // Ignore audio glitches
  }
}

/**
 * Soft incoming transmission / message chime
 */
export function playMessageSound() {
  if (!isSoundEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx || ctx.state === 'suspended') return;

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
    // Ignore
  }
}

/**
 * Threat level confirmation tones
 * LOW: Soft pleasant harmonic chime
 * URGENT: Dual-frequency alert pulse
 * CRITICAL: Sub-bass boom + high priority klaxon pulse
 */
export function playThreatLevelSound(level) {
  if (!isSoundEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx || ctx.state === 'suspended') return;

  try {
    const now = ctx.currentTime;

    if (level === 'LOW') {
      const notes = [523.25, 659.25]; // C5, E5
      notes.forEach((f, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now + i * 0.06);
        gain.gain.setValueAtTime(0.05, now + i * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.22);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.06);
        osc.stop(now + i * 0.06 + 0.24);
      });
    } else if (level === 'URGENT') {
      const notes = [440, 587.33, 659.25]; // A4, D5, E5
      notes.forEach((f, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, now + i * 0.05);
        gain.gain.setValueAtTime(0.07, now + i * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.05 + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.05);
        osc.stop(now + i * 0.05 + 0.32);
      });
    } else if (level === 'CRITICAL') {
      // Sub-bass impact
      const subOsc = ctx.createOscillator();
      const subGain = ctx.createGain();
      subOsc.type = 'sawtooth';
      subOsc.frequency.setValueAtTime(110, now);
      subOsc.frequency.exponentialRampToValueAtTime(36, now + 0.4);

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(140, now);

      subGain.gain.setValueAtTime(0.2, now);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

      subOsc.connect(filter);
      filter.connect(subGain);
      subGain.connect(ctx.destination);
      subOsc.start(now);
      subOsc.stop(now + 0.65);

      // Warning double tone
      [0, 0.14].forEach((delay) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(415.3, now + delay);
        gain.gain.setValueAtTime(0.05, now + delay);
        gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.12);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + delay);
        osc.stop(now + delay + 0.13);
      });
    }
  } catch {
    // Ignore
  }
}

/**
 * Radar scan sonar sweep sound
 */
export function playRadarSweepSound() {
  if (!isSoundEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx || ctx.state === 'suspended') return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1420, now);
    osc.frequency.exponentialRampToValueAtTime(940, now + 0.28);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1100, now);
    filter.Q.setValueAtTime(4.0, now);

    gain.gain.setValueAtTime(0.04, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.36);
  } catch {
    // Ignore
  }
}

/**
 * Signal Vault archive holographic activation sound
 */
export function playVaultSound() {
  if (!isSoundEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx || ctx.state === 'suspended') return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(420, now);
    osc.frequency.exponentialRampToValueAtTime(1280, now + 0.18);

    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.3);
  } catch {
    // Ignore
  }
}

/**
 * Story transition panel slide sound
 */
export function playStoryTransitionSound() {
  if (!isSoundEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx || ctx.state === 'suspended') return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(280, now);
    osc.frequency.exponentialRampToValueAtTime(740, now + 0.15);

    gain.gain.setValueAtTime(0.05, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.24);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.26);
  } catch {
    // Ignore
  }
}

/**
 * Priority Signal Dispatch transmission chime
 */
export function playDispatchSound() {
  if (!isSoundEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx || ctx.state === 'suspended') return;

  try {
    const now = ctx.currentTime;
    const notes = [440, 554.37, 659.25, 880, 1108.73];

    notes.forEach((freq, idx) => {
      const startTime = now + idx * 0.05;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);
      gain.gain.setValueAtTime(0.08, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.45);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.48);
    });
  } catch {
    // Ignore
  }
}

/**
 * Cinematic Heroic Orchestral-Synthesizer Soundtrack
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
    masterGain.gain.exponentialRampToValueAtTime(0.07, ctx.currentTime + 3.2); // Smooth 3.2s fade-in
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
    droneFilter.frequency.setValueAtTime(120, ctx.currentTime);

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
    padFilter.frequency.setValueAtTime(440, ctx.currentTime);
    padFilter.Q.setValueAtTime(2.2, ctx.currentTime);

    // Slow atmospheric breathing LFO filter modulation
    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.12, ctx.currentTime); // 0.12 Hz slow royal wave

    const lfoGain = ctx.createGain();
    lfoGain.gain.setValueAtTime(220, ctx.currentTime);

    lfo.connect(lfoGain);
    lfoGain.connect(padFilter.frequency);
    lfo.start();

    chordFrequencies.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.detune.setValueAtTime((idx % 2 === 0 ? 6 : -7), ctx.currentTime);

      const oscGain = ctx.createGain();
      oscGain.gain.setValueAtTime(0.11, ctx.currentTime);

      osc.connect(padFilter);
      osc.start();
      padOscs.push(osc);
    });

    padFilter.connect(masterGain);

    // 3. Periodic Cinematic Sub Impact Pulse (every 6 seconds)
    const impactInterval = setInterval(() => {
      if (!isMusicPlaying || !ctx || ctx.state === 'suspended') return;
      try {
        const impactNow = ctx.currentTime;
        const impactOsc = ctx.createOscillator();
        const impactGain = ctx.createGain();

        impactOsc.type = 'sine';
        impactOsc.frequency.setValueAtTime(95, impactNow);
        impactOsc.frequency.exponentialRampToValueAtTime(32, impactNow + 0.35);

        impactGain.gain.setValueAtTime(0.35, impactNow);
        impactGain.gain.exponentialRampToValueAtTime(0.001, impactNow + 1.2);

        impactOsc.connect(impactGain);
        impactGain.connect(masterGain);

        impactOsc.start(impactNow);
        impactOsc.stop(impactNow + 1.25);
      } catch {
        // Ignore
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
    // Ignore
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
          bgMusicNodes.padOscs?.forEach((o) => o.stop());
        } catch {
          // Ignore
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

/**
 * Autoplay handling: Attempt start immediately on load, with silent fallback to user interaction.
 */
if (typeof window !== 'undefined') {
  const tryStartAudio = () => {
    if (isSoundEnabled()) {
      const ctx = getAudioContext();
      if (ctx) {
        if (ctx.state === 'running') {
          startCinematicTheme();
        } else {
          ctx.resume().then(() => {
            startCinematicTheme();
          }).catch(() => {
            // Browser autoplay restrictions in place, will start on next gesture
          });
        }
      }
    }
  };

  // Attempt right away
  if (document.readyState === 'complete') {
    tryStartAudio();
  } else {
    window.addEventListener('load', tryStartAudio, { once: true });
  }

  // Graceful user gesture trigger
  const onUserGesture = () => {
    tryStartAudio();
    window.removeEventListener('click', onUserGesture);
    window.removeEventListener('keydown', onUserGesture);
    window.removeEventListener('touchstart', onUserGesture);
    window.removeEventListener('wheel', onUserGesture);
  };

  window.addEventListener('click', onUserGesture, { once: true });
  window.addEventListener('keydown', onUserGesture, { once: true });
  window.addEventListener('touchstart', onUserGesture, { once: true });
  window.addEventListener('wheel', onUserGesture, { once: true });
}
