"use client";

import { useCallback, useRef, useState } from "react";

// Synthesized cyberpunk sounds using Web Audio API

function createAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  try {
    return new (window.AudioContext || (window as any).webkitAudioContext)();
  } catch {
    return null;
  }
}

function playSynthClick(ctx: AudioContext) {
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(880, t);
  osc.frequency.exponentialRampToValueAtTime(440, t + 0.08);
  gain.gain.setValueAtTime(0.08, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(t);
  osc.stop(t + 0.1);
}

function playSynthHover(ctx: AudioContext) {
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(1200, t);
  osc.frequency.exponentialRampToValueAtTime(600, t + 0.04);
  gain.gain.setValueAtTime(0.03, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(t);
  osc.stop(t + 0.05);
}

function playSynthGenerate(ctx: AudioContext) {
  const t = ctx.currentTime;
  const notes = [523, 659, 784, 1047]; // C5 E5 G5 C6 - ascending arpeggio

  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    const start = t + i * 0.08;
    osc.frequency.setValueAtTime(freq, start);
    gain.gain.setValueAtTime(0, start);
    gain.gain.linearRampToValueAtTime(0.06, start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, start + 0.15);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(start);
    osc.stop(start + 0.15);
  });

  // Add a sub bass hit
  const bass = ctx.createOscillator();
  const bassGain = ctx.createGain();
  bass.type = "sine";
  bass.frequency.setValueAtTime(110, t);
  bassGain.gain.setValueAtTime(0.06, t);
  bassGain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
  bass.connect(bassGain);
  bassGain.connect(ctx.destination);
  bass.start(t);
  bass.stop(t + 0.2);
}

function playSynthSuccess(ctx: AudioContext) {
  const t = ctx.currentTime;
  // Bright ascending two-note chime
  [880, 1320].forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    const start = t + i * 0.1;
    osc.frequency.setValueAtTime(freq, start);
    gain.gain.setValueAtTime(0, start);
    gain.gain.linearRampToValueAtTime(0.07, start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, start + 0.3);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(start);
    osc.stop(start + 0.3);
  });
}

function playSynthPop(ctx: AudioContext) {
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(600, t);
  osc.frequency.exponentialRampToValueAtTime(1200, t + 0.04);
  gain.gain.setValueAtTime(0.05, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.06);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(t);
  osc.stop(t + 0.06);
}

function playSynthWhoosh(ctx: AudioContext) {
  const t = ctx.currentTime;
  // Noise-like whoosh through filter
  const bufferSize = ctx.sampleRate * 0.15;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
  }
  const source = ctx.createBufferSource();
  source.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(200, t);
  filter.frequency.exponentialRampToValueAtTime(4000, t + 0.12);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.02, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);

  source.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  source.start(t);
  source.stop(t + 0.15);
}

export type SoundType =
  | "click"
  | "hover"
  | "generate"
  | "success"
  | "pop"
  | "whoosh";

export function useSound() {
  const ctxRef = useRef<AudioContext | null>(null);
  const [muted, setMuted] = useState(false);

  const getCtx = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = createAudioContext();
    }
    if (ctxRef.current?.state === "suspended") {
      ctxRef.current.resume();
    }
    return ctxRef.current;
  }, []);

  const play = useCallback(
    (type: SoundType) => {
      if (muted) return;
      const ctx = getCtx();
      if (!ctx) return;

      switch (type) {
        case "click":
          playSynthClick(ctx);
          break;
        case "hover":
          playSynthHover(ctx);
          break;
        case "generate":
          playSynthGenerate(ctx);
          break;
        case "success":
          playSynthSuccess(ctx);
          break;
        case "pop":
          playSynthPop(ctx);
          break;
        case "whoosh":
          playSynthWhoosh(ctx);
          break;
      }
    },
    [muted, getCtx]
  );

  const toggleMute = useCallback(() => setMuted((m) => !m), []);

  return { play, muted, toggleMute };
}
