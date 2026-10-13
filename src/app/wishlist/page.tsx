"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import NotificationToast from "@/components/NotificationToast";
import ProductCard from "@/components/ProductCard";
import QuickViewModal from "@/components/QuickViewModal";
import { products } from "@/lib/data";
import { Product } from "@/lib/types";
import { useWishlist } from "@/hooks/useStore";
import { Heart } from "lucide-react";

export default function WishlistPage() {
  const { wishlist } = useWishlist();
  const [cartOpen, setCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const savedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <>
      <Navbar onCartClick={() => setCartOpen(true)} />
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <NotificationToast />

      <main className="min-h-screen pt-28 pb-20 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-bold">
              Saved Favorites
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-gray-900 mt-1">
              Your Wishlist Gowns & Dresses ({savedProducts.length})
            </h1>
          </div>

          {savedProducts.length === 0 ? (
            <div className="bg-white rounded-3xl p-16 text-center shadow-luxury border border-gray-100 space-y-4">
              <div className="w-20 h-20 rounded-full bg-rose-50 text-rose-500 mx-auto flex items-center justify-center">
                <Heart size={36} />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Your Wishlist is Empty</h2>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                Explore Komu's Korner dress menu and click the heart icon on any gown to save it to your wishlist.
              </p>
              <Link
                href="/shop"
                className="bg-[#121212] hover:bg-[#D4AF37] text-white font-bold text-xs px-8 py-4 rounded-2xl transition-colors inline-block"
              >
                Browse Dress Menu
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {savedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={(p) => setQuickViewProduct(p)}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
      <Footer />
    </>
  );
}
