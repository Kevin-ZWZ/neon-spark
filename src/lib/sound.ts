// Cyberpunk hip-hop drum machine — all synthesized via Web Audio API
// 808 kicks, trap hats, synth stabs, sub bass — no samples needed.

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
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}

// Auto-init on first user interaction
if (typeof window !== "undefined") {
  document.addEventListener("click", () => { if (!_initialized) { _initialized = true; initCtx(); } }, { once: true });
  document.addEventListener("touchstart", () => { if (!_initialized) { _initialized = true; initCtx(); } }, { once: true });
  document.addEventListener("keydown", () => { if (!_initialized) { _initialized = true; initCtx(); } }, { once: true });
}

function getCtx(): AudioContext | null {
  if (!ctx) initCtx();
  return ctx;
}

// ── 808-style Kick Drum ─────────────────────────────────────
function kick(c: AudioContext, t: number, vol = 1) {
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(150, t);
  osc.frequency.exponentialRampToValueAtTime(35, t + 0.08);
  osc.frequency.exponentialRampToValueAtTime(25, t + 0.2);
  gain.gain.setValueAtTime(0, t);
  gain.gain.linearRampToValueAtTime(vol * 0.35, t + 0.005);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
  osc.connect(gain); gain.connect(c.destination);
  osc.start(t); osc.stop(t + 0.35);
  // Sub layer
  const sub = c.createOscillator();
  const subG = c.createGain();
  sub.type = "sine";
  sub.frequency.setValueAtTime(60, t);
  sub.frequency.exponentialRampToValueAtTime(20, t + 0.15);
  subG.gain.setValueAtTime(vol * 0.5, t);
  subG.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
  sub.connect(subG); subG.connect(c.destination);
  sub.start(t); sub.stop(t + 0.2);
}

