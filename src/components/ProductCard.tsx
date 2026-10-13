"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Star, Eye, ShoppingBag } from "lucide-react";
import { Product } from "@/lib/types";
import { useCart, useWishlist } from "@/hooks/useStore";

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const isWishlisted = isInWishlist(product.id);
  const secondaryImage = product.images?.[1] || product.image;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, product.sizes[0] || "Standard", product.colors[0]?.name || "Default");
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) onQuickView(product);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-[#141118] rounded-2xl overflow-hidden border border-[#D4AF37]/20 shadow-luxury shadow-luxury-hover flex flex-col h-full"
    >
      {/* Image container */}
      <div
        className="relative aspect-[3/4] w-full overflow-hidden bg-gray-900 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link href={`/product/${product.id}`} className="block w-full h-full">
          <Image
            src={isHovered ? secondaryImage : product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.isNew && <span className="badge-new">New Arrival</span>}
          {product.isBestseller && <span className="badge-gold">Royalty</span>}
          {product.originalPrice && (
            <span className="badge-sale">
              -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          aria-label="Add to Wishlist"
          className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all ${
            isWishlisted
              ? "bg-[#900C3F] text-white shadow-md border border-[#D4AF37]/50"
              : "bg-black/50 backdrop-blur-md text-gray-300 hover:bg-[#900C3F] hover:text-white shadow-sm border border-white/10"
          }`}
        >
          <Heart size={18} className={isWishlisted ? "fill-white" : ""} />
        </button>

        {/* Quick View & Add Buttons on Hover */}
        <div className="absolute bottom-3 left-3 right-3 z-10 flex gap-2 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <button
            onClick={handleQuickView}
            className="flex-1 bg-black/80 backdrop-blur-md hover:bg-black text-white text-xs font-semibold py-2.5 rounded-xl border border-[#D4AF37]/30 shadow-md flex items-center justify-center gap-1.5 transition-colors"
          >
            <Eye size={14} className="text-[#D4AF37]" />
            <span>Quick View</span>
          </button>
          <button
            onClick={handleQuickAdd}
            className="bg-[#900C3F] hover:bg-[#C70039] text-white p-2.5 rounded-xl shadow-md flex items-center justify-center transition-colors border border-[#D4AF37]/30"
            title="Quick Add to Bag"
          >
            <ShoppingBag size={16} />
          </button>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#D4AF37] font-semibold mb-1">
          {product.category}
        </span>

        <Link href={`/product/${product.id}`} className="group-hover:text-[#D4AF37] transition-colors">
          <h3 className="font-heading font-semibold text-sm sm:text-base text-white line-clamp-1 mb-1.5">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 text-xs mb-3">
          <Star size={14} className="fill-amber-400 text-amber-400" />
          <span className="font-bold text-white">{product.rating}</span>
          <span className="text-gray-500 text-[11px]">({product.reviews})</span>
        </div>

        {/* Price & Colors */}
        <div className="mt-auto pt-3 border-t border-white/5 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-bold text-base sm:text-lg text-[#D4AF37]">${product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="text-xs text-gray-500 line-through">${product.originalPrice.toLocaleString()}</span>
            )}
          </div>

          {/* Color Dots */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex -space-x-1">
              {product.colors.slice(0, 3).map((c, i) => (
                <span
                  key={i}
                  className="w-3.5 h-3.5 rounded-full border border-black shadow-xs"
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
