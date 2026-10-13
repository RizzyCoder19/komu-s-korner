"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import NotificationToast from "@/components/NotificationToast";
import MobileBottomNav from "@/components/MobileBottomNav";
import { useCart } from "@/hooks/useStore";
import { ShoppingBag, Trash2, ArrowRight, ShieldCheck, Tag } from "lucide-react";

export default function CartPage() {
  const { cart, cartTotal, updateQuantity, removeFromCart } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const handleCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === "KOMU15") {
      setDiscount(cartTotal * 0.15);
    } else if (couponCode.toUpperCase() === "WELCOME20") {
      setDiscount(cartTotal * 0.2);
    }
  };

  const finalTotal = Math.max(0, cartTotal - discount);

  return (
    <>
      <Navbar onCartClick={() => setCartOpen(true)} />
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <NotificationToast />

      <main className="min-h-screen pt-24 pb-20 bg-[#0C0B0E] text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-bold">
              Reservation Bag
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-white mt-1">
              Your Selected Dress Menu Items
            </h1>
          </div>

          {cart.length === 0 ? (
            <div className="bg-[#14131A] rounded-3xl p-12 text-center shadow-2xl border border-white/10 space-y-4">
              <div className="w-20 h-20 rounded-full bg-white/5 mx-auto flex items-center justify-center text-gray-400">
                <ShoppingBag size={36} />
              </div>
              <h2 className="text-xl font-bold text-white">Your Reservation Bag is Empty</h2>
              <p className="text-xs text-gray-400 max-w-sm mx-auto">
                Explore Komu's Korner catalog to pick your desired gowns, sarees, and evening wear.
              </p>
              <Link
                href="/shop"
                className="bg-[#900C3F] hover:bg-[#C70039] text-white font-bold text-xs px-8 py-4 rounded-2xl transition-colors inline-block border border-[#D4AF37]/30"
              >
                Explore Dress Menu
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Bag Items */}
              <div className="lg:col-span-2 space-y-4">
                {cart.map((item, idx) => (
                  <div
                    key={`${item.product.id}-${item.size}-${item.color}-${idx}`}
                    className="bg-[#14131A] rounded-3xl p-4 sm:p-6 shadow-2xl border border-white/10 flex gap-4 sm:gap-6 items-center"
                  >
                    <div className="relative w-20 h-28 sm:w-24 sm:h-32 rounded-2xl overflow-hidden bg-gray-900 shrink-0 border border-white/10">
                      <Image src={item.product.image} alt={item.product.name} fill className="object-cover" />
                    </div>

                    <div className="flex-1 min-w-0 space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-[#D4AF37]">{item.product.category}</span>
                          <h3 className="text-sm sm:text-base font-bold text-white truncate">{item.product.name}</h3>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.size, item.color)}
                          className="text-gray-400 hover:text-rose-400 p-1"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>

                      <div className="flex gap-4 text-xs text-gray-400">
                        <span>Size: <strong className="text-white">{item.size}</strong></span>
                        <span>Color: <strong className="text-white">{item.color}</strong></span>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center border border-white/10 rounded-xl bg-white/5">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)}
                            className="px-3 py-1 text-xs font-bold text-gray-300 hover:bg-white/10 rounded-l-xl"
                          >
                            -
                          </button>
                          <span className="px-3 py-1 text-xs font-bold text-white">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)}
                            className="px-3 py-1 text-xs font-bold text-gray-300 hover:bg-white/10 rounded-r-xl"
                          >
                            +
                          </button>
                        </div>

                        <span className="text-base font-extrabold text-[#D4AF37]">
                          ${(item.product.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary Sidebar */}
              <div className="bg-[#14131A] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#D4AF37]/25 h-fit space-y-6">
                <h3 className="font-heading font-bold text-lg text-white border-b border-white/10 pb-3">
                  Reservation Summary
                </h3>

                <form onSubmit={handleCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Promo Code"
                      className="w-full pl-8 pr-3 py-2.5 text-xs bg-white/5 border border-white/10 rounded-xl uppercase font-semibold text-white"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-[#900C3F] hover:bg-[#C70039] text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors shrink-0"
                  >
                    Apply
                  </button>
                </form>

                <div className="space-y-3 text-xs text-gray-300">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-white">${cartTotal.toLocaleString()}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-400 font-semibold">
                      <span>Promo Discount</span>
                      <span>-${discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Fitting & Inspection</span>
                    <span className="text-emerald-400 font-semibold">Complimentary</span>
                  </div>
                  <div className="flex justify-between text-sm font-extrabold text-white pt-3 border-t border-white/10">
                    <span>Total Estimated</span>
                    <span className="text-lg text-[#D4AF37]">${finalTotal.toLocaleString()}</span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="w-full bg-[#900C3F] hover:bg-[#C70039] text-white font-bold py-4 px-6 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-2xl text-sm border border-[#D4AF37]/40"
                >
                  <span>Proceed to Reservation Request</span>
                  <ArrowRight size={18} />
                </Link>

                <div className="flex items-center justify-center gap-2 text-xs text-gray-400 text-center">
                  <ShieldCheck size={16} className="text-[#D4AF37]" />
                  <span>No upfront payment required. Confirm booking directly.</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <MobileBottomNav onCartClick={() => setCartOpen(true)} />
      <Footer />
    </>
  );
}
