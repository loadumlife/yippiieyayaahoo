let audioContext: AudioContext | null = null;

const getCtx = () => {
  if (!audioContext) audioContext = new AudioContext();
  return audioContext;
};

export const playShutterSound = () => {
  try {
    const ctx = getCtx();
    const duration = 0.15;
    const buffer = ctx.createBuffer(1, ctx.sampleRate * duration, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < data.length; i++) {
      const t = i / ctx.sampleRate;
      data[i] = (Math.random() * 2 - 1) * Math.exp(-t * 35) * 0.5;
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = "highpass";
    filter.frequency.value = 2500;

    const gain = ctx.createGain();
    gain.gain.value = 0.2;

    source.connect(filter).connect(gain).connect(ctx.destination);
    source.start();
  } catch {
    // silent fail
  }
};

export const playClickSound = () => {
  try {
    const ctx = getCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.frequency.value = 700;
    osc.type = "sine";
    gain.gain.setValueAtTime(0.025, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.04);
  } catch {
    // silent fail
  }
};
