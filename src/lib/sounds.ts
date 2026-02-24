let audioContext: AudioContext | null = null;

const getCtx = () => {
  if (!audioContext) audioContext = new AudioContext();
  return audioContext;
};

export const playShutterSound = () => {
  try {
    const ctx = getCtx();
    const duration = 0.25;
    const buffer = ctx.createBuffer(1, ctx.sampleRate * duration, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < data.length; i++) {
      const t = i / ctx.sampleRate;
      // Deeper, muted shutter: lower frequency noise with slower decay
      data[i] = (Math.random() * 2 - 1) * Math.exp(-t * 18) * 0.6;
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 1200;

    const gain = ctx.createGain();
    gain.gain.value = 0.18;

    source.connect(filter).connect(gain).connect(ctx.destination);
    source.start();
  } catch {
    // silent fail
  }
};

export const playClickSound = () => {
  try {
    const ctx = getCtx();
    const duration = 0.06;
    const buffer = ctx.createBuffer(1, ctx.sampleRate * duration, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < data.length; i++) {
      const t = i / ctx.sampleRate;
      // Deep, tactile, analog-feeling click
      data[i] = (Math.random() * 2 - 1) * Math.exp(-t * 50) * 0.3
        + Math.sin(2 * Math.PI * 120 * t) * Math.exp(-t * 40) * 0.15;
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 800;

    const gain = ctx.createGain();
    gain.gain.value = 0.08;

    source.connect(filter).connect(gain).connect(ctx.destination);
    source.start();
  } catch {
    // silent fail
  }
};
