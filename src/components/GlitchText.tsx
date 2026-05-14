"use client";

import { useState, useEffect } from "react";

type AsProp = "h1" | "h2" | "h3" | "h4" | "span" | "div" | "p";

interface GlitchTextProps {
  children: React.ReactNode;
  as?: AsProp;
  className?: string;
  playOnMount?: boolean;
  interval?: number;
}

export default function GlitchText({
  children,
  as: Tag = "span",
  className = "",
  playOnMount = true,
  interval = 6000,
}: GlitchTextProps) {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playOnMount) return;
    const start = setTimeout(() => setPlaying(true), 300);
    const stop = setTimeout(() => setPlaying(false), 1200);
    return () => {
      clearTimeout(start);
      clearTimeout(stop);
    };
  }, [playOnMount]);

  useEffect(() => {
    if (!interval) return;
    const id = setInterval(() => {
      setPlaying(true);
      setTimeout(() => setPlaying(false), 600);
    }, interval);
    return () => clearInterval(id);
  }, [interval]);

  return (
    <Tag
      className={`relative inline-block ${className}`}
      data-glitch={typeof children === "string" ? children : undefined}
    >
      <span className={playing ? "animate-glitch" : ""}>
        <span className={playing ? "animate-glitch-shadow" : ""}>
          {children}
        </span>
      </span>
    </Tag>
  );
}
