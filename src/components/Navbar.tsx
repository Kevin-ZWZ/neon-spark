"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession, signOut } from "next-auth/react";
import AuthModal from "./AuthModal";

const links = [
  { label: "Features", href: "#features" },
  { label: "Showcase", href: "#showcase" },
  { label: "Waitlist", href: "#waitlist" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: session } = useSession();

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

        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-white/60 hover:text-white transition-colors duration-300 neon-underline font-heading"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#generate"
            className="text-sm px-5 py-2 rounded-full bg-white text-black font-medium hover:bg-white/90 transition-colors neon-border-pulse font-heading"
          >
            Generate
          </a>

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
