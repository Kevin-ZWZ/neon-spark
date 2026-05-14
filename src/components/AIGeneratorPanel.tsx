"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const styleTags = [
  "Cyberpunk",
  "Neon Tokyo",
  "Synthwave",
  "Aurora Sci-Fi",
  "Cinematic",
  "Glassmorphism",
];

export default function AIGeneratorPanel() {
  const [prompt, setPrompt] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generated, setGenerated] = useState(false);

  const toggleTag = useCallback((tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }, []);

  const handleGenerate = useCallback(() => {
    if (isGenerating) return;

    setIsGenerating(true);
    setProgress(0);
    setGenerated(false);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          setGenerated(true);
          return 100;
        }
        return prev + Math.random() * 15 + 2;
      });
    }, 150);
  }, [isGenerating]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
      className="relative w-full max-w-md mx-auto lg:mx-0"
    >
      {/* Panel */}
      <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur-2xl shadow-2xl">
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/5 via-transparent to-cyan-500/5 pointer-events-none" />

        {/* Header */}
        <div className="relative px-5 py-4 border-b border-white/5 flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="text-xs text-white/30 ml-2 font-mono">
            aura-generator v2.4
          </span>
        </div>

        {/* Body */}
        <div className="relative p-5 space-y-4">
          {/* Prompt input */}
          <div>
            <label className="text-xs text-white/40 uppercase tracking-widest mb-2 block">
              Prompt
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="A cyberpunk city skyline at midnight with neon signs reflecting on wet streets..."
              className="w-full h-20 bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 resize-none focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all"
            />
          </div>

          {/* Style tags */}
          <div>
            <label className="text-xs text-white/40 uppercase tracking-widest mb-2 block">
              Style
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
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
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

          {/* Generate button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-500 to-cyan-400 text-white font-medium text-sm tracking-wide transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? "Generating..." : "Generate"}
          </motion.button>

          {/* Progress bar */}
          <AnimatePresence>
            {isGenerating && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-2"
              >
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-cyan-400 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(progress, 100)}%` }}
                    transition={{ duration: 0.15 }}
                  />
                </div>
                <div className="flex justify-between text-xs text-white/30">
                  <span>Processing</span>
                  <span>{Math.min(Math.floor(progress), 100)}%</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Generated image mock */}
          <AnimatePresence>
            {generated && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-xl overflow-hidden border border-white/10"
              >
                <div className="relative aspect-[16/10] bg-gradient-to-br from-[#0f0829] via-[#1a0a3e] to-[#0a1628] flex items-center justify-center">
                  {/* Mock generated image content */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(139,92,246,0.2),transparent_70%)]" />

                  {/* Neon grid lines */}
                  <svg
                    className="absolute inset-0 w-full h-full opacity-20"
                    viewBox="0 0 400 250"
                  >
                    <defs>
                      <linearGradient
                        id="line-grad"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#00f0ff" />
                      </linearGradient>
                    </defs>
                    {Array.from({ length: 8 }).map((_, i) => (
                      <line
                        key={`h-${i}`}
                        x1="0"
                        y1={30 + i * 28}
                        x2="400"
                        y2={30 + i * 28}
                        stroke="url(#line-grad)"
                        strokeWidth="0.5"
                        opacity={1 - i * 0.12}
                      />
                    ))}
                    {Array.from({ length: 12 }).map((_, i) => (
                      <line
                        key={`v-${i}`}
                        x1={20 + i * 32}
                        y1="0"
                        x2={20 + i * 32}
                        y2="250"
                        stroke="url(#line-grad)"
                        strokeWidth="0.5"
                        opacity={1 - i * 0.08}
                      />
                    ))}
                  </svg>

                  {/* Cyberpunk buildings silhouette */}
                  <div className="absolute bottom-0 left-0 right-0 h-1/2">
                    <svg
                      viewBox="0 0 400 125"
                      className="w-full h-full"
                      preserveAspectRatio="none"
                    >
                      {[
                        [0, 60, 50, 125],
                        [45, 40, 30, 125],
                        [70, 20, 40, 125],
                        [105, 55, 25, 125],
                        [125, 25, 35, 125],
                        [155, 45, 20, 125],
                        [170, 15, 30, 125],
                        [195, 50, 25, 125],
                        [215, 30, 35, 125],
                        [245, 10, 30, 125],
                        [270, 45, 25, 125],
                        [290, 25, 35, 125],
                        [320, 55, 30, 125],
                        [345, 20, 55, 125],
                      ].map(([x, top, w, h], i) => (
                        <rect
                          key={i}
                          x={x}
                          y={top}
                          width={w}
                          height={h}
                          fill="#0a0a1a"
                          stroke="rgba(139, 92, 246, 0.3)"
                          strokeWidth="0.5"
                        />
                      ))}
                    </svg>
                  </div>

                  {/* Neon signs */}
                  <div className="absolute top-8 left-8 text-xs font-mono text-cyan-400/60 tracking-[0.3em]">
                    NEON_TOKYO_2049
                  </div>
                  <div className="absolute top-16 right-8 text-xs font-mono text-fuchsia-400/60 tracking-[0.3em]">
                    SYNTHWAVE_V3
                  </div>

                  {/* Large moon/circle */}
                  <div className="absolute top-10 right-24 w-16 h-16 rounded-full bg-gradient-to-br from-cyan-300/20 to-purple-500/20 border border-white/10 backdrop-blur-sm shadow-[0_0_40px_rgba(0,240,255,0.15)]" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
