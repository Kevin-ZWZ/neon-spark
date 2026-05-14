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

// ─── SVG Scene Components ──────────────────────────────────────────

function NeonTokyoScene() {
  return (
    <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="tokyo-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0a0015" />
          <stop offset="0.4" stopColor="#1a0030" />
          <stop offset="0.7" stopColor="#0d0020" />
          <stop offset="1" stopColor="#050010" />
        </linearGradient>
        <linearGradient id="neon-glow-x" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="transparent" />
          <stop offset="0.5" stopColor="#00f0ff" stopOpacity="0.3" />
          <stop offset="1" stopColor="transparent" />
        </linearGradient>
      </defs>
      <rect width="400" height="400" fill="url(#tokyo-sky)" />

      {/* Moon */}
      <circle cx="300" cy="80" r="35" fill="url(#neon-glow-x)" opacity="0.6" />
      <circle cx="300" cy="80" r="25" fill="#ff6eb4" opacity="0.4" />
      <circle cx="300" cy="80" r="18" fill="#ff8ac4" opacity="0.3" />

      {/* Buildings */}
      {[
        [10, 180, 40, 220], [55, 140, 30, 260], [90, 100, 35, 300],
        [130, 160, 25, 240], [158, 120, 35, 280], [195, 70, 30, 330],
        [230, 130, 25, 270], [258, 90, 35, 310], [295, 150, 28, 250],
        [325, 110, 30, 290], [358, 170, 42, 230],
      ].map(([x, y, w, h], i) => (
        <g key={i}>
          <rect x={x} y={y} width={w} height={h} fill="#080818" stroke="#1a1a3a" strokeWidth="0.5" />
          {/* Tiny windows */}
          {Array.from({ length: Math.floor(w / 4) }).map((_, j) =>
            Array.from({ length: Math.floor(h / 8) }).map((_, k) => (
              <rect
                key={`${j}-${k}`}
                x={x + 3 + j * 5}
                y={y + 4 + k * 8}
                width="2"
                height="3"
                fill={Math.random() > 0.4 ? "#ff6eb4" : "#00f0ff"}
                opacity={0.3 + Math.random() * 0.3}
              />
            ))
          )}
        </g>
      ))}

      {/* Neon signs */}
      <text x="40" y="78" fill="#00f0ff" fontSize="7" fontWeight="bold" opacity="0.7" fontFamily="monospace">
        [ NEON ]
      </text>
      <text x="160" y="42" fill="#ff6eb4" fontSize="8" fontWeight="bold" opacity="0.6" fontFamily="monospace">
        TOKYO_2049
      </text>
      <text x="310" y="130" fill="#ffd700" fontSize="6" fontWeight="bold" opacity="0.5" fontFamily="monospace">
        ¥₩$¢
      </text>

      {/* Horizontal scan line glow */}
      <rect x="0" y="200" width="400" height="1" fill="#00f0ff" opacity="0.15" />
      <rect x="0" y="100" width="400" height="60" fill="url(#neon-glow-x)" opacity="0.08" />

      {/* Flying car trail */}
      <path d="M50,50 Q150,30 200,60 Q250,90 350,55" fill="none" stroke="#ff6eb4" strokeWidth="1" opacity="0.4" />
      <path d="M50,50 Q150,30 200,60 Q250,90 350,55" fill="none" stroke="#00f0ff" strokeWidth="0.5" opacity="0.6" />
    </svg>
  );
}

function SynthwaveScene() {
  return (
    <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="synth-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0d0221" />
          <stop offset="0.3" stopColor="#1a0533" />
          <stop offset="0.6" stopColor="#ff6eb4" stopOpacity="0.2" />
          <stop offset="1" stopColor="#ff8c00" stopOpacity="0.15" />
        </linearGradient>
        <linearGradient id="synth-sun" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ff6eb4" stopOpacity="0.6" />
          <stop offset="0.5" stopColor="#ff8c00" stopOpacity="0.4" />
          <stop offset="1" stopColor="#ffd700" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <rect width="200" height="200" fill="url(#synth-sky)" />

      {/* Sun */}
      <circle cx="100" cy="90" r="30" fill="url(#synth-sun)" />
      <circle cx="100" cy="90" r="20" fill="#ff6eb4" opacity="0.3" />

      {/* Retro grid */}
      {Array.from({ length: 10 }).map((_, i) => (
        <line
          key={i}
          x1="0" y1={135 + i * 7}
          x2="200" y2={135 + i * 7}
          stroke="#ff6eb4"
          strokeWidth="0.5"
          opacity={0.4 - i * 0.03}
        />
      ))}

      {/* Mountains */}
      <polygon points="0,145 30,105 60,135 90,95 120,130 150,100 180,140 200,120 200,200 0,200" fill="#0d0221" opacity="0.8" />
      <polygon points="0,155 40,120 80,145 120,110 160,140 200,125 200,200 0,200" fill="#1a0533" opacity="0.7" />

      {/* Neon grid lines */}
      <line x1="100" y1="135" x2="100" y2="200" stroke="#ff6eb4" strokeWidth="0.5" opacity="0.3" />
    </svg>
  );
}