// ── Trap Snare ───────────────────────────────────────────────
function snare(c: AudioContext, t: number, vol = 1) {
  // Noise layer
  const buf = c.createBuffer(1, c.sampleRate * 0.15, c.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < buf.length; i++) d[i] = (Math.random() * 2 - 1) * Math.exp(-i / (c.sampleRate * 0.03));
  const src = c.createBufferSource();
  src.buffer = buf;
  const bp = c.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.setValueAtTime(2000, t);
  bp.Q.setValueAtTime(1, t);
  const g = c.createGain();
  g.gain.setValueAtTime(vol * 0.3, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
  src.connect(bp); bp.connect(g); g.connect(c.destination);
  src.start(t); src.stop(t + 0.15);
  // Tone layer
  const osc = c.createOscillator();
  const og = c.createGain();
  osc.type = "triangle";
  osc.frequency.setValueAtTime(180, t);
  osc.frequency.exponentialRampToValueAtTime(80, t + 0.08);
  og.gain.setValueAtTime(vol * 0.15, t);
  og.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
  osc.connect(og); og.connect(c.destination);
  osc.start(t); osc.stop(t + 0.1);
}

// ── Closed Hi-Hat ────────────────────────────────────────────
function hat(c: AudioContext, t: number, vol = 1) {
  const buf = c.createBuffer(1, c.sampleRate * 0.04, c.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < buf.length; i++) d[i] = (Math.random() * 2 - 1) * Math.exp(-i / (c.sampleRate * 0.008));
  const src = c.createBufferSource();
  src.buffer = buf;
  const hp = c.createBiquadFilter();
  hp.type = "highpass";
  hp.frequency.setValueAtTime(7000, t);
  const g = c.createGain();
  g.gain.setValueAtTime(vol * 0.12, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + 0.03);
  src.connect(hp); hp.connect(g); g.connect(c.destination);
  src.start(t); src.stop(t + 0.04);
}

// ── Rimshot ──────────────────────────────────────────────────
function rimshot(c: AudioContext, t: number, vol = 1) {
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(2800, t);
  osc.frequency.exponentialRampToValueAtTime(800, t + 0.02);
  g.gain.setValueAtTime(vol * 0.2, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
  osc.connect(g); g.connect(c.destination);
  osc.start(t); osc.stop(t + 0.04);
}

// ── Synth Stab (cyberpunk square wave chord) ────────────────
function synthStab(c: AudioContext, t: number, freq: number, vol = 1) {
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(freq, t);
  const filter = c.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(2000, t);
  filter.frequency.exponentialRampToValueAtTime(200, t + 0.15);
  filter.Q.setValueAtTime(5, t);
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(vol * 0.12, t + 0.01);
  g.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
  osc.connect(filter); filter.connect(g); g.connect(c.destination);
  osc.start(t); osc.stop(t + 0.2);
}

// ── Noise Riser (build-up effect) ───────────────────────────
function riser(c: AudioContext, t: number, dur: number) {
  const buf = c.createBuffer(1, c.sampleRate * dur, c.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < buf.length; i++) {
    const p = i / buf.length;
    d[i] = (Math.random() * 2 - 1) * p * p;
  }
  const src = c.createBufferSource();
  src.buffer = buf;
  const flt = c.createBiquadFilter();
  flt.type = "lowpass";
  flt.frequency.setValueAtTime(100, t);
  flt.frequency.exponentialRampToValueAtTime(8000, t + dur);
  const g = c.createGain();
  g.gain.setValueAtTime(0.02, t);
  g.gain.linearRampToValueAtTime(0.08, t + dur * 0.8);
  g.gain.exponentialRampToValueAtTime(0.001, t + dur);
  src.connect(flt); flt.connect(g); g.connect(c.destination);
  src.start(t); src.stop(t + dur);
}

// ── Event Sounds ────────────────────────────────────────────

function playHover(c: AudioContext) {
  const t = c.currentTime;
  // Q弹 bass pluck — frequency drops then bounces like a spring
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(400, t);
  osc.frequency.exponentialRampToValueAtTime(90, t + 0.04);
  osc.frequency.setValueAtTime(90, t + 0.04);
  osc.frequency.linearRampToValueAtTime(120, t + 0.06);  // bounce up
  osc.frequency.linearRampToValueAtTime(95, t + 0.09);   // settle
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(0.22, t + 0.005);
  g.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
  osc.connect(g); g.connect(c.destination);
  osc.start(t); osc.stop(t + 0.15);

  // Sub layer — 808 body
  const sub = c.createOscillator();
  const sg = c.createGain();
  sub.type = "sine";
  sub.frequency.setValueAtTime(60, t);
  sub.frequency.exponentialRampToValueAtTime(30, t + 0.08);
  sg.gain.setValueAtTime(0.28, t);
  sg.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
  sub.connect(sg); sg.connect(c.destination);
  sub.start(t); sub.stop(t + 0.12);

  // Transient snap for tactile feel
  const buf = c.createBuffer(1, c.sampleRate * 0.01, c.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < buf.length; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / buf.length);
  const src = c.createBufferSource();
  src.buffer = buf;
  const hp = c.createBiquadFilter();
  hp.type = "highpass";
  hp.frequency.setValueAtTime(3000, t);
  const ng = c.createGain();
  ng.gain.setValueAtTime(0.08, t);
  ng.gain.exponentialRampToValueAtTime(0.001, t + 0.008);
  src.connect(hp); hp.connect(ng); ng.connect(c.destination);
  src.start(t); src.stop(t + 0.01);
}

function playClick(c: AudioContext) {
  const t = c.currentTime;
  rimshot(c, t, 1);
  hat(c, t + 0.06, 0.4);
}

function playGenerate(c: AudioContext) {
  const t = c.currentTime;
  // Build-up riser
  riser(c, t, 0.35);
  // 808 drop on beat
  kick(c, t + 0.35, 1.2);
  // Snare on the 2
  snare(c, t + 0.55, 0.8);
  // Synth chord stab
  synthStab(c, t + 0.35, 110, 1);
  synthStab(c, t + 0.55, 220, 0.6);
  // Hi-hat pattern
  hat(c, t + 0.35, 0.5);
  hat(c, t + 0.45, 0.3);
  hat(c, t + 0.55, 0.5);
  hat(c, t + 0.65, 0.3);
}

function playSuccess(c: AudioContext) {
  const t = c.currentTime;
  kick(c, t, 1);
  hat(c, t + 0.05, 0.5);
  // Bright major chord arpeggio
  [523, 659, 784].forEach((f, i) => {
    const osc = c.createOscillator();
    const g = c.createGain();
    osc.type = "sine";
    const s = t + 0.1 + i * 0.08;
    osc.frequency.setValueAtTime(f, s);
    g.gain.setValueAtTime(0, s);
    g.gain.linearRampToValueAtTime(0.1, s + 0.01);
    g.gain.exponentialRampToValueAtTime(0.001, s + 0.25);
    osc.connect(g); g.connect(c.destination);
    osc.start(s); osc.stop(s + 0.25);
  });
  hat(c, t + 0.3, 0.4);
}

function playPop(c: AudioContext) {
  const t = c.currentTime;
  hat(c, t, 0.7);
  rimshot(c, t + 0.03, 0.6);
}

function playWhoosh(c: AudioContext) {
  const t = c.currentTime;
  // Reversed-style riser sweep
  const dur = 0.3;
  const buf = c.createBuffer(1, c.sampleRate * dur, c.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < buf.length; i++) {
    const p = 1 - i / buf.length;
    d[i] = (Math.random() * 2 - 1) * p * p;
  }
  const src = c.createBufferSource();
  src.buffer = buf;
  const flt = c.createBiquadFilter();
  flt.type = "lowpass";
  flt.frequency.setValueAtTime(8000, t);
  flt.frequency.exponentialRampToValueAtTime(200, t + dur);
  const g = c.createGain();
  g.gain.setValueAtTime(0.06, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + dur);
  src.connect(flt); flt.connect(g); g.connect(c.destination);
  src.start(t); src.stop(t + dur);
  // 808 tom hit
  const tom = c.createOscillator();
  const tg = c.createGain();
  tom.type = "sine";
  tom.frequency.setValueAtTime(80, t);
  tom.frequency.exponentialRampToValueAtTime(40, t + 0.12);
  tg.gain.setValueAtTime(0.2, t);
  tg.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
  tom.connect(tg); tg.connect(c.destination);
  tom.start(t); tom.stop(t + 0.15);
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
