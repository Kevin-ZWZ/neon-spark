"use client";

import { motion } from "framer-motion";
import AIGeneratorPanel from "./AIGeneratorPanel";

const stagger = {
  animate: {
    transition: { staggerChildren: 0.12 },
  },
};

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function HeroSection() {
  return (
    <section
      id="generate"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      <div className="relative z-10 mx-auto max-w-7xl w-full px-6 py-32 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-8 items-center">
          {/* Left content */}
          <motion.div
            variants={stagger}
            initial="initial"
            animate="animate"
            className="space-y-8"
          >
            <motion.div variants={fadeInUp} className="space-y-2">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/20 bg-purple-500/5 text-xs text-purple-300/80 tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                AI Design Platform v3
              </div>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[0.95]"
            >
              Generate
              <br />
              <span className="neon-gradient-text">Future</span>
              <br />
              <span className="text-white/90">Aesthetics</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg sm:text-xl text-white/40 max-w-lg leading-relaxed"
            >
              AI-Powered Cyberpunk Design & Color Palette Generator.
              <br />
              Create cinematic, neon-infused visuals in seconds.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap gap-4 pt-4"
            >
              <motion.a
                href="#generate"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-3.5 rounded-xl bg-white text-black font-medium text-sm tracking-wide transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,255,255,0.2)]"
              >
                Generate Now
              </motion.a>
              <motion.a
                href="#showcase"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-3.5 rounded-xl border border-white/15 text-white font-medium text-sm tracking-wide hover:bg-white/5 hover:border-white/25 transition-all duration-300"
              >
                Explore Showcase
              </motion.a>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="flex items-center gap-6 pt-4 text-xs text-white/25"
            >
              <span>Trusted by 50K+ designers</span>
              <span className="w-px h-3 bg-white/10" />
              <span>4.9 ★ Product Hunt</span>
            </motion.div>
          </motion.div>

          {/* Right: AI Generator Panel */}
          <div className="flex justify-center lg:justify-end">
            <AIGeneratorPanel />
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
}
