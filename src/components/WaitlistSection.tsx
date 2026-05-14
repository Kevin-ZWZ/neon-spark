"use client";

import { useState, useCallback, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function WaitlistSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!email || status === "loading") return;

      setStatus("loading");
      setMessage("");

      try {
        const res = await fetch("/api/waitlist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
        const data = await res.json();

        if (res.ok) {
          setStatus("success");
          setMessage(data.message || "You're on the list!");
          setEmail("");
        } else {
          setStatus("error");
          setMessage(data.error || "Something went wrong");
        }
      } catch {
        setStatus("error");
        setMessage("Network error. Please try again.");
      }
    },
    [email, status]
  );

  return (
    <motion.section
      ref={sectionRef}
      id="waitlist"
      style={{ y }}
      className="relative py-32 px-6"
    >
      <div className="mx-auto max-w-2xl text-center">
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
          className="space-y-6"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/20 bg-purple-500/5 text-xs text-purple-300/80 tracking-wide font-heading">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            EARLY ACCESS
          </div>

          {/* Title */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight font-heading">
            Join the{" "}
            <span className="neon-gradient-text">Waitlist</span>
          </h2>

          <p className="text-white/30 text-lg max-w-md mx-auto leading-relaxed">
            NEON SPARK is evolving. Be the first to know when we launch
            AI-powered palette generation, cloud sync, and more.
          </p>

          {/* Email form */}
          <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status !== "idle") setStatus("idle");
                }}
                placeholder="your@email.com"
                className="flex-1 h-11 px-4 rounded-xl bg-white/[0.03] border border-white/10 text-sm text-white placeholder:text-white/20 outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all"
                disabled={status === "loading" || status === "success"}
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                disabled={status === "loading" || status === "success"}
                className="px-5 h-11 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-500 to-cyan-400 text-white text-sm font-medium tracking-wide transition-all duration-300 hover:shadow-[0_0_25px_rgba(139,92,246,0.3)] disabled:opacity-50 disabled:cursor-not-allowed font-heading"
              >
                {status === "loading" ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending
                  </span>
                ) : (
                  "Join"
                )}
              </motion.button>
            </div>

            {/* Status messages */}
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={
                status === "success" || status === "error"
                  ? { opacity: 1, height: "auto" }
                  : { opacity: 0, height: 0 }
              }
              className="overflow-hidden mt-3"
            >
              <p
                className={`text-xs ${
                  status === "success" ? "text-emerald-400/60" : "text-red-400/60"
                }`}
              >
                {message}
              </p>
            </motion.div>
          </form>

          {/* Trust indicators */}
          <div className="flex items-center justify-center gap-6 pt-4 text-xs text-white/20">
            <span>🔒 No spam, unsubscribe anytime</span>
            <span className="w-px h-3 bg-white/10" />
            <span>✨ Free forever — early birds get bonus</span>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
