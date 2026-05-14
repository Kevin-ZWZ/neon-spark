"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { signIn } from "next-auth/react";

export default function AuthModal() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === "loading") return;

    setStatus("loading");
    setMessage("");

    try {
      const result = await signIn("resend", {
        email,
        redirect: false,
      });

      if (result?.ok) {
        setStatus("sent");
        setMessage("Magic link sent! Check your inbox.");
      } else {
        setStatus("error");
        setMessage(result?.error || "Failed to send. Try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong.");
    }
  };

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="text-xs px-4 py-1.5 rounded-full border border-purple-500/30 text-purple-300/80 hover:bg-purple-500/10 transition-all font-heading"
      >
        Sign In
      </button>

      {/* Modal backdrop */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              className="relative w-full max-w-sm rounded-2xl border border-white/10 bg-black/90 backdrop-blur-2xl p-8 shadow-2xl"
            >
              {/* Glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/5 via-transparent to-cyan-500/5 pointer-events-none" />

              <div className="relative z-10 space-y-6">
                {/* Close */}
                <button
                  onClick={() => setOpen(false)}
                  className="absolute top-4 right-4 text-white/30 hover:text-white/60 transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>

                {/* Title */}
                <div className="text-center">
                  <h2 className="text-lg font-bold font-heading tracking-[0.1em] neon-gradient-text">
                    SIGN IN
                  </h2>
                  <p className="text-xs text-white/30 mt-2">
                    Enter your email to receive a magic link
                  </p>
                </div>

                {/* Sent state */}
                {status === "sent" ? (
                  <div className="text-center space-y-4 py-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2">
                        <path d="M22 2L11 13" /><path d="M22 2L15 22L11 13L2 9L22 2Z" />
                      </svg>
                    </div>
                    <p className="text-sm text-emerald-400/80">{message}</p>
                    <p className="text-xs text-white/20">Didn&apos;t receive it? Check spam or try again.</p>
                    <button
                      onClick={() => { setStatus("idle"); setEmail(""); }}
                      className="text-xs text-purple-400/60 hover:text-purple-400 transition-colors font-heading"
                    >
                      Try a different email
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSignIn} className="space-y-4">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (status !== "idle") setStatus("idle");
                      }}
                      placeholder="your@email.com"
                      className="w-full h-11 px-4 rounded-xl bg-white/[0.03] border border-white/10 text-sm text-white placeholder:text-white/20 outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all"
                      disabled={status === "loading"}
                      autoFocus
                    />

                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={status === "loading" || !email}
                      className="w-full h-11 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-500 to-cyan-400 text-white text-sm font-medium tracking-[0.1em] transition-all duration-300 hover:shadow-[0_0_25px_rgba(139,92,246,0.3)] disabled:opacity-50 disabled:cursor-not-allowed font-heading"
                    >
                      {status === "loading" ? (
                        <span className="flex items-center justify-center gap-2">
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </span>
                      ) : (
                        "Send Magic Link"
                      )}
                    </motion.button>

                    {status === "error" && (
                      <p className="text-xs text-red-400/70 text-center">{message}</p>
                    )}
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
