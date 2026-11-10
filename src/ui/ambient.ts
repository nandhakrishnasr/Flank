/**
 * Procedural Ambient Audio Generator for Flank
 * Generates natural focus ambiance (Rain, Waves, Campfire, Cafe, Wind, Brown Noise)
 * using HTML5 Web Audio API — works 100% offline with zero external audio assets.
 */

let audioCtx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let currentSourceNode: AudioNode | null = null;
let currentLfo: OscillatorNode | null = null;
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

function createNoiseBuffer(ctx: AudioContext, type: 'white' | 'pink' | 'brown'): AudioBuffer {
  const bufferSize = ctx.sampleRate * 4; // 4 seconds loop
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
    // brownian noise
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
  if (currentSourceNode) {
    try {
      (currentSourceNode as any).stop?.();
      currentSourceNode.disconnect();
    } catch {}
    currentSourceNode = null;
  }
  if (currentLfo) {
    try {
      currentLfo.stop();
      currentLfo.disconnect();
    } catch {}
    currentLfo = null;
  }
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

  const noiseType = preset === 'brown' || preset === 'waves' ? 'brown' : preset === 'rain' ? 'pink' : 'white';
  const noiseBuf = createNoiseBuffer(ctx, noiseType);
  const source = ctx.createBufferSource();
  source.buffer = noiseBuf;
  source.loop = true;

  if (preset === 'rain') {
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1000, ctx.currentTime);
    source.connect(filter);
    filter.connect(masterGain);
  } else if (preset === 'waves') {
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(450, ctx.currentTime);
    filter.Q.setValueAtTime(1.2, ctx.currentTime);

    // LFO to create rhythmic rolling wave swells
    const lfo = ctx.createOscillator();
    lfo.frequency.setValueAtTime(0.12, ctx.currentTime); // ~8 sec wave period
    const lfoGain = ctx.createGain();
    lfoGain.gain.setValueAtTime(250, ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start();
    currentLfo = lfo;

    source.connect(filter);
    filter.connect(masterGain);
  } else if (preset === 'campfire') {
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1200, ctx.currentTime);
    filter.Q.setValueAtTime(2.0, ctx.currentTime);
    source.connect(filter);
    filter.connect(masterGain);
  } else if (preset === 'wind') {
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(500, ctx.currentTime);
    source.connect(filter);
    filter.connect(masterGain);
  } else if (preset === 'coffee') {
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(650, ctx.currentTime);
    filter.Q.setValueAtTime(0.8, ctx.currentTime);
    source.connect(filter);
    filter.connect(masterGain);
  } else {
    // raw brown noise
    source.connect(masterGain);
  }

  source.start();
  currentSourceNode = source;
  isPlaying = true;
  return true;
}

export function setAmbientVolume(volume: number): void {
  currentVolume = Math.max(0, Math.min(100, volume));
  if (masterGain && audioCtx) {
    masterGain.gain.setValueAtTime((currentVolume / 100) * 0.35, audioCtx.currentTime);
  }
}

export function isAmbientPlaying(): boolean {
  return isPlaying;
}
