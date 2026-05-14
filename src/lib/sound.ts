// Cyberpunk-Apple sound design — clean, premium, electronic.
// Like Apple engineered a futuristic UI — pure tones, spatial feel, zero clutter.

type SoundType = "click" | "hover" | "generate" | "success" | "pop" | "whoosh";

let ctx: AudioContext | null = null;
let _muted = false;
let _initialized = false;

function initCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    try {
      ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch { return null; }
  }
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}

if (typeof window !== "undefined") {
  document.addEventListener("click", () => { if (!_initialized) { _initialized = true; initCtx(); } }, { once: true });
  document.addEventListener("touchstart", () => { if (!_initialized) { _initialized = true; initCtx(); } }, { once: true });
}

function getCtx(): AudioContext | null {
  if (!ctx) initCtx();
  return ctx;
}

// ── Shared helper: clean sine with reverb tail ────────────
function pureTone(c: AudioContext, t: number, freq: number, vol: number, dur: number, glide?: number) {
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = "sine";
  if (glide) {
    osc.frequency.setValueAtTime(freq * glide, t);
    osc.frequency.exponentialRampToValueAtTime(freq, t + 0.015);
  } else {
    osc.frequency.setValueAtTime(freq, t);
  }
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(vol, t + 0.003);
  g.gain.exponentialRampToValueAtTime(0.001, t + dur);
  osc.connect(g); g.connect(c.destination);
  osc.start(t); osc.stop(t + dur + 0.01);
}

// ── Reverb send (convolution with a short noise tail) ────
function reverbTail(c: AudioContext, t: number, vol: number, dur: number) {
  const len = c.sampleRate * dur;
  const buf = c.createBuffer(1, len, c.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.exp(-i / (c.sampleRate * dur * 0.3));
  const src = c.createBufferSource();
  src.buffer = buf;
  const g = c.createGain();
  g.gain.setValueAtTime(vol, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + dur);
  const flt = c.createBiquadFilter();
  flt.type = "lowpass";
  flt.frequency.setValueAtTime(4000, t);
  src.connect(flt); flt.connect(g); g.connect(c.destination);
  src.start(t); src.stop(t + dur);
}

// ── Clean FM shimmer (cyberpunk sparkle) ──────────────────
function fmShimmer(c: AudioContext, t: number, freq: number, vol: number) {
  const car = c.createOscillator();
  const mod = c.createOscillator();
  const mg = c.createGain();
  const cg = c.createGain();
  car.type = "sine";
  mod.type = "sine";
  car.frequency.setValueAtTime(freq, t);
  mod.frequency.setValueAtTime(freq * 2.7, t);
  mg.gain.setValueAtTime(15, t);
  mg.gain.exponentialRampToValueAtTime(0.1, t + 0.08);
  cg.gain.setValueAtTime(0, t);
  cg.gain.linearRampToValueAtTime(vol, t + 0.003);
  cg.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
  mod.connect(mg); mg.connect(car.frequency);
  car.connect(cg); cg.connect(c.destination);
  car.start(t); car.stop(t + 0.12);
  mod.start(t); mod.stop(t + 0.1);
}

// ── Event Sounds ──────────────────────────────────────────

function playHover(c: AudioContext) {
  const t = c.currentTime;
  // Crystal glass sine — clean, pure, with a subtle cyberpunk FM shimmer tail
  pureTone(c, t, 880, 0.04, 0.06, 1.05);
  pureTone(c, t + 0.02, 1320, 0.025, 0.05, 1.04);
  // Ultra-subtle reverb bloom
  reverbTail(c, t + 0.01, 0.015, 0.08);
}

function playClick(c: AudioContext) {
  const t = c.currentTime;
  // Precise haptic tap — like iPhone keyboard but with pitch glide
  pureTone(c, t, 1400, 0.06, 0.04, 1.08);
  pureTone(c, t + 0.01, 1800, 0.03, 0.03);
  reverbTail(c, t + 0.02, 0.01, 0.05);
}

function playGenerate(c: AudioContext) {
  const t = c.currentTime;
  // Ascending crystal arpeggio — premium "unlock" feel
  const notes = [523, 659, 784, 1047, 1319];
  notes.forEach((f, i) => {
    const s = t + i * 0.06;
    pureTone(c, s, f, 0.05, 0.15, 1.03);
    // FM shimmer overlay on each note
    if (i % 2 === 0) fmShimmer(c, s, f * 2, 0.02);
  });
  // Sub bass bloom at the end (tasteful, not punchy)
  const sub = c.createOscillator();
  const sg = c.createGain();
  sub.type = "sine";
  sub.frequency.setValueAtTime(55, t + 0.3);
  sub.frequency.exponentialRampToValueAtTime(30, t + 0.5);
  sg.gain.setValueAtTime(0, t + 0.3);
  sg.gain.linearRampToValueAtTime(0.12, t + 0.32);
  sg.gain.exponentialRampToValueAtTime(0.001, t + 0.55);
  sub.connect(sg); sg.connect(c.destination);
  sub.start(t + 0.3); sub.stop(t + 0.55);
  // Reverb wash
  reverbTail(c, t + 0.1, 0.02, 0.3);
}

function playSuccess(c: AudioContext) {
  const t = c.currentTime;
  // Two-tone ascending chime — like Mac startup but cyber
  pureTone(c, t, 784, 0.06, 0.2, 1.02);
  pureTone(c, t + 0.1, 1047, 0.08, 0.25, 1.02);
  fmShimmer(c, t + 0.1, 1047, 0.025);
  reverbTail(c, t + 0.15, 0.025, 0.35);
}

function playPop(c: AudioContext) {
  const t = c.currentTime;
  // Clean droplet — like tapping on glass
  pureTone(c, t, 1200, 0.05, 0.05, 1.1);
  pureTone(c, t + 0.01, 1600, 0.025, 0.04);
  reverbTail(c, t + 0.02, 0.008, 0.06);
}

function playWhoosh(c: AudioContext) {
  const t = c.currentTime;
  // Clean filtered sweep — like wind through a glass tunnel
  const dur = 0.2;
  const buf = c.createBuffer(1, c.sampleRate * dur, c.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < buf.length; i++) d[i] = (Math.random() * 2 - 1) * Math.exp(-i / (c.sampleRate * dur * 0.15));
  const src = c.createBufferSource();
  src.buffer = buf;
  const flt = c.createBiquadFilter();
  flt.type = "lowpass";
  flt.frequency.setValueAtTime(200, t);
  flt.frequency.exponentialRampToValueAtTime(6000, t + dur * 0.6);
  flt.frequency.exponentialRampToValueAtTime(100, t + dur);
  const g = c.createGain();
  g.gain.setValueAtTime(0.04, t);
  g.gain.linearRampToValueAtTime(0.07, t + dur * 0.3);
  g.gain.exponentialRampToValueAtTime(0.001, t + dur);
  src.connect(flt); flt.connect(g); g.connect(c.destination);
  src.start(t); src.stop(t + dur);
  // Accompanying glass tone
  pureTone(c, t + 0.02, 660, 0.03, 0.12, 0.95);
}

export function playSound(type: SoundType) {
  if (_muted) return;
  const c = getCtx();
  if (!c) return;
  switch (type) {
    case "hover":    playHover(c); break;
    case "click":    playClick(c); break;
    case "generate": playGenerate(c); break;
    case "success":  playSuccess(c); break;
    case "pop":      playPop(c); break;
    case "whoosh":   playWhoosh(c); break;
  }
}

export function isMuted() { return _muted; }
export function toggleMute() { _muted = !_muted; return _muted; }