function AuroraScene() {
  return (
    <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="aurora-sky" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0a0010" />
          <stop offset="0.5" stopColor="#0a1a0a" />
          <stop offset="1" stopColor="#001005" />
        </linearGradient>
        <linearGradient id="aurora-wave" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="transparent" />
          <stop offset="0.3" stopColor="#10b981" stopOpacity="0.3" />
          <stop offset="0.5" stopColor="#34d399" stopOpacity="0.4" />
          <stop offset="0.7" stopColor="#00f0ff" stopOpacity="0.25" />
          <stop offset="1" stopColor="transparent" />
        </linearGradient>
      </defs>
      <rect width="200" height="200" fill="url(#aurora-sky)" />

      {/* Aurora waves */}
      <path d="M0,60 Q25,30 50,55 Q75,80 100,45 Q125,10 150,50 Q175,90 200,40 L200,200 L0,200Z" fill="url(#aurora-wave)" opacity="0.5" />
      <path d="M0,80 Q30,50 60,70 Q90,90 120,60 Q150,30 180,70 Q195,90 200,75 L200,200 L0,200Z" fill="url(#aurora-wave)" opacity="0.3" />

      {/* Hexagon nodes */}
      <polygon points="100,30 110,35 110,45 100,50 90,45 90,35" fill="none" stroke="#10b981" strokeWidth="0.5" opacity="0.5" />
      <polygon points="160,60 170,65 170,75 160,80 150,75 150,65" fill="none" stroke="#34d399" strokeWidth="0.5" opacity="0.4" />
      <polygon points="40,90 50,95 50,105 40,110 30,105 30,95" fill="none" stroke="#00f0ff" strokeWidth="0.5" opacity="0.4" />

      {/* Data lines */}
      <line x1="90" y1="45" x2="150" y2="70" stroke="#10b981" strokeWidth="0.3" opacity="0.3" />
      <line x1="110" y1="45" x2="50" y2="95" stroke="#34d399" strokeWidth="0.3" opacity="0.3" />
    </svg>
  );
}

function SamuraiScene() {
  return (
    <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="samurai-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#ef4444" stopOpacity="0.2" />
          <stop offset="0.5" stopColor="#7c2d12" stopOpacity="0.1" />
          <stop offset="1" stopColor="transparent" />
        </radialGradient>
      </defs>
      <rect width="200" height="200" fill="#080012" />
      <circle cx="100" cy="100" r="100" fill="url(#samurai-glow)" />

      {/* Samurai helmet silhouette */}
      <path
        d="M60,90 Q60,50 100,45 Q140,50 140,90 L140,95 L135,95
           L135,105 Q130,115 125,105 L125,95 L115,95
           L115,115 L85,115 L85,95 L75,95
           L75,105 Q70,115 65,105 L65,95
           L60,95 Z"
        fill="#e0e0e0"
        opacity="0.12"
      />

      {/* Crest circle */}
      <circle cx="100" cy="72" r="8" fill="none" stroke="#ef4444" strokeWidth="1" opacity="0.4" />

      {/* Vertical blade */}
      <rect x="98" y="115" width="4" height="30" fill="#e0e0e0" opacity="0.15" rx="1" />

      {/* Floating particle dots */}
      {[
        [30, 40], [170, 50], [50, 150], [140, 160], [20, 100], [180, 120],
        [70, 30], [130, 170], [160, 30], [40, 170],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1.5" fill="#ef4444" opacity={0.2 + Math.random() * 0.3} />
      ))}

      {/* Katakana text */}
      <text x="15" y="30" fill="#ef4444" fontSize="6" opacity="0.3" fontFamily="monospace">
        サイバーサムライ
      </text>
      <text x="145" y="180" fill="#ef4444" fontSize="5" opacity="0.2" fontFamily="monospace">
        侍
      </text>
    </svg>
  );
}

