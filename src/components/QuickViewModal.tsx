"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Star, Heart, ShoppingBag, Check, ShieldCheck } from "lucide-react";
import { Product } from "@/lib/types";
import { useCart, useWishlist } from "@/hooks/useStore";
import SizeGuideModal from "./SizeGuideModal";

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  if (!product) return null;

  const currentImage = selectedImage || product.image;
  const currentSize = selectedSize || product.sizes[0] || "Standard";
  const currentColor = selectedColor || product.colors[0]?.name || "Default";
  const isWishlisted = isInWishlist(product.id);

  const handleColorSelect = (c: { name: string; hex: string; image?: string }) => {
    setSelectedColor(c.name);
    if (c.image) {
      setSelectedImage(c.image);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, currentSize, currentColor);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative bg-[#141118] text-[#F5F0EB] rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl z-10 overflow-hidden max-h-[90vh] overflow-y-auto border border-[#D4AF37]/30 shadow-[#900C3F]/30"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-gray-300 hover:bg-white/20 transition-colors border border-white/10"
          >
            <X size={20} />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-gray-900 border border-[#D4AF37]/30">
                <Image
                  src={currentImage}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {product.isNew && (
                  <span className="absolute top-4 left-4 badge-new">New Arrival</span>
                )}
                {product.originalPrice && (
                  <span className="absolute top-4 right-4 badge-sale">
                    -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </span>
                )}
              </div>

              {product.images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`relative w-16 h-20 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                        currentImage === img ? "border-[#D4AF37] scale-95" : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <Image src={img} alt="" fill className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="flex flex-col h-full space-y-4">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold">
                  {product.category}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white mt-1">
                  {product.name}
                </h2>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center text-amber-400 text-sm">
                  <Star size={16} className="fill-amber-400 text-amber-400 mr-1" />
                  <span className="font-bold text-white">{product.rating}</span>
                </div>
                <span className="text-gray-700">|</span>
                <span className="text-xs text-gray-400">{product.reviews} Couture Reviews</span>
              </div>

              <div className="flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-bold text-[#D4AF37]">${product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <span className="text-base text-gray-500 line-through">${product.originalPrice.toLocaleString()}</span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light">
                {product.description}
              </p>

              {/* Color swatches */}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold uppercase text-gray-300">
                      Color: <span className="text-[#D4AF37] font-normal">{currentColor}</span>
                    </label>
                  </div>
                  <div className="flex gap-3">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => handleColorSelect(c)}
                        className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                          currentColor === c.name ? "border-[#D4AF37] scale-110 shadow-md" : "border-white/20"
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      >
                        {currentColor === c.name && (
                          <Check size={14} className={c.hex === "#FFFFF0" || c.hex === "#F7E7CE" ? "text-gray-900" : "text-white"} />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Sizes */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold uppercase text-gray-300">Select Size</label>
                  <button
                    onClick={() => setSizeGuideOpen(true)}
                    className="text-xs text-[#D4AF37] underline hover:text-[#F3E5AB]"
                  >
                    Size Chart
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all ${
                        currentSize === s
                          ? "bg-[#900C3F] text-white border-[#900C3F] shadow-md"
                          : "bg-white/5 text-gray-300 border-white/10 hover:border-white/30"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 mt-auto">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-[#900C3F] hover:bg-[#C70039] text-white font-bold py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-luxury text-xs border border-[#D4AF37]/40"
                >
                  <ShoppingBag size={18} />
                  <span>Add to Bag</span>
                </button>
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-3.5 rounded-2xl border transition-all flex items-center justify-center ${
                    isWishlisted
                      ? "bg-[#900C3F] border-[#900C3F] text-white"
                      : "bg-white/5 border-white/10 text-gray-400 hover:text-white"
                  }`}
                >
                  <Heart size={20} className={isWishlisted ? "fill-white" : ""} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <SizeGuideModal isOpen={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} />
    </AnimatePresence>
  );
}
