"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Crown } from "lucide-react";

export default function LoadingScreen() {
  const [stage, setStage] = useState<"spark" | "logo" | "tagline" | "dissolve" | "done">("spark");

  useEffect(() => {
    // Stage 1: Spark & Particle Gather (0ms -> 1200ms)
    const timer1 = setTimeout(() => setStage("logo"), 1200);

    // Stage 2: Logo Reveal & Sub-text (1200ms -> 2800ms)
    const timer2 = setTimeout(() => setStage("tagline"), 2800);

    // Stage 3: Tagline Word-by-word reveal (2800ms -> 4800ms)
    const timer3 = setTimeout(() => setStage("dissolve"), 4800);

    // Stage 4: Zoom Dissolve into Homepage (4800ms -> 5600ms)
    const timer4 = setTimeout(() => setStage("done"), 5600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  if (stage === "done") return null;

  const taglineWords = ["Where", "Every", "Thread", "Becomes", "Royal."];

  return (
    <AnimatePresence>
      <motion.div
        key="fashion-intro"
        initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.15 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] bg-[#090909] flex items-center justify-center overflow-hidden select-none"
        >
          {/* Film Grain & Embers Backdrop */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#181520] via-[#090909] to-[#040405] opacity-90" />

          {/* Floating Gold Dust Particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(24)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: `${(i * 17) % 100}vw`,
                  y: `${(i * 23) % 100}vh`,
                  opacity: 0,
                  scale: Math.random() * 0.8 + 0.3,
                }}
                animate={{
                  y: ["-10px", "-40px", "-20px"],
                  opacity: [0.2, 0.8, 0],
                }}
                transition={{
                  duration: Math.random() * 3 + 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: (i * 0.15) % 2,
                }}
                className="absolute w-1.5 h-1.5 rounded-full bg-[#D4AF37] blur-[0.5px] shadow-[0_0_8px_#D4AF37]"
              />
            ))}
          </div>

          {/* Volumetric Soft Light Radial Aura */}
          <div className="absolute w-[650px] h-[650px] rounded-full bg-radial from-[#D4AF37]/15 via-[#900C3F]/10 to-transparent blur-3xl pointer-events-none animate-pulse" />

          {/* Intro Container */}
          <div className="relative z-10 text-center max-w-2xl px-6">
            {/* Golden Spark forming into Crown */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={stage !== "spark" ? { scale: 1, opacity: 1 } : { scale: [0, 1.4, 1], opacity: 1 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="w-16 h-16 rounded-full bg-[#14121A] border border-[#D4AF37]/60 text-[#D4AF37] mx-auto flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.3)] mb-6"
            >
              <Crown size={28} className="text-[#D4AF37]" />
            </motion.div>

            {/* Brand Title Reveal */}
            <AnimatePresence>
              {(stage === "logo" || stage === "tagline" || stage === "dissolve") && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="space-y-3"
                >
                  <h1
                    className="text-4xl sm:text-6xl font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#AA771C] font-heading drop-shadow-md"
                    style={{ fontFamily: "'Cinzel', serif" }}
                  >
                    KOMU'S KORNER
                  </h1>

                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "160px" }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto"
                  />

                  <p className="text-[10px] sm:text-xs uppercase tracking-[0.45em] text-[#D4AF37] font-semibold pt-1">
                    DRESS MENU & COUTURE
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Subtitle Word-By-Word Tagline */}
            <div className="h-10 mt-6 flex items-center justify-center gap-2 overflow-hidden">
              {(stage === "tagline" || stage === "dissolve") && (
                <div className="flex gap-2 text-xs sm:text-sm font-light text-gray-200 tracking-widest italic">
                  {taglineWords.map((word, idx) => (
                    <motion.span
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.18, duration: 0.5 }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </div>
              )}
            </div>

            {/* Skip Button for Instant Exploration */}
            <button
              onClick={() => setStage("done")}
              className="mt-8 text-[10px] uppercase tracking-[0.25em] text-gray-400 hover:text-[#D4AF37] transition-colors cursor-pointer"
            >
              Skip Intro ✦
            </button>
          </div>
        </motion.div>
    </AnimatePresence>
  );
}
