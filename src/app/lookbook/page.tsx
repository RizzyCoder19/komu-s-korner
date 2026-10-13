"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import NotificationToast from "@/components/NotificationToast";
import { lookbookItems } from "@/lib/data";
import { Sparkles, ArrowRight } from "lucide-react";

export default function LookbookPage() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      <Navbar onCartClick={() => setCartOpen(true)} />
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <NotificationToast />

      <main className="min-h-screen pt-28 pb-20 bg-[#121212] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-bold mb-2">
              <Sparkles size={14} />
              <span>Couture Runway</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-heading">
              Komu's Editorial Lookbook 2026
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 max-w-xl font-light mt-2">
              Visual stories of elegance, silk draping, and gala soirées photographed across Fifth Avenue and Paris.
            </p>
          </div>

          <div className="space-y-16">
            {lookbookItems.map((item, idx) => (
              <div
                key={item.id}
                className={`flex flex-col ${
                  idx % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
                } gap-8 items-center bg-white/5 rounded-3xl p-6 sm:p-10 border border-white/10`}
              >
                <div className="relative aspect-[16/10] w-full lg:w-3/5 rounded-2xl overflow-hidden shadow-2xl">
                  <Image src={item.image} alt={item.title} fill className="object-cover" />
                </div>

                <div className="lg:w-2/5 space-y-4">
                  <span className="text-xs uppercase font-bold text-[#E6C687] tracking-widest">
                    {item.subtitle}
                  </span>
                  <h2 className="text-3xl font-extrabold font-heading">{item.title}</h2>
                  <p className="text-xs text-gray-300 leading-relaxed font-light">
                    Featured dresses from this editorial are available in Komu's dress menu for direct reservation and custom fitting.
                  </p>
                  <Link
                    href="/shop"
                    className="inline-flex items-center gap-2 bg-[#D4AF37] hover:bg-[#B59325] text-white font-bold text-xs px-6 py-3.5 rounded-2xl transition-all shadow-luxury"
                  >
                    <span>Shop Lookbook Outfits</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
