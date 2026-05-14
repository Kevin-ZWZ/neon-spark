"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import AIGeneratorPanel from "./AIGeneratorPanel";
import GlitchText from "./GlitchText";

const stagger = {
  animate: {
    transition: { staggerChildren: 0.1 },
  },
};

const fadeInUpSpring = {
  initial: { opacity: 0, y: 50 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 80,
      damping: 20,
      mass: 0.8,
    },
  },
};

const fadeInUpSpringDelayed = {
  initial: { opacity: 0, y: 50 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 70,
      damping: 22,
      mass: 0.8,
      delay: 0.15,
    },
  },
};

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.6, 0]);

  return (
    <section
      id="generate"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      <motion.div
        ref={sectionRef}
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative z-10 mx-auto max-w-7xl w-full px-6 py-32 lg:py-20"
      >
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-8 items-center">
          {/* Left content */}
          <motion.div
            variants={stagger}
            initial="initial"
            animate="animate"
            className="space-y-8"
          >
            <motion.div variants={fadeInUpSpring} className="space-y-2">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/20 bg-purple-500/5 text-xs text-purple-300/80 tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                NEON SPARK — Palette Generator
              </div>
            </motion.div>

            <motion.div variants={fadeInUpSpring}>
              <GlitchText
                as="h1"
                className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-[0.04em] leading-[0.95]"
              >
                Generate<br />
                <span className="neon-gradient-text">Future</span><br />
                <span className="text-white/90">Aesthetics</span>
              </GlitchText>
            </motion.div>

            <motion.p
              variants={fadeInUpSpringDelayed}
              className="text-lg sm:text-xl text-white/40 max-w-lg leading-relaxed"
            >
              AI-Powered Cyberpunk Color Palette Generator.
              <br />
              Type a vibe, pick a style, and spark your palette.
            </motion.p>

            <motion.div
              variants={fadeInUpSpringDelayed}
              className="flex flex-wrap gap-4 pt-4"
            >
              <motion.a
                href="#generate"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="px-8 py-3.5 rounded-xl bg-white text-black font-medium text-sm tracking-wide transition-shadow duration-300 hover:shadow-[0_0_40px_rgba(255,255,255,0.25)] neon-border-pulse"
              >
                Generate Now
              </motion.a>
              <motion.a
                href="#showcase"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="px-8 py-3.5 rounded-xl border border-white/15 text-white font-medium text-sm tracking-wide hover:bg-white/5 hover:border-white/25 transition-all duration-300 hover-glow"
              >
                Explore Showcase
              </motion.a>
            </motion.div>

            <motion.div
              variants={fadeInUpSpringDelayed}
              className="flex items-center gap-6 pt-4 text-xs text-white/25"
            >
              <span>Trusted by 50K+ designers</span>
              <span className="w-px h-3 bg-white/10" />
              <span>4.9 ★ Product Hunt</span>
            </motion.div>
          </motion.div>

          {/* Right: AI Generator Panel */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              type: "spring" as const,
              stiffness: 60,
              damping: 20,
              mass: 0.8,
              delay: 0.3,
            }}
            className="flex justify-center lg:justify-end"
          >
            <AIGeneratorPanel />
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll-down indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-white/15 flex items-start justify-center pt-1.5"
        >
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-1.5 rounded-full bg-white/40"
          />
        </motion.div>
        <span className="text-[10px] text-white/15 tracking-[0.15em] font-heading">
          SCROLL
        </span>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
}