function GlassCityScene() {
  return (
    <svg viewBox="0 0 400 200" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="glass-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0a0a20" />
          <stop offset="1" stopColor="#0d0020" />
        </linearGradient>
        <linearGradient id="glass-beam" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3b82f6" stopOpacity="0.3" />
          <stop offset="1" stopColor="transparent" />
        </linearGradient>
      </defs>
      <rect width="400" height="200" fill="url(#glass-sky)" />

      {/* Glass skyscrapers */}
      {[
        [20, 60, 30, 140], [55, 40, 35, 160], [100, 80, 28, 120],
        [135, 50, 40, 150], [185, 30, 32, 170], [225, 70, 25, 130],
        [260, 45, 35, 155], [305, 85, 28, 115], [340, 55, 40, 145],
      ].map(([x, y, w, h], i) => (
        <g key={i}>
          {/* Glass body */}
          <rect x={x} y={y} width={w} height={h} fill="rgba(59, 130, 246, 0.03)" stroke="rgba(59, 130, 246, 0.15)" strokeWidth="0.5" />
          {/* Glass reflection */}
          <rect x={x + 3} y={y + 5} width={w * 0.3} height={h - 10} fill="rgba(255, 255, 255, 0.02)" />
          {/* Prismatic color bands */}
          <rect x={x} y={y + h * 0.2} width={w} height="1" fill="rgba(59, 130, 246, 0.1)" />
          <rect x={x} y={y + h * 0.4} width={w} height="1" fill="rgba(0, 240, 255, 0.08)" />
          <rect x={x} y={y + h * 0.6} width={w} height="1" fill="rgba(139, 92, 246, 0.08)" />
        </g>
      ))}

      {/* Light beams from top */}
      <rect x="55" y="0" width="2" height="40" fill="url(#glass-beam)" />
      <rect x="185" y="0" width="3" height="30" fill="url(#glass-beam)" />
      <rect x="260" y="0" width="2" height="45" fill="url(#glass-beam)" />
      <rect x="340" y="0" width="2" height="55" fill="url(#glass-beam)" />

      {/* Ground reflection */}
      <rect x="0" y="185" width="400" height="15" fill="rgba(59, 130, 246, 0.03)" />
      <line x1="0" y1="185" x2="400" y2="185" stroke="rgba(59, 130, 246, 0.1)" strokeWidth="0.5" />
    </svg>
  );
}

function NeonRainScene() {
  return (
    <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="rain-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0d0020" />
          <stop offset="0.6" stopColor="#1a0a3e" />
          <stop offset="1" stopColor="#2d0a3e" />
        </linearGradient>
        <linearGradient id="ground-glow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="rgba(139, 92, 246, 0.2)" />
          <stop offset="1" stopColor="rgba(236, 72, 153, 0.05)" />
        </linearGradient>
      </defs>
      <rect width="200" height="200" fill="url(#rain-sky)" />

      {/* Rain streaks */}
      {Array.from({ length: 30 }).map((_, i) => {
        const x = Math.random() * 200;
        const y = Math.random() * 200;
        const len = 8 + Math.random() * 12;
        return (
          <line
            key={i}
            x1={x} y1={y}
            x2={x + 1} y2={y + len}
            stroke={Math.random() > 0.5 ? "#8b5cf6" : "#ec4899"}
            strokeWidth="0.5"
            opacity={0.15 + Math.random() * 0.25}
          />
        );
      })}

      {/* Ground reflection */}
      <rect x="0" y="170" width="200" height="30" fill="url(#ground-glow)" />
      <line x1="0" y1="170" x2="200" y2="170" stroke="#ec4899" strokeWidth="0.5" opacity="0.3" />

      {/* Neon sign reflection on ground */}
      <ellipse cx="100" cy="185" rx="40" ry="6" fill="#ec4899" opacity="0.08" />
      <ellipse cx="50" cy="182" rx="25" ry="4" fill="#8b5cf6" opacity="0.06" />
      <ellipse cx="160" cy="183" rx="30" ry="5" fill="#ec4899" opacity="0.07" />

      {/* Distant buildings */}
      <rect x="10" y="140" width="15" height="30" fill="#0a0a2a" opacity="0.8" />
      <rect x="30" y="120" width="12" height="50" fill="#0a0a2a" opacity="0.8" />
      <rect x="50" y="130" width="18" height="40" fill="#0a0a2a" opacity="0.8" />
      <rect x="80" y="115" width="10" height="55" fill="#0a0a2a" opacity="0.8" />
      <rect x="100" y="125" width="14" height="45" fill="#0a0a2a" opacity="0.8" />
      <rect x="125" y="135" width="16" height="35" fill="#0a0a2a" opacity="0.8" />
      <rect x="150" y="110" width="12" height="60" fill="#0a0a2a" opacity="0.8" />
      <rect x="170" y="128" width="20" height="42" fill="#0a0a2a" opacity="0.8" />
    </svg>
  );
}

