"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession, signOut } from "next-auth/react";
import AuthModal from "./AuthModal";
import { playSound, isMuted, toggleMute as toggleGlobalMute } from "@/lib/sound";

const links = [
  { label: "Features", href: "#features" },
  { label: "Showcase", href: "#showcase" },
  { label: "Waitlist", href: "#waitlist" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: session } = useSession();
  const [muted, setMuted] = useState(isMuted());

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/40 backdrop-blur-2xl border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4">
        <a
          href="#"
          className="text-xl font-bold tracking-[0.08em] neon-gradient-text font-heading"
        >
          NEON SPARK
        </a>

        <div className="hidden md:flex items-center gap-4">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onMouseEnter={() => playSound("hover")}
              className="text-sm text-white/60 hover:text-white transition-colors duration-300 neon-underline font-heading"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#generate"
            onMouseEnter={() => playSound("hover")}
            onClick={() => playSound("click")}
            className="text-sm px-5 py-2 rounded-full bg-white text-black font-medium hover:bg-white/90 transition-colors neon-border-pulse font-heading"
          >
            Generate
          </a>

          {/* Mute toggle */}
          <button
            onClick={() => { const m = toggleGlobalMute(); setMuted(m); }}
            onMouseEnter={() => playSound("hover")}
            className="w-7 h-7 rounded-lg bg-white/[0.03] border border-white/10 flex items-center justify-center text-white/30 hover:text-white/60 hover:border-white/20 transition-all shrink-0"
            title={muted ? "Unmute" : "Mute"}
          >
            {muted ? (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="11,5 6,9 2,9 2,15 6,15 11,19" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            ) : (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="11,5 6,9 2,9 2,15 6,15 11,19" />
                <path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07" />
              </svg>
            )}
          </button>

          {/* Auth */}
          {session?.user ? (
            <div className="flex items-center gap-3">
              <span className="text-xs text-white/40 font-heading">
                {session.user.email?.split("@")[0]}
              </span>
              <button
                onClick={() => signOut()}
                className="text-xs px-3 py-1.5 rounded-full border border-white/10 text-white/50 hover:text-white hover:border-white/20 transition-all font-heading"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <AuthModal />
          )}
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="block w-5 h-px bg-white"
          />
          <motion.span
            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            className="block w-5 h-px bg-white"
          />
          <motion.span
            animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="block w-5 h-px bg-white"
          />
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden bg-black/90 backdrop-blur-2xl border-b border-white/5"
          >
            <div className="flex flex-col gap-4 px-6 py-6">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#generate"
                onClick={() => setMobileOpen(false)}
                className="text-sm px-5 py-2 rounded-full bg-white text-black font-medium text-center hover:bg-white/90 transition-colors"
              >
                Generate
              </a>
              {session?.user ? (
                <button
                  onClick={() => { signOut(); setMobileOpen(false); }}
                  className="text-sm text-white/50 hover:text-white transition-colors text-center"
                >
                  Sign Out ({session.user.email?.split("@")[0]})
                </button>
              ) : (
                <div onClick={() => setMobileOpen(false)} className="text-center">
                  <AuthModal />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
