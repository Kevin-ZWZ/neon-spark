// Module-level sound manager — no React hooks, no context, just works.

type SoundType = "click" | "hover" | "generate" | "success" | "pop" | "whoosh";

let ctx: AudioContext | null = null;
let _muted = false;
let _initialized = false;

function initCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    try {
      ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch {
      return null;
    }
  }
  if (ctx.state === "suspended") {
    ctx.resume();
  }
  return ctx;
}

// Auto-init on first user interaction (click, touch, keydown)
if (typeof window !== "undefined") {
  const handler = () => {
    if (!_initialized) {
      _initialized = true;
      initCtx();
      document.removeEventListener("click", handler);
      document.removeEventListener("touchstart", handler);
      document.removeEventListener("keydown", handler);
    }
  };
  document.addEventListener("click", handler, { once: true });
  document.addEventListener("touchstart", handler, { once: true });
  document.addEventListener("keydown", handler, { once: true });
}

function getCtx(): AudioContext | null {
  if (!ctx) initCtx();
  return ctx;
}

function playClick(c: AudioContext) {
  const t = c.currentTime;
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = "sine";
  o.frequency.setValueAtTime(1000, t);
  o.frequency.exponentialRampToValueAtTime(500, t + 0.08);
  g.gain.setValueAtTime(0.2, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
  o.connect(g); g.connect(c.destination);
  o.start(t); o.stop(t + 0.12);
}

function playHover(c: AudioContext) {
  const t = c.currentTime;
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = "sine";
  o.frequency.setValueAtTime(1400, t);
  o.frequency.exponentialRampToValueAtTime(700, t + 0.04);
  g.gain.setValueAtTime(0.08, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + 0.06);
  o.connect(g); g.connect(c.destination);
  o.start(t); o.stop(t + 0.06);
}

function playGenerate(c: AudioContext) {
  const t = c.currentTime;
  [523, 659, 784, 1047].forEach((f, i) => {
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = "sine";
    const s = t + i * 0.08;
    o.frequency.setValueAtTime(f, s);
    g.gain.setValueAtTime(0, s);
    g.gain.linearRampToValueAtTime(0.15, s + 0.02);
    g.gain.exponentialRampToValueAtTime(0.001, s + 0.18);
    o.connect(g); g.connect(c.destination);
    o.start(s); o.stop(s + 0.18);
  });
  const b = c.createOscillator();
  const bg = c.createGain();
  b.type = "sine";
  b.frequency.setValueAtTime(110, t);
  bg.gain.setValueAtTime(0.15, t);
  bg.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
  b.connect(bg); bg.connect(c.destination);
  b.start(t); b.stop(t + 0.25);
}

function playSuccess(c: AudioContext) {
  const t = c.currentTime;
  [880, 1320].forEach((f, i) => {
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = "sine";
    const s = t + i * 0.12;
    o.frequency.setValueAtTime(f, s);
    g.gain.setValueAtTime(0, s);
    g.gain.linearRampToValueAtTime(0.18, s + 0.02);
    g.gain.exponentialRampToValueAtTime(0.001, s + 0.35);
    o.connect(g); g.connect(c.destination);
    o.start(s); o.stop(s + 0.35);
  });
}

function playPop(c: AudioContext) {
  const t = c.currentTime;
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = "sine";
  o.frequency.setValueAtTime(700, t);
  o.frequency.exponentialRampToValueAtTime(1400, t + 0.04);
  g.gain.setValueAtTime(0.12, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
  o.connect(g); g.connect(c.destination);
  o.start(t); o.stop(t + 0.08);
}

function playWhoosh(c: AudioContext) {
  const t = c.currentTime;
  const size = c.sampleRate * 0.2;
  const buf = c.createBuffer(1, size, c.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < size; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / size);
  const src = c.createBufferSource();
  src.buffer = buf;
  const flt = c.createBiquadFilter();
  flt.type = "lowpass";
  flt.frequency.setValueAtTime(300, t);
  flt.frequency.exponentialRampToValueAtTime(5000, t + 0.15);
  const g = c.createGain();
  g.gain.setValueAtTime(0.05, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
  src.connect(flt); flt.connect(g); g.connect(c.destination);
  src.start(t); src.stop(t + 0.2);
}

export function playSound(type: SoundType) {
  if (_muted) return;
  const c = getCtx();
  if (!c) return;
  switch (type) {
    case "click":    playClick(c); break;
    case "hover":    playHover(c); break;
    case "generate": playGenerate(c); break;
    case "success":  playSuccess(c); break;
    case "pop":      playPop(c); break;
    case "whoosh":   playWhoosh(c); break;
  }
}

export function isMuted() { return _muted; }
export function toggleMute() { _muted = !_muted; return _muted; }
