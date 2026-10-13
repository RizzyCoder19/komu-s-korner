"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Tag } from "lucide-react";
import { useCart } from "@/hooks/useStore";
import { useState } from "react";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cart, cartTotal, updateQuantity, removeFromCart } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(0);
  const [couponMsg, setCouponMsg] = useState("");

  const freeShippingThreshold = 2000;
  const progressPercent = Math.min(100, (cartTotal / freeShippingThreshold) * 100);

  const applyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === "KOMU15") {
      setDiscountApplied(cartTotal * 0.15);
      setCouponMsg("15% VIP Discount Applied!");
    } else if (code === "WELCOME20") {
      setDiscountApplied(cartTotal * 0.2);
      setCouponMsg("20% Welcome Discount Applied!");
    } else {
      setCouponMsg("Invalid coupon code. Try KOMU15");
    }
  };

  const finalTotal = Math.max(0, cartTotal - discountApplied);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-[#D4AF37]/20"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-[#FAF9F6]">
              <div className="flex items-center gap-2">
                <ShoppingBag className="text-[#D4AF37]" size={20} />
                <h2 className="text-lg font-bold font-heading text-gray-900">Your Dress Reservation Bag</h2>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors border border-gray-200"
              >
                <X size={18} />
              </button>
            </div>

            {/* Free Shipping Meter */}
            <div className="px-6 py-3 bg-[#121212] text-white text-xs">
              <div className="flex justify-between items-center mb-1">
                <span className="text-gray-300">
                  {cartTotal >= freeShippingThreshold
                    ? "✨ Unlocked Express Atelier Delivery!"
                    : `Add $${(freeShippingThreshold - cartTotal).toLocaleString()} more for Express Delivery`}
                </span>
                <span className="font-semibold text-[#D4AF37]">{Math.round(progressPercent)}%</span>
              </div>
              <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-16 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-gray-100 mx-auto flex items-center justify-center text-gray-400">
                    <ShoppingBag size={28} />
                  </div>
                  <h3 className="text-base font-bold text-gray-900">Your bag is empty</h3>
                  <p className="text-xs text-gray-500 max-w-xs mx-auto">
                    Explore Komu's Korner dress menu and select your favorite gowns for direct reservation.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-2 inline-block bg-[#121212] hover:bg-[#D4AF37] text-white text-xs font-semibold px-6 py-3 rounded-xl transition-colors"
                  >
                    Browse Dress Menu
                  </button>
                </div>
              ) : (
                cart.map((item, idx) => (
                  <div
                    key={`${item.product.id}-${item.size}-${item.color}-${idx}`}
                    className="flex gap-4 p-3 bg-[#FAF9F6] rounded-2xl border border-gray-100 relative group"
                  >
                    <div className="relative w-20 h-24 rounded-xl overflow-hidden shrink-0 bg-gray-100">
                      <Image src={item.product.image} alt={item.product.name} fill className="object-cover" />
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                      <div>
                        <h4 className="text-xs font-bold text-gray-900 truncate">{item.product.name}</h4>
                        <div className="flex items-center gap-2 text-[11px] text-gray-500 mt-1">
                          <span>Size: <strong className="text-gray-900">{item.size}</strong></span>
                          <span>•</span>
                          <span>Color: <strong className="text-gray-900">{item.color}</strong></span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        {/* Quantity Stepper */}
                        <div className="flex items-center border border-gray-200 rounded-lg bg-white">
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)
                            }
                            className="px-2 py-0.5 text-xs text-gray-600 hover:bg-gray-100 rounded-l-lg"
                          >
                            -
                          </button>
                          <span className="px-2.5 py-0.5 text-xs font-bold text-gray-900">{item.quantity}</span>
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)
                            }
                            className="px-2 py-0.5 text-xs text-gray-600 hover:bg-gray-100 rounded-r-lg"
                          >
                            +
                          </button>
                        </div>

                        <span className="text-xs font-bold text-gray-900">
                          ${(item.product.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.id, item.size, item.color)}
                      className="absolute top-2 right-2 text-gray-400 hover:text-rose-500 p-1"
                      aria-label="Remove item"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary */}
            {cart.length > 0 && (
              <div className="p-6 bg-[#FAF9F6] border-t border-gray-200 space-y-4">
                {/* Coupon Box */}
                <form onSubmit={applyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Promo Code (KOMU15)"
                      className="w-full pl-8 pr-3 py-2 text-xs bg-white border border-gray-200 rounded-xl uppercase font-semibold"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-[#121212] hover:bg-[#D4AF37] text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors shrink-0"
                  >
                    Apply
                  </button>
                </form>
                {couponMsg && (
                  <p className={`text-[11px] font-medium ${discountApplied > 0 ? "text-emerald-600" : "text-rose-500"}`}>
                    {couponMsg}
                  </p>
                )}

                <div className="space-y-1.5 text-xs text-gray-600">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-gray-900">${cartTotal.toLocaleString()}</span>
                  </div>
                  {discountApplied > 0 && (
                    <div className="flex justify-between text-emerald-600 font-medium">
                      <span>VIP Discount</span>
                      <span>-${discountApplied.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Fitting & Reservation Fee</span>
                    <span className="text-emerald-600 font-semibold">Complimentary</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-gray-900 pt-2 border-t border-gray-200">
                    <span>Total Estimated</span>
                    <span className="text-base text-[#D4AF37]">${finalTotal.toLocaleString()}</span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  onClick={onClose}
                  className="w-full bg-[#D4AF37] hover:bg-[#B59325] text-white font-bold py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-luxury hover:shadow-lg active:scale-95 text-sm"
                >
                  <span>Proceed to Reservation Request</span>
                  <ArrowRight size={16} />
                </Link>

                <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400">
                  <ShieldCheck size={14} className="text-[#D4AF37]" />
                  <span>No payment required right now. Reserve fitting directly.</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