function DataStreamScene() {
  return (
    <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="matrix-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#000510" />
          <stop offset="1" stopColor="#0a0a2a" />
        </linearGradient>
      </defs>
      <rect width="200" height="200" fill="url(#matrix-sky)" />

      {/* Matrix code columns */}
      {Array.from({ length: 10 }).map((_, col) => {
        const x = 10 + col * 20;
        const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノ";
        return (
          <g key={col}>
            {Array.from({ length: 10 }).map((_, row) => {
              const y = 5 + row * 20;
              const char = chars[Math.floor(Math.random() * chars.length)];
              const alpha = 0.08 + ((row * 7 + col * 11) % 20) / 100;
              return (
                <text
                  key={row}
                  x={x}
                  y={y}
                  fill="#00f0ff"
                  fontSize="9"
                  fontFamily="monospace"
                  opacity={alpha}
                >
                  {char}
                </text>
              );
            })}
          </g>
        );
      })}

      {/* Data flow lines */}
      <path d="M0,50 Q50,40 100,55 Q150,70 200,45" fill="none" stroke="#00f0ff" strokeWidth="0.5" opacity="0.15" />
      <path d="M0,120 Q50,110 100,125 Q150,140 200,115" fill="none" stroke="#00f0ff" strokeWidth="0.3" opacity="0.1" />

      {/* Binary dots */}
      {Array.from({ length: 15 }).map((_, i) => (
        <circle
          key={i}
          cx={10 + Math.random() * 180}
          cy={10 + Math.random() * 180}
          r={1}
          fill="#00f0ff"
          opacity={0.1 + Math.random() * 0.2}
        />
      ))}

      {/* Circuit traces */}
      <path d="M30,30 L170,30 L170,50 L30,50 Z" fill="none" stroke="#00f0ff" strokeWidth="0.3" opacity="0.08" />
      <path d="M30,170 L170,170 L170,150 L30,150 Z" fill="none" stroke="#00f0ff" strokeWidth="0.3" opacity="0.05" />
    </svg>
  );
}

const sceneComponents: Record<string, React.ReactNode> = {
  "Neon Tokyo 2049": <NeonTokyoScene />,
  "Synthwave Horizon": <SynthwaveScene />,
  "Aurora Protocol": <AuroraScene />,
  "Digital Samurai": <SamuraiScene />,
  "Glass City": <GlassCityScene />,
  "Neon Rain": <NeonRainScene />,
  "Data Stream": <DataStreamScene />,
};

// ─── Card Component ────────────────────────────────────────────────

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
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        type: "spring",
        stiffness: 70,
        damping: 18,
        mass: 0.7,
        delay: index * 0.06,
      }}
      className={`relative ${item.span} group cursor-pointer overflow-hidden rounded-2xl`}
      whileHover={{ scale: 1.03, zIndex: 10, y: -4 }}
    >
      <div
        className="relative h-full min-h-[200px] overflow-hidden"
        style={{
          background: `radial-gradient(ellipse at 30% 20%, ${accentColors[item.accent]}, transparent 70%), rgba(255,255,255,0.02)`,
        }}
      >
        {/* Scene SVG */}
        {sceneComponents[item.title]}

        {/* Dark overlay at bottom for text readability */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />

        {/* Hover glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 50% 50%, ${accentColors[item.accent]}, transparent 70%)`,
          }}
        />

        {/* Hover border glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            boxShadow: `inset 0 0 1px 1px ${borderColors[item.accent]}, 0 0 30px ${accentColors[item.accent]}`,
          }}
        />

        {/* Scan line on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden">
          <div
            className="absolute left-0 right-0 h-px animate-scan"
            style={{
              background: `linear-gradient(90deg, transparent, ${borderColors[item.accent]}, transparent)`,
              top: "30%",
            }}
          />
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-heading">
            {item.style}
          </span>
          <h3 className="text-base font-semibold mt-0.5 text-white tracking-tight font-heading">
            {item.title}
          </h3>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Section ────────────────────────────────────────────────────────

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
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            type: "spring",
            stiffness: 60,
            damping: 20,
            mass: 0.8,
          }}
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
