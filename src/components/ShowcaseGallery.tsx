"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const showcaseItems = [
  {
    title: "Neon Tokyo 2049",
    style: "Cyberpunk",
    gradient: "from-cyan-500/20 via-purple-500/10 to-transparent",
    accent: "cyan",
    span: "col-span-2 row-span-2",
  },
  {
    title: "Synthwave Horizon",
    style: "Synthwave",
    gradient: "from-fuchsia-500/20 via-orange-500/10 to-transparent",
    accent: "fuchsia",
    span: "",
  },
  {
    title: "Aurora Protocol",
    style: "Sci-Fi",
    gradient: "from-emerald-500/20 via-cyan-500/10 to-transparent",
    accent: "emerald",
    span: "",
  },
  {
    title: "Digital Samurai",
    style: "Cinematic",
    gradient: "from-red-500/20 via-purple-500/10 to-transparent",
    accent: "red",
    span: "",
  },
  {
    title: "Glass City",
    style: "Glassmorphism",
    gradient: "from-blue-500/20 via-cyan-500/10 to-transparent",
    accent: "blue",
    span: "col-span-2",
  },
  {
    title: "Neon Rain",
    style: "Cyberpunk",
    gradient: "from-violet-500/20 via-pink-500/10 to-transparent",
    accent: "violet",
    span: "",
  },
  {
    title: "Data Stream",
    style: "Futuristic",
    gradient: "from-cyan-500/20 via-blue-500/10 to-transparent",
    accent: "cyan",
    span: "",
  },
];

function ShowcaseCard({
  item,
  index,
}: {
  item: (typeof showcaseItems)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const accentColors: Record<string, string> = {
    cyan: "rgba(0, 240, 255, 0.15)",
    fuchsia: "rgba(217, 70, 239, 0.15)",
    emerald: "rgba(16, 185, 129, 0.15)",
    red: "rgba(239, 68, 68, 0.15)",
    blue: "rgba(59, 130, 246, 0.15)",
    violet: "rgba(139, 92, 246, 0.15)",
  };

  const borderColors: Record<string, string> = {
    cyan: "rgba(0, 240, 255, 0.3)",
    fuchsia: "rgba(217, 70, 239, 0.3)",
    emerald: "rgba(16, 185, 129, 0.3)",
    red: "rgba(239, 68, 68, 0.3)",
    blue: "rgba(59, 130, 246, 0.3)",
    violet: "rgba(139, 92, 246, 0.3)",
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className={`relative ${item.span} group cursor-pointer`}
      whileHover={{ scale: 1.02, zIndex: 10 }}
    >
      <div
        className="relative h-full min-h-[200px] rounded-2xl overflow-hidden border border-white/[0.06] p-6 flex flex-col justify-end"
        style={{
          background: `radial-gradient(ellipse at 30% 20%, ${accentColors[item.accent]}, transparent 70%), rgba(255,255,255,0.02)`,
        }}
      >
        {/* Hover glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 50% 50%, ${accentColors[item.accent]}, transparent 70%)`,
          }}
        />

        {/* Hover border glow */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            boxShadow: `inset 0 0 1px 1px ${borderColors[item.accent]}, 0 0 30px ${accentColors[item.accent]}`,
          }}
        />

        {/* Decorative elements */}
        <div className="absolute top-4 right-4 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="w-2 h-2 rounded-full bg-white/20" />
          <div className="w-2 h-2 rounded-full bg-white/10" />
          <div className="w-2 h-2 rounded-full bg-white/5" />
        </div>

        <div className="relative z-10">
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">
            {item.style}
          </span>
          <h3 className="text-lg font-semibold mt-1 text-white/90 tracking-tight">
            {item.title}
          </h3>
        </div>

        {/* Scan line on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden">
          <div
            className="absolute left-0 right-0 h-px"
            style={{
              background: `linear-gradient(90deg, transparent, ${borderColors[item.accent]}, transparent)`,
              top: "50%",
              animation: "none",
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function ShowcaseGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6]);

  return (
    <motion.section
      ref={sectionRef}
      id="showcase"
      style={{ y, opacity }}
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
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Showcase{" "}
            <span className="neon-gradient-text">Gallery</span>
          </h2>
          <p className="text-white/30 text-lg max-w-xl mx-auto">
            Explore the future of AI-generated cyberpunk aesthetics
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[200px] gap-4">
          {showcaseItems.map((item, i) => (
            <ShowcaseCard key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
