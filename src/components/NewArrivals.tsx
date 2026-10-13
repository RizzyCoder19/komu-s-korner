"use client";

import { useState } from "react";
import Link from "next/link";
import { products } from "@/lib/data";
import { Product } from "@/lib/types";
import ProductCard from "./ProductCard";
import QuickViewModal from "./QuickViewModal";
import { ArrowRight } from "lucide-react";

const categories = ["All Dresses", "Evening Gowns", "Ethnic Wear", "Party Wear"];

export default function NewArrivals() {
  const [activeCategory, setActiveCategory] = useState("All Dresses");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = activeCategory === "All Dresses"
    ? products
    : products.filter((p) => p.category.toLowerCase().includes(activeCategory.toLowerCase().split(" ")[0]));

  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-bold">
              The Digital Menu
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-gray-900 mt-2">
              Featured Dress Catalog
            </h2>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs font-semibold rounded-full transition-all ${
                  activeCategory === cat
                    ? "bg-[#121212] text-white shadow-md"
                    : "bg-[#FAF9F6] text-gray-700 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filteredProducts.slice(0, 8).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setSelectedProduct(p)}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-[#121212] hover:bg-[#D4AF37] text-white font-bold px-8 py-3.5 rounded-2xl transition-all shadow-luxury hover:shadow-lg text-sm"
          >
            <span>Explore Complete Dress Menu ({products.length})</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      <QuickViewModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </section>
  );
}
