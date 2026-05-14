"use client";

import { useCallback, useRef, useState } from "react";

// ── Synthesized cyberpunk sounds using Web Audio API ──────

async function ensureResumed(ctx: AudioContext) {
  if (ctx.state === "suspended") {
    try {
      await ctx.resume();
    } catch {
      // Browser may block resume; silently continue
    }
  }
}

function playSynthClick(ctx: AudioContext) {
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(1000, t);
  osc.frequency.exponentialRampToValueAtTime(500, t + 0.08);
  gain.gain.setValueAtTime(0.15, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(t);
  osc.stop(t + 0.12);
}

function playSynthHover(ctx: AudioContext) {
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(1400, t);
  osc.frequency.exponentialRampToValueAtTime(700, t + 0.04);
  gain.gain.setValueAtTime(0.06, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.06);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(t);
  osc.stop(t + 0.06);
}

function playSynthGenerate(ctx: AudioContext) {
  const t = ctx.currentTime;
  const notes = [523, 659, 784, 1047];
  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    const start = t + i * 0.08;
    osc.frequency.setValueAtTime(freq, start);
    gain.gain.setValueAtTime(0, start);
    gain.gain.linearRampToValueAtTime(0.12, start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, start + 0.18);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(start);
    osc.stop(start + 0.18);
  });
  const bass = ctx.createOscillator();
  const bassGain = ctx.createGain();
  bass.type = "sine";
  bass.frequency.setValueAtTime(110, t);
  bassGain.gain.setValueAtTime(0.12, t);
  bassGain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
  bass.connect(bassGain);
  bassGain.connect(ctx.destination);
  bass.start(t);
  bass.stop(t + 0.25);
}

function playSynthSuccess(ctx: AudioContext) {
  const t = ctx.currentTime;
  [880, 1320].forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    const start = t + i * 0.12;
    osc.frequency.setValueAtTime(freq, start);
    gain.gain.setValueAtTime(0, start);
    gain.gain.linearRampToValueAtTime(0.14, start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, start + 0.35);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(start);
    osc.stop(start + 0.35);
  });
}

function playSynthPop(ctx: AudioContext) {
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(700, t);
  osc.frequency.exponentialRampToValueAtTime(1400, t + 0.04);
  gain.gain.setValueAtTime(0.1, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(t);
  osc.stop(t + 0.08);
}

function playSynthWhoosh(ctx: AudioContext) {
  const t = ctx.currentTime;
  const bufferSize = ctx.sampleRate * 0.2;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
  }
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(300, t);
  filter.frequency.exponentialRampToValueAtTime(5000, t + 0.15);
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.04, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
  source.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  source.start(t);
  source.stop(t + 0.2);
}

export type SoundType =
  | "click" | "hover" | "generate" | "success" | "pop" | "whoosh";

// ── Hook ──────────────────────────────────────────────────

export function useSound() {
  const ctxRef = useRef<AudioContext | null>(null);
  const [muted, setMuted] = useState(false);

  const getCtx = useCallback((): AudioContext | null => {
    if (typeof window === "undefined") return null;
    if (!ctxRef.current) {
      try {
        ctxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      } catch {
        return null;
      }
    }
    return ctxRef.current;
  }, []);

  const play = useCallback(
    async (type: SoundType) => {
      if (muted) return;
      const ctx = getCtx();
      if (!ctx) return;

      // Ensure AudioContext is running before scheduling sounds
      await ensureResumed(ctx);

      switch (type) {
        case "click":    playSynthClick(ctx); break;
        case "hover":    playSynthHover(ctx); break;
        case "generate": playSynthGenerate(ctx); break;
        case "success":  playSynthSuccess(ctx); break;
        case "pop":      playSynthPop(ctx); break;
        case "whoosh":   playSynthWhoosh(ctx); break;
      }
    },
    [muted, getCtx]
  );

  const toggleMute = useCallback(() => setMuted((m) => !m), []);

  return { play, muted, toggleMute };
}
