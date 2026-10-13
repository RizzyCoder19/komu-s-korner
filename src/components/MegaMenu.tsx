"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

interface MegaMenuProps {
  isOpen: boolean;
  onClose?: () => void;
}

const menuCategories = [
  {
    title: "Dresses & Gowns",
    items: [
      { name: "Evening Gowns", href: "/shop?category=Evening+Gowns" },
      { name: "Cocktail & Party Minis", href: "/shop?category=Party+Wear" },
      { name: "Silk Slip Dresses", href: "/shop?category=Dresses" },
      { name: "Promenade & Ball Gowns", href: "/shop?category=Evening+Gowns" },
    ],
  },
  {
    title: "Royal Ethnic Couture",
    items: [
      { name: "Zardozi Silk Anarkalis", href: "/shop?category=Ethnic+Wear" },
      { name: "Handloom Kanchipuram Sarees", href: "/shop?category=Ethnic+Wear" },
      { name: "Sharara & Gharara Sets", href: "/shop?category=Ethnic+Wear" },
      { name: "Bridal Embellished Lehengas", href: "/shop?category=Bridal+Couture" },
    ],
  },
  {
    title: "Tailored & Co-ords",
    items: [
      { name: "Double-Breasted Power Suits", href: "/shop?category=Suits+%26+Co-ords" },
      { name: "Resort Silk Co-ord Sets", href: "/shop?category=Suits+%26+Co-ords" },
      { name: "Bespoke Outerwear Jackets", href: "/shop?category=Suits+%26+Co-ords" },
    ],
  },
];

export default function MegaMenu({ isOpen }: MegaMenuProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.2 }}
        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[850px] bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 z-50 overflow-hidden"
      >
        <div className="grid grid-cols-4 gap-8">
          {/* Categories columns */}
          {menuCategories.map((cat) => (
            <div key={cat.title} className="space-y-4">
              <h4 className="text-xs uppercase tracking-widest font-bold text-[#D4AF37] border-b border-gray-100 pb-2">
                {cat.title}
              </h4>
              <ul className="space-y-2.5">
                {cat.items.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-xs text-gray-600 hover:text-gray-900 font-medium hover:translate-x-1 transition-all flex items-center gap-1 group"
                    >
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Featured Showcase Card */}
          <div className="bg-[#121212] text-white rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between border border-[#D4AF37]/30">
            <div className="relative z-10">
              <div className="flex items-center gap-1.5 text-[10px] text-[#D4AF37] uppercase font-bold tracking-wider mb-2">
                <Sparkles size={12} />
                <span>Featured Atelier</span>
              </div>
              <h5 className="font-heading font-bold text-lg leading-snug mb-1">
                Midnight Royal Velvet
              </h5>
              <p className="text-[11px] text-gray-400">
                Handcrafted gowns for high soirée galas.
              </p>
            </div>

            <Link
              href="/shop?category=Evening+Gowns"
              className="relative z-10 mt-6 inline-flex items-center gap-2 text-xs font-bold text-[#D4AF37] hover:text-white transition-colors"
            >
              <span>View Collection</span>
              <ArrowRight size={14} />
            </Link>

            <Image
              src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&q=80"
              alt="Featured"
              fill
              className="object-cover opacity-20 pointer-events-none"
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
