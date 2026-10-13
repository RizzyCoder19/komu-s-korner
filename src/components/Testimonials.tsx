"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { reviews } from "@/lib/data";
import { Star, ShieldCheck, Quote } from "lucide-react";

export default function Testimonials() {
  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-bold">
            Couture Reviews
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-gray-900 mt-2">
            Loved by Fashion Connoisseurs
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-3 font-light">
            Read verified feedback from clients who reserved their dresses at Komu's Korner.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((rev, index) => (
            <motion.div
              key={rev.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#FAF9F6] p-6 rounded-3xl border border-gray-100 shadow-luxury flex flex-col justify-between relative group"
            >
              <Quote size={28} className="text-[#D4AF37]/20 absolute top-4 right-4" />

              <div className="space-y-4">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-xs text-gray-700 leading-relaxed italic">
                  "{rev.text}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200/60 flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-[#D4AF37]">
                  <Image src={rev.avatar} alt={rev.name} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-gray-900 truncate">{rev.name}</h4>
                  {rev.verifiedBuyer && (
                    <div className="flex items-center gap-1 text-[10px] text-emerald-600 font-medium">
                      <ShieldCheck size={12} />
                      <span>Verified Client</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
