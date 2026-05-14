"use client";

import { useEffect, useRef } from "react";

export default function AuroraBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });

    const draw = () => {
      time += 0.003;
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      // Aurora 1 — purple/blue at top-left
      const g1 = ctx.createRadialGradient(
        w * 0.15 + Math.sin(time * 0.7) * 80,
        h * 0.1 + Math.cos(time * 0.5) * 60,
        0,
        w * 0.3,
        h * 0.4,
        Math.max(w, h) * 0.6
      );
      g1.addColorStop(0, "rgba(139, 92, 246, 0.15)");
      g1.addColorStop(0.5, "rgba(59, 130, 246, 0.06)");
      g1.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, w, h);

      // Aurora 2 — cyan at top-right
      const g2 = ctx.createRadialGradient(
        w * 0.85 + Math.cos(time * 0.6) * 70,
        h * 0.05 + Math.sin(time * 0.8) * 50,
        0,
        w * 0.25,
        h * 0.35,
        Math.max(w, h) * 0.55
      );
      g2.addColorStop(0, "rgba(0, 240, 255, 0.1)");
      g2.addColorStop(0.5, "rgba(6, 182, 212, 0.04)");
      g2.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, w, h);

      // Aurora 3 — pink/purple at center-right
      const g3 = ctx.createRadialGradient(
        w * 0.7 + Math.sin(time * 0.4) * 100,
        h * 0.5 + Math.cos(time * 0.6) * 80,
        0,
        w * 0.35,
        h * 0.5,
        Math.max(w, h) * 0.7
      );
      g3.addColorStop(0, "rgba(236, 72, 153, 0.08)");
      g3.addColorStop(0.4, "rgba(139, 92, 246, 0.04)");
      g3.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = g3;
      ctx.fillRect(0, 0, w, h);

      // Aurora 4 — deep blue at bottom
      const g4 = ctx.createRadialGradient(
        w * 0.5 + Math.cos(time * 0.55) * 120,
        h * 0.85 + Math.sin(time * 0.45) * 60,
        0,
        w * 0.5,
        h * 0.3,
        Math.max(w, h) * 0.6
      );
      g4.addColorStop(0, "rgba(59, 130, 246, 0.08)");
      g4.addColorStop(0.6, "rgba(30, 27, 75, 0.04)");
      g4.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = g4;
      ctx.fillRect(0, 0, w, h);

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0, opacity: 0.8 }}
    />
  );
}
