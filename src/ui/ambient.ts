/**
 * Procedural Ambient Audio Generator for Flank
 * Generates natural focus ambiance (Rain, Waves, Campfire, Cafe, Wind, Brown Noise)
 * using HTML5 Web Audio API — works 100% offline with zero external audio assets.
 */

let audioCtx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let activeNodes: AudioNode[] = [];
let activeTimers: number[] = [];
let isPlaying = false;
let currentPreset = 'rain';
let currentVolume = 65;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioCtxClass) return null;
  if (!audioCtx) {
    audioCtx = new AudioCtxClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

function createNoiseBuffer(ctx: AudioContext, type: 'white' | 'pink' | 'brown', durationSeconds: number = 4): AudioBuffer {
  const bufferSize = ctx.sampleRate * durationSeconds;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  if (type === 'white') {
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
  } else if (type === 'pink') {
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
      b6 = white * 0.115926;
    }
  } else {
    // Brownian noise: deep integrated random walk
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      lastOut = (lastOut + 0.02 * white) / 1.02;
      data[i] = lastOut * 3.5;
    }
  }

  return buffer;
}

export function stopAmbientSound(): void {
  activeTimers.forEach((t) => clearInterval(t));
  activeTimers = [];

  for (const node of activeNodes) {
    try {
      (node as any).stop?.();
      node.disconnect();
    } catch {}
  }
  activeNodes = [];
  isPlaying = false;
}

