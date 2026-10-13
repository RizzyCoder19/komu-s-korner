"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { lookbookItems } from "@/lib/data";
import { Sparkles, ArrowRight } from "lucide-react";

export default function Lookbook() {
  return (
    <section className="py-20 bg-[#121212] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-bold mb-2">
              <Sparkles size={14} />
              <span>Editorial Styling</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading">
              Komu's Fashion Lookbook
            </h2>
          </div>
          <Link
            href="/lookbook"
            className="text-xs font-bold text-[#D4AF37] hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <span>View Full Editorial</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {lookbookItems.slice(0, 2).map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-[16/10] rounded-3xl overflow-hidden border border-[#D4AF37]/30 shadow-2xl group"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent" />

              {/* Hotspot marker */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <span className="relative flex h-6 w-6">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75" />
                  <span className="relative inline-flex rounded-full h-6 w-6 bg-[#D4AF37] border-2 border-white text-[10px] font-bold text-black items-center justify-center">
                    +
                  </span>
                </span>
              </div>

              <div className="absolute bottom-6 left-6 right-6 z-10 flex items-end justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#E6C687] tracking-wider">
                    {item.subtitle}
                  </span>
                  <h3 className="text-2xl font-bold font-heading">{item.title}</h3>
                </div>
                <Link
                  href="/shop"
                  className="bg-white/10 hover:bg-[#D4AF37] hover:text-black border border-white/20 text-white text-xs font-bold px-4 py-2.5 rounded-xl backdrop-blur-md transition-all"
                >
                  Shop the Look
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
