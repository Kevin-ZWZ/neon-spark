"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const styleTags = [
  "Neon Cyberpunk",
  "Vaporwave",
  "Toxic Green",
  "Hologram",
  "Blood Rust",
  "Tokyo Nights",
];

interface PaletteColor {
  hex: string;
  name: string;
}

interface SavedPalette {
  id: string;
  keyword: string;
  tags: string[];
  colors: PaletteColor[];
  timestamp: number;
}

// ─── Deterministic color generation ─────────────────────────

function hashStr(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function hslToHex(h: number, s: number, l: number): string {
  const hue = ((h % 360) + 360) % 360;
  const saturation = Math.max(0, Math.min(100, s));
  const lightness = Math.max(0, Math.min(100, l));
  const c = (1 - Math.abs(2 * lightness / 100 - 1)) * (saturation / 100);
  const x = c * (1 - Math.abs((hue / 60) % 2 - 1));
  const m = lightness / 100 - c / 2;
  let r = 0, g = 0, b = 0;
  if (hue < 60) { r = c; g = x; b = 0; }
  else if (hue < 120) { r = x; g = c; b = 0; }
  else if (hue < 180) { r = 0; g = c; b = x; }
  else if (hue < 240) { r = 0; g = x; b = c; }
  else if (hue < 300) { r = x; g = 0; b = c; }
  else { r = c; g = 0; b = x; }
  const toHex = (n: number) =>
    Math.round((n + m) * 255).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

const colorNames = [
  "Neon Pulse", "Cyber Violet", "Holo Blue", "Plasma Pink",
  "Digital Jade", "Phantom Indigo", "Synthwave Orange", "Glitch Red",
  "Data Cyan", "Quantum Teal", "Electric Lime", "Shadow Purple",
  "Neon Coral", "Deep Amethyst", "Circuit Gold", "Void Crimson",
];

function generatePalette(keyword: string, tags: string[]): PaletteColor[] {
  const seedStr = `${keyword}|${tags.sort().join(",")}`;
  const baseSeed = hashStr(seedStr || "default_cyberpunk");
  const rand = seededRandom(baseSeed);
  const baseHue = rand() * 360;
  const palette: PaletteColor[] = [];
  const offsets = [
    { h: 0, s: 85, l: 55 },
    { h: 30, s: 90, l: 50 },
    { h: 180, s: 80, l: 45 },
    { h: -60, s: 75, l: 60 },
    { h: 120, s: 70, l: 35 },
    { h: -150, s: 85, l: 65 },
  ];
  for (let i = 0; i < 6; i++) {
    const offset = offsets[i];
    const hue = baseHue + offset.h + (rand() - 0.5) * 20;
    const sat = offset.s + (rand() - 0.5) * 10;
    const lig = offset.l + (rand() - 0.5) * 10;
    const hex = hslToHex(hue, sat, lig);
    const nameIdx = Math.floor(rand() * colorNames.length);
    palette.push({ hex, name: colorNames[nameIdx] });
  }
  return palette;
}

// ─── Random inspiration ─────────────────────────────────────

const randomKeywords = [
  "Neon Tokyo sunset", "Cyberpunk night rain", "Synthwave ocean drive",
  "Holographic sakura", "Digital storm", "Neon graveyard",
  "Chrome samurai", "Plasma desert", "Glitch city lights",
  "Acid rave sunrise", "Void cathedral", "Neon jungle",
  "Holo-dragon scales", "Quantum aurora", "Binary rose garden",
];

// ─── Component ─────────────────────────────────────────────

export default function AIGeneratorPanel() {
  const [prompt, setPrompt] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [palette, setPalette] = useState<PaletteColor[] | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [history, setHistory] = useState<SavedPalette[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [cssCopied, setCssCopied] = useState(false);

  // Load history from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem("neon-spark-history");
      if (raw) setHistory(JSON.parse(raw));
    } catch {}
  }, []);

  // Save a palette to history
  const saveToHistory = useCallback(
    (colors: PaletteColor[]) => {
      const entry: SavedPalette = {
        id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
        keyword: prompt || "(no keyword)",
        tags: [...selectedTags],
        colors,
        timestamp: Date.now(),
      };
      const updated = [entry, ...history].slice(0, 12);
      setHistory(updated);
      try {
        localStorage.setItem("neon-spark-history", JSON.stringify(updated));
      } catch {}
    },
    [history, prompt, selectedTags]
  );

  const toggleTag = useCallback((tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }, []);

  const handleGenerate = useCallback(() => {
    if (isGenerating) return;
    setIsGenerating(true);
    setPalette(null);
    setTimeout(() => {
      const colors = generatePalette(prompt, selectedTags);
      setPalette(colors);
      setIsGenerating(false);
      saveToHistory(colors);
    }, 500);
  }, [isGenerating, prompt, selectedTags, saveToHistory]);

  // ── Random inspiration ──
  const handleRandom = useCallback(() => {
    const keyword = randomKeywords[Math.floor(Math.random() * randomKeywords.length)];
    const count = 1 + Math.floor(Math.random() * 3);
    const shuffled = [...styleTags].sort(() => Math.random() - 0.5);
    const tags = shuffled.slice(0, count);
    setPrompt(keyword);
    setSelectedTags(tags);
    // Auto-generate
    setTimeout(() => {
      setIsGenerating(true);
      setPalette(null);
      setTimeout(() => {
        const colors = generatePalette(keyword, tags);
        setPalette(colors);
        setIsGenerating(false);
        const entry: SavedPalette = {
          id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
          keyword,
          tags,
          colors,
          timestamp: Date.now(),
        };
        const updated = [entry, ...history].slice(0, 12);
        setHistory(updated);
        try { localStorage.setItem("neon-spark-history", JSON.stringify(updated)); } catch {}
      }, 500);
    }, 50);
  }, [history]);

  // ── Copy CSS variables ──
  const copyCssVars = useCallback(() => {
    if (!palette) return;
    const vars = palette
      .map((c, i) => `  --spark-${i + 1}: ${c.hex};  /* ${c.name} */`)
      .join("\n");
    const css = `:root {\n${vars}\n}`;
    navigator.clipboard.writeText(css);
    setCssCopied(true);
    setTimeout(() => setCssCopied(false), 1500);
  }, [palette]);

  // ── Restore history item ──
  const restoreHistory = useCallback((item: SavedPalette) => {
    setPrompt(item.keyword === "(no keyword)" ? "" : item.keyword);
    setSelectedTags(item.tags);
    setPalette(item.colors);
    setShowHistory(false);
  }, []);

  // ── Delete history item ──
  const deleteHistory = useCallback(
    (id: string) => {
      const updated = history.filter((h) => h.id !== id);
      setHistory(updated);
      try { localStorage.setItem("neon-spark-history", JSON.stringify(updated)); } catch {}
    },
    [history]
  );

  const copyHex = useCallback((hex: string, index: number) => {
    navigator.clipboard.writeText(hex);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1200);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleGenerate();
      }
    },
    [handleGenerate]
  );

  const quickExamples = [
    "Neon Tokyo sunset",
    "Cyberpunk night rain",
    "Synthwave ocean drive",
    "Holographic sakura",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
      className="relative w-full max-w-md mx-auto lg:mx-0"
    >
      <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur-2xl shadow-2xl hover-glow transition-all duration-500">
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/5 via-transparent to-cyan-500/5 pointer-events-none" />

        {/* Header */}
        <div className="relative px-5 py-4 border-b border-white/5 flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="text-xs text-white/30 ml-2 font-heading tracking-wider">
            NEON SPARK v1.0
          </span>
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="ml-auto text-[10px] text-purple-400/50 hover:text-purple-400/80 transition-colors font-heading tracking-widest flex items-center gap-1"
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12,6 12,12 16,14" />
            </svg>
            HISTORY
          </button>
        </div>

        {/* Body */}
        <div className="relative p-5 space-y-4">
          {/* Prompt input */}
          <div>
            <label className="text-xs text-white/40 uppercase tracking-[0.15em] mb-2 block font-heading">
              Keyword
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="e.g. Neon Tokyo sunset, Cyberpunk night rain..."
              className="w-full h-16 bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 resize-none focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all"
            />
          </div>

          {/* Quick examples */}
          <div className="flex flex-wrap gap-1.5">
            {quickExamples.map((ex) => (
              <button
                key={ex}
                onClick={() => setPrompt(ex)}
                className="text-[10px] px-2 py-1 rounded-md bg-white/[0.03] border border-white/5 text-white/30 hover:text-white/60 hover:border-white/15 transition-all"
              >
                {ex}
              </button>
            ))}
          </div>

          {/* Style tags */}
          <div>
            <label className="text-xs text-white/40 uppercase tracking-[0.15em] mb-2 block font-heading">
              Vibe
            </label>
            <div className="flex flex-wrap gap-2">
              {styleTags.map((tag) => {
                const active = selectedTags.includes(tag);
                return (
                  <motion.button
                    key={tag}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 font-heading tracking-wider ${
                      active
                        ? "bg-purple-500/20 border border-purple-400/40 text-purple-300 shadow-[0_0_15px_rgba(139,92,246,0.2)]"
                        : "bg-white/[0.03] border border-white/10 text-white/50 hover:border-white/20 hover:text-white/70"
                    }`}
                  >
                    {tag}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Generate + Random buttons */}
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGenerate}
              disabled={isGenerating}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-500 to-cyan-400 text-white font-medium text-sm tracking-[0.15em] transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] disabled:opacity-50 disabled:cursor-not-allowed font-heading"
            >
              {isGenerating ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Generating...
                </span>
              ) : (
                "✦ Generate Palette"
              )}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, rotate: -15 }}
              whileTap={{ scale: 0.9, rotate: -30 }}
              onClick={handleRandom}
              disabled={isGenerating}
              className="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-white/50 hover:text-white/80 hover:border-white/20 transition-all duration-300 shrink-0 disabled:opacity-30"
              title="Random inspiration"
            >
              🎲
            </motion.button>
          </div>

          {/* Generated palette */}
          <AnimatePresence>
            {palette && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-white/30 font-heading tracking-[0.2em] uppercase">
                    Palette
                  </span>
                  <div className="flex items-center gap-2">
                    {/* Export CSS button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={copyCssVars}
                      className="text-[10px] px-2 py-1 rounded-md bg-white/[0.03] border border-white/10 text-white/30 hover:text-white/60 hover:border-white/20 transition-all font-mono"
                    >
                      {cssCopied ? "✓ CSS Copied" : "</> CSS"}
                    </motion.button>
                    <span className="text-[10px] text-purple-400/50 font-mono">
                      {palette.length} colors
                    </span>
                  </div>
                </div>

                {/* Color swatches */}
                <div className="grid grid-cols-3 gap-2">
                  {palette.map((color, i) => (
                    <motion.button
                      key={`${color.hex}-${i}`}
                      initial={{ opacity: 0, scale: 0.8, y: 10 }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        transition: { delay: i * 0.06, duration: 0.3 },
                      }}
                      whileHover={{ scale: 1.05, zIndex: 10 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => copyHex(color.hex, i)}
                      className="group relative rounded-xl overflow-hidden cursor-pointer"
                    >
                      <div
                        className="w-full aspect-[3/2] rounded-xl transition-all duration-300"
                        style={{ backgroundColor: color.hex }}
                      >
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                          <span className="text-white/0 group-hover:text-white/80 text-[10px] font-mono transition-all duration-300">
                            {copiedIndex === i ? "✓ COPIED" : "COPY"}
                          </span>
                        </div>
                      </div>
                      <div className="mt-1.5 text-center">
                        <span className="text-[11px] font-mono text-white/50 group-hover:text-white/80 transition-colors">
                          {color.hex}
                        </span>
                        <div className="text-[9px] text-white/20 font-heading tracking-wider truncate">
                          {color.name}
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>

                {/* Bottom glow line */}
                <div className="h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Empty state */}
          {!palette && !isGenerating && (
            <div className="text-center py-4">
              <p className="text-xs text-white/15 font-heading tracking-[0.1em]">
                ENTER A KEYWORD & GENERATE
              </p>
              <p className="text-[10px] text-white/10 mt-1">
                Or click 🎲 for random inspiration
              </p>
            </div>
          )}

          {/* ── History Panel ── */}
          <AnimatePresence>
            {showHistory && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="border-t border-white/5 pt-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-white/30 font-heading tracking-[0.2em] uppercase">
                      History ({history.length})
                    </span>
                    {history.length > 0 && (
                      <button
                        onClick={() => {
                          setHistory([]);
                          try { localStorage.removeItem("neon-spark-history"); } catch {}
                        }}
                        className="text-[9px] text-white/20 hover:text-red-400/60 transition-colors"
                      >
                        Clear all
                      </button>
                    )}
                  </div>

                  {history.length === 0 ? (
                    <p className="text-[10px] text-white/15 text-center py-4">
                      No saved palettes yet
                    </p>
                  ) : (
                    <div className="space-y-1.5 max-h-48 overflow-y-auto scrollbar-thin">
                      {history.map((item) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="group flex items-center gap-2 p-2 rounded-lg bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] hover:border-white/10 transition-all cursor-pointer"
                          onClick={() => restoreHistory(item)}
                        >
                          {/* Mini swatches */}
                          <div className="flex gap-px shrink-0">
                            {item.colors.map((c, i) => (
                              <div
                                key={i}
                                className="w-4 h-6 first:rounded-l-md last:rounded-r-md"
                                style={{ backgroundColor: c.hex }}
                              />
                            ))}
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <p className="text-[10px] text-white/60 truncate font-heading">
                              {item.keyword}
                            </p>
                            <p className="text-[8px] text-white/20">
                              {new Date(item.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                              {item.tags.length > 0 && ` · ${item.tags.join(", ")}`}
                            </p>
                          </div>

                          {/* Delete */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteHistory(item.id);
                            }}
                            className="text-white/10 hover:text-red-400/60 transition-colors opacity-0 group-hover:opacity-100"
                          >
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <line x1="18" y1="6" x2="6" y2="18" />
                              <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
