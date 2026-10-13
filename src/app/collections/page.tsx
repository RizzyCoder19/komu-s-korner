"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import NotificationToast from "@/components/NotificationToast";
import { collections } from "@/lib/data";
import { ArrowUpRight } from "lucide-react";

export default function CollectionsPage() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      <Navbar onCartClick={() => setCartOpen(true)} />
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <NotificationToast />

      <main className="min-h-screen pt-28 pb-20 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-bold">
              Atelier Vault
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-gray-900 mt-1 mb-3">
              Komu's Curated Collections
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 max-w-xl">
              Explore bespoke dress collections arranged by occasion, fabric, and styling theme.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {collections.map((col) => (
              <Link
                key={col.id}
                href={`/shop?category=${encodeURIComponent(col.name.split(" ")[0])}`}
                className="group relative block aspect-[4/5] w-full rounded-3xl overflow-hidden shadow-luxury shadow-luxury-hover border border-gray-200 bg-gray-900"
              >
                <Image
                  src={col.image}
                  alt={col.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-90"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                <div className="absolute inset-0 p-8 flex flex-col justify-between text-white z-10">
                  <div className="flex justify-end">
                    <span className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:bg-[#D4AF37] transition-colors border border-white/20">
                      <ArrowUpRight size={22} />
                    </span>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs uppercase font-bold text-[#E6C687] tracking-wider">
                      {col.productCount} Gowns Available
                    </span>
                    <h2 className="text-2xl font-bold font-heading group-hover:text-[#D4AF37] transition-colors">
                      {col.name}
                    </h2>
                    <p className="text-xs text-gray-300 font-light leading-relaxed">
                      {col.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