export function startAmbientSound(preset: string = 'rain', volume: number = 65): boolean {
  stopAmbientSound();
  const ctx = getAudioContext();
  if (!ctx) return false;

  currentPreset = preset;
  currentVolume = volume;

  if (!masterGain) {
    masterGain = ctx.createGain();
    masterGain.connect(ctx.destination);
  }
  masterGain.gain.setValueAtTime((volume / 100) * 0.35, ctx.currentTime);

  if (preset === 'rain') {
    // 1. Rain downpour bed (pink noise lowpass)
    const pinkBuf = createNoiseBuffer(ctx, 'pink', 4);
    const rainSrc = ctx.createBufferSource();
    rainSrc.buffer = pinkBuf;
    rainSrc.loop = true;

    const rainFilter = ctx.createBiquadFilter();
    rainFilter.type = 'lowpass';
    rainFilter.frequency.setValueAtTime(1100, ctx.currentTime);

    const rainGain = ctx.createGain();
    rainGain.gain.setValueAtTime(0.85, ctx.currentTime);

    rainSrc.connect(rainFilter);
    rainFilter.connect(rainGain);
    rainGain.connect(masterGain);
    rainSrc.start();
    activeNodes.push(rainSrc, rainFilter, rainGain);

    // 2. High-frequency randomized droplet patter
    const dropletBuf = createNoiseBuffer(ctx, 'white', 2);
    const dropSrc = ctx.createBufferSource();
    dropSrc.buffer = dropletBuf;
    dropSrc.loop = true;

    const dropFilter = ctx.createBiquadFilter();
    dropFilter.type = 'bandpass';
    dropFilter.frequency.setValueAtTime(3200, ctx.currentTime);
    dropFilter.Q.setValueAtTime(3.0, ctx.currentTime);

    const dropGain = ctx.createGain();
    dropGain.gain.setValueAtTime(0.18, ctx.currentTime);

    dropSrc.connect(dropFilter);
    dropFilter.connect(dropGain);
    dropGain.connect(masterGain);
    dropSrc.start();
    activeNodes.push(dropSrc, dropFilter, dropGain);
  } else if (preset === 'waves') {
    // Ocean surf: brown noise swept by slow rhythmic LFO with synchronized filter and swell gain
    const brownBuf = createNoiseBuffer(ctx, 'brown', 6);
    const waveSrc = ctx.createBufferSource();
    waveSrc.buffer = brownBuf;
    waveSrc.loop = true;

    const waveFilter = ctx.createBiquadFilter();
    waveFilter.type = 'bandpass';
    waveFilter.frequency.setValueAtTime(380, ctx.currentTime);
    waveFilter.Q.setValueAtTime(1.6, ctx.currentTime);

    const waveSwellGain = ctx.createGain();
    waveSwellGain.gain.setValueAtTime(0.5, ctx.currentTime);

    // LFO for filter sweep (frequency sweep simulating wave approaching, breaking, and receding)
    const filterLfo = ctx.createOscillator();
    filterLfo.frequency.setValueAtTime(0.11, ctx.currentTime); // ~9 second wave cycle
    const filterLfoGain = ctx.createGain();
    filterLfoGain.gain.setValueAtTime(260, ctx.currentTime);
    filterLfo.connect(filterLfoGain);
    filterLfoGain.connect(waveFilter.frequency);
    filterLfo.start();

    // LFO for volume swell (waves crash louder, recede softer)
    const ampLfo = ctx.createOscillator();
    ampLfo.frequency.setValueAtTime(0.11, ctx.currentTime);
    const ampLfoGain = ctx.createGain();
    ampLfoGain.gain.setValueAtTime(0.35, ctx.currentTime);
    ampLfo.connect(ampLfoGain);
    ampLfoGain.connect(waveSwellGain.gain);
    ampLfo.start();

    waveSrc.connect(waveFilter);
    waveFilter.connect(waveSwellGain);
    waveSwellGain.connect(masterGain);
    waveSrc.start();
    activeNodes.push(waveSrc, waveFilter, waveSwellGain, filterLfo, filterLfoGain, ampLfo, ampLfoGain);
  } else if (preset === 'campfire') {
    // 1. Warm flame roar base (lowpass brown noise)
    const flameBuf = createNoiseBuffer(ctx, 'brown', 4);
    const flameSrc = ctx.createBufferSource();
    flameSrc.buffer = flameBuf;
    flameSrc.loop = true;

    const flameFilter = ctx.createBiquadFilter();
    flameFilter.type = 'lowpass';
    flameFilter.frequency.setValueAtTime(240, ctx.currentTime);

    const flameGain = ctx.createGain();
    flameGain.gain.setValueAtTime(0.7, ctx.currentTime);

    flameSrc.connect(flameFilter);
    flameFilter.connect(flameGain);
    flameGain.connect(masterGain);
    flameSrc.start();
    activeNodes.push(flameSrc, flameFilter, flameGain);

    // 2. Procedural wood crackle & pop impulses
    const crackleInterval = window.setInterval(() => {
      if (!audioCtx || !isPlaying) return;
      if (Math.random() < 0.45) {
        try {
          const osc = audioCtx.createOscillator();
          const popGain = audioCtx.createGain();
          const popFilter = audioCtx.createBiquadFilter();

          // Randomized snap / pop frequency between 1.8kHz and 4.2kHz
          const freq = 1800 + Math.random() * 2400;
          popFilter.type = 'bandpass';
          popFilter.frequency.setValueAtTime(freq, audioCtx.currentTime);
          popFilter.Q.setValueAtTime(4.0, audioCtx.currentTime);

          osc.type = Math.random() > 0.5 ? 'triangle' : 'square';
          osc.frequency.setValueAtTime(freq * 0.5, audioCtx.currentTime);

          const dur = 0.015 + Math.random() * 0.04;
          const peakGain = 0.08 + Math.random() * 0.16;

          popGain.gain.setValueAtTime(0.001, audioCtx.currentTime);
          popGain.gain.linearRampToValueAtTime(peakGain, audioCtx.currentTime + 0.002);
          popGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + dur);

          osc.connect(popFilter);
          popFilter.connect(popGain);
          if (masterGain) popGain.connect(masterGain);

          osc.start();
          osc.stop(audioCtx.currentTime + dur);
        } catch {}
      }
    }, 90);
    activeTimers.push(crackleInterval);
  } else if (preset === 'wind') {
    // Howling winter gusts: pink noise swept by dual LFOs through resonant bandpass
    const pinkBuf = createNoiseBuffer(ctx, 'pink', 5);
    const windSrc = ctx.createBufferSource();
    windSrc.buffer = pinkBuf;
    windSrc.loop = true;

    const windFilter = ctx.createBiquadFilter();
    windFilter.type = 'bandpass';
    windFilter.frequency.setValueAtTime(420, ctx.currentTime);
    windFilter.Q.setValueAtTime(3.8, ctx.currentTime); // High resonance for audible whistling gust

    const windGain = ctx.createGain();
    windGain.gain.setValueAtTime(0.85, ctx.currentTime);

    // Primary gust LFO
    const gustLfo = ctx.createOscillator();
    gustLfo.frequency.setValueAtTime(0.08, ctx.currentTime); // ~12s gust cycle
    const gustLfoGain = ctx.createGain();
    gustLfoGain.gain.setValueAtTime(320, ctx.currentTime);
    gustLfo.connect(gustLfoGain);
    gustLfoGain.connect(windFilter.frequency);
    gustLfo.start();

    // Secondary turbulence LFO for erratic wind flutter
    const flutterLfo = ctx.createOscillator();
    flutterLfo.frequency.setValueAtTime(0.24, ctx.currentTime);
    const flutterLfoGain = ctx.createGain();
    flutterLfoGain.gain.setValueAtTime(140, ctx.currentTime);
    flutterLfo.connect(flutterLfoGain);
    flutterLfoGain.connect(windFilter.frequency);
    flutterLfo.start();

    windSrc.connect(windFilter);
    windFilter.connect(windGain);
    windGain.connect(masterGain);
    windSrc.start();
    activeNodes.push(windSrc, windFilter, windGain, gustLfo, gustLfoGain, flutterLfo, flutterLfoGain);
  } else if (preset === 'coffee') {
    // Cozy cafe soundscape: warm indoor room tone, layered multi-band distant chatter,
    // soft espresso steam hiss, and subtle damped porcelain cup/saucer clinks (no sine beeps).
    const roomBuf = createNoiseBuffer(ctx, 'pink', 6);
    const roomSrc = ctx.createBufferSource();
    roomSrc.buffer = roomBuf;
    roomSrc.loop = true;

    const roomShelf = ctx.createBiquadFilter();
    roomShelf.type = 'lowpass';
    roomShelf.frequency.setValueAtTime(1400, ctx.currentTime);

    const roomHighpass = ctx.createBiquadFilter();
    roomHighpass.type = 'highpass';
    roomHighpass.frequency.setValueAtTime(120, ctx.currentTime);

    const roomGain = ctx.createGain();
    roomGain.gain.setValueAtTime(0.38, ctx.currentTime);

    roomSrc.connect(roomHighpass);
    roomHighpass.connect(roomShelf);
    roomShelf.connect(roomGain);
    roomGain.connect(masterGain);
    roomSrc.start();
    activeNodes.push(roomSrc, roomHighpass, roomShelf, roomGain);

    // Multi-voice distant conversational murmur using speech-formant bandpass layers
    const murmurBuf = createNoiseBuffer(ctx, 'pink', 5);
    const formantBands = [
      { freq: 380, q: 2.0, gain: 0.28 },
      { freq: 760, q: 2.4, gain: 0.22 },
      { freq: 1350, q: 2.2, gain: 0.14 },
    ];
    const bandGains: GainNode[] = [];
    for (const band of formantBands) {
      const src = ctx.createBufferSource();
      src.buffer = murmurBuf;
      src.loop = true;
      src.playbackRate.setValueAtTime(0.92 + Math.random() * 0.16, ctx.currentTime);

      const bp = ctx.createBiquadFilter();
      bp.type = 'bandpass';
      bp.frequency.setValueAtTime(band.freq, ctx.currentTime);
      bp.Q.setValueAtTime(band.q, ctx.currentTime);

      const g = ctx.createGain();
      g.gain.setValueAtTime(band.gain, ctx.currentTime);

      src.connect(bp);
      bp.connect(g);
      g.connect(masterGain);
      src.start(0, Math.random() * 4);
      activeNodes.push(src, bp, g);
      bandGains.push(g);
    }

    // Organic irregular speech-cadence swells across the formant bands
    const chatterTimer = window.setInterval(() => {
      if (!audioCtx || !isPlaying) return;
      const now = audioCtx.currentTime;
      bandGains.forEach((g, idx) => {
        const base = formantBands[idx].gain;
        const target = base * (0.55 + Math.random() * 0.95);
        g.gain.cancelScheduledValues(now);
        g.gain.setTargetAtTime(target, now, 0.18 + Math.random() * 0.25);
      });
    }, 320);
    activeTimers.push(chatterTimer);

    // Occasional distant espresso machine steam / milk froth hiss & damped porcelain clink
    const steamBuf = createNoiseBuffer(ctx, 'white', 2);
    const cafeEventsTimer = window.setInterval(() => {
      if (!audioCtx || !isPlaying) return;
      const now = audioCtx.currentTime;
      const roll = Math.random();

      if (roll < 0.14 && masterGain) {
        // Soft distant espresso steam burst (filtered white noise, gentle fade)
        try {
          const steamSrc = audioCtx.createBufferSource();
          steamSrc.buffer = steamBuf;
          const steamFilter = audioCtx.createBiquadFilter();
          steamFilter.type = 'bandpass';
          steamFilter.frequency.setValueAtTime(2600 + Math.random() * 900, now);
          steamFilter.Q.setValueAtTime(1.4, now);

          const steamGain = audioCtx.createGain();
          const dur = 0.9 + Math.random() * 0.8;
          steamGain.gain.setValueAtTime(0.0001, now);
          steamGain.gain.linearRampToValueAtTime(0.06, now + 0.18);
          steamGain.gain.exponentialRampToValueAtTime(0.0001, now + dur);

          steamSrc.connect(steamFilter);
          steamFilter.connect(steamGain);
          steamGain.connect(masterGain);
          steamSrc.start(now);
          steamSrc.stop(now + dur + 0.05);
        } catch {}
      } else if (roll < 0.26 && masterGain) {
        // Subtle damped ceramic cup/saucer clink using filtered noise transient (not a sine beep)
        try {
          const hitSrc = audioCtx.createBufferSource();
          hitSrc.buffer = steamBuf;
          const hitFilter = audioCtx.createBiquadFilter();
          hitFilter.type = 'bandpass';
          hitFilter.frequency.setValueAtTime(3400 + Math.random() * 1400, now);
          hitFilter.Q.setValueAtTime(14.0, now);

          const hitGain = audioCtx.createGain();
          hitGain.gain.setValueAtTime(0.0001, now);
          hitGain.gain.linearRampToValueAtTime(0.09, now + 0.002);
          hitGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);

          hitSrc.connect(hitFilter);
          hitFilter.connect(hitGain);
          hitGain.connect(masterGain);
          hitSrc.start(now);
          hitSrc.stop(now + 0.05);
        } catch {}
      }
    }, 1200);
    activeTimers.push(cafeEventsTimer);
  } else {
    // Pure deep brownian focus noise
    const brownBuf = createNoiseBuffer(ctx, 'brown', 6);
    const brownSrc = ctx.createBufferSource();
    brownSrc.buffer = brownBuf;
    brownSrc.loop = true;

    const brownFilter = ctx.createBiquadFilter();
    brownFilter.type = 'lowpass';
    brownFilter.frequency.setValueAtTime(450, ctx.currentTime);

    brownSrc.connect(brownFilter);
    brownFilter.connect(masterGain);
    brownSrc.start();
    activeNodes.push(brownSrc, brownFilter);
  }

  isPlaying = true;
  return true;
}

export function setAmbientVolume(vol: number): void {
  currentVolume = Math.max(0, Math.min(100, vol));
  if (masterGain && audioCtx) {
    masterGain.gain.setValueAtTime((currentVolume / 100) * 0.35, audioCtx.currentTime);
  }
}

export function isAmbientPlaying(): boolean {
  return isPlaying;
}

export function getAmbientPreset(): string {
  return currentPreset;
}

export function getAmbientVolume(): number {
  return currentVolume;
}
