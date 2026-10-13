"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { collections } from "@/lib/data";
import { ArrowUpRight } from "lucide-react";

export default function FeaturedCollections() {
  return (
    <section className="py-20 bg-[#FAF9F6] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-bold">
              Curated Dress Collections
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-gray-900 mt-2">
              Explore Komu's Signature Edits
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 max-w-md">
            Each collection is thoughtfully designed with handpicked fabrics, tailored silhouettes, and couture finishes.
          </p>
        </div>

        {/* Collection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.slice(0, 4).map((col, index) => (
            <motion.div
              key={col.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={`/shop?category=${encodeURIComponent(col.name.split(" ")[0])}`}
                className="group relative block aspect-[3/4] w-full rounded-3xl overflow-hidden shadow-luxury shadow-luxury-hover border border-gray-200 bg-gray-900"
              >
                <Image
                  src={col.image}
                  alt={col.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-90"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                {/* Card Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between text-white z-10">
                  <div className="flex justify-end">
                    <span className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:bg-[#D4AF37] transition-colors border border-white/20">
                      <ArrowUpRight size={20} />
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-[#E6C687] tracking-wider">
                      {col.productCount} Dresses Available
                    </span>
                    <h3 className="text-xl font-bold font-heading group-hover:text-[#D4AF37] transition-colors">
                      {col.name}
                    </h3>
                    <p className="text-xs text-gray-300 line-clamp-2 font-light">
                      {col.tagline || col.description}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
