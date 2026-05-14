"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const plans = [
  {
    name: "Starter",
    price: "$19",
    period: "/mo",
    description: "Perfect for getting started with AI-generated aesthetics.",
    features: [
      "100 generations / month",
      "Basic style presets",
      "720p exports",
      "Community support",
    ],
    cta: "Get Started",
    recommended: false,
    accent: "rgba(255,255,255,0.06)",
  },
  {
    name: "Pro",
    price: "$49",
    period: "/mo",
    description: "For professional designers who need more power.",
    features: [
      "Unlimited generations",
      "All style presets",
      "4K exports",
      "Priority support",
      "Custom color palettes",
      "API access",
    ],
    cta: "Start Free Trial",
    recommended: true,
    accent: "rgba(139, 92, 246, 0.3)",
  },
  {
    name: "Studio",
    price: "$149",
    period: "/mo",
    description: "For creative teams and studios.",
    features: [
      "Everything in Pro",
      "Team collaboration",
      "8K exports",
      "Dedicated support",
      "Custom model training",
      "White-label exports",
      "SSO & analytics",
    ],
    cta: "Contact Sales",
    recommended: false,
    accent: "rgba(0, 240, 255, 0.15)",
  },
];

function PricingCard({
  plan,
  index,
}: {
  plan: (typeof plans)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        type: "spring",
        stiffness: 70,
        damping: 18,
        mass: 0.7,
        delay: index * 0.1,
      }}
      whileHover={{ y: -8 }}
      className={`relative rounded-2xl p-8 flex flex-col ${
        plan.recommended
          ? "border border-purple-500/30 bg-purple-500/[0.02]"
          : "border border-white/[0.06] bg-white/[0.01]"
      } transition-all duration-500`}
      style={{
        boxShadow: plan.recommended
          ? `0 0 30px rgba(139, 92, 246, 0.15), 0 0 80px rgba(0, 240, 255, 0.05)`
          : "none",
      }}
    >
        {plan.recommended && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-xs font-medium text-purple-300 neon-border-pulse font-heading">
          Recommended
        </div>
      )}

      <div className="mb-8">
        <h3 className="text-lg font-semibold text-white/90 mb-1 font-heading">
          {plan.name}
        </h3>
        <div className="flex items-baseline gap-1 mt-3">
          <span className="text-4xl font-bold text-white tracking-tight">
            {plan.price}
          </span>
          <span className="text-white/30 text-sm">{plan.period}</span>
        </div>
        <p className="text-sm text-white/40 mt-3 leading-relaxed">
          {plan.description}
        </p>
      </div>

      <ul className="space-y-3 mb-8 flex-1">
        {plan.features.map((feat) => (
          <li key={feat} className="flex items-center gap-3 text-sm text-white/50">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="shrink-0 text-purple-400"
            >
              <path
                d="M3 8l3.5 3.5L13 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {feat}
          </li>
        ))}
      </ul>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`w-full py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
          plan.recommended
            ? "bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white hover:shadow-[0_0_25px_rgba(139,92,246,0.3)]"
            : "bg-white/[0.04] text-white/80 border border-white/10 hover:bg-white/[0.08] hover:border-white/20"
        }`}
      >
        {plan.cta}
      </motion.button>
    </motion.div>
  );
}

export default function PricingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <motion.section
      ref={sectionRef}
      id="pricing"
      style={{ y }}
      className="relative py-32 px-6"
    >
      <div className="mx-auto max-w-5xl">
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
            Simple{" "}
            <span className="neon-gradient-text">Pricing</span>
          </h2>
          <p className="text-white/30 text-lg max-w-xl mx-auto">
            Start free. Scale as you grow. No hidden fees.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <PricingCard key={plan.name} plan={plan} index={i} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
