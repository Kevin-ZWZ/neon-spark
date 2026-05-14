"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const testimonials = [
  {
    text: "Aura completely transformed our design workflow. The cyberpunk palettes are unmatched.",
    name: "Sarah Chen",
    role: "Design Lead, Vercel",
    initials: "SC",
    gradient: "from-purple-500/20 to-transparent",
  },
  {
    text: "Finally, an AI tool that understands aesthetic. Every generation feels cinematic.",
    name: "Alex Rivera",
    role: "Creative Director, Linear",
    initials: "AR",
    gradient: "from-cyan-500/20 to-transparent",
  },
  {
    text: "The neon palette system alone is worth it. Export quality is incredible.",
    name: "Jordan Park",
    role: "CEO, Raycast",
    initials: "JP",
    gradient: "from-fuchsia-500/20 to-transparent",
  },
  {
    text: "We shipped our entire rebrand using Aura. 10x faster than our old pipeline.",
    name: "Morgan Lee",
    role: "Founder, Arc Browser",
    initials: "ML",
    gradient: "from-emerald-500/20 to-transparent",
  },
  {
    text: "Product Hunt launch went viral thanks to the visuals generated here. Game changer.",
    name: "Taylor Kim",
    role: "Indie Maker",
    initials: "TK",
    gradient: "from-blue-500/20 to-transparent",
  },
  {
    text: "Best-in-class AI aesthetics. The realtime workflow is buttery smooth.",
    name: "Riley Okamoto",
    role: "Design Engineer, Stripe",
    initials: "RO",
    gradient: "from-amber-500/20 to-transparent",
  },
];

function TestimonialCard({
  t,
  index,
}: {
  t: (typeof testimonials)[number];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      className="relative rounded-2xl border border-white/[0.05] p-6 transition-all duration-500 group"
      style={{
        background: `radial-gradient(ellipse at 0% 0%, ${t.gradient.split(" ")[0]}33, transparent 70%), rgba(255,255,255,0.015)`,
      }}
    >
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none shadow-[0_0_20px_rgba(139,92,246,0.06)]" />

      <p className="text-sm text-white/60 leading-relaxed mb-5">
        &ldquo;{t.text}&rdquo;
      </p>

      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-xs font-medium text-white/50">
          {t.initials}
        </div>
        <div>
          <div className="text-sm font-medium text-white/70">{t.name}</div>
          <div className="text-xs text-white/30">{t.role}</div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <motion.section
      ref={sectionRef}
      style={{ y }}
      className="relative py-32 px-6"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/20 bg-purple-500/5 text-xs text-purple-300/80 mb-4">
            ★ 4.9 — Product Hunt
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Loved by{" "}
            <span className="neon-gradient-text">Designers</span>
          </h2>
          <p className="text-white/30 text-lg max-w-xl mx-auto">
            Join thousands of creators building the future of aesthetics
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} t={t} index={i} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
