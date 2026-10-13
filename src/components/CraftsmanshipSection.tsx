"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, Scissors, Gem, Award } from "lucide-react";

export default function CraftsmanshipSection() {
  const steps = [
    {
      icon: Gem,
      title: "1. Haute Fabric Selection",
      description: "Only 100% pure Mulberry silk, French tulle, and handloom Zari threads are selected from certified weaving houses.",
    },
    {
      icon: Scissors,
      title: "2. Artisanal Zardozi Embroidery",
      description: "Over 120 hours of hand-beading, freshwater pearl stitching, and crystal embroidery per bridal piece.",
    },
    {
      icon: Award,
      title: "3. Bespoke Atelier Fitting",
      description: "Every dress is individually measured and inspected for high couture drape, shape, and royal comfort.",
    },
  ];

  return (
    <section className="py-24 bg-[#100F15] text-white relative overflow-hidden border-y border-[#D4AF37]/20">
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#900C3F]/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Editorial Image Stack */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] w-full rounded-3xl overflow-hidden shadow-2xl border border-[#D4AF37]/30">
              <Image
                src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=1000&q=80"
                alt="Atelier Tailoring Craftsmanship"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C0B0E]/80 via-transparent to-transparent" />
            </div>

            {/* Overlapping Small Editorial Image */}
            <div className="absolute -bottom-6 -right-6 w-48 sm:w-64 aspect-[4/3] rounded-2xl overflow-hidden border-2 border-[#D4AF37] shadow-2xl hidden sm:block">
              <Image
                src="https://images.unsplash.com/photo-1583391733952-6c78f5e27d2c?w=600&q=80"
                alt="Embroidery detail"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* Story Text */}
          <div className="space-y-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold uppercase tracking-widest">
                <Sparkles size={13} />
                <span>The Atelier Heritage</span>
              </div>
              <h2
                className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-heading"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                Where Every Stitch Defines Royal Elegance
              </h2>
              <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
                At Komu's Korner, dressmaking is elevated into an art form. We combine age-old heritage Zardozi needlework with modern Parisian silhouettes to craft gowns and ethnic ensembles that stand as heirloom masterworks.
              </p>
            </div>

            {/* Steps Timeline */}
            <div className="space-y-6">
              {steps.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.15, duration: 0.6 }}
                    className="flex gap-4 items-start p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#D4AF37]/40 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#900C3F]/30 text-[#D4AF37] flex items-center justify-center shrink-0 border border-[#D4AF37]/30">
                      <Icon size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-white mb-1">{step.title}</h3>
                      <p className="text-xs text-gray-400 font-light leading-relaxed">{step.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
