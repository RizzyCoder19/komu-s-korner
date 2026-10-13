"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Film, Sparkles } from "lucide-react";

export default function FashionFilmSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-20 bg-[#090909] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full rounded-3xl overflow-hidden shadow-2xl border border-[#D4AF37]/40 group">
          <Image
            src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1800&q=85"
            alt="Komu's Korner Fashion Film"
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

          {/* Overlay Content */}
          <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-12 z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold uppercase tracking-widest w-fit">
              <Film size={14} />
              <span>Official Fashion Teaser Film</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <div className="space-y-2 max-w-xl">
                <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-bold">
                  Autumn / Winter Gala Edition
                </span>
                <h2
                  className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-heading"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  "Sovereign Threads" — A Film by Komu's Korner
                </h2>
              </div>

              {/* Play Button */}
              <button
                onClick={() => setIsPlaying(true)}
                className="w-16 h-16 rounded-full bg-[#900C3F] hover:bg-[#C70039] text-[#D4AF37] flex items-center justify-center shadow-2xl transition-transform hover:scale-110 shrink-0 border border-[#D4AF37]/50"
                aria-label="Play Fashion Film"
              >
                <Play size={26} className="fill-[#D4AF37] ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <button
              onClick={() => setIsPlaying(false)}
              className="absolute top-6 right-6 text-white hover:text-[#D4AF37] p-2"
            >
              <X size={28} />
            </button>
            <div className="relative w-full max-w-4xl aspect-[16/9] rounded-2xl overflow-hidden bg-black border border-[#D4AF37]/40 shadow-2xl">
              <iframe
                src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="Fashion Film"
                className="w-full h-full border-0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
